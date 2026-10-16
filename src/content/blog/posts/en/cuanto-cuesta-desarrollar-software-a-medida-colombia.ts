import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Custom software in Colombia starts at COP 4,500,000 for an internal dashboard or an MVP, and can exceed COP 45,000,000 for a complete SaaS platform.",
    "The budget is made up of four phases: design and architecture, interface, server and database, and quality and launch.",
    "What moves the price most: the complexity of the business logic, integrations, roles and security.",
  ],
  md: `
Custom software lets you automate your critical operations, stop paying monthly licenses and own your data and your code. But how much does it cost? Here are the real ranges and how the budget is calculated.

## Price ranges by type of software {#ranges}

Table: Reference ranges in Colombia (2026).
| Type of project | Range in COP | Range in USD | Estimated time |
|---|---|---|---|
| Admin dashboard or internal MVP | 4,500,000 – 9,000,000 | $1,200 – $2,300 | 3 to 5 weeks |
| B2B portal or customer system | 9,000,000 – 18,000,000 | $2,300 – $4,500 | 6 to 10 weeks |
| Complete SaaS platform (multi-company) | 18,000,000 – 45,000,000+ | $4,500 – $11,000+ | 12 to 20 weeks |

These values are for reference. You can see our [custom software plans](/precios/precio-software-a-medida).

## The phases that make up the budget {#phases}

1. **Architecture and design:** user flows, screen design and validation before writing code.
2. **Interface:** everything the user sees and touches, fast and adapted to any screen.
3. **Server and database:** data model, secure authentication, roles and permissions.
4. **Quality and launch:** load and security testing, and continuous deployment.

## What determines the cost {#factors}

- **Business logic complexity:** calculations, rules, approvals.
- **Integrations:** payment gateways, ERP, electronic invoicing, external APIs.
- **Data model:** how many entities and relationships the system handles.
- **Security and roles:** how many user types and permissions.
- **Infrastructure:** user volume, availability and backups.

:::checklist id="quote-software" title="Get ready to quote your software"
- I know which process I want to solve first
- I'm clear on the user types and what each one can do
- I listed the systems it has to connect with
- I know how many users will use it at the start
- I have examples of the reports or screens I need
:::

## Does it pay for itself? {#roi}

Compare the cost with what licenses, manual hours and errors cost you today. We explain it in [how to calculate the ROI of custom software](/blog/calcular-roi-automatizacion-software-ia) and in [custom software vs. SaaS](/blog/software-a-medida-vs-saas-comparativa).

Have a project in mind? We evaluate your requirements and send you a proposal with scope, architecture and price. See our [custom software](/servicios/software-a-medida) service.
`,
  faq: [
    { q: "What is the price range for custom software in Colombia?", a: "An initial product (admin dashboard, internal portal or MVP) usually runs between COP 4,500,000 and 9,000,000. Enterprise platforms or complete SaaS products start at COP 18,000,000, depending on scope." },
    { q: "What factors determine the cost?", a: "The complexity of the business logic, the number of integrations, the data model, the security and role levels, and the infrastructure required." },
    { q: "Is the code in my company's name?", a: "Yes. At K&T Code we hand over the complete source code in a repository in your company's name." },
  ],
};

export default post;
