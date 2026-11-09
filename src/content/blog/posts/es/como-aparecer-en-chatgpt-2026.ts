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

### Del texto promocional al texto citable

"Somos líderes en soluciones integrales" no le dice nada a un modelo. "Estudio de desarrollo web a la medida en Cúcuta, Colombia; landing pages desde $450.000 COP; entrega en 7 a 12 días" sí.

Tabla: Cómo convertir un texto vago en uno que la IA pueda citar.
| Texto vago | Texto citable |
|---|---|
| Soluciones web innovadoras | Sitios web, tiendas virtuales y software a la medida |
| Precios competitivos | Landing page desde $450.000 COP |
| Webs rápidas | El contenido principal carga en menos de un segundo |
| Amplia experiencia | Más de 20 proyectos en producción en Colombia, México y Perú |

## La jerarquía real de factores GEO {#jerarquia}

No existen archivos mágicos. Lo que los equipos de OpenAI, Perplexity y Google describen es rastreo HTTP estándar sobre páginas accesibles, rápidas e indexables. En orden de prioridad:

1. **Rastreo y acceso al servidor:** permite OAI-SearchBot y PerplexityBot, no los bloquees en el firewall y entrega HTML completo desde el servidor, rápido.
2. **Autoridad de entidad:** para un modelo, tu empresa es un nombre asociado a un tipo de negocio, un lugar, unas personas y unos servicios; si esos datos cambian de un sitio a otro, la entidad se vuelve borrosa. Usa el mismo nombre, fundadores y servicios en todas partes, incluidas las facturas, enlazados con \`sameAs\` a registros y directorios verificados.
3. **Estructura semántica y schema.org:** Organization, Service, Product, FAQPage y BreadcrumbList.
4. **Contenido directo y verificable:** respuesta primero, tablas y cifras; nada de relleno promocional.
5. **Menciones y reseñas externas:** los asistentes contrastan lo que dices con lo que otros dicen de ti, así que la prensa, los directorios, los casos de éxito documentados y las reseñas reales refuerzan la confianza.
6. **Consistencia multicanal:** precios y datos iguales en tu web, redes y directorios.
7. **llms.txt (opcional):** un resumen en texto plano, útil solo cuando lo anterior está resuelto.

:::checklist id="chatgpt-search" title="Checklist para aparecer en ChatGPT Search"
- OAI-SearchBot está permitido en robots.txt
- El firewall o CDN no bloquea a los rastreadores de IA
- Cada página entrega su contenido completo en el HTML
- Tengo datos estructurados de organización, servicios y FAQ
- Mis precios y datos son iguales en todos mis canales
- Mis páginas responden la pregunta principal en las primeras líneas
- Tengo reseñas y menciones en sitios de terceros
:::

## llms.txt: qué es y cómo publicarlo {#llms-txt}

**/llms.txt** es una propuesta de 2024 para que los sitios web ofrezcan a los modelos de lenguaje un resumen estructurado en Markdown: quiénes son, qué venden, precios oficiales y enlaces a lo importante. Va de último en la lista anterior porque no reemplaza ninguno de esos factores.

Tabla: Cada archivo cumple una función distinta.
| Estándar | Propósito |
|---|---|
| robots.txt | Qué pueden rastrear los bots |
| sitemap.xml | Qué URLs existen y cuándo cambiaron |
| Datos estructurados | Relaciones semánticas dentro del HTML |
| llms.txt | Resumen en texto plano para modelos de lenguaje |

Su ventaja es la economía: un agente que tiene que descargar 50 páginas llenas de menús y scripts gasta miles de *tokens*; con llms.txt obtiene el contexto esencial en una sola petición de pocos kilobytes.

### Qué debe incluir

1. **Título (H1):** nombre de la empresa y qué hace.
2. **Cita (>):** la propuesta de valor en una o dos frases, con cobertura geográfica.
3. **Información corporativa:** nombre oficial, sitio, año de fundación, sede y contacto.
4. **Servicios principales:** cada uno con su precio de partida y su moneda.
5. **Enlaces clave:** precios, servicios, casos de estudio y blog.

Puedes ver el nuestro en [/llms.txt](/llms.txt) y una versión extendida con todos nuestros casos y artículos en [/llms-full.txt](/llms-full.txt).

### Cómo publicarlo

- Sírvelo en la raíz (tudominio.com/llms.txt), como texto plano en UTF-8 y con código 200.
- Genéralo desde los mismos datos de tu sitio (precios, servicios, casos) para que **nunca se contradiga** con la web.
- Ponle caché de un día y regenéralo cuando cambien tus precios.
- Permite el acceso en robots.txt a los rastreadores de IA que te interesen.

## Sigue aprendiendo {#mas}

- [Qué es el SEO y cómo funciona](/servicios/seo-tecnico)
- [GEO vs. SEO](/blog/geo-vs-seo-diferencias-motores-ia)
- [Cómo medir tu visibilidad en ChatGPT y Gemini](/blog/medir-visibilidad-chatgpt-gemini-google-ai-mode)

¿Quieres que lo configuremos por ti? Mira nuestro servicio de [SEO técnico](/servicios/seo-tecnico).
`,
  faq: [
    { q: "¿Qué rastreador usa ChatGPT Search?", a: "OAI-SearchBot. Indexa páginas y las enlaza como fuentes sin usarlas para entrenar modelos. GPTBot es el rastreador de entrenamiento." },
    { q: "¿Debo permitir GPTBot para aparecer en ChatGPT Search?", a: "No es obligatorio. Puedes permitir OAI-SearchBot y bloquear GPTBot. Permitir ambos ayuda a que los modelos conozcan mejor tu marca." },
    { q: "¿Qué es GEO?", a: "Generative Engine Optimization: el conjunto de prácticas técnicas y de contenido que ayudan a que los motores de IA reconozcan y citen tu empresa." },
    { q: "¿Los datos estructurados ayudan a que la IA me cite?", a: "Sí. Tipos como Organization, Service, Product y FAQPage describen de forma explícita quién eres, qué vendes y a qué precio." },
    { q: "¿Necesito un blog para aparecer en ChatGPT?", a: "Ayuda mucho. Un blog con comparativas y respuestas claras le da a los modelos el material que necesitan para citarte como referencia del sector." },
    { q: "¿El SEO tradicional sigue sirviendo para la IA?", a: "Sí. La jerarquía de encabezados, la velocidad, los datos estructurados y un sitemap limpio siguen siendo la base para que los rastreadores de IA lean y evalúen un sitio." },
    { q: "¿llms.txt es obligatorio para aparecer en ChatGPT?", a: "No. Es una propuesta voluntaria. Lo determinante es que los rastreadores puedan acceder, que el HTML tenga el contenido y que la información de tu empresa sea clara y consistente." },
    { q: "¿Qué diferencia hay entre llms.txt y llms-full.txt?", a: "llms.txt es un resumen con enlaces; llms-full.txt incluye el contenido completo (casos, artículos) en texto plano para que un modelo no tenga que visitar cada página." },
  ],
  sources: [
    { title: "OpenAI: Overview of OpenAI crawlers", url: "https://platform.openai.com/docs/bots" },
    { title: "Google Search Central: AI features and your website", url: "https://developers.google.com/search/docs/appearance/ai-features" },
    { title: "Schema.org", url: "https://schema.org/" },
    { title: "Propuesta del estándar llms.txt", url: "https://llmstxt.org/" },
    { title: "K&T Code: llms.txt", url: "https://www.kytcode.lat/llms.txt" },
  ],
};

export default post;
