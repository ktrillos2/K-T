import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Automating processes with AI in Colombia costs between COP 3,500,000 and more than COP 35,000,000 to implement, depending on complexity.",
    "On top of that comes a monthly running cost of about USD 30 to 500: AI model usage, servers and official WhatsApp messaging.",
    "Require in the quote: error handling, usage limits and that the code is yours.",
  ],
  md: `
"How much does it cost to put AI in my company?" depends on how far you want to go: answering FAQs isn't the same as having agents connected to your ERP and electronic invoicing.

## Prices by level of complexity {#levels}

Table: Reference ranges in Colombia (2026).
| Level | Scope | Implementation (COP) | Recurring (USD/month) | Time |
|---|---|---|---|---|
| 1. Targeted automation | FAQs, lead capture, email or Slack alerts | 3,500,000 – 6,500,000 | 30 – 80 | 2 to 3 weeks |
| 2. Sales agent | Official WhatsApp API, catalog, automatic quotes, CRM and payments (Wompi, Bold) | 6,500,000 – 14,000,000 | 80 – 200 | 3 to 5 weeks |
| 3. Custom ecosystem | Several agents, search over your documents, ERP and DIAN connection, admin dashboard | 14,000,000 – 35,000,000+ | 150 – 500+ | 6 to 12 weeks |

## What the cost is made of {#components}

- **Engineering (one-time):** data modeling, system instructions, APIs and interface.
- **AI model usage (variable):** OpenAI, Anthropic, DeepSeek or others, depending on conversation volume.
- **Infrastructure (fixed):** servers, database and vector storage.
- **Official messaging:** Meta's per-conversation WhatsApp rates.

## Hidden costs you should ask about in the quote {#hidden}

1. **Error handling:** what happens if a provider's API goes down? There should be retries and automatic alerts.
2. **Usage limits:** monthly caps to avoid surprise bills from AI or cloud providers.
3. **Intellectual property:** at K&T Code the code, databases and intellectual property are 100% your company's.

## How to calculate the return {#roi}

- **Monthly savings** = (hours saved × cost per hour) + sales captured after hours.
- **Payback period** = initial investment ÷ (monthly savings − running cost).

Example: a distributor in Bogotá with 60 quotes a day that was losing leads at night recovered **COP 8,500,000 in under 3.4 months** with a 24/7 WhatsApp sales agent.

::widget roi-calculator

See the step by step in [how to calculate ROI](/blog/calcular-roi-automatizacion-software-ia) or what an [AI agent for businesses](/blog/agentes-ia-empresas-colombia) is.
`,
  faq: [
    { q: "How much does an AI chatbot for WhatsApp cost in Colombia?", a: "A sales agent connected to the official API, catalog, CRM and payments usually costs between COP 6,500,000 and 14,000,000 to implement, plus USD 80 to 200 a month to run." },
    { q: "Why is there a monthly cost?", a: "Because every conversation uses the AI model, the servers and official WhatsApp messaging. It can be capped with usage limits." },
  ],
  sources: [{ title: "Gartner: Artificial intelligence insights", url: "https://www.gartner.com/en/information-technology/insights/artificial-intelligence" }],
};

export default post;
