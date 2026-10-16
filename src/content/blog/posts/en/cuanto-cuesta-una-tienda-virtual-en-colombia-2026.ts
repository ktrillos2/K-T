import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "A custom online store with K&T Code starts at COP 1,300,000 (one-time payment), with Colombian payment gateways included.",
    "Recurring costs are the domain (approx. COP 60,000 to 120,000 a year), hosting and the gateway fee on each sale.",
    "Platforms like Shopify charge an extra fee per sale if you use an external gateway; your own store doesn't.",
    "You must comply with Colombia's Consumer Statute (Law 1480 of 2011) and issue DIAN electronic invoices.",
  ],
  md: `
E-commerce in Colombia keeps growing and most purchases start on a phone, with PSE and digital wallets as the favorite payment methods. If you're thinking about selling online, these are the real costs.

## Cost breakdown {#costs}

Table: Costs of an online store in Colombia (2026).
| Item | Estimated cost | Frequency |
|---|---|---|
| .com, .co or .com.co domain | COP 60,000 – 120,000 | Yearly |
| Custom store development (K&T Code) | From COP 1,300,000 | One-time payment |
| Gateway integration (Wompi, Bold, PayU) | Included in development | One-time payment |
| Hosting on a global network | USD 0 – 20 per month | Monthly |
| Gateway fee | Approx. 2.65% – 2.99% + a fixed amount per transaction | Per sale |

:::info Fees change
Always check each gateway's current rates before deciding. We compare the main ones in [Wompi vs. Mercado Pago vs. PayU](/blog/wompi-vs-mercado-pago-vs-payu-colombia).
:::

## Estimate your store {#calculator}

::widget price-calculator

## Legal requirements {#legal}

- **Consumer Statute (Law 1480 of 2011):** clear price information, right of withdrawal and warranties.
- **DIAN electronic invoicing:** your store can connect to authorized invoicing providers to issue invoices automatically.
- **Data protection (Law 1581 of 2012):** a privacy policy and authorization for data processing.

## Your own store vs. a platform {#own-vs-platform}

- **No platform fee:** Shopify charges between 0.6% and 2% extra per sale if you use an external gateway, depending on the plan. With your own store you only pay the gateway.
- **Speed:** a store that loads in under a second reduces cart abandonment on mobile.
- **Built-in WhatsApp:** you can close sales with automatic payment or with a rep over chat.

Go deeper in [Shopify vs. WooCommerce in Colombia](/blog/shopify-vs-woocommerce-colombia) and [what headless e-commerce is](/blog/que-es-un-ecommerce-headless-ventajas).

See [online store prices](/precios/precio-tienda-virtual-colombia) or our [online stores](/servicios/tiendas-virtuales) service.
`,
  faq: [
    { q: "How much does a professional online store cost in Colombia?", a: "With K&T Code, a custom store integrated with Wompi, Bold or PayU starts at COP 1,300,000, with no platform fee on each sale." },
    { q: "What fixed costs does an online store have?", a: "The domain (paid yearly) and hosting or cloud infrastructure, which for mid-sized catalogs can cost between USD 0 and 20 a month. On top of that comes the gateway fee on each sale." },
  ],
  sources: [
    { title: "Colombian Chamber of E-commerce", url: "https://www.ccce.org.co/" },
    { title: "Wompi: rates", url: "https://wompi.com/es/co/tarifas" },
    { title: "Shopify: pricing", url: "https://www.shopify.com/pricing" },
    { title: "DIAN: electronic invoicing", url: "https://www.dian.gov.co/" },
  ],
};

export default post;
