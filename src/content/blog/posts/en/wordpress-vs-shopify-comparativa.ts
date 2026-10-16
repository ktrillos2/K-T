import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "WordPress with WooCommerce charges no monthly platform fee (you pay for your hosting) and no extra commission per sale; Shopify charges a monthly subscription from USD 39 and an extra percentage if you use an external gateway.",
    "With WordPress the data lives in your own database; with Shopify, on Shopify's servers.",
    "Shopify is easier to start with and needs no technical knowledge; WordPress gives more control. A custom store gives you both: full control and a simple dashboard.",
  ],
  md: `
WordPress (with WooCommerce) and Shopify are the two best-known platforms for selling online, but their cost and control models are opposites. Here is the comparison, applied to Colombia.

## Comparison table {#comparison}

Table: WordPress / WooCommerce vs. Shopify.
| Feature | WordPress / WooCommerce | Shopify |
|---|---|---|
| Fixed monthly platform cost | USD 0 (you pay for your hosting) | From USD 39 a month |
| Extra fee per sale | No | Between 0.6% and 2% if you use an external gateway, depending on the plan |
| Data ownership | 100% in your database | On Shopify's servers |
| Colombian gateways | Wompi, Bold, PayU, PSE, Addi | Wompi, PayU, Mercado Pago |
| Ease for beginners | Medium | High |
| Maintenance | Plugin and security updates | Handled by Shopify |

In Colombia, PSE and transfers like Nequi are among the most used payment methods for online purchases, so make sure your platform supports them well. Remember too that the DIAN requires electronic invoices on sales.

## Which is cheaper in the long run? {#costs}

As your sales grow, Shopify's subscription and fees add up. WordPress avoids those charges but needs more technical maintenance: updates, security and speed. Calculate both options for your sales volume before deciding.

## What about a custom store? {#custom}

A custom-built store removes the platform fee and the extra commissions, loads faster than a template and gives you a dashboard designed for your catalog. See [how much an online store costs in Colombia](/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026) and [Shopify vs. WooCommerce in Colombia](/blog/shopify-vs-woocommerce-colombia).

::widget template-vs-custom
`,
  faq: [
    { q: "Is WordPress cheaper than Shopify in the long run?", a: "Usually yes: WordPress charges no subscription or per-sale fee, so the savings grow with your sales. In exchange, it needs more technical maintenance." },
    { q: "Which is easier for beginners?", a: "Shopify, because it includes hosting and preconfigured gateways. WordPress or a custom store give more control over the brand and costs." },
  ],
  sources: [
    { title: "WooCommerce", url: "https://woocommerce.com/" },
    { title: "Shopify: pricing", url: "https://www.shopify.com/pricing" },
    { title: "DIAN: electronic invoicing", url: "https://www.dian.gov.co/" },
  ],
};

export default post;
