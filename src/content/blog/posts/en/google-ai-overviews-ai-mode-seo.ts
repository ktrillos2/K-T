import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Google's AI summaries (AI Overviews) and AI Mode reduce clicks on simple informational searches, but traffic to the sites cited as sources is more qualified.",
    "Comparison, pricing and complex-topic searches are the big opportunity.",
    "Five rules to get cited: answer first, real HTML tables, your own verifiable data, error-free structured data and a fast website.",
  ],
  md: `
Google no longer just shows links: for many searches it answers with an **AI-generated summary** that cites a handful of sources. That changes the rules: being on the first page isn't enough anymore, you have to **be the source the summary cites**.

## What changed on Google {#what-changed}

Before: ten blue links. Now: a summary at the top with 3 to 5 linked sources and, below it, the traditional results. Cited sites get clicks from high-intent users; everyone else competes for the attention that's left.

## Which searches are affected {#searches}

Table: Impact and opportunity by type of search.
| Type of search | Impact on traditional clicks | Opportunity |
|---|---|---|
| Simple definitions ("what is hosting") | Sharp drop in CTR | The shallow dictionary-style article is no longer worth it |
| Comparisons ("Next.js vs. WordPress") | High citation rate | Tables with pros, cons and exact prices |
| Prices and transactions ("website price Colombia") | Highly qualified clicks | Prices in COP, offers and structured data |
| Complex questions (WhatsApp + DIAN invoicing) | Long answers citing 3 to 5 links | Step-by-step guides with diagrams and real examples |

## The 5 rules for Google to cite you {#rules}

1. **Answer first:** the first sentence under each subheading should answer the question on its own.
2. **Real tables:** use HTML tables, not images of tables.
3. **Your own verifiable data:** price ranges in COP or USD, percentages and measured times.
4. **Error-free structured data:** article, FAQ and breadcrumbs, validated in Google's Rich Results Test.
5. **Speed:** a site that responds fast and loads its main content in under 1.2 s gets crawled more often.

:::checklist id="ai-overviews" title="Review a key page on your site"
- The first sentence of each section answers the question
- It has at least one HTML comparison table
- It includes concrete figures with their source
- It passes the Rich Results Test without errors
- It loads in under 2 seconds on mobile
:::

This very site is built on these rules. See our [technical SEO](/servicios/seo-tecnico) service or the [GEO vs. SEO](/blog/geo-vs-seo-diferencias-motores-ia) guide.
`,
  faq: [
    { q: "Do Google's AI Overviews reduce traffic?", a: "On simple informational searches they do reduce clicks, but sites cited as sources get more qualified traffic. Comparison and pricing searches are still a big opportunity." },
    { q: "How do I get Google to cite me in the AI summary?", a: "With direct answers at the start of each section, HTML tables, your own verifiable data, error-free structured data and a fast website." },
  ],
  sources: [{ title: "Google Search Central: AI features and your website", url: "https://developers.google.com/search/docs/appearance/ai-features" }],
};

export default post;
