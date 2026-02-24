import { NextResponse } from 'next/server';
import { saveMessage, upsertChat, updateChatStatus } from '@/lib/db';

const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

/**
 * POST /api/send-message
 * Endpoint llamado desde el frontend para enviar mensajes.
 * Escribe directamente a Supabase (sin buffer).
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

        // Enviar mensaje por WhatsApp
        const url = `https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: cleanNumber,
                type: 'text',
                text: { preview_url: false, body: text },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error desde Meta API:', data);
            return NextResponse.json(
                { error: 'Error enviando el mensaje por WhatsApp', details: data },
                { status: response.status }
            );
        }

        // Guardar mensaje directamente en Supabase
        const messageId = data.messages?.[0]?.id || crypto.randomUUID();
        await saveMessage(messageId, cleanNumber, 'model', text);

        // Actualizar chat metadata
        await upsertChat(cleanNumber, '+' + cleanNumber, 'esperando', false);

        // Reactivar bot
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
