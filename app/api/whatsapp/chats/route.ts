import { NextResponse } from 'next/server';
import { getChatsWithLastMessage } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * GET /api/whatsapp/chats
 * Devuelve la lista de chats con el último mensaje para preview.
 * Usa Supabase directamente — sin cache en memoria.
 */
export async function GET() {
    try {
        const chats = await getChatsWithLastMessage();

        const formattedChats = chats.map((chat: any) => ({
            id: chat.phone_number,
            name: chat.name || `+${chat.phone_number}`,
            phoneNumber: chat.phone_number,
            avatar: chat.avatar,
            unreadCount: chat.unread_count,
            label: chat.label,
            status: chat.status || 'bot_activo',
            isArchived: Boolean(chat.is_archived),
            isPinned: Boolean(chat.is_pinned),
            lastMessage: chat.lastMsg ? {
                id: chat.lastMsg.id,
                text: chat.lastMsg.content,
                sender: chat.lastMsg.role === 'user' ? 'them' : 'me',
                timestamp: chat.lastMsg.timestamp,
                status: chat.lastMsg.status || 'sent',
            } : null,
            messages: chat.lastMsg ? [{
                id: chat.lastMsg.id,
                text: chat.lastMsg.content,
                sender: chat.lastMsg.role === 'user' ? 'them' : 'me',
                timestamp: chat.lastMsg.timestamp,
                status: chat.lastMsg.status || 'sent',
            }] : [],
        }));

        return NextResponse.json({ chats: formattedChats }, { status: 200 });

    } catch (error: any) {
        console.error('Error fetching chats API:', error);
        return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 });
    }
}
