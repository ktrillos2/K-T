import { NextResponse } from 'next/server';
import { getChats, getMessagesByChat } from '@/lib/db';
import { getBufferedMessages } from '@/lib/message-buffer';

// Force dynamic execution for polling
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const dbChats = await getChats();

        // Populate messages for each chat (DB + buffer fusionados)
        const populatedChats = await Promise.all(
            dbChats.map(async (chatRow: any) => {
                const phoneNumber = chatRow.phone_number as string;
                const dbMessages = await getMessagesByChat(phoneNumber);

                // Obtener mensajes pendientes en el buffer
                const buffered = getBufferedMessages(phoneNumber);

                // IDs ya en la DB para deduplicar
                const dbIds = new Set(dbMessages.map((m: any) => m.id));

                // Fusionar: DB + buffer (sin duplicados)
                const bufferedFormatted = buffered
                    .filter(msg => !dbIds.has(msg.id))
                    .map(msg => ({
                        id: msg.id,
                        text: msg.content,
                        sender: msg.role === 'user' ? 'them' : 'me',
                        timestamp: msg.timestamp,
                        status: 'sent',
                    }));

                const allMessages = [
                    ...dbMessages.map((msg: any) => ({
                        id: msg.id,
                        text: msg.text,
                        sender: msg.sender,
                        timestamp: msg.timestamp,
                        status: msg.status,
                    })),
                    ...bufferedFormatted,
                ];

                return {
                    id: phoneNumber,
                    name: chatRow.name || `+${phoneNumber}`,
                    phoneNumber,
                    avatar: chatRow.avatar,
                    unreadCount: chatRow.unread_count,
                    label: chatRow.label,
                    status: chatRow.status || 'bot_activo',
                    isArchived: Boolean(chatRow.is_archived),
                    isPinned: Boolean(chatRow.is_pinned),
                    messages: allMessages,
                };
            })
        );

        return NextResponse.json({ chats: populatedChats }, { status: 200 });

    } catch (error: any) {
        console.error('Error fetching chats API:', error);
        return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 });
    }
}
