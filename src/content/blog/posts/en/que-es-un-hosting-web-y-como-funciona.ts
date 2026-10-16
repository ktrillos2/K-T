import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Hosting is the service that stores your website's files, code and database on servers connected to the internet 24 hours a day.",
    "There are four types: shared, VPS, dedicated and global network (edge), which serves your site from the server closest to each visitor.",
    "Basic traditional hosting costs between USD 4 and 15 a month; a corporate site on a global network can cost between USD 0 and 20 a month.",
  ],
  md: `
If the domain is your business's address, hosting is the shop where the goods are kept. Choosing the right type of hosting determines how fast and stable your site will be.

## Types of hosting {#types}

Table: Comparing the types of web hosting.
| Type | How it works | Ideal for | Risk |
|---|---|---|---|
| Shared | Hundreds of sites share one server | Small sites with little traffic | Slow and unstable during spikes |
| VPS | Reserved resources on a virtual server | Mid-sized applications | Requires technical administration |
| Dedicated | A whole physical server for you | High enterprise demand | Expensive |
| Global network (edge) | Copies of the site in data centers worldwide | Fast sites with variable traffic | Requires a site built for it |

## Why we use global networks {#edge}

Traditional hosting depends on a single server: if a lot of traffic arrives, it gets overloaded. On a global network, your site is replicated across many data centers and each visitor receives it from the nearest one, in milliseconds. It also scales automatically during spikes, for example during a campaign.

## What it costs {#prices}

- **Basic shared hosting:** USD 4 to 15 a month.
- **Corporate site on a global network:** USD 0 to 20 a month, depending on traffic.
- **VPS or dedicated:** from tens to hundreds of dollars a month.

:::tip Cheap can turn out expensive
Slow hosting hurts speed, and speed affects your sales and your position on Google. See [the hidden cost of a slow website](/blog/costo-oculto-pagina-web-lenta).
:::

Continue with [what a domain is and how to choose one](/blog/que-es-un-dominio-web-como-elegir) or [how much website maintenance costs](/blog/cuanto-cuesta-mantenimiento-pagina-web-colombia).
`,
  faq: [
    { q: "What is global network (edge) hosting?", a: "Instead of a single server, your site is replicated across many data centers around the world and delivered from the one closest to the visitor, which makes it faster and more stable." },
    { q: "How much does website hosting cost?", a: "Basic traditional hosting costs between USD 4 and 15 a month. A corporate site on a global network can cost between USD 0 and 20 a month." },
  ],
};

export default post;
