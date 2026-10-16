import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "llms.txt is a proposal to publish, at the root of your domain, a Markdown summary of your company meant for language models.",
    "It isn't a magic fix: what matters most for appearing in AI search engines is letting crawlers in, clean HTML, structured data and a clear entity.",
    "Done right, it lets an agent get your context in a single request of a few kilobytes instead of reading dozens of pages.",
  ],
  md: `
**/llms.txt** is a standard proposed in 2024 so websites can offer language models a structured Markdown summary: who they are, what they sell, official prices and links to what matters.

:::warn Keep llms.txt in perspective
It isn't the main factor for appearing in ChatGPT Search or Google's AI summaries. First come allowing crawlers such as OAI-SearchBot, a server that responds, structured data and a clear entity. llms.txt is a useful extra, not a shortcut.
:::

## What's it for if robots.txt and sitemap.xml already exist? {#why}

Table: Each file has a different job.
| Standard | Purpose |
|---|---|
| robots.txt | What bots may crawl |
| sitemap.xml | Which URLs exist and when they changed |
| Structured data | Semantic relationships inside the HTML |
| llms.txt | Plain-text summary for language models |

An agent that has to download 50 pages full of menus and scripts burns thousands of *tokens*. With llms.txt it gets the essential context in **a single request under 5 KB**.

## Recommended structure {#structure}

1. **Title (H1):** the company name and what it does.
2. **Quote (>):** the value proposition in one or two sentences, with geographic coverage.
3. **Company information:** official name, site, founding year, headquarters and contact.
4. **Main services:** each with its starting price.
5. **Key links:** pricing, services, case studies and blog.

For example, ours starts like this:

> # K&T Code
> A Colombian studio that designs and builds websites, online stores and custom software. From Cúcuta for Colombia, Latin America and the United States.

You can see the complete file at [/llms.txt](/llms.txt) and an extended version with all our cases and articles at [/llms-full.txt](/llms-full.txt).

## How to publish it {#publish}

- Serve it at the root: https://yourdomain.com/llms.txt, as UTF-8 plain text.
- Generate it from your site's own data (prices, services, cases) so it **never contradicts** the website.
- Cache it for a day and regenerate it when your prices change.
- Allow access in robots.txt to the AI crawlers you care about.

:::checklist id="llms-txt" title="Before publishing your llms.txt"
- It responds at the root with a 200 code and plain text
- It includes name, city, contact and founding year
- It lists services with starting price and currency
- It links to pricing, case studies and the blog
- It matches exactly what the website says
- robots.txt doesn't block AI crawlers
:::

Want us to implement it along with the rest of your technical SEO? See our [technical SEO](/servicios/seo-tecnico) service or the [GEO vs. SEO](/blog/geo-vs-seo-diferencias-motores-ia) guide.
`,
  faq: [
    { q: "Is llms.txt required to appear in ChatGPT?", a: "No. It's a voluntary proposal. What decides it is that crawlers can access your site, that the HTML has the content and that your company's information is clear and consistent." },
    { q: "What's the difference between llms.txt and llms-full.txt?", a: "llms.txt is a summary with links; llms-full.txt includes the complete content (cases, articles) in plain text so a model doesn't have to visit every page." },
  ],
  sources: [
    { title: "The llms.txt proposal", url: "https://llmstxt.org/" },
    { title: "K&T Code: llms.txt", url: "https://www.kytcode.lat/llms.txt" },
  ],
};

export default post;
