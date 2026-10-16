import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "ChatGPT speeds up building a website: it drafts copy, proposes structures, generates structured data and code snippets.",
    "It doesn't replace infrastructure, security, payment integrations or production optimization: those need technical judgment.",
    "Use it with concrete instructions: who your customer is, what you sell, in which city and what action you want them to take.",
  ],
  md: `
Artificial intelligence changed how fast a website is planned and built. Used well, it saves you hours. Used badly, it leaves you with generic copy and fragile code. Here's how to get the most out of it.

## 4 real uses of ChatGPT when building a website {#uses}

1. **Copy that sells:** value propositions for the home page, benefits and calls to action tailored to your ideal customer.
2. **Structured data:** schema.org drafts for products, FAQs and local business.
3. **Interface components:** first drafts of cards, carousels or forms.
4. **Queries and logic:** help with database queries or with structuring an integration.

## Useful prompts {#prompts}

Table: Example instructions for ChatGPT.
| Goal | Example prompt |
|---|---|
| Home page | "Write 3 versions of the home page headline and subheadline for a dental clinic in Cúcuta targeting patients aged 25 to 45. Friendly tone, 12 words max per headline." |
| FAQ | "List the 8 questions a customer asks most before buying custom-made curtains, with answers of 40 words max." |
| Structured data | "Generate the LocalBusiness JSON-LD for this company: [name, address, hours, phone]." |
| Google description | "Write 5 descriptions under 155 characters for [company]'s services page, including [city] and an invitation to request a quote." |

:::tip Give it context
The more specific you are (customer, city, tone, length, goal), the more useful the result. Always check the data: AI can make up figures.
:::

## What ChatGPT can't do on its own {#limits}

- Set up the infrastructure, the domain and database security.
- Integrate payments and invoicing reliably.
- Guarantee speed and technical SEO in production.
- Understand your business better than you do.

Also see [the best AI tools for building websites](/blog/mejores-herramientas-ia-crear-paginas-web-2026). At K&T Code we combine AI with engineering and custom design: see our [custom web development](/servicios/desarrollo-web-a-medida).
`,
  faq: [
    { q: "Can ChatGPT build a complete website on its own?", a: "It can generate code snippets and copy, but it can't set up the infrastructure, manage security or optimize production performance without a technical team supervising." },
    { q: "Which tasks is ChatGPT most useful for on a website?", a: "Drafting content, structuring structured data, proposing page structures and speeding up repetitive components." },
  ],
};

export default post;
