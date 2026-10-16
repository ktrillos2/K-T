import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Automatizar procesos con IA en Colombia cuesta entre $3.500.000 y más de $35.000.000 de implementación, según la complejidad.",
    "A eso se suma un costo mensual de operación de unos USD 30 a 500: consumo de modelos de IA, servidores y mensajería oficial de WhatsApp.",
    "Exige en la cotización: manejo de errores, límites de consumo y que el código sea tuyo.",
  ],
  md: `
«¿Cuánto cuesta poner IA en mi empresa?» depende de qué tan lejos quieras llegar: no es lo mismo responder preguntas frecuentes que tener agentes conectados a tu ERP y a la facturación electrónica.

## Precios por nivel de complejidad {#niveles}

Tabla: Rangos de referencia en Colombia (2026).
| Nivel | Alcance | Implementación (COP) | Recurrente (USD/mes) | Tiempo |
|---|---|---|---|---|
| 1. Automatización puntual | Preguntas frecuentes, captura de contactos, avisos por correo o Slack | $3.500.000 – $6.500.000 | 30 – 80 | 2 a 3 semanas |
| 2. Agente comercial | API oficial de WhatsApp, catálogo, cotización automática, CRM y pagos (Wompi, Bold) | $6.500.000 – $14.000.000 | 80 – 200 | 3 a 5 semanas |
| 3. Ecosistema a medida | Varios agentes, búsqueda en tus documentos, conexión ERP y DIAN, panel administrativo | $14.000.000 – $35.000.000+ | 150 – 500+ | 6 a 12 semanas |

## De qué se compone el costo {#componentes}

- **Ingeniería (pago único):** modelado de datos, instrucciones del sistema, APIs e interfaz.
- **Consumo de modelos de IA (variable):** OpenAI, Anthropic, DeepSeek u otros, según el volumen de conversaciones.
- **Infraestructura (fijo):** servidores, base de datos y almacenamiento vectorial.
- **Mensajería oficial:** tarifas de Meta por conversación en WhatsApp.

## Costos ocultos que debes exigir en la cotización {#ocultos}

1. **Manejo de errores:** ¿qué pasa si la API de un proveedor se cae? Debe haber reintentos y alertas automáticas.
2. **Límites de consumo:** topes mensuales para evitar facturas sorpresa de los proveedores de IA o de nube.
3. **Propiedad intelectual:** en K&T Code el código, las bases de datos y la propiedad intelectual son 100% de tu empresa.

## Cómo calcular el retorno {#roi}

- **Ahorro mensual** = (horas ahorradas × costo por hora) + ventas capturadas fuera de horario.
- **Periodo de recuperación** = inversión inicial ÷ (ahorro mensual − costo de operación).

Ejemplo: una distribuidora en Bogotá con 60 cotizaciones diarias que perdía contactos de noche recuperó **$8.500.000 en menos de 3,4 meses** con un agente de ventas por WhatsApp 24/7.

::widget roi-calculator

Mira el paso a paso en [cómo calcular el ROI](/blog/calcular-roi-automatizacion-software-ia) o qué es un [agente de IA para empresas](/blog/agentes-ia-empresas-colombia).
`,
  faq: [
    { q: "¿Cuánto cuesta un chatbot con IA para WhatsApp en Colombia?", a: "Un agente comercial conectado a la API oficial, catálogo, CRM y pagos suele costar entre $6.500.000 y $14.000.000 de implementación, más USD 80 a 200 al mes de operación." },
    { q: "¿Por qué hay un costo mensual?", a: "Porque cada conversación consume el modelo de IA, los servidores y la mensajería oficial de WhatsApp. Se puede limitar con topes de consumo." },
  ],
  sources: [{ title: "Gartner: Artificial intelligence insights", url: "https://www.gartner.com/en/information-technology/insights/artificial-intelligence" }],
};

export default post;
