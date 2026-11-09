import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Para automatizar WhatsApp Business con IA de forma profesional se usa la API oficial de Meta (WhatsApp Cloud API), no bots que escanean un código QR.",
    "La arquitectura une cuatro piezas: la API de Meta, un servidor propio que valida cada mensaje, un motor de IA con herramientas y tus sistemas (inventario, CRM, pagos).",
    "El agente puede consultar stock, generar enlaces de pago con Wompi o Bold y pasar el chat a un asesor cuando el cliente lo pide.",
    "El desarrollo a la medida con K&T Code parte de $4.500.000 COP; la operación mensual depende del volumen de mensajes y de uso del modelo de IA.",
  ],
  md: `
WhatsApp es el canal donde empiezan la mayoría de las conversaciones comerciales en Colombia. Automatizarlo con inteligencia artificial permite responder a muchos clientes a la vez, a cualquier hora, y cerrar ventas en segundos. Pero hacerlo mal puede costarte la línea. Esta es la forma correcta.

## Bots no oficiales vs. la API oficial de Meta {#oficial-vs-informal}

Las herramientas que se conectan escaneando un código QR imitan a WhatsApp Web. Son baratas al inicio, pero ponen en riesgo tu número y tus datos.

Tabla: Método informal frente a la API oficial.
| Criterio | Bot por código QR | WhatsApp Cloud API (oficial) |
|---|---|---|
| Riesgo de bloqueo | Alto: la línea puede ser suspendida | Ninguno si se cumplen las políticas |
| Disponibilidad | Se cae si el celular se apaga o pierde conexión | 24/7 en servidores de Meta |
| Volumen | Limitado, se vuelve cuello de botella | Alta concurrencia (decenas de mensajes por segundo) |
| Seguridad | Sin trazabilidad ni respaldo | Mensajes firmados y verificables |
| Cumplimiento | Difícil de auditar | Compatible con la Ley 1581 de datos personales |

:::warn No arriesgues tu número principal
Si una herramienta te pide escanear un código QR para "automatizar" tu WhatsApp, no es la API oficial. Un bloqueo puede hacerte perder el historial y la línea con la que tus clientes te conocen.
:::

## Arquitectura paso a paso {#arquitectura}

1. **El cliente escribe** en WhatsApp.
2. **Meta envía el mensaje** a tu servidor mediante un webhook firmado.
3. **Tu servidor valida la firma**, recupera el historial de la conversación y consulta el catálogo y las políticas de tu empresa (RAG).
4. **El modelo de IA decide** qué responder y, si hace falta, usa una herramienta: consultar stock, cotizar, crear un pedido.
5. **La respuesta vuelve** al cliente por la API de Meta, normalmente en un par de segundos.

### Paso 1: configuración en Meta for Developers

1. Crea una cuenta en Meta for Developers y vincula un Business Manager verificado (en Colombia necesitas NIT y Cámara de Comercio).
2. Crea una aplicación de tipo empresa y habilita el producto WhatsApp.
3. Registra un número exclusivo para la API (no puede estar activo en la app del celular).
4. Genera un token permanente de usuario del sistema con permisos de mensajería y administración.

### Paso 2: el endpoint que recibe los mensajes

Tu servidor necesita una ruta que haga dos cosas:

- **Verificación:** cuando Meta la registra, responde al desafío solo si el token coincide con el que guardaste en tus variables de entorno.
- **Recepción:** valida la firma de cada mensaje con el secreto de tu aplicación; si no coincide, lo rechaza. Si es válido, procesa el texto con el agente en segundo plano y responde de inmediato a Meta.

## Cobros con Wompi, Bold y PSE {#pagos}

1. El cliente pide un producto o servicio.
2. El agente genera un enlace de pago con el monto en pesos y la referencia del pedido.
3. La pasarela devuelve una URL segura y el agente la envía en el chat.
4. Cuando la pasarela confirma el pago, el sistema envía la factura electrónica y avisa a tu equipo.

## Integración con CRM, inventario y facturación electrónica {#integracion}

El cobro es solo una parte. Si después alguien tiene que revisar stock, digitar en el sistema contable y enviar la factura a mano, cada pedido sigue consumiendo tiempo y abriendo la puerta a errores. Al conectar todo, el pedido avanza solo:

1. **Confirmación:** el cliente confirma producto, cantidad y datos de facturación, y WhatsApp avisa a tu servidor por webhook.
2. **Reserva de stock:** el servidor revisa la bodega y **aparta la unidad de forma atómica**, para que nadie más pueda venderla, antes de generar el enlace de pago.
3. **Factura:** el proveedor tecnológico genera el documento electrónico firmado y obtiene la validación de la DIAN, con su código único (CUFE) y el QR.
4. **Cierre en el chat:** el cliente recibe el PDF, el inventario se actualiza y logística recibe la orden de despacho.

Tabla: Lo que cambia al integrar.
| Proceso manual | Proceso integrado |
|---|---|
| El asesor transcribe los datos del cliente al sistema contable o a Excel | Captura y validación automática de cédula o NIT |
| Errores de digitación y stock desactualizado | Validación en la base de datos que evita sobreventas |
| La factura llega 24 a 48 horas después | El PDF de la factura llega al instante por WhatsApp |
| Cobro por usuario en el CRM y en el facturador | Sin costo por usuario adicional con software propio |

### Requisitos para facturar electrónicamente por API

1. **RUT actualizado** con la responsabilidad de facturador electrónico activa.
2. **Certificado digital de firma** emitido por una entidad de certificación autorizada.
3. **Resolución de numeración** de la DIAN con rango, prefijo, vigencia y clave técnica.
4. **Proveedor tecnológico** autorizado (o el servicio gratuito de la DIAN) con el que tu software se conecta por API.

## Costos de operación en Colombia (2026) {#costos}

Tabla: Costos típicos de una automatización de WhatsApp con IA.
| Concepto | Detalle | Costo estimado |
|---|---|---|
| Mensajes de servicio | Respuestas dentro de las 24 horas siguientes al mensaje del cliente | Sin costo en la tarifa de Meta |
| Mensajes de plantilla | Marketing, recordatorios y notificaciones | Se cobran por mensaje según la tarifa de Meta para Colombia |
| Modelo de IA | Procesamiento de cada conversación | Aprox. USD 20 a 150 al mes según volumen |
| Servidor | Alojamiento del webhook y la lógica | Desde USD 0 a 20 al mes |
| Desarrollo a la medida | Configuración, lógica de negocio e integraciones | Desde $4.500.000 COP (pago único) |

## Buenas prácticas y cumplimiento {#buenas-practicas}

- **Consentimiento:** en el primer mensaje incluye una autorización breve para el tratamiento de datos, conforme a la Ley 1581 de 2012.
- **Responde rápido:** usa modelos de baja latencia para contestar en pocos segundos.
- **Paso a humano:** si el cliente pide hablar con una persona, el agente se detiene y asigna el chat a un asesor.
- **Límites claros:** el agente no debe ofrecer descuentos ni condiciones que tu política no permita.

:::checklist id="whatsapp-ia" title="¿Listo para automatizar tu WhatsApp?"
- Tengo un número exclusivo para la API
- Mi empresa tiene NIT y Business Manager verificado
- Mi catálogo y precios están en un sistema consultable
- Tengo definidas las políticas de envío, cambios y garantías
- Sé qué consultas repetitivas quiero automatizar primero
- Tengo un asesor que recibe los casos escalados
- Tengo resolución de facturación electrónica vigente
- Elegí proveedor tecnológico de facturación
- Tengo cuenta en una pasarela de pagos (Wompi, Bold, PayU)
:::

¿Quieres implementarlo en tu empresa? Conoce nuestro servicio de [software a medida](/servicios/software-a-medida) o escríbenos en el [formulario de contacto](#contacto).
`,
  faq: [
    { q: "¿Puedo usar mi número actual de WhatsApp con la API?", a: "Sí, pero debe dejar de usarse en la aplicación del celular. Muchas empresas prefieren un número nuevo exclusivo para la automatización." },
    { q: "¿La IA puede equivocarse con precios o stock?", a: "Si consulta tus sistemas en tiempo real y tiene reglas que limitan lo que puede ofrecer, las respuestas se basan en datos verificados. Los casos dudosos se pasan a un asesor." },
    { q: "¿Cuánto tarda la implementación?", a: "Una automatización con IA conectada a catálogo y pagos suele tomar de 2 a 4 semanas, según las integraciones." },
    { q: "¿Se puede conectar WhatsApp con la facturación electrónica de la DIAN?", a: "Sí. El software recibe el pedido por la API de WhatsApp, emite la factura a través de un proveedor tecnológico autorizado y envía el PDF al cliente en el mismo chat." },
    { q: "¿Necesito cambiar mi sistema contable?", a: "No necesariamente. Si tu sistema tiene API, el software a medida se conecta con él; si no, la integración se hace con un proveedor de facturación electrónica." },
  ],
  sources: [
    { title: "Meta for Developers: WhatsApp Cloud API", url: "https://developers.facebook.com/docs/whatsapp/cloud-api" },
    { title: "Superintendencia de Industria y Comercio: protección de datos personales", url: "https://www.sic.gov.co/tema/proteccion-de-datos-personales" },
    { title: "DIAN: Factura electrónica", url: "https://www.dian.gov.co/impuestos/factura-electronica/Paginas/default.aspx" },
  ],
};

export default post;
