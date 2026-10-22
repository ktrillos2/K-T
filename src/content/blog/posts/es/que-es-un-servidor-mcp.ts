import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "MCP (Model Context Protocol) es un estándar abierto que permite a asistentes de IA como Claude, ChatGPT o Gemini conectarse con tus sistemas: bases de datos, CRM, Power BI, GitHub o tu tienda.",
    "Un servidor MCP es el «enchufe» que expone esas herramientas y datos a la IA de forma ordenada y con permisos.",
    "Lo creó Anthropic a finales de 2024 y hoy lo adoptan OpenAI, Google, Microsoft y miles de herramientas.",
    "Para una empresa, un servidor MCP propio significa que la IA puede consultar inventario, crear cotizaciones o leer reportes sin copiar y pegar.",
  ],
  md: `
Si has visto términos como «servidor MCP», «MCP server de Power BI» o «MCP de GitHub», no estás solo: es una de las búsquedas de tecnología que más creció en 2026. Aquí te lo explicamos sin tecnicismos.

## ¿Qué es MCP? {#que-es}

**MCP** significa *Model Context Protocol* (protocolo de contexto para modelos). Es un **estándar abierto** que define cómo una inteligencia artificial se conecta con herramientas y datos externos.

Piénsalo como el **USB-C de la IA**: antes, cada integración entre un asistente y un sistema se hacía a mano y de forma distinta. Con MCP, cualquier asistente compatible puede conectarse a cualquier servidor compatible.

## ¿Qué es un servidor MCP y para qué sirve? {#servidor}

Un **servidor MCP** es un pequeño programa que se pone entre la IA y tu sistema. Le dice a la IA:

- **Qué herramientas hay** («buscar cliente», «crear cotización», «consultar stock»).
- **Qué datos puede leer** (un reporte, un catálogo, un documento).
- **Qué permisos tiene** (solo leer, o también escribir).

Así, cuando le preguntas al asistente «¿cuántas unidades del producto X quedan en bodega?», la IA llama a la herramienta del servidor MCP, obtiene el dato real y te responde.

Tabla: Ejemplos de servidores MCP y su uso en una empresa.
| Servidor MCP | Qué permite | Ejemplo de uso |
|---|---|---|
| Power BI | Consultar modelos y métricas | «¿Cuánto vendimos en Bogotá este mes?» |
| GitHub | Leer y gestionar código | Revisar cambios o crear tareas |
| Google Drive / Docs | Buscar y leer documentos | Resumir contratos o propuestas |
| Base de datos propia | Consultar inventario o clientes | Responder precios y disponibilidad reales |
| Tu tienda o ERP | Crear pedidos o cotizaciones | Un agente que cotiza por WhatsApp |

## MCP vs. API: ¿cuál es la diferencia? {#mcp-vs-api}

Una [API](/blog/que-es-una-api-y-para-que-sirve) es la puerta de un sistema. MCP es el **idioma común** para que la IA use esas puertas: el servidor MCP suele envolver una o varias APIs y describirlas de forma que el modelo entienda cuándo y cómo usarlas.

## ¿Cómo se crea un servidor MCP? {#como-crear}

1. **Elige las acciones** que la IA necesita (por ejemplo, «buscar producto» y «crear cotización»).
2. **Conecta tus sistemas** a esas acciones mediante sus APIs o la base de datos.
3. **Describe cada herramienta** con un nombre y parámetros claros.
4. **Define permisos**: qué puede leer, qué puede modificar y quién lo usa.
5. **Pruébalo** con un asistente compatible (Claude, ChatGPT, Gemini o tu propio agente).

Existen SDK oficiales en TypeScript y Python, y muchos servidores gratuitos de la comunidad para herramientas populares.

:::warn Seguridad primero
Un servidor MCP le da a la IA acceso a tus sistemas. Usa solo servidores de fuentes confiables, limita los permisos (empieza por solo lectura) y registra cada acción. Un servidor mal configurado es una puerta abierta.
:::

:::checklist id="mcp-empresa" title="¿Tu empresa se beneficia de un servidor MCP?"
- Tu equipo copia datos de un sistema a otro para responder preguntas
- Usas Claude, ChatGPT o Gemini en el trabajo diario
- Tienes datos en una base propia, ERP o Power BI
- Quieres que un agente de IA cotice o consulte inventario
- Necesitas controlar qué puede ver y hacer la IA
:::

Si marcaste tres o más, un servidor MCP a medida puede ahorrarle horas a tu equipo cada semana. Es parte de lo que hacemos en [software a medida](/servicios/software-a-medida).

## Pon a prueba lo que aprendiste {#quiz}

:::quiz
? ¿Qué significa MCP?
- Modelo de Código Privado
- *Model Context Protocol, un estándar para conectar IA con herramientas y datos
- Un plugin de WordPress
= Es un protocolo abierto para que los asistentes de IA usen herramientas externas de forma estándar.
? ¿Qué hace un servidor MCP?
- Aloja tu página web
- *Expone herramientas y datos de tus sistemas a la IA, con permisos
- Reemplaza tu base de datos
= Es el intermediario que le dice a la IA qué puede hacer y con qué datos.
? ¿Cuál es la mejor práctica al conectar un servidor MCP?
- Darle acceso total para que funcione mejor
- *Empezar con permisos de solo lectura y registrar cada acción
- Publicar las credenciales en el código
= Menos permisos significa menos riesgo; el registro permite auditar qué hizo la IA.
:::

## ¿Cómo te ayuda K&T Code con MCP? {#k-t-code}

Creamos servidores MCP y agentes de IA conectados a tus sistemas (inventario, CRM, facturación, reportes), con permisos claros y registro de cada acción.

Tabla: Servicios relacionados y precios de partida (COP).
| Necesitas | Servicio | Desde |
|---|---|---|
| Servidor MCP, agentes de IA o integraciones con tu ERP | [Software a medida](/servicios/software-a-medida) | $4.500.000 |
| Una tienda que un agente de IA pueda consultar | [Tienda virtual](/servicios/tiendas-virtuales) | $1.300.000 |
| Soporte y actualizaciones de tus sistemas | [Mantenimiento web](/servicios/mantenimiento-web) | Según alcance |

Revisa la [guía de precios de software a medida](/precios/precio-software-a-medida) o todos los [planes y precios](/precios).

## Conclusión {#conclusion}

MCP está convirtiendo a los asistentes de IA en compañeros de trabajo que de verdad consultan y actúan sobre tus sistemas. Si quieres que una IA responda con tus datos reales (inventario, precios, reportes), el siguiente paso es un servidor MCP propio. Aprende más sobre [agentes de IA para empresas](/blog/agentes-ia-empresas-colombia) o [escríbenos](/#contacto).
`,
  faq: [
    { q: "¿Qué es un servidor MCP y para qué sirve?", a: "Es un programa que conecta asistentes de IA con tus sistemas (bases de datos, CRM, Power BI, GitHub) y les dice qué herramientas y datos pueden usar, con permisos." },
    { q: "¿Quién creó el protocolo MCP?", a: "Anthropic lo presentó como estándar abierto a finales de 2024; hoy lo soportan OpenAI, Google, Microsoft y muchas herramientas más." },
    { q: "¿Hay servidores MCP gratuitos?", a: "Sí. Existen servidores oficiales y de la comunidad para GitHub, Google Drive, bases de datos y más. Úsalos solo de fuentes confiables." },
    { q: "¿Cómo creo un servidor MCP para mi empresa?", a: "Se definen las acciones que necesita la IA, se conectan a tus sistemas con sus APIs, se describen las herramientas y se configuran permisos. Hay SDK oficiales en TypeScript y Python." },
  ],
  sources: [
    { title: "Model Context Protocol: sitio oficial", url: "https://modelcontextprotocol.io/" },
    { title: "Anthropic: Introducing the Model Context Protocol", url: "https://www.anthropic.com/news/model-context-protocol" },
  ],
};

export default post;
