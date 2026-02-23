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
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
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

        // We get DESC because of the LIMIT, but we want the history in ASC order for Gemini's context
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
