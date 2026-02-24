import { NextResponse } from 'next/server';
import { getChats, getMessagesByChat } from '@/lib/db';
import { getBufferedMessages } from '@/lib/message-buffer';

// Force dynamic execution for polling
export const dynamic = 'force-dynamic';

/**
 * Cache en memoria para la respuesta del API de chats.
 * Evita consultar Turso en cada poll (cada 4s desde el frontend).
 * Se invalida automáticamente después de un TTL corto.
 */
let chatsCache: { data: any; expiresAt: number } | null = null;
const CHATS_CACHE_TTL_MS = 5_000; // 5 segundos (el frontend pollea cada 4s)

export async function GET() {
    try {
        const now = Date.now();

        // Servir desde cache si aún es válido
        if (chatsCache && now < chatsCache.expiresAt) {
            return NextResponse.json({ chats: chatsCache.data }, { status: 200 });
        }

        // Cache expirado — recargar desde Turso
        const dbChats = await getChats();

        const populatedChats = await Promise.all(
            dbChats.map(async (chatRow: any) => {
                const phoneNumber = chatRow.phone_number as string;

                // Obtener últimos 50 mensajes de DB
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

        // Guardar en cache
        chatsCache = { data: populatedChats, expiresAt: now + CHATS_CACHE_TTL_MS };

        return NextResponse.json({ chats: populatedChats }, { status: 200 });

    } catch (error: any) {
        console.error('Error fetching chats API:', error);
        return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 });
    }
}
