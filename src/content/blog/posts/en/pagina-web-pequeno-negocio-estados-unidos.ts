import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "A small business website in the US can be built four ways: a DIY builder, a freelancer, a local agency or a custom build from a nearshore studio; cost and control rise in that order.",
    "Compare the total cost, not the sticker price: design, hosting, plugins or apps, maintenance, SEO and who owns the code.",
    "Most small businesses are well served by a fast, custom-designed site with clear calls to action, local SEO and accessibility basics.",
    "K&T Code builds custom sites for US businesses from Colombia, in English and Spanish: landing pages from {{cop:450000}}, corporate sites from {{cop:2500000}}.",
  ],
  md: `
If you searched for **web design for small business** or the **cost of a small business website in the US**, you've seen prices that range from almost free to very expensive. The gap exists because the four options below are really different products. Here's how to compare them, what to ask before you hire and how to avoid paying twice. We don't quote invented market averages: ask for written quotes and compare what each one includes.

## Four ways to get a small business website {#opciones}

Table: Website options for a small business.
| Option | Upfront effort | Ongoing costs | Control | Good fit |
|---|---|---|---|---|
| DIY builder (Wix, Squarespace, etc.) | Your own time | Monthly plan | Limited | Very simple sites |
| Freelancer | Medium | Hosting, updates | Depends on the person | Small, well-defined projects |
| Local agency | High | Retainer or hourly | High | Teams that want in-person meetings |
| Custom build from a nearshore studio | Medium to high | Hosting and maintenance | Total (you own the code) | Growing businesses that value speed and SEO |

Want a side-by-side of builders? Read [Wix vs. WordPress](/blog/wix-vs-wordpress-diferencias-precios) and [Agency vs. freelancer](/blog/agencia-vs-freelance-desarrollo-web).

## What drives the price {#precio}

- **Number of pages and features:** a one-page site is not a booking system or an online store.
- **Design:** from a template or designed for your brand.
- **Content:** who writes the copy and prepares photos.
- **SEO and speed:** technical setup so Google can find and rank you.
- **Maintenance:** security updates, backups and small edits after launch.
- **Ownership:** whether you get the code and accounts in your name.

:::tip Ask this before signing
"Who owns the code, the domain and the hosting account when the project ends?" The right answer is: you do.
:::

## What a small business site needs in the US {#requisitos}

- **Clear offer and call to action** on the first screen (call, book, request a quote).
- **Mobile-first speed:** most visitors arrive on a phone. See [the hidden cost of a slow website](/blog/costo-oculto-pagina-web-lenta).
- **Local SEO:** a complete Google Business Profile and consistent name, address and phone. Follow the [Google Search Central SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).
- **Accessibility:** build to [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) and read the [ADA web accessibility guidance](https://www.ada.gov/resources/web-guidance/) from the US Department of Justice. We don't give legal advice; ask your attorney what applies to you.
- **Spanish version if you serve Hispanic customers:** a real translation, not a widget.

:::checklist id="pequeno-negocio-eeuu" title="Checklist before hiring a web developer"
- I know my main goal (calls, bookings, sales)
- I asked for a written quote listing what is included
- I confirmed I will own the code, domain and hosting
- The site loads fast on a phone
- It includes basic SEO and a Google Business Profile plan
- Accessibility is part of the scope
- There is a maintenance plan after launch
- I saw live projects from the team
:::

## Why a nearshore studio can fit {#nearshore}

A nearshore team in Latin America works in your time zone, speaks English and Spanish and often costs less than a local agency for comparable work. We explain the model in [nearshore web development in Latin America](/blog/nearshore-desarrollo-web-latinoamerica).

## Test what you learned {#quiz}

:::quiz
? What should you compare when choosing how to build your site?
- Only the monthly price
- *Total cost: design, hosting, apps, maintenance, SEO and code ownership
- The agency's logo
= Cheap plans often add costs later; the total cost tells the real story.
? Who should own the code and the domain?
- The developer
- *You, the business owner
= Owning your assets lets you change providers without rebuilding.
? Why does mobile speed matter for a local business?
- It doesn't
- *Most local searches happen on phones and slow pages lose visitors
= Speed affects both user experience and how easily customers contact you.
:::

## How K&T Code helps small businesses {#k-t-code}

K&T Code is a web development studio based in Colombia that works remotely with businesses in the United States and Latin America. Every project is designed from scratch, built with Next.js and delivered in your name.

Table: Services and starting prices in your currency.
| You need | Service | From |
|---|---|---|
| A page to turn visits into calls or bookings | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| A multi-page business website | [Corporate web design](/servicios/diseno-web-corporativo) | {{cop:2500000}} |
| Selling products online | [Online store](/servicios/tiendas-virtuales) | {{cop:1300000}} |
| Ranking on Google | [Technical SEO](/servicios/seo-tecnico) | Depends on scope |

On [pricing](/precios), choose United States to see every plan in US dollars, or read [how much a website costs in Latin America](/blog/cuanto-cuesta-una-pagina-web-latinoamerica).

## Conclusion {#conclusion}

The right small business website is the one that matches your goal, loads fast, can be found on Google and belongs to you. Compare written quotes, ask about ownership and plan for maintenance. When you're ready, [write to us](/#contacto) and we'll quote your project.
`,
  faq: [
    { q: "How much does a small business website cost in the US?", a: "It varies widely by approach: a DIY builder, a freelancer, an agency or a custom build. Compare written quotes that list design, hosting, maintenance, SEO and code ownership. K&T Code landing pages start at $450,000 COP and corporate sites at $2,500,000 COP, shown in US dollars on the pricing page." },
    { q: "Is a website builder enough for a small business?", a: "For a very simple site, yes. If you need speed, custom design, strong SEO or integrations, a custom build gives you more control and avoids rebuilding later." },
    { q: "Can a Latin American studio build my US business website?", a: "Yes. A nearshore studio works in your time zone, in English and Spanish, and can deliver the code in your name. K&T Code does this from Colombia." },
    { q: "Does my small business website need to be accessible?", a: "Accessibility is a best practice and in the US it can have legal implications. Build to WCAG and consult an attorney about what applies to your business." },
  ],
  sources: [
    { title: "Google Search Central: SEO starter guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
    { title: "W3C: Web Content Accessibility Guidelines (WCAG)", url: "https://www.w3.org/WAI/standards-guidelines/wcag/" },
    { title: "U.S. Department of Justice: Guidance on web accessibility and the ADA", url: "https://www.ada.gov/resources/web-guidance/" },
  ],
};

export default post;
