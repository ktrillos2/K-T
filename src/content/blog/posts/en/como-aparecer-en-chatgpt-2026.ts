import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "ChatGPT Search finds and cites pages with the OAI-SearchBot crawler. If you block it, ChatGPT can't link to your site as a source.",
    "GPTBot is a different crawler, used to train models: allowing or blocking it is a policy decision and doesn't affect citations as long as OAI-SearchBot is allowed.",
    "For AI to cite you: an accessible, fast server, complete HTML, a consistent brand entity, structured data and content that answers first.",
    "Files like llms.txt are an optional extra, not a shortcut: they don't make up for a slow or badly configured site.",
  ],
  md: `
More and more people ask ChatGPT, Perplexity or Gemini whom to hire or what to buy. If your company isn't cited in those answers, you lose customers who never reach Google. This guide explains how to set up your site so ChatGPT Search finds and cites you.

## OAI-SearchBot vs. GPTBot: the key difference {#crawlers}

Confusing the search crawler with the training crawler is the most common mistake. Blocking the wrong one can take you out of ChatGPT Search.

Table: OpenAI crawlers and what they do.
| Agent | What it's for | Trains models? | Impact on your visibility |
|---|---|---|---|
| OAI-SearchBot | ChatGPT search and cited links | No | Essential |
| GPTBot | Data collection for training | Yes | Optional, depending on your policy |
| ChatGPT-User | Visits a URL when a user shares it or asks to read it | No | Recommended |

### Two robots.txt setups

- **Maximum visibility (the one we recommend):** allow OAI-SearchBot, GPTBot and ChatGPT-User across the whole site, and block only private paths such as \`/admin/\` and \`/api/\`. You show up in searches and your brand becomes part of the models' general knowledge.
- **Search only, no training:** allow OAI-SearchBot and ChatGPT-User, and block GPTBot. You stay citable without contributing data to training.

:::tip Check your firewall too
Many sites allow the bots in robots.txt but block them with challenges or 403 errors at the firewall or CDN. For the crawler the result is the same: it can't read your page.
:::

## Structured data you should declare {#schema}

Structured data (schema.org in JSON-LD) tells models, unambiguously, who you are and what you offer.

- **Organization or LocalBusiness:** legal name, logo, founders, address and official profiles (\`sameAs\`).
- **Service and Product:** exact prices, currency (COP, USD), delivery times.
- **FAQPage:** direct questions and answers, easy to extract.
- **BreadcrumbList:** your site's hierarchy.

## Inverted-pyramid content {#content}

Table: Content strategies that work with AI models.
| Strategy | Why it works | Example |
|---|---|---|
| Definition in the first 40 words | The model extracts the answer without hunting for it | "An AI agent is an autonomous system that…" |
| HTML tables | Interpreted better than messy lists | Prices in COP and delivery times |
| Verifiable figures | Models prefer data to adjectives | "Landing pages from COP 450,000" |

## The real hierarchy of GEO factors {#hierarchy}

There are no magic files. What the OpenAI, Perplexity and Google teams describe is standard HTTP crawling of pages that are accessible, fast and indexable. In order of priority:

1. **Crawling and server access:** allow OAI-SearchBot and PerplexityBot, don't block them at the firewall, and serve complete HTML from the server, fast.
2. **Entity authority:** the same name, founders and services everywhere, linked with \`sameAs\` to verified registries and directories.
3. **Semantic structure and schema.org:** Organization, Service, Product, FAQPage and BreadcrumbList.
4. **Direct, verifiable content:** answer first, tables and figures; no promotional filler.
5. **External mentions and reviews:** press, directories and real reviews reinforce trust.
6. **Cross-channel consistency:** the same prices and data on your site, social media and directories.
7. **llms.txt (optional):** a plain-text summary, useful only once everything above is solved. More in [the llms.txt guide](/blog/llms-txt-2026).

:::checklist id="chatgpt-search" title="Checklist to show up in ChatGPT Search"
- OAI-SearchBot is allowed in robots.txt
- The firewall or CDN doesn't block AI crawlers
- Every page serves its complete content in the HTML
- I have structured data for the organization, services and FAQ
- My prices and data are the same on all my channels
- My pages answer the main question in the first lines
- I have reviews and mentions on third-party sites
:::

## Keep learning {#more}

- [What SEO is and how it works](/blog/que-es-el-seo-y-como-funciona-guia)
- [GEO vs. SEO](/blog/geo-vs-seo-diferencias-motores-ia)
- [How to get AI to cite your brand](/blog/seo-para-chatgpt-optimizacion-ia)
- [Google AI Overviews and AI Mode](/blog/google-ai-overviews-ai-mode-seo)
- [How to measure your visibility in ChatGPT and Gemini](/blog/medir-visibilidad-chatgpt-gemini-google-ai-mode)

Want us to set it up for you? See our [technical SEO](/servicios/seo-tecnico) service.
`,
  faq: [
    { q: "Which crawler does ChatGPT Search use?", a: "OAI-SearchBot. It indexes pages and links them as sources without using them to train models. GPTBot is the training crawler." },
    { q: "Do I have to allow GPTBot to appear in ChatGPT Search?", a: "No. You can allow OAI-SearchBot and block GPTBot. Allowing both helps models know your brand better." },
    { q: "What is GEO?", a: "Generative Engine Optimization: the set of technical and content practices that help AI engines recognize and cite your company." },
    { q: "Does structured data help AI cite me?", a: "Yes. Types such as Organization, Service, Product and FAQPage explicitly describe who you are, what you sell and at what price." },
  ],
  sources: [
    { title: "OpenAI: Overview of OpenAI crawlers", url: "https://platform.openai.com/docs/bots" },
    { title: "Google Search Central: AI features and your website", url: "https://developers.google.com/search/docs/appearance/ai-features" },
    { title: "Schema.org", url: "https://schema.org/" },
  ],
};

export default post;
