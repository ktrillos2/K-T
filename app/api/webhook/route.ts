import { NextResponse } from 'next/server';
import { saveMessage, getMessageHistory, initDb } from '@/lib/db';
import { generateGeminiResponse } from '@/lib/gemini';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// Inicializa la tabla de base de datos si no existe (fire-and-forget, idealmente manejar en startup)
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
 * Usado para recibir mensajes y eventos entrantes de los usuarios.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Verificamos si es un evento desde la cuenta de WhatsApp Business
        if (body.object === 'whatsapp_business_account') {

            if (
                body.entry &&
                body.entry[0].changes &&
                body.entry[0].changes[0].value.messages &&
                body.entry[0].changes[0].value.messages[0]
            ) {
                const phoneNumberId = body.entry[0].changes[0].value.metadata.phone_number_id;
                const from = body.entry[0].changes[0].value.messages[0].from; // Celular del remitente
                const msgBody = body.entry[0].changes[0].value.messages[0].text?.body; // Contenido

                if (msgBody) {
                    console.log(`Mensaje entrante de: ${from} | Contenido: ${msgBody}`);

                    // a) Guarde el mensaje del usuario en Turso.
                    const userMsgId = crypto.randomUUID();
                    await saveMessage(userMsgId, from, 'user', msgBody);

                    // b) Consulte el historial de ese número en Turso.
                    const history = await getMessageHistory(from);

                    // c) Envíe el historial + el nuevo mensaje a la función de Gemini.
                    const aiResponse = await generateGeminiResponse(history, msgBody);

                    // d) Guarde la respuesta generada por Gemini en Turso (con el rol 'model').
                    const modelMsgId = crypto.randomUUID();
                    await saveMessage(modelMsgId, from, 'model', aiResponse);

                    // e) Llame a la API de WhatsApp para enviar el mensaje de texto al usuario.
                    await sendWhatsAppMessage(phoneNumberId, from, aiResponse);
                }
            }

            // Meta requiere un 200 OK rápido para saber que el mensaje fue recibido
            return NextResponse.json({ status: 'ok' }, { status: 200 });
        } else {
            return new NextResponse('Not Found', { status: 404 });
        }
    } catch (error) {
        console.error('Error procesando el webhook:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
