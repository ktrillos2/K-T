import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Un chatbot tradicional sigue árboles de decisión con botones fijos y no puede consultar ni ejecutar nada en tus sistemas.",
    "Un agente de IA entiende el contexto, consulta datos en tiempo real, elige herramientas y completa tareas de varios pasos: revisar stock, generar un enlace de pago o actualizar el CRM.",
    "Mantén un chatbot simple si solo informas horarios y ubicación; migra a un agente si vendes con variantes, cotizas B2B, agendas citas o cobras 24/7.",
  ],
  md: `
«Chatbot» y «agente de IA» se usan como sinónimos, pero no lo son. La diferencia está en algo muy concreto: **el chatbot responde, el agente actúa**.

## Comparativa de arquitectura {#comparativa}

Tabla: Tres generaciones de asistentes.
| Característica | Chatbot de reglas | Chatbot con NLP | Agente de IA |
|---|---|---|---|
| Lógica | Árboles «si esto, entonces aquello» | Clasifica intenciones | Planifica según el objetivo |
| Acciones | Ninguna | Webhooks fijos | Llama herramientas de forma dinámica |
| Contexto | Se pierde si el usuario se desvía | 1–2 turnos | Memoria de la conversación y de tus documentos |
| Integración | Manual y rígida | Conectores predefinidos | Base de datos, APIs, ERP y CRM |
| Experiencia | Robótica y frustrante | Aceptable en preguntas frecuentes | Fluida y resolutiva |

## Un ejemplo real {#ejemplo}

Un cliente escribe: *«Necesito 15 licencias, ¿hay descuento por pago anual? Necesito factura electrónica con mi RUT, estoy en Cúcuta.»*

### El chatbot de reglas

Muestra un menú fijo: «1. Ver planes · 2. Soporte · 3. Horarios». La pregunta compuesta no cabe en ningún botón y el cliente se va.

### El agente de IA

Consulta la política de descuentos corporativos (más de 10 licencias), verifica la regla de facturación electrónica, calcula el **20% de descuento por pago anual** y ofrece una cotización formal en PDF en el mismo chat.

## Cuándo mantener un chatbot y cuándo migrar {#cuando}

:::checklist id="chatbot-o-agente" title="Necesitas un agente si…"
- Vendes productos con variantes o muchas referencias
- Haces cotizaciones B2B personalizadas
- Agendas citas médicas o visitas técnicas
- Necesitas cobrar 24/7 con enlaces de pago
- Tus clientes hacen preguntas compuestas
- Pierdes contactos fuera del horario laboral
:::

Si marcaste dos o más, un agente probablemente te dé mejor retorno. Si solo necesitas mostrar horarios y ubicación, un chatbot sencillo es suficiente.

:::quiz
? ¿Qué puede hacer un agente de IA que un chatbot de reglas no?
- Mostrar un menú de opciones
- *Consultar el inventario y generar un enlace de pago
- Responder «hola»
= El agente llama herramientas reales (inventario, pagos, CRM); el chatbot de reglas solo sigue un árbol de respuestas.
:::

Profundiza en [agentes de IA para empresas](/blog/agentes-ia-empresas-colombia) o en cómo [automatizar WhatsApp con IA](/blog/automatizar-whatsapp-business-con-ia).
`,
  faq: [
    { q: "¿Cuál es la diferencia entre un chatbot y un agente de IA?", a: "El chatbot sigue respuestas predefinidas; el agente entiende el contexto, consulta tus sistemas y ejecuta acciones como cotizar, cobrar o agendar." },
    { q: "¿Un agente de IA reemplaza a mis asesores?", a: "No. Atiende lo repetitivo, filtra y prepara la información, y pasa los casos calificados a una persona con un resumen." },
  ],
  sources: [{ title: "OpenAI: Function calling", url: "https://platform.openai.com/docs/guides/function-calling" }],
};

export default post;
