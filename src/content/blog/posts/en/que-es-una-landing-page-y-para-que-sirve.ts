import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "A landing page is a page with a single goal (a lead, a call or a sale) that receives traffic from campaigns or email.",
    "It removes menus and exit links: the visitor has only one possible action.",
    "Its anatomy: a minimal header, a clear proposition up top, pain and solution, benefits, social proof, the offer, FAQs and a short final call to action.",
    "At K&T Code a custom landing page starts at COP 450,000 as a one-time payment and is delivered in 7 to 12 days.",
  ],
  md: `
A **landing page** is a page designed so the visitor does **one thing only**: leave their details, write on WhatsApp, book a call or buy. It receives the traffic from your ads or emails and turns it into customers.

Sending paid traffic to the home page of a corporate site is expensive: the visitor finds menus, links and distractions, and leaves.

## Anatomy of a high-converting landing page {#anatomy}

1. **Minimal header:** logo and, at most, a trust badge or the phone number. No menu.
2. **Hero (the first thing you see):** a headline with the benefit, a measurable subheadline and the main button.
3. **Pain vs. solution:** the customer's problem and how you solve it.
4. **Benefits:** 3 or 4 tangible pillars.
5. **Social proof:** testimonials with names, figures, logos and cases.
6. **The offer:** exactly what's included.
7. **FAQ:** the last 4 or 5 objections.
8. **Final call to action:** a form with 3 fields at most, or a WhatsApp button.

:::tip Buttons that convert
Use outcome verbs: "Quote my project", "Book a free assessment", "Buy with 20% off". Avoid "Submit" or "Click here".
:::

## 5 key uses {#uses}

- **Meta Ads campaigns:** a mobile page that repeats the words of the ad.
- **Google Ads:** answers high-intent searches and improves the ad's quality score.
- **B2B lead generation:** a free assessment, a formal quote or a guide in exchange for contact details.
- **Launches:** measure sign-ups and pre-sales before investing big.
- **Seasonal pushes:** Black Friday, VAT-free days or countdown offers, kept separate from the main site.

## Landing page vs. corporate site {#vs-corporate}

Table: Main differences.
| Parameter | Corporate site | Landing page |
|---|---|---|
| Goal | Inform and show every service | One specific action |
| Exit points | Many (menus, social media, blog) | None |
| Audience | General | Segmented from a campaign |
| Length | 5 to 15 pages | One page |
| Ideal traffic | SEO and direct traffic | Ads, email and social media |

## Speed is part of conversion {#speed}

Most ad clicks in Latin America come from phones on mobile connections. A landing page that loads slowly loses people before they see the offer: you're paying for clicks that never see your page. Simulate what it costs you:

::widget speed-simulator

## Prices in Colombia (2026) {#prices}

Table: Common options.
| Option | Approximate price | What you should know |
|---|---|---|
| Purchased template | COP 150,000 – 350,000 | Generic, slow and shared with thousands of sites |
| Custom landing page (K&T Code) | From COP 450,000, one-time payment | Own design, fast loading, WhatsApp or a form with instant notification |
| Landing page with automations | COP 900,000 – 2,500,000 | A/B tests, payment gateways, CRM connection |

## Mistakes that kill conversion {#mistakes}

:::checklist id="landing-mistakes" title="Check your landing page"
- It has no menu that takes the visitor away
- The headline repeats the ad's promise
- The form asks for 3 details at most
- It was designed for mobile first
- It has tracking installed (Meta Pixel, Google Tag Manager)
- It loads in under 2 seconds on mobile
:::

Ready to launch yours? See our [landing pages](/servicios/landing-pages) service or compare [landing page vs. online store](/blog/landing-page-vs-tienda-virtual).
`,
  faq: [
    { q: "Can I have a landing page without a website?", a: "Yes. A landing page on its own domain is enough to start selling and validate your offer." },
    { q: "Is a landing page good for SEO?", a: "It can rank for specific local searches if it has good content, structured data and speed, but its strength is paid traffic." },
    { q: "How long does K&T Code take to deliver a landing page?", a: "Between 7 and 12 days, including custom design, development, analytics and mobile testing." },
  ],
  sources: [
    { title: "Unbounce: Conversion Benchmark Report", url: "https://unbounce.com/conversion-benchmark-report/" },
    { title: "web.dev: Core Web Vitals", url: "https://web.dev/articles/vitals" },
  ],
};

export default post;
