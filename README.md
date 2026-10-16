# K&T Code — sitio web 2.7

Sitio de K&T Code: **diseño único y código a la medida**. Next.js (App Router), escena 3D persistente (React Three Fiber), transiciones entre rutas, scroll suave (Lenis) y animaciones GSAP. Español e inglés, precios en la moneda de cada país, blog interactivo y SEO/GEO completo.

- Fuente principal: **Ari W9500 Bold** (pixel) en `src/app/font-files/`. Secundaria: **Fira Code**.
- Colores: blanco, negro y los tres puntos del logo (rojo `#ef685f`, amarillo `#f6bd4e`, verde `#62c453`). Modo oscuro por defecto y modo claro.

## Cómo correrlo

```bash
npm install
npm run dev            # http://localhost:3000  (inglés en /en)
npm run build && npm start
npm run typecheck
npm run screenshots    # capturas reales de los proyectos (ver abajo)
```

Requiere Node 18.18+. En Vercel funciona sin configuración extra (la cabecera `x-vercel-ip-country` elige la moneda del visitante la primera vez).

## Novedades 2.8 · Todo en inglés

| Qué | Dónde | Detalle |
|---|---|---|
| Blog traducido | `content/blog/posts/en/*.ts`, `content/blog/meta.en.ts`, `content/blog/index.ts` | Los 47 artículos migrados ahora tienen versión en inglés (cuerpo, resumen, tablas, quizzes, checklists, FAQ y fuentes). Con los 4 que ya eran bilingües, los **51 artículos** están en ES y EN: `/en/blog/<slug>` se indexa, entra al sitemap con hreflang y al feed `feed.en.xml`. Se mantiene el mismo slug en ambos idiomas. |
| Industrias en inglés | `content/landings/industries.en.ts` | Las 8 landings de industrias tienen copy en inglés (se combina por slug en `industries.ts`). |
| Ciudades en inglés | `content/landings/cities.ts` (`CITY_EN`, `copyEn`) | Las 5 landings de ciudad (Cúcuta, Bogotá, Medellín, Cali, Barranquilla) en inglés. Ya no queda ninguna página con el aviso "solo en español" ni con `noindex` por traducción faltante. |
| Textos sueltos | `preguntas-frecuentes/page.tsx`, `ReviewForm.tsx`, `lib/landing-page.tsx` | Las 2 preguntas frecuentes que faltaban en inglés; el mensaje de WhatsApp del formulario de reseñas según el idioma; `serviceType` del schema en inglés en las landings EN. |
| robots.txt | `app/robots.ts` | Versión simplificada: una sola regla `*` (permite todo, bloquea `/api/`) y el sitemap. Es equivalente a la anterior: `*` ya cubre a OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, etc. |

Quedan en español a propósito: las reseñas de clientes (texto original, también en EN) y el `manifest` de la app.

Para agregar un artículo nuevo bilingüe: ficha en `meta.ts`, cuerpo ES en `posts/es/<slug>.ts`, cuerpo EN en `posts/en/<slug>.ts`, título/descripción/etiquetas EN en `meta.en.ts` y registro en `index.ts`.

## Novedades 2.7 · Reseñas, SEO/GEO y destacados

