import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "The cost of a website in Peru depends on the type of site (landing page, online store, corporate or custom), the design, the integrations and the maintenance, not just on \"design\".",
    "K&T Code works remotely with Peru: a landing page starts at {{cop:450000}} and an online store at {{cop:1300000}}.",
    "On top of development you pay for the domain, hosting, maintenance, payment methods (Yape, Plin, cards) and electronic receipts or invoices.",
    "Always ask for a written quote that says what is included, who owns the code and what it costs to maintain.",
  ],
  md: `
If you searched for the **cost of a website in Peru**, you have probably seen very different ranges with no explanation. The reason is simple: "a website" can be a one-week landing page or a store with payments and electronic invoices. Here is what moves the price, what to ask for in the quote and where to see our starting prices.

## What drives the price of a website {#que-define}

Table: Factors that change the quote.
| Factor | How it affects the price |
|---|---|
| Type of site | A landing page is simpler than a store or a custom system |
| Design | An adapted template or a custom design with your brand identity |
| Integrations | Payments, WhatsApp, CRM, electronic invoicing, inventory |
| Content | Copy, photos and translations: who produces them |
| Technical SEO | Speed, structured data, site structure for Google |
| Maintenance | Updates, backups and support after launch |

## Site types and starting prices {#tipos}

Table: K&T Code starting prices.
| Type | Who it is for | From |
|---|---|---|
| [Landing page](/servicios/landing-pages) | One service or campaign that collects leads | {{cop:450000}} |
| [Online store](/servicios/tiendas-virtuales) | Selling products with a cart and online payment | {{cop:1300000}} |
| [Corporate site](/servicios/diseno-web-corporativo) | Companies with several sections and brand authority | {{cop:2500000}} |
| [Custom software](/servicios/software-a-medida) | Your own processes, dashboards and integrations | {{cop:4500000}} |

These are starting prices: the final quote depends on scope. We don't publish market averages from other providers because we have no official source to back them.

## Costs on top of development {#costos-extra}

- **Domain:** renewed every year. You can use \`.pe\`, \`.com.pe\` or \`.com\`; confirm the current price with the provider you pick.
- **Hosting:** depends on size and traffic.
- **Payments:** many Peruvian customers pay with **Yape** or **Plin**, others with a card through gateways such as **Niubiz** or **Culqi**. Each has its own terms and fees: check the current rates with the provider.
- **Electronic receipts and invoices:** if you sell, you must issue them under SUNAT rules; it is best to integrate this with your system.
- **Maintenance:** updates, backups and support.

:::warn Beware of an "all inclusive" price with no detail
If the quote doesn't say who owns the code, what happens with the domain and what hosting costs after year one, ask before signing. Cheap can get expensive if you can't move your site later.
:::

:::checklist id="quote-peru" title="What your website quote in Peru should say"
- Type of site and number of pages or sections
- What design is included and how many revisions
- Who writes the copy and sources the photos
- Included integrations (payments, WhatsApp, electronic invoices)
- Domain and hosting: who buys them and who owns them
- Ownership of the code and the content
- Delivery time and payment schedule
- Cost and scope of monthly maintenance
:::

## Template, freelancer, agency or custom? {#opciones}

Templates and builders lower the upfront cost but limit design and performance. A freelancer can fit a well-defined project. An agency or studio brings a team and a process. A custom build lets you integrate your operation. Compare them in [agency vs. freelancer](/blog/agencia-vs-freelance-desarrollo-web) and see how [nearshore development](/blog/nearshore-desarrollo-web-latinoamerica) works.

## Test what you learned {#quiz}

:::quiz
? What changes the price of a website first?
- The color of the logo
- *The type of site and its integrations
- The day of the week
= A landing page, a store and a custom system have very different scopes and costs.
? What should a quote clarify besides development?
- Nothing else
- *Domain, hosting, code ownership and maintenance
- Only the color
= Those costs and rights affect what you pay after launch.
? If you want to sell online in Peru, what do you need besides the store?
- Just a logo
- *Payment methods (Yape, Plin, card) and electronic receipts under SUNAT rules
- Nothing, it charges itself
= Payment and invoicing are part of the project.
:::

## How K&T Code helps in Peru {#k-t-code}

We work remotely with clients in Peru and across the region. We quote with a written scope and no surprises.

Table: Related services and starting prices in your currency.
| You need | Service | From |
|---|---|---|
| Collect leads for a service | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| Sell with a cart and online payment | [Online store](/servicios/tiendas-virtuales) | {{cop:1300000}} |
| A company site with several sections | [Corporate web design](/servicios/diseno-web-corporativo) | {{cop:2500000}} |
| Speed, SEO and ongoing support | [Website maintenance](/servicios/mantenimiento-web) | Depends on scope |

See [pricing](/precios) (starting prices in your currency) and our guide to [the cost of a website in Latin America](/blog/cuanto-cuesta-una-pagina-web-latinoamerica).

## Conclusion {#conclusion}

The cost of a website in Peru isn't decided by "how much a website costs" but by what you need it to do. Define the type of site, ask for a detailed quote and add domain, hosting, payments and maintenance. If you want a clear number for your project, [write to us](/#contacto).
`,
  faq: [
    { q: "How much does a website cost in Peru?", a: "It depends on the type of site and the integrations. At K&T Code a landing page starts at $450,000 COP and an online store at $1,300,000 COP; the pricing page shows them in your currency." },
    { q: "What costs come on top of development?", a: "Domain, hosting, payment methods, electronic receipts or invoices and monthly maintenance." },
    { q: "Can you work with me if I'm in Peru?", a: "Yes. K&T Code works remotely with clients across Latin America and the United States." },
    { q: "Which payment methods can I use in my online store in Peru?", a: "Yape, Plin and card gateways such as Niubiz or Culqi are commonly integrated. Each has its own terms, which you should confirm with the provider." },
  ],
  sources: [
    { title: "SUNAT: electronic payment receipts", url: "https://www.sunat.gob.pe" },
    { title: "Yape", url: "https://www.yape.com.pe" },
    { title: "Niubiz", url: "https://www.niubiz.com.pe" },
    { title: "Culqi", url: "https://www.culqi.com" },
  ],
};

export default post;
