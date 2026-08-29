# Calendario editorial K&T Code — 12 blogs

Todos los artículos están preparados en MDX y programados a las **08:00, hora de Colombia (UTC-5)**.

| Fecha | Slug | Keyword principal |
|---|---|---|
| 2026-08-31 | `agentes-ia-empresas-colombia` | agentes de IA para empresas |
| 2026-09-02 | `automatizar-whatsapp-business-con-ia` | automatizar WhatsApp con IA |
| 2026-09-04 | `medir-visibilidad-chatgpt-gemini-google-ai-mode` | medir visibilidad en ChatGPT |
| 2026-09-07 | `cuanto-cuesta-automatizar-procesos-ia-colombia` | cuánto cuesta automatizar procesos con IA en Colombia |
| 2026-09-09 | `excel-vs-erp-vs-software-a-medida` | Excel vs ERP vs software a medida |
| 2026-09-11 | `google-ai-overviews-ai-mode-seo` | Google AI Overviews SEO |
| 2026-09-14 | `chatbot-vs-agente-ia` | chatbot vs agente de IA |
| 2026-09-16 | `integrar-whatsapp-crm-inventario-facturacion` | integrar WhatsApp CRM inventario facturación |
| 2026-09-18 | `agentic-commerce-ecommerce-ia` | agentic commerce |
| 2026-09-21 | `llms-txt-2026` | llms.txt |
| 2026-09-23 | `seo-agentico-2026` | SEO agéntico |
| 2026-09-25 | `calcular-roi-automatizacion-software-ia` | ROI automatización |## Reglas de publicación

- `draft: false` y `publishedAt <= now`: el artículo puede ser público.
- `publishedAt > now`: no debe aparecer en `/blog`, sitemap, RSS, relacionados ni búsquedas internas.
- Una URL programada visitada directamente antes de su fecha debe responder `404`.
- `updatedAt` solo se cambia cuando exista una actualización editorial real.
- Las URLs canónicas ya están definidas en cada frontmatter.
- El campo `sources` debe renderizarse al final como **Fuentes consultadas** con enlaces normales.
- `imagePrompt` es una nota editorial: no debe mostrarse al lector ni convertirse en `alt`. Puede utilizarse luego para crear una imagen individual.
- Si no existe una imagen por artículo, usar el OG fallback actual del sitio o generar una OG dinámica; no dejar una URL 404.

## SEO/GEO editorial incluido

Cada artículo contiene:
- respuesta breve al inicio;
- H2/H3 orientados a preguntas e intención de búsqueda;
- tablas o ejemplos cuando aportan claridad;
- enlaces internos a servicios de K&T Code;
- FAQs visibles;
- fuentes verificables;
- canonical, locale, keyword principal y keywords secundarias;
- enfoque Colombia/Latinoamérica sin forzar localización donde no corresponde.

## Importante

Los campos `primaryKeyword` y `secondaryKeywords` son para estrategia y control editorial. No es necesario generar una etiqueta `<meta name="keywords">`; Google no la necesita para ranking.

Para visibilidad en ChatGPT Search, auditar `robots.txt` y no bloquear `OAI-SearchBot`. La política de `GPTBot` es independiente y no debe confundirse con el crawler de búsqueda.

No crear `llms.txt` como supuesto requisito de GEO. Si se implementa experimentalmente, que sea opcional, autogenerado y medido.
