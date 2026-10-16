import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Excel works at the start, with fewer than 50 transactions a day and a small team.",
    "A generic ERP fits if your processes are traditional accounting and payroll; it becomes a brake when it charges per user and is costly to customize.",
    "Custom software makes sense when your operation is your competitive advantage and you need WhatsApp, payments and logistics integrated.",
  ],
  md: `
Almost every company starts in Excel. The problem comes when the file becomes the heart of the business: several people edit it, nobody knows who changed a price and a formula error throws inventory off. What's next: an ERP or your own software?

## Comparison matrix {#matrix}

Table: Excel, generic ERP and custom software.
| Criteria | Excel / Sheets | Generic ERP (subscription) | Custom software |
|---|---|---|---|
| Initial cost | COP 0 | COP 5,000,000 – 30,000,000 in implementation | COP 8,000,000 – 35,000,000 in development |
| Recurring cost | Low | High: monthly fee per user | No per-user licenses, only infrastructure |
| Adaptability | High but fragile | Low: the company adapts to the system | Total |
| Security | Very low: no roles, risk of deletion | High | High, with roles and audit logs |
| WhatsApp and APIs | Almost impossible | Limited to connectors or paid modules | Native |
| Ownership | — | The vendor's | 100% the company's |

## The dangers of running on Excel {#excel}

- **No real concurrency:** several reps in the same file cause locks, overwrites and lost orders.
- **No audit trail:** you don't know who changed a price, deleted inventory or altered a discount.
- **Data leaks:** anyone with access can copy your entire customer base.

## When a generic ERP becomes a brake {#erp}

- **Cluttered screens** full of fields your team doesn't use, which slow down service.
- **Per-user pricing:** every new salesperson or assistant raises the monthly bill.
- **Expensive, slow customization:** a report or a connector can cost millions of pesos and take months.

## Advantages of custom software {#custom}

- Fast interfaces that work on phones, tablets and computers.
- **Unlimited users** with no per-person fees.
- Permissions by role and department.
- Integration with WhatsApp, payment gateways, DIAN invoicing and AI agents connected to your data.

## What should you choose today? {#decision}

- **Excel:** if you're validating the business and the operations team has fewer than 3 people.
- **Standard accounting ERP:** if you only need basic electronic invoicing and payroll, without complex operations.
- **Custom software:** if your sales, logistics or service processes set you apart and you want a long-term advantage.

::widget roi-calculator

See what it costs in [how much custom software costs](/blog/cuanto-cuesta-desarrollar-software-a-medida-colombia) or our [custom software](/servicios/software-a-medida) service.
`,
  faq: [
    { q: "When should I move off Excel?", a: "When several people edit it at once, you pass about 50 transactions a day, or an error in the file has already cost you money." },
    { q: "Custom software or ERP?", a: "An ERP if your processes are standard (accounting, payroll). Custom software if the way you sell, produce or serve customers is your advantage and you need your own integrations." },
  ],
  sources: [{ title: "MIT Sloan: Ideas made to matter — digital transformation", url: "https://mitsloan.mit.edu/ideas-made-to-matter" }],
};

export default post;
