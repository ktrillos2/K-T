import { NextResponse } from 'next/server';
import { updateChatStatus } from '@/lib/db';
import { bufferMessage, bufferChatMeta, flushToDb } from '@/lib/message-buffer';

const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const API_VERSION = 'v18.0';

/**
 * POST /api/send-message
 * Endpoint llamado desde el frontend para enviar mensajes.
 * Usa el buffer en memoria para acumular mensajes y flushear en batch.
 */
export async function POST(request: Request) {
    try {
        const { to, text } = await request.json();

        if (!to || !text) {
            return NextResponse.json(
                { error: 'El número de destino (to) y el texto (text) son requeridos' },
                { status: 400 }
            );
        }

        const cleanNumber = to.replace(/\D/g, '');

        const url = `https://graph.facebook.com/${API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

        const body = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: cleanNumber,
            type: 'text',
            text: {
                preview_url: false,
                body: text,
            },
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error desde Meta API:', data);
            return NextResponse.json(
                { error: 'Error enviando el mensaje por WhatsApp', details: data },
                { status: response.status }
            );
        }

        // Acumular el mensaje saliente en el buffer en memoria
        const messageId = data.messages?.[0]?.id || crypto.randomUUID();
        bufferMessage(messageId, cleanNumber, 'model', text);

        // Acumular metadatos del chat
        bufferChatMeta(cleanNumber, '+' + cleanNumber, 'esperando', false);

        // Flush inmediato: El mensaje fue enviado por un operador humano, garantizamos persistencia
        await flushToDb(cleanNumber);

        // Reactivar el bot: Si estaba en "esperando_asesor", el operador ya respondió
        await updateChatStatus(cleanNumber, 'bot_activo');

        return NextResponse.json(
            { success: true, messageId },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error en ruta Send Message:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor', details: error.message },
            { status: 500 }
        );
    }
}