| Qué | Dónde | Detalle |
|---|---|---|
| Testimonios tal cual del sitio anterior | `src/content/testimonials.ts` | Los 11 de kytcode.lat/testimonios, con el texto, nombre y cargo originales (sin corregir). Alimentan el inicio, Nosotros, /testimonios, los casos de estudio y `llms.txt`. |
| Reseñas aprobadas en Sanity | `src/lib/testimonials.ts` | Se suman solas a las fijas (sin duplicados). La página se regenera como máximo cada hora. |
| Formulario "Deja tu reseña" | `/testimonios#dejar-resena`, `landing/ReviewForm.tsx`, `app/api/reviews` | Solo proyecto, nombre y mensaje. Se guarda **pendiente** en Sanity (mismo flujo del sitio anterior: cámbiala a *approved* en Sanity Studio para publicarla) y llega un correo con el bloque listo para pegar en `testimonials.ts` si prefieres publicarla a mano. Botón "Dejar mi reseña" en la sección de reseñas. |
| Título de destacados | `home/FeaturedStack` | La animación partía "GMX Gaming" por letras; ahora se divide por palabras y nunca corta una palabra. |
| SEO | `lib/seo.ts` | Descripciones recortadas a ~158 caracteres en palabra completa; los títulos largos ya no llevan " · K&T Code" (para no pasar de ~60). |
| SEO / GEO del blog | `blog/[slug]/opengraph-image.tsx`, `lib/schema.ts` | Imagen social propia por artículo (título + categoría + minutos). BlogPosting con palabras clave, tiempo de lectura, fuentes citadas (`citation`), `isPartOf` y `speakable` (título y resumen inicial). El índice del blog lista cada artículo con descripción, idioma y autor. |
| GEO | `lib/llms.ts` | `llms.txt` incluye las reseñas originales de clientes. |

**Para que el formulario guarde en Sanity:** crea un token con permiso *Editor* en sanity.io/manage → tu proyecto → API → Tokens y ponlo en `SANITY_WRITE_TOKEN` (`.env.local` y Vercel). Sin token, las reseñas llegan solo por correo (Resend). En Sanity hay 3 reseñas de prueba pendientes ("Test Name", "Eodjsnd", "prueba"): conviene borrarlas.

## Novedades 2.6 · Imágenes del portafolio

Las vistas previas de los proyectos (inicio, túnel 3D, índice, casos de estudio, landings) ahora usan las imágenes reales del portafolio anterior en vez de la portada generativa.

| Qué | Dónde |
|---|---|
| URL de cada imagen (21 en el CDN de Sanity + Repuestos Germana en el dominio viejo) | `src/lib/covers.ts` |
| Prioridad: captura completa propia → portada del portafolio → portada generativa | `lib/projects.ts` (`image`, `imageMobile`), `ui/SiteShot.tsx` |
| Las portadas llenan el marco y hacen un zoom suave al pasar el cursor; las capturas completas se siguen recorriendo | `ui/SiteShot.module.css` |
| Túnel 3D con las portadas (CORS habilitado para la textura) | `three/Tunnel.tsx`, `three/cardTexture.ts` |
| Imagen social, datos estructurados y sitemap de cada caso con su imagen | `proyectos/[slug]/page.tsx`, `lib/schema.ts`, `app/sitemap.ts` |
| `npm run covers`: descarga todas a `public/projects/` | `scripts/fetch-portfolio-images.mjs` |
| `npm run screenshots` ahora anota qué proyectos tienen captura completa | `scripts/capture-screenshots.mjs` → `src/lib/shots-manifest.json` |

Las tarjetas toman la proporción real de cada imagen (no se recorta nada): la proporción viene en el nombre del archivo de Sanity y, si no se conoce, se mide al cargar. En marcos fijos (navegador de los destacados y de los casos, vista tablet/móvil) la imagen se muestra completa y el navegador de escritorio adopta su proporción. El selector de país e idioma en el celular se abre como hoja a todo el ancho bajo el encabezado.

**Antes de publicar:** ejecuta `npm run covers` (sobre todo por Repuestos Germana, cuya imagen vive en el dominio viejo y desaparece al cambiar de sitio). Si quieres servir todas desde tu dominio, pon `NEXT_PUBLIC_LOCAL_COVERS=1`. Chévere Bogotá Travel no estaba en el portafolio anterior: sigue con portada generativa hasta que corras `npm run screenshots`.

## Novedades 2.5

