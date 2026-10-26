import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "To sell on WhatsApp you need WhatsApp Business (free), a complete profile, a catalog and messages that lead the customer to pay.",
    "The process that converts best: reply within minutes, send the product from the catalog, answer questions, send the payment link and confirm.",
    "Use templates and quick replies so you don't improvise, but always personalize the name and the product.",
    "When you get a lot of messages, the WhatsApp API with AI lets you serve customers 24/7 and collect payment inside the chat.",
  ],
  md: `
In Colombia, WhatsApp is the number one sales channel for thousands of businesses. The question is no longer whether to sell on WhatsApp, but **how to sell more without spending the day glued to your phone**. Here's the step-by-step process, message templates ready to copy and a checklist to review your strategy.

## How to sell on WhatsApp Business, step by step {#paso-a-paso}

1. **Install WhatsApp Business** (it's free) with a number dedicated to the business.
2. **Complete your profile:** logo, a clear description, opening hours, address and a link to your website.
3. **Create your catalog** with real photos, price and a short description of each product.
4. **Set up automatic messages:** greeting, away message outside business hours and quick replies.
5. **Organize with labels:** "new", "quoted", "paid", "shipped".
6. **Drive traffic:** a WhatsApp button on your website, Meta ads that open the chat and a link on Instagram.
7. **Close with a payment link** (Wompi, Bold, PayU or bank transfer) instead of waiting for the customer to "let you know".
8. **Follow up** with anyone who hasn't replied within 24 hours, without overdoing it.

## Message templates for selling on WhatsApp {#plantillas}

Copy, adjust and save them as quick replies:

- **Greeting:** "Hi, [name]! 👋 Thanks for writing to [business]. What are you looking for today? I'll help you in a moment."
- **Sending a product:** "Here's the [product] I mentioned: [price]. We have it in [sizes/colors]. Which one do you prefer?"
- **Answering questions:** "Sure. Shipping to [city] takes [days] and costs [amount]. If you pay today, it ships tomorrow."
- **Closing:** "Here's the secure payment link: [link]. As soon as it's confirmed, I'll send you the tracking number."
- **Follow-up:** "Hi, [name]. Did you get a chance to look at the [product]? I can hold it for you until tomorrow if you'd like."
- **After the sale:** "Your order arrived! What did you think? If you leave us a review, we'll give you [benefit] on your next purchase."

:::tip Phrases that sell
Use closed questions that move the sale forward ("Do you prefer it in black or blue?"), give a reason to decide today ("only 3 left") and always answer with the price: hiding it makes customers leave.
:::

## Mistakes that cost you sales {#errores}

- Replying hours later: most customers buy from whoever answers first.
- Sending long voice notes or price lists in PDF without context.
- Asking the customer to "write when you want to pay" instead of sending the link.
- Sending bulk messages from the regular app: WhatsApp may ban your number.
- Not saving customer details to sell to them again.

:::checklist id="whatsapp-ventas" title="Review your WhatsApp sales strategy"
- I have WhatsApp Business with a complete profile and hours
- My catalog has real photos and up-to-date prices
- I reply in under 10 minutes during business hours
- I have quick replies for frequent questions
- I send a payment link to close the sale
- I use labels to know which stage each customer is at
- I follow up with anyone who didn't reply
- My website has a visible WhatsApp button
:::

## When the app can't keep up: API + AI {#api-ia}

If you get dozens of messages a day, the app falls short. The **official WhatsApp Business API** lets you:

- **Have several reps** on the same number.
- **Run an AI agent** that replies 24/7 with your real prices and inventory.
- **Collect payment inside the chat** and issue the electronic invoice automatically.
- **Send permitted bulk messages** with templates approved by Meta (with a per-message cost by category).

We explain it in detail in [how to automate WhatsApp Business with AI](/blog/automatizar-whatsapp-business-con-ia) and [how to integrate it with inventory and invoicing](/blog/integrar-whatsapp-crm-inventario-facturacion).

## Test what you learned {#quiz}

:::quiz
? What's the best way to close a sale on WhatsApp?
- Saying "let me know when you want to pay"
- *Sending a secure payment link and confirming the order
- Sending a 3-minute voice note
= The payment link reduces friction: the customer buys at the moment of highest interest.
? Can you send bulk messages from the WhatsApp Business app?
- Yes, without limits
- *It's not advisable; bulk sends use the API with approved templates
- Only on Sundays
= Bulk sends from the app can get your number banned; the API allows them with rules.
? What's the best reply to "how much is it?"
- "Message me privately"
- *A clear price, options and a question that moves the sale forward
- Ignoring it until they ask again
= Giving the price builds trust; hiding it sends the customer to someone else.
:::

## How K&T Code helps you sell more on WhatsApp {#k-t-code}

We connect your website, catalog and WhatsApp so every visit ends in a conversation and every conversation in a payment.

Table: Related services and starting prices in your currency.
| You need | Service | From |
|---|---|---|
| A page that sends customers straight to your WhatsApp | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| Catalog, cart, PSE/Nequi payments and WhatsApp orders | [Online store](/servicios/tiendas-virtuales) | {{cop:1300000}} |
| A WhatsApp AI agent connected to inventory and invoicing | [Custom software](/servicios/software-a-medida) | {{cop:4500000}} |

Compare on [pricing](/precios) or see [how much an online store costs in Colombia](/precios/precio-tienda-virtual-colombia).

## Conclusion {#conclusion}

Selling on WhatsApp works when you treat it as a process: complete profile, catalog, quick replies, payment link and follow-up. As volume grows, AI and the API let you serve more customers without losing the personal touch. If you want your website and WhatsApp to work together, see our [online stores](/servicios/tiendas-virtuales) or [write to us](/#contacto).
`,
  faq: [
    { q: "How do you sell on WhatsApp step by step?", a: "Install WhatsApp Business, complete your profile, create a catalog, set up quick replies, organize with labels, drive traffic from your website and ads, close with a payment link and follow up." },
    { q: "Can you sell on WhatsApp Business for free?", a: "Yes. The WhatsApp Business app is free. The official API, needed for multiple reps, AI and bulk messaging, has per-message costs by category." },
    { q: "What messages should I send to sell on WhatsApp?", a: "A personalized greeting, the product card with its price, clear answers to questions, the payment link and a friendly follow-up if the customer doesn't reply." },
    { q: "Can I use artificial intelligence to sell on WhatsApp?", a: "Yes. With the WhatsApp Business API you connect an AI agent that replies 24/7 with your prices and inventory and hands off to a rep when needed." },
  ],
  sources: [
    { title: "WhatsApp Business: app features", url: "https://business.whatsapp.com/products/business-app" },
    { title: "Meta: WhatsApp Business Platform pricing", url: "https://developers.facebook.com/docs/whatsapp/pricing" },
  ],
};

export default post;
