import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "A landing page is a single page with one goal: close a sale or capture a lead. An online store is a platform with a catalog, cart, payments, inventory and shipping.",
    "Choose a landing page if you sell services, have one or two star products or plan to run Meta or Google ads. Choose a store if you have a large catalog with variants and want to sell 24/7.",
    "At K&T Code a landing page starts at COP 450,000 (7 to 12 days) and an online store at COP 1,300,000 (25 to 40 days).",
    "The hybrid model (a main store plus satellite landing pages for campaigns) usually gets the best results.",
  ],
  md: `
Choosing wrong is expensive: a complex store to sell a single service confuses the buyer and inflates the project; a landing page for hundreds of products becomes unmanageable. Here is the difference, point by point.

## Full comparison {#comparison}

Table: Landing page vs. online store.
| Criteria | Landing page | Online store |
|---|---|---|
| Purpose | Close a sale or capture a qualified lead | Show, organize and sell many products without manual attention |
| Product volume | One offer (max. 2–3 variants) | From dozens to thousands of SKUs with sizes or colors |
| Navigation | One page, no exit menu | Search, categories, filters, product page, cart |
| Closing | WhatsApp button or direct payment link | Cart, shipping and a gateway with several methods |
| Ideal traffic | Meta, TikTok and Google Ads | SEO, Google Shopping, email and remarketing |
| Maintenance | Low: optimize the offer | Medium-high: stock, shipping, returns and payments |
| Investment with K&T | From COP 450,000 · 7 to 12 days | From COP 1,300,000 · 25 to 40 days |

## The funnel: every extra step costs sales {#funnel}

- **Landing page (3–4 steps):** ad click → focused page → button → rep on WhatsApp or one-click payment.
- **Store (7–9 steps):** search → home or category → filtered listing → product page (size, color) → add to cart → view cart → details, shipping and payment.

Every extra step is a chance to drop off. That's why, for paid campaigns with a single offer, a landing page usually converts much better.

## When to choose a landing page {#landing}

1. **Professional services or consulting:** lawyers, doctors, engineers, real estate agencies. You sell trust and need the contact.
2. **A star product** you'll advertise on TikTok or Instagram.
3. **Validating an idea** before investing in inventory and a full store.
4. **Courses, workshops or events** with a single sign-up.
5. **Assisted sales over WhatsApp**, very common in Colombia and Latin America.

## When to choose an online store {#store}

1. **More than 5–10 physical products** that need categories and search.
2. **Variants** of size, color, weight or dimensions.
3. **Automatic 24/7 sales** with Wompi, Bold, PSE or cards.
4. **Inventory and shipping control** with carriers such as Envía, Coordinadora or Interrapidísimo.
5. **Repeat purchases and cross-selling:** recommendations and coupons.

## The hybrid model {#hybrid}

Keep the **store as the master catalog** and SEO engine, and for each paid campaign send the traffic to a **satellite landing page** with a single offer. After the purchase, invite the customer to explore the rest of the catalog. That way you combine the landing page's conversion with the store's reach.

::widget price-calculator

:::quiz
? You sell a course with a single start date and you'll advertise on Instagram. What suits you?
- Online store
- *Landing page
- Both from the start
= A single offer with paid traffic converts better on a focused page with no distractions.
? You have 120 products with sizes and colors. What do you need?
- *Online store
- Landing page
- A PDF catalog
= With variants and volume you need categories, filters, a cart and inventory.
:::

Also compare [website vs. online store](/blog/pagina-web-vs-tienda-virtual) or check the plans on [pricing](/precios).
`,
  faq: [
    { q: "Can I start with a landing page and move to a store later?", a: "Yes, and it's what we recommend for new businesses: the landing page validates demand. Once you pass 20–30 orders a week and WhatsApp becomes unmanageable, a store makes sense." },
    { q: "Can a landing page take payments?", a: "Yes. It can have a direct payment button (Wompi, Bold or Stripe) for a fixed amount without a traditional cart." },
    { q: "Which ranks better on Google?", a: "The store has more long-term organic potential because it generates many indexable URLs (categories and products). The landing page shines with paid traffic." },
  ],
  sources: [
    { title: "Baymard Institute: Checkout usability", url: "https://baymard.com/research/checkout-usability" },
    { title: "Shopify: Commerce trends", url: "https://www.shopify.com/enterprise/commerce-trends" },
  ],
};

export default post;
