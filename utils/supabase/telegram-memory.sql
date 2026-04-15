-- =========================================================================
-- SQL para crear la tabla de Memoria Persistente del bot de Telegram
-- Ejecuta esto en tu panel de Supabase -> SQL Editor -> New Query
-- =========================================================================

CREATE TABLE IF NOT EXISTS telegram_users_memory (
    user_id TEXT PRIMARY KEY,
    first_name TEXT,
    username TEXT,
    general_context TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS con política permisiva (ya que lo controlas por backend con service_role)
ALTER TABLE telegram_users_memory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all service role access memory" ON telegram_users_memory FOR ALL USING (true) WITH CHECK (true);

