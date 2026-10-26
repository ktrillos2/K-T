---
name: paginas-por-pais
description: Crea una nueva página de aterrizaje "Desarrollo web en <país>" (español + inglés) en www.kytcode.lat para posicionar a K&T Code en un mercado de Latinoamérica o Estados Unidos. Úsalo cuando pidan "página por país", "nuevo mercado" o lo dispare la tarea programada.
---

# Páginas por país (K&T Code)

Objetivo: abrir mercados fuera de Colombia en Google. Cada corrida agrega **1 país nuevo** a www.kytcode.lat, con su página en español e inglés.

## 1. Elegir el país

- Países ya publicados: `src/content/landings/countries.ts` (arreglo `COUNTRIES`).
- Orden de prioridad (salta los que ya existan): Estados Unidos, Perú, Ecuador, Chile, Panamá, Costa Rica, Argentina, Guatemala, República Dominicana, Uruguay, Paraguay, Bolivia, El Salvador, Honduras.
- Si el conector Keyword Tool está disponible (`keywordtool-suggestions-guest`, máximo 8 consultas), confirma la demanda con semillas como "diseño de páginas web", "desarrollo web", "cuanto cuesta una pagina web" y "tienda virtual" en ese país e idioma (para EE. UU. usa también inglés: "web design company", "web development agency", "hire web developer"). Si no está disponible, sigue el orden de prioridad.

## 2. Agregar el país

1. Agrega una entrada a `COUNTRIES` en `src/content/landings/countries.ts`, copiando la estructura de México:
   - `slug` sin tildes (ej. `peru`, `estados-unidos`), `code` ISO, `name` es/en, `lat`/`lng` de la capital, `color` (`red` | `yellow` | `green`).
   - `projects`: slugs de `src/lib/projects.ts` cuyo `country` sea ese país (puede quedar vacío).
   - `posts`: 2–3 artículos del blog que existan y apliquen (ej. `cuanto-cuesta-una-pagina-web-latinoamerica`, `nearshore-desarrollo-web-latinoamerica` para EE. UU.).
   - `payments`: medios de pago reales y comunes en ese país (ej. Perú: Yape, Plin, Niubiz, Mercado Pago; Chile: Webpay, Mercado Pago; EE. UU.: Stripe, PayPal y tarjetas). No inventes.
   - `hours`: diferencia horaria real con Colombia (UTC−5). Verifica si el país usa horario de verano.
   - `sectors`, `intro` y `local` en español e inglés: concretos, sin exagerar, mencionando ciudades principales del país. Si hay proyectos ahí, nómbralos.
2. Crea la ruta `src/app/[lang]/desarrollo-web-<slug>/page.tsx` copiando `src/app/[lang]/desarrollo-web-mexico/page.tsx` y cambiando la ruta.
3. Los precios ya van con `{{cop:N}}` en la plantilla: se muestran en la moneda del visitante. Verifica que el país esté en `src/lib/money.ts`; si no está, no lo agregues tú: elige otro país.
4. Si el país tiene proyectos, considera enlazar la nueva página desde un artículo relacionado del blog (una línea).

## 3. Validar (obligatorio)

```bash
pnpm install --frozen-lockfile && pnpm typecheck && pnpm build
pnpm start -p 3123 &
curl -s -o /dev/null -w "%{http_code}" http://localhost:3123/desarrollo-web-<slug>      # 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:3123/en/desarrollo-web-<slug>   # 200
curl -s http://localhost:3123/sitemap.xml | grep -c "desarrollo-web-<slug>"             # ≥ 2
curl -s http://localhost:3123/desarrollo-web-<slug> | grep -c '"@type":"Country"'     # ≥ 1
```

- Revisa que el pie de página liste el país en "Desarrollo web en Latinoamérica y EE. UU.".
- Detén el servidor al terminar. Si algo falla, corrígelo; no publiques con errores.

## 4. Publicar

- Commit en español: "Página por país: <país>", con las palabras clave que lo respaldan y las líneas de atribución que pida el sistema.
- `git fetch origin main && git rebase origin/main && git push origin HEAD:main`. Nunca uses force push.

## 5. Resumen final (breve, en español)

País agregado, URLs `https://www.kytcode.lat/desarrollo-web-<slug>` y `/en/...`, palabras clave encontradas y el país siguiente sugerido.
