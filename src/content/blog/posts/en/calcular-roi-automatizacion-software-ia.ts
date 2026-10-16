import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "ROI (%) = ((total net benefit − total investment) ÷ total investment) × 100.",
    "Net benefit adds two things: savings in hours and operating costs, and new revenue that comes from answering faster or serving customers 24/7.",
    "In Colombian SMBs, well-scoped custom software usually pays for itself in 2 to 8 months, depending on how much manual work it replaces.",
    "In the case of a distributor with 16 hours of manual work a day, the COP 9,500,000 investment was recovered in under two months.",
  ],
  md: `
Before investing in custom software or an AI automation, the right question isn't *how much does it cost*, but **how long until it pays for itself**. The good news: you can calculate it with data you already have.

## The ROI formula {#formula}

Return on investment compares what you gain with what you pay:

> ROI (%) = ((total net benefit − total investment) ÷ total investment) × 100

**Net benefit** has two sources:

- **Operating savings:** hours of manual work that disappear (quoting, checking inventory, copying data between WhatsApp and Excel) multiplied by what each hour of your team costs.
- **Additional revenue:** sales that are lost today because you answer late, don't serve customers at night, or a customer got tired of waiting.

## The calculation model in 4 steps {#model}

1. **Quantify your baseline:** hours of manual tasks per month × staff cost per hour.
2. **Estimate the total cost of ownership:** initial development + infrastructure + external services (messaging, AI models).
3. **Project revenue and efficiencies:** after-hours sales, fewer cancelled orders, fewer errors.
4. **Calculate annual ROI and the payback period:** the exact month when accumulated savings exceed the investment.

## Calculate yours {#calculator}

Enter your own numbers. The result is shown in the currency of the country you have selected.

::widget roi-calculator

## Case study: a distributor in Colombia {#case}

### Scenario data

- A team of 3 sales reps and 1 warehouse assistant.
- Quoting and checking stock by hand takes them 4 hours a day per person: **16 hours a day, about 352 hours a month**.
- Average cost per hour (including benefits): **COP 15,000**.
- Monthly cost of the manual operation: 352 × COP 15,000 = **COP 5,280,000**.

### The custom solution

- One-time development investment: **COP 9,500,000**.
- Recurring monthly cost (servers, messaging and AI services): **COP 250,000**.
- 75% of the manual tasks are automated: savings of **COP 3,960,000 a month**.
- The assistant serves customers at night and captures sales with a net margin of **COP 2,400,000 a month**.

### Results

Table: Financial results of the case (values in Colombian pesos).
| Indicator | Calculation | Result |
|---|---|---|
| Monthly net benefit | 3,960,000 + 2,400,000 − 250,000 | COP 6,110,000 |
| Payback period | 9,500,000 ÷ 6,110,000 | 1.6 months |
| First-year net benefit | (12 × 6,110,000) − 9,500,000 | COP 63,820,000 |
| First-year ROI | 63,820,000 ÷ 9,500,000 | ≈ 672% |

:::info Why so fast?
This case had a lot of repetitive manual work and sales lost at night. When the operation is smaller or the process is already partly automated, it's normal to recover the investment in 3 to 8 months. That's why it pays to measure the baseline before asking for quotes.
:::

## Common mistakes when calculating ROI {#mistakes}

- **Forgetting recurring costs:** servers, official WhatsApp messaging and AI model usage.
- **Counting only saved hours:** the sales you lose today usually weigh more.
- **Assuming 100% automation:** there is always human work left; use 60–80%.
- **Not measuring afterwards:** decide from the start which indicator you'll review every month.

Want the calculation for your company? Tell us about your process in the [contact form](#contacto) or see our [custom software](/servicios/software-a-medida) service.
`,
  faq: [
    { q: "How long does custom software take to pay for itself?", a: "It depends on the manual work it replaces and the sales it recovers. In Colombian SMBs it's usually between 2 and 8 months; for very manual processes it can be less." },
    { q: "What data do I need to calculate ROI?", a: "The hours per month your team spends on the task, the cost per hour, the sales you lose today, the development cost and the monthly running costs." },
  ],
  sources: [
    { title: "K&T Code: custom software pricing", url: "https://www.kytcode.lat/en/precios" },
    { title: "Harvard Business Review: articles on AI return on investment", url: "https://hbr.org/topic/subject/ai-and-machine-learning" },
  ],
};

export default post;
