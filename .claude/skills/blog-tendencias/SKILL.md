---
name: blog-tendencias
description: Investiga tendencias de búsqueda con el conector Keyword Tool y publica 2 artículos interactivos nuevos (español + inglés) en el blog de K&T Code, orientados a conseguir clientes de desarrollo web. Úsalo cuando pidan "blog semanal", "artículos de tendencias" o lo dispare la tarea programada.
---

# Blog por tendencias (K&T Code)

Objetivo: atraer clientes de desarrollo web de forma orgánica. Cada corrida publica **2 artículos nuevos**, reales y útiles, en español e inglés, que terminen llevando al lector a los servicios y precios de K&T Code.

## 1. Ver qué ya existe (no repetir temas)

- Temas y slugs publicados: `src/content/blog/meta.ts` (arreglos `ES_ONLY` y `BILINGUAL`) y `src/content/blog/meta.en.ts`.
- Un tema está repetido si otro artículo responde la misma intención de búsqueda, aunque el título sea distinto.

## 2. Investigar con Keyword Tool

Herramienta: `keywordtool-suggestions-guest` (conector "Keyword Tool: Free SEO Keyword Research"). Si no aparece, búscala con ToolSearch (`keywordtool`).

- Siempre `country: "Colombia"`, `language: "Spanish"`, `limit: 30`.
- Usa `type: "suggestions"` y también `type: "questions"` (las preguntas son oro para artículos).
- Cuota gratis: 60 consultas/hora y 120/día. Usa **máximo 20** por corrida. Revisa antes con `keywordtool-quota-guest`.
- La versión gratis no da volúmenes: mide la demanda por cuántas sugerencias devuelve una semilla (`total_count`) y por cuántas variantes de una misma intención aparecen.

Semillas para rotar (elige 8–12 distintas cada vez, mezclando grupos):

- **Comerciales (prioridad):** "precio página web", "cuánto cuesta una tienda virtual", "empresa de desarrollo web", "diseño web para", "página web para negocio", "landing page para", "software a medida para", "agencia de marketing digital", "rediseño de página web", "hosting Colombia".
- **Plataformas y comparativas:** "shopify", "wordpress", "wix", "woocommerce", "nextjs", "tiendanube", "mercado libre vs tienda propia".
- **Negocio y ventas:** "vender por internet", "pasarela de pagos", "facturación electrónica", "whatsapp business", "google mi negocio", "aparecer en google".
- **IA y automatización:** "inteligencia artificial para", "chatbot para", "agentes de ia", "automatizar", "n8n", "chatgpt para negocios".
- **Por sector:** "página web para restaurante", "para clínica", "para inmobiliaria", "para abogados", "para colegio", "para hotel".

## 3. Elegir 2 temas

Criterios, en este orden:

1. **Intención de contratar o comprar** (precios, comparativas, "para mi negocio", sectores) por encima de lo puramente informativo.
2. **Demanda real** según el paso 2.
3. **No repetido** (paso 1).
4. **Se puede escribir con información verificable**. Nada de cifras inventadas: si no hay fuente oficial, dilo de forma general.
5. Relación directa con algún servicio de K&T Code.

Prefiere un tema comercial + uno de tendencia. Anota las palabras clave que respaldan cada tema: van en el resumen final.

## 4. Escribir cada artículo (es + en)

Archivos (copia la estructura de `src/content/blog/posts/es/como-vender-por-whatsapp-business.ts`):

- `src/content/blog/posts/es/<slug>.ts` y `src/content/blog/posts/en/<slug>.ts`, tipo `MdPost` (`tldr`, `md`, `faq`, `sources`).
- Slug en español, corto, sin año salvo que la búsqueda lo incluya.
- Markdown soportado: ver el comentario de `src/content/blog/markdown.ts` (`## Título {#id}`, tablas con `Tabla:`/`Table:`, `:::tip`/`:::info`/`:::warn`, `:::checklist`, `:::quiz`). No uses widgets que no existan (`roi-calculator` no existe).

Cada artículo debe tener:

