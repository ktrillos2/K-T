import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Integrating WhatsApp with CRM, inventory and invoicing requires two-way webhooks, a central database and a layer that orchestrates the steps.",
    "The flow: the customer confirms on WhatsApp, the system validates and deducts stock, charges with a payment link, issues the electronic invoice with the DIAN and delivers the PDF in the same chat.",
    "To invoice through an API in Colombia you need a RUT registered as an electronic invoicer, a digital signature certificate, a numbering resolution and a technology provider.",
  ],
  md: `
When sales come in through WhatsApp and everything else is done by hand (checking stock, typing into the accounting system, sending the invoice), every order eats time and opens the door to errors. The solution is to **connect everything** so the order moves forward on its own.

## The integration architecture {#architecture}

1. **The customer buys on WhatsApp:** confirms product, quantity and billing details. WhatsApp notifies your server through a webhook.
2. **The central server validates:** checks stock in the warehouse, **reserves it atomically** (nobody else can sell that same unit) and generates a secure **payment link** with Wompi, Bold or PSE.
3. **The invoicing technology provider** generates the signed electronic document and obtains the DIAN's validation and its unique code (CUFE) with the QR.
4. **Closing on WhatsApp:** the customer receives the invoice PDF, inventory is updated and logistics gets the dispatch order.

## Requirements to issue electronic invoices through an API {#dian-requirements}

1. **An up-to-date RUT** (Colombian tax registry) with the electronic invoicer responsibility active.
2. **A digital signature certificate** issued by an authorized certification body.
3. **A DIAN numbering resolution** with range, prefix, validity and technical key.
4. **An authorized technology provider** (or the DIAN's free service) that your software connects to through an API.

## Manual process vs. integrated process {#benefits}

Table: What changes when you integrate.
| Manual process | Integrated process |
|---|---|
| The rep types the customer's details into the accounting system or Excel | Automatic capture and validation of ID or NIT |
| Typing errors and outdated stock | Database validation that prevents overselling |
| The invoice arrives 24 to 48 hours later | The invoice PDF arrives instantly on WhatsApp |
| Per-user fees in the CRM and the invoicing tool | No per-user cost with your own software |

:::checklist id="whatsapp-integration" title="Before integrating"
- I use the official WhatsApp Business API (not a QR-code bot)
- My inventory lives in a system with an API or in a database
- I have a valid electronic invoicing resolution
- I chose an invoicing technology provider
- I have an account with a payment gateway (Wompi, Bold, PayU)
- I decided who takes over when the customer asks to talk to a person
:::

Also read how to [automate WhatsApp Business with AI](/blog/automatizar-whatsapp-business-con-ia) or see our [custom software](/servicios/software-a-medida) service.
`,
  faq: [
    { q: "Can WhatsApp be connected to DIAN electronic invoicing?", a: "Yes. The software receives the order through the WhatsApp API, issues the invoice through an authorized technology provider and sends the PDF to the customer in the same chat." },
    { q: "Do I need to change my accounting system?", a: "Not necessarily. If your system has an API, the custom software connects to it; if not, the integration goes through an electronic invoicing provider." },
  ],
  sources: [{ title: "DIAN: Electronic invoicing", url: "https://www.dian.gov.co/impuestos/factura-electronica/Paginas/default.aspx" }],
};

export default post;
