import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "A corporate website builds trust and captures leads; an online store sells products 24 hours a day with online payments.",
    "Choose a website if you sell services or your prices depend on scope; choose a store if you sell products with fixed prices and stock.",
    "With K&T Code: landing page from COP 450,000, corporate site from COP 2,500,000 and online store from COP 1,300,000.",
    "If the site is well built, you can start with a website and add the store later without rebuilding it.",
  ],
  md: `
Choosing between a website and an online store depends on your business model, your budget and how your customers buy. This comparison helps you decide.

## Quick comparison {#comparison}

Table: Corporate website vs. online store.
| Feature | Corporate website | Online store |
|---|---|---|
| Goal | Credibility, leads and appointments | Sell online 24/7 |
| Payments | Not needed (form and WhatsApp) | Essential (Wompi, Bold, PayU, PSE) |
| Inventory | Not applicable | Stock, sizes, variants and shipping |
| K&T price from | COP 450,000 (landing) / COP 2,500,000 (corporate) | COP 1,300,000 |
| Delivery | 7 to 25 days | 25 to 40 days |
| Ideal for | Services, consulting, healthcare, real estate | Retail, fashion, physical products, B2B |

## When to choose a corporate website {#website}

- You sell services or consulting and the price depends on scope.
- You're a B2B or industrial company looking for meetings and quote requests.
- You don't need real-time inventory, carriers or per-sale fees.

## When to choose an online store {#store}

- You sell physical products with fixed prices and defined stock.
- You want to charge and ship automatically with PSE, card or Nequi.
- You want to sell nationwide without middlemen.

::widget price-calculator

Also read [landing page vs. online store](/blog/landing-page-vs-tienda-virtual) and [how much a website costs in Colombia](/blog/cuanto-cuesta-una-pagina-web-en-colombia).
`,
  faq: [
    { q: "Can I start with a website and turn it into a store later?", a: "Yes. If the site is built with its own, well-structured code, you can add a cart and gateways such as Wompi or Bold without rebuilding it from scratch." },
    { q: "Which gateways do I need for an online store in Colombia?", a: "The most used are Wompi, Bold, PayU and Mercado Pago, which process PSE, cards, Nequi and Daviplata." },
    { q: "What's the price difference?", a: "With K&T Code, a complete corporate site starts at COP 2,500,000 and an online store at COP 1,300,000; a landing page at COP 450,000." },
  ],
  sources: [
    { title: "Wompi: rates", url: "https://wompi.com/es/co/tarifas" },
    { title: "Colombian Chamber of E-commerce", url: "https://www.ccce.org.co/" },
  ],
};

export default post;
