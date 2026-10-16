import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "An API (application programming interface) is the way two programs communicate securely.",
    "It works like a waiter: you place the order (request), they take it to the kitchen (server) and bring you the dish (response).",
    "On a website it's used to charge through gateways, show maps, send emails and WhatsApp messages, calculate shipping or sign in with Google.",
  ],
  md: `
You use APIs every day without knowing it: when you buy a ticket, pay in an online store or check the weather on your phone. Here we explain it without jargon.

## What an API is, in simple words {#what-it-is}

API stands for *Application Programming Interface*. Picture a restaurant: you don't walk into the kitchen, you ask the waiter. They take your order, the kitchen prepares it and the waiter brings you the dish. The API is that waiter between two programs.

## 3 everyday examples {#examples}

- **Payments:** your store doesn't store card details. It asks the gateway (Wompi, PayU) to authorize the charge through a secure API.
- **Maps:** your website shows your office's location using the Google Maps API, without drawing a map from scratch.
- **Messages:** confirmation emails and WhatsApp messages are sent through APIs from specialized services.

## Where they're used on a typical website {#uses}

Table: Common APIs on a website.
| Function | Example API |
|---|---|
| Charging | Wompi, Bold, PayU |
| Calculating shipping | Carriers and logistics aggregators |
| Showing maps | Google Maps |
| Signing in | Google, Facebook |
| Sending emails | Transactional email services |
| Invoicing | DIAN electronic invoicing providers |

:::quiz
? In the restaurant analogy, what role does the API play?
- The kitchen
- *The waiter who takes the order and brings back the response
- The customer
= The API is the intermediary: it receives the request, takes it to the server and returns the response.
? Why does an online store use a payment gateway's API?
- To store its customers' cards
- *To authorize the charge without handling the card details
- To display the products
= The gateway processes the payment securely; the store only receives the confirmation.
:::

We connect your website to any system or ERP. See our [custom software](/servicios/software-a-medida) service or read [how to integrate WhatsApp with CRM, inventory and invoicing](/blog/integrar-whatsapp-crm-inventario-facturacion).
`,
  faq: [
    { q: "What is an API in simple words?", a: "It's the intermediary that lets two programs exchange information securely, like a waiter who takes your order to the kitchen and brings you the dish." },
    { q: "Where are APIs used on a website?", a: "In payments (Wompi, PayU), shipping calculation, maps, sign-in with Google or Facebook, sending emails and syncing with databases." },
  ],
};

export default post;
