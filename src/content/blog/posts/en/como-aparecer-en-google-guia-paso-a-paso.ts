import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Showing up on Google is free: you don't pay for indexing or for the top organic positions.",
    "Four steps for a new site: verify the domain in Google Search Console, submit sitemap.xml, write unique titles and descriptions, and create your Google Business Profile.",
    "Search Console is the official, free tool to see which pages are indexed and fix errors.",
  ],
  md: `
You launched your website and want customers to find it. These are the steps for Google to discover it, understand it and show it.

## Step 1: verify your domain in Google Search Console {#search-console}

1. Sign in to Google Search Console with your company account.
2. Add a **domain** property.
3. Copy the TXT record Google gives you and add it to your domain's DNS.
4. Click **verify**. It can take a few minutes.

## Step 2: submit your sitemap.xml {#sitemap}

The sitemap is the map that tells Google which pages exist and when they changed. On a well-built site it is generated automatically at \`yourdomain.com/sitemap.xml\`. In Search Console, go to **Sitemaps**, type the address and submit it.

:::tip Request indexing for your key pages
With Search Console's URL inspection tool you can request indexing for your home page and your main services.
:::

## Step 3: unique titles and descriptions {#titles}

Table: Example titles for local SEO.
| Page | Weak title | Optimized title |
|---|---|---|
| Home | Home | Custom web design in Cúcuta · My Company |
| Service | Services | Online stores with PSE and Nequi payments · My Company |
| Contact | Contact | Get a website quote in Colombia · My Company |

- Include the main service and the city where it applies.
- The description should invite the click: what you offer and why choose you.

## Step 4: create your Google Business Profile {#profile}

If you serve customers in cities such as Bogotá, Medellín, Cali or Cúcuta, a Google Business Profile (formerly Google My Business) puts you on Google Maps and in local searches. Verify it, add photos, opening hours and your website, and ask your customers for reviews.

:::checklist id="show-up-on-google" title="Checklist to show up on Google"
- I verified my domain in Search Console
- I submitted sitemap.xml
- I requested indexing for my main pages
- Every page has a unique title and description
- I created and verified my Google Business Profile
- I asked my customers for reviews
:::

## How do I know if I'm showing up? {#check}

Search \`site:yourdomain.com\`. If nothing shows up after a few weeks, check [why your website doesn't show up on Google](/blog/por-que-mi-pagina-web-no-aparece-en-google).

At K&T Code we deliver every site with Search Console set up, an automatic sitemap and structured data. See our [technical SEO](/servicios/seo-tecnico) service or [website prices](/precios/precio-pagina-web-colombia).
`,
  faq: [
    { q: "Is it free to show up on Google?", a: "Yes. Google doesn't charge to index your site or for the top organic positions; ranking depends on technical quality and content." },
    { q: "What tool do I need to index my website?", a: "Google Search Console, the official free tool to submit your sitemap, see indexing status and fix crawl errors." },
  ],
  sources: [
    { title: "Google Search Console", url: "https://search.google.com/search-console/about" },
    { title: "Google Search Central: build and submit a sitemap", url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap" },
    { title: "Google Business Profile", url: "https://www.google.com/business/" },
  ],
};

export default post;
