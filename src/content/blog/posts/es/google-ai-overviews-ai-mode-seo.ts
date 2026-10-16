import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Los resúmenes con IA de Google (AI Overviews) y AI Mode reducen los clics en búsquedas informativas simples, pero el tráfico de los sitios citados como fuente es más calificado.",
    "Las búsquedas de comparación, precio y temas complejos son la gran oportunidad.",
    "Cinco reglas para ser citado: respuesta primero, tablas reales en HTML, datos propios verificables, datos estructurados sin errores y una web rápida.",
  ],
  md: `
Google ya no solo muestra enlaces: en muchas búsquedas responde con un **resumen generado por IA** que cita unas pocas fuentes. Eso cambia las reglas: estar en la primera página ya no basta, hay que **ser la fuente que el resumen cita**.

## Qué cambió en Google {#que-cambio}

Antes: diez enlaces azules. Ahora: un resumen arriba con 3 a 5 fuentes enlazadas y, debajo, los resultados tradicionales. Los sitios citados reciben clics de usuarios con alta intención; el resto compite por la atención que sobra.

## Qué búsquedas se ven afectadas {#busquedas}

Tabla: Impacto y oportunidad por tipo de búsqueda.
| Tipo de búsqueda | Impacto en clics tradicionales | Oportunidad |
|---|---|---|
| Definiciones simples («qué es un hosting») | Caída fuerte del CTR | Ya no vale la pena el artículo superficial de diccionario |
| Comparativas («Next.js vs. WordPress») | Alta tasa de citas | Tablas con pros, contras y precios exactos |
| Precios y transacciones («precio página web Colombia») | Clics muy calificados | Precios en COP, ofertas y datos estructurados |
| Preguntas complejas (WhatsApp + facturación DIAN) | Respuestas largas que citan 3 a 5 enlaces | Guías paso a paso con diagramas y ejemplos reales |

## Las 5 reglas para que Google te cite {#reglas}

1. **Respuesta primero:** la primera frase bajo cada subtítulo debe responder la pregunta por sí sola.
2. **Tablas reales:** usa tablas en HTML, no imágenes de tablas.
3. **Datos propios y verificables:** rangos de precio en COP o USD, porcentajes y tiempos medidos.
4. **Datos estructurados sin errores:** artículo, preguntas frecuentes y migas de pan, validados en la prueba de resultados enriquecidos de Google.
5. **Velocidad:** un sitio que responde rápido y carga el contenido principal en menos de 1,2 s se rastrea con más frecuencia.

:::checklist id="ai-overviews" title="Revisa una página clave de tu sitio"
- La primera frase de cada sección responde la pregunta
- Tiene al menos una tabla comparativa en HTML
- Incluye cifras concretas con su fuente
- Pasa la prueba de resultados enriquecidos sin errores
- Carga en menos de 2 segundos en celular
:::

Este mismo sitio está construido con estas reglas. Mira el servicio de [SEO técnico](/servicios/seo-tecnico) o la guía [GEO vs. SEO](/blog/geo-vs-seo-diferencias-motores-ia).
`,
  faq: [
    { q: "¿Los AI Overviews de Google reducen el tráfico?", a: "En búsquedas informativas simples sí reducen clics, pero los sitios citados como fuente reciben tráfico más calificado. Las búsquedas de comparación y precio siguen siendo una gran oportunidad." },
    { q: "¿Cómo logro que Google me cite en el resumen con IA?", a: "Con respuestas directas al inicio de cada sección, tablas en HTML, datos propios verificables, datos estructurados sin errores y una web rápida." },
  ],
  sources: [{ title: "Google Search Central: AI features and your website", url: "https://developers.google.com/search/docs/appearance/ai-features" }],
};

export default post;
