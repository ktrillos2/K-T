import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Rankings depend on a technical foundation that's decided while building the website: how it renders, heading hierarchy, speed and structured data.",
    "Leaving technical SEO for after launch usually forces you to rebuild parts of the site.",
    "Structured data (Organization, Service, FAQPage) helps search engines and AI assistants understand your business.",
  ],
  md: `
Many companies launch their website and then hire "the SEO". The problem is that much of SEO isn't added: it's built. These are the decisions made in the architecture.

## Why technical SEO belongs in the development phase {#development}

Table: What's decided while building, and what it costs to fix later.
| Decision | If planned from the start | If fixed later |
|---|---|---|
| Rendering (server or browser) | Complete content in the HTML | May require rebuilding the site |
| Heading hierarchy | Ordered in every template | Review page by page |
| URLs and structure | Clean and logical | Redirects and lost rankings |
| Structured data | Generated automatically | Added by hand |
| Speed | Designed to load in under 1 s | Partial optimizations |

## Core components {#components}

- **Static generation and hybrid rendering:** prerendered content reduces latency and makes crawling more predictable.
- **Structured data in JSON-LD:** Organization, Service and FAQPage describe your business unambiguously for search engines and AI assistants.
- **Metadata and internal links:** unique titles, clear descriptions and links that connect related topics.
- **Accessibility:** good practices that also help crawlers understand the page.

:::quiz
? When should a website's technical SEO be planned?
- After launch, once traffic arrives
- *From the architecture design
- Only if you'll pay for ads
= Decisions such as rendering, URLs and hierarchy are made while building; fixing them later costs more.
:::

At K&T Code technical SEO isn't a hidden cost: it comes built into every project. See our [technical SEO](/servicios/seo-tecnico) service and read [what SEO is and how it works](/blog/que-es-el-seo-y-como-funciona-guia).
`,
  faq: [
    { q: "Can SEO be added after launching the website?", a: "Part of it can (content, links), but the technical side, such as rendering, URL structure and speed, is decided while building, and fixing it later usually means rebuilding parts of the site." },
    { q: "Does structured data help with AI?", a: "Yes. It explicitly describes who you are and what you offer, which helps search engines and AI assistants understand and cite your business." },
  ],
};

export default post;
