import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "An online store in Argentina has four cost parts: the platform (Tiendanube, Shopify or custom build), design, payment fees and ongoing maintenance.",
    "Tiendanube and Shopify are the fastest way to start with a monthly subscription; a custom store costs more upfront but avoids platform fees and template limits.",
    "With Mercado Pago, bank transfers and installments you can charge the way Argentine shoppers expect; always check current fees before setting prices.",
    "At K&T Code an online store starts at {{cop:1300000}} (see it in Argentine pesos on the pricing page), and we work remotely from Colombia.",
  ],
  md: `
If you're asking **how much an online store costs in Argentina**, the honest answer is: it depends on the platform, how much you customize and how much you sell. Below are the costs to look at, how the most common options compare and how to decide without surprises. We don't invent market figures: subscription prices change (more often in pesos), so we show you **what to compare** and where to check today's price.

## The four costs of an online store {#costos}

1. **Platform:** a monthly subscription (Tiendanube, Shopify) or a custom build (upfront payment, then hosting).
2. **Design and setup:** a customized template or a from-scratch design, photos, copy and catalog upload.
3. **Payments:** gateway fees (for example Mercado Pago) and, on some platforms, an extra fee for using an outside payment provider.
4. **Operations:** domain, maintenance, shipping, invoicing and advertising.

Table: What each option involves.
| Option | Upfront cost | Recurring cost | Design control | Best for |
|---|---|---|---|---|
| Tiendanube | Low | Monthly subscription | Medium (templates) | Launching fast |
| Shopify | Low | Subscription + apps | Medium (themes) | Selling in several countries |
| WooCommerce | Medium | Hosting + plugins | High | Teams already on WordPress |
| Custom store | Higher | Hosting and maintenance | Total | Brands that want to stand out |

:::info Where to see today's price
Plans and fees change often. Always check the official pages of [Tiendanube](https://www.tiendanube.com/) and [Shopify](https://www.shopify.com/pricing) before deciding.
:::

## Tiendanube, Shopify or a custom store {#comparar}

- **Tiendanube:** built for Latin America, with local payment and shipping integrations. Good for launching in a few days.
- **Shopify:** more apps and tools for selling abroad; apps add cost and it may charge an extra fee if you use a gateway other than its own.
- **Custom (for example with Next.js):** very fast loading, unlimited design and no platform fees. It needs a larger initial investment.

To go deeper, read [Shopify vs. WooCommerce](/blog/shopify-vs-woocommerce-colombia), [WordPress vs. Shopify](/blog/wordpress-vs-shopify-comparativa) and [what a headless e-commerce is](/blog/que-es-un-ecommerce-headless-ventajas).

## Getting paid in Argentina: Mercado Pago, transfers and installments {#cobros}

In Argentina, customers expect to pay with **Mercado Pago, cards in installments or bank transfer**. Your store should offer at least those three. Check current fees and settlement times in the [Mercado Pago documentation](https://www.mercadopago.com.ar/developers/es), and calculate your margin **after** fees, not before. To compare gateways, see our [Wompi vs. Mercado Pago vs. PayU](/blog/wompi-vs-mercado-pago-vs-payu-colombia) guide (written for Colombia, but the method for comparing fees is the same).

## What else to keep in mind {#detalles}

- **Invoicing:** depending on your tax regime (monotributo or responsable inscripto), check how to invoice your sales with [ARCA](https://www.arca.gob.ar/).
- **Shipping:** connect a carrier that covers your areas and show delivery times and costs in the store.
- **Pesos and prices:** update prices with a clear process; a store showing outdated prices creates complaints.
- **Trust:** a visible returns policy, contact details and customer reviews.

:::checklist id="tienda-argentina" title="Before launching your online store in Argentina"
- I chose the platform based on my monthly budget and growth plan
- I calculated my margin after fees and installments
- I offer Mercado Pago, cards and bank transfer
- I defined how I will invoice my sales
- Shipping has clear times and costs
- My returns policy is visible
- Every product has its own photos and descriptions
- My store loads fast on mobile
:::

## Test what you learned {#quiz}

:::quiz
? What should you calculate before setting a product's price?
- Only the product cost
- *Your margin after payment fees, shipping and platform costs
- The price of the cheapest competitor
= Without subtracting fees and operating costs, you can sell a lot and earn little.
? What is the main advantage of a custom store?
- It is always cheaper at the start
- *Full control of design and speed, without relying on templates
- It needs no maintenance
= The upfront investment is higher, but you gain freedom and own the code.
? Where should you check the price of a Tiendanube or Shopify plan?
- In a forum post from two years ago
- *On the official pricing page
- No need, they never change
= Plans and fees change; the official source is the only reliable one.
:::

## How K&T Code helps you launch your online store {#k-t-code}

K&T Code is a web development studio in Colombia that works remotely with businesses across Latin America and the United States. We design every project from scratch and hand over the code in your name.

Table: Related services and starting prices in your currency.
| You need | Service | From |
|---|---|---|
| To test a product with a page that sells | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| A store with catalog, cart and payments | [Online store](/servicios/tiendas-virtuales) | {{cop:1300000}} |
| A WooCommerce-powered store with extra speed | [Headless WooCommerce](/servicios/woocommerce-headless) | Depends on scope |
| To show up on Google | [Technical SEO](/servicios/seo-tecnico) | Depends on scope |
| Bring customers with Facebook, Instagram and Google ads | [Ads management](/servicios/administracion-de-ads) | {{cop:450000,usd:200}} / mo |

On [pricing](/precios) you can choose Argentina and see every plan in Argentine pesos. You may also like our [online store pricing guide](/precios/precio-tienda-virtual-colombia) and [how much a website costs in Latin America](/blog/cuanto-cuesta-una-pagina-web-latinoamerica).

## Conclusion {#conclusion}

An online store in Argentina can start with a monthly subscription or grow as your own project. What matters is comparing the total cost (platform, fees and operations), not just the plan price. If you want a fast store with your brand and no strings attached, [write to us](/#contacto) and we'll quote it.
`,
  faq: [
    { q: "How much does an online store cost in Argentina?", a: "It depends on the platform and how much you customize. Add up the platform (subscription or build), design, payment fees and maintenance. At K&T Code an online store starts at $1,300,000 COP, shown in Argentine pesos on the pricing page." },
    { q: "Is Tiendanube, Shopify or a custom store better?", a: "Tiendanube and Shopify let you start fast with a monthly subscription. A custom store needs more upfront investment but gives full design control, better speed and no platform fees." },
    { q: "Which payment methods should my store accept in Argentina?", a: "Usually Mercado Pago, cards in installments and bank transfer. Check current fees in each gateway's official documentation." },
    { q: "Can a company from another country build my online store?", a: "Yes. K&T Code works remotely from Colombia with businesses across Latin America and the United States, with video calls and code delivered in your name." },
  ],
  sources: [
    { title: "Shopify: plans and pricing", url: "https://www.shopify.com/pricing" },
    { title: "Tiendanube", url: "https://www.tiendanube.com/" },
    { title: "Mercado Pago Argentina: developer documentation", url: "https://www.mercadopago.com.ar/developers/es" },
    { title: "ARCA (Argentina's tax and customs agency)", url: "https://www.arca.gob.ar/" },
  ],
};

export default post;
