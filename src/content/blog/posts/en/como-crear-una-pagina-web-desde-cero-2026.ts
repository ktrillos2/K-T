import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Building a website without a roadmap leads to delays, unexpected costs and slow sites. There are six steps worth following in order.",
    "1) Goal and sitemap, 2) domain and DNS, 3) design, 4) development, 5) technical SEO and structured data, 6) launch and testing.",
    "A custom corporate site takes 2 to 4 weeks; a landing page, 7 to 12 days.",
  ],
  md: `
Launching a website without a clear plan is a recipe for last-minute changes, cost overruns and a site nobody finds. This roadmap puts the process into six steps so nothing slips through.

## The 6 steps to build a website from scratch {#steps}

### Step 1: goal and content architecture

Before designing, define what your site is for: generating leads on WhatsApp? Selling products with a cart? Showing corporate authority? Then draw the **sitemap**: which pages there will be and how they connect.

### Step 2: domain and DNS

Pick a short, memorable name. In Colombia, \`.com\` and \`.co\` are the most used extensions to rank locally and internationally. We explain it in [what a domain is and how to choose one](/blog/que-es-un-dominio-web-como-elegir).

### Step 3: interface design

Design for mobile first, with good contrast and visible calls to action. A unique design made for your brand sets you apart from template-built sites.

### Step 4: development

The code determines speed, security and how easy it will be to grow. A custom site, without heavy builders, can load its main content in under a second.

### Step 5: technical SEO and structured data

- Unique titles and descriptions for every page.
- H1 to H3 headings in a logical order.
- Structured data (schema.org).
- A sitemap.xml so Google discovers your pages.

Go deeper in [why SEO is planned from the architecture](/blog/seo-desde-la-raiz-crear-pagina).

### Step 6: launch and testing

Publish on global servers with an SSL certificate, test on different devices, measure speed and monitor uptime.

:::checklist id="build-site-from-scratch" title="Checklist to launch your website"
- I'm clear on the site's main goal
- I made the page map
- I registered the domain in my company's name
- The design is approved on mobile and desktop
- Every page has a unique title, description and H1
- I set up structured data and sitemap.xml
- The site has SSL and loads fast on mobile
- I tested forms, WhatsApp buttons and links
:::

## Follow the learning path {#path}

1. [How to build a website in 2026: architecture guide](/blog/como-crear-pagina-web-2026)
2. [How much a website costs in Colombia](/blog/cuanto-cuesta-una-pagina-web-en-colombia)
3. [What hosting is and how it works](/blog/que-es-un-hosting-web-y-como-funciona)
4. [How much website maintenance costs](/blog/cuanto-cuesta-mantenimiento-pagina-web-colombia)
5. [Professional corporate website: standards](/blog/como-crear-pagina-web-profesional)
6. [How to build a free website: limitations](/blog/como-crear-una-pagina-web-gratis-limitaciones)
7. [Custom development vs. templates](/blog/desarrollo-web-medida-vs-plantillas)

## Would you rather we do it for you? {#k-t}

At K&T Code we design and develop your website from scratch, ready for Google and for winning customers, from COP 450,000. See [website prices](/precios/precio-pagina-web-colombia) or our [custom web development](/servicios/desarrollo-web-a-medida) service.
`,
  faq: [
    { q: "How long does it take to build a professional website from scratch?", a: "A custom corporate site takes 2 to 4 weeks, including design, development, speed optimization and technical SEO. A landing page takes 7 to 12 days." },
    { q: "What do I need to start building a website?", a: "Define the site's goal, register your own domain, choose where it will be hosted and organize the content into a page map." },
  ],
};

export default post;
