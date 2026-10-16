import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "ChatGPT Search encuentra y cita páginas con el rastreador OAI-SearchBot. Si lo bloqueas, ChatGPT no puede enlazar tu sitio como fuente.",
    "GPTBot es otro rastreador, usado para entrenar modelos: permitirlo o bloquearlo es una decisión de política y no afecta las citas si OAI-SearchBot está permitido.",
    "Para que la IA te cite: servidor accesible y rápido, HTML completo, entidad de marca consistente, datos estructurados y contenido que responde primero.",
    "Archivos como llms.txt son un complemento opcional, no un atajo: no compensan un sitio lento o mal configurado.",
  ],
  md: `
Cada vez más personas le preguntan a ChatGPT, Perplexity o Gemini a quién contratar o qué comprar. Si tu empresa no aparece citada en esas respuestas, pierdes clientes que nunca llegan a Google. Esta guía explica cómo configurar tu sitio para que ChatGPT Search te encuentre y te cite.

## OAI-SearchBot vs. GPTBot: la diferencia clave {#rastreadores}

Confundir el rastreador de búsqueda con el de entrenamiento es el error más común. Bloquear el equivocado puede sacarte de ChatGPT Search.

Tabla: Rastreadores de OpenAI y su función.
| Agente | Para qué sirve | ¿Entrena modelos? | Impacto en tu visibilidad |
|---|---|---|---|
| OAI-SearchBot | Búsqueda en ChatGPT y enlaces citados | No | Esencial |
| GPTBot | Recolección de datos para entrenamiento | Sí | Opcional, según tu política |
| ChatGPT-User | Visita una URL cuando un usuario la comparte o pide leerla | No | Recomendado |

### Dos configuraciones de robots.txt

- **Máxima visibilidad (la que recomendamos):** permite OAI-SearchBot, GPTBot y ChatGPT-User en todo el sitio, y bloquea solo rutas privadas como \`/admin/\` y \`/api/\`. Apareces en búsquedas y tu marca queda en el conocimiento general de los modelos.
- **Solo búsqueda, sin entrenamiento:** permite OAI-SearchBot y ChatGPT-User, y bloquea GPTBot. Sigues siendo citable sin aportar datos al entrenamiento.

:::tip Revisa también tu firewall
Muchos sitios permiten los bots en robots.txt pero los bloquean con desafíos o errores 403 en el firewall o el CDN. Para el rastreador, el resultado es el mismo: no puede leer tu página.
:::

## Datos estructurados que debes declarar {#schema}

Los datos estructurados (schema.org en JSON-LD) le dicen a los modelos, sin ambigüedad, quién eres y qué ofreces.

- **Organization o LocalBusiness:** nombre legal, logo, fundadores, dirección y perfiles oficiales (\`sameAs\`).
- **Service y Product:** precios exactos, moneda (COP, USD), tiempos de entrega.
- **FAQPage:** preguntas y respuestas directas, fáciles de extraer.
- **BreadcrumbList:** la jerarquía de tu sitio.

## Contenido en pirámide invertida {#contenido}

Tabla: Estrategias de contenido que funcionan con los modelos de IA.
| Estrategia | Por qué funciona | Ejemplo |
|---|---|---|
| Definición en las primeras 40 palabras | El modelo extrae la respuesta sin buscarla | "Un agente de IA es un sistema autónomo que…" |
| Tablas en HTML | Se interpretan mejor que listas desordenadas | Precios en COP y tiempos de entrega |
| Cifras verificables | Los modelos prefieren datos a adjetivos | "Landing pages desde $450.000 COP" |

## La jerarquía real de factores GEO {#jerarquia}

No existen archivos mágicos. Lo que los equipos de OpenAI, Perplexity y Google describen es rastreo HTTP estándar sobre páginas accesibles, rápidas e indexables. En orden de prioridad:

1. **Rastreo y acceso al servidor:** permite OAI-SearchBot y PerplexityBot, no los bloquees en el firewall y entrega HTML completo desde el servidor, rápido.
2. **Autoridad de entidad:** el mismo nombre, fundadores y servicios en todas partes, enlazados con \`sameAs\` a registros y directorios verificados.
3. **Estructura semántica y schema.org:** Organization, Service, Product, FAQPage y BreadcrumbList.
4. **Contenido directo y verificable:** respuesta primero, tablas y cifras; nada de relleno promocional.
5. **Menciones y reseñas externas:** prensa, directorios y reseñas reales refuerzan la confianza.
6. **Consistencia multicanal:** precios y datos iguales en tu web, redes y directorios.
7. **llms.txt (opcional):** un resumen en texto plano, útil solo cuando lo anterior está resuelto. Más detalles en [la guía de llms.txt](/blog/llms-txt-2026).

:::checklist id="chatgpt-search" title="Checklist para aparecer en ChatGPT Search"
- OAI-SearchBot está permitido en robots.txt
- El firewall o CDN no bloquea a los rastreadores de IA
- Cada página entrega su contenido completo en el HTML
- Tengo datos estructurados de organización, servicios y FAQ
- Mis precios y datos son iguales en todos mis canales
- Mis páginas responden la pregunta principal en las primeras líneas
- Tengo reseñas y menciones en sitios de terceros
:::

## Sigue aprendiendo {#mas}

- [Qué es el SEO y cómo funciona](/blog/que-es-el-seo-y-como-funciona-guia)
- [GEO vs. SEO](/blog/geo-vs-seo-diferencias-motores-ia)
- [Cómo lograr que la IA cite tu marca](/blog/seo-para-chatgpt-optimizacion-ia)
- [Google AI Overviews y AI Mode](/blog/google-ai-overviews-ai-mode-seo)
- [Cómo medir tu visibilidad en ChatGPT y Gemini](/blog/medir-visibilidad-chatgpt-gemini-google-ai-mode)

¿Quieres que lo configuremos por ti? Mira nuestro servicio de [SEO técnico](/servicios/seo-tecnico).
`,
  faq: [
    { q: "¿Qué rastreador usa ChatGPT Search?", a: "OAI-SearchBot. Indexa páginas y las enlaza como fuentes sin usarlas para entrenar modelos. GPTBot es el rastreador de entrenamiento." },
    { q: "¿Debo permitir GPTBot para aparecer en ChatGPT Search?", a: "No es obligatorio. Puedes permitir OAI-SearchBot y bloquear GPTBot. Permitir ambos ayuda a que los modelos conozcan mejor tu marca." },
    { q: "¿Qué es GEO?", a: "Generative Engine Optimization: el conjunto de prácticas técnicas y de contenido que ayudan a que los motores de IA reconozcan y citen tu empresa." },
    { q: "¿Los datos estructurados ayudan a que la IA me cite?", a: "Sí. Tipos como Organization, Service, Product y FAQPage describen de forma explícita quién eres, qué vendes y a qué precio." },
  ],
  sources: [
    { title: "OpenAI: Overview of OpenAI crawlers", url: "https://platform.openai.com/docs/bots" },
    { title: "Google Search Central: AI features and your website", url: "https://developers.google.com/search/docs/appearance/ai-features" },
    { title: "Schema.org", url: "https://schema.org/" },
  ],
};

export default post;
