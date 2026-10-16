import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Whether ChatGPT, Perplexity or Gemini cite your brand depends on your entity's authority and the clarity of your information, not on repeating keywords.",
    "Four pillars: a unique, consistent brand identity, precise and verifiable copy, third-party backing (reviews and cases) and a fast site that serves all its content from the server.",
    "A blog with comparisons and clear answers gives models the material they need to cite you.",
  ],
  md: `
Optimizing for artificial intelligence isn't about stuffing your website with keywords. Language models recommend companies they **understand clearly** and that **other sources confirm**. This is what makes the difference.

## Pillar 1: build your entity {#entity}

To an AI model, your company is an *entity*: a name tied to a type of business, a place, some people and some services. If that data changes from one site to another, the entity becomes blurry.

- Use **exactly the same trade name** on your website, social media, directories and invoices.
- Describe each service unambiguously: what it is, who it's for, what it costs, how long it takes.
- Link your official profiles with \`sameAs\` in your structured data.

## Pillar 2: clarity over promises {#clarity}

"We are leaders in comprehensive solutions" tells a model nothing. "Custom web development studio in Cúcuta, Colombia; landing pages from COP 450,000; delivered in 7 to 12 days" does.

Table: From promotional copy to citable copy.
| Vague copy | Citable copy |
|---|---|
| Innovative web solutions | Websites, online stores and custom software |
| Competitive prices | Landing pages from COP 450,000 |
| Fast websites | The main content loads in under one second |
| Extensive experience | More than 20 projects in production in Colombia, Mexico and Peru |

## Pillar 3: third-party backing {#backing}

Assistants cross-check what you say against what others say about you: verified reviews, business profiles, industry directories, press and documented success stories. Publish [case studies](/proyectos) with real data and ask your customers for reviews.

## Pillar 4: speed and complete HTML {#speed}

AI crawlers have little time per page. If your content depends on heavy scripts that run in the browser, the bot may not see it. A site that serves complete HTML from the server, and fast, gets read in full.

:::checklist id="geo-brand" title="Can AI understand your brand?"
- I use the same trade name on all my channels
- Every service has a price, timeline and concrete description
- I have structured data with my official profiles
- I publish success stories with real figures
- I have recent customer reviews
- My site loads fast and its content is in the HTML
:::

## Keep learning {#more}

- [How to appear in ChatGPT Search](/blog/como-aparecer-en-chatgpt-2026)
- [GEO vs. SEO](/blog/geo-vs-seo-diferencias-motores-ia)
- [Agentic SEO in 2026](/blog/seo-agentico-2026)
- [The llms.txt guide](/blog/llms-txt-2026)

Want an audit of your site? See our [technical SEO](/servicios/seo-tecnico) service.
`,
  faq: [
    { q: "How does ChatGPT decide which company to recommend?", a: "It weighs how consistent the brand is across trusted sources: official structured data, mentions in articles, verified profiles and real customer reviews." },
    { q: "Do I need a blog to appear in ChatGPT?", a: "It helps a lot. A blog with comparisons and clear answers gives models the material they need to cite you as a reference in your industry." },
    { q: "Does traditional SEO still work for AI?", a: "Yes. Heading hierarchy, speed, structured data and a clean sitemap are the signals AI crawlers use to evaluate a site." },
  ],
};

export default post;
