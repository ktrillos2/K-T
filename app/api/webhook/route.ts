import { NextRequest, NextResponse } from 'next/server';
import { initDb, getChatStatus, updateChatStatus } from '@/lib/db';
import { generateGeminiResponse } from '@/lib/gemini';
import {
    bufferMessage,
    bufferChatMeta,
    flushToDb,
    getFullContextForGemini,
} from '@/lib/message-buffer';

export const dynamic = 'force-dynamic';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

/** Etiqueta secreta que Gemini usa para escalar a un asesor humano */
const ESCALATION_TAG = '[ESCALAR_ASESOR]';

/**
 * Deduplicación: Map de IDs de mensajes ya procesados → timestamp.
 * Evita que Meta reintente el mismo mensaje y el bot responda en loop.
 * Se auto-limpia cada 10 minutos para evitar fugas de memoria.
 */
const processedMessages = new Map<string, number>();
const DEDUP_TTL_MS = 10 * 60 * 1000; // 10 minutos

// Auto-limpieza periódica del mapa de deduplicación
setInterval(() => {
    const now = Date.now();
    for (const [id, timestamp] of processedMessages) {
        if (now - timestamp > DEDUP_TTL_MS) {
            processedMessages.delete(id);
        }
    }
}, DEDUP_TTL_MS);

// Inicializa la tabla de base de datos si no existe (fire-and-forget, no bloquea)
initDb().catch(console.error);

/**
 * GET /api/webhook
 * Verificación del Webhook por Meta (Hub Challenge).
 * IMPORTANTE: Meta exige que la respuesta sea SOLO el challenge en texto plano.
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    console.log('[Webhook GET] Verificación recibida:', { mode, token: token ? '***' : 'null', challenge });

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('[Webhook GET] ✅ WEBHOOK_VERIFIED');
            return new NextResponse(challenge, {
                status: 200,
                headers: { 'Content-Type': 'text/plain' },
            });
        } else {
            console.warn('[Webhook GET] ❌ Token no coincide');
            return new NextResponse('Forbidden', { status: 403 });
        }
    }

    return new NextResponse('Bad Request', { status: 400 });
}

/**
 * Función helper para enviar mensajes a través de WhatsApp API.
 */
async function sendWhatsAppMessage(phoneNumberId: string, to: string, text: string) {
    try {
        const response = await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to,
                type: 'text',
                text: { body: text },
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('[Webhook] Error enviando mensaje por WhatsApp:', errorBody);
        }
    } catch (error) {
        console.error('[Webhook] Excepción enviando mensaje por WhatsApp:', error);
    }
}

/**
 * POST /api/webhook
 * Recibe TODOS los eventos entrantes de WhatsApp Business.
 * 
 * Flujo de Handoff:
 * 1. Si el chat tiene status "esperando_asesor", el bot NO responde (silencio).
 * 2. Si Gemini incluye [ESCALAR_ASESOR], se elimina la etiqueta antes de enviar
 *    y se marca el chat como "esperando_asesor" en Turso.
 * 3. SIEMPRE devuelve 200 OK a Meta.
 */
