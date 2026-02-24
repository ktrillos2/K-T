/**
 * Supabase Database Client
 * Reemplaza completamente a Turso — conexión directa, sin buffer en memoria.
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Cliente de Supabase con Service Role Key para operaciones de servidor.
 * Bypass de RLS — solo usar en rutas API y webhooks.
 */
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Guarda un mensaje en Supabase.
 */
export async function saveMessage(id: string, phoneNumber: string, role: 'user' | 'model', content: string) {
    try {
        const { error } = await supabase.from('messages').insert({
            id,
            phone_number: phoneNumber,
            role,
            content,
            timestamp: new Date().toISOString(),
            status: 'sent',
        });

        if (error) throw error;
    } catch (error) {
        console.error('Error saving message:', error);
    }
}

/**
 * Actualiza el estado de un mensaje (sent, delivered, read) enviado desde el Webhook de Meta.
 */
export async function updateMessageStatus(messageId: string, newStatus: string) {
    try {
        const { error } = await supabase
            .from('messages')
            .update({ status: newStatus })
            .eq('id', messageId);

        if (error) throw error;
    } catch (error) {
        console.error(`Error updating message status for ${messageId}:`, error);
    }
}

/**
 * Upsert de chat: crea o actualiza metadatos.
 */
export async function upsertChat(
    phoneNumber: string,
    name: string,
    label: string = 'bot',
    incrementUnread: boolean = true,
    status: string = 'bot_activo'
) {
    try {
        // Verificar si el chat ya existe
        const { data: existing } = await supabase
            .from('chats')
            .select('phone_number, unread_count')
            .eq('phone_number', phoneNumber)
            .single();

        if (existing) {
            // Actualizar chat existente
            const updates: Record<string, any> = {
                name,
                label,
                status,
                updated_at: new Date().toISOString(),
            };
            if (incrementUnread) {
                updates.unread_count = (existing.unread_count || 0) + 1;
            }

            const { error } = await supabase
                .from('chats')
                .update(updates)
                .eq('phone_number', phoneNumber);

            if (error) throw error;
        } else {
            // Crear chat nuevo
            const { error } = await supabase.from('chats').insert({
                phone_number: phoneNumber,
                name,
                label,
                status,
                unread_count: incrementUnread ? 1 : 0,
                updated_at: new Date().toISOString(),
            });

            if (error) throw error;
        }
    } catch (error) {
        console.error('Error upserting chat:', error);
    }
}

/**
 * Obtiene todos los chats con su último mensaje.
 */
export async function getChatsWithLastMessage() {
    try {
        // Obtener todos los chats
        const { data: chats, error: chatsError } = await supabase
            .from('chats')
            .select('*')
            .order('is_pinned', { ascending: false })
            .order('updated_at', { ascending: false });

        if (chatsError) throw chatsError;
        if (!chats || chats.length === 0) return [];

        // Para cada chat, obtener el último mensaje (1 query con IN)
        const phoneNumbers = chats.map(c => c.phone_number);

        // Obtener el último mensaje por chat de forma eficiente
        const result = await Promise.all(
            chats.map(async (chat) => {
                const { data: lastMsg } = await supabase
                    .from('messages')
                    .select('id, content, role, timestamp, status')
                    .eq('phone_number', chat.phone_number)
                    .order('timestamp', { ascending: false })
                    .limit(1)
                    .single();

                return { ...chat, lastMsg };
            })
        );

        return result;
    } catch (error) {
        console.error('Error getting chats:', error);
        return [];
    }
}

/**
 * Obtiene mensajes de un chat específico con límite.
 */
export async function getMessagesByChat(phoneNumber: string, limit: number = 50) {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select('id, content, role, timestamp, status')
            .eq('phone_number', phoneNumber)
            .order('timestamp', { ascending: false })
            .limit(limit);

        if (error) throw error;

        // Revertir para orden cronológico
        return (data || []).reverse();
    } catch (error) {
        console.error('Error getting messages:', error);
        return [];
    }
}

/**
 * Obtiene el contexto completo para Gemini (últimos N mensajes).
 */
export async function getFullContextForGemini(phoneNumber: string, limit: number = 50) {
    try {
        const messages = await getMessagesByChat(phoneNumber, limit);

        return messages.map((msg: any) => ({
            role: msg.role as 'user' | 'model',
            content: msg.content,
        }));
    } catch (error) {
        console.error('Error getting context for Gemini:', error);
        return [];
    }
}

/**
 * Actualiza metadatos de un chat (label, status, unread, etc.).
 */
export async function updateChatMetadata(
    phoneNumber: string,
    updates: { label?: string; status?: string; unread_count?: number; is_archived?: boolean; is_pinned?: boolean }
) {
    try {
        const { error } = await supabase
            .from('chats')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('phone_number', phoneNumber);

        if (error) throw error;
    } catch (error) {
        console.error('Error updating chat metadata:', error);
    }
}

/**
 * Actualiza el status de un chat (bot_activo / esperando_asesor).
 */
export async function updateChatStatus(phoneNumber: string, status: 'bot_activo' | 'esperando_asesor') {
    try {
        const { error } = await supabase
            .from('chats')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('phone_number', phoneNumber);

        if (error) throw error;
        console.log(`[DB] Status actualizado para ${phoneNumber}: ${status}`);
    } catch (error) {
        console.error('Error updating chat status:', error);
    }
}
