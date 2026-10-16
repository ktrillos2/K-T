import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "En el agentic commerce, asistentes de IA buscan, comparan y preparan compras en nombre del cliente.",
    "Para que tu tienda sea elegida necesita: una web rápida que entregue HTML limpio, datos de producto completos (precio, moneda, stock), un resumen en llms.txt y pagos con enlaces seguros.",
    "El cliente sigue autorizando el pago final: el agente prepara la compra y entrega el enlace.",
  ],
  md: `
**Agentic commerce** es el cambio que ocurre cuando un asistente de IA hace la parte pesada de la compra: busca, compara precios y disponibilidad y prepara el pedido. Asistentes como ChatGPT, Gemini o los integrados en el teléfono ya empiezan a hacerlo.

La pregunta para tu tienda es simple: **¿un agente puede entender tu catálogo y elegirte?**

## Del comprador humano al agente {#cambio}

Tabla: Dos formas de comprar.
| | E-commerce tradicional | Agentic commerce |
|---|---|---|
| Quién navega | La persona, página por página | El agente consulta datos |
| Qué convence | Banners, fotos y diseño | Datos claros, precio y stock confiables |
| Cómo se decide | Comparando pestañas | El agente compara en segundos |
| Cómo se paga | Carrito y checkout | Enlace de pago que el cliente autoriza |

Imagina la petición: *«Consígueme un monitor 4K con envío a Cúcuta por menos de $1.800.000 y con factura electrónica».* Solo las tiendas con datos limpios entran en esa comparación.

## Los 4 pilares para estar «agentic ready» {#pilares}

### 1. Una web rápida con HTML limpio

Las tiendas montadas sobre plantillas pesadas son difíciles de leer para un bot. Una tienda que entrega el contenido desde el servidor, con respuestas por debajo de 150 ms, es la base.

### 2. Datos de producto completos

Cada producto debe declarar en datos estructurados:

- **Nombre exacto y referencia (SKU).**
- **Precio en moneda local** (COP).
- **Disponibilidad** verificada (en stock, agotado).
- **Vigencia del precio**, para evitar disputas por ofertas vencidas.

### 3. Tu catálogo resumido en llms.txt

Un resumen con categorías principales, especificaciones clave y políticas de envío ayuda a que el agente entienda tu oferta sin recorrer cientos de páginas. Lee la [guía de llms.txt](/blog/llms-txt-2026).

### 4. Pagos con enlaces seguros

El agente genera un enlace de pago (Wompi, Bold o PSE) y el cliente lo autoriza con su biometría o su banco. Tu tienda solo necesita poder **crear enlaces de pago por API** y confirmar el pago con un webhook.

:::checklist id="agentic-ready" title="¿Tu tienda está lista para agentes?"
- Cada producto tiene precio, moneda y stock en datos estructurados
- Las páginas cargan en menos de un segundo
- El HTML trae el contenido sin depender de JavaScript
- Las políticas de envío y devolución están en texto claro
- Puedes generar enlaces de pago por API
- Tienes un llms.txt con el resumen del catálogo
:::

Construimos tiendas a la medida con todo esto incluido. Conoce el servicio de [tiendas virtuales](/servicios/tiendas-virtuales) o compara [Shopify vs. WooCommerce](/blog/shopify-vs-woocommerce-colombia).
`,
  faq: [
    { q: "¿Qué es el agentic commerce?", a: "Es el comercio en el que asistentes de IA buscan, comparan y preparan compras en nombre del cliente, que solo autoriza el pago final." },
    { q: "¿Necesito rehacer mi tienda para venderle a agentes?", a: "No siempre. Muchas veces basta con completar los datos de producto, mejorar la velocidad y exponer enlaces de pago por API. Si la plantilla es muy pesada, conviene una tienda a la medida." },
  ],
  sources: [{ title: "Gartner: Machine customers", url: "https://www.gartner.com/en/articles/machine-customers-will-impact-every-industry" }],
};

export default post;
