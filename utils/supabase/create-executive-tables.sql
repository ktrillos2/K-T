-- 1. Tabla de Control para Pagos a Empleados / Proyectos
CREATE TABLE IF NOT EXISTS kt_empleados_pagos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    empleado TEXT NOT NULL,
    proyecto TEXT NOT NULL,
    monto_total NUMERIC DEFAULT 0,
    monto_pagado NUMERIC DEFAULT 0,
    monto_pendiente NUMERIC DEFAULT 0,
    estado TEXT DEFAULT 'pendiente',
    fecha TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (empleado, proyecto)
);

-- 2. Habilitar Permisos para el Bot (si tienes RLS activado asegura que el service role pueda)
ALTER TABLE kt_empleados_pagos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir todo a Service Role en empleados_pagos" ON kt_empleados_pagos;
CREATE POLICY "Permitir todo a Service Role en empleados_pagos" ON kt_empleados_pagos FOR ALL USING (true) WITH CHECK (true);

-- 3. Función RPC obligatoria para que el Bot ejecute tablas dinámicamente y sentencias DDL (CREATE TABLE)
CREATE OR REPLACE FUNCTION exec_sql(query_text TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE query_text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
