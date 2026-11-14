# Plan de acción SEO — www.kytcode.lat (noviembre 2026)

Puntaje actual: **74/100**. Detalle en `FULL-AUDIT-REPORT.md` y `findings/`.

Leyenda: 🛠️ lo puede hacer el código (agente o desarrollador) · 👤 lo hace el dueño.

## Fase 1 — Correcciones rápidas (semana 1)

| # | Prioridad | Acción | Quién | Esfuerzo |
|---|---|---|---|---|
| 1 | Alta | Corregir horarios de México (siempre 1 h de diferencia) y EE. UU. (coincide con Nueva York/Miami de noviembre a marzo; Chicago/Houston 0–1 h) en `src/content/landings/countries.ts` | 🛠️ | 15 min |
| 2 | Alta | Renombrar la página de Facebook a "K&T Code"; cambiar la etiqueta del footer y `SITE.socials` | 👤 + 🛠️ | 15 min |
| 3 | Alta | Alinear precio del schema de /desarrollo-web-cucuta con el texto y usar `AggregateOffer` (`lowPrice`/`highPrice`) | 🛠️ | 30 min |
| 4 | Media | Arreglar enlace en inglés hacia `/en/blog/cuanto-cuesta-una-pagina-web-latinoamerica` (no existe en inglés) | 🛠️ | 10 min |
| 5 | Media | Acortar títulos de más de 60 caracteres (92 páginas; empezar por servicios, precios y los 10 artículos con más impresiones) | 🛠️ | 2 h |
| 6 | Media | Diferenciar títulos de /blog y /en/blog; corregir meta descripciones cortadas con "…" en `src/lib/seo.ts` | 🛠️ | 30 min |
| 7 | Baja | Sitemap: `lastmod` real por página (sin fechas futuras); quitar la meta robots duplicada del 404; añadir `/.well-known/security.txt` | 🛠️ | 1 h |

## Fase 2 — Mejoras de alto impacto (semanas 2–3)

| # | Prioridad | Acción | Quién | Esfuerzo |
|---|---|---|---|---|
| 8 | Alta | Reescribir "El reto" de cada caso de estudio con el problema real del cliente y 1–2 cifras de negocio (leads, pedidos, ventas, tiempo ahorrado) con su periodo | 👤 datos + 🛠️ texto | 1 h por caso |
| 9 | Alta | Guía "¿Cuánto cuesta una página web en Colombia?": tabla de rangos por tipo de proveedor (hazlo tú, freelance, agencia), dominio, hosting y mantenimiento; precio en el título | 🛠️ | 3 h |
| 10 | Alta | Páginas en inglés: dejar solo temas con demanda en EE. UU. y ampliarlos (nearshore, costos en USD, zona horaria). A las traducciones de temas locales colombianos, `noindex` o redirección a la versión en español | 🛠️ | 1 día |
| 11 | Alta | /en: hero nearshore, zona horaria, botón "Agendar llamada", ECG Construction como primer caso, paquetes en USD | 🛠️ | 1 día |
| 12 | Media | Comparativa de pasarelas: sumar Bold y ePayco, tarifas por medio de pago, retenciones, calculadora y CTA a tienda virtual | 🛠️ | 4 h |
| 13 | Media | Schema: `Organization` + `ProfessionalService` (o LocalBusiness solo con dirección real), `Person.sameAs`, nodo `Blog` | 🛠️ | 2 h |
| 14 | Media | Rendimiento del inicio en móvil (TBT 1,6 s): cargar la demo, el juego y el carrusel de reseñas solo al acercarse a ellos; reducir CSS/JS inline | 🛠️ | 1 día |

## Fase 3 — Contenido y autoridad (mes 2)

| # | Prioridad | Acción | Quién |
|---|---|---|---|
| 15 | Crítica | Perfiles con reseñas en Clutch, GoodFirms y TechBehemoths (dominan "agencia desarrollo web colombia") | 👤 |
| 16 | Alta | LinkedIn de empresa y de Keyner Trillos; Google Business Profile verificado; Wikidata. Agregarlos a `sameAs` | 👤 + 🛠️ |
| 17 | Alta | Pedir a clientes un enlace "Desarrollado por K&T Code" y reseñas en Google | 👤 |
| 18 | Media | Ampliar artículos cortos (Wompi, remarketing, agentes de IA) con casos reales; H2 en pregunta con respuesta en la primera frase | 🛠️ |
| 19 | Media | Página de autor con credenciales; razón social y NIT visibles; política de privacidad completa | 👤 datos + 🛠️ |
| 20 | Media | Canal de YouTube con casos y precios; videos embebidos con `VideoObject` | 👤 |
| 21 | Baja | Imagen OG propia por artículo; llms.txt en inglés; versión Markdown de las páginas | 🛠️ |

## Fase 4 — Medición (continuo)

- Conectar Search Console, PageSpeed/CrUX y GA4 a Claude SEO (`google_auth.py --setup`) para la próxima auditoría con datos reales.
- Repetir la auditoría en 4–6 semanas y comparar con este informe (74/100).
- Vigilar las 36 URL "rastreadas sin indexar" y el CTR de las páginas con títulos nuevos.
