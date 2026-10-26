---
name: auditoria-seo
description: Auditoría técnica mensual de SEO y rendimiento de www.kytcode.lat (Lighthouse móvil, enlaces rotos, sitemap, datos estructurados, accesibilidad para agentes de IA) que corrige lo que encuentre y publica. Úsalo cuando pidan "auditoría SEO", "revisar PageSpeed" o lo dispare la tarea programada.
---

# Auditoría técnica SEO (K&T Code)

Objetivo: que www.kytcode.lat no pierda posiciones por fallas técnicas. Cada mes se detectan y corrigen problemas, con medición antes y después.

> **Datos de Search Console guardados:** si el conector GSC no responde (la prueba de GSC Wizard vence el 2026-11-02), usa la foto más reciente en `docs/seo/gsc-*.md` (páginas, consultas, oportunidades, indexación y pendientes). Si el conector sí funciona, al terminar agrega una foto nueva `docs/seo/gsc-<año>-<mes>.md` con el mismo formato.

## 1. Preparar

```bash
pnpm install --frozen-lockfile && pnpm typecheck && pnpm build
pnpm start -p 3123 &
```

- Lighthouse: instálalo en una carpeta temporal (`npm i lighthouse` dentro del scratchpad) y úsalo con `CHROME_PATH=/opt/pw-browsers/chromium` y `--chrome-flags="--headless=new --no-sandbox"`. Si no hay Chromium en esa ruta, usa el de Playwright.
- El sitio en vivo puede estar bloqueado por la red del entorno: audita el build local (es el mismo código que sale a producción).

## 2. Medir

1. **Lighthouse móvil** (`--only-categories=performance,accessibility,best-practices,seo,agentic-browsing`) en: `/`, `/precios`, `/proyectos`, `/blog`, el artículo más reciente, una página de servicio, una de país y una de ciudad. Repite 2 veces el inicio (la medición varía).
   - Anota puntajes, LCP, CLS, TBT y las auditorías en rojo.
   - **Navegación con agentes debe dar 3/3.** Si `agent-accessibility-tree` falla, corrige los elementos que indique (nombres accesibles, ARIA, `role="img"` sin nombre, etc.).
2. **Sitemap:** cada URL de `/sitemap.xml` (cámbiala a `http://localhost:3123`) debe responder 200 sin redirección.
3. **Enlaces internos rotos:** recorre los enlaces `href="/..."` del inicio, `/blog` y 10 artículos, y verifica que respondan 200.
4. **Datos estructurados:** en inicio, un artículo, un servicio y una página de país, extrae los `<script type="application/ld+json">` y verifica que sean JSON válido y que tengan `Organization` con `alternateName`, `FAQPage` donde hay preguntas y `Service` con `areaServed`.
5. **Metadatos:** títulos de menos de 65 caracteres y descripciones de 70 a 160 en las páginas auditadas; `canonical` y `hreflang` es/en/x-default presentes; `llms.txt` y `robots.txt` responden 200.
6. **Visibilidad (si Ubersuggest está conectado):** 1 reporte `domain_overview` de `kytcode.lat` (palabras clave que posicionan, tráfico estimado, autoridad, dominios que enlazan). Compáralo con el mes anterior en el resumen. Plan gratis: 3 reportes al día, usa solo 1.
7. **Search Console (si el conector GSC está disponible, herramientas `mcp__GSC__*`, propiedad `sc-domain:kytcode.lat`):**
   - `get_site_summary` (28 días vs. anteriores): clics, impresiones, CTR y posición. Va en el resumen.
   - `list_sitemaps` y `inspect_url` (máximo 10, cuida la cuota con `get_inspection_quota`) para las páginas nuevas del mes: ¿están indexadas?
   - `score_opportunities`: las 5 mejores oportunidades (posición 8–20).
   - `get_core_web_vitals` si hay datos. Corrige lo técnico (indexación, canónicas, sitemap) y deja el resto como recomendación para los agentes de blog y de actualización.
8. **Marca:** el título del inicio y `llms.txt` siguen mencionando "K&T Code (KyT Code)" y el dominio www.kytcode.lat.

## 3. Corregir

- Corrige lo que sea claro y de bajo riesgo: enlaces rotos, metadatos, ARIA, imágenes sin dimensiones, JSON-LD inválido, regresiones de rendimiento con causa identificada.
- Lo que requiera una decisión de diseño o de negocio **no lo cambies**: déjalo en el resumen como recomendación.
- Vuelve a medir lo que corregiste (antes y después).

## 4. Publicar (solo si hubo correcciones)

- `pnpm typecheck && pnpm build` limpios.
- Commit: "Auditoría SEO <mes>: <resumen>", con las cifras antes y después y las líneas de atribución que pida el sistema.
- `git fetch origin main && git rebase origin/main && git push origin HEAD:main`. Nunca uses force push.
- Detén el servidor.

## 5. Resumen final (breve, en español)

Tabla de puntajes por página (antes y después), qué se corrigió, qué queda como recomendación y si el sitemap, los enlaces y los datos estructurados están limpios.
