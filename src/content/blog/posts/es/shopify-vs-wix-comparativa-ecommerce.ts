import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Shopify es una plataforma pensada para vender; Wix es un constructor visual general que también permite vender.",
    "Wix funciona para catálogos pequeños y sencillos (decenas de productos); para variantes, inventario dinámico y alto volumen, Shopify o una tienda a la medida son más robustos.",
    "Revisa qué pasarelas colombianas soporta cada uno: PSE, Nequi y tarjetas son claves en Colombia.",
  ],
  md: `
Si vas a vender en línea, la plataforma define hasta dónde puedes crecer. Shopify y Wix parecen similares, pero nacieron con propósitos distintos.

## Comparativa de funcionalidades {#comparativa}

Tabla: Shopify frente a Wix para vender en línea.
| Criterio | Shopify | Wix |
|---|---|---|
| Enfoque | Comercio electrónico | Sitios web en general |
| Checkout | Muy optimizado para convertir | Funcional, menos personalizable |
| Inventario | Miles de productos, sincronización en tiempo real | Mejor para catálogos pequeños |
| Escalabilidad | Alta | Limitada |
| Pasarelas en Colombia | Wompi, PayU, Mercado Pago | Mercado Pago, PayU; opciones locales más limitadas |
| Costo | Suscripción mensual + comisiones | Plan mensual que sube al renovar |

## ¿Cuál elegir? {#elegir}

- **Wix:** si tienes menos de unos 50 productos sencillos y no esperas crecer rápido.
- **Shopify:** si manejas variantes, inventario dinámico y volumen alto.
- **A la medida:** si quieres una tienda rápida, sin comisión de plataforma, conectada a WhatsApp y con un diseño propio.

Compara costos reales en [cuánto cuesta una tienda virtual en Colombia](/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026) y en [Shopify vs. WooCommerce](/blog/shopify-vs-woocommerce-colombia).
`,
  faq: [
    { q: "¿Wix es suficiente para una tienda mediana?", a: "Funciona bien para catálogos pequeños, de unas decenas de productos sencillos. Para variantes complejas, inventario dinámico y alto volumen, Shopify o una tienda a la medida son más robustos." },
    { q: "¿Qué pasarelas colombianas aceptan Shopify y Wix?", a: "Shopify se integra con Wompi, PayU y Mercado Pago. Wix soporta Mercado Pago y PayU, con opciones locales más limitadas." },
  ],
};

export default post;
