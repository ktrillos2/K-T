import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function setup() {
    if (!supabaseUrl || !supabaseServiceKey) {
        console.error('Supabase URL or Service Role Key missing');
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const sql = `
    -- 1. Create profiles table
    CREATE TABLE IF NOT EXISTS profiles (
        id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL DEFAULT 'trabajador',
        name TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 2. Create financial_transactions table if not exists
    CREATE TABLE IF NOT EXISTS financial_transactions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        type TEXT NOT NULL, -- 'ingreso' or 'gasto'
        amount NUMERIC NOT NULL,
        account TEXT NOT NULL, -- 'Nequi', 'Bancolombia', 'Efectivo'
        description TEXT,
        user_email TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 3. Create projects table
    CREATE TABLE IF NOT EXISTS projects (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL,
        client TEXT NOT NULL,
        description TEXT,
        priority TEXT DEFAULT 'Media',
        status TEXT DEFAULT 'Pendiente',
        due_date DATE,
        assigned_to TEXT, -- email of the worker
        total_profit NUMERIC DEFAULT 0,
        paid_amount NUMERIC DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 4. Create leads table
    CREATE TABLE IF NOT EXISTS leads (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT,
        source TEXT DEFAULT 'Web',
        status TEXT DEFAULT 'Nuevo', -- 'Nuevo', 'Contactado', 'Cliente'
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Ensure country column exists in leads
    DO $$ 
    BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='country') THEN
            ALTER TABLE leads ADD COLUMN country TEXT DEFAULT 'Colombia';
        END IF;
    END $$;

    -- Ensure unique constraint on leads.phone
    DO $$ 
    BEGIN 
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_phone_key') THEN
            ALTER TABLE leads ADD CONSTRAINT leads_phone_key UNIQUE (phone);
        END IF;
    END $$;

    -- 5. Seed initial data
    INSERT INTO leads (name, phone, country, source, status)
    VALUES 
        ('Juan Valdez', '+573101234567', 'Colombia', 'TikTok', 'Nuevo'),
        ('Carla Mendez', '+573209876543', 'México', 'Web', 'Contactado'),
        ('Andres Perez', '+573001112233', 'Colombia', 'Organico', 'Cliente')
    ON CONFLICT (phone) DO UPDATE SET country = EXCLUDED.country;
    `;

    try {
        console.log('Running setup...');
        const { error } = await supabase.rpc('exec_sql', { query_text: sql });
        if (error) throw error;
        console.log('Database setup successful');
    } catch (err) {
        console.error('Error setting up database:', err);
    }
}

setup();
