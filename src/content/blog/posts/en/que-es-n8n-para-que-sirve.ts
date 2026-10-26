import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "n8n is a tool for automating tasks by connecting apps (WhatsApp, Gmail, Google Sheets, CRMs, databases) with visual, block-based workflows.",
    "It's free if you install it on your own server (Community edition); n8n's cloud version is paid and priced by number of executions.",
    "Since 2025 it includes AI nodes: you can build agents that read messages, look up data and reply on their own.",
    "It's great for prototypes and internal processes. When a workflow becomes critical for selling or getting paid, it's worth moving it to custom software.",
  ],
  md: `
**n8n** (pronounced "n-eight-n") is a platform for automating processes by joining apps that normally don't talk to each other. Instead of copying data by hand from WhatsApp to Excel or from a form to your CRM, you draw a workflow with blocks and n8n runs it for you, every day.

It became a trend in 2025 and 2026 because it lets you build **AI agents** without writing much code. These are the most common questions: what it is, what it's for and whether it's free or paid.

## What is n8n used for? {#para-que-sirve}

Every workflow has a **trigger** (something that happens) and a series of **actions** (what you do with it). Real examples in small businesses:

- **Sales:** a WhatsApp message arrives → the contact is created in the CRM → the sales rep gets an email.
- **Invoicing:** a payment is approved in Wompi → the invoice is generated → it's sent to the customer.
- **Inventory:** every morning the stock in a spreadsheet is checked → if something drops below the minimum, an alert goes out.
- **AI support:** an agent reads the customer's question, looks up prices in your database and replies.
- **Marketing:** every Meta Ads lead is saved to Google Sheets and gets a welcome message.

## Is n8n free or paid? {#es-gratis}

It depends on how you use it:

Table: Ways to use n8n and what they cost.
| Option | Tool cost | What you pay separately | Who it's for |
|---|---|---|---|
| Community (self-hosted) | Free | Server (VPS) and someone to maintain it | Teams with a technical person |
| n8n Cloud | Monthly plan by executions | No server | Anyone who wants to start fast |
| Hosting with n8n preinstalled | Charged by the VPS provider | Maintenance and backups | Businesses that want control without installing |
| Custom development | One-time project | Hosting | Critical processes that can't fail |

:::info The license
n8n uses a "fair-code" license: you can use it for free to automate your own company, but not resell it as a service. Always check current prices on the official site, because cloud plans change often.
:::

## n8n and AI agents {#agentes}

The big news is **AI nodes**. You connect a model (OpenAI, Anthropic, Gemini) and give it "tools": read a spreadsheet, call an API, send a message. The agent decides which one to use based on what the customer asks.

It's the fastest way to go from a [rule-based chatbot to an AI agent](/blog/chatbot-vs-agente-ia). For a prototype, you can have something working in an afternoon.

## n8n vs. Zapier vs. Make vs. custom software {#comparativa}

Table: Quick comparison of automation tools.
| Criterion | n8n | Zapier | Make | Custom |
|---|---|---|---|---|
| Self-hostable | Yes | No | No | Yes |
| Cost as you grow | Low (if self-hosted) | High | Medium | Fixed, no per-execution fees |
| AI agents | Yes | Yes | Yes | Yes, without limits |
| Learning curve | Medium | Low | Medium | Handled by the provider |
| Data control | Full if self-hosted | Provider's | Provider's | Full |

## When does n8n fall short? {#limites}

n8n is excellent to start with, but it has limits as the process grows:

- **Huge workflows** with dozens of branches become hard to maintain and debug.
- **Silent errors:** if an API changes, the workflow fails and nobody notices until a customer complains.
- **An interface for your team:** n8n isn't a nice dashboard for your reps to work in; it's the engine behind the scenes.
- **Security and personal data:** self-hosting it properly (backups, updates, access) requires someone to look after it.

:::checklist id="n8n-o-medida" title="Is n8n or custom development right for you?"
- I want to test an automation idea this week
- I have a technical person who can maintain a server
- My workflows have fewer than 15 steps
- If the workflow fails for a day, I don't lose sales
- I need my own dashboard for my team to work in
- The process handles payments, invoices or sensitive data
:::

If you ticked mostly the first three, start with n8n. If you ticked the last two, the safest option is [custom software](/servicios/software-a-medida) that uses n8n only as support, or replaces it.

## Test what you learned {#quiz}

:::quiz
? Is n8n free?
- No, you always pay
- *Yes, the Community edition is free if you host it; the cloud is paid
- It's only free for students
= The self-hosted edition has no license fee for internal use; you pay for the server and maintenance.
? What does an n8n workflow need to start?
- A full-time developer
- *A trigger, like a new message or an approved payment
- A WordPress website
= Every workflow starts with a trigger and then chains actions.
? When should you move from n8n to custom software?
- Never
- When the workflow has 3 steps
- *When the process is critical (payments, invoices) or your team needs its own dashboard
= Critical processes need monitoring, testing and an interface designed for your operation.
:::

## How K&T Code helps you automate {#k-t-code}

We design automations and AI agents around your operation: with n8n when it's enough, or with custom software when the process is critical.

Table: Related services and starting prices in your currency.
| You need | Service | From |
|---|---|---|
| Process automation, AI agents, integrations | [Custom software](/servicios/software-a-medida) | {{cop:4500000}} |
| A website that captures leads and sends them to your CRM | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| Selling online with automatic payments and orders | [Online store](/servicios/tiendas-virtuales) | {{cop:1300000}} |

See every plan on [pricing](/precios) or estimate your project with the [custom software pricing guide](/precios/precio-software-a-medida).

## Conclusion {#conclusion}

n8n is one of the best entry points into automation and AI agents: cheap, flexible and quick to test. The next step, once the workflow sells or collects payments, is giving it a solid foundation. To find out what automating your process would cost, see [how much it costs to automate with AI in Colombia](/blog/cuanto-cuesta-automatizar-procesos-ia-colombia) or [write to us](/#contacto).
`,
  faq: [
    { q: "What is n8n and what is it used for?", a: "It's a platform for automating processes by connecting apps with visual workflows: for example, saving every WhatsApp message to your CRM or building AI agents that reply to customers." },
    { q: "Is n8n free or paid?", a: "The Community edition is free if you install it on your own server for internal use. The cloud version (n8n Cloud) has monthly plans based on the number of executions." },
    { q: "Can n8n be used to build AI agents?", a: "Yes. Its AI nodes connect models like OpenAI, Anthropic or Gemini to tools (spreadsheets, APIs, messaging) so the agent decides what to do." },
    { q: "Which is better, n8n or Zapier?", a: "Zapier is easier to start with; n8n is cheaper as you grow and can be hosted on your own server with full control of your data." },
  ],
  sources: [
    { title: "n8n: official documentation", url: "https://docs.n8n.io/" },
    { title: "n8n: Sustainable Use License", url: "https://docs.n8n.io/sustainable-use-license/" },
  ],
};

export default post;
