import { createClient } from '@libsql/client';

export const db = createClient({
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
});

export async function initDb() {
    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS messages (
                id TEXT PRIMARY KEY,
                phone_number TEXT NOT NULL,
                role TEXT NOT NULL CHECK(role IN ('user', 'model')),
                content TEXT NOT NULL,
                status TEXT DEFAULT 'sent',
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS chats (
                phone_number TEXT PRIMARY KEY,
                name TEXT,
                avatar TEXT,
                unread_count INTEGER DEFAULT 0,
                label TEXT DEFAULT 'esperando' CHECK(label IN ('bot', 'esperando', 'completado')),
                status TEXT DEFAULT 'bot_activo' CHECK(status IN ('bot_activo', 'esperando_asesor')),
                is_archived BOOLEAN DEFAULT 0,
                is_pinned BOOLEAN DEFAULT 0,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Migración: Añadir columna status si la tabla ya existía sin ella
        try {
            await db.execute(`ALTER TABLE chats ADD COLUMN status TEXT DEFAULT 'bot_activo' CHECK(status IN ('bot_activo', 'esperando_asesor'))`);
            console.log('Migration: status column added to chats table');
        } catch {
            // La columna ya existe, ignorar el error
        }

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}

export async function saveMessage(id: string, phoneNumber: string, role: 'user' | 'model', content: string) {
    try {
        await db.execute({
            sql: 'INSERT INTO messages (id, phone_number, role, content) VALUES (?, ?, ?, ?)',
            args: [id, phoneNumber, role, content],
        });
    } catch (error) {
        console.error('Error saving message to DB:', error);
        throw error;
    }
}

export async function getMessageHistory(phoneNumber: string, limit: number = 20) {
    try {
        const result = await db.execute({
            sql: 'SELECT role, content FROM messages WHERE phone_number = ? ORDER BY timestamp DESC LIMIT ?',
            args: [phoneNumber, limit],
        });

        const messages = result.rows.map((row) => ({
            role: row.role as 'user' | 'model',
            content: row.content as string,
        }));

        return messages.reverse();
    } catch (error) {
        console.error('Error getting message history:', error);
        return [];
    }
}

export async function upsertChat(phoneNumber: string, name: string = 'Usuario', label: 'bot' | 'esperando' | 'completado' = 'esperando', incrementUnread: boolean = false) {
    try {
        await db.execute({
            sql: `
                INSERT INTO chats (phone_number, name, avatar, unread_count, label, updated_at)
                VALUES (?, ?, 'https://i.pravatar.cc/150?u=' || ?, CASE WHEN ? THEN 1 ELSE 0 END, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(phone_number) DO UPDATE SET
                    unread_count = unread_count + CASE WHEN ? THEN 1 ELSE 0 END,
                    label = ?,
                    updated_at = CURRENT_TIMESTAMP
            `,
            args: [
                phoneNumber, name, phoneNumber, incrementUnread ? 1 : 0, label,
                incrementUnread ? 1 : 0, label
            ],
        });
    } catch (error) {
        console.error('Error upserting chat:', error);
    }
}

export async function getChats() {
    try {
        const result = await db.execute(`
            SELECT * FROM chats ORDER BY is_pinned DESC, updated_at DESC
        `);
        return result.rows;
    } catch (error) {
        console.error('Error getting chats:', error);
        return [];
    }
}

export async function getMessagesByChat(phoneNumber: string) {
    try {
        const result = await db.execute({
            sql: "SELECT id, content as text, CASE WHEN role = 'user' THEN 'them' ELSE 'me' END as sender, timestamp, status FROM messages WHERE phone_number = ? ORDER BY timestamp ASC",
            args: [phoneNumber]
        });
        return result.rows;
    } catch (error) {
        console.error('Error getting messages by chat:', error);
        return [];
    }
}

export async function updateChatMetadata(phoneNumber: string, updates: { label?: string, unread_count?: number, is_archived?: boolean, is_pinned?: boolean }) {
    try {
        const setClauses: string[] = [];
        const args: any[] = [];

        if (updates.label !== undefined) {
            setClauses.push('label = ?');
            args.push(updates.label);
        }
        if (updates.unread_count !== undefined) {
            setClauses.push('unread_count = ?');
            args.push(updates.unread_count);
        }
        if (updates.is_archived !== undefined) {
            setClauses.push('is_archived = ?');
            args.push(updates.is_archived);
        }
        if (updates.is_pinned !== undefined) {
            setClauses.push('is_pinned = ?');
            args.push(updates.is_pinned);
        }

        if (setClauses.length === 0) return;

        args.push(phoneNumber);

        await db.execute({
            sql: `UPDATE chats SET ${setClauses.join(', ')} WHERE phone_number = ?`,
            args
        });
    } catch (error) {
        console.error('Error updating chat metadata:', error);
    }
}

/**
 * Obtiene el status de un chat (bot_activo o esperando_asesor).
 * Retorna null si el chat no existe aún.
 */
export async function getChatStatus(phoneNumber: string): Promise<string | null> {
    try {
        const result = await db.execute({
            sql: 'SELECT status FROM chats WHERE phone_number = ?',
            args: [phoneNumber],
        });
        if (result.rows.length === 0) return null;
        return result.rows[0].status as string;
    } catch (error) {
        console.error('Error getting chat status:', error);
        return null;
    }
}

/**
 * Actualiza el status de un chat (bot_activo | esperando_asesor).
 */
export async function updateChatStatus(phoneNumber: string, status: 'bot_activo' | 'esperando_asesor'): Promise<void> {
    try {
        await db.execute({
            sql: 'UPDATE chats SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE phone_number = ?',
            args: [status, phoneNumber],
        });
        console.log(`[DB] Status actualizado para ${phoneNumber}: ${status}`);
    } catch (error) {
        console.error('Error updating chat status:', error);
    }
}
