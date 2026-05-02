-- Crea o reemplaza tabla Leads
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    source TEXT DEFAULT 'Organico',
    status TEXT DEFAULT 'Nuevo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Si deseas asegurar seguridad RLS para leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow Service Role on leads"
ON public.leads FOR ALL USING (true);


-- Crea o reemplaza tabla Proyectos Pendientes
CREATE TABLE IF NOT EXISTS public.pending_projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    priority TEXT DEFAULT 'Media', -- Alta, Media, Baja
    status TEXT DEFAULT 'Pendiente', -- Pendiente, En Progreso, Revisión
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Si deseas asegurar seguridad RLS para proyectos
ALTER TABLE public.pending_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow Service Role on pending_projects"
ON public.pending_projects FOR ALL USING (true);
