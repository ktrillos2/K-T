import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "A WhatsApp appointment booking chatbot shows open slots, books them in your calendar, confirms and sends reminders without anyone on your team replying by hand.",
    "The free WhatsApp Business app only sends automated replies: to actually book appointments you need the official API (WhatsApp Business Platform) connected to your calendar.",
    "You can start with a booking tool linked from WhatsApp plus a landing page (from {{cop:450000}}); a bot of your own integrated with your systems is custom software (from {{cop:4500000}}).",
    "If you book medical appointments, treat the data as sensitive: ask only for what you need and always use official channels.",
  ],
  md: `
An **appointment booking chatbot** on WhatsApp is one of the automations that pays off fastest for clinics, dentists, beauty studios, auto shops and law offices. In Mexico and Argentina, searches like "chatbot para agendar citas médicas", "WhatsApp bot to book appointments" and "agendar turnos por WhatsApp" keep growing, and many US businesses with Spanish-speaking customers ask the same. Here is how it works, the options and what to budget.

## What a WhatsApp booking chatbot does {#que-hace}

1. **Greets and asks for the service** (general consultation, dental cleaning, car inspection…).
2. **Shows open slots** by reading your calendar in real time.
3. **Books** the slot and blocks it so nobody else can take it.
4. **Confirms** with a message that includes date, time, address and directions.
5. **Reminds** the customer ahead of time (for example, the day before) and lets them confirm, reschedule or cancel.
6. **Hands off to a person** when the question goes off script.

:::info Chatbot or AI agent?
A booking chatbot can be a button flow (pick service, day and time) or an AI agent that understands free text like "anything Thursday afternoon?". Flows are cheaper and predictable; AI is more comfortable for the customer. Both run on the official API; pick based on your volume and budget.
:::

## 3 ways to book appointments on WhatsApp {#opciones}

Table: Options for booking appointments on WhatsApp.
| Option | How it works | Best for |
|---|---|---|
| WhatsApp Business app + quick replies | Automatic greeting, then a person books by hand | Businesses with few appointments a day |
| Link to a booking tool | The greeting or bot sends a link to your online calendar | Automating without a big build |
| Bot on the official API connected to your calendar | Everything happens inside the chat: slots, booking, reminders | Clinics, chains and busy schedules |

The free WhatsApp Business app offers greeting messages, away messages and quick replies, but it **doesn't read your calendar**. A bot that books on its own runs on the **WhatsApp Business Platform** (Meta's official API), either directly or through a provider.

:::warn Avoid unofficial bots
Extensions that "automate" WhatsApp Web or the regular app go against WhatsApp's terms and can get your number banned. For the channel your schedule depends on, use the official API.
:::

## What it costs to run the bot {#costos}

Besides development, plan for:

- **WhatsApp messages:** Meta charges for certain template messages (like reminders you send first) depending on country and category. Check the current rates on the platform's official pricing page.
- **Calendar or scheduling system:** Google Calendar, a booking tool or your own software.
- **AI (optional):** if the bot understands free text, there is a per-use model cost.
- **Hosting and maintenance** for the bot and its integrations.

Not sure whether to pay for a booking subscription or build your own bot? Read [custom software vs. SaaS](/blog/software-a-medida-vs-saas-comparativa).

## Health data and privacy {#privacidad}

If you book medical, dental or therapy appointments, health information is **sensitive data**: Mexico's personal data protection law and Argentina's Law 25,326 both say so, and in the US healthcare providers must also consider HIPAA. In practice:

- Ask in the chat only for what you need to book (name, service, time). Medical records belong in your system, not in WhatsApp.
- Share your privacy notice in the first message.
- Limit who on your team can see the conversations.

:::checklist id="bot-citas" title="Before you launch your booking bot"
- I have a dedicated number for WhatsApp Business
- I use the official API or an authorized provider
- The bot reads my calendar in real time
- It sends a confirmation with address and time
- It sends a reminder and lets people cancel or reschedule
- There is a clear way to reach a person
- I ask only for the data I need and share a privacy notice
- I track how many appointments are booked and canceled
:::

## Test what you learned {#quiz}

:::quiz
? Does the free WhatsApp Business app book appointments in your calendar on its own?
- Yes, it has a built-in Google Calendar integration
- *No, it only sends automated replies; booking needs the API or an external tool
- Yes, if you turn on the away message
= The app offers greeting, away messages and quick replies, but it doesn't read or book your calendar.
? What is the risk of unofficial WhatsApp bots?
- None, they are the same as the API
- *Your number can be banned for breaking WhatsApp's terms
- They only work at night
= Automating the regular app or WhatsApp Web breaks the terms of service and puts your number at risk.
? If you book medical appointments, what should you ask for in the chat?
- The full medical history
- *Only what the appointment needs: name, service and time
- Photos of test results and IDs
= Health data is sensitive; ask for the minimum in the chat and keep clinical data in your system.
:::

## How K&T Code helps with your booking bot {#k-t-code}

We work remotely with businesses in Mexico, Argentina, the US and across the region. We connect WhatsApp to your calendar and your website so appointments come in on their own. See how our [AI WhatsApp chatbot](/servicios/chatbot-whatsapp) works and book a free demo.

Table: Related services and starting prices in your currency.
| You need | Service | From |
|---|---|---|
| A page with online booking and a WhatsApp button | [Landing page](/servicios/landing-pages) | {{cop:450000}} |
| A site with scheduling, services and locations | [Custom web development](/servicios/desarrollo-web-a-medida) | {{cop:2500000}} |
| A WhatsApp bot on the official API integrated with your systems | [Custom software](/servicios/software-a-medida) | {{cop:4500000}} |
| Filling your calendar with ads | [Ads management](/servicios/administracion-de-ads) | {{cop:450000,usd:200}} / month |

See [pricing](/precios) (pick your country and currency), our [web development in the US](/desarrollo-web-estados-unidos) page and the guide to [hiring a nearshore web team in Latin America](/blog/nearshore-desarrollo-web-latinoamerica).

## Conclusion {#conclusion}

A WhatsApp appointment booking chatbot saves hours of repetitive messages and cuts no-shows with automatic reminders. If you get only a few bookings, start with the app and a booking link; if your calendar is the heart of the business, a bot on the official API connected to your calendar is worth it. If you want us to build it with you, [get in touch](/#contacto).
`,
  faq: [
    { q: "How do I build a WhatsApp chatbot to book appointments?", a: "You connect the official WhatsApp API (WhatsApp Business Platform) to your calendar or scheduling system. The bot asks for the service, shows open slots, books, confirms and sends reminders." },
    { q: "Can I book appointments on WhatsApp for free?", a: "With the free WhatsApp Business app you can send a greeting with a link to your online calendar, but automatic booking inside the chat requires the official API, which charges for certain messages." },
    { q: "How much does an appointment booking chatbot cost?", a: "It depends on scope. At K&T Code a landing page with online booking starts at $450,000 COP and a bot of your own on the official API, built as custom software, at $4,500,000 COP; the pricing page shows them in your currency." },
    { q: "Is it safe to book medical appointments on WhatsApp?", a: "Yes, if you use the official API, ask only for the data the appointment needs, share your privacy notice and keep clinical information in your own system, not in the chat." },
  ],
  sources: [
    { title: "Meta for Developers: WhatsApp Business Platform", url: "https://developers.facebook.com/docs/whatsapp" },
    { title: "Meta for Developers: WhatsApp Business Platform pricing", url: "https://developers.facebook.com/docs/whatsapp/pricing" },
    { title: "WhatsApp Business: app features", url: "https://business.whatsapp.com/products/business-app" },
    { title: "Google for Developers: Google Calendar API", url: "https://developers.google.com/calendar/api" },
    { title: "HHS: HIPAA for professionals", url: "https://www.hhs.gov/hipaa/for-professionals/index.html" },
    { title: "Argentina.gob.ar: Law 25,326 on personal data protection", url: "https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790" },
  ],
};

export default post;
