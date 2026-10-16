import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Five steps to launch an online store in Colombia: catalog, payment gateways, shipping, a fast checkout and traffic.",
    "To connect gateways such as Wompi or Mercado Pago you need an up-to-date RUT (tax registration), a bank certification and an ID document.",
    "Shipping can be automated with carriers such as Coordinadora, Servientrega, Envía or 99minutos.",
    "A custom store with K&T Code starts at COP 1,300,000.",
  ],
  md: `
Selling online in Colombia is more accessible than ever, but a store that actually sells takes more than uploading products. This guide takes you step by step.

## The 5 steps to launch your store {#steps}

1. **Catalog structure:** logical categories, good-resolution photos in lightweight formats, and clear descriptions with dimensions, materials and warranties.
2. **Payment gateways:** connect Wompi, Bold or PayU to accept PSE, Nequi and cards. Compare them in [Wompi vs. Mercado Pago vs. PayU](/blog/wompi-vs-mercado-pago-vs-payu-colombia).
3. **Shipping zones and costs:** set local and national rates with official carriers.
4. **Speed and a short checkout:** every extra step in the purchase process costs sales.
5. **Traffic:** targeted ads on Instagram and Facebook, SEO and WhatsApp.

## Documents to sell online {#documents}

- An up-to-date RUT with the corresponding commercial activity.
- A bank certification in the account holder's name.
- An ID document (or the company's documents if you're a legal entity).
- Electronic invoicing enabled with the DIAN.

:::checklist id="online-store" title="Checklist to launch your store"
- I organized the catalog into clear categories
- I have photos and descriptions for every product
- I have my RUT and bank certification
- I chose and connected the payment gateway
- I set local and national shipping rates
- I tested a complete purchase from my phone
- I have exchange, returns and privacy policies
- I set up electronic invoicing
:::

## What it costs {#cost}

::widget price-calculator

See the full breakdown in [how much an online store costs in Colombia](/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026) or see our [online stores](/servicios/tiendas-virtuales) service.
`,
  faq: [
    { q: "What documents do I need to sell online with payment gateways in Colombia?", a: "An up-to-date RUT with the commercial activity, a bank certification in the account holder's name and an ID document. It applies to individuals and companies." },
    { q: "How is shipping handled in Colombia?", a: "You can integrate freight calculators or logistics platforms that generate shipping labels automatically with carriers such as Coordinadora, Servientrega, Envía or 99minutos." },
  ],
};

export default post;
