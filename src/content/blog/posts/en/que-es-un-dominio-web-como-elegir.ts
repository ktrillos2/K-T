import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "A domain is the unique address your customers use to reach your website, like yourcompany.com or yourcompany.co.",
    "Choose a short name that's easy to pronounce and based on your brand; avoid numbers and hyphens.",
    "A .com costs roughly USD 12 to 18 a year; a .co or .com.co, USD 20 to 35.",
    "Always register it in your company's name and with an accredited registrar.",
  ],
  md: `
The domain is your business's address on the internet. Choosing it well is a brand decision that will stay with you for years. This guide helps you pick the right name and extension.

## What a domain is and how it works {#what-it-is}

When someone types \`yourcompany.com\`, the domain name system (DNS) translates that address to the server where your website is hosted. The domain is the name; [hosting](/blog/que-es-un-hosting-web-y-como-funciona) is the place where the files live.

## Tips for choosing your domain {#tips}

- **Short and easy to pronounce:** you should be able to say it over the phone without spelling it out.
- **No numbers or hyphens:** they cause confusion and typing errors.
- **Brand before keywords:** "yourbrand.com" is easier to remember than "cheapwebsitescolombia.com".
- **Protect your brand:** if you buy yourcompany.com, consider yourcompany.co too.
- **Use an ICANN-accredited registrar** with transparent renewal prices.

## .com, .co or .com.co? {#extensions}

Table: The most used extensions in Colombia.
| Extension | Ideal for | Approximate price per year |
|---|---|---|
| .com | Businesses with international reach | USD 12 – 18 |
| .co | Colombian brands and startups | USD 20 – 35 |
| .com.co | Companies operating only in Colombia | USD 20 – 35 |

Prices vary by registrar and are usually higher on renewal than in the first year: always check the renewal price.

## Common mistakes {#mistakes}

1. Registering the domain in the developer's or agency's name, not your company's.
2. Forgetting auto-renewal and losing the domain.
3. Choosing a name very similar to a competitor's.
4. Not setting up corporate email on the same domain.

:::checklist id="choose-domain" title="Before registering your domain"
- The name is short and easy to pronounce
- It has no numbers or hyphens
- I checked it doesn't resemble another brand
- I chose the extension based on my markets
- It will be registered in my company's name
- I turned on auto-renewal
:::

In all our projects we help you choose the domain and set up DNS, corporate email and the SSL certificate. See [how to build a website from scratch](/blog/como-crear-una-pagina-web-desde-cero-2026).
`,
  faq: [
    { q: "How much does it cost to register a domain in Colombia?", a: "A .com costs roughly USD 12 to 18 a year. A .co or .com.co costs USD 20 to 35 a year, depending on the registrar." },
    { q: "Is .com or .co better?", a: "If you operate only in Colombia, .co or .com.co reinforce your local presence. If you sell to other countries, .com is still the most recognized standard." },
  ],
  sources: [{ title: "ICANN: accredited registrars", url: "https://www.icann.org/registrar-reports/accredited-list.html" }],
};

export default post;
