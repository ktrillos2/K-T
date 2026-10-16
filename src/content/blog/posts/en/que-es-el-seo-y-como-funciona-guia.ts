import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "SEO (Search Engine Optimization) is the set of techniques that gets your website into Google's top results when someone searches for what you offer, without paying per click.",
    "It has three pillars: technical SEO (Google can read your site), on-page SEO (content that answers the search) and off-page SEO (authority and mentions).",
    "Solid results usually show up after 3 to 6 months of continuous work, depending on the competition.",
  ],
  md: `
SEO is how you get customers steadily without paying for every visit. In this guide we explain what it is, how Google works and what it takes to rank your business.

## How Google works in three steps {#how-it-works}

1. **Crawling:** Google's bots move through the web following links and sitemaps.
2. **Indexing:** Google stores and understands the content of each page.
3. **Ranking:** when someone searches, it orders pages by relevance, quality, user experience and authority.

## The 3 pillars of SEO {#pillars}

### 1. Technical SEO: the foundation

It makes sure Google can crawl and interpret your site without obstacles.

- Fast loading, ideally under one second.
- Content served from the server, without depending on heavy scripts.
- Mobile-friendly design.
- Structured data (schema.org) and sitemap.xml.

### 2. On-page SEO: content and keywords

- Answer the search intent: what the searcher wants to know or do.
- Use one H1 per page and well-ordered H2 and H3 headings.
- Write unique titles and descriptions.
- Link your pages to each other logically.

### 3. Off-page SEO: authority and trust

- Mentions of your brand on other sites.
- Links from media and industry directories.
- Reviews on your Google Business Profile.

## SEO vs. SEM (Google Ads) {#seo-vs-sem}

Table: Differences between organic ranking and paid advertising.
| Criteria | SEO (organic) | SEM (Google Ads) |
|---|---|---|
| Cost per click | None | You pay for every click |
| Speed | 3 to 6 months | Immediate |
| When you stop investing | Traffic holds for a while | Traffic stops |
| User trust | High | Medium: marked as an ad |

The ideal is usually to combine them: ads for immediate results and SEO to build a stable channel.

:::quiz
? Which of these is a technical SEO factor?
- Having lots of social media followers
- *The page loads fast and has structured data
- Running ads on Google
= Technical SEO is about Google being able to read and understand your site: speed, structure and structured data.
? How long does SEO usually take to deliver solid results?
- One week
- *Between 3 and 6 months
- Two years at least
= It depends on the competition and the domain's authority, but 3 to 6 months of continuous work is typical.
:::

## Keep learning {#more}

- [How to show up on Google, step by step](/blog/como-aparecer-en-google-guia-paso-a-paso)
- [Why your website doesn't show up on Google](/blog/por-que-mi-pagina-web-no-aparece-en-google)
- [GEO vs. SEO: how to appear in AI engines](/blog/geo-vs-seo-diferencias-motores-ia)
- [Why SEO is planned from the architecture](/blog/seo-desde-la-raiz-crear-pagina)

We build sites with SEO from the first line of code. See our [technical SEO](/servicios/seo-tecnico) service.
`,
  faq: [
    { q: "What's the difference between SEO and SEM?", a: "With SEM (Google Ads) you pay for every click and traffic stops when you turn off the campaign. With SEO you build an asset that brings free, steady visits month after month." },
    { q: "How long does it take to see SEO results?", a: "Usually 3 to 6 months of continuous work, depending on the competition in your industry and the domain's starting authority." },
  ],
  sources: [{ title: "Google Search Central: SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" }],
};

export default post;
