-- Tabla para transacciones financieras en el panel
CREATE TABLE IF NOT EXISTS public.financial_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('ingreso', 'gasto')),
    amount NUMERIC NOT NULL DEFAULT 0,
    account TEXT NOT NULL CHECK (account IN ('Nequi', 'Bancolombia', 'Efectivo')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS si es necesario (y crear políticas)
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow Service Role on financial_transactions"
ON public.financial_transactions FOR ALL USING (true);
