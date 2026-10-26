---
name: actualizar-blog
description: Actualiza 4 artículos antiguos del blog de www.kytcode.lat cada mes - agrega la sección de servicios y precios en la moneda del visitante, corrige datos y fechas desactualizados y refuerza los enlaces internos. Úsalo cuando pidan "actualizar artículos viejos", "refrescar el blog" o lo dispare la tarea programada.
---

# Actualizar artículos del blog (K&T Code)

Objetivo: que los artículos viejos sigan posicionando y **lleven a contratar**. Google premia el contenido al día, y cada artículo debe dirigir a los servicios y precios de K&T Code.

> **Datos de Search Console guardados:** si el conector GSC no responde (la prueba de GSC Wizard vence el 2026-11-02), usa la foto más reciente en `docs/seo/gsc-*.md` (páginas, consultas, oportunidades, indexación y pendientes). Si el conector sí funciona, al terminar agrega una foto nueva `docs/seo/gsc-<año>-<mes>.md` con el mismo formato.

## 1. Elegir 4 artículos

- Lista: `src/content/blog/meta.ts` (`ES_ONLY` y `BILINGUAL`) y sus cuerpos en `src/content/blog/posts/es|en/<slug>.ts` (o `posts/<slug>.ts` para los bilingües antiguos).
- Prioridad:
  1. Artículos **sin** la sección `{#k-t-code}` (búscala con `grep -L 'k-t-code' src/content/blog/posts/es/*.ts`).
  2. Los de fecha más antigua.
  3. Los de temas comerciales (precios, comparativas, "cómo elegir").
- No toques los artículos que se actualizaron en los últimos 60 días.
- **Si el conector GSC está disponible** (herramientas `mcp__GSC__*`; búscalas con ToolSearch "GSC"), úsalo primero. Propiedad: `sc-domain:kytcode.lat`.
  - `find_decaying_content`: artículos que **pierden clics**.
  - `score_opportunities` o `query_top_pages`: artículos en **posición 8–20** con muchas impresiones y CTR bajo (quick wins). Para esos, mejora el título y la descripción (`meta.ts`) para subir el CTR.
  - `get_page_performance` de cada elegido: sus consultas reales.
  - Para cada uno, mira sus consultas reales: usa esas frases en títulos, subtítulos y preguntas frecuentes.
  - Si no hay datos o falla, sigue con los criterios de abajo.

## 2. Qué hacer en cada artículo (español e inglés, si existe)

- **Sección de servicios y precios** antes de la conclusión: `## ¿Cómo te ayuda K&T Code? {#k-t-code}` / `## How K&T Code helps {#k-t-code}`. Debe tener:
  - 1–2 frases sobre cómo K&T Code resuelve ese tema.
  - Una tabla "Necesitas | Servicio | Desde" con 2–4 servicios enlazados y precios con el marcador `{{cop:N}}` (landing `{{cop:450000}}`, tienda `{{cop:1300000}}`, corporativo o desarrollo a medida `{{cop:2500000}}`, software `{{cop:4500000}}`; SEO técnico y mantenimiento "Según alcance"), con la leyenda "precios de partida en tu moneda". Administración de Ads (mensual, enlace `/servicios/administracion-de-ads`): usa `{{cop:450000,usd:200}} / mes` (pesos en Colombia y 200 USD convertidos en los demás países); inclúyela cuando el tema sea publicidad, ventas, WhatsApp, tiendas o landing pages.
  - Una línea con enlaces a `/precios` y a la guía de precios que corresponda (`/precios/precio-pagina-web-colombia`, `/precios/precio-tienda-virtual-colombia`, `/precios/precio-software-a-medida`).
  - Si el artículo no tiene "Conclusión", ponla al final del cuerpo, antes de las FAQ.
- **Datos al día:** corrige años, versiones, nombres de productos y precios de terceros que hayan cambiado. Solo con fuentes oficiales; si no puedes verificar algo, quítalo o hazlo general. No inventes cifras.
- **Enlaces internos:** agrega 1–2 enlaces a artículos más nuevos y a una página de país o ciudad si aplica (`src/content/landings/countries.ts`, `cities.ts`). Todos deben existir.
- **Precios en texto** que ya tenga el artículo: en tablas y párrafos, cámbialos a `{{cop:N}}` solo si son precios de K&T Code. Los precios de terceros se quedan como están. En `faq` (texto plano) deja "COP".
- **Fecha de actualización:**
  - En `ES_ONLY`: agrega `"<slug>": "<fecha de hoy>"` al objeto `REFRESHED` de `src/content/blog/meta.ts` (o actualiza la fecha si ya está).
  - En `BILINGUAL`, cambia `updated` a la fecha de hoy.
  - Nunca cambies la fecha de publicación (`date`).

## 3. Validar (obligatorio)

```bash
pnpm install --frozen-lockfile && pnpm typecheck && pnpm build
pnpm start -p 3123 &
# para cada slug, en / y /en: 200 y la sección presente
curl -s http://localhost:3123/blog/<slug> | grep -c 'id="k-t-code"'
```

- Cada enlace interno nuevo debe responder 200 en el servidor local. Detén el servidor al terminar.

## 4. Publicar

- Commit: "Blog: actualiza <n> artículos (servicios, precios y datos al día)", con la lista de slugs y las líneas de atribución que pida el sistema.
- `git fetch origin main && git rebase origin/main && git push origin HEAD:main`. Nunca uses force push.

- **Avisar a Bing (IndexNow):** después del push y del despliegue, si el conector GSC está disponible, llama `submit_indexnow_urls` (propiedad `sc-domain:kytcode.lat`) con las URLs nuevas o cambiadas en https://www.kytcode.lat (es y /en). La clave está publicada en `public/2270981fee1394870a997bfc141e97a2.txt`; no la borres.

## 5. Resumen final (breve, en español)

Artículos actualizados (URL en https://www.kytcode.lat/blog/<slug>), qué cambió en cada uno y cuántos artículos quedan sin la sección de servicios.
