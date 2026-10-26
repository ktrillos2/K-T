import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "The price of a website in Mexico, Colombia, Peru, Argentina or Ecuador depends less on the country and more on four things: the type of site, the design (template or custom), the features and who builds it.",
    "There's a one-time payment (design and development) and recurring costs: a domain every year, hosting every month or year and optional maintenance.",
    "At K&T Code a landing page starts at $450,000 COP and an online store at $1,300,000 COP; at kytcode.lat/precios you see those prices in your country's currency.",
    "We work remotely with all of Latin America and the United States: the country doesn't change the quality, only how you pay.",
  ],
  md: `
"How much does a website cost?" is one of the most searched questions on Google, and it almost always comes with a country at the end: in Mexico, in Colombia, in Peru, in Argentina, in Ecuador. The honest answer is that **the country matters less than it seems**. What really moves the price is what kind of website you need and how it's built.

## What you pay once and what you pay every time {#pagos}

Table: Website costs.
| Item | When you pay | What it includes |
|---|---|---|
| Design and development | Once | Structure, design, coding, base copy and initial SEO |
| Domain (.com, .com.mx, .co, .pe…) | Every year | Your website's name |
| Hosting | Every month or year | The server where the site lives |
| Maintenance | Monthly (optional) | Updates, backups, support and changes |
| Extras | As needed | Payment gateway, languages, integrations, campaigns |

If you're wondering "how much does a website cost per month?", it's usually hosting plus maintenance. We explain both in [what hosting is](/blog/que-es-un-hosting-web-y-como-funciona) and [how much maintenance costs](/blog/cuanto-cuesta-mantenimiento-pagina-web-colombia).

## The 4 factors that change the price {#factores}

1. **Type of site:** a one-page landing doesn't cost the same as a store with hundreds of products.
2. **Template or custom:** a template is cheaper upfront, but looks like thousands of sites and usually loads slowly. A custom design costs more and shows in sales and on Google ([we compare them here](/blog/desarrollo-web-medida-vs-plantillas)).
3. **Features:** online payments, bookings, an admin panel, multiple languages, WhatsApp or invoicing integrations.
4. **Who builds it:** a freelancer, a local agency or a remote studio. Each option has its advantages ([agency vs. freelancer](/blog/agencia-vs-freelance-desarrollo-web)).

## Why does it vary so much between countries? {#paises}

- **Currency and inflation:** in high-inflation countries (like Argentina) prices are adjusted often or quoted in dollars.
- **Taxes and invoicing:** each country has its own e-invoicing and withholding rules.
- **Local payment methods:** a store in Mexico needs OXXO or SPEI; in Colombia, PSE and Nequi; in Peru, Yape. Integrating them affects the price.
- **Local competition:** big cities have more supply, from very cheap to highly specialized.

What **doesn't** change with the country: what your business needs to sell online. That's why more and more companies hire their website remotely, with a team from another country in the region.

## How much does it cost to have someone build your website? {#tipos}

Table: Types of website and who they're for.
| Type | Who it's for | Approximate time |
|---|---|---|
| Landing page | Campaigns, launches, getting customers on WhatsApp | 1 to 2 weeks |
| Corporate site | Service companies that need trust and presence | 2 to 4 weeks |
| Online store | Selling products with online payments | 4 to 6 weeks |
| Platform or software | Your own processes: bookings, quotes, dashboards | Based on scope |

:::tip Always ask for this in the quote
That the code and domain are in your name, how fast it loads on a phone, what the SEO includes and what it costs each month after launch.
:::

:::checklist id="cotizar-web-latam" title="Before asking for a quote, be clear on…"
- What you want visitors to do (message you, buy, book)
- How many sections or products it will have
- Whether you need online payments and with which local methods
- Whether you need more than one language
- Who will update the content
- Your budget and the date you need it by
:::

## How K&T Code helps, wherever you are {#k-t-code}

We're a web development studio in Colombia working remotely with companies in Mexico, Peru, Ecuador, Argentina, the rest of Latin America and the United States. We meet over video calls, hand over the code in your name and integrate your country's payment methods.

Table: Services and starting prices (COP; see them in your currency on /precios).
| You need | Service | From |
|---|---|---|
| A page for campaigns and getting customers | [Landing page](/servicios/landing-pages) | $450,000 |
| Selling online with local payments | [Online store](/servicios/tiendas-virtuales) | $1,300,000 |
| Your company's full website | [Corporate website](/servicios/diseno-web-corporativo) | $2,500,000 |
| Your own platform or system | [Custom software](/servicios/software-a-medida) | $4,500,000 |

On [pricing](/precios) you pick your country and see prices in your currency, and the quote builder lets you put your project together. See [our projects](/proyectos) in Mexico, Peru and Colombia too.

## Test what you learned {#quiz}

:::quiz
? What changes a website's price the most?
- The country you live in
- *The type of site, the design and the features you need
- The color of the logo
= The country affects currency and payments, but scope defines the price.
? Which costs recur after launch?
- None
- *Domain, hosting and maintenance if you hire it
- Only the design
= Development is paid once; domain, hosting and maintenance are recurring.
? Can you hire a website from a company in another country?
- No, it has to be local
- *Yes, remotely, with video meetings and international payments
- Only if you speak English
= Remote work is the norm today; what matters is communication and having the code in your name.
:::

## Conclusion {#conclusion}

The right price for a website is the one its customers pay back. Define what you need, compare quotes using the same criteria and insist that everything is in your name. If you're in Colombia, see the details in [how much a website costs in Colombia](/blog/cuanto-cuesta-una-pagina-web-en-colombia). If you're elsewhere, [write to us](/#contacto) and we'll send you a proposal in your currency.
`,
  faq: [
    { q: "How much does a website cost in Latin America?", a: "It depends on the type of site, the design, the features and who builds it. At K&T Code a landing page starts at $450,000 COP and an online store at $1,300,000 COP; at kytcode.lat/precios you see prices in your country's currency." },
    { q: "How much does a website cost per month?", a: "After development you pay for hosting (monthly or yearly), the domain (yearly) and, if you hire it, monthly maintenance." },
    { q: "Can I hire a website from another country?", a: "Yes. Many companies in Mexico, Peru, Ecuador, Argentina and the United States hire their website remotely, with video meetings and international payments." },
    { q: "What should a website quote include?", a: "The scope, timeline, what the SEO includes, load speed, monthly costs and that the code and domain are in your name." },
  ],
  sources: [
    { title: "ICANN: what a domain name is", url: "https://www.icann.org/resources/pages/beginners-guides-2012-03-06-en" },
    { title: "Google: Core Web Vitals", url: "https://web.dev/articles/vitals" },
  ],
};

export default post;
