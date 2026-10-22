import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Vibe coding means building software by describing what you want in plain language and letting an AI write the code, without reviewing it line by line.",
    "Andrej Karpathy popularized the term in 2025; tools like Lovable, Google AI Studio, Bolt and v0 made it mainstream.",
    "It's ideal for prototypes, mockups and small internal tools.",
    "A company website (which has to sell, rank on Google and handle customer data) needs professional review: security, speed, SEO and maintenance.",
  ],
  md: `
**Vibe coding** is programming "by feel": you describe to an artificial intelligence what you want ("a page for my bakery with a menu and a WhatsApp button") and it generates the code. You look at the result, ask for changes in plain language and repeat. You don't read the code: you go by how it looks and feels.

Andrej Karpathy (OpenAI co-founder) used the term in early 2025 and it took off. Today people search for "what is vibe coding", "Lovable" or "Google AI Studio".

## How does vibe coding work? {#como-funciona}

1. **Describe** the idea in a sentence or a paragraph.
2. **The AI generates** the full app: design, copy and code.
3. **Test** the result in the browser.
4. **Ask for tweaks** ("make the button green", "add a form").
5. **Publish** with one click on the tool's hosting.

## The most popular tools {#herramientas}

Table: Popular vibe coding tools in 2026.
| Tool | Good for | Watch out for |
|---|---|---|
| Lovable | Full web apps with a database | The code stays tied to its ecosystem if you don't export it |
| Google AI Studio | Quick prototypes with Gemini | Designed for experimenting, not production |
| Bolt | Web projects in the browser | Large projects become unstable |
| v0 (Vercel) | React interfaces and components | Generates pieces, not the whole business |
| Cursor / Claude Code | Developers speeding up their work | You need to know how to review code |

## Is vibe coding bad? {#es-malo}

It isn't bad: it's a tool. Problems appear when it's used for something it isn't made for. These are the most common risks in sites built 100% "on vibes":

- **Security:** exposed API keys, forms without validation or open databases.
- **Speed:** heavy code that loads slowly on phones and hurts your sales (see [the hidden cost of a slow website](/blog/costo-oculto-pagina-web-lenta)).
- **SEO:** pages Google doesn't understand well, without structured data or a heading hierarchy.
- **Maintenance:** when something breaks, nobody understands the code and every fix breaks something else.
- **Lock-in:** if the platform raises prices or shuts down, your business is stuck.

:::warn Vibe coding vs. agentic coding
They're not the same. In **agentic coding**, a developer uses AI agents to write code faster but reviews, tests and decides the architecture. That's how we work at K&T Code: the AI speeds things up and a person is accountable for the quality.
:::

## Will it work for your company website? {#empresa}

:::checklist id="vibe-coding-empresa" title="Is your project a good fit for vibe coding?"
- It's a prototype to show an idea to partners or investors
- It's an internal tool used by a few people
- It doesn't handle payments or customers' personal data
- I don't need that page to show up on Google
- If it goes down for a day, I don't lose sales
- I can rebuild it from scratch if it grows
:::

If you ticked almost everything, go ahead with vibe coding. If your page has to sell, rank and grow, your best bet is [custom web development](/servicios/desarrollo-web-a-medida), where AI is used, but with professional review.

## Test what you learned {#quiz}

:::quiz
? What is vibe coding?
- A new programming language
- *Building software by describing what you want to an AI, without reviewing the code
- A WordPress template
= The AI writes the code and the person goes by the visible result.
? What's the biggest risk of a store built only with vibe coding?
- Ugly colors
- *Security flaws and exposed payments or customer data
- Loading too fast
= Without review, it's easy to leave keys or data exposed without noticing.
? How is agentic coding different?
- It doesn't use AI
- *A developer directs the AI, reviews and tests the code
- It's only for video games
= The AI speeds things up, but an expert decides and is accountable for quality.
:::

## How K&T Code helps {#k-t-code}

We use AI to work faster, but every project goes through design, code review, speed testing and technical SEO. If you already have a prototype built with vibe coding, we can also review it and take it to production.

Table: Related services and starting prices (COP).
| You need | Service | From |
|---|---|---|
| A page for campaigns or launches | [Landing page](/servicios/landing-pages) | $450,000 |
| Your company's full website | [Corporate website](/servicios/diseno-web-corporativo) | $2,500,000 |
| A fast custom website ready for Google | [Custom web development](/servicios/desarrollo-web-a-medida) | $2,500,000 |
| Better rankings for an existing site | [Technical SEO](/servicios/seo-tecnico) | Based on scope |

Compare plans on [pricing](/precios) or see [how much a website costs in Colombia](/precios/precio-pagina-web-colombia).

## Conclusion {#conclusion}

Vibe coding democratized software creation and is perfect for validating ideas fast. For what holds up your business (your website, your store, your system), the winning combination is AI + professional judgment. To compare options, see [the best AI tools for building websites](/blog/mejores-herramientas-ia-crear-paginas-web-2026) or [tell us about your project](/#contacto).
`,
  faq: [
    { q: "What does vibe coding mean?", a: "It's programming by describing what you want to an artificial intelligence and letting it write the code, going by the result rather than the code." },
    { q: "Who coined the term vibe coding?", a: "Andrej Karpathy, co-founder of OpenAI, popularized it in early 2025." },
    { q: "Is vibe coding bad?", a: "No, but it carries security, speed, SEO and maintenance risks when used for sites that sell or handle customer data without professional review." },
    { q: "Can I build my company website with Lovable?", a: "It works for a prototype. For a website that has to sell and rank on Google, a professional team should review its security, speed and SEO or build it custom." },
  ],
  sources: [
    { title: "Andrej Karpathy: original post on vibe coding (X, 2025)", url: "https://x.com/karpathy/status/1886192184808149383" },
    { title: "Google AI Studio", url: "https://aistudio.google.com/" },
  ],
};

export default post;
