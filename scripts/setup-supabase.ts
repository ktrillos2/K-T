/**
 * Script de setup para crear las tablas necesarias en Supabase.
 * Ejecutar una sola vez: npx tsx scripts/setup-supabase.ts
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function setup() {
    console.log('🔄 Creando tablas en Supabase...\n');

    // Crear tabla chats
    const { error: chatsError } = await supabase.rpc('exec_sql', {
        sql: `
            CREATE TABLE IF NOT EXISTS chats (
                phone_number TEXT PRIMARY KEY,
                name TEXT,
                avatar TEXT,
                unread_count INTEGER DEFAULT 0,
                label TEXT DEFAULT 'bot',
                status TEXT DEFAULT 'bot_activo',
                is_archived BOOLEAN DEFAULT false,
                is_pinned BOOLEAN DEFAULT false,
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `,
    });

    if (chatsError) {
        console.log('⚠️ Tabla chats (puede que ya exista):', chatsError.message);
    } else {
        console.log('✅ Tabla chats creada');
    }

    // Crear tabla messages
    const { error: msgsError } = await supabase.rpc('exec_sql', {
        sql: `
            CREATE TABLE IF NOT EXISTS messages (
                id TEXT PRIMARY KEY,
                phone_number TEXT NOT NULL,
                role TEXT NOT NULL,
                content TEXT NOT NULL,
                timestamp TIMESTAMPTZ DEFAULT NOW(),
                status TEXT DEFAULT 'sent'
            );
            CREATE INDEX IF NOT EXISTS idx_messages_phone ON messages(phone_number, timestamp DESC);
        `,
    });

    if (msgsError) {
        console.log('⚠️ Tabla messages (puede que ya exista):', msgsError.message);
    } else {
        console.log('✅ Tabla messages creada');
    }

    console.log('\n✅ Setup completado. Ahora ve a Supabase Dashboard:');
    console.log('   1. Database → Tables → Selecciona cada tabla');
    console.log('   2. Activa "Enable Realtime" en ambas tablas');
    console.log('   3. En Authentication → Policies → Crea políticas permisivas');
}

setup().catch(console.error);