| Pedido | Dónde | Qué hace |
|---|---|---|
| Separación entre secciones | `globals.css` (`.band`), `SectionHead`, `FeaturedStack`, `Footer`, `Plans` | Espacio vertical más corto y, cuando dos secciones van seguidas, la segunda recorta su margen superior para que no se sumen. |
| Íconos animados en el menú | `shell/NavIcon.tsx` | Íconos pixel por página que se animan al pasar el puntero: la casa echa humo, la carita parpadea, el engranaje gira, la carpeta se abre, la moneda da la vuelta y la hoja se escribe. |
| Menú móvil | `shell/Nav.tsx`, `Nav.module.css` | Se abre con una cortina en franjas de los colores de la marca, los textos suben desde una máscara, los íconos se arman y se animan, la página actual queda subrayada y abajo hay botón de WhatsApp, contacto y redes. |
| "Nada es de plantilla" en móvil | `home/UniqueCompare.module.css` | Marco más alto, tarjetas reacomodadas dentro del marco (ya no tapan la cinta), textos y control más pequeños. |
| "Arma tu proyecto" | `home/ServicesBuilder.tsx` | Tipos de proyecto como tarjetas con ilustración pixel animada; interruptores pixel en lugar de chips; recibo con precio, entrega, medidor y un botón que puede ir en dos líneas (ya no se desborda); maqueta en un escritorio y un celular en 3D que siguen al puntero, con barrido de color y aviso de lo que agregas o quitas. |
| Reseñas 3D | `home/Reviews.tsx` | Carrusel en anillo 3D: se arrastra con el mouse o el dedo (con inercia), clic en una tarjeta lateral la trae al frente, avanza sola, se inclina con el puntero y tiene piso con reflejo del color del cliente. Responsive. |

## Novedades 2.4

| Pedido | Dónde | Qué hace |
|---|---|---|
| "Nada es de plantilla" más llamativo | `home/UniqueCompare.tsx` | El lado de K&T ahora es una mini web viva: menú, título con resaltador pixel, botones, métricas, tarjeta de producto en pixel art, gráfica de ventas, medidor PageSpeed 98, notificación de pedido, cursor pixel que hace clic y cinta inferior. Las tarjetas siguen al puntero (paralaje) y todo se pausa fuera de pantalla. La plantilla muestra sus métricas lentas y una barra de carga que nunca termina. |
| Cursor "Ver caso de estudio" | `motion/Cursor.tsx` | Con etiqueta el anillo ya no gira ni se estira: es una píldora recta que se ajusta al texto. |
| Scroll menos "flotante" | `motion/SmoothScroll.tsx` | Lenis más directo (`lerp` 0.16). Los bloques con scroll propio se detectan solos (`allowNestedScroll`). |
| Tirones en contacto y juego | `contact/ContactWizard`, `footer/BreakoutGame` | El chat y el juego atrapaban la rueda (`data-lenis-prevent` + `overscroll-behavior: contain`): encima de ellos la página se frenaba. Se quitó, igual que el desenfoque del overlay del juego. |
| Footer | `shell/Footer.tsx` | Sin enlaces visibles a sitemap.xml y llms.txt (siguen publicados y enlazados en el `<head>` y robots.txt). |
| Logo del header | `shell/Nav.module.css` | 44 px (38 px en móvil). |
| Reseñas | `home/Reviews.tsx` | Reproductor: lista de clientes con barra de tiempo que avanza sola (se pausa con el puntero), cita que entra palabra por palabra con el color del cliente y dos cintas con fragmentos de todas las reseñas. |
| WhatsApp pixel | `shell/WhatsAppFloat.tsx` | Botón flotante en pixel art que aparece al bajar, se arma píxel por píxel, se despliega con "¿Hablamos?", saluda una vez por sesión y envía el nombre de la página desde donde escriben. Se aparta en la sección de contacto. |
| Tarjetas de precios | `pricing/Plans.tsx`, `pricing/PlanArt.tsx` | Ilustración pixel animada por plan (el cursor da clic en la landing, los productos vuelan al carrito, las páginas se abren en abanico, el panel grafica), escaneo de color, precio que "recalcula", checks que se marcan en cascada, barra de entrega en movimiento y lluvia de píxeles al elegir el plan. En el celular se activa la tarjeta centrada. |

