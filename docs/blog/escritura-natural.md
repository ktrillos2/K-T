# Escritura natural para el blog de K&T Code

Los artículos deben sonar escritos por alguien de K&T Code que hace páginas web todos los días, no por una IA. Esto da más confianza al lector, a Google (E-E-A-T) y a los buscadores con IA, que citan mejor el contenido con experiencia propia.

Esta guía la usan las skills `blog-tendencias` y `actualizar-blog`. Es **obligatoria** antes de publicar.

## 1. Primero el contenido real (lo que más pesa)

- **Experiencia propia:** cada artículo lleva al menos 2 detalles que solo sabe quien hace el trabajo. Por ejemplo: qué preguntan los clientes en la primera llamada, qué suele retrasar un proyecto (textos y fotos que no llegan), cuánto tarda de verdad una landing, qué pasa cuando se cambia de hosting. Usa frases como «en los proyectos que hacemos…», «lo que más nos preguntan es…».
- **Casos del portafolio:** si encaja, menciona un proyecto real de `src/content/projects` (nombre y qué se hizo). **No inventes** resultados, cifras de ventas ni testimonios.
- **Opinión clara:** di qué recomiendas y en qué caso no. «Si vendes menos de 20 productos, no necesitas Shopify» vale más que «depende de tus necesidades».
- **Ejemplos concretos** con lugares, montos de terceros verificados y situaciones reales de negocios en Colombia o el país del artículo.

## 2. Frases que delatan a una IA (quítalas o reescríbelas)

| Evita | Mejor |
|---|---|
| «En el mundo actual / En la era digital / Hoy en día, más que nunca» | Empieza con el dato o la respuesta. |
| «Es importante destacar / Cabe resaltar / Vale la pena mencionar» | Dilo y ya. |
| «Sin lugar a dudas / Sin duda alguna» | Bórralo. |
| «En conclusión / En resumen» al inicio de un párrafo | «Entonces», «Lo que haríamos nosotros:» o directo la idea. |
| «Descubre / Sumérgete / Desbloquea / Potencia / Lleva tu negocio al siguiente nivel» | Verbos simples: mira, aprende, vende, ahorra. |
| «Una herramienta poderosa / robusta / integral / innovadora» | Di qué hace. |
| «Juega un papel crucial / fundamental» | «Sirve para…», «sin esto, …». |
| «¡Excelente pregunta!», «Esperamos que este artículo te haya sido útil» | Bórralo. |
| «No solo X, sino también Y» repetido | Una idea por frase. |
| Tríadas en todas partes («rápido, seguro y escalable») | A veces dos, a veces una. |
| Inglés: «In today's fast-paced world», «delve», «unlock», «leverage», «seamless», «robust», «game-changer», «navigate the landscape», «it's worth noting» | Plain words: use, fast, works well, note. |

## 3. Ritmo y forma

- Mezcla frases cortas con alguna más larga. No todos los párrafos del mismo tamaño.
- Párrafos de 1–4 líneas. Habla de tú, en español de Colombia neutro (sin modismos fuertes).
- Las negritas solo para lo que el lector debe recordar (máximo 1 por párrafo, y no en todos).
- No conviertas todo en viñetas: explica en prosa cuando haya un porqué.
- Títulos H2 como los escribiría una persona, idealmente en forma de pregunta, y la respuesta en la primera frase debajo.
- Nada de emojis en el cuerpo (en plantillas de mensajes de WhatsApp sí se permiten).
- Raya larga (—): máximo 2 por artículo. Usa comas, dos puntos o punto.

## 4. Pasada de edición (paso obligatorio)

Después de escribir el borrador, haz **una segunda pasada como editor humano**, no como redactor:

1. Lee el artículo en voz alta (mentalmente). Cambia lo que suene a folleto o a traducción.
2. Reescribe con tus palabras (parafrasea) los párrafos más genéricos; agrega el detalle propio del punto 1.
3. Corre el revisor automático y corrige todo lo que marque:

   ```bash
   node scripts/revisar-texto-blog.mjs src/content/blog/posts/es/<slug>.ts src/content/blog/posts/en/<slug>.ts
   ```

   Revisa frases de IA, caracteres invisibles (marcas de agua Unicode), exceso de rayas, negritas y viñetas. Debe terminar en «OK». Si queda alguna advertencia justificada (por ejemplo, una cita textual), explícalo en el commit.
4. Si está disponible la skill de Claude SEO `seo-content`, úsala para la limpieza final (frases típicas de IA y caracteres invisibles) y para revisar E-E-A-T.
5. La versión en inglés se escribe pensando en un lector de EE. UU., no se traduce frase por frase. Pasa por el mismo revisor.

## 5. Lo que no cambia

- No inventes cifras, fuentes, clientes ni resultados. Si no hay fuente oficial, habla en general.
- Mantén los marcadores de precios `{{cop:N}}` y la sección `{#k-t-code}`.
- No escribas «KyT Code» ni «kytcode» en el texto visible: la marca es **K&T Code**.
