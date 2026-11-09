import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Shopify es una suscripción (desde USD 39 al mes) que incluye servidor y mantenimiento, pero cobra una comisión adicional por venta si usas una pasarela externa.",
    "WooCommerce no cobra suscripción ni comisión de plataforma; necesitas tu propio hosting y mantenimiento.",
    "Shopify conviene para validar rápido sin equipo técnico; WooCommerce o una tienda a la medida convienen cuando quieres maximizar margen y controlar tus datos.",
  ],
  md: `
Shopify y WooCommerce son las plataformas de tiendas más usadas. En Colombia la decisión tiene un matiz extra: las pasarelas locales y las comisiones.

## Tabla comparativa {#comparativa}

Tabla: Shopify frente a WooCommerce en Colombia.
| Criterio | Shopify | WooCommerce |
|---|---|---|
| Costo fijo mensual | Desde USD 39 hasta USD 399 | Sin suscripción de plataforma |
| Comisión extra por venta | Entre 0,6% y 2% con pasarela externa, según el plan | 0% de plataforma |
| Pasarelas colombianas | Wompi, Bold, PayU, Mercado Pago | Las mismas, más PSE directo y Addi |
| Servidor y mantenimiento | Incluido | Hosting propio |
| Propiedad de los datos | En los servidores de Shopify | 100% tuya |
| Personalización del checkout | Limitada (salvo planes superiores) | Total |
| Facilidad para principiantes | Alta | Media |

:::info Ojo con la doble comisión
Si tu tienda en Shopify cobra con una pasarela colombiana, pagas la comisión de la pasarela y además el recargo de Shopify por procesador externo. Verifica siempre las condiciones vigentes en la página de precios de Shopify.
:::

## Cuándo elegir Shopify {#shopify}

- Quieres lanzar en días, sin administrar servidores ni copias de seguridad.
- Tu equipo no es técnico y valora un panel muy pulido.
- Tu volumen inicial es bajo y la suscripción pesa poco en tu margen.

## Cuándo elegir WooCommerce {#woocommerce}

- Vendes de forma recurrente y quieres maximizar el margen neto.
- Quieres integración nativa con pasarelas colombianas y facturación DIAN.
- Te importa ser dueño de tus clientes, tu catálogo y tu historial.

## Cómo hacer la cuenta en Colombia {#cuenta}

A medida que crecen tus ventas, la suscripción y las comisiones de Shopify suman más. WooCommerce evita esos cobros, pero exige más trabajo técnico: actualizaciones de plugins, seguridad y velocidad. Calcula ambas opciones para tu volumen de ventas antes de decidir. Una tienda construida a la medida, en cambio, elimina la mensualidad de plataforma y las comisiones extra, y te da un panel pensado para tu catálogo.

Revisa también dos requisitos locales: PSE y las transferencias como Nequi están entre los medios de pago más usados en compras en línea, así que tu plataforma debe soportarlos bien, y la DIAN exige factura electrónica en las ventas.

## La opción headless {#headless}

Puedes administrar inventario y pedidos en WooCommerce mientras la tienda que ve el cliente es un sitio rápido hecho a la medida. Tienes la velocidad sin perder un panel sencillo. Lee [qué es un e-commerce headless](/servicios/woocommerce-headless) o mira nuestro servicio de [WooCommerce headless](/servicios/woocommerce-headless).
`,
  faq: [
    { q: "¿Qué pasarelas funcionan con WooCommerce y Shopify en Colombia?", a: "Ambas soportan Wompi, Bold, PayU y Mercado Pago. Shopify cobra un porcentaje adicional cuando usas una pasarela externa; WooCommerce no cobra comisión de plataforma." },
    { q: "¿Cuál es más barato a largo plazo?", a: "Generalmente WooCommerce, porque no tiene mensualidades obligatorias ni comisiones de plataforma, aunque requiere hosting y mantenimiento." },
    { q: "¿Cuál es más fácil para principiantes?", a: "Shopify, porque incluye hosting y pasarelas preconfiguradas. WooCommerce o una tienda a la medida dan más control sobre la marca y los costos." },
    { q: "¿Qué es WooCommerce headless?", a: "Una tienda donde el inventario y los pedidos se administran en WooCommerce, pero la vitrina que ve el cliente es un sitio rápido hecho a la medida." },
  ],
  sources: [
    { title: "Shopify: precios", url: "https://www.shopify.com/pricing" },
    { title: "WooCommerce", url: "https://woocommerce.com/" },
    { title: "DIAN: factura electrónica", url: "https://www.dian.gov.co/" },
  ],
};

export default post;