## Novedades 2.3

| Pedido | Dónde | Qué hace |
|---|---|---|
| Pantalla de carga con el nombre de la página | `transition/TransitionProvider.tsx`, `lib/page-label.ts` | Ya no dice "Compilando /proyectos/gmx-gaming", sino **Compilando · GMX Gaming**. El nombre sale del menú, del proyecto, del título del artículo o del servicio, y entra con efecto *scramble*. Al terminar: "✓ GMX Gaming · listo en 138 ms". |
| Animación también con "atrás" | `transition/TransitionProvider.tsx` | El botón atrás/adelante del navegador reproduce la misma cortina (en sentido inverso) y te devuelve a la posición de scroll donde estabas en esa página. |
| Scroll que se trababa | `three/Experience.tsx`, `motion/SmoothScroll.tsx`, `transition/TLink.tsx`, `motion/Cursor.tsx`, `shell/Nav.tsx`, `globals.css` | Se quitó el `filter: blur()` del lienzo 3D (desenfocaba la pantalla completa en cada frame); el prefetch de enlaces ahora es por intención (hover/foco) y no al aparecer en pantalla; el cursor y la barra de navegación solo tocan el DOM cuando algo cambia; las líneas CRT ya no usan `mix-blend-mode`; ScrollTrigger se recalcula cuando cambia la altura del contenido; resolución del 3D máxima 1.5×. El scroll se libera solo si una transición se interrumpe. |
| Lectura en los hero | `globals.css` (`[data-hero]`), `three/Voxels.tsx`, `lib/formations.ts`, `projects/TunnelSection.tsx` | Velo radial del color del fondo detrás del texto de cada hero y halo suave en las letras; el polvo de vóxeles es más tenue, menos denso y ya no pasa por delante del plano del texto; los tres puntos se mueven arriba a la derecha; las tarjetas del túnel aparecen cuando el título ya subió. |
| Favicon, apple icon y PWA | `public/` (`favicon.ico`, `icon.svg`, `icon.png`, `apple-icon.png`, `icon.webp`, `icon-192/512`, `icon-maskable-*`), `app/manifest.ts` | Mismas URLs que el sitio anterior (Google y los navegadores conservan el favicon en caché). Se generan desde el logo pixel: el de 32 px es una celda por píxel, nítido. Manifest con íconos *maskable*. |
| SEO | `[lang]/layout.tsx`, `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts` | Verificación de Search Console del sitio anterior por defecto; robots con `max-image-preview:large`; imagen social en todas las páginas (`/og.png`); canonical correcto en traducciones faltantes; `<lastmod>` del sitemap con fechas reales (no la hora del build) e imágenes de los proyectos. |
| GEO | `app/feed.xml`, `app/feed.en.xml`, `lib/llms.ts`, `scripts/indexnow.mjs` | Feed RSS del blog (ES/EN), `llms.txt` con "Cómo citarnos" y enlaces a sitemap/RSS, robots que da la bienvenida a más asistentes (OAI-SearchBot, Claude-SearchBot, Applebot, MistralAI…), e **IndexNow**: `npm run indexnow` avisa a Bing (y con él a Copilot y ChatGPT Search) de cada cambio. |

Después de publicar: `npm run indexnow` y, en Search Console, vuelve a enviar `https://www.kytcode.lat/sitemap.xml`. Si cambias el contenido de servicios/ciudades/precios, actualiza `CONTENT_UPDATED` en `src/lib/site.ts`.

## Novedades 2.2

