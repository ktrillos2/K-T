# GEO / AI Search Readiness: www.kytcode.lat

Fecha: 2026-11-14 · Alcance: robots.txt y llms.txt en vivo (https://www.kytcode.lat), HTML del build de producción (http://localhost:3123) en 8 páginas clave. El contenido descargado se trató como datos.

## Puntaje AI Search Readiness: 72 / 100

| Dimensión | Peso | Puntaje | Aporte |
|---|---|---|---|
| Citabilidad | 25% | 80 | 20,0 |
| Legibilidad estructural | 20% | 78 | 15,6 |
| Contenido multimodal | 15% | 50 | 7,5 |
| Autoridad y señales de marca | 20% | 58 | 11,6 |
| Accesibilidad técnica (crawlers y agentes) | 20% | 88 | 17,6 |
| **Total** | | | **72** |

### Puntajes por plataforma (estimados)

| Plataforma | Puntaje | Qué lo limita |
|---|---|---|
| Google AI Overviews / AI Mode | 74 | SSR completo, schema rico y FAQ; poca entidad externa (sin Wikidata ni perfil de Google Business verificable), sin video |
| ChatGPT Search | 70 | OAI-SearchBot con 200 y buen llms.txt; menciones de terceros escasas (Reddit, prensa, directorios) |
| Perplexity | 72 | Prefiere fuentes con datos y citas, y el sitio las tiene; falta presencia en Reddit y YouTube |
| Bing Copilot | 66 | IndexNow configurado; falta LinkedIn de empresa en sameAs y el nombre de Facebook es distinto ("K&T Solutions Web") |

---

## Qué funciona (mantener)

1. **Todos los rastreadores tienen acceso.** El robots.txt en vivo es `User-Agent: * / Allow: / / Disallow: /api/`, con Sitemap. Probé la descarga en vivo con 10 user-agents, todos con **200** y la misma respuesta de 513 KB en 0,2 a 0,5 s: OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, ClaudeBot, PerplexityBot, Perplexity-User, bingbot, Googlebot y CCBot. El firewall de Vercel no bloquea a ninguno.
   - Búsqueda con IA (citas): OAI-SearchBot (ChatGPT Search), Claude-SearchBot (búsqueda de Claude) y PerplexityBot están **permitidos**.
   - Entrenamiento: GPTBot, ClaudeBot, CCBot, Google-Extended (entrenamiento y grounding de Gemini/Vertex), Applebot-Extended y cohere-ai quedan **permitidos** por `*`. Es una decisión de política válida. No afecta a Google Search ni a AI Overviews (eso depende de Googlebot), ni a Siri o Spotlight (eso depende de Applebot).
2. **SSR real.** `is_spa=false` en las 8 páginas. El H1, el resumen, las tablas, las FAQ y el JSON-LD vienen en el HTML inicial, así que los rastreadores de IA no necesitan ejecutar JavaScript.
3. **llms.txt de calidad** (36 KB, 170 líneas, 200 `text/plain; charset=utf-8`). Tiene H1, un blockquote y secciones H2 de servicios y precios en COP, páginas principales, servicios, industrias, ciudades, casos, blog, FAQ, reseñas, **"Cómo citarnos"** y Optional (llms-full, sitemap, RSS). Los 111 enlaces son absolutos. Las variantes "KyT Code / Kyt Code / KYT Code / kytcode / K and T Code" aparecen solo aquí y en `alternateName`, como decidió el dueño.
4. **llms-full.txt** (308 KB) trae el texto completo de 26 casos, servicios y 49 artículos. Las páginas lo enlazan con `<link rel="alternate" type="text/plain" href="/llms.txt|/llms-full.txt">`.
5. **Los blogs son muy citables.** Cada artículo trae:
   - un bloque "En resumen" con `data-tldr` (3 viñetas) que responde en las primeras 40 a 60 palabras;
   - tablas con `<caption>`, `<th>` y `scope` (2 a 4 por artículo);
   - FAQ visible que coincide con `FAQPage`;
   - una sección "Fuentes" con enlaces externos (MDN, GraphQL, OpenAI, Google Search Central) también declarados en `citation`;
   - firma visible ("Por Keyner Trillos · 22 de junio de 2026 · Actualizado 26 de octubre de 2026"), `article:modified_time` y `BlogPosting` con `datePublished`/`dateModified` y autor `Person` con `@id`.
6. **La entidad está bien declarada.** Un único `@id` `https://www.kytcode.lat/#organization` (LocalBusiness) con `name: "K&T Code"`, `alternateName`, `foundingDate`, `founder`, `logo`, `knowsAbout` y `areaServed`, más WebSite y Person enlazados en todas las páginas. **En el texto visible no aparece ninguna variante "KyT/kytcode" como nombre de marca.** Solo salen el dominio del correo de contacto y los handles `@kytcode` de Instagram y TikTok, que son identificadores y no el nombre.
7. **Las páginas de servicio y ciudad responden primero.** /servicios/landing-pages abre con una definición de 55 palabras más precio y plazo ("Una landing page es una página web sencilla… Desde $450.000 COP, lista en 7 a 12 días"). /desarrollo-web-cucuta abre con la oferta local, precios y municipios.
8. **i18n correcto:** `lang="es-CO"` y `lang="en"`, hreflang es/en/x-default en la home y canonical en todas las páginas.
9. **Árbol de accesibilidad sano en lo esencial:** 0 botones sin nombre (de 140 a 183 por página) y 0 enlaces sin nombre. Hay `<main>` y varios `<nav>`. Los anclas `#` de los H2 y los contadores animados llevan `aria-hidden="true"`, y las banderas decorativas tienen `alt=""`.
10. **IndexNow** está configurado (`scripts/indexnow.mjs` y claves en `/public/*.txt`), lo que ayuda a Bing y Copilot a detectar cambios rápido.
11. La URL `/precios/precio-pagina-web-colombia` hace un **308** hacia `/blog/cuanto-cuesta-una-pagina-web-en-colombia`. Ya no está en el sitemap, en llms.txt ni en enlaces internos, así que la consolidación es correcta.

---

## Hallazgos

### ALTA

**H1. Hay un nombre de marca distinto visible en todas las páginas: "K&T Solutions Web" (Facebook)**
- Evidencia: en el footer de todas las páginas se ve `Facebook <span class="muted">K&T Solutions Web</span>`, con enlace a `https://www.facebook.com/KTSolutionsWeb`. Ese mismo enlace está en `sameAs` del `#organization` y en "Cómo citarnos" de llms.txt. Origen: `src/lib/site.ts:21`.
- Impacto: los modelos juntan entidades por nombre y `sameAs`. Un tercer nombre visible ("K&T Solutions Web") compite con "K&T Code" y se sale de la regla del dueño (nombre visible único). La página de Facebook enlazada desde `sameAs` publica otro nombre, y eso debilita la reconciliación de la entidad en Google y en Bing/Copilot.
- Arreglo: renombrar la página de Facebook a "K&T Code" y, si se puede, cambiar el slug a `/kytcode`. Mientras tanto, cambiar el `handle` visible en `site.ts` a "K&T Code" o a `@KTSolutionsWeb` (un identificador, no un nombre de marca). Esfuerzo: 15 min de código más el cambio en Facebook.

**H2. Casi no hay señales de marca externas (la entidad existe solo en el propio sitio)**
- Evidencia:
  - Wikidata: 0 resultados para "K&T Code".
  - Wikipedia (es): 0 resultados para "kytcode".
  - YouTube: `https://www.youtube.com/@kytcode` da **404**, y es la señal con mayor correlación con citas (~0,737).
  - LinkedIn de empresa: no está en `sameAs` (la consulta directa dio 403, sin verificar).
  - Reddit: no se pudo verificar (403 al cliente automatizado).
  - `sameAs` solo tiene Instagram, TikTok y Facebook. Marca fundada en 2025.
- Impacto: ChatGPT, Perplexity y Copilot citan sobre todo fuentes que otros mencionan. Sin menciones de terceros, el sitio sale para consultas long-tail en las que su contenido es la mejor respuesta, pero no para "mejor agencia web en Cúcuta/Colombia".
- Arreglo, por orden de impacto:
  1. Crear un canal de YouTube "K&T Code" (@kytcode) con 3 a 5 videos cortos de casos y de "cuánto cuesta una página web en Colombia", y enlazarlo en `sameAs`.
  2. Crear la página de empresa en LinkedIn y el perfil de LinkedIn de Keyner Trillos, y agregarlos a `sameAs` del Organization y de Person.
  3. Reclamar y completar el Google Business Profile en Cúcuta y agregar su URL a `sameAs`.
  4. Crear un ítem en Wikidata (empresa, país CO, sitio oficial, fecha de fundación) cuando haya al menos 2 fuentes independientes.
  5. Conseguir menciones en directorios y medios regionales (Clutch, Sortlist, La Opinión de Cúcuta) y participar con valor real en r/Colombia, r/Cucuta y r/webdev.
- Esfuerzo: medio a alto, de 2 a 8 semanas.

### MEDIA

**M1. La persona autora no tiene `sameAs`, así que no hay forma de verificarla fuera del sitio**
- Evidencia: `person()` en `src/lib/schema.ts:81-94` tiene name, jobTitle, image, url, worksFor y knowsAbout, pero no `sameAs`. La página `/autores/keyner-trillos` responde 200.
- Arreglo: agregar `sameAs` con el LinkedIn, GitHub o X del autor. En la firma, enlazar "Keyner Trillos" a `/autores/keyner-trillos` si todavía no lo está. Esfuerzo: 15 min.

**M2. No hay versión Markdown por URL ni negociación de contenido para agentes**
- Evidencia: `curl -H 'Accept: text/markdown' /` y `/blog/que-es-una-api-y-para-que-sirve` devuelven `text/html`, y `/blog/que-es-una-api-y-para-que-sirve.md` da **404**. El HTML pesa entre 500 y 545 KB para unas 600 a 1.400 palabras de contenido, una relación texto/HTML menor al 2% por la paleta de comandos, el selector de países con 22 banderas, el footer, el juego "Rompe el logo" y el payload RSC.
- Impacto: los agentes (ChatGPT-User, Perplexity-User, Claude con navegación, agentes MCP) gastan contexto en ruido. Hoy llms-full.txt mitiga en parte, pero es un archivo de 308 KB y no tiene granularidad por página.
- Arreglo: exponer `/<ruta>.md` (o `?format=md`) desde el mismo generador de `src/lib/llms.ts`, responder `text/markdown` cuando `Accept` lo prefiera (con middleware y `Vary: Accept`), y anunciarlo en cada página con `<link rel="alternate" type="text/markdown" href="/blog/slug.md">`. Esfuerzo: 1 a 2 días.

**M3. Poco contenido multimodal citable**
- Evidencia:
  - 0 `<video>` y 0 `<iframe>` en las 8 páginas.
  - Los artículos no tienen imágenes de contenido: solo banderas, con `alt=""`, y la foto del autor.
  - `og:image` es el genérico `/og.png` en los blogs (por ejemplo, el de API).
  - Las calculadoras y los "TitleArt" interactivos no se pueden extraer y van `aria-hidden`.
- Impacto: AI Overviews y AI Mode muestran miniaturas y videos, y Perplexity y Copilot privilegian fuentes con imagen. Sin YouTube se pierde la señal más correlacionada.
- Arreglo: generar una OG image por artículo (con `next/og`: título + dato clave) y agregar 1 o 2 diagramas o capturas por artículo con `alt` descriptivo (por ejemplo, el flujo solicitud → API → respuesta o la tabla de precios como imagen). Incrustar un video corto de YouTube en los 3 artículos principales y en `/servicios/landing-pages`, con `VideoObject`. Esfuerzo: medio.

**M4. Algunos H2 de artículos no son preguntas y abren con contexto en vez de la respuesta**
- Evidencia: en /blog/como-aparecer-en-chatgpt-2026 hay 0 de 7 H2 en forma de pregunta. "OAI-SearchBot vs. GPTBot" abre con "Confundir el rastreador de búsqueda con el de entrenamiento es el error más común…" en vez de la respuesta, y sus secciones tienen 171, 256 y 266 palabras (más largas que el rango ideal de unos 130 a 170). En /blog/cuanto-cuesta… hay 1 de 7 H2 interrogativos. Las páginas de servicio y ciudad tienen H2 genéricos ("Qué incluye", "Ideal para", "Cómo trabajamos").
- Arreglo:
  - Reescribir los H2 como preguntas reales ("¿Qué diferencia hay entre OAI-SearchBot y GPTBot?", "¿Qué hace subir el precio de una página web?").
  - Hacer que la primera frase de cada sección sea la respuesta completa (por ejemplo: "OAI-SearchBot indexa para ChatGPT Search; GPTBot solo recolecta datos para entrenamiento. Bloquear GPTBot no te saca de ChatGPT Search.").
  - Partir las secciones de más de 200 palabras con H3.
- Esfuerzo: entre 30 y 60 min por artículo.

**M5. El artículo sobre crawlers de IA no cubre a Claude, Google-Extended ni Applebot-Extended**
- Evidencia: el texto de /blog/como-aparecer-en-chatgpt-2026 nombra OAI-SearchBot, GPTBot y PerplexityBot. No menciona Claude-SearchBot/ClaudeBot, Google-Extended (que gobierna Gemini y su grounding, no AI Overviews) ni Applebot-Extended. Además, el comentario de `src/app/robots.ts` describe a ClaudeBot y Google-Extended como "motores de IA" en general.
- Impacto: es una oportunidad de citabilidad (consultas "Claude-SearchBot robots.txt", "Google-Extended AI Overviews") y de precisión técnica, con la que el sitio refuerza su autoridad en GEO.
- Arreglo: agregar una tabla "Bot → empresa → para qué sirve → efecto de bloquearlo" con OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, PerplexityBot, Perplexity-User, Googlebot, Google-Extended, Applebot, Applebot-Extended, bingbot y CCBot, citando la documentación oficial de cada empresa. Corregir también el comentario de robots.ts. Esfuerzo: 1 h.

### BAJA

**B1. Faltan `/.well-known` y metadatos para agentes.** `security.txt`, `llms.txt`, `agent.json`, `agent-card.json`, `api-catalog`, `mcp.json` y `ai-plugin.json` dan 404, y no hay `/license.xml` RSL 1.0. Arreglo: publicar `/.well-known/security.txt` (RFC 9116), lo mínimo de confianza. Si el dueño quiere declarar términos de uso para IA, agregar RSL 1.0 (`/license.xml` + `License:` en robots.txt). No hace falta para aparecer en búsquedas con IA. Esfuerzo: 30 min.

**B2. No hay llms.txt en inglés.** `/en/llms.txt` da 404 y el llms.txt solo describe el contenido en español, aunque menciona /en. Arreglo: agregar a llms.txt una sección "## English" con los servicios, precios en USD y blogs EN, o publicar `/en/llms.txt` y enlazarlo. Esfuerzo: 1 h.

**B3. Hay un detalle inconsistente en llms.txt.** "Proyectos: 25 casos de estudio" y la sección "Casos de estudio" lista 25, mientras que llms-full.txt tiene 26 bloques "## Caso". Arreglo: derivar el número del dataset en `src/lib/llms.ts` en lugar de dejarlo fijo. Esfuerzo: 10 min.

**B4. Ruido en el texto extraído y en la jerarquía de títulos.**
- En el árbol de accesibilidad están bien ocultos, pero los extractores que ignoran `aria-hidden` ven:
  - el glifo `#` dentro de cada H2 (`<h2><a aria-hidden>#</a>Qué es…`);
  - las columnas de odómetro "0 1 2 3 4 5 6 7 8 9" en las tarjetas relacionadas;
  - "Página Web TOTAL $ 9 . 806 .000";
  - el marquee duplicado en la home ("Diseño hecho solo para ti… Diseño hecho solo para ti…").
- Además, el footer agrega un H2 "Rompe el logo" (juego) y 9 H3 de navegación a cada página.
- Arreglo:
  - mover el ancla `#` después del texto, o como pseudo-elemento CSS;
  - renderizar en SSR solo el valor final del odómetro y animar en el cliente;
  - cambiar los títulos del footer y del juego a `<p>` o `<div role="heading">` fuera del outline, o envolver el juego en `<aside>` sin H2.
- Esfuerzo: 1 a 2 h.

**B5. Detalles de accesibilidad para agentes con navegador.** No hay un enlace "Saltar al contenido". `#command-input` (la paleta de comandos) solo tiene `placeholder` y le falta `aria-label`/`<label>`. Las fechas de la firma no usan `<time datetime="2026-10-26">`. Arreglo: agregar el skip link, el `aria-label="Buscar en el sitio"` y envolver las fechas en `<time>`. Esfuerzo: 20 min.

**B6. Speakable en las páginas de servicio y ciudad.** El selector `["h1","header p"]` es genérico, y en páginas con varios `<header>` (nav, artículo) puede marcar texto que no corresponde. Arreglo: usar el mismo patrón de los blogs, con IDs dedicados como `#h-post` y `[data-tldr]`. Esfuerzo: 15 min.

---

## Estado de acceso de crawlers de IA (robots.txt en vivo)

| Bot | Para qué sirve | Regla | Respuesta en vivo |
|---|---|---|---|
| OAI-SearchBot | Citas en ChatGPT Search | Permitido (`*`) | 200 |
| ChatGPT-User | Navegación a pedido del usuario | Permitido | 200 |
| GPTBot | Entrenamiento de OpenAI (no afecta ChatGPT Search) | Permitido | 200 |
| Claude-SearchBot | Citas en la búsqueda de Claude | Permitido | 200 |
| ClaudeBot | Entrenamiento de Anthropic | Permitido | 200 |
| PerplexityBot / Perplexity-User | Índice y citas de Perplexity | Permitido | 200 / 200 |
| Googlebot | Google Search, AI Overviews y AI Mode | Permitido | 200 |
| Google-Extended | Entrenamiento y grounding de Gemini/Vertex (no afecta AI Overviews) | Permitido | n/a (token de robots) |
| bingbot | Bing y Copilot | Permitido | 200 |
| Applebot-Extended | Entrenamiento de Apple Intelligence (no afecta Siri ni Spotlight) | Permitido | n/a |
| CCBot / cohere-ai | Entrenamiento | Permitido | 200 / n/a |

## llms.txt
- `/llms.txt`: **presente y bien formado** (H1, blockquote, H2, listas de enlaces, sección Optional).
- `/llms-full.txt`: **presente** (308 KB).
- `/en/llms.txt` y `/.well-known/llms.txt`: ausentes (opcionales).
- RSL 1.0: ausente.

## Entidad de marca "K&T Code"
- Nombre visible: "K&T Code" de forma consistente (`og:site_name`, títulos, texto). Las variantes solo están en `alternateName` (Organization y WebSite) y en llms.txt, como pidió el dueño.
- Excepción visible: "K&T Solutions Web" en el footer (ver H1).
- Externo: Wikidata no, Wikipedia no, YouTube no (404), LinkedIn sin verificar y fuera de `sameAs`, Reddit sin verificar. Instagram y TikTok son @kytcode y Facebook es KTSolutionsWeb.

## Top 5 cambios de mayor impacto

| # | Cambio | Impacto | Esfuerzo |
|---|---|---|---|
| 1 | Unificar el nombre de Facebook a "K&T Code" y quitar "K&T Solutions Web" del footer (H1) | Alto | 15 min + cambio en Facebook |
| 2 | Canal de YouTube @kytcode con videos de casos y precios, embebidos con `VideoObject` y en `sameAs` (H2, M3) | Alto | 2 a 4 semanas |
| 3 | LinkedIn de empresa y del autor, Google Business Profile y Wikidata en `sameAs` de Organization y Person (H2, M1) | Alto | 1 a 2 semanas |
| 4 | H2 en forma de pregunta con respuesta en la primera frase y secciones de menos de 170 palabras en los blogs clave, más la tabla completa de bots en el artículo de ChatGPT (M4, M5) | Medio-alto | 3 a 5 h |
| 5 | Markdown por URL (`.md` + `Accept: text/markdown` + `<link rel="alternate" type="text/markdown">`), OG images por artículo y llms.txt en inglés (M2, M3, B2) | Medio | 2 a 3 días |

## Datos estructurados para audit-data.json (AI Search Readiness)

```json
{
  "category": "AI Search Readiness",
  "score": 72,
  "dimensions": {"citability": 80, "structural_readability": 78, "multimodal": 50, "authority_brand": 58, "technical_accessibility": 88},
  "platform_scores": {"google_aio": 74, "chatgpt": 70, "perplexity": 72, "bing_copilot": 66},
  "crawlers": {"OAI-SearchBot": "allowed", "Claude-SearchBot": "allowed", "PerplexityBot": "allowed", "Googlebot": "allowed", "bingbot": "allowed", "GPTBot": "allowed", "ClaudeBot": "allowed", "Google-Extended": "allowed", "Applebot-Extended": "allowed", "CCBot": "allowed"},
  "llms_txt": "present_valid", "llms_full_txt": "present", "rsl": "missing", "markdown_negotiation": "missing",
  "findings": [
    {"id": "GEO-H1", "severity": "high", "title": "Nombre de marca alterno visible 'K&T Solutions Web' (Facebook) y en sameAs", "file": "src/lib/site.ts:21"},
    {"id": "GEO-H2", "severity": "high", "title": "Señales de marca externas mínimas: sin Wikidata, YouTube (404), LinkedIn fuera de sameAs"},
    {"id": "GEO-M1", "severity": "medium", "title": "Person sin sameAs", "file": "src/lib/schema.ts:81"},
    {"id": "GEO-M2", "severity": "medium", "title": "Sin Markdown por URL ni negociación Accept: text/markdown; HTML de ~500 KB"},
    {"id": "GEO-M3", "severity": "medium", "title": "Sin video ni imágenes de contenido; og:image genérica en blogs"},
    {"id": "GEO-M4", "severity": "medium", "title": "H2 no interrogativos y secciones de más de 250 palabras en artículos clave"},
    {"id": "GEO-M5", "severity": "medium", "title": "Artículo de crawlers IA omite Claude-SearchBot, Google-Extended y Applebot-Extended"},
    {"id": "GEO-B1", "severity": "low", "title": "Sin /.well-known/security.txt ni RSL"},
    {"id": "GEO-B2", "severity": "low", "title": "Sin llms.txt en inglés"},
    {"id": "GEO-B3", "severity": "low", "title": "llms.txt dice 25 casos y llms-full tiene 26"},
    {"id": "GEO-B4", "severity": "low", "title": "Ruido extraíble: '#' en H2, odómetros, marquee duplicado, H2/H3 del footer"},
    {"id": "GEO-B5", "severity": "low", "title": "Sin skip link, input de la paleta sin label, fechas sin <time>"},
    {"id": "GEO-B6", "severity": "low", "title": "Speakable genérico en páginas de servicio y ciudad"}
  ]
}
```
