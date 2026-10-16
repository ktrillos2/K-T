import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Una tienda virtual a la medida con K&T Code parte de $1.300.000 COP (pago único), con pasarelas colombianas incluidas.",
    "Los costos recurrentes son el dominio (aprox. $60.000 a $120.000 COP al año), el hosting y la comisión de la pasarela por cada venta.",
    "Las plataformas como Shopify cobran una comisión adicional por venta si usas una pasarela externa; una tienda propia no.",
    "Debes cumplir el Estatuto del Consumidor (Ley 1480 de 2011) y emitir factura electrónica DIAN.",
  ],
  md: `
El comercio electrónico en Colombia sigue creciendo y la mayoría de las compras empiezan en el celular, con PSE y billeteras digitales como medios de pago favoritos. Si estás pensando en vender en línea, estos son los costos reales.

## Desglose de costos {#costos}

Tabla: Costos de una tienda virtual en Colombia (2026).
| Concepto | Costo estimado | Frecuencia |
|---|---|---|
| Dominio .com, .co o .com.co | $60.000 – $120.000 COP | Anual |
| Desarrollo de la tienda a la medida (K&T Code) | Desde $1.300.000 COP | Pago único |
| Integración de pasarela (Wompi, Bold, PayU) | Incluida en el desarrollo | Pago único |
| Hosting en red global | USD 0 – 20 al mes | Mensual |
| Comisión de la pasarela | Aprox. 2,65% – 2,99% + un valor fijo por transacción | Por venta |

:::info Las comisiones cambian
Revisa siempre las tarifas vigentes de cada pasarela antes de decidir. Te comparamos las principales en [Wompi vs. Mercado Pago vs. PayU](/blog/wompi-vs-mercado-pago-vs-payu-colombia).
:::

## Calcula tu tienda {#calculadora}

::widget price-calculator

## Requisitos legales {#legal}

- **Estatuto del Consumidor (Ley 1480 de 2011):** información clara de precios, derecho de retracto y garantías.
- **Factura electrónica DIAN:** tu tienda puede conectarse con proveedores autorizados de facturación para emitirla automáticamente.
- **Protección de datos (Ley 1581 de 2012):** política de privacidad y autorización de tratamiento de datos.

## Tienda propia vs. plataforma {#propia-vs-plataforma}

- **Sin comisión de plataforma:** Shopify cobra entre 0,6% y 2% adicional por venta si usas una pasarela externa, según el plan. En una tienda propia solo pagas la pasarela.
- **Velocidad:** una tienda que carga en menos de un segundo reduce el abandono del carrito en móvil.
- **WhatsApp integrado:** puedes cerrar ventas con pago automático o con un asesor por chat.

Profundiza en [Shopify vs. WooCommerce en Colombia](/blog/shopify-vs-woocommerce-colombia) y [qué es un e-commerce headless](/blog/que-es-un-ecommerce-headless-ventajas).

Mira los [precios de una tienda virtual](/precios/precio-tienda-virtual-colombia) o nuestro servicio de [tiendas virtuales](/servicios/tiendas-virtuales).
`,
  faq: [
    { q: "¿Cuánto cuesta crear una tienda virtual profesional en Colombia?", a: "Con K&T Code, una tienda a la medida con integración a Wompi, Bold o PayU parte de $1.300.000 COP, sin comisión de plataforma por cada venta." },
    { q: "¿Qué costos fijos tiene una tienda online?", a: "El dominio (pago anual) y el hosting o infraestructura en la nube, que para catálogos medianos puede costar entre USD 0 y 20 al mes. A eso se suma la comisión de la pasarela por cada venta." },
  ],
  sources: [
    { title: "Cámara Colombiana de Comercio Electrónico", url: "https://www.ccce.org.co/" },
    { title: "Wompi: tarifas", url: "https://wompi.com/es/co/tarifas" },
    { title: "Shopify: precios", url: "https://www.shopify.com/pricing" },
    { title: "DIAN: factura electrónica", url: "https://www.dian.gov.co/" },
  ],
};

export default post;
