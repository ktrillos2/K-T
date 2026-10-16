import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Un agente de IA empresarial combina un modelo de lenguaje, los datos de tu empresa y acciones reales sobre tus sistemas: consulta inventario, cotiza, registra pedidos y escala casos a personas.",
    "A diferencia de un chatbot de botones, entiende lenguaje natural, pide aclaraciones y ejecuta tareas de varios pasos.",
    "Conviene cuando el proceso tiene reglas claras, hay sistemas con API y el volumen supera unas 15 consultas diarias.",
    "En Colombia la implementación parte de $4.500.000 COP y la operación mensual del modelo suele estar entre USD 40 y 300.",
  ],
  md: `
En 2026 la inteligencia artificial dejó de ser una curiosidad para convertirse en una ventaja operativa medible. Pero entre un chatbot que responde con botones y un agente que cierra ventas hay una diferencia enorme. Aquí te explicamos qué es un agente de IA, cómo funciona y cuándo vale la pena para tu empresa.

## Qué es un agente de IA empresarial {#que-es}

Es un sistema autónomo que **entiende lo que pide el usuario, decide qué hacer y lo ejecuta** conectándose a tus sistemas. Puede consultar inventario en vivo, emitir una cotización, registrar un pedido en tu ERP, verificar un pago o pasar el caso a una persona cuando hace falta.

## Las capas de un agente confiable {#anatomia}

1. **Interfaz:** recibe la intención del usuario por WhatsApp, chat web o correo.
2. **Razonamiento y orquestación:** analiza el contexto y divide el problema en pasos.
3. **Herramientas:** se conecta a tus APIs y bases de datos mediante contratos estrictos y validados.
4. **Memoria y conocimiento (RAG):** guarda el historial e inyecta políticas, catálogo y manuales sin reentrenar el modelo.
5. **Reglas de seguridad:** bloquean descuentos no autorizados, divulgación de datos privados o transacciones fuera de límite, y dejan registro de todo.

## Chatbot vs. agente vs. software a medida con IA {#comparativa}

Tabla: Diferencias entre las tres opciones.
| Criterio | Chatbot de reglas | Agente de IA | Software a medida + IA (K&T Code) |
|---|---|---|---|
| Comprensión | Palabras clave y botones | Lenguaje natural e intención compleja | Razonamiento guiado por las reglas de tu negocio |
| Acciones | Ninguna, solo texto | Llama APIs y bases de datos | Integración profunda con ERP, CRM e inventario |
| Ambigüedad | Falla y reinicia el flujo | Pide aclaraciones | Respaldo lógico y paso a humano |
| Mantenimiento | Reconfigurar árboles a mano | Actualizar documentos y endpoints | Arquitectura modular con monitoreo |
| Impacto | Filtro superficial de soporte | Ventas y servicio de punta a punta | Automatiza procesos repetitivos completos |

Profundiza en [chatbot vs. agente de IA](/blog/chatbot-vs-agente-ia).

## Casos de uso reales en Colombia {#casos}

### Calificación y cierre de ventas en WhatsApp

- Identifica presupuesto y necesidad del cliente en la primera conversación.
- Consulta stock en bodegas de distintas ciudades.
- Genera enlaces de pago con Wompi, Bold o PayU y confirma el pago automáticamente.
- Registra el pedido y agenda el contacto con el asesor asignado.

### Cotizaciones B2B con precios dinámicos

- Interpreta solicitudes complejas: medidas, cantidades por volumen, plazos de entrega.
- Calcula márgenes y fletes regionales con tus tarifas.
- Envía la cotización en PDF por correo y WhatsApp al instante.

### Soporte técnico de primer nivel

- Clasifica tickets por gravedad y tiempo de respuesta.
- Guía al usuario con los manuales y le pide fotos de la falla.
- Crea el ticket y asigna al técnico según la zona.

## Cuándo conviene y cuándo no {#cuando}

:::info El error más común
Poner un agente encima de una operación desordenada. La IA amplifica los procesos bien diseñados y también los mal definidos.
:::

### Sí conviene si…

- Tu equipo pasa más de 3 horas al día respondiendo las mismas preguntas o copiando datos entre WhatsApp y Excel.
- Pierdes clientes por fuera del horario laboral.
- Tu ERP, CRM o base de datos permite integraciones.

### Todavía no conviene si…

- Tus políticas de precios, cambios o cobertura no están claras.
- Recibes menos de unas 15 consultas al día: en esa etapa vale más el contacto directo.
- Quieres que la IA tome decisiones financieras críticas sin supervisión.

:::checklist id="agente-ia-listo" title="¿Tu empresa está lista para un agente de IA?"
- Tengo procesos con reglas claras y documentadas
- Mis sistemas tienen API o se pueden integrar
- Recibo más de 15 consultas repetitivas al día
- Pierdo clientes fuera del horario laboral
- Tengo a alguien que recibe los casos escalados
:::

## Costos en Colombia (2026) {#costos}

1. **Desarrollo inicial:** desde $4.500.000 COP para un agente con dos herramientas integradas, hasta más de $18.000.000 COP para arquitecturas con varios agentes, conocimiento avanzado y software a medida.
2. **Modelo de IA y nube:** entre USD 40 y 300 al mes, según el volumen de conversaciones.
3. **Canal oficial de mensajería:** la tarifa de Meta para WhatsApp, por mensaje de plantilla.

Si quieres estimar si se paga solo, usa nuestra guía para [calcular el ROI de una automatización](/blog/calcular-roi-automatizacion-software-ia).

## Seguridad y Ley 1581 {#seguridad}

- Consentimiento explícito antes de tratar datos personales.
- Protección contra instrucciones maliciosas en los mensajes (inyección de prompts).
- Cifrado en tránsito y credenciales guardadas fuera del código.
- Registro completo: qué respondió el agente, qué herramientas usó y por qué.
`,
  faq: [
    { q: "¿Un agente de IA puede inventar respuestas?", a: "Puede ocurrir si se conecta sin controles. Por eso limitamos el modelo a fuentes verificadas (bases de datos y catálogos) y validamos cada acción crítica antes de ejecutarla." },
    { q: "¿Reemplaza a los asesores de venta?", a: "No. El agente filtra, recoge datos y resuelve lo repetitivo; luego entrega al asesor los clientes calificados con un resumen." },
    { q: "¿Cuánto tarda la implementación?", a: "Un agente conectado a WhatsApp y a un CRM básico toma de 2 a 4 semanas. Con integración profunda a un ERP, de 6 a 10 semanas." },
  ],
  sources: [
    { title: "Superintendencia de Industria y Comercio: protección de datos personales", url: "https://www.sic.gov.co/tema/proteccion-de-datos-personales" },
    { title: "Meta for Developers: WhatsApp Cloud API", url: "https://developers.facebook.com/docs/whatsapp/cloud-api" },
  ],
};

export default post;
