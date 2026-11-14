# Auditoría SEO completa — www.kytcode.lat

**Fecha:** 14 de noviembre de 2026 · **Herramienta:** Claude SEO v2.6.0 (seo-audit) · **Tipo de negocio:** agencia de desarrollo web y marketing digital (servicio profesional, Cúcuta, Colombia; clientes en Colombia, Latinoamérica y EE. UU.)

> **Cómo se hizo.** Este entorno no resuelve DNS, así que las herramientas de la skill auditaron el build de producción local (mismo código que está en Vercel). Las cabeceras, redirecciones, robots.txt, sitemap y llms.txt se verificaron además contra el sitio real. Lighthouse es de laboratorio (móvil simulado, sin datos reales de usuarios: CrUX y Search Console no estaban conectados). Las SERP se revisaron con búsqueda web, no con Google directamente.

## Puntaje: **74 / 100**

| Categoría | Peso | Puntaje | Fuente |
|---|---|---|---|
| SEO técnico | 22 % | 88 | `findings/technical.md` |
| Calidad de contenido | 23 % | 60 | `findings/content.md` |
| On-page (títulos, descripciones, encabezados, enlaces) | 20 % | 78 | `onpage-crawl.json` (148 URL) |
| Datos estructurados | 10 % | 76 | `findings/schema.md` |
| Rendimiento (Lighthouse móvil) | 10 % | 62 | ver abajo |
| Preparación para búsqueda con IA | 10 % | 72 | `findings/geo.md` |
| Imágenes | 5 % | 85 | rastreo on-page |
| *Experiencia de búsqueda (SXO), informativo* | — | 65 | `findings/sxo.md` |

**Lectura rápida:** la base técnica es sólida (sin errores críticos de rastreo ni indexación). Lo que frena el crecimiento es **contenido y autoridad**: casos de estudio con texto de plantilla y sin resultados, guías de precio que solo muestran la tarifa propia, páginas en inglés con poco valor propio y una marca casi invisible fuera del sitio.

## Top 5 problemas

1. **Casos de estudio con texto plantilla y sin resultados de negocio (Alta).** El bloque "El reto" es idéntico entre proyectos (Telas Real, GMX, Casa Medina, Motofox, Qvareli, KAILAB…); solo cambian nombre y sector. Ningún caso muestra leads, pedidos o ventas. Es la mayor debilidad de E-E-A-T.
2. **Errores de hecho en horarios (Alta, rápido de corregir).** `src/content/landings/countries.ts`: México siempre está 1 h detrás de Colombia (no "comparte la hora"); con Nueva York y Miami solo coincide de noviembre a marzo; con Chicago/Houston la diferencia es 0–1 h, no 1–2 h.
3. **Guía de precios sin rangos de mercado (Alta).** /blog/cuanto-cuesta-una-pagina-web-en-colombia solo da precios propios; Google premia tablas por tipo de proveedor (hazlo tú, freelance, agencia) y costos de dominio, hosting y mantenimiento. Explica parte del CTR bajo.
4. **Páginas en inglés con poco valor propio (Alta).** Varias /en son traducciones de temas locales colombianos (475 palabras, enlaces que redirigen). Encaja con las 36 URL "rastreadas sin indexar" de Search Console. El perfil "empresa de EE. UU. buscando nearshore" puntúa 46–49/100.
5. **Marca casi inexistente fuera del sitio (Alta).** Sin LinkedIn de empresa ni de autor en `sameAs`, sin YouTube, sin Wikidata, sin perfiles con reseñas en Clutch/GoodFirms; además el footer muestra otro nombre de marca: "K&T Solutions Web" (Facebook).

## Top 5 victorias rápidas

1. Corregir los horarios de México y EE. UU. (15 min).
2. Renombrar la página de Facebook a "K&T Code" y la etiqueta del footer (15 min + cambio en Facebook).
3. Arreglar el enlace roto en inglés `/en/blog/precio-pagina-web-peru` → `/en/blog/cuanto-cuesta-una-pagina-web-latinoamerica` (308 a /en/blog).
4. Alinear el precio del schema de /desarrollo-web-cucuta (dice 2.500.000; el texto dice "desde 450.000") y usar `AggregateOffer`.
5. Acortar títulos: 92 de 148 superan 60 caracteres (los más largos, 88–94) y Google los corta.

## SEO técnico — 88

