# K&T Code

Sitio corporativo desarrollado con Next.js App Router, TypeScript, Sanity y Tailwind CSS.

## Inicio rápido

1. Copia `.env.example` a `.env.local`.
2. Completa las variables de Sanity, Supabase, correo, analítica y recompensas.
3. Instala dependencias con el gestor indicado en `package.json`.
4. Ejecuta `pnpm dev` para desarrollo y `pnpm build` antes de publicar.

Nunca publiques `.env.local`, claves SMTP, tokens de Sanity, claves de Supabase ni secretos de firma.

## SEO y GEO implementado

- Metadatos y canonicals por página.
- Organización, sitio, servicios, artículos, breadcrumbs, FAQs y proyectos en JSON-LD.
- Sitemap dinámico con páginas, artículos y proyectos.
- `robots.txt` con acceso para OAI-SearchBot y bloqueo independiente de GPTBot.
- Hub de servicios y seis páginas comerciales con contenido original.
- Página central de preguntas frecuentes.
- Blog con autoría institucional, fechas, fuentes, FAQs y enlaces a servicios.
- `llms.txt` informativo y feed RSS.
- Redirección de la antigua política de privacidad.
- Rutas privadas y demostraciones configuradas con `noindex`.

Estas mejoras crean mejores condiciones técnicas y editoriales, pero no garantizan una posición concreta en buscadores o asistentes con IA.

## Minijuego Neon Escape

El juego está integrado debajo del cotizador mediante un iframe del mismo origen que:

- Solo se carga cuando está cerca del viewport.
- Reserva espacio para reducir CLS.
- Se adapta a teclado y controles táctiles.
- Incluye logros, poderes, mejoras y tres bosses.
- Incrementa la dificultad según tiempo, nivel, poderes, mejoras y bosses superados.
- Solicita al servidor un código firmado de 10% al superar los tres bosses.
- Envía el código y el token de validación al formulario de contacto.

Configura `GAME_REWARD_SECRET` con un valor largo y aleatorio. La validez comercial, el alcance mínimo y el consumo único del descuento deben gestionarse en el proceso de ventas o en una tabla de redenciones.

## Documentación

Consulta `SEO-IMPLEMENTATION.md` y `DEPLOYMENT-CHECKLIST.md` antes de publicar.
