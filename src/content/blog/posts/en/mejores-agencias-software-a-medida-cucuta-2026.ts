import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "In Cúcuta, cross-border trade, manufacturing (footwear, leather goods and apparel) and healthcare drive the demand for custom software.",
    "Evaluate a provider on four criteria: modern, fast technology; its own code with no templates; integration capability (DIAN, payments, WhatsApp); and local presence and support.",
    "There are four kinds of provider: custom development studios, accounting software houses, IT consultancies and freelancers.",
    "Reference prices at K&T Code: landing page from COP 450,000, online store from COP 1,300,000, corporate site from COP 2,500,000 and software from COP 4,500,000.",
  ],
  md: `
Cúcuta and its metropolitan area are going through fast digitalization. Many companies have outgrown Excel and packaged programs and are looking for **software built around the way they work**. This guide helps you choose well.

## Why custom software is growing in Norte de Santander {#context}

- **Cross-border trade:** wholesalers who need inventory, quotes in pesos or dollars, and dispatching.
- **Manufacturing:** footwear, leather goods and apparel factories (La Cero, El Callejón, the industrial zone) that need cost per batch, materials and production times.
- **Healthcare:** clinics, dental offices and labs with secure medical records, online scheduling and electronic invoicing.

Packaged software forces you to change your processes, charges per user and rarely includes what your business needs.

## Criteria for evaluating a software company {#criteria}

### A. Modern technology and performance

Ask for fast web applications that work on phones and computers, hosted on reliable cloud infrastructure. Be wary of desktop systems that only work on one computer, or of sites put together with dozens of plugins.

### B. Own code and zero templates

The contract must state that **the source code and the intellectual property are 100% yours**, with no captive licenses.

### C. Integration capability

- Electronic invoicing and payroll with the DIAN (Colombia's tax authority).
- Gateways such as Wompi, Bold, Mercado Pago or Stripe.
- The official WhatsApp Business API.
- Inventory, logistics and the CRM you already use.

### D. Local presence and support

In-person meetings to gather requirements, and a clear support channel after launch.

## Kinds of provider in Cúcuta {#types}

Table: Comparing the options.
| Criteria | Custom studio (like K&T Code) | Packaged accounting software | Freelancer |
|---|---|---|---|
| Fit to the business | Total, to your workflow | Rigid: you adapt to it | Variable |
| Integration with WhatsApp and APIs | Native | Limited or extra cost | Possible, with support risk |
| Code ownership | 100% the client's | Permanent rental | Usually stays with the developer |
| Meetings in Cúcuta | Yes | Sales calls or phone | Occasional |
| Warranty and support | Contract and staged deliveries | Standard tickets | Informal |

**IT consultancies** usually focus on networks, cabling, cameras and licenses, and subcontract web development. **Freelancers** are a good option for small projects, with the risk of having no team behind them.

## Typical projects in the region {#projects}

- **Production and orders for footwear and apparel:** inventory of leather, soles and fabric, plant tasks, real cost per unit and automatic delivery notes.
- **B2B portals for distributors:** per-customer prices, stock per warehouse, purchase orders and PDF invoices.
- **Scheduling and clinic management:** online appointments, WhatsApp reminders and medical records backed up in the cloud.
- **Dashboards with centralized WhatsApp:** every message on one board for several reps, with quote tracking.

## Reference prices (2026) {#prices}

Table: Starting prices at K&T Code.
| Solution | From | Delivery |
|---|---|---|
| Landing page | COP 450,000 | 7 to 12 days |
| Corporate site | COP 2,500,000 | 15 to 25 days |
| Online store | COP 1,300,000 | 25 to 40 days |
| Custom software | COP 4,500,000 | Depends on scope |

:::checklist id="choose-provider-cucuta" title="Before signing with a provider"
- I've seen their projects running in production
- The contract says the code is mine
- There are staged deliveries with dates
- They can integrate DIAN, payments and WhatsApp
- There is a support channel after launch
- I can meet them in person if I need to
:::

We're from Cúcuta and work with companies all over Colombia. See our [case studies](/proyectos) or our [custom software](/servicios/software-a-medida) service.
`,
  faq: [
    { q: "Why choose a local company in Cúcuta instead of one in Bogotá or Medellín?", a: "Because you can get an in-person assessment and someone who knows the Norte de Santander context, with the same technical level as a company in any city." },
    { q: "Are the code and the database in our name?", a: "At K&T Code, yes: when each stage is approved we hand over the repository, infrastructure access and documentation, with no mandatory maintenance." },
    { q: "Do you hold in-person meetings?", a: "Yes, in Cúcuta, Los Patios, Villa del Rosario and the metropolitan area, plus weekly virtual follow-ups." },
  ],
  sources: [{ title: "K&T Code: pricing", url: "https://www.kytcode.lat/en/precios" }],
};

export default post;