| Pedido | Dónde | Qué hace |
|---|---|---|
| Formulario de contacto por correo | `contact/ContactWizard.tsx`, `app/api/contact`, `lib/email.ts` | Chat de 6 preguntas (incluye correo y teléfono opcional). Al terminar envía con **Resend** dos correos: uno al equipo (responder = el correo del cliente) y una confirmación al cliente con la ficha de costos. En pantalla dice que la información se envió por correo, muestra la ficha de costos del servicio y deja la opción de seguir por WhatsApp. Campo trampa anti-bots y límite de envíos por IP. |
| Variables de entorno | `.env.local` (y `.env.example`) | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` y los códigos de verificación de Google y Bing. En Vercel se cargan en Settings → Environment Variables. |
| Proyectos destacados | `home/FeaturedStack.tsx` | Sección fija: los proyectos se acercan desde el fondo al hacer scroll, con revelados, contadores y la captura que se recorre. |
| Ver en vivo | `ui/BrowserPreview.tsx`, `ui/LiveModal.tsx` | Sobre la captura hay un botón "Ver en vivo" que abre el sitio real en una ventana enfocada (PC, tablet o móvil). Mientras está abierta, la página de fondo no se mueve. |
| Juego con poderes | `footer/BreakoutGame.tsx` | Cápsulas que caen al romper ladrillos: multibola ×2 y ×3, paleta grande, cámara lenta y vida extra; y poderes negativos: paleta mini, turbo y controles al revés. Mientras juegas se oculta el cursor animado. |
| Tarjetas de precios | `pricing/Plans.tsx` | Luz que sigue al cursor, barra de entrega, más funciones al desplegar y "Armar mi cotización", que lleva al cotizador con el plan ya elegido. |
| Portadas del blog | `blog/TitleArt.tsx` | Sin imágenes: cada artículo tiene una animación tipográfica según su título (comparativas "A vs B", precios con contador, búsqueda para SEO, chat para IA, terminal para desarrollo). Solo se anima cuando está en pantalla. |
| Artículos migrados | `content/blog/posts/es/` | Los 51 artículos del blog anterior con sus mismos slugs: 4 en español e inglés y 47 en español, con resumen inicial, tablas, listas de verificación, quizzes, FAQ y fuentes. |
| Páginas que Google ya conoce | `content/landings/` | Se recuperaron las URLs indexadas del sitio anterior con contenido nuevo y datos estructurados (Service, FAQPage, BreadcrumbList): `/servicios` y 9 servicios, `/industrias` y 8 industrias, 5 ciudades (`/desarrollo-web-cucuta`, `-bogota`, `-medellin`, `-cali`, `-barranquilla`), 3 guías de precios (`/precios/precio-…`), `/testimonios`, `/preguntas-frecuentes` y `/autores/keyner-trillos`. |
| Nuevo proyecto | `lib/projects.ts` | Repuestos Germana (23 proyectos en total). |

Para editar el texto de un servicio, una industria o una ciudad, cambia su archivo en `src/content/landings/`. Las industrias y ciudades están solo en español; en inglés se muestran en español sin indexarse.

### Pasos para posicionar (fuera del código)

1. Verifica el dominio en Google Search Console y en Bing Webmaster Tools, pega los códigos en `.env.local` / Vercel y envía `https://www.kytcode.lat/sitemap.xml`.
2. Completa el Perfil de Empresa en Google (Cúcuta) con el mismo nombre, teléfono y sitio web, y pide reseñas a los clientes del portafolio.
3. Verifica el dominio `kytcode.lat` en Resend para enviar desde `hola@kytcode.lat`.
4. Genera las capturas (`npm run screenshots`) antes de publicar.

## Versión 2.1