export async function POST(request: NextRequest) {
    const OK_RESPONSE = NextResponse.json({ success: true }, { status: 200 });

    try {
        const body = await request.json();

        // 🔍 LOG DE DIAGNÓSTICO
        console.log('[Webhook POST] Payload recibido:', JSON.stringify(body, null, 2));

        if (body?.object !== 'whatsapp_business_account') {
            console.log('[Webhook POST] Evento ignorado: object no es whatsapp_business_account');
            return OK_RESPONSE;
        }

        // Extraer datos con Optional Chaining completo
        const entry = body?.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;

        if (!value) {
            console.log('[Webhook POST] Evento sin value, ignorando');
            return OK_RESPONSE;
        }

        const messages = value?.messages;
        const statuses = value?.statuses;

        // 📊 Eventos de STATUS (read receipts, delivery confirmations)
        if (statuses && statuses.length > 0) {
            console.log('[Webhook POST] Evento de status:', statuses[0]?.status, 'para:', statuses[0]?.recipient_id);
            return OK_RESPONSE;
        }

        // 💬 Validar que hay mensajes entrantes
        if (!messages || messages.length === 0) {
            console.log('[Webhook POST] Evento sin mensajes (evento de sistema), ignorando');
            return OK_RESPONSE;
        }

        const message = messages[0];
        const messageId = message?.id; // ID único que Meta asigna a cada mensaje
        const phoneNumberId = value?.metadata?.phone_number_id;
        const from = message?.from;
        const msgType = message?.type;
        const msgBody = message?.text?.body;
        const contactName = value?.contacts?.[0]?.profile?.name || `+${from}`;

        // 🔁 DEDUPLICACIÓN: Ignorar mensajes ya procesados (reintentos de Meta)
        if (messageId && processedMessages.has(messageId)) {
            console.log(`[Webhook POST] ⏭️ Mensaje ${messageId} ya procesado (reintento de Meta), ignorando`);
            return OK_RESPONSE;
        }

        // Marcar como procesado inmediatamente
        if (messageId) {
            processedMessages.set(messageId, Date.now());
        }

        // Solo procesamos mensajes de texto
        if (msgType !== 'text' || !msgBody) {
            console.log(`[Webhook POST] Mensaje no es texto (tipo: ${msgType}), ignorando`);
            return OK_RESPONSE;
        }

        if (!from || !phoneNumberId) {
            console.warn('[Webhook POST] Mensaje sin remitente o phoneNumberId, ignorando');
            return OK_RESPONSE;
        }

        console.log(`[Webhook POST] ✅ Mensaje de texto de: ${from} (${contactName}) | Contenido: "${msgBody}"`);

        // Procesar en try/catch separado — errores internos NO afectan la respuesta a Meta
        try {
            // ============================================================
            // 🛑 PASO 1: Verificar si el chat está en modo "esperando_asesor"
            // Si lo está, el bot guarda silencio para que Keyner responda.
            // ============================================================
            const chatStatus = await getChatStatus(from);

            if (chatStatus === 'esperando_asesor') {
                console.log(`[Webhook POST] 🟡 Chat ${from} está en modo ESPERANDO_ASESOR. Bot en silencio.`);

                // Aún así guardamos el mensaje del usuario para que Keyner lo vea en el panel
                const userMsgId = crypto.randomUUID();
                bufferMessage(userMsgId, from, 'user', msgBody);
                bufferChatMeta(from, contactName, 'esperando', true);
                await flushToDb(from);

                return OK_RESPONSE;
            }

            // ============================================================
            // 🤖 PASO 2: Flujo normal del bot
            // ============================================================

            // a) PRIMERO obtener el contexto histórico (DB + buffer previo)
            //    ANTES de agregar el mensaje actual, para evitar que aparezca
            //    duplicado (una vez en el historial y otra como sendMessage).
            const fullContext = await getFullContextForGemini(from, 50);

            // b) Ahora sí acumular el mensaje del usuario en el buffer
            const userMsgId = crypto.randomUUID();
            bufferMessage(userMsgId, from, 'user', msgBody);
            bufferChatMeta(from, contactName, 'esperando', true);

            // c) Generar respuesta con Gemini usando el contexto histórico
            let aiResponse = await generateGeminiResponse(fullContext, msgBody);

            // ============================================================
            // 🎯 PASO 3: Interceptar la etiqueta [ESCALAR_ASESOR]
            // ============================================================
            let shouldEscalate = false;

            if (aiResponse.includes(ESCALATION_TAG)) {
                shouldEscalate = true;
                aiResponse = aiResponse.replace(ESCALATION_TAG, '').trim();
                console.log(`[Webhook POST] 🚨 ESCALACIÓN detectada para ${from}. Marcando como esperando_asesor.`);
            }

            // d) Acumular la respuesta del bot en el buffer
            const modelMsgId = crypto.randomUUID();
            bufferMessage(modelMsgId, from, 'model', aiResponse);

            // e) Determinar el status del chat tras la respuesta
            const newStatus = shouldEscalate ? 'esperando_asesor' : 'bot_activo';
            const newLabel = shouldEscalate ? 'esperando' : 'bot';
            bufferChatMeta(from, contactName, newLabel as 'bot' | 'esperando', false, newStatus as 'bot_activo' | 'esperando_asesor');

            // f) Enviar respuesta limpia al usuario vía WhatsApp
            await sendWhatsAppMessage(phoneNumberId, from, aiResponse);

            // g) Flush de seguridad a Turso
            await flushToDb(from);

            // h) Si hubo escalación, actualizar el status directamente en Turso
            //    (por si el flush del buffer no lo actualizó correctamente)
            if (shouldEscalate) {
                await updateChatStatus(from, 'esperando_asesor');
            }

        } catch (processingError) {
            console.error('[Webhook POST] ❌ Error procesando mensaje (no afecta respuesta a Meta):', processingError);
        }

        return OK_RESPONSE;

    } catch (error) {
        console.error('[Webhook POST] ❌ Error crítico en webhook:', error);
        return OK_RESPONSE;
    }
}
