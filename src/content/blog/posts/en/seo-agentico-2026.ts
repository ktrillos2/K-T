import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Agentic SEO prepares your site so AI agents and models understand it, cite it and, increasingly, take actions on it.",
    "Its four pillars: an unambiguous entity, answer-first content, nested structured data and a fast site that serves complete HTML.",
    "If a price is buried under 2,000 words, the agent probably won't find it: put summaries, ranges and tables at the start of each section.",
  ],
  md: `
**Agentic SEO** is the next stage of search optimization: it's no longer enough for Google to crawl your page; now AI agents read it too, comparing providers, summarizing offers and, in some cases, buying or booking on the user's behalf.

Optimizing for them means working on three things: the **technical architecture**, the **semantic structure** of the content and your **verifiable reputation**.

## From classic SEO to agentic SEO {#evolution}

Table: The three stages of search optimization.
| Stage | What was optimized | Where you appeared | For whom |
|---|---|---|---|
| Classic SEO | Keywords and links | List of blue links | People |
| Semantic SEO / GEO | Search intent and structured content | AI summaries and citations | People and models |
| Agentic SEO (2026+) | Clear entities, data and actions | Answers, comparisons and transactions | Agents |

## The 4 pillars of agentic SEO {#pillars}

### 1. An unambiguous entity

The agent needs certainty about who you are. Your name, city, founders, phone and services must be stated **the same way everywhere** and declared in organization structured data, linked to your official profiles.

### 2. Answer-first content

Models work within a context limit. If the price appears after an endless introduction, the agent will probably skip it. Put **executive summaries, price ranges and comparison tables at the start** of each section.

### 3. Nested structured data

Organization → offers → services: describing your catalog this way lets an agent query your services almost as if they were a database. Include price, currency and delivery times.

### 4. Technical accessibility and low latency

Agents discard sources that are slow or depend on heavy JavaScript to show their content. Serving complete HTML from the server, in milliseconds and from a global network, is part of ranking.

:::tip A quick test
Ask ChatGPT or Gemini about your own services and prices. If the answer is vague or cites someone else, your entity still isn't clear to the models.
:::

## Checklist {#checklist}

:::checklist id="agentic-seo" title="Is your site ready for agents?"
- Name, address and phone identical on the site, social media and directories
- Organization structured data linked to official profiles
- Services with price, currency and delivery time in text
- Each section answers its question in the first lines
- Real HTML tables (not images of tables)
- The HTML carries the full content without waiting for JavaScript
- Server response under 500 ms
- An llms.txt file with the business summary
:::

This site applies everything above. If you want the same for your company, see our [technical SEO](/servicios/seo-tecnico) service or read the [llms.txt guide](/blog/llms-txt-2026).
`,
  faq: [
    { q: "What is agentic SEO?", a: "It's optimizing a site's architecture, content and data so AI agents can understand it, cite it and take actions on it, not just so a search engine can crawl it." },
    { q: "Does it replace traditional SEO?", a: "No. It extends it: SEO's technical foundations are still needed, with entity clarity, structured data and easy-to-cite content added on top." },
  ],
  sources: [{ title: "Anthropic: Model Context Protocol", url: "https://www.anthropic.com/news/model-context-protocol" }],
};

export default post;