| Pedido | Dónde | Qué hace |
|---|---|---|
| Fondo del hero más interactivo | `three/PixelField.tsx`, `home/HomeHero.tsx` | Piso de píxeles en perspectiva detrás del logo 3D: el puntero levanta los píxeles y los pinta con los colores de la marca, cada clic lanza una onda y el scroll lo agita. |
| Volver al hero anterior | `src/lib/site.ts` | Cambia `HERO_BG` de `"field"` a `"voxels"` y queda exactamente el de la versión anterior (solo el logo de vóxeles). |
| Lo que nos hace únicos | `home/UniqueCompare.tsx` | Comparador antes/después arrastrable: plantilla genérica vs. diseño a la medida, más tres puntos clave. |
| Servicios más interactivos | `home/ServicesBuilder.tsx` | Eliges tipo de proyecto, activas o quitas funciones y la maqueta del sitio se arma en vivo (GSAP Flip). Precio en tu moneda y mensaje listo para WhatsApp. |
| Proyectos destacados con el sitio real | `home/FeaturedLive.tsx`, `ui/BrowserPreview.tsx` | Navegador en miniatura: captura de página completa que se recorre sola o el sitio en vivo en un iframe (escritorio, tablet o móvil), con métricas, resultados y testimonio. |
| Mini render en cada proyecto | `ui/SiteShot.tsx` | La captura real del sitio (en `public/shots`) se recorre al pasar el cursor. Si aún no hay captura, se muestra la portada generativa. El túnel 3D también usa las capturas. |
| Caso de estudio por proyecto | `/proyectos/[slug]`, `projects/CaseStudy.tsx` | El reto, lo que se construyó, cómo se hizo (fases por semana), resultados (PageSpeed antes/después, LCP), testimonio, la vista del sitio y anterior/siguiente. |
| Contraste en Proyectos | `hooks/useSceneDim.ts`, `three/Experience.tsx` | Las secciones de lectura tienen fondo sólido y piden a la escena 3D atenuarse y desenfocarse; la animación sigue, pero ya no compite con el texto. |
| Reseñas | `home/Reviews.tsx` | Mazo de tarjetas arrastrable con las reseñas de los clientes; enlaza a cada caso. Está en Inicio y en Nosotros. |
| Foto de Keyner | `about/Founder.tsx`, `about/PixelPhoto.tsx` | La foto entra pixelada, se "compila" al llegar a pantalla y después el cursor lleva una lupa de píxeles. La `<img>` real queda en el HTML para Google. |
| Reemplazo de "¿Hacemos git init?" | `contact/ContactWizard.tsx` | Contacto tipo chat: cuatro preguntas y el mensaje queda listo para WhatsApp o correo. |
| Footer con juego | `footer/BreakoutGame.tsx` | "Rompe el logo": un breakout cuyos ladrillos son los píxeles del logo; los puntos de colores valen más. Mouse, toque o teclado; récord guardado en el navegador. |
| "¿Por dónde seguimos?" | `home/Explore.tsx` | Acordeón horizontal: la sección activa se expande y muestra un adelanto real (capturas, precios en tu moneda, el equipo, artículos). |
| Sin nombres de tecnologías | todo el contenido | Se habla de "a la medida", nunca de frameworks. El encabezado ya no muestra el dominio. |
| Blog interactivo | `/blog`, `components/blog/` | Búsqueda instantánea (tecla `/`), categorías, orden, vista tarjetas o terminal, artículo al azar. Cada artículo: barra de progreso, índice con scrollspy, minutos restantes, tamaño de letra, lectura en voz alta, compartir, "¿te sirvió?", FAQ, fuentes y relacionados. Widgets: calculadora de precio en tu moneda, simulador del costo de la lentitud, comparador ponderado plantilla vs. a la medida, quiz y listas de verificación que se guardan. |
| País, idioma y moneda | `shell/LocaleSelector.tsx`, `lib/money.ts`, `app/api/rates` | Selector como en el sitio anterior: idioma (ES/EN) y país. Los precios se guardan en COP y se convierten con la tasa del día + 10% (`FX_MARKUP`). Ejemplo: Argentina muestra ARS. |

## Idiomas

- Español en la raíz (`/precios`), inglés bajo `/en` (`/en/precios`). `src/middleware.ts` reescribe a `app/[lang]` y redirige `/es/...` a la raíz.
- Todos los textos están en `src/i18n/dictionaries/es.ts` y `en.ts` (el tipo obliga a que ambos tengan las mismas claves). Proyectos en inglés: `src/i18n/projects.en.ts`. Blog: `content/blog/posts/en` + `meta.en.ts`. Industrias: `content/landings/industries.en.ts`; ciudades: `CITY_EN` en `cities.ts`.
- Cada página publica `hreflang` (es, en, x-default), canonical y Open Graph por idioma.

