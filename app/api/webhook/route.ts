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
                recipient_type: 'individual',
                to,
                type: 'text',
                text: { preview_url: false, body: text },
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            console.error('[WhatsApp API] Error enviando mensaje:', data);
        }
    } catch (error) {
        console.error('[WhatsApp API] Excepción al enviar mensaje:', error);
    }
}

/**
 * Envía un mensaje interactivo tipo Lista a un usuario vía WhatsApp API.
 * @param dynamicText El saludo conversacional generado por la IA para inyectar en el body.
 */
async function sendWhatsAppInteractiveMessage(phoneNumberId: string, to: string, dynamicText?: string) {
    try {
        const bodyText = dynamicText || "Selecciona el servicio que deseas explorar para digitalizar tu negocio hoy:";
        const response = await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "messaging_product": "whatsapp",
                "to": to,
                "type": "interactive",
                "interactive": {
                    "type": "list",
                    "header": { "type": "text", "text": "Servicios Digitales K&T" },
                    "body": { "text": bodyText },
                    "footer": { "text": "Desarrollado por K&T ❤️" },
                    "action": {
                        "button": "📋 Ver Servicios",
                        "sections": [
                            {
                                "title": "💻 Desarrollo Web",
                                "rows": [
                                    { "id": "cotizar_landing", "title": "Landing Page + SEO", "description": "Optimizada, veloz y alojada en Vercel." },
                                    { "id": "cotizar_tienda", "title": "Tienda Online", "description": "E-commerce completo (Máx 35 productos)." }
                                ]
                            },
                            {
                                "title": "📱 Redes Sociales",
                                "rows": [
                                    { "id": "cotizar_redes", "title": "Gestión y Estrategia", "description": "Aumenta tus ventas y automatiza procesos." }
                                ]
                            },
                            {
                                "title": "🙋‍♂️ Atención Personalizada",
                                "rows": [
                                    { "id": "[ESCALAR_ASESOR]", "title": "Hablar con Keyner", "description": "Asesoría directa y humana." }
                                ]
                            }
                        ]
                    }
                }
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            console.error('[WhatsApp API] Error enviando interactivo:', data);
        } else {
            console.log(`[WhatsApp API] ✅ Menú interactivo enviado a ${to}`);
        }
    } catch (error) {
        console.error('[WhatsApp API] Excepción al enviar interactivo:', error);
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

        // Interceptar respuestas interactivas
        const isInteractive = msgType === 'interactive';
        let extractedUserText = msgBody;

        if (isInteractive && message?.interactive?.type === 'list_reply') {
            extractedUserText = message.interactive.list_reply.title; // Extraer el título del botón tocado
            // Nota: Si es 'Hablar con Keyner', Gemini interpretará el texto naturalmente y aplicará la escalación.
        }

        // Solo procesamos texto, audio o interactive
        if (msgType !== 'text' && msgType !== 'audio' && !isInteractive) {
            console.log(`[Webhook POST] Tipo no soportado (${msgType}), ignorando`);
            return OK_RESPONSE;
        }

        if (!from || !phoneNumberId) {
            console.warn('[Webhook POST] Mensaje sin remitente o phoneNumberId, ignorando');
            return OK_RESPONSE;
        }

        const isAudio = msgType === 'audio';
        console.log(`[Webhook POST] ✅ Mensaje ${isAudio ? 'de AUDIO' : (isInteractive ? 'INTERACTIVO' : 'de texto')} de: ${from} (${contactName})${!isAudio ? ` | "${extractedUserText}"` : ''}`);

        try {
            // ============================================================
            // 🤖 Flujo del bot — escritura directa a Supabase
            // ============================================================

            // a) Obtener contexto histórico ANTES de guardar el mensaje actual
            const fullContext = await getFullContextForGemini(from, 50);

            // b) Guardar mensaje del usuario en Supabase
            const userMsgId = crypto.randomUUID();
            const userContent = isAudio ? '[Audio recibido]' : extractedUserText;
            await saveMessage(userMsgId, from, 'user', userContent);
            await upsertChat(from, contactName, 'bot', true);

            // c) Generar respuesta con Gemini
            let aiResponse: string;

            if (isAudio && audioId) {
                const { buffer: audioBuffer, mimeType } = await downloadWhatsAppMedia(audioId);
                aiResponse = await generateAIAudioResponse(fullContext, audioBuffer, mimeType);
            } else {
                aiResponse = await generateAIResponse(fullContext, extractedUserText);
            }

            // d) Interceptar etiqueta de escalación
            let shouldEscalate = false;
            if (aiResponse.includes(ESCALATION_TAG)) {
                shouldEscalate = true;
                aiResponse = aiResponse.replace(ESCALATION_TAG, '').trim();
                console.log(`[Webhook POST] 🚨 ESCALACIÓN detectada para ${from}`);
            }

            // g) Interceptar menú de servicios dinámico
            let isMenuRequest = false;
            let dynamicGreeting = "";

            if (aiResponse.includes('[MENU_SERVICIOS]')) {
                isMenuRequest = true;
                // Extraer el saludo natural generado por la IA quitando la etiqueta
                dynamicGreeting = aiResponse.replace('[MENU_SERVICIOS]', '').trim();

                // Si la IA por alguna razón no generó texto, usar un fallback suave.
                if (!dynamicGreeting) {
                    dynamicGreeting = "¡Claro! Aquí tienes nuestros servicios detallados de K&T:";
                }

                // Guardaremos en la DB una versión amigable de lo que se envió
                aiResponse = `[Menú Interactivo Enviado]: ${dynamicGreeting}`;
            }

            // h) Guardar respuesta del bot en Supabase
            const modelMsgId = crypto.randomUUID();
            await saveMessage(modelMsgId, from, 'model', aiResponse);

            // i) Actualizar status del chat
            const newLabel = shouldEscalate ? 'esperando' : 'bot';
            const newStatus = shouldEscalate ? 'esperando_asesor' : 'bot_activo';
            await upsertChat(from, contactName, newLabel, false, newStatus);

            // j) Enviar respuesta al usuario vía WhatsApp
            if (isMenuRequest) {
                await sendWhatsAppInteractiveMessage(phoneNumberId, from, dynamicGreeting);
            } else {
                await sendWhatsAppMessage(phoneNumberId, from, aiResponse);
            }

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
