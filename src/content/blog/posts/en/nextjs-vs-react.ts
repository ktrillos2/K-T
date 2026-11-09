import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "React is a library for building interfaces; Next.js is a framework built on React that adds a server, routing, image optimization and server-side rendering.",
    "They aren't rivals: Next.js uses React under the hood.",
    "Plain React (SPA) suits private dashboards behind a login; Next.js suits public sites, stores and anything that needs to rank on Google and in AI engines.",
  ],
  md: `
"React or Next.js?" is a common question, but it starts from a misunderstanding: they don't compete. React is the foundation and Next.js is the production framework built on top of it.

## Comparison table {#comparison}

Table: Plain React vs. Next.js.
| Feature | Plain React (SPA) | Next.js |
|---|---|---|
| Type of tool | Interface library | Full framework |
| Rendering | In the browser (CSR) | On the server, static or incremental |
| SEO and AI engines | Hard: the initial HTML arrives nearly empty | Native: the HTML arrives complete |
| Routing | Needs external libraries | Built in, folder-based |
| Images | Manual optimization | Automatic optimization |
| Server logic | Needs a separate server | Built in |
| Ideal for | Private dashboards, CRMs, internal tools | Websites, e-commerce, public platforms |

## When to use plain React {#react}

- **Private dashboards and CRMs** behind a login, where the content doesn't need to show up on Google.
- **Highly interactive tools:** graphic editors, canvases, real-time boards.
- **Simple static deployments** at minimal cost.

## When to use Next.js {#nextjs}

- **Corporate sites and lead generation**, where SEO and speed affect conversion.
- **Online stores** with large catalogs.
- **Sensitive server-side logic** without exposing keys to the browser.

:::quiz
? Does Next.js replace React?
- Yes, they're rival technologies
- *No, Next.js is built on React
- Only in mobile apps
= Next.js uses React for components and adds a server, routing and rendering.
? Why can a plain React SPA have SEO problems?
- Because React is slow
- *Because the initial HTML arrives nearly empty and the content appears after JavaScript runs
- Because it doesn't allow titles
= Crawlers have to run the JavaScript to see the content, which delays or hinders indexing.
:::

Go deeper in [Next.js vs. WordPress](/blog/nextjs-vs-wordpress) or see our [Next.js development](/servicios/desarrollo-nextjs) service.
`,
  faq: [
    { q: "Does Next.js replace React?", a: "No. Next.js is built on React: React defines the components and interactivity; Next.js adds a server, routing, optimization and server-side rendering." },
    { q: "Why does a plain React SPA have SEO problems?", a: "Because it serves nearly empty HTML and the content appears after JavaScript runs in the browser, which delays or hurts indexing." },
    { q: "When is plain React enough?", a: "For private admin dashboards, internal boards and apps behind a login, where the content doesn't need to appear in search engines." },
  ],
  sources: [
    { title: "React", url: "https://react.dev/" },
    { title: "Next.js", url: "https://nextjs.org/docs" },
  ],
};

export default post;
