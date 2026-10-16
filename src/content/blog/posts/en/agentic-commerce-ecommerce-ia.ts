import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "In agentic commerce, AI assistants search, compare and prepare purchases on the customer's behalf.",
    "For your store to be chosen it needs: a fast site that serves clean HTML, complete product data (price, currency, stock), an llms.txt summary and payments through secure links.",
    "The customer still authorizes the final payment: the agent prepares the purchase and hands over the link.",
  ],
  md: `
**Agentic commerce** is the shift that happens when an AI assistant does the heavy lifting of shopping: it searches, compares prices and availability, and prepares the order. Assistants like ChatGPT, Gemini or those built into phones are already starting to do it.

The question for your store is simple: **can an agent understand your catalog and choose you?**

## From human shopper to agent {#shift}

Table: Two ways of buying.
| | Traditional e-commerce | Agentic commerce |
|---|---|---|
| Who browses | The person, page by page | The agent queries data |
| What convinces | Banners, photos and design | Clear data, reliable price and stock |
| How the decision is made | Comparing tabs | The agent compares in seconds |
| How payment happens | Cart and checkout | A payment link the customer authorizes |

Picture the request: *"Find me a 4K monitor with shipping to Cúcuta for under COP 1,800,000 and with an electronic invoice."* Only stores with clean data make it into that comparison.

## The 4 pillars of being "agentic ready" {#pillars}

### 1. A fast site with clean HTML

Stores built on heavy templates are hard for a bot to read. A store that serves content from the server, with responses under 150 ms, is the foundation.

### 2. Complete product data

Every product should declare, in structured data:

- **Exact name and reference (SKU).**
- **Price in local currency** (COP).
- Verified **availability** (in stock, sold out).
- **Price validity**, to avoid disputes over expired offers.

### 3. Your catalog summarized in llms.txt

A summary with main categories, key specs and shipping policies helps the agent understand your offer without crawling hundreds of pages. Read the [llms.txt guide](/blog/llms-txt-2026).

### 4. Payments through secure links

The agent generates a payment link (Wompi, Bold or PSE) and the customer authorizes it with biometrics or their bank. Your store only needs to be able to **create payment links through an API** and confirm the payment with a webhook.

:::checklist id="agentic-ready" title="Is your store ready for agents?"
- Every product has price, currency and stock in structured data
- Pages load in under one second
- The HTML carries the content without depending on JavaScript
- Shipping and returns policies are in clear text
- You can generate payment links through an API
- You have an llms.txt with a catalog summary
:::

We build custom stores with all of this included. See our [online stores](/servicios/tiendas-virtuales) service or compare [Shopify vs. WooCommerce](/blog/shopify-vs-woocommerce-colombia).
`,
  faq: [
    { q: "What is agentic commerce?", a: "It's commerce in which AI assistants search, compare and prepare purchases on behalf of the customer, who only authorizes the final payment." },
    { q: "Do I need to rebuild my store to sell to agents?", a: "Not always. Often it's enough to complete the product data, improve speed and expose payment links through an API. If the template is very heavy, a custom store is the better option." },
  ],
  sources: [{ title: "Gartner: Machine customers", url: "https://www.gartner.com/en/articles/machine-customers-will-impact-every-industry" }],
};

export default post;
