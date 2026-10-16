import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Integrar WhatsApp con CRM, inventario y facturación requiere webhooks en ambos sentidos, una base de datos central y una capa que orqueste los pasos.",
    "El flujo: el cliente confirma por WhatsApp, el sistema valida y descuenta stock, cobra con un enlace de pago, emite la factura electrónica ante la DIAN y entrega el PDF en el mismo chat.",
    "Para facturar por API necesitas RUT con responsabilidad de facturador electrónico, certificado de firma digital, resolución de numeración y un proveedor tecnológico.",
  ],
  md: `
Cuando las ventas entran por WhatsApp y todo lo demás se hace a mano —revisar stock, digitar en el sistema contable, enviar la factura— cada pedido consume tiempo y abre la puerta a errores. La solución es **conectar todo** para que el pedido avance solo.

## La arquitectura de integración {#arquitectura}

1. **El cliente compra por WhatsApp:** confirma producto, cantidad y datos de facturación. WhatsApp avisa a tu servidor mediante un webhook.
2. **El servidor central valida:** revisa el stock en la bodega, lo **aparta de forma atómica** (nadie más puede vender esa misma unidad) y genera un **enlace de pago** seguro con Wompi, Bold o PSE.
3. **El proveedor tecnológico de facturación** genera el documento electrónico firmado, obtiene la validación de la DIAN y su código único (CUFE) con el QR.
4. **Cierre en WhatsApp:** el cliente recibe el PDF de su factura, el inventario se actualiza y logística recibe la orden de despacho.

## Requisitos para facturar electrónicamente por API {#requisitos-dian}

1. **RUT actualizado** con la responsabilidad de facturador electrónico activa.
2. **Certificado digital de firma** emitido por una entidad de certificación autorizada.
3. **Resolución de numeración** de la DIAN con rango, prefijo, vigencia y clave técnica.
4. **Proveedor tecnológico** autorizado (o el servicio gratuito de la DIAN) con el que tu software se conecta por API.

## Proceso manual vs. proceso integrado {#beneficios}

Tabla: Lo que cambia al integrar.
| Proceso manual | Proceso integrado |
|---|---|
| El asesor transcribe los datos del cliente al sistema contable o a Excel | Captura y validación automática de cédula o NIT |
| Errores de digitación y stock desactualizado | Validación en la base de datos que evita sobreventas |
| La factura llega 24 a 48 horas después | El PDF de la factura llega al instante por WhatsApp |
| Cobro por usuario en el CRM y en el facturador | Sin costo por usuario adicional con software propio |

:::checklist id="integracion-whatsapp" title="Antes de integrar"
- Uso la API oficial de WhatsApp Business (no un bot por código QR)
- Mi inventario está en un sistema con API o en una base de datos
- Tengo resolución de facturación electrónica vigente
- Elegí proveedor tecnológico de facturación
- Tengo cuenta en una pasarela de pagos (Wompi, Bold, PayU)
- Definí quién atiende cuando el cliente pide hablar con una persona
:::

Lee también cómo [automatizar WhatsApp Business con IA](/blog/automatizar-whatsapp-business-con-ia) o mira el servicio de [software a medida](/servicios/software-a-medida).
`,
  faq: [
    { q: "¿Se puede conectar WhatsApp con la facturación electrónica de la DIAN?", a: "Sí. El software recibe el pedido por la API de WhatsApp, emite la factura a través de un proveedor tecnológico autorizado y envía el PDF al cliente en el mismo chat." },
    { q: "¿Necesito cambiar mi sistema contable?", a: "No necesariamente. Si tu sistema tiene API, el software a medida se conecta con él; si no, la integración se hace con un proveedor de facturación electrónica." },
  ],
  sources: [{ title: "DIAN: Factura electrónica", url: "https://www.dian.gov.co/impuestos/factura-electronica/Paginas/default.aspx" }],
};

export default post;
