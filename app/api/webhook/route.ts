import { NextRequest, NextResponse } from 'next/server';
import { saveMessage, upsertChat, updateChatStatus, getFullContextForGemini, updateMessageStatus } from '@/lib/db';
import { generateAIResponse, generateAIAudioResponse } from '@/lib/ai';

export const dynamic = 'force-dynamic';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

/** Etiqueta secreta que Gemini usa para escalar a un asesor humano */
const ESCALATION_TAG = '[ESCALAR_ASESOR]';

/**
 * Deduplicación en memoria para evitar procesar reintentos de Meta.
 * Se marca como procesado DESPUES de enviar la respuesta exitosamente.
 */
const processedMessages = new Map<string, number>();
setInterval(() => {
    const now = Date.now();
    for (const [id, ts] of processedMessages) {
        if (now - ts > 600_000) processedMessages.delete(id); // 10 min TTL
    }
}, 60_000);

const OK_RESPONSE = new NextResponse('EVENT_RECEIVED', { status: 200 });

// ================================================================
// GET: Verificación del webhook de Meta
// ================================================================
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === VERIFY_TOKEN && challenge) {
        console.log('[Webhook GET] ✅ WEBHOOK_VERIFIED');
        return new NextResponse(challenge, {
            status: 200,
            headers: { 'Content-Type': 'text/plain' },
        });
    } else if (mode) {
        console.warn('[Webhook GET] ❌ Token no coincide');
        return new NextResponse('Forbidden', { status: 403 });
    }

    return new NextResponse('Bad Request', { status: 400 });
}

/**
 * Envía un mensaje de texto a un usuario vía WhatsApp API.
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
 * Descarga un archivo multimedia de WhatsApp.
 * Paso 1: Obtener la URL del media con el media_id.
 * Paso 2: Descargar el binario desde esa URL.
 */
async function downloadWhatsAppMedia(mediaId: string): Promise<{ buffer: Buffer; mimeType: string }> {
    const metaResponse = await fetch(`https://graph.facebook.com/v22.0/${mediaId}`, {
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        },
    });

    if (!metaResponse.ok) {
        throw new Error(`Error obteniendo media URL: ${metaResponse.status}`);
    }

    const mediaData = await metaResponse.json();
    const mediaUrl = mediaData.url;
    const mimeType = mediaData.mime_type || 'audio/ogg';

    const downloadResponse = await fetch(mediaUrl, {
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        },
    });

    if (!downloadResponse.ok) {
        throw new Error(`Error descargando media: ${downloadResponse.status}`);
    }

    const arrayBuffer = await downloadResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`[Media] Audio descargado: ${buffer.length} bytes, mime: ${mimeType}`);
    return { buffer, mimeType };
}

// ================================================================
// POST: Recibe TODOS los eventos entrantes de WhatsApp Business
// ================================================================
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const entry = body?.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;

        // Capturar eventos de status (read, delivered, sent)
        if (value?.statuses && value.statuses.length > 0) {
            const statusObj = value.statuses[0];
            const msgId = statusObj.id;
            const newStatus = statusObj.status; // 'sent', 'delivered', 'read'

            if (msgId && newStatus) {
                console.log(`[Webhook Status] 📌 Mensaje ${msgId} actualizado a: ${newStatus}`);
                // Actuar de forma asíncrona ("fire and forget") para no bloquear el retorno inmediato a Meta
                updateMessageStatus(msgId, newStatus).catch(err =>
                    console.error('[Webhook Status] Error procesando estado:', err)
                );
            }

            return OK_RESPONSE;
        }

        const messages = value?.messages;
        if (!messages || messages.length === 0) {
            return OK_RESPONSE;
        }

        const message = messages[0];
        const messageId = message?.id;
        const phoneNumberId = value?.metadata?.phone_number_id;
        const from = message?.from;
        const msgType = message?.type;
        const msgBody = message?.text?.body;
        const audioId = message?.audio?.id;
        const contactName = value?.contacts?.[0]?.profile?.name || `+${from}`;

        // 🔁 DEDUPLICACIÓN: Ignorar mensajes ya procesados
        if (messageId && processedMessages.has(messageId)) {
            console.log(`[Webhook POST] ⏭️ Mensaje ${messageId} ya procesado, ignorando`);
            return OK_RESPONSE;
        }

        // Solo procesamos texto o audio
        if (msgType !== 'text' && msgType !== 'audio') {
            console.log(`[Webhook POST] Tipo no soportado (${msgType}), ignorando`);
            return OK_RESPONSE;
        }

        if (!from || !phoneNumberId) {
            console.warn('[Webhook POST] Mensaje sin remitente o phoneNumberId, ignorando');
            return OK_RESPONSE;
        }

        const isAudio = msgType === 'audio';
        console.log(`[Webhook POST] ✅ Mensaje ${isAudio ? 'de AUDIO' : 'de texto'} de: ${from} (${contactName})${!isAudio ? ` | "${msgBody}"` : ''}`);

        try {
            // ============================================================
            // 🤖 Flujo del bot — escritura directa a Supabase
            // ============================================================

            // a) Obtener contexto histórico ANTES de guardar el mensaje actual
            const fullContext = await getFullContextForGemini(from, 50);

            // b) Guardar mensaje del usuario en Supabase
            const userMsgId = crypto.randomUUID();
            const userContent = isAudio ? '[Audio recibido]' : msgBody;
            await saveMessage(userMsgId, from, 'user', userContent);
            await upsertChat(from, contactName, 'bot', true);

            // c) Generar respuesta con Gemini
            let aiResponse: string;

            if (isAudio && audioId) {
                const { buffer: audioBuffer, mimeType } = await downloadWhatsAppMedia(audioId);
                aiResponse = await generateAIAudioResponse(fullContext, audioBuffer, mimeType);
            } else {
                aiResponse = await generateAIResponse(fullContext, msgBody);
            }

            // d) Interceptar etiqueta de escalación
            let shouldEscalate = false;
            if (aiResponse.includes(ESCALATION_TAG)) {
                shouldEscalate = true;
                aiResponse = aiResponse.replace(ESCALATION_TAG, '').trim();
                console.log(`[Webhook POST] 🚨 ESCALACIÓN detectada para ${from}`);
            }

            // e) Guardar respuesta del bot en Supabase
            const modelMsgId = crypto.randomUUID();
            await saveMessage(modelMsgId, from, 'model', aiResponse);

            // f) Actualizar status del chat
            const newLabel = shouldEscalate ? 'esperando' : 'bot';
            const newStatus = shouldEscalate ? 'esperando_asesor' : 'bot_activo';
            await upsertChat(from, contactName, newLabel, false, newStatus);

            // g) Enviar respuesta al usuario vía WhatsApp
            await sendWhatsAppMessage(phoneNumberId, from, aiResponse);

            // ✅ Marcar como procesado DESPUÉS de enviar exitosamente
            if (messageId) {
                processedMessages.set(messageId, Date.now());
            }

        } catch (processingError) {
            console.error('[Webhook POST] ❌ Error procesando mensaje:', processingError);
        }

        return OK_RESPONSE;

    } catch (error) {
        console.error('[Webhook POST] ❌ Error crítico en webhook:', error);
        return OK_RESPONSE;
    }
}
