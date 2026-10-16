import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "A traditional chatbot follows decision trees with fixed buttons and can't look up or execute anything in your systems.",
    "An AI agent understands context, queries data in real time, picks tools and completes multi-step tasks: checking stock, generating a payment link or updating the CRM.",
    "Keep a simple chatbot if you only share opening hours and location; move to an agent if you sell products with variants, quote B2B, book appointments or take payments 24/7.",
  ],
  md: `
"Chatbot" and "AI agent" are used as synonyms, but they aren't. The difference comes down to something very concrete: **the chatbot answers, the agent acts**.

## Architecture comparison {#comparison}

Table: Three generations of assistants.
| Feature | Rule-based chatbot | NLP chatbot | AI agent |
|---|---|---|---|
| Logic | "If this, then that" trees | Classifies intents | Plans according to the goal |
| Actions | None | Fixed webhooks | Calls tools dynamically |
| Context | Lost if the user strays | 1–2 turns | Memory of the conversation and your documents |
| Integration | Manual and rigid | Predefined connectors | Database, APIs, ERP and CRM |
| Experience | Robotic and frustrating | Acceptable for FAQs | Smooth and problem-solving |

## A real example {#example}

A customer writes: *"I need 15 licenses, is there a discount for paying annually? I need an electronic invoice with my tax ID, I'm in Cúcuta."*

### The rule-based chatbot

It shows a fixed menu: "1. See plans · 2. Support · 3. Opening hours". The compound question doesn't fit any button and the customer leaves.

### The AI agent

It looks up the corporate discount policy (more than 10 licenses), checks the electronic invoicing rule, calculates the **20% discount for annual payment** and offers a formal PDF quote in the same chat.

## When to keep a chatbot and when to switch {#when}

:::checklist id="chatbot-or-agent" title="You need an agent if…"
- You sell products with variants or many SKUs
- You prepare custom B2B quotes
- You book medical appointments or technical visits
- You need to take payments 24/7 with payment links
- Your customers ask compound questions
- You lose leads outside business hours
:::

If you checked two or more, an agent will probably give you a better return. If you only need to show opening hours and location, a simple chatbot is enough.

:::quiz
? What can an AI agent do that a rule-based chatbot can't?
- Show a menu of options
- *Check inventory and generate a payment link
- Say "hello"
= The agent calls real tools (inventory, payments, CRM); the rule-based chatbot only follows a tree of answers.
:::

Go deeper in [AI agents for businesses](/blog/agentes-ia-empresas-colombia) or in how to [automate WhatsApp with AI](/blog/automatizar-whatsapp-business-con-ia).
`,
  faq: [
    { q: "What's the difference between a chatbot and an AI agent?", a: "The chatbot follows predefined answers; the agent understands context, queries your systems and takes actions such as quoting, charging or booking." },
    { q: "Does an AI agent replace my sales reps?", a: "No. It handles the repetitive work, filters and prepares the information, and passes qualified cases to a person with a summary." },
  ],
  sources: [{ title: "OpenAI: Function calling", url: "https://platform.openai.com/docs/guides/function-calling" }],
};

export default post;
