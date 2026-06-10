import { NextRequest, NextResponse } from 'next/server';
import { updateChatMetadata, getMessagesByChat } from '@/lib/db';

/**
 * PATCH /api/whatsapp/chats/[id]
 * Actualiza metadatos de un chat (label, status, unread_count, etc.).
 */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: phoneNumber } = await params;
        if (!phoneNumber) {
            return NextResponse.json({ error: 'Phone number ID is required' }, { status: 400 });
        }

        const updates = await request.json();

        await updateChatMetadata(phoneNumber, updates);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('Error updating chat API:', error);
        return NextResponse.json({ error: 'Failed to update chat' }, { status: 500 });
    }
}

/**
 * GET /api/whatsapp/chats/[id]
 * Obtiene los mensajes completos de un chat específico.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: phoneNumber } = await params;
        if (!phoneNumber) {
            return NextResponse.json({ error: 'Phone number ID is required' }, { status: 400 });
        }

        const messages = await getMessagesByChat(phoneNumber, 100);

        const formattedMessages = messages.map((msg: any) => ({
            id: msg.id,
            text: msg.content,
            sender: msg.role === 'user' ? 'them' : 'me',
            timestamp: msg.timestamp,
            status: msg.status || 'sent',
        }));

        return NextResponse.json({ messages: formattedMessages }, { status: 200 });

    } catch (error: any) {
        console.error('Error fetching messages API:', error);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}