- **TL;DR** de 3–4 viñetas con la respuesta directa (lo que citaría Google o una IA).
- La palabra clave principal en el título y en el primer párrafo.
- Al menos una **tabla**, un **`:::checklist`** y un **`:::quiz`** de 3 preguntas (lo hace interactivo).
- 2–3 **enlaces internos** a otros artículos del blog que existan, y a servicios. Los enlaces van sin `/en`: se traducen solos.
- **Sección obligatoria antes de la conclusión:** `## ¿Cómo te ayuda K&T Code…? {#k-t-code}` / `## How K&T Code helps… {#k-t-code}`. Debe tener una tabla "Necesitas | Servicio | Desde", con 2–4 servicios enlazados y su precio de partida, y una línea con enlaces a `/precios` y a la guía de precios que corresponda.
  - Precios de partida (COP), según `src/lib/pricing.ts`: landing $450.000 · tienda virtual $1.300.000 · sitio corporativo / desarrollo web a medida $2.500.000 · software a medida $4.500.000. SEO técnico y mantenimiento: "Según alcance".
  - Servicios: `/servicios/landing-pages`, `/servicios/tiendas-virtuales`, `/servicios/desarrollo-web-a-medida`, `/servicios/software-a-medida`, `/servicios/diseno-web-corporativo`, `/servicios/desarrollo-nextjs`, `/servicios/woocommerce-headless`, `/servicios/seo-tecnico`, `/servicios/mantenimiento-web`.
  - Guías de precios: `/precios/precio-pagina-web-colombia`, `/precios/precio-tienda-virtual-colombia`, `/precios/precio-software-a-medida`.
  - Si el tema es de un sector o una ciudad, enlaza también la landing que corresponda (`src/content/landings/industries.ts`, `cities.ts`).
- **Conclusión** con llamado a la acción: `[escríbenos](/#contacto)`.
- **FAQ** de 4 preguntas que respondan las búsquedas encontradas (salen como datos estructurados).
- **Fuentes**: solo sitios oficiales o de referencia, con URL real.
- Tono cercano, frases cortas, español de Colombia. Inglés natural, no traducción literal.

## 5. Registrar

- `src/content/blog/meta.ts`: agrega una fila al **inicio** de `ES_ONLY`, con `[slug, categoría, fecha, minutos, título, descripción, etiquetas, true]`.
  - Categorías válidas: `precios`, `desarrollo-web`, `seo-geo`, `ia`, `ecommerce`, `software`, `comparativas`, `estrategia`.
  - Fechas: la del día de la corrida para uno y 1–2 días antes para el otro, para que no salgan idénticas. Nunca fechas futuras.
  - Descripción: 140–160 caracteres.
- `src/content/blog/meta.en.ts`: entrada en `EN_META` con `[title, description, tags]`.
- `src/content/blog/index.ts`: imports `md_<slug>` y `en_<slug>` y la entrada en `BODIES` con `{ es: fromMarkdown(md_…), en: fromMarkdown(en_…) }`, junto a las demás de tendencias.

## 6. Validar (obligatorio antes de publicar)

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm start -p 3123 &   # luego, para cada slug, en / y en /en:
curl -s -o /dev/null -w "%{http_code}" http://localhost:3123/blog/<slug>       # 200
curl -s http://localhost:3123/blog/<slug> | grep -c 'Quiz_\|Checklist_\|id="k-t-code"'
```

- Cada enlace interno nuevo debe responder 200 en el servidor local.
- Si algo falla, corrígelo. No publiques con errores.
- Detén el servidor al terminar.

## 7. Publicar

- Commit en español, con los títulos y las palabras clave que respaldan cada tema, más las líneas de atribución que pida el sistema.
- Publica directo en `main`: `git fetch origin main`, `git rebase origin/main` (son commits propios), `git push origin HEAD:main`. Nunca uses force push. Si el push falla por red, reintenta con espera creciente.

## 8. Resumen final

Responde breve en español:

- Los 2 artículos: título, URL (`https://www.kytcode.lat/blog/<slug>`) y las palabras clave que los respaldan.
- 3–5 ideas de temas para la próxima corrida.
