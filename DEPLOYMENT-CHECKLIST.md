# Lista de publicación

## Seguridad

- [ ] Rotar inmediatamente las credenciales que estuvieron incluidas en versiones anteriores del proyecto.
- [ ] Crear `.env.local` desde `.env.example` sin subirlo al repositorio.
- [ ] Definir `AUTH_SECRET` y `GAME_REWARD_SECRET` con valores distintos, largos y aleatorios.
- [ ] Verificar SMTP o Resend con el correo del dominio.
- [ ] Configurar SPF, DKIM y DMARC.
- [ ] Revisar permisos de Sanity y Supabase.

## Calidad técnica

- [ ] `pnpm install --frozen-lockfile`
- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm build`
- [ ] Revisar errores y advertencias de consola.
- [ ] Probar navegación, formularios, menú móvil y enlaces.
- [ ] Probar el juego en teclado, iOS y Android.
- [ ] Confirmar que el formulario reconoce un código válido y rechaza uno alterado.

## SEO

- [ ] Abrir `/robots.txt`, `/sitemap.xml`, `/llms.txt` y `/rss.xml` en producción.
- [ ] Comprobar que cada URL del sitemap responde 200 y tiene canonical propio.
- [ ] Validar JSON-LD con Schema Markup Validator y Rich Results Test.
- [ ] Revisar títulos, descripciones, H1 y enlaces internos.
- [ ] Verificar que cotizaciones, login, admin y páginas de prueba no se indexan.
- [ ] Enviar el sitemap a Google Search Console y Bing Webmaster Tools.

## Rendimiento

- [ ] Medir Lighthouse móvil y escritorio en inicio, servicios, precios, blog y portafolio.
- [ ] Revisar PageSpeed Insights después de recibir datos reales.
- [ ] Confirmar LCP, INP y CLS en Vercel Speed Insights o Search Console.
- [ ] Verificar que el minijuego no se descarga en la carga inicial y no causa CLS.
- [ ] Revisar imágenes del hero, fuentes y scripts publicitarios.

## Comercial

- [ ] Publicar términos claros del descuento del 10%.
- [ ] Definir proceso para marcar códigos como usados.
- [ ] Confirmar precios, tiempos y estadísticas antes de publicarlos.
- [ ] Confirmar que todos los testimonios y casos cuentan con autorización.
