/**
 * In-Memory Message Buffer para Vercel Serverless
 * 
 * Estrategia: Los mensajes se acumulan en un Map en memoria por número de teléfono.
 * Un debounce timer por conversación flushea todo a Turso después de N segundos de
 * inactividad. Gemini siempre lee el contexto completo (DB + buffer).
 * 
 * Nota: En Vercel, las instancias "warm" mantienen las variables de módulo vivas
 * entre invocaciones. Si la instancia se recicla (cold start), el buffer se pierde,
 * pero los mensajes críticos (user + bot) se guardan con un flush de seguridad
 * al finalizar cada webhook request.
 */

import { db } from './db';

// Tipos internos del buffer
type BufferedMessage = {
    id: string;
    phone_number: string;
    role: 'user' | 'model';
    content: string;
    timestamp: string;
};

type ChatMetadataBuffer = {
    name: string;
    label: 'bot' | 'esperando' | 'completado';
    status: 'bot_activo' | 'esperando_asesor';
    totalNewUnread: number;
    dirty: boolean; // Indica si hay cambios pendientes de flush
};

// Almacén en memoria
const messageBuffer = new Map<string, BufferedMessage[]>();
const chatMetaBuffer = new Map<string, ChatMetadataBuffer>();
const flushTimers = new Map<string, ReturnType<typeof setTimeout>>();

// Configuración del debounce (en milisegundos)
const FLUSH_DELAY_MS = 5_000; // 5 segundos de inactividad para flushear

/**
 * Agrega un mensaje al buffer en memoria (sin tocar Turso).
 */
export function bufferMessage(
    id: string,
    phoneNumber: string,
    role: 'user' | 'model',
    content: string
): void {
    const existing = messageBuffer.get(phoneNumber) || [];
    existing.push({
        id,
        phone_number: phoneNumber,
        role,
        content,
        timestamp: new Date().toISOString(),
    });
    messageBuffer.set(phoneNumber, existing);

    // Reiniciar el debounce timer para este número
    scheduleFlush(phoneNumber);
}

/**
 * Acumula metadatos del chat en el buffer.
 */
export function bufferChatMeta(
    phoneNumber: string,
    name: string,
    label: 'bot' | 'esperando' | 'completado',
    incrementUnread: boolean,
    status: 'bot_activo' | 'esperando_asesor' = 'bot_activo'
): void {
    const existing = chatMetaBuffer.get(phoneNumber);

    if (existing) {
        existing.label = label;
        existing.name = name;
        existing.status = status;
        if (incrementUnread) existing.totalNewUnread += 1;
        existing.dirty = true;
    } else {
        chatMetaBuffer.set(phoneNumber, {
            name,
            label,
            status,
            totalNewUnread: incrementUnread ? 1 : 0,
            dirty: true,
        });
    }
}

/**
 * Programa un flush diferido (debounced) para el número dado.
 * Si ya hay un timer activo, lo reinicia.
 */
function scheduleFlush(phoneNumber: string): void {
    const existingTimer = flushTimers.get(phoneNumber);
    if (existingTimer) {
        clearTimeout(existingTimer);
    }

    const timer = setTimeout(() => {
        flushToDb(phoneNumber).catch((err) =>
            console.error(`[Buffer] Error en flush diferido para ${phoneNumber}:`, err)
        );
    }, FLUSH_DELAY_MS);

    flushTimers.set(phoneNumber, timer);
}

/**
 * Flush inmediato: Guarda todos los mensajes y metadatos pendientes
 * de un número en Turso usando una sola transacción batch.
 * Se llama automáticamente por el debounce o manualmente cuando
 * necesitamos garantizar la persistencia (ej. al final del webhook).
 */