**Funciona:** robots.txt válido; 148 URL del sitemap responden 200 sin redirección; redirecciones 308 de un solo salto (apex→www, slash final, /projects/*, /portafolio, /redes); canonical autorreferenciado y hreflang es/en/x-default recíproco; contenido completo en el HTML sin JavaScript; 404 reales; HSTS, nosniff, X-Frame-Options, Referrer-Policy y Permissions-Policy.

**Hallazgos:**
- **Medio:** HTML de ~540 KB en el inicio (222 KB de scripts inline, 176 KB de CSS inline); /blog pesa ~600 KB. No impide indexar (71 KB con brotli), pero pesa en móvil.
- **Medio:** un enlace interno en inglés redirige a /en/blog (ver victoria rápida 3).
- **Medio:** sin Content-Security-Policy.
- **Bajo:** `lastmod` del sitemap poco fiable (5 URL con fecha futura, 49 con la misma fecha); cookie `kt-country` en HTML cacheado; el 404 trae dos meta robots; sin `security.txt`.

## Calidad de contenido — 60

E-E-A-T 55 (Experiencia 55, Pericia 55, Autoridad 40, Confianza 68); citabilidad para IA 72.
- **Alta:** casos de estudio plantilla; errores de horario; guía de precios sin mercado; blog corto (475–1.109 palabras) que no cumple lo que promete el título (Wompi sin Bold ni retenciones; "casos de uso reales" sin casos).
- **Alta:** /en con poco valor propio.
- **Media:** autor sin credenciales ni `sameAs`; sin razón social ni NIT visibles; política de privacidad de 148 palabras; 12 de 21 meta descripciones se cortan con "…"; Bogotá y Medellín con 58 % de similitud.

## On-page — 78

- 148 páginas, todas con un solo H1, título y descripción; sin descripciones duplicadas.
- **Medio:** 92 títulos > 60 caracteres.
- **Bajo:** título duplicado "Blog · K&T Code" en /blog y /en/blog.
- **Bajo:** el carrusel de reseñas, la paleta de búsqueda y el juego van en el HTML de todas las páginas.

## Datos estructurados — 76

**Funciona:** JSON-LD válido en las 13 páginas revisadas; @id coherentes (Organization, WebSite, Person); BlogPosting completo; sin reseñas autoproclamadas.
- **Alta:** LocalBusiness sin dirección completa, geo ni horario (o pasar a `Organization` + `ProfessionalService` si atienden en remoto; no inventar datos).
- **Alta:** precio de /desarrollo-web-cucuta no coincide con el texto.
- **Media:** precios "desde" como `price` exacto; las ofertas de /precios sin `price` ni `itemOffered`.
- **Info:** Google retiró los resultados enriquecidos de FAQ (mayo 2026); mantener FAQPage es opcional.
- **Baja:** Person sin `sameAs`; `isPartOf` apunta a un Blog que no se declara.

## Rendimiento — 62 (Lighthouse móvil, laboratorio)

| Página | Rendimiento | LCP | TBT | CLS | Accesibilidad / Buenas prácticas / SEO |
|---|---|---|---|---|---|
| / | 41 | 5,5 s | 1.630 ms | 0 | 100 / 100 / 100 |
| /servicios/landing-pages | 71 | 4,4 s | 470 ms | 0 | 100 / 100 / 100 |
| /blog/que-es-una-api-y-para-que-sirve | 71 | 4,6 s | 440 ms | 0 | 100 / 100 / 100 |
| /proyectos | 86 | 3,8 s | 180 ms | 0 | 100 / 100 / 100 |

El inicio es el más lento: la demo animada, el juego, el carrusel y el HTML de ~540 KB suman mucho trabajo de JavaScript en móvil (TBT 1,6 s). Son mediciones de laboratorio en este servidor; conviene confirmarlas con PageSpeed Insights en vivo.

## Imágenes — 85

Las imágenes de contenido tienen `alt`; las únicas sin texto son las banderas decorativas del selector de país (correcto). Faltan imágenes OG propias por artículo (comparten la genérica).

## Búsqueda con IA — 72

**Funciona:** 10 rastreadores de IA reciben 200; robots.txt los deja pasar; páginas renderizadas en servidor; llms.txt (36 KB) y llms-full.txt (308 KB) válidos con sección "Cómo citarnos"; blogs con resumen, tablas, FAQ, fuentes, autor y fechas.
- **Alta:** "K&T Solutions Web" en el footer y en `sameAs`.
- **Alta:** sin YouTube, LinkedIn ni Wikidata.
- **Media:** H2 en forma de pregunta con respuesta en la primera frase; el artículo de ChatGPT no lista todos los bots (Claude-SearchBot, Google-Extended, Applebot-Extended).
- **Media:** versión Markdown de las páginas; llms.txt en inglés.

## Experiencia de búsqueda — 65

- **Crítica:** "agencia desarrollo web colombia" lo dominan directorios (Clutch, GoodFirms…). Hay que estar en ellos con reseñas.
- **Alta:** perfil nearshore EE. UU. débil: sin "nearshore" ni zona horaria en /en, sin botón para agendar llamada, el cliente de EE. UU. (ECG Construction) no aparece primero, y "From 200 USD" suena a freelance barato.
- **Alta:** "qué es una api" es puramente informativa (AWS, Oracle, Cloudflare); poco probable que convierta.
- **Media:** /desarrollo-web-cucuta sin "Diseño" en el título, sin mapa ni reseñas; la comparativa de pasarelas (la que más clics trae) es corta y no incluye Bold ni ePayco.

Puntajes por perfil (inicio / landing pages): pyme Colombia 77 / 79 · emprendedor 74 / 76 · empresa EE. UU. nearshore 46 / 49.

## Limitaciones

- Sin datos reales de Google (Search Console, CrUX, GA4) ni de backlinks (Moz). Para incluirlos: `"$HOME/.claude/skills/seo/scripts/claude-seo" run google_auth.py --setup`.
- SERP vía búsqueda web, sin paquete local ni AI Overview.
- Reddit y LinkedIn bloquean al cliente automatizado: no se pudo verificar la presencia de marca allí.