## Moneda

- Países y monedas: `COUNTRIES` en `src/lib/money.ts` (CO, MX, PE, AR, CL, EC, VE, ES, US). Agregar uno es una línea.
- `/api/rates` consulta la tasa del día (base COP) y se cachea 6 horas. Si la API no responde se usan tasas de respaldo.
- El HTML del servidor siempre trae el precio en COP (lo que indexan los buscadores); en el navegador se convierte a la moneda elegida.

## Capturas de los proyectos

Las vistas previas usan capturas reales en `public/shots/<slug>.jpg` (escritorio) y `<slug>-m.jpg` (móvil). Para generarlas:

```bash
npm i -D playwright && npx playwright install chromium
npm run screenshots                 # todos
npm run screenshots -- telas-real   # solo uno
```

Mientras no existan, cada proyecto muestra su portada generativa y la vista "En vivo" carga el sitio real en un iframe (algunos sitios bloquean ser embebidos; en ese caso el botón "Abrir sitio" sigue funcionando).

## SEO y GEO

- **Metadatos por página** (`src/lib/seo.ts`): título, descripción, canonical, hreflang, Open Graph y Twitter. Los casos de estudio usan su captura como imagen social cuando existe.
- **Datos estructurados** (`src/lib/schema.ts`): Organization + ProfessionalService con ofertas y precios, WebSite, Person (Keyner), BreadcrumbList en todas las páginas, FAQPage (inicio, precios y artículos), CreativeWork por proyecto, ItemList, OfferCatalog, AboutPage, Blog y BlogPosting.
- **GEO**: `/llms.txt` y `/llms-full.txt` (resumen y contenido completo para modelos de lenguaje), `robots.txt` abierto a todos los rastreadores (incluidos GPTBot, ClaudeBot, PerplexityBot y Google-Extended) salvo `/api/`, sección "K&T Code en 30 segundos" con respuestas citables, artículos con resumen inicial, cifras con fuente y fecha de actualización.
- **Rastreadores sin animaciones**: los bots ven el contenido completo sin loader ni entradas ocultas.
- **Sitemap** con alternativas por idioma, proyectos y artículos.
- **Redirecciones** permanentes desde las URLs del sitio anterior (`/projects/...` → `/proyectos/...`, `/about`, `/pricing`, `/contact`, etc.) en `next.config.ts`.

## Blog: agregar o migrar artículos

1. Agrega la ficha en `src/content/blog/meta.ts` (slug, categoría, fechas, minutos, idiomas, título, descripción y etiquetas). **Usa el mismo slug del sitio anterior** para conservar el posicionamiento.
2. Crea el contenido en `src/content/blog/posts/<slug>.ts` con `{ es, en }`: resumen (`tldr`), bloques (`p`, `h2`, `ul`, `table`, `callout`, `stat`, `quote`, `widget`…), `faq` y `sources`.
3. Regístralo en `src/content/blog/index.ts`.

Para los artículos migrados (`posts/es/`), la versión en inglés va en `posts/en/<slug>.ts` y su título, descripción y etiquetas en `meta.en.ts`. Si un artículo solo existe en español, deja `langs: ["es"]`: la versión en inglés muestra el texto en español con un aviso y no se indexa por duplicado. Los artículos del sitio anterior se migran así desde su código fuente.

## Estructura

```
src/
  app/[lang]/          páginas (inicio, nosotros, proyectos, proyectos/[slug], precios, blog, blog/[slug], privacidad)
  app/api/rates        tasa de cambio del día
  app/llms.txt         resumen para IA (y llms-full.txt)
  components/          shell, three, home, about, projects, pricing, blog, contact, footer, ui, motion
  content/blog         artículos y su contenido
  i18n/                diccionarios, proyectos en inglés y proveedor de idioma y moneda
  lib/                 datos (proyectos, precios, sitio), SEO, schema, moneda, store
scripts/               capturas de los proyectos
```
