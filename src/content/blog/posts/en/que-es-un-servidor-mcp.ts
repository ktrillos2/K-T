import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "MCP (Model Context Protocol) is an open standard that lets AI assistants like Claude, ChatGPT or Gemini connect to your systems: databases, CRMs, Power BI, GitHub or your store.",
    "An MCP server is the \"plug\" that exposes those tools and data to the AI in an orderly way, with permissions.",
    "Anthropic created it in late 2024, and today OpenAI, Google, Microsoft and thousands of tools have adopted it.",
    "For a company, its own MCP server means the AI can check inventory, create quotes or read reports without copy-pasting.",
  ],
  md: `
If you've seen terms like "MCP server", "Power BI MCP server" or "GitHub MCP", you're not alone: it's one of the tech searches that grew the most in 2026. Here's a plain-language explanation.

## What is MCP? {#que-es}

**MCP** stands for *Model Context Protocol*. It's an **open standard** that defines how an artificial intelligence connects to external tools and data.

Think of it as **the USB-C of AI**: before, every integration between an assistant and a system was built by hand and differently. With MCP, any compatible assistant can connect to any compatible server.

## What is an MCP server and what is it for? {#servidor}

An **MCP server** is a small program that sits between the AI and your system. It tells the AI:

- **Which tools exist** ("find customer", "create quote", "check stock").
- **Which data it can read** (a report, a catalog, a document).
- **Which permissions it has** (read only, or write too).

So when you ask the assistant "how many units of product X are left in the warehouse?", the AI calls the MCP server's tool, gets the real figure and answers you.

Table: Examples of MCP servers and how a company uses them.
| MCP server | What it allows | Example use |
|---|---|---|
| Power BI | Querying models and metrics | "How much did we sell in Bogotá this month?" |
| GitHub | Reading and managing code | Reviewing changes or creating tasks |
| Google Drive / Docs | Searching and reading documents | Summarizing contracts or proposals |
| Your own database | Looking up inventory or customers | Answering with real prices and availability |
| Your store or ERP | Creating orders or quotes | An agent that quotes over WhatsApp |

## MCP vs. API: what's the difference? {#mcp-vs-api}

An [API](/blog/que-es-una-api-y-para-que-sirve) is a system's door. MCP is the **common language** for the AI to use those doors: the MCP server usually wraps one or more APIs and describes them so the model understands when and how to use them.

## How do you build an MCP server? {#como-crear}

1. **Choose the actions** the AI needs (for example, "find product" and "create quote").
2. **Connect your systems** to those actions through their APIs or the database.
3. **Describe each tool** with a clear name and parameters.
4. **Set permissions**: what it can read, what it can change and who uses it.
5. **Test it** with a compatible assistant (Claude, ChatGPT, Gemini or your own agent).

There are official SDKs in TypeScript and Python, and many free community servers for popular tools.

:::warn Security first
An MCP server gives the AI access to your systems. Only use servers from trusted sources, limit permissions (start with read-only) and log every action. A misconfigured server is an open door.
:::

:::checklist id="mcp-empresa" title="Would your company benefit from an MCP server?"
- Your team copies data from one system to another to answer questions
- You use Claude, ChatGPT or Gemini in daily work
- You have data in your own database, an ERP or Power BI
- You want an AI agent to quote or check inventory
- You need to control what the AI can see and do
:::

If you ticked three or more, a custom MCP server can save your team hours every week. It's part of what we do in [custom software](/servicios/software-a-medida).

## Test what you learned {#quiz}

:::quiz
? What does MCP stand for?
- Private Code Model
- *Model Context Protocol, a standard for connecting AI to tools and data
- A WordPress plugin
= It's an open protocol so AI assistants can use external tools in a standard way.
? What does an MCP server do?
- Hosts your website
- *Exposes your systems' tools and data to the AI, with permissions
- Replaces your database
= It's the intermediary that tells the AI what it can do and with which data.
? What's the best practice when connecting an MCP server?
- Give it full access so it works better
- *Start with read-only permissions and log every action
- Put the credentials in the code
= Fewer permissions means less risk; logging lets you audit what the AI did.
:::

## How K&T Code helps with MCP {#k-t-code}

We build MCP servers and AI agents connected to your systems (inventory, CRM, invoicing, reports), with clear permissions and a log of every action.

Table: Related services and starting prices (COP).
| You need | Service | From |
|---|---|---|
| MCP server, AI agents or ERP integrations | [Custom software](/servicios/software-a-medida) | $4,500,000 |
| A store an AI agent can query | [Online store](/servicios/tiendas-virtuales) | $1,300,000 |
| Support and updates for your systems | [Website maintenance](/servicios/mantenimiento-web) | Based on scope |

See the [custom software pricing guide](/precios/precio-software-a-medida) or all [plans and prices](/precios).

## Conclusion {#conclusion}

MCP is turning AI assistants into coworkers that actually look up and act on your systems. If you want an AI to answer with your real data (inventory, prices, reports), the next step is your own MCP server. Learn more about [AI agents for businesses](/blog/agentes-ia-empresas-colombia) or [write to us](/#contacto).
`,
  faq: [
    { q: "What is an MCP server and what is it for?", a: "It's a program that connects AI assistants to your systems (databases, CRMs, Power BI, GitHub) and tells them which tools and data they can use, with permissions." },
    { q: "Who created the MCP protocol?", a: "Anthropic introduced it as an open standard in late 2024; today it's supported by OpenAI, Google, Microsoft and many more tools." },
    { q: "Are there free MCP servers?", a: "Yes. There are official and community servers for GitHub, Google Drive, databases and more. Only use them from trusted sources." },
    { q: "How do I build an MCP server for my company?", a: "You define the actions the AI needs, connect them to your systems through their APIs, describe the tools and set permissions. There are official SDKs in TypeScript and Python." },
  ],
  sources: [
    { title: "Model Context Protocol: official site", url: "https://modelcontextprotocol.io/" },
    { title: "Anthropic: Introducing the Model Context Protocol", url: "https://www.anthropic.com/news/model-context-protocol" },
  ],
};

export default post;
