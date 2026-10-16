import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "SaaS (subscription software) is cheap at first, but its cost grows with every user and you never stop paying.",
    "Custom software requires an initial investment, but over three years it usually costs less and the code and data are yours.",
    "Building makes sense when you pay more than USD 500 to 1,000 a month in licenses or need processes and integrations no SaaS offers.",
  ],
  md: `
Many companies start with subscription platforms to solve things fast. But as the team grows, monthly per-user fees get heavy. When does it make sense to build your own software?

## Strategic comparison {#comparison}

Table: SaaS vs. custom software.
| Criteria | SaaS | Custom software |
|---|---|---|
| Initial cost | Low: immediate monthly payment | Development investment |
| Cost over 3+ years | High, and grows with every user | Low: only infrastructure and maintenance |
| Code and data ownership | The vendor's | 100% your company's |
| Customization | Limited to what the platform offers | Total, tailored to your processes |
| Local integrations | Depend on the vendor | DIAN, Colombian gateways, in-house systems |

## When to choose custom software {#when}

- Your processes are unique and generic tools don't cover them.
- You pay thousands of dollars a year in licenses but use a fraction of the features.
- You need to integrate with legacy systems, DIAN electronic invoicing or Colombian gateways.
- You want to turn your platform into a product you can also sell.

## When to stay with SaaS {#when-saas}

- Your operation is standard and the SaaS covers it well.
- You have few users and the monthly cost is low.
- You need something working this week.

:::checklist id="saas-or-custom" title="Is it time to build your software?"
- I pay more than USD 500 a month in licenses
- I use less than half the features I pay for
- I do manual tasks because the SaaS doesn't handle them
- I need to integrate with DIAN or Colombian gateways
- I want to own my data
:::

To run the numbers with your own data, use our guide to [calculating ROI](/blog/calcular-roi-automatizacion-software-ia) and check [how much custom software costs](/blog/cuanto-cuesta-desarrollar-software-a-medida-colombia).
`,
  faq: [
    { q: "When is custom software more profitable than SaaS?", a: "When licenses exceed roughly USD 500 to 1,000 a month, or when your operation needs customizations no SaaS allows." },
    { q: "Who owns the code in custom development?", a: "At K&T Code the client owns 100% of the source code, the database and the intellectual property, with no hidden licenses." },
  ],
};

export default post;
