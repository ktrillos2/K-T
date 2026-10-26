import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Managing Facebook and Instagram Ads has two separate costs: the fee of whoever runs the campaigns and the ad spend you pay directly to Meta.",
    "A good service includes a goal-based strategy, audiences, A/B-tested ads, remarketing, a configured pixel and a clear monthly report.",
    "Be wary of anyone who won't let you see the ad account or mixes their fee with your ad spend: the spend should come from your own card.",
    "At K&T Code ads management starts at {{cop:450000,usd:200}} a month, month to month with no long-term contract.",
  ],
  md: `
If you're wondering **how much Facebook Ads management costs** (or Meta Ads, which includes Instagram), first separate two things people often mix up: what the person managing your campaigns charges and what you spend on advertising. Here's each part, what the service should include and how to tell if it's working.

## The two costs of advertising on Meta {#costos}

1. **Management (fee):** the monthly payment to the person or agency that builds the strategy, ads, audiences and reports.
2. **Ad spend:** what Meta charges to show your ads. You pay it directly in your ad account with your card.

Table: What each cost is.
| Cost | Who charges it | What it pays for |
|---|---|---|
| Management | The agency or specialist | Strategy, ads, optimization and reports |
| Ad spend | Meta (Facebook and Instagram) | Each time your ad is shown or clicked |

:::tip The golden rule
The ad account should be **in your business's name** and the spend should come from **your card**. That way you see every dollar and never depend on a vendor.
:::

## What a good service includes {#incluye}

- **Goal-based strategy:** getting WhatsApp messages is not the same as getting online store sales.
- **Audiences:** by location, interests, behavior and lookalikes of your customers.
- **Ads and A/B tests:** several versions to keep the ones that sell.
- **Remarketing:** showing your ads again to people who already visited you. See [what remarketing is](/blog/que-es-el-remarketing-y-como-funciona).
- **Pixel and conversions:** to know which ad brought each sale or message.
- **Monthly report:** what you spent, how many customers came and what each one cost.

## How much to spend on ads {#inversion}

There's no single number: it depends on your market, competition and goal. The sensible approach is to start with a budget you can sustain for at least a month, measure cost per customer and scale what works. Check [Meta's budget guidance](https://www.facebook.com/business/help/214319341922580) and be wary of anyone promising fixed results.

## Where to send your ads {#destino}

A great ad that leads to a slow or confusing page loses customers. Send traffic to a [landing page](/blog/que-es-una-landing-page-y-para-que-sirve) with a single goal, or straight to WhatsApp with a pre-written message. If you sell over chat, see [how to sell on WhatsApp Business](/blog/como-vender-por-whatsapp-business).

:::checklist id="ads-checklist" title="Before hiring someone for your ads"
- The ad account is in my business's name
- Ad spend comes from my card, not the vendor's
- I know my goal (sales, messages or leads)
- The Meta pixel is installed on my site
- I know which page or chat the ads will lead to
- The vendor will send a monthly report
:::

## Test what you learned {#quiz}

:::quiz
? What two costs does Meta advertising have?
- Only the agency fee
- *Management and ad spend
- Logo design and hosting
= They're two separate payments: the manager's fee and what Meta charges to show your ads.
? Whose name should the ad account be in?
- The vendor's
- *Your business's
= That way you keep your data, history and audiences if you switch vendors.
? What is the Meta pixel for?
- Designing ads
- *Measuring which ad brought each sale or message
- Lowering ad prices
= Without measurement you can't tell what works or optimize.
:::

## How K&T Code helps {#k-t-code}

We manage your Facebook, Instagram, TikTok and Google campaigns every month around your goal, with remarketing and simple reports. And if you don't have a page to send the ads to, we build that too.

Table: Related services and starting prices in your currency.
| You need | Service | From |
|---|---|---|
| Someone to run your Meta, TikTok and Google ads every month | [Ads management](/servicios/administracion-de-ads) | {{cop:450000,usd:200}} / mo |
| A page that turns clicks into customers | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| Selling with a catalog and online payments | [Online store](/servicios/tiendas-virtuales) | {{cop:1300000}} |

See every [plan and price](/precios).

## Conclusion {#conclusion}

Ads management costs two things: the service and the ad spend. Always make sure the account and card are yours, there's a clear goal and a monthly report. If you want us to run your campaigns, [write to us](/#contacto).
`,
  faq: [
    { q: "How much does Facebook Ads management cost?", a: "There are two costs: management and the ad spend you pay Meta. At K&T Code management starts at 200 USD a month (450,000 COP in Colombia)." },
    { q: "Does the management fee include what's paid to Facebook?", a: "No. Ad spend is paid directly to Meta from your ad account, with your card." },
    { q: "How much should I spend on ads?", a: "It depends on your market, competition and goal. Start with a budget you can sustain for a month, measure cost per customer and adjust." },
    { q: "How long until I see results?", a: "The first weeks are for testing and learning. We recommend at least 3 months to optimize with real data." },
  ],
  sources: [
    { title: "Meta Business: ad budget help", url: "https://www.facebook.com/business/help/214319341922580" },
    { title: "Meta Business: about the Meta pixel", url: "https://www.facebook.com/business/help/742478679120153" },
  ],
};

export default post;
