import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Wix is easier to start with (drag and drop), but it's a closed system: you can't export your site if you decide to leave.",
    "WordPress has a learning curve, but the code is free and you can move it to another host.",
    "With your own hosting, WordPress usually costs less than Wix's premium plans, which also go up on renewal.",
  ],
  md: `
Wix and WordPress are two of the most popular ways to have a website without coding from scratch. Choosing wrong can force you to rebuild everything when your business grows.

## Comparing the key aspects {#comparison}

Table: Wix vs. WordPress.
| Criteria | Wix | WordPress |
|---|---|---|
| Ease of getting started | Very high: drag and drop | Medium: requires learning |
| Ownership and portability | You can't export the site | Free code, you can move it to another host |
| Speed | Moderate: lots of scripts | Good if well optimized |
| Flexibility | Limited to what Wix offers | High with plugins, but every plugin adds weight |
| Cost | Monthly plan that rises on renewal | Hosting and domain, plus premium plugins |

## What happens when your business grows {#growth}

With Wix, migrating means rebuilding the site from scratch because there's no way to take the code or the database with you. With WordPress you can change hosts, but as you add plugins the site gets slower and more vulnerable.

## Is there a third option? {#custom}

A custom site doesn't depend on any platform: the code is yours, it loads in under a second and you pay no licenses. Compare it with our [analysis of custom development vs. templates](/blog/desarrollo-web-medida-vs-plantillas).

::widget template-vs-custom
`,
  faq: [
    { q: "Can I migrate from Wix to another platform?", a: "Wix is a closed system that doesn't let you export the code or the database, so migrating means rebuilding the site from scratch." },
    { q: "Which is cheaper for a business in Colombia?", a: "WordPress with your own hosting usually costs less than Wix's premium plans and avoids renewal increases, although it needs more technical maintenance." },
  ],
};

export default post;
