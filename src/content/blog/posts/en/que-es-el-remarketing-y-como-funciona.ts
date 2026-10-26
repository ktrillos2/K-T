import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Remarketing (or retargeting) means showing your ads again to people who already visited your site, viewed a product or messaged you, but didn't buy.",
    "It works with the Meta pixel or the Google tag: they mark visitors so you can build audiences and show them ads later on Facebook, Instagram or Google.",
    "It's often one of the most profitable campaigns because it talks to people who already know you.",
    "At K&T Code we set up and run your remarketing as part of ads management, from {{cop:450000,usd:200}} a month.",
  ],
  md: `
Ever looked at shoes in an online store and then seen them on Instagram? That's **remarketing**. Here's what it is, how it works and how to use it without annoying your customers.

## What remarketing is {#que-es}

Remarketing means showing ads **to people who already interacted with your business**: they visited your site, added something to the cart, watched a video or messaged you on WhatsApp or Instagram. Since they already know you, they're more likely to come back and buy.

## How it works, step by step {#como-funciona}

1. **Install the pixel:** the [Meta pixel](https://www.facebook.com/business/help/742478679120153) or the Google tag on your site.
2. **Build audiences:** for example, "visited the pricing page" or "added to cart and didn't pay".
3. **Show ads to those audiences** on Facebook, Instagram or Google, with a message made for them.
4. **Measure and adjust:** how many came back and bought, and what each sale cost.

## Types of remarketing {#tipos}

Table: Most common remarketing audiences.
| Audience | Example ad |
|---|---|
| Visited your site | "Still looking for a website? Get a quote in 2 minutes" |
| Viewed a product | The same product with its price and a buy button |
| Abandoned the cart | A reminder with shipping or payment options |
| Messaged you and didn't buy | A customer testimonial or an answered FAQ |
| Engaged on Instagram | Your main offer with a clear call to action |

## Best practices {#buenas-practicas}

- **Cap frequency:** seeing the same ad ten times a day gets tiring.
- **Match the message to the stage:** don't show "meet us" to someone about to buy.
- **Exclude people who already bought** (or show them another product).
- **Respect privacy:** state in your policy that you use cookies and pixels. Google explains its rules in its [personalized advertising policy](https://support.google.com/adspolicy/answer/143465).

:::quiz
? Who sees remarketing ads?
- Anyone in your city
- *People who already visited your site or interacted with your business
- Only your current customers
= Remarketing talks to people who know you but haven't bought yet.
? What do you need for remarketing on Facebook and Instagram?
- Just a Facebook page
- *The Meta pixel installed on your site
- A .com domain
= The pixel records visits and lets you build audiences.
? What's a good practice?
- Showing the same ad all day
- *Excluding people who already bought
= You don't waste budget on existing customers or annoy them.
:::

## How K&T Code helps {#k-t-code}

We install the pixel, build your remarketing audiences and run the campaigns every month around your goal. If your site isn't ready to measure, we build that too.

Table: Related services and starting prices in your currency.
| You need | Service | From |
|---|---|---|
| Remarketing and campaigns run every month | [Ads management](/servicios/administracion-de-ads) | {{cop:450000,usd:200}} / mo |
| A fast page ready to track conversions | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| A store with a catalog for product ads | [Online store](/servicios/tiendas-virtuales) | {{cop:1300000}} |

Also read [how much Facebook Ads management costs](/blog/cuanto-cuesta-administrar-facebook-ads-colombia) or see all [pricing](/precios).

## Conclusion {#conclusion}

Remarketing wins back customers who were close to buying. With a properly installed pixel, clear audiences and stage-based messages, it's often the most profitable part of your advertising. If you want us to run it for you, [write to us](/#contacto).
`,
  faq: [
    { q: "What is remarketing in simple words?", a: "Showing your ads again to people who already visited your site or interacted with your business, so they come back and buy." },
    { q: "Are remarketing and retargeting the same?", a: "In practice, yes. Both names describe showing ads to people who already interacted with you." },
    { q: "What do I need for remarketing?", a: "The Meta pixel or Google tag installed on your site, and an active ad account." },
    { q: "How much does it cost to have my remarketing managed?", a: "At K&T Code it's part of ads management, from 200 USD a month (450,000 COP in Colombia), not including ad spend." },
  ],
  sources: [
    { title: "Meta Business: about the Meta pixel", url: "https://www.facebook.com/business/help/742478679120153" },
    { title: "Google Ads: personalized advertising policy", url: "https://support.google.com/adspolicy/answer/143465" },
  ],
};

export default post;