export async function flushToDb(phoneNumber: string): Promise<void> {
    // Cancelar el timer si existe (evitar doble flush)
    const timer = flushTimers.get(phoneNumber);
    if (timer) {
        clearTimeout(timer);
        flushTimers.delete(phoneNumber);
    }

    const pendingMessages = messageBuffer.get(phoneNumber);
    const pendingMeta = chatMetaBuffer.get(phoneNumber);

    // Si no hay nada pendiente, salir
    if (!pendingMessages?.length && !pendingMeta?.dirty) return;

    try {
        // Construir batch de statements para una sola transacción
        const statements: { sql: string; args: any[] }[] = [];

        // 1. Insertar todos los mensajes pendientes
        if (pendingMessages?.length) {
            for (const msg of pendingMessages) {
                statements.push({
                    sql: 'INSERT OR IGNORE INTO messages (id, phone_number, role, content, timestamp) VALUES (?, ?, ?, ?, ?)',
                    args: [msg.id, msg.phone_number, msg.role, msg.content, msg.timestamp],
                });
            }
        }

        // 2. Upsert de metadatos del chat (incluyendo status)
        if (pendingMeta?.dirty) {
            statements.push({
                sql: `
                    INSERT INTO chats (phone_number, name, avatar, unread_count, label, status, updated_at)
                    VALUES (?, ?, 'https://i.pravatar.cc/150?u=' || ?, ?, ?, ?, CURRENT_TIMESTAMP)
                    ON CONFLICT(phone_number) DO UPDATE SET
                        name = CASE WHEN excluded.name != '' THEN excluded.name ELSE chats.name END,
                        unread_count = chats.unread_count + ?,
                        label = ?,
                        status = ?,
                        updated_at = CURRENT_TIMESTAMP
                `,
                args: [
                    phoneNumber,
                    pendingMeta.name,
                    phoneNumber,
                    pendingMeta.totalNewUnread,
                    pendingMeta.label,
                    pendingMeta.status,
                    pendingMeta.totalNewUnread,
                    pendingMeta.label,
                    pendingMeta.status,
                ],
            });
        }

        // Ejecutar todo en un solo batch (1 round-trip a Turso)
        if (statements.length > 0) {
            await db.batch(statements, 'write');
            console.log(`[Buffer] Flush exitoso para ${phoneNumber}: ${pendingMessages?.length || 0} mensajes, meta: ${pendingMeta?.dirty}`);
        }

        // Limpiar los buffers
        messageBuffer.delete(phoneNumber);
        if (pendingMeta) {
            pendingMeta.totalNewUnread = 0;
            pendingMeta.dirty = false;
        }
    } catch (error) {
        console.error(`[Buffer] Error flushing para ${phoneNumber}:`, error);
        // No limpiamos el buffer para que se reintente en el próximo flush
    }
}

/**
 * Flush de seguridad: Guarda TODOS los buffers pendientes de TODOS
 * los números. Se usa como red de seguridad antes de que la instancia muera.
 */
export async function flushAll(): Promise<void> {
    const phoneNumbers = [...new Set([...messageBuffer.keys(), ...chatMetaBuffer.keys()])];
    await Promise.allSettled(phoneNumbers.map(flush => flushToDb(flush)));
}

/**
 * Obtiene el historial completo para Gemini: 
 * DB (persisted) + In-Memory Buffer (pending), fusionados y ordenados.
 */
export async function getFullContextForGemini(
    phoneNumber: string,
    limit: number = 20
): Promise<{ role: 'user' | 'model'; content: string }[]> {
    // 1. Leer de Turso (lo ya guardado)
    let dbMessages: { role: 'user' | 'model'; content: string }[] = [];

    try {
        const result = await db.execute({
            sql: 'SELECT role, content, timestamp FROM messages WHERE phone_number = ? ORDER BY timestamp DESC LIMIT ?',
            args: [phoneNumber, limit],
        });
        dbMessages = result.rows.map((row) => ({
            role: row.role as 'user' | 'model',
            content: row.content as string,
            _ts: row.timestamp as string,
        })).reverse() as any;
    } catch {
        // Si falla la lectura, seguimos con lo que hay en el buffer
    }

    // 2. Agregar los del buffer (aún no persistidos)
    const buffered = messageBuffer.get(phoneNumber) || [];
    const bufferedFormatted = buffered.map((msg) => ({
        role: msg.role,
        content: msg.content,
        _ts: msg.timestamp,
    }));

    // 3. Fusionar, deduplicar (por contenido + rol consecutivo), y ordenar
    const all = [...(dbMessages as any), ...bufferedFormatted];
    all.sort((a: any, b: any) => new Date(a._ts).getTime() - new Date(b._ts).getTime());

    // Tomar los últimos N mensajes
    const trimmed = all.slice(-limit);

    // Retornar sin el campo _ts
    return trimmed.map((m: any) => ({ role: m.role, content: m.content }));
}

/**
 * Obtiene los mensajes de un chat para el frontend (DB + buffer fusionados).
 */
export function getBufferedMessages(phoneNumber: string): BufferedMessage[] {
    return messageBuffer.get(phoneNumber) || [];
}
