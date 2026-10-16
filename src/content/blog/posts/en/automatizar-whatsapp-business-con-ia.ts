import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "To automate WhatsApp Business with AI professionally you use Meta's official API (WhatsApp Cloud API), not bots that scan a QR code.",
    "The architecture joins four pieces: Meta's API, your own server that validates every message, an AI engine with tools, and your systems (inventory, CRM, payments).",
    "The agent can check stock, generate payment links with Wompi or Bold, and hand the chat to a human agent when the customer asks for it.",
    "Custom development with K&T Code starts at COP 4,500,000; the monthly running cost depends on message volume and AI model usage.",
  ],
  md: `
WhatsApp is where most sales conversations start in Colombia. Automating it with artificial intelligence lets you answer many customers at once, at any hour, and close sales in seconds. Doing it wrong, though, can cost you your phone line. This is the right way.

## Unofficial bots vs. Meta's official API {#official-vs-unofficial}

Tools that connect by scanning a QR code imitate WhatsApp Web. They are cheap at first, but they put your number and your data at risk.

Table: The informal method vs. the official API.
| Criteria | QR-code bot | WhatsApp Cloud API (official) |
|---|---|---|
| Risk of being blocked | High: the line can be suspended | None if you follow the policies |
| Availability | Goes down if the phone turns off or loses signal | 24/7 on Meta's servers |
| Volume | Limited, becomes a bottleneck | High concurrency (dozens of messages per second) |
| Security | No traceability or backup | Signed, verifiable messages |
| Compliance | Hard to audit | Compatible with Colombia's Law 1581 on personal data |

:::warn Don't risk your main number
If a tool asks you to scan a QR code to "automate" your WhatsApp, it is not the official API. A ban can make you lose your history and the line your customers know you by.
:::

## Architecture, step by step {#architecture}

1. **The customer writes** on WhatsApp.
2. **Meta sends the message** to your server through a signed webhook.
3. **Your server validates the signature**, retrieves the conversation history and looks up your company's catalog and policies (RAG).
4. **The AI model decides** what to answer and, if needed, uses a tool: check stock, quote, create an order.
5. **The answer goes back** to the customer through Meta's API, usually within a couple of seconds.

### Step 1: setup in Meta for Developers

1. Create a Meta for Developers account and link a verified Business Manager (in Colombia you need a NIT tax ID and a Chamber of Commerce registration).
2. Create a business-type app and enable the WhatsApp product.
3. Register a number dedicated to the API (it can't be active in the phone app).
4. Generate a permanent system-user token with messaging and management permissions.

### Step 2: the endpoint that receives messages

Your server needs a route that does two things:

- **Verification:** when Meta registers it, it answers the challenge only if the token matches the one stored in your environment variables.
- **Reception:** it validates the signature of every message with your app secret; if it doesn't match, it rejects it. If it is valid, it processes the text with the agent in the background and replies to Meta immediately.

## Payments with Wompi, Bold and PSE {#payments}

1. The customer asks for a product or service.
2. The agent generates a payment link with the amount in pesos and the order reference.
3. The gateway returns a secure URL and the agent sends it in the chat.
4. When the gateway confirms the payment, the system sends the electronic invoice and notifies your team.

To see how everything connects with inventory and DIAN invoicing, read [how to integrate WhatsApp with CRM, inventory and invoicing](/blog/integrar-whatsapp-crm-inventario-facturacion).

## Running costs in Colombia (2026) {#costs}

Table: Typical costs of an AI WhatsApp automation.
| Item | Detail | Estimated cost |
|---|---|---|
| Service messages | Replies within 24 hours of the customer's message | Free under Meta's pricing |
| Template messages | Marketing, reminders and notifications | Charged per message at Meta's rate for Colombia |
| AI model | Processing each conversation | Approx. USD 20 to 150 per month depending on volume |
| Server | Hosting for the webhook and the logic | From USD 0 to 20 per month |
| Custom development | Setup, business logic and integrations | From COP 4,500,000 (one-time payment) |

## Best practices and compliance {#best-practices}

- **Consent:** include a short data-processing authorization in the first message, as required by Law 1581 of 2012.
- **Answer fast:** use low-latency models to reply within a few seconds.
- **Human handoff:** if the customer asks to talk to a person, the agent stops and assigns the chat to a human agent.
- **Clear limits:** the agent must not offer discounts or terms your policy doesn't allow.

:::checklist id="whatsapp-ai" title="Ready to automate your WhatsApp?"
- I have a number dedicated to the API
- My company has a NIT and a verified Business Manager
- My catalog and prices live in a system that can be queried
- My shipping, returns and warranty policies are defined
- I know which repetitive questions I want to automate first
- I have someone who receives the escalated cases
:::

Want to implement it in your company? See our [custom software](/servicios/software-a-medida) service or write to us through the [contact form](#contacto).
`,
  faq: [
    { q: "Can I use my current WhatsApp number with the API?", a: "Yes, but it has to stop being used in the phone app. Many companies prefer a new number dedicated to the automation." },
    { q: "Can the AI get prices or stock wrong?", a: "If it queries your systems in real time and has rules that limit what it can offer, its answers are based on verified data. Doubtful cases are handed to a human." },
    { q: "How long does implementation take?", a: "An AI automation connected to a catalog and payments usually takes 2 to 4 weeks, depending on the integrations." },
  ],
  sources: [
    { title: "Meta for Developers: WhatsApp Cloud API", url: "https://developers.facebook.com/docs/whatsapp/cloud-api" },
    { title: "Colombia's Superintendence of Industry and Commerce: personal data protection", url: "https://www.sic.gov.co/tema/proteccion-de-datos-personales" },
  ],
};

export default post;
