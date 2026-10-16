import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Shopify is a subscription (from USD 39 a month) that includes hosting and maintenance, but charges an extra fee per sale if you use an external gateway.",
    "WooCommerce charges no subscription or platform fee; you need your own hosting and maintenance.",
    "Shopify suits fast validation without a technical team; WooCommerce or a custom store suits you when you want to maximize margin and control your data.",
  ],
  md: `
Shopify and WooCommerce are the most used store platforms. In Colombia the decision has an extra twist: local gateways and fees.

## Comparison table {#comparison}

Table: Shopify vs. WooCommerce in Colombia.
| Criteria | Shopify | WooCommerce |
|---|---|---|
| Fixed monthly cost | From USD 39 up to USD 399 | No platform subscription |
| Extra fee per sale | Between 0.6% and 2% with an external gateway, depending on the plan | 0% platform fee |
| Colombian gateways | Wompi, Bold, PayU, Mercado Pago | The same, plus direct PSE and Addi |
| Hosting and maintenance | Included | Your own hosting |
| Data ownership | On Shopify's servers | 100% yours |
| Checkout customization | Limited (except on higher plans) | Total |

:::info Watch out for the double fee
If your Shopify store charges through a Colombian gateway, you pay the gateway's fee plus Shopify's surcharge for using an external processor. Always check the current terms on Shopify's pricing page.
:::

## When to choose Shopify {#shopify}

- You want to launch in days, without managing servers or backups.
- Your team isn't technical and values a very polished dashboard.
- Your initial volume is low and the subscription barely dents your margin.

## When to choose WooCommerce {#woocommerce}

- You sell regularly and want to maximize net margin.
- You want native integration with Colombian gateways and DIAN invoicing.
- You care about owning your customers, your catalog and your history.

## The headless option {#headless}

You can manage inventory and orders in WooCommerce while the store the customer sees is a fast, custom-built site. You get the speed without losing a simple dashboard. Read [what headless e-commerce is](/blog/que-es-un-ecommerce-headless-ventajas) or see our [headless WooCommerce](/servicios/woocommerce-headless) service.
`,
  faq: [
    { q: "Which gateways work with WooCommerce and Shopify in Colombia?", a: "Both support Wompi, Bold, PayU and Mercado Pago. Shopify charges an extra percentage when you use an external gateway; WooCommerce charges no platform fee." },
    { q: "Which is cheaper in the long run?", a: "Usually WooCommerce, because it has no mandatory monthly fees or platform commissions, although it needs hosting and maintenance." },
    { q: "What is headless WooCommerce?", a: "A store where inventory and orders are managed in WooCommerce, but the storefront the customer sees is a fast, custom-built site." },
  ],
  sources: [
    { title: "Shopify: pricing", url: "https://www.shopify.com/pricing" },
    { title: "WooCommerce", url: "https://woocommerce.com/" },
  ],
};

export default post;
