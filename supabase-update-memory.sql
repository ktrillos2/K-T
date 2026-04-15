-- Ejecuta este código en el SQL Editor de Supabase
ALTER TABLE telegram_users_memory 
ADD COLUMN IF NOT EXISTS chat_history JSONB DEFAULT '[]'::jsonb;
