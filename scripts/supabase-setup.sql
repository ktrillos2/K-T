-- ============================================
-- SQL para crear las tablas necesarias
-- Pegar en Supabase Dashboard → SQL Editor
-- ============================================

-- 1. Tabla de chats
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

-- 2. Tabla de mensajes
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    phone_number TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'sent'
);

-- 3. Índice para búsquedas rápidas por chat
CREATE INDEX IF NOT EXISTS idx_messages_phone ON messages(phone_number, timestamp DESC);

-- 4. Habilitar RLS con políticas permisivas
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Políticas para que el service role e la anon key tengan acceso completo
CREATE POLICY "Allow all access to chats" ON chats FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to messages" ON messages FOR ALL USING (true) WITH CHECK (true);

-- 5. Habilitar Realtime para ambas tablas
ALTER PUBLICATION supabase_realtime ADD TABLE chats;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
