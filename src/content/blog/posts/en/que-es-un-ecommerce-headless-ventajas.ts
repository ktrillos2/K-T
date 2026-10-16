import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Headless e-commerce separates the store the customer sees (the storefront) from the system that manages products, inventory and orders; they communicate through an API.",
    "Advantages: much faster loading, a 100% custom design, a protected admin dashboard and one catalog for web, app and point of sale.",
    "For whoever manages the store nothing changes: products are still managed in a simple dashboard.",
  ],
  md: `
In a traditional store, the design and the database live together on the same server. That limits speed and forces you into templates. **Headless** (decoupled) commerce separates the two so each one does what it does best.

## How it works {#how-it-works}

- **The storefront:** the site the customer sees, custom-designed and served from a global network so it loads instantly.
- **The engine:** the system where products, inventory and orders are managed.
- **The connection:** the two talk through secure APIs.

Table: Traditional store vs. headless store.
| Criteria | Traditional | Headless |
|---|---|---|
| Design | Limited by the template | Free, custom-made |
| Speed | Depends on the server and plugins | The catalog is served from a global network |
| Security | Dashboard and store exposed together | The dashboard isn't exposed to the public |
| Channels | Web only | Web, mobile app and point of sale with the same catalog |

## The 4 key advantages {#advantages}

1. **Speed:** product pages can load in under a second, which reduces drop-off on mobile.
2. **Design without limits:** any animation or interaction your brand needs.
3. **Security:** the admin dashboard and the database aren't exposed to public traffic.
4. **Omnichannel:** a single catalog feeds the website, the app and the registers in your physical store.

## When does it make sense? {#when}

- Your current store is slow and you lose sales on mobile.
- Your brand needs an experience a template doesn't allow.
- You sell through several channels and need a single inventory.

If you're just starting with a few products, a simple custom store may be enough. See [how much an online store costs](/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026) and our [headless e-commerce](/servicios/woocommerce-headless) service.
`,
  faq: [
    { q: "What's the difference between a headless store and a traditional one?", a: "In a traditional store, the design and the database are coupled on the same server. In a headless one, the storefront is built separately, served from a global network and communicates with the product system through an API." },
    { q: "Is it hard to update products in a headless store?", a: "No. Products, inventory and orders are still managed in a dashboard; the change is invisible to whoever manages the store." },
  ],
};

export default post;
