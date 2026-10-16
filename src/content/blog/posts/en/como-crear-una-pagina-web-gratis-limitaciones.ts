import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Free platforms are fine for practice or a personal project, but they have four serious limits for a business.",
    "A subdomain with the platform's name, ads you don't control, almost no SEO control and no rights over the code.",
    "If your website has to sell or build trust, you're better off with your own site, with the domain, speed and SEO under your control.",
  ],
  md: `
Many platforms promise a free website in minutes. It's real, but free comes with conditions that can cost you customers. Before choosing, know what you gain and what you lose.

## The most common free options {#options}

- **Visual builders** with a free plan (drag and drop).
- **Free blogs** on publishing platforms.
- **Business profiles** on search engines and social networks.

Free profiles, like Google's, are recommended for any business: they complement your website, they don't replace it.

## The 4 big limitations {#limitations}

1. **An unprofessional subdomain:** your address ends up as \`yourcompany.platform.com\`. It looks unserious and builds no authority for your own brand.
2. **Mandatory advertising:** the platform shows its brand or third-party ads on your site.
3. **Almost no SEO:** you don't control structured data, sitemaps or speed, which are key for Google and AI assistants.
4. **The code isn't yours:** if the platform changes its terms or shuts down, you can lose your site with no way to migrate it.

Table: Free website vs. your own website.
| Criteria | Free website | Your own custom website |
|---|---|---|
| Address | The platform's subdomain | Your domain (.com, .co) |
| Advertising | Decided by the platform | None |
| SEO | Very limited | Full control |
| Speed | Depends on the plan | Optimized to load in under 1 s |
| Ownership | The platform's | Yours |

## When is a free website useful? {#when}

- School projects, practice portfolios or experiments.
- Validating an idea for a few weeks before investing.

For a formal business, the initial savings usually end up costing you in trust and lost sales. If you want to know what the alternative costs, see [how much a website costs in Colombia](/blog/cuanto-cuesta-una-pagina-web-en-colombia).

:::checklist id="free-or-own-site" title="Do you need your own website?"
- I want customers to find me on Google
- I need an email address and domain with my company's name
- I want to receive orders or quote requests through the site
- I don't want other people's ads on my site
- I want the site to be mine if I change providers
:::

See our [plans and pricing](/precios): landing pages from COP 450,000, with the code in your company's name.
`,
  faq: [
    { q: "Is a free website a good idea for my business?", a: "It's useful for practice or validating an idea, but for a formal business it creates distrust because of the platform's subdomain and third-party ads." },
    { q: "Can a free website rank on Google?", a: "It's very hard: free plans don't let you set up advanced sitemaps or structured data or optimize speed, and they don't have their own domain with authority." },
  ],
};

export default post;
