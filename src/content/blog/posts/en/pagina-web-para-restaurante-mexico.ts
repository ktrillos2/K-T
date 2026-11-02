import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "A restaurant website in Mexico needs four things: a visible, up-to-date menu, a WhatsApp or direct-order button, hours and a map, and a well-set-up Google profile.",
    "Most restaurants only need a landing page with a digital menu, from {{cop:450000}}. If you want online orders and payment, an online store starts at {{cop:1300000}}.",
    "Your menu shouldn't be just a PDF or a photo: HTML text gets indexed by Google and loads fast on phones.",
    "With your own ordering channel you depend less on delivery apps and keep your customer data.",
  ],
  md: `
If you search for a **restaurant website in Mexico**, your customers are probably already googling you on their phones before deciding where to eat. Mexican searches include questions like "how much does a restaurant website cost", "create a website for a restaurant menu" and "website for my restaurant". This guide answers them: what it needs, your options and how much to invest.

## What a restaurant website must have {#que-debe-tener}

- **Menu as real text** with dishes, descriptions and prices (not just an image or PDF).
- **A visible WhatsApp button** to book or order.
- **Hours, address and map** for each location.
- **Your own photos** of dishes and the venue, compressed so the page loads fast.
- **Structured data** (schema.org \`Restaurant\`) so Google understands your menu, hours and location.
- **A link to your Google Business Profile** and social networks.
- **Online ordering or booking**, if your operation allows it.

:::tip A PDF menu costs you customers
A heavy PDF loads slowly on mobile data and Google reads it worse than page text. Publish the menu as text and, if you like, offer the PDF as an extra download.
:::

## Landing page or online store for your restaurant? {#landing-o-tienda}

Table: Which option fits how you sell.
| If your restaurant… | Best fit | From |
|---|---|---|
| Wants to show the menu, location and take orders by WhatsApp | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| Takes pickup or delivery orders with online payment | [Online store](/servicios/tiendas-virtuales) | {{cop:1300000}} |
| Runs several locations, bookings and custom integrations | [Custom web development](/servicios/desarrollo-web-a-medida) | {{cop:2500000}} |

Not sure which one? Read [landing page vs. online store](/blog/landing-page-vs-tienda-virtual).

## Payment methods in Mexico {#pagos}

For online orders, offer what your customers already use: cards, **SPEI** bank transfer and cash payment at convenience stores such as **OXXO**, depending on the gateway you pick. Each gateway sets its own fees and terms, so check the current rate on its official site before deciding. To get a quote in Mexican pesos, choose your country and currency on [pricing](/precios).

## How to show up when people search "restaurant near me" {#google}

1. Create and verify your **Google Business Profile** with hours, photos and the right category.
2. Naturally use dish names and your area on the page (for example, "tacos al pastor in Colonia Roma") without overdoing it.
3. Keep the same name, address and phone on your profile, site and social networks.
4. Ask real customers for reviews and answer all of them.
5. Keep the menu and hours up to date.

The general walkthrough is in [how to show up on Google](/blog/como-aparecer-en-google-guia-paso-a-paso).

:::checklist id="web-restaurante" title="Review your restaurant's website"
- The menu is text, with current prices
- A WhatsApp button is visible on mobile
- Hours and address appear on the home page
- The page loads fast on mobile data
- My Google Business Profile is verified
- Photos are my own and compressed
- There's a clear way to book or order
- I can update the menu without a developer
:::

## Common mistakes {#errores}

- Leaving the menu only on Instagram or as a photo.
- Forgetting to update prices or sold-out dishes.
- No mobile-first design: most restaurant searches happen on phones.
- Relying only on delivery apps, with no own channel or customer base.

## Test what you learned {#quiz}

:::quiz
? How should you publish your restaurant menu?
- Only as a social media photo
- *As page text with prices, plus the PDF as an extra
- Only as a heavy PDF
= HTML text loads fast and Google reads it better than an image or PDF.
? What's enough if you only want a menu and WhatsApp orders?
- Custom software
- *A landing page with a WhatsApp button
- A store with complex inventory
= A landing page covers menu, location and contact for a smaller investment.
? What helps most for "restaurant near me" searches?
- Changing your logo monthly
- *A verified Google Business Profile and consistent details
- Removing hours from the site
= Your Google profile and consistent name, address and phone are key for local searches.
:::

## How K&T Code helps with your restaurant website {#k-t-code}

We work remotely with businesses in Mexico and across the region: we design your site, make it fast and get it ready to show up on Google.

Table: Related services and starting prices in your currency.
| You need | Service | From |
|---|---|---|
| Digital menu, map and WhatsApp button | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| Pickup or delivery orders with online payment | [Online store](/servicios/tiendas-virtuales) | {{cop:1300000}} |
| Local search visibility and structured data | [Technical SEO](/servicios/seo-tecnico) | Depends on scope |
| Attract diners with ads | [Ads management](/servicios/administracion-de-ads) | {{cop:450000,usd:200}} / month |

See everything on [pricing](/precios), visit our [Mexico page](/desarrollo-web-mexico) or compare with [how much a website costs in Latin America](/blog/cuanto-cuesta-una-pagina-web-latinoamerica).

## Conclusion {#conclusion}

The best restaurant website in Mexico is simple, fast and clear: menu as text, direct contact, location and a well-kept Google profile. Start with a landing page and grow into online ordering when your operation needs it. If you want us to build it, [get in touch](/#contacto).
`,
  faq: [
    { q: "How much does a restaurant website cost in Mexico?", a: "It depends on scope. At K&T Code a landing page with a digital menu and WhatsApp starts at $450,000 COP and an online store with orders and online payment at $1,300,000 COP; the pricing page shows them converted to Mexican pesos or another currency." },
    { q: "What should a restaurant website include?", a: "A text menu with prices, a WhatsApp button, hours, address with map, your own photos, a link to Google Business Profile and, if relevant, bookings or online orders." },
    { q: "Is a PDF menu or a page menu better?", a: "On the page, as text. It loads faster on phones and Google understands it better. The PDF can be an extra download." },
    { q: "Do I need an online store to take orders?", a: "Not always. If orders come through WhatsApp, a landing page is enough. If you want a cart and online payment, an online store fits better." },
  ],
  sources: [
    { title: "Google Business Profile Help", url: "https://support.google.com/business" },
    { title: "Google Search Central: local business structured data", url: "https://developers.google.com/search/docs/appearance/structured-data/local-business" },
    { title: "Schema.org: Restaurant", url: "https://schema.org/Restaurant" },
    { title: "WhatsApp Business app features", url: "https://business.whatsapp.com/products/business-app" },
  ],
};

export default post;
