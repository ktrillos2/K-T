import { NextResponse } from 'next/server';
import { getMessageHistory, initDb } from '@/lib/db';
import { generateGeminiResponse } from '@/lib/gemini';
import {
    bufferMessage,
    bufferChatMeta,
    flushToDb,
    getFullContextForGemini,
} from '@/lib/message-buffer';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// Inicializa la tabla de base de datos si no existe (fire-and-forget)
initDb().catch(console.error);

/**
 * GET /api/webhook
 * Usado por Meta para verificar el Webhook (Hub Challenge).
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            return new NextResponse(challenge, { status: 200 });
        } else {
            return new NextResponse('Forbidden', { status: 403 });
        }
    }

    return new NextResponse('Bad Request', { status: 400 });
}

/**
 * Función helper para enviar mensajes a través de WhatsApp API
 */
async function sendWhatsAppMessage(phoneNumberId: string, to: string, text: string) {
    const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: to,
            type: 'text',
            text: { body: text },
        }),
    });

    if (!response.ok) {
        console.error('Error enviando mensaje por WhatsApp:', await response.text());
    }
}

/**
 * POST /api/webhook
 * Recibe mensajes entrantes de WhatsApp Business.
 * 
 * Optimización: Los mensajes se guardan en un buffer en memoria y se 
 * flushean a Turso en batch tras 5 segundos de inactividad.
 * Al final de cada request, se hace un flush de seguridad para 
 * garantizar que nada se pierda si la instancia muere.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (body.object === 'whatsapp_business_account') {

            if (
                body.entry &&
                body.entry[0].changes &&
                body.entry[0].changes[0].value.messages &&
                body.entry[0].changes[0].value.messages[0]
            ) {
                const phoneNumberId = body.entry[0].changes[0].value.metadata.phone_number_id;
                const from = body.entry[0].changes[0].value.messages[0].from;
                const msgBody = body.entry[0].changes[0].value.messages[0].text?.body;
                const contactName = body.entry[0].changes[0].value.contacts?.[0]?.profile?.name || `+${from}`;

                if (msgBody) {
                    console.log(`[Webhook] Mensaje entrante de: ${from} | Contenido: ${msgBody}`);

                    // a) Acumular el mensaje del usuario en el buffer (0 operaciones DB)
                    const userMsgId = crypto.randomUUID();
                    bufferMessage(userMsgId, from, 'user', msgBody);

                    // a.2) Acumular metadatos del chat en el buffer
                    bufferChatMeta(from, contactName, 'esperando', true);

                    // b) Obtener contexto completo para Gemini (DB + buffer fusionados)
                    // Solo 1 lectura a Turso, fusionada con el buffer en memoria
                    const fullContext = await getFullContextForGemini(from);

                    // c) Generar respuesta con Gemini usando el contexto completo
                    const aiResponse = await generateGeminiResponse(fullContext, msgBody);

                    // d) Acumular la respuesta del bot en el buffer (0 operaciones DB)
                    const modelMsgId = crypto.randomUUID();
                    bufferMessage(modelMsgId, from, 'model', aiResponse);

                    // d.2) Actualizar metadatos del chat en el buffer
                    bufferChatMeta(from, contactName, 'bot', false);

                    // e) Enviar respuesta al usuario vía WhatsApp API
                    await sendWhatsAppMessage(phoneNumberId, from, aiResponse);

                    // f) Flush de seguridad: Garantiza persistencia inmediata después de
                    //    procesar la request. Si llegan más mensajes rápido, el debounce 
                    //    del buffer se encarga de batcharlos. Pero si es el último mensaje
                    //    y la instancia muere, estos datos ya están en Turso.
                    await flushToDb(from);
                }
            }

            // Meta requiere un 200 OK rápido
            return NextResponse.json({ status: 'ok' }, { status: 200 });
        } else {
            return new NextResponse('Not Found', { status: 404 });
        }
    } catch (error) {
        console.error('Error procesando el webhook:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
