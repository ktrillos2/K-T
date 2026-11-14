# SEO técnico: kytcode.lat

Fecha: 2026-11-14. Fuentes: curl contra https://www.kytcode.lat (headers, redirecciones, robots, sitemap en vivo) y build local idéntico en localhost:3123 (HTML, enlaces, 148 URLs del sitemap).

## Puntaje técnico: 88/100

| Categoría | Estado |
|---|---|
| Crawlability | Pasa |
| Indexabilidad (canonical/hreflang) | Pasa con observaciones |
| Seguridad | Parcial (falta CSP) |
| URLs y redirecciones | Pasa |
| Mobile | Pasa (viewport presente; sin revisión visual) |
| Core Web Vitals (potencial) | Parcial (peso de HTML y CSS inline) |
| Datos estructurados | Pasa |
| Rendering JS | Pasa (SSR/prerender completo) |
| IndexNow | No detectado (no verificado en profundidad) |

## Qué funciona

- robots.txt (200): `Allow: /`, `Disallow: /api/`, declara `https://www.kytcode.lat/sitemap.xml`. El sitemap declarado responde 200 en vivo.
- sitemap.xml: 148 URLs (110 es, 38 en), todas devuelven 200 sin redirección en local. Incluye `xhtml:link` es/en/x-default por URL e imágenes en la home.
- Redirecciones (en vivo, todas 308 directas, una sola salto): `https://kytcode.lat/` a `https://www.kytcode.lat/`; slash final (`/servicios/` a `/servicios`, `/en/` a `/en`); `/projects/*` a `/proyectos/*` (incluye `/en/projects/*` a `/en/proyectos/*`); `/portafolio` a `/proyectos`; `/redes` a `/#contacto`. `http://` no se pudo probar desde el contenedor (DNS), pero HSTS está activo.
- Canonical autorreferenciado, absoluto, sin slash final y sin parámetros en las 16 páginas de la muestra, incluidos 2 artículos es/en.
- hreflang es/en/x-default presente y recíproco en pares traducidos (home, /precios, /servicios, /servicios/landing-pages, /blog, artículos con versión en). Páginas solo en español (p. ej. /desarrollo-web-cucuta) emiten únicamente es + x-default, lo cual es correcto. El atributo sale como `hrefLang` (render React); los navegadores y Google lo tratan igual.
- Meta robots `index, follow, max-image-preview:large...`; 1 H1 por página; `lang="es-CO"` / `lang="en"`; title, description y 12 etiquetas OG en todas; ninguna imagen sin alt en la muestra.
- Contenido en el HTML sin JS: entre 1.350 y 4.650 palabras de texto visible por página en el HTML inicial; el HTML es prerenderizado (`x-nextjs-prerender`, `x-vercel-cache: HIT`).
- JSON-LD: LocalBusiness en todas; FAQPage, BreadcrumbList, ItemList, Blog/BlogPosting, Service, Speakable según tipo de página.
- 404 reales: `/no-existe-xyz`, `/servicios/x`, `/blog/inexistente`, `/proyectos/inexistente`, `/en/blog/inexistente` y `/portafolio/x` devuelven HTTP 404.
- Cabeceras: HSTS (max-age=63072000), X-Content-Type-Options: nosniff, X-Frame-Options: SAMEORIGIN, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy restrictiva. Hay feed.xml, llms.txt y llms-full.txt (200).
- Enlaces internos: 37 páginas muestreadas, 149 enlaces internos únicos; 148 responden 200 y 1 redirige (ver M-2). Cero 404.

## Hallazgos

### Medium

**M-1. HTML de ~540 KB: no bloquea indexación, pero conviene reducirlo.**
- Evidencia: `/` pesa 544.127 bytes sin comprimir en vivo; con brotli 71 KB y con gzip 112 KB. Las demás páginas pesan 470 a 600 KB (`/blog` 601 KB). Desglose de la home: 222 KB de scripts inline (216 KB de payload RSC `self.__next_f`), 176 KB de CSS inline, 6 KB de JSON-LD; unos 54 scripts.
- Evaluación: Googlebot solo procesa los primeros 2 MB de HTML, así que hay margen amplio y no es un problema de indexación. El impacto real es en transferencia (71 KB br, aceptable), parseo y LCP/INP en móvil de gama baja. La carga RSC duplica el contenido (texto en HTML más en el payload), y el CSS inline de 176 KB sugiere reglas no usadas o CSS global grande.
- Arreglo: revisar qué componentes cliente reciben props grandes (listas de proyectos/blog/industrias pasadas completas al cliente); paginar o cargar bajo demanda `/blog` (50 artículos) y `/proyectos`; auditar el CSS con `next build --profile`/coverage y purgar; revisar `experimental.inlineCss` si está activo. Meta orientativa: menos de 300 KB de HTML sin comprimir. Validar con CrUX/PageSpeed en vivo, que no se pudo medir aquí.

