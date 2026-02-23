import { NextResponse } from 'next/server';

const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// La versión de la API de Meta, ajusta la v18.0 a la versión más reciente si es necesario.
const API_VERSION = 'v18.0';

/**
 * POST /api/send-message
 * Endpoint llamado desde tu frontend para enviar mensajes.
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

        // Limpieza básica del número de destino (Asegura que sólo tenga números. Ej. código de país + número)
        const cleanNumber = to.replace(/\\D/g, '');

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

        return NextResponse.json(
            { success: true, messageId: data.messages[0].id },
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
