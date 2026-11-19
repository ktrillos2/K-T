# Auditoría SEO, GEO y AEO · 19 de noviembre de 2026

Revisión técnica de www.kytcode.lat (skill `auditoria-seo` + `seo-geo`). Base anterior: auditoría completa del 14 de noviembre (`kytcode.lat-audit/`, 74/100).

**Cómo se midió.** Lighthouse 13.6 en móvil simulado sobre el build de producción local (mismo código que Vercel); el sitemap, los enlaces, los metadatos y el JSON-LD se rastrearon en el sitio en vivo (157 URL) y otra vez en el build local con las correcciones. Search Console no se pudo consultar: la suscripción de GSC Wizard venció (la última foto es `gsc-2026-11.md`).

## Lighthouse móvil (laboratorio)

| Página | Rendimiento antes → después | Accesibilidad | Buenas prácticas | SEO | Navegación con agentes |
|---|---|---|---|---|---|
| / | 88 → 88 (la primera corrida en frío dio 46) | 100 → 100 | 100 | 100 | 3/3 |
| /en | 90 → 89 | 100 → 100 | 100 | 100 | 3/3 |
| /precios | 87 → 87 | **98 → 100** | 100 | 100 | 3/3 |
| /proyectos | 98 → 97 | 100 → 100 | 100 | 100 | 3/3 |
| /blog | 89 → 92 | 100 → 100 | 100 | 100 | 3/3 |
| /blog/pagina-web-para-abogados | 99 → 94–98 | 100 → 100 | 100 | 100 | 3/3 |
| /servicios/landing-pages | 96 → 93 | 100 → 100 | 100 | 100 | 3/3 |
| /desarrollo-web-peru | 96 → 97 | 100 → 100 | 100 | 100 | 3/3 |
| /desarrollo-web-bogota | 92 → 96 | 100 → 100 | 100 | 100 | 3/3 |

LCP 1,2–2,2 s y CLS 0 en todas. Las diferencias de rendimiento están dentro de la variación normal entre corridas. La auditoría de nombre accesible (`label-content-name-mismatch`) fallaba en las 9 páginas y ahora en ninguna.

## Rastreo (157 URL del sitemap)

| Revisión | Antes | Después |
|---|---|---|
| URL del sitemap con 200 sin redirección | 157/157 | 157/157 |
| Enlaces internos que redirigen | 4 | 0 |
| Títulos de más de 65 caracteres | 58 | 26 (más de 70: solo 3, a propósito) |
| Descripciones cortadas con «…» | 19 | 0 (todas entre 70 y 160) |
| Páginas con subtítulos «#Título» | 83 | 0 |
| JSON-LD inválido | 0 | 0 |
| Páginas sin un único H1 | 0 | 0 |

Datos estructurados: `Organization` con `alternateName` en todas las páginas, `Service` con `areaServed` en servicios, ciudades y países, y `FAQPage` donde hay preguntas. Canonical y hreflang es/en/x-default recíprocos.

## GEO y AEO

- **Rastreadores de IA:** GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Googlebot, Bingbot, Applebot y CCBot reciben 200 con el HTML completo. `robots.txt` deja pasar a todos (solo bloquea `/api/`).
- **llms.txt** (37 KB), **llms-full.txt** (330 KB), `security.txt` y los feeds RSS responden 200. Lighthouse valida `llms.txt`. Google no usa este archivo; sirve para otros asistentes.
- **Contenido citable:** los artículos tienen resumen al inicio, autor, fechas de publicación y actualización, tablas, preguntas frecuentes y `speakable`. Los servicios abren con la definición («Una landing page es…») y el precio de partida.
- **Riesgo corregido:** las portadas decorativas del blog ponían en el HTML un monto aleatorio («TOTAL $9.806.000» en la guía de precios, «$2.135.000» en mantenimiento). Un buscador con IA podía citarlo como precio real. Ahora el monto lo dibuja el CSS y la portada lleva `data-nosnippet`.
- **Entidad:** «¿Qué es K&T Code?» ahora usa el nombre completo de la marca en el título (antes «¿Qué es K&T?»).

## Visibilidad (Ubersuggest, Colombia, español)

Primera medición guardada: 19 palabras clave orgánicas, unas 7 visitas al mes estimadas, autoridad de dominio 13, 800 enlaces de 37 dominios (795 follow). Tendencia de palabras clave: agosto 2 → septiembre 15 → octubre 19. Ubersuggest aún muestra URL antiguas que hoy redirigen, así que sus cifras para un sitio pequeño son aproximadas.

## Qué se corrigió

1. **Enlaces en inglés que redirigían:** /en/servicios, /en/desarrollo-web-estados-unidos y /en/desarrollo-web-peru enlazaban la guía de precios de Latinoamérica (solo existe en español); el artículo en inglés agencia vs. freelance enlazaba las páginas de Bogotá, Medellín y Cúcuta (solo en español). Ahora apuntan a guías que existen en inglés (`guideEn` por país).
2. **Texto en español dentro de páginas en inglés:** /en/desarrollo-web-estados-unidos y /en/desarrollo-web-peru mostraban «Stripe, PayPal y tarjetas de crédito» y «Yape, Plin, Niubiz y Culqi». Los medios de pago ahora tienen versión en cada idioma.
3. **Títulos:** 34 páginas recortadas a 64 caracteres o menos. Ciudades y países pasan a «Diseño y desarrollo de páginas web en <lugar> · K&T Code». No se tocaron los títulos en observación (Wompi, guía de precios de Colombia y «How to Appear in ChatGPT Search», que posiciona en inglés).
4. **Descripciones:** 21 reescritas para que terminen en frase completa. `clip()` ahora cierra en la última coma antes de cortar con «…» (sin dejar paréntesis ni preguntas abiertos).
5. **Subtítulos del blog:** el «#» del enlace ancla salía dentro del texto del H2 («#Rangos de precio…»). Ahora lo dibuja el CSS; se ve igual al pasar el cursor.
6. **Accesibilidad:** h2 (solo para lectores de pantalla) en la sección de planes de /precios; el selector de país, el botón flotante de WhatsApp y los botones A−/A+ del blog tienen nombres accesibles que empiezan con el texto visible.

## Recomendaciones (no se cambiaron)

1. **Search Console:** sin datos desde el 2 de noviembre. Conectarlo de nuevo para medir en 3–4 semanas el CTR de las 34 páginas con título nuevo.
2. **/en/proyectos/ecg-construction** tiene `noindex` (en inglés solo se indexa GMX Gaming). Es el cliente de EE. UU.: conviene indexarlo junto con el bloque para empresas de EE. UU. (plan, punto 3).
3. **23 títulos de 66 a 70 caracteres:** en celular Google los muestra casi completos. Los agentes del blog pueden acortarlos al actualizar cada artículo.
4. **Marca fuera del sitio:** `sameAs` sigue apuntando a facebook.com/KTSolutionsWeb; faltan LinkedIn, Clutch, Google Business Profile y YouTube (los da el dueño).
5. **Rendimiento del inicio:** TBT de ~470 ms en laboratorio y HTML de ~490 KB (plan, punto 9).
6. **Opcionales de GEO:** `llms.txt` en inglés y versión Markdown de las páginas principales (plan, punto 13); H2 en forma de pregunta en servicios (punto 12).
