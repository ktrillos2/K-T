/**
 * Supabase Database Client
 * Reemplaza completamente a Turso — conexión directa, sin buffer en memoria.
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Cliente de Supabase con Service Role Key para operaciones de servidor.
 * Bypass de RLS — solo usar en rutas API y webhooks (SERVIDOR).
 */
export const getSupabaseServer = () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    if (typeof window !== 'undefined') {
      return null as any;
    }
    console.error("Supabase configuration missing: URL:", !!supabaseUrl, "Key:", !!supabaseServiceKey);
    throw new Error("supabaseUrl and supabaseServiceKey are required");
  }
  return createClient(supabaseUrl, supabaseServiceKey);
};

// Exportamos una instancia proxy o mantenemos la compatibilidad si es posible, 
// pero lo más seguro es usar la función.
export const supabase = (typeof window === 'undefined') 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null as any;
