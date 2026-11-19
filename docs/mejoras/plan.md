# Plan de mejoras de www.kytcode.lat

Plan vivo para la web de K&T Code. Los agentes lo leen, toman de 1 a 3 pendientes por corrida, los aplican, los registran en `registro.md` y los marcan aquí con ✅ y la fecha.

Base: auditoría del 14 nov 2026 (`docs/seo/kytcode.lat-audit/`, 74/100) y Search Console (`docs/seo/gsc-*.md`).

## Reglas

- Objetivo: **más contactos de clientes** (WhatsApp y formulario) en Colombia, Latinoamérica y EE. UU.
- Lenguaje simple, sin tecnicismos. Marca visible siempre «K&T Code» (nunca «KyT Code» ni «kytcode»).
- No tocar el juego «Rompe el logo» del footer.
- Animaciones sutiles; nada que haga lento el scroll en PC. Revisar en escritorio (1440 px) y celular (390 px).
- No inventar cifras, clientes, reseñas, direcciones, NIT ni precios de terceros. Lo que necesita datos del dueño va en «Necesita al dueño».
- Precios propios con `src/lib/pricing.ts` y el marcador `{{cop:N}}` en el blog.
- Textos según `docs/blog/escritura-natural.md` (que no suenen a IA).
- Validar con `pnpm typecheck`, `pnpm build` y el servidor local (200 en las páginas tocadas, sin errores en consola). Lighthouse móvil del inicio no debe bajar.
- Publicar directo en `main` sin pedir aprobación (rebase, sin force push). Si algo falla y no se corrige, deshacerlo.
- El blog lo manejan sus propias skills (`blog-tendencias`, `actualizar-blog`): aquí solo mejoras de páginas, diseño, SEO técnico y conversión.

## Pendientes (por prioridad)

### Alta

1. **Servicio «Desarrollo web a medida»** (`/servicios/desarrollo-web-a-medida`): Google lo tenía «rastreado sin indexar». Darle contenido propio (para quién es, proceso, plazos reales, preguntas frecuentes, proyectos relacionados) y enlazarlo desde 3–5 artículos indexados.
2. **Páginas en inglés con poco valor propio:** listar las /en que son traducción de temas solo colombianos (PSE, Nequi, DIAN, ciudades). Ponerles `noindex` o ampliarlas para lectores de EE. UU. Revisar `/en/servicios`, `/en/industrias`, `/en/servicios/software-a-medida` (rastreadas sin indexar).
3. **/en para empresas de EE. UU.:** ECG Construction como primer caso en `/en` y `/en/proyectos`; bloque «Cómo trabajamos con equipos de EE. UU.» (horario, idioma, pagos en USD, contrato). Paquetes en USD claros.
4. **Comparativa de pasarelas** (`/blog/wompi-vs-mercado-pago-vs-payu-colombia`, la que más clics trae): sumar Bold y ePayco solo con tarifas de sus páginas oficiales, tabla por medio de pago y llamado a tienda virtual. Si en diciembre el CTR sigue bajo, probar el título «Wompi vs Mercado Pago vs PayU: comisiones 2026».
5. **Prueba social cerca de los botones:** 1 reseña real corta junto al formulario de contacto y en /precios (de las reseñas que ya están en el sitio).

### Media

6. **Bogotá y Medellín** se parecen en un 58 %: diferenciar con datos propios de cada ciudad (sectores, proyectos, preguntas locales).
7. **/desarrollo-web-cucuta:** «Diseño» en el título, sección de proyectos de Cúcuta y preguntas locales.
8. **Imagen OG propia por artículo** con `next/og` (título + marca), para que se vea bien al compartir en WhatsApp y redes.
9. **Rendimiento del inicio:** reducir CSS/JS inline (~540 KB de HTML) y cargar la demo, el juego y el carrusel solo al acercarse. Medir antes y después.
10. **Cabecera Content-Security-Policy** en modo `Report-Only` primero; revisar que GA4, el píxel de Meta y Sanity sigan funcionando.
11. **Política de privacidad completa** (Ley 1581 de 2012): datos que se recogen, para qué, derechos y contacto. Sin inventar razón social ni NIT (dejar marcador para el dueño).
12. **H2 en forma de pregunta** con la respuesta en la primera frase en las páginas de servicio (mejor para Google y buscadores con IA).

### Baja

13. `llms.txt` en inglés y versión Markdown de las páginas principales.
14. ✅ 2026-11-19 · Revisar enlaces internos rotos o con redirección en todo el sitio (4 en inglés corregidos; la auditoría mensual lo vuelve a revisar).
15. Accesibilidad: contraste y foco visible en botones del menú, paleta y formulario.
16. **Títulos de 66 a 70 caracteres** (23 páginas, sobre todo del blog): acortarlos a 64 o menos al actualizar cada artículo, sin tocar los que están en observación (Wompi, guía de precios de Colombia, «How to Appear in ChatGPT Search»).
17. **/en/proyectos/ecg-construction** está en `noindex` (en inglés solo se indexa GMX Gaming). Indexarlo junto con el punto 3: es el cliente de EE. UU.

## Necesita al dueño (no lo hacen los agentes)

- Renombrar la página de Facebook a «K&T Code».
- Perfiles con reseñas: Clutch, GoodFirms, Google Business Profile, LinkedIn de empresa y de Keyner.
- Cifras reales por proyecto (contactos, pedidos, ventas) con su periodo.
- Enlace de calendario (Cal.com o Calendly) para el botón «Agendar llamada» en /en.
- Razón social y NIT; credenciales del autor para su página.
- ID del píxel de Meta en Vercel (`NEXT_PUBLIC_META_PIXEL_ID`).
- **Chatbot de WhatsApp** (`/servicios/chatbot-whatsapp`, publicada el 2026-11-16 sin precio y con «demo gratis»): cuando Meta apruebe a K&T Code como socio y el dueño defina el precio de partida, agregarlo a `src/lib/pricing.ts`, a la página y a los artículos de chatbots.

## Hechas

Ver `registro.md` y `docs/seo/kytcode.lat-audit/APLICADO-2026-11-14.md`.
