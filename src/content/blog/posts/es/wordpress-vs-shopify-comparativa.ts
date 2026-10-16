import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "WordPress con WooCommerce no cobra mensualidad de plataforma (pagas tu hosting) ni comisión extra por venta; Shopify cobra una suscripción mensual desde USD 39 y un porcentaje adicional si usas una pasarela externa.",
    "Con WordPress los datos viven en tu propia base de datos; con Shopify, en los servidores de Shopify.",
    "Shopify es más fácil para empezar sin conocimientos técnicos; WordPress da más control. Una tienda a la medida da ambas cosas: control total y un panel sencillo.",
  ],
  md: `
WordPress (con WooCommerce) y Shopify son las dos plataformas más conocidas para vender en línea, pero sus modelos de costo y de control son opuestos. Aquí la comparación aplicada a Colombia.

## Tabla comparativa {#comparativa}

Tabla: WordPress / WooCommerce frente a Shopify.
| Característica | WordPress / WooCommerce | Shopify |
|---|---|---|
| Costo fijo mensual de la plataforma | USD 0 (pagas tu hosting) | Desde USD 39 al mes |
| Comisión extra por venta | No | Entre 0,6% y 2% si usas una pasarela externa, según el plan |
| Propiedad de los datos | 100% en tu base de datos | En los servidores de Shopify |
| Pasarelas colombianas | Wompi, Bold, PayU, PSE, Addi | Wompi, PayU, Mercado Pago |
| Facilidad para principiantes | Media | Alta |
| Mantenimiento | Actualizaciones de plugins y seguridad | Lo gestiona Shopify |

En Colombia, PSE y las transferencias como Nequi están entre los medios de pago más usados en compras en línea, así que asegúrate de que tu plataforma los soporte bien. Recuerda también que la DIAN exige factura electrónica en las ventas.

## ¿Cuál es más barato a largo plazo? {#costos}

A medida que crecen tus ventas, la suscripción y las comisiones de Shopify suman más. WordPress evita esos cobros, pero requiere más mantenimiento técnico: actualizaciones, seguridad y velocidad. Calcula ambas opciones para tu volumen de ventas antes de decidir.

## ¿Y una tienda a la medida? {#a-la-medida}

Una tienda construida a la medida elimina la mensualidad de plataforma y las comisiones extra, carga más rápido que una plantilla y te da un panel pensado para tu catálogo. Mira [cuánto cuesta una tienda virtual en Colombia](/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026) y [Shopify vs. WooCommerce en Colombia](/blog/shopify-vs-woocommerce-colombia).

::widget template-vs-custom
`,
  faq: [
    { q: "¿Es más barato WordPress que Shopify a largo plazo?", a: "Generalmente sí: WordPress no cobra suscripción ni comisión por venta, así que el ahorro crece con tus ventas. A cambio, requiere más mantenimiento técnico." },
    { q: "¿Cuál es más fácil para principiantes?", a: "Shopify, porque incluye hosting y pasarelas preconfiguradas. WordPress o una tienda a la medida dan más control sobre la marca y los costos." },
  ],
  sources: [
    { title: "WooCommerce", url: "https://woocommerce.com/" },
    { title: "Shopify: precios", url: "https://www.shopify.com/pricing" },
    { title: "DIAN: factura electrónica", url: "https://www.dian.gov.co/" },
  ],
};

export default post;
