import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Shopify is a platform built for selling; Wix is a general visual builder that also lets you sell.",
    "Wix works for small, simple catalogs (dozens of products); for variants, dynamic inventory and high volume, Shopify or a custom store are more robust.",
    "Check which Colombian gateways each one supports: PSE, Nequi and cards are key in Colombia.",
  ],
  md: `
If you're going to sell online, the platform determines how far you can grow. Shopify and Wix look similar, but they were born with different purposes.

## Feature comparison {#comparison}

Table: Shopify vs. Wix for selling online.
| Criteria | Shopify | Wix |
|---|---|---|
| Focus | E-commerce | Websites in general |
| Checkout | Highly optimized to convert | Functional, less customizable |
| Inventory | Thousands of products, real-time sync | Better for small catalogs |
| Scalability | High | Limited |
| Gateways in Colombia | Wompi, PayU, Mercado Pago | Mercado Pago, PayU; more limited local options |
| Cost | Monthly subscription + fees | Monthly plan that rises on renewal |

## Which to choose? {#choose}

- **Wix:** if you have fewer than about 50 simple products and don't expect to grow fast.
- **Shopify:** if you handle variants, dynamic inventory and high volume.
- **Custom:** if you want a fast store with no platform fee, connected to WhatsApp and with your own design.

Compare real costs in [how much an online store costs in Colombia](/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026) and in [Shopify vs. WooCommerce](/blog/shopify-vs-woocommerce-colombia).
`,
  faq: [
    { q: "Is Wix enough for a mid-sized store?", a: "It works well for small catalogs of a few dozen simple products. For complex variants, dynamic inventory and high volume, Shopify or a custom store are more robust." },
    { q: "Which Colombian gateways do Shopify and Wix accept?", a: "Shopify integrates with Wompi, PayU and Mercado Pago. Wix supports Mercado Pago and PayU, with more limited local options." },
  ],
};

export default post;
