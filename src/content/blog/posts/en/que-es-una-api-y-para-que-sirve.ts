import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "An API (Application Programming Interface) is how two programs communicate securely.",
    "It works like a waiter: you place an order (request), they take it to the kitchen (server) and bring back your dish (response).",
    "The most common types on the web are REST, GraphQL and webhooks.",
    "On a website it's used to take payments, show maps, send emails and WhatsApp messages, calculate shipping or sign in with Google.",
  ],
  md: `
You use APIs every day without knowing it: when you buy a ticket, pay in an online store or check the weather on your phone. Here's what an API is, what it stands for, what it's for and how it works, without jargon.

## What an API is, in simple words {#que-es}

An API is a **bridge that lets two programs talk to each other**. Picture a restaurant: you don't walk into the kitchen, you ask the waiter. They take your order, the kitchen prepares it and the waiter brings back your dish. The API is that waiter between two programs: it receives a request, takes it to the system that has the information and returns the answer.

## What does API stand for? {#significado}

API stands for ***Application Programming Interface***:

- **Interface:** the point of contact between two systems.
- **Programming:** it's used by programs (not people) through code.
- **Application:** it connects apps, websites and services.

## How an API works, step by step {#como-funciona}

1. **Request:** an app asks for something at a web address called an *endpoint* (for example, "give me the price of product 123").
2. **Authorization:** the API checks that the caller has permission, usually with a key or token.
3. **Processing:** the server finds the information or performs the action (charge, save, send).
4. **Response:** the API returns the result, almost always as JSON, which programs read easily.

A typical response looks like this:

\`{ "product": "T-shirt", "price": 59900, "stock": 12 }\`

## 3 everyday examples {#ejemplos}

- **Payments:** your store doesn't keep card details. It asks the gateway (Wompi, PayU, Stripe) to authorize the charge through a secure API.
- **Maps:** your site shows your location using the Google Maps API, without drawing a map from scratch.
- **Messages:** confirmation emails and WhatsApp messages are sent through APIs from specialized services.

## Types of API: REST, GraphQL and webhooks {#tipos}

Table: The most common types of API on the web.
| Type | How it works | When it's used |
|---|---|---|
| REST (REST API) | Each resource has its own address and is queried with methods like GET or POST | Most services: payments, stores, CRMs |
| GraphQL | A single address; you ask for exactly the data you need | Apps with lots of related data |
| Webhooks | The service notifies you when something happens (the reverse of a query) | Confirming payments, orders or new messages |
| SOAP | An older, strict XML-based format | Banking and government systems |

## Where they're used on a typical website {#usos}

Table: Common APIs on a website.
| Function | Example API |
|---|---|
| Payments | Wompi, Bold, PayU, Stripe |
| Shipping rates | Carriers and logistics aggregators |
| Maps | Google Maps |
| Sign-in | Google, Facebook |
| Emails | Transactional email services |
| Invoicing | Electronic invoicing providers |

## What an API does for your business {#negocio}

- **Less manual work:** website orders flow straight into inventory and invoicing.
- **More sales:** online payments, instant shipping quotes and WhatsApp connected.
- **Grow without rebuilding:** plug in new tools without replacing the whole system.
- **AI with your data:** AI agents query your systems through APIs (and [MCP servers](/blog/que-es-un-servidor-mcp)).

:::quiz
? In the restaurant analogy, what role does the API play?
- The kitchen
- *The waiter who takes the order and brings back the response
- The customer
= The API is the intermediary: it receives the request, takes it to the server and returns the response.
? Why does an online store use a payment gateway's API?
- To store its customers' cards
- *To authorize the charge without handling card details
- To display products
= The gateway processes the payment securely; the store only receives the confirmation.
? Which type of API notifies you when something happens, like an approved payment?
- REST
- *Webhook
- SOAP
= A webhook sends the information to your system as soon as the event happens, without you having to ask.
:::

## How K&T Code helps {#k-t-code}

We connect your website or store to payment gateways, WhatsApp, inventory, CRM and e-invoicing through APIs, and build your own APIs when your business needs them.

Table: Related services and starting prices in your currency.
| You need | Service | From |
|---|---|---|
| Integrate your website with your ERP, CRM or invoicing | [Custom software](/servicios/software-a-medida) | {{cop:4500000}} |
| A store with payments and shipping connected | [Online store](/servicios/tiendas-virtuales) | {{cop:1300000}} |
| A fast site with forms and WhatsApp built in | [Custom web development](/servicios/desarrollo-web-a-medida) | {{cop:2500000}} |

See all [plans and prices](/precios) or the [custom software pricing guide](/precios/precio-software-a-medida).

## Conclusion {#conclusion}

An API is the bridge that makes your systems work together. If you copy data by hand between your website, WhatsApp and invoicing today, an integration can save you hours every week. Read [how to integrate WhatsApp with CRM, inventory and invoicing](/blog/integrar-whatsapp-crm-inventario-facturacion) or [write to us](/#contacto).
`,
  faq: [
    { q: "What is an API in simple words?", a: "It's the intermediary that lets two programs exchange information securely, like a waiter who takes your order to the kitchen and brings back your dish." },
    { q: "What does API stand for?", a: "Application Programming Interface." },
    { q: "What is a REST API?", a: "The most common type of API on the web: each resource has its own address and is queried with methods like GET (read) or POST (create)." },
    { q: "What's the difference between REST and GraphQL?", a: "In REST each resource has its own address; in GraphQL there's a single address and you request exactly the data you need in one query." },
    { q: "Where are APIs used on a website?", a: "In payments (Wompi, PayU, Stripe), shipping rates, maps, sign-in with Google or Facebook, sending emails and syncing with databases." },
  ],
  sources: [
    { title: "MDN Web Docs: Introduction to web APIs", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction" },
    { title: "GraphQL: official documentation", url: "https://graphql.org/learn/" },
  ],
};

export default post;
