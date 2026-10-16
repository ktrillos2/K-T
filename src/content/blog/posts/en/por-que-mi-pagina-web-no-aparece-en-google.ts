import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "If you paid for a website and it doesn't show up on Google, there is almost always an avoidable technical error behind it.",
    "The most common causes: a forgotten noindex tag, robots.txt blocking the site, not submitting the sitemap to Search Console, and a site that is too slow.",
    "To check whether you're indexed, search site:yourdomain.com on Google. A new site usually takes 4 days to 3 weeks to get indexed if everything is set up correctly.",
  ],
  md: `
Paying for a website and not finding it on Google is one of the most common frustrations for business owners in Colombia. The good news: most of the time it's a technical error that can be fixed. Use this guide as a diagnosis, from the most to the least frequent cause.

## First: is your site indexed? {#diagnosis}

Type \`site:yourdomain.com\` into Google. If pages show up, they're indexed and the problem is ranking. If nothing shows up, Google couldn't or wouldn't store your site. Then check the indexing report in [Google Search Console](/blog/como-aparecer-en-google-guia-paso-a-paso).

## The 12 most common causes {#causes}

### 1. A forgotten noindex tag

During development the site is often marked \`noindex\` so Google doesn't index the test version. If nobody removes it at launch, Google obeys and indexes nothing.

### 2. robots.txt blocking everything

A \`Disallow: /\` line in robots.txt forbids Google from crawling any page.

### 3. You never submitted the site to Search Console

Without verifying the domain or submitting sitemap.xml, Google can take a long time to discover your pages.

### 4. The site is too slow

Heavy templates that take more than 4 seconds to respond eat up the time Google spends crawling your site. It may leave before reading everything. See [the hidden cost of a slow website](/blog/costo-oculto-pagina-web-lenta).

### 5. Duplicate content or cannibalization

Several pages competing for the same search, or text copied from other sites, leave Google unsure which one to show, or push them down.

### 6. Messy headings

Several H1s or no H2 at all cause confusion about the page's main topic.

### 7. A badly configured canonical tag

If all your pages declare the home page as the "main version", Google ignores the rest.

### 8. Content that only appears with JavaScript

If the text is drawn in the browser after heavy scripts load, the crawler may see an almost empty page. Ideally, serve the complete HTML from the server.

### 9. Orphan pages

Pages no internal link points to and that aren't in the sitemap: Google will struggle to find them.

### 10. Server errors and redirect chains

Frequent 404 and 500 errors, or redirects that hop several times before reaching the final page, make Google distrust the site.

### 11. Thin or unhelpful content

Pages with two lines of text or generic descriptions don't answer any search. Google prioritizes content that solves a real need.

### 12. Manual actions or a compromised site

If your site was hacked or broke Google's policies, it may receive a manual action. Search Console warns you in the security section.

:::checklist id="indexing-diagnosis" title="Quick indexing diagnosis"
- I searched site:mydomain.com and checked what shows up
- No page has a noindex tag by mistake
- robots.txt doesn't block the site
- I verified the domain and submitted the sitemap in Search Console
- My site loads in under 3 seconds on mobile
- Each page has a single H1 and a clear topic
- Canonical tags point to the page itself
- The content is in the HTML without depending on scripts
- All important pages have internal links
- There are no manual actions or security issues
:::

## Need help? {#audit}

We run a technical audit of your domain, find the indexing errors and, if needed, rebuild the site on a fast, well-structured foundation. See our [technical SEO](/servicios/seo-tecnico) service.

## Keep learning {#more}

- [What SEO is and how it works](/blog/que-es-el-seo-y-como-funciona-guia)
- [How to show up on Google, step by step](/blog/como-aparecer-en-google-guia-paso-a-paso)
- [Why SEO is planned from the architecture](/blog/seo-desde-la-raiz-crear-pagina)
`,
  faq: [
    { q: "How long does a new website take to show up on Google?", a: "Usually between 4 days and 3 weeks for the main pages, if the sitemap was submitted in Search Console and nothing like noindex is blocking it." },
    { q: "How do I know if my website is indexed?", a: "Search site:yourdomain.com on Google. If pages show up, they're indexed; if nothing does, there's a crawling or indexing problem." },
  ],
  sources: [
    { title: "Google Search Central: block indexing with noindex", url: "https://developers.google.com/search/docs/crawling-indexing/block-indexing" },
    { title: "Google Search Console", url: "https://search.google.com/search-console/about" },
  ],
};

export default post;