**M-2. Enlace interno a una URL inglesa que no existe y redirige.**
- Evidencia: `/en/blog/precio-pagina-web-peru` enlaza a `/en/blog/cuanto-cuesta-una-pagina-web-latinoamerica`, que responde 308 a `/en/blog` (el artículo existe solo en español). Lo mismo ocurre con `/en/blog/cuanto-cuesta-una-pagina-web-en-colombia`.
- Impacto: el lector inglés cae en el índice del blog, no en el artículo; se pierde el enlace contextual y se gasta crawl.
- Arreglo: en el componente de enlaces relacionados/inline, resolver el slug según disponibilidad de traducción y enlazar a `/blog/<slug>` (es) o quitar el enlace en la versión en. Revisar el resto de /en/blog con un script de enlaces (solo se muestreó el 25%).

**M-3. Sin Content-Security-Policy.**
- Evidencia: ninguna cabecera `content-security-policy` en `/`. Las demás cabeceras de seguridad están bien.
- Arreglo: añadir CSP en `next.config` headers (modo Report-Only primero), con nonce para los scripts inline de Next. Añadir también `Cross-Origin-Opener-Policy: same-origin`. No afecta al ranking directamente.

### Low

**L-1. Fecha `lastmod` futura en el sitemap.** 5 URLs tienen `lastmod` 2026-11-15, un día posterior a hoy (2026-11-14); además 49 URLs comparten 2026-11-11 y la home y /en usan una fecha fija. Google ignora `lastmod` si detecta que no es fiable. Arreglo: usar la fecha real de modificación del contenido (frontmatter `updated`/git), nunca fechas futuras ni genéricas. `changefreq` y `priority` son ignorados por Google; se pueden quitar.

**L-2. Cookie `kt-country` en HTML cacheable.** Cada respuesta HTML (incluida la 404) envía `set-cookie: kt-country=US` (6 meses) mientras `x-vercel-cache: HIT`. Se pone por middleware/geo. Riesgo bajo, pero las cookies en páginas públicas pueden impedir caché compartida en otros CDN y no aportan al rastreo. Confirmar que ninguna variante de contenido o redirección depende del país para Googlebot (en la muestra no se observó). Considerar fijarla solo en la interacción del selector.

**L-3. Página 404 con meta robots duplicadas y metadatos de la home.** `/no-existe-xyz` devuelve 404 real, pero el HTML trae `<meta name="robots" content="noindex">` y también `index, follow...` (heredado del layout), además del title de la home. Con 404 el resultado es correcto, pero es ruido. Arreglo: definir `metadata.robots` único en `not-found` y un title propio. El 404 pesa 131 KB; aceptable.

**L-4. Preload de imagen externa en todas las páginas.** `https://flagcdn.com/w40/co.png` se precarga (cabecera Link y HTML) aunque no es LCP; consume una conexión a un tercer origen. Arreglo: alojar la bandera localmente o quitar el preload.

**L-5. Sin `/.well-known/security.txt`** (404). Opcional; añadir con contacto de seguridad.

**L-6. Redirección /en/desarrollo-web-cucuta.** Responde 308 a `/en/servicios` (no existe versión en de la página local). Es un comportamiento razonable; verificar que no se enlace desde ningún lugar y que el sitemap no la liste (no la lista).

### Observaciones sin acción

- `/redes` redirige a `/#contacto` (el fragmento se resuelve en cliente, es válido pero Google lo trata como la home). Considerar `/` si se quiere un destino explícito.
- IndexNow: no se encontró archivo de clave verificable; opcional para Bing/Yandex. Hacer solo si se quiere indexación rápida fuera de Google.
- No se midieron LCP/INP/CLS reales (sin acceso a PageSpeed/CrUX desde el contenedor); lo anterior se basa en inspección del HTML.
- La herramienta `sitemap_discovery.py` marcó el sitemap declarado como `cross_host` al ejecutarse contra localhost (limitación del entorno de prueba, no un fallo del sitio); el sitemap local y el real son válidos y devuelven 200.

## Prioridad sugerida

1. M-2 (enlaces EN a artículos inexistentes), rápido y con impacto en UX.
2. M-1 (peso de HTML/RSC/CSS), medir antes y después con PageSpeed.
3. M-3 (CSP).
4. L-1 a L-5, mantenimiento.
