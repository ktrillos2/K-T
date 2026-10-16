import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "A basic website maintenance plan in Colombia costs between COP 180,000 and 350,000 a month; one for online stores, between COP 450,000 and 850,000.",
    "Good maintenance includes backups, downtime monitoring, SSL renewal, security patches and testing of forms and payments.",
    "It isn't legally required, but without maintenance a site piles up vulnerabilities, gets slow and loses positions on Google.",
  ],
  md: `
Your website or online store needs constant supervision: forms that work, a security certificate that renews, a protected database. These are the prices and what a professional plan should include.

## Maintenance plans in Colombia {#plans}

Table: Website maintenance price ranges (2026).
| Level | Monthly cost (COP) | Includes |
|---|---|---|
| Basic preventive | 180,000 – 350,000 | Weekly backups, 24/7 downtime monitoring, SSL renewal, security patches |
| Commercial / e-commerce | 450,000 – 850,000 | Gateway support, daily backups, a 4-hour block of changes, monthly speed audit |
| Dedicated enterprise | 1,200,000 – 2,500,000+ | Assigned engineer, response in under 2 hours, a 12-hour development block |

## What good maintenance should include {#includes}

- **Uptime monitoring:** immediate alerts if the site stops responding.
- **Automatic backups:** of the database and files, stored off the main server.
- **Speed:** compressing new images and keeping third-party scripts in check.
- **Form and payment testing:** so you never lose a lead or a sale.
- **Security updates:** for the system and its dependencies.

:::checklist id="website-maintenance" title="Is your website well maintained?"
- I have recent backups stored off the server
- I get alerts if the site goes down
- The SSL certificate renews automatically
- I tested the contact form this month
- I ran a test payment this month
- My site loads in under 3 seconds on mobile
:::

## What happens if you don't maintain it? {#risks}

Accumulated vulnerabilities, outages nobody notices, broken forms that don't warn you and an ever slower website. All of that ends in lost customers and worse rankings.

At K&T Code maintenance is optional and tailored to what your site needs. See our [website maintenance](/servicios/mantenimiento-web) service.
`,
  faq: [
    { q: "Do I have to pay monthly maintenance for a website?", a: "It isn't legally required, but it's key to continuity: without maintenance a site piles up vulnerabilities, suffers undetected outages, gets slow and loses positions on Google." },
    { q: "How much does a website support plan cost in Colombia?", a: "A basic plan costs between COP 180,000 and 350,000 a month. Plans for online stores run between COP 450,000 and 850,000, and enterprise plans start at COP 1,200,000." },
  ],
};

export default post;
