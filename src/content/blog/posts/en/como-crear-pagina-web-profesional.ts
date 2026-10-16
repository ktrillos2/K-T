import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "A professional corporate website differs from an amateur one in its infrastructure, architecture, speed, security and accessibility.",
    "Foundations: your own domain with DNS on a fast network, hosting on a global network and server-side rendering.",
    "Experience targets: LCP under 2.5 s and nothing shifting while it loads (low CLS).",
  ],
  md: `
A corporate website is your company's calling card for customers, partners and investors. This is what separates it from an amateur site.

## The technical foundations {#foundations}

- **Your own domain and DNS on a fast network:** improves resolution and security from the first click.
- **Global infrastructure:** the site responds just as fast in Bogotá, Mexico City or Miami, and scales during traffic spikes.
- **Server-side rendering:** the content arrives complete in the HTML, which helps speed and SEO.

## Step 1: choose the architecture {#architecture}

Traditional content managers work for standard blogs. When the project needs to scale or integrate with other systems, a **headless** architecture separates the interface from the content: lighter interfaces, an unexposed database and freedom to redesign without touching the data.

## Step 2: develop with Core Web Vitals in mind {#core-web-vitals}

### LCP (Largest Contentful Paint)

The time it takes for the main block (image or headline) to appear. The target is under 2.5 seconds; our sites are usually under one.

### CLS (Cumulative Layout Shift)

Visual stability while loading: buttons shouldn't move just as the user is about to tap them.

### INP (Interaction to Next Paint)

How fast the page responds to a tap or click. The target is under 200 ms.

## B2B requirements {#b2b}

:::checklist id="corporate-site-b2b" title="Standards for a professional corporate website"
- Domain and corporate email with the company's name
- SSL certificate and privacy policy
- Services, success stories and contact pages
- Organization structured data
- Speed measured and passing on mobile
- Accessibility: contrast, alt text and keyboard navigation
- Forms connected to email and CRM
- Analytics set up
:::

See our [corporate web design](/servicios/diseno-web-corporativo) service or our [pricing](/precios).
`,
  faq: [
    { q: "What sets a professional corporate website apart from an amateur one?", a: "Infrastructure, speed, security, accessibility and an original design. A professional website loads fast in any country, looks just as good on mobile and is structured for Google." },
    { q: "How much does a corporate site cost in Colombia?", a: "With K&T Code, a custom corporate site starts at COP 2,500,000 and is delivered in 15 to 25 days." },
  ],
  sources: [{ title: "web.dev: Web Vitals", url: "https://web.dev/articles/vitals" }],
};

export default post;
