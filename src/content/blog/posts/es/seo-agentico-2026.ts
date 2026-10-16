import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "El SEO agéntico prepara tu sitio para que agentes y modelos de IA lo entiendan, lo citen y, cada vez más, ejecuten acciones en él.",
    "Sus cuatro pilares: una entidad inequívoca, contenido con respuesta primero, datos estructurados anidados y una web rápida que entrega HTML completo.",
    "Si un precio está enterrado bajo 2.000 palabras, el agente probablemente no lo encuentre: pon resúmenes, rangos y tablas al inicio de cada sección.",
  ],
  md: `
El **SEO agéntico** es la evolución del posicionamiento: ya no basta con que Google rastree tu página, ahora también la leen agentes de inteligencia artificial que comparan proveedores, resumen ofertas y, en algunos casos, compran o agendan por el usuario.

Optimizar para ellos significa trabajar tres cosas: la **arquitectura técnica**, la **estructura semántica** del contenido y tu **reputación verificable**.

## Del SEO clásico al SEO agéntico {#evolucion}

Tabla: Las tres etapas del posicionamiento.
| Etapa | Qué se optimizaba | Dónde aparecías | Para quién |
|---|---|---|---|
| SEO clásico | Palabras clave y enlaces | Lista de enlaces azules | Personas |
| SEO semántico / GEO | Intención de búsqueda y contenido estructurado | Resúmenes con IA y citas | Personas y modelos |
| SEO agéntico (2026+) | Entidades claras, datos y acciones | Respuestas, comparaciones y transacciones | Agentes |

## Los 4 pilares del SEO agéntico {#pilares}

### 1. Una entidad inequívoca

El agente necesita certeza sobre quién eres. Tu nombre, ciudad, fundadores, teléfono y servicios deben decirse **igual en todas partes** y declararse en datos estructurados de organización, con enlaces a tus perfiles oficiales.

### 2. Contenido con respuesta primero

Los modelos trabajan con un límite de contexto. Si el precio aparece después de una introducción eterna, el agente probablemente lo salte. Pon **resúmenes ejecutivos, rangos de precio y tablas comparativas al inicio** de cada sección.

### 3. Datos estructurados anidados

Organización → ofertas → servicios: describir tu catálogo así permite que un agente consulte tus servicios casi como si fuera una base de datos. Incluye precio, moneda y tiempos de entrega.

### 4. Accesibilidad técnica y baja latencia

Los agentes descartan fuentes lentas o que dependen de JavaScript pesado para mostrar el contenido. Entregar HTML completo desde el servidor, en milisegundos y desde una red global, es parte del posicionamiento.

:::tip Una prueba rápida
Pregunta a ChatGPT o a Gemini por tus propios servicios y precios. Si la respuesta es imprecisa o cita a otro, tu entidad todavía no está clara para los modelos.
:::

## Lista de verificación {#checklist}

:::checklist id="seo-agentico" title="¿Tu sitio está listo para agentes?"
- Nombre, dirección y teléfono idénticos en web, redes y directorios
- Datos estructurados de organización con enlaces a perfiles oficiales
- Servicios con precio, moneda y tiempo de entrega en texto
- Cada sección responde su pregunta en las primeras líneas
- Tablas reales en HTML (no imágenes de tablas)
- El HTML trae el contenido completo sin esperar JavaScript
- Respuesta del servidor en menos de 500 ms
- Archivo llms.txt con el resumen del negocio
:::

Este sitio aplica todo lo anterior. Si quieres lo mismo para tu empresa, revisa el servicio de [SEO técnico](/servicios/seo-tecnico) o lee la [guía de llms.txt](/blog/llms-txt-2026).
`,
  faq: [
    { q: "¿Qué es el SEO agéntico?", a: "Es la optimización de la arquitectura, el contenido y los datos de un sitio para que agentes de IA puedan entenderlo, citarlo y ejecutar acciones en él, no solo para que lo rastree un buscador." },
    { q: "¿Reemplaza al SEO tradicional?", a: "No. Lo amplía: las bases técnicas del SEO siguen siendo necesarias y se suman la claridad de entidad, los datos estructurados y el contenido fácil de citar." },
  ],
  sources: [{ title: "Anthropic: Model Context Protocol", url: "https://www.anthropic.com/news/model-context-protocol" }],
};

export default post;
