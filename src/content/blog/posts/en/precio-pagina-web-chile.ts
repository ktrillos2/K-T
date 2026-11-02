import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Website cost in Chile depends on the type of site (landing, store, corporate or custom), the design, the integrations and maintenance, not just on \"design\".",
    "K&T Code works remotely with Chile: a landing page starts at {{cop:450000}}, an online store at {{cop:1300000}} and a corporate site at {{cop:2500000}}, shown in Chilean pesos on the pricing page.",
    "Besides development, count the domain, hosting, maintenance and payment method (for example Webpay or Flow).",
    "Always ask for a written quote that says what's included, who owns the code and what upkeep costs.",
  ],
  md: `
Anyone searching for **website cost in Chile** finds wildly different ranges with no explanation. The reason is simple: "a website" can be a one-day landing page or a store with payments and invoicing. Here we explain what drives the price, what to ask for in a quote and how to see our starting prices in Chilean pesos.

## What defines the price of a website {#que-define}

Table: Factors that change the quote.
| Factor | How it matters |
|---|---|
| Site type | A landing page is simpler than a store or custom system |
| Design | Adapted template or custom brand design |
| Integrations | Payments, WhatsApp, CRM, electronic receipts or invoices, inventory |
| Content | Copy, photos and translations: who produces them |
| Technical SEO | Speed, structured data, Google-friendly structure |
| Maintenance | Updates, backups and support after launch |

## Site types and starting prices {#tipos}

Table: K&T Code starting prices in your currency.
| Type | Who it's for | From |
|---|---|---|
| [Landing page](/servicios/landing-pages) | One service or campaign that wants leads | {{cop:450000}} |
| [Online store](/servicios/tiendas-virtuales) | Selling products with cart and online payment | {{cop:1300000}} |
| [Corporate site](/servicios/diseno-web-corporativo) | Companies with several sections and brand authority | {{cop:2500000}} |
| [Custom software](/servicios/software-a-medida) | In-house processes, dashboards and integrations | {{cop:4500000}} |

On [pricing](/precios) you pick Chile and see values in Chilean pesos (CLP). They're starting prices: the final quote depends on scope. We don't publish other providers' market averages because we have no official source to back them.

## Costs on top of development {#costos-extra}

- **Domain:** renewed every year. In Chile, \`.cl\` domains are registered through NIC Chile and its resellers.
- **Hosting:** depends on size and traffic. See [what web hosting is](/blog/que-es-un-hosting-web-y-como-funciona).
- **Payment gateway:** to sell online you use services such as **Webpay Plus** (Transbank) or **Flow**, each with its own fees and terms: check the current rate with each provider.
- **Electronic receipt or invoice:** if you sell, you must issue tax documents under SII rules; it's best to integrate this with your system.
- **Maintenance:** updates, backups and support.

:::warn Beware of "all-inclusive" prices with no detail
If the quote doesn't say who owns the code, what happens to the domain and what hosting costs after year one, ask before signing. Cheap can get expensive if you can't move your site later.
:::

:::checklist id="cotizacion-chile" title="What your website quote should say"
- Site type and number of pages or sections
- What design is included and how many revisions
- Who writes the copy and sources the photos
- Included integrations (payments, WhatsApp, electronic receipts)
- Domain and hosting: who buys them and who owns them
- Ownership of code and content
- Delivery time and payment terms
- Cost and scope of monthly maintenance
:::

## Template, freelancer, agency or custom? {#opciones}

Templates and builders lower the upfront cost but limit design and performance. A freelancer can fit a narrow project. An agency or studio brings a team and process. And custom development lets you integrate your operation. Compare in [agency vs. freelancer](/blog/agencia-vs-freelance-desarrollo-web) and [website vs. online store](/blog/pagina-web-vs-tienda-virtual). For prices by country, see [how much a website costs in Latin America](/blog/cuanto-cuesta-una-pagina-web-latinoamerica).

## Test what you learned {#quiz}

:::quiz
? What changes a website's price first?
- The logo color
- *The site type and its integrations
- The day of the week
= A landing page, a store and a custom system have very different scopes and costs.
? What should a quote clarify besides development?
- Nothing else
- *Domain, hosting, code ownership and maintenance
- Only the color
= Those costs and rights affect what you pay after launch.
? To sell online in Chile, what do you need besides the store?
- Just a logo
- *A payment gateway and electronic receipts or invoices per SII rules
- Nothing, it charges itself
= Payment collection and invoicing are part of the project.
:::

## How K&T Code helps in Chile {#k-t-code}

We work remotely with clients in Chile and across the region. We quote in your currency, with written scope and no surprises.

Table: Related services and starting prices in your currency.
| You need | Service | From |
|---|---|---|
| Capture leads for a service | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| Sell with cart and online payment | [Online store](/servicios/tiendas-virtuales) | {{cop:1300000}} |
| Company site with several sections | [Corporate web design](/servicios/diseno-web-corporativo) | {{cop:2500000}} |
| Speed, SEO and ongoing support | [Web maintenance](/servicios/mantenimiento-web) | Depends on scope |

See [pricing](/precios) and the guide [how much a website costs in Colombia](/precios/precio-pagina-web-colombia) as a reference for how we structure our prices.

## Conclusion {#conclusion}

Website cost in Chile isn't decided by "how much does a page cost" but by what you need it to do. Define the site type, ask for a detailed quote and add domain, hosting, payments and maintenance. If you want a clear price for your project, [get in touch](/#contacto).
`,
  faq: [
    { q: "How much does a website cost in Chile?", a: "It depends on the site type and integrations. At K&T Code a landing page starts at $450,000 COP, an online store at $1,300,000 COP and a corporate site at $2,500,000 COP; the pricing page shows them in Chilean pesos." },
    { q: "What costs come on top of development?", a: "Domain, hosting, payment gateway, electronic receipt or invoice issuing and monthly maintenance." },
    { q: "Can you work with me if I'm in Chile?", a: "Yes. K&T Code works remotely with clients across Latin America and the United States and quotes in your currency." },
    { q: "Which payment methods can my Chilean online store use?", a: "Gateways such as Transbank's Webpay Plus or Flow are commonly integrated, among others. Each has its own terms, which you should confirm with the provider." },
  ],
  sources: [
    { title: "NIC Chile: .cl domains", url: "https://www.nic.cl" },
    { title: "Servicio de Impuestos Internos (SII)", url: "https://www.sii.cl" },
    { title: "Transbank Developers: Webpay Plus", url: "https://www.transbankdevelopers.cl" },
    { title: "Flow: online payments", url: "https://www.flow.cl" },
  ],
};

export default post;
