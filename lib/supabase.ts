import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Cliente público de Supabase para el Frontend.
 * Utiliza la ANON_KEY, sujeta a RLS.
 */
export const supabase = createClient(supabaseUrl, supabaseKey);
