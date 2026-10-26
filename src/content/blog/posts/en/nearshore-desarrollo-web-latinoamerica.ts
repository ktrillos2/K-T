import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Nearshore web development means hiring a team in a nearby country with overlapping time zones; for US companies, that's usually Latin America.",
    "Compared with offshore (Asia or Eastern Europe), nearshore gives you real-time collaboration during your workday, closer cultural fit and shorter feedback loops.",
    "Colombia shares US Eastern time for much of the year and Central time during daylight saving, which makes daily calls and fast iterations easy.",
    "K&T Code builds custom websites, online stores and software for US companies from Colombia, in English and Spanish, with the code delivered in your name.",
  ],
  md: `
If you're in the United States and have searched "how much does it cost to hire a web developer", you've probably landed on three options: a local agency, a freelancer marketplace or an offshore team on the other side of the world. There's a fourth that more US companies choose every year: **nearshore development in Latin America**.

## What is nearshore software development? {#que-es}

**Nearshore** means outsourcing to a nearby country with similar time zones. For US companies, that usually means Mexico, Colombia, Costa Rica, Argentina or Brazil. **Offshore** means a distant country with a large time difference, like India or the Philippines. **Onshore** means hiring within your own country.

Table: Onshore vs. nearshore vs. offshore.
| Criterion | Onshore (US) | Nearshore (LATAM) | Offshore (Asia, etc.) |
|---|---|---|---|
| Cost | Highest | Moderate | Lowest |
| Time zone overlap | Full | Full or nearly full | Little or none |
| Real-time meetings | Easy | Easy | Hard (early or late calls) |
| Cultural and business fit | High | High | Varies |
| Travel for in-person work | Easy | Short flights | Long trips |

## Why US companies choose Latin America {#por-que}

- **Same workday:** Colombia uses UTC−5 all year, which matches US Eastern time in winter and Central time in summer. Your team answers during your business hours.
- **Faster feedback:** questions get answered the same day instead of the next morning, so projects move faster.
- **Bilingual teams:** many LATAM studios work fluently in English and Spanish, which also helps if you sell to the US Hispanic market.
- **Better value:** you get senior-level work at rates below most US agencies.
- **Short trips:** Bogotá, Medellín or Mexico City are a few hours' flight from Miami, Houston or Atlanta.

## Nearshore vs. offshore: what the price difference hides {#costos}

Offshore hourly rates can look cheaper, but the total cost of a project includes more than the rate: time lost to delays between questions and answers, rework from misunderstandings and the hours your own team spends managing. With nearshore, those hidden costs drop because collaboration happens in real time.

:::tip How to compare quotes
Compare the cost of the whole project, not the hourly rate. Ask for a fixed scope, a timeline with milestones, the tech stack and who owns the code at the end.
:::

## How to hire a nearshore web development partner {#como-contratar}

1. **Define the goal:** a marketing site, an online store, a web app or an internal tool.
2. **Review real work:** ask for live projects, not just mockups, and test how fast they load.
3. **Check communication:** do they answer during your hours? Can they write and present clearly in English?
4. **Ask about the stack:** modern frameworks (like Next.js) make the site faster and easier to maintain.
5. **Protect ownership:** the code, domain and accounts should be in your company's name.
6. **Start small:** a first milestone or a landing page is the best way to test the relationship.

:::checklist id="nearshore-checklist" title="Is nearshore a good fit for your project?"
- I want to collaborate in real time during my workday
- I need quality similar to a US agency but with a tighter budget
- I need a bilingual site (English and Spanish)
- My project needs iterations and fast feedback
- I want to own the code and all accounts
:::

## How K&T Code helps US companies {#k-t-code}

K&T Code is a web development studio based in Colombia that works with companies in the United States and Latin America. We design every project from scratch (no templates), build it with Next.js, optimize it for Google and AI search, and hand over the code in your name.

Table: Services and starting prices (COP; see them in USD on /precios).
| You need | Service | From |
|---|---|---|
| A high-converting landing page | [Landing page](/servicios/landing-pages) | $450,000 |
| An online store | [Online store](/servicios/tiendas-virtuales) | $1,300,000 |
| A fast custom website | [Custom web development](/servicios/desarrollo-web-a-medida) | $2,500,000 |
| A web app or internal platform | [Custom software](/servicios/software-a-medida) | $4,500,000 |

On [pricing](/precios), choose United States to see every plan in US dollars, or browse [our projects](/proyectos) to see live work.

## Test what you learned {#quiz}

:::quiz
? What does nearshore mean for a US company?
- Hiring only inside the US
- *Hiring a team in a nearby country with overlapping time zones, like Latin America
- Hiring a team in Asia
= Nearshore means nearby geography and time zones; for the US that's usually Latin America.
? What's the main advantage of nearshore over offshore?
- It's always the cheapest option
- *Real-time collaboration during your workday
- It doesn't require contracts
= Shared hours mean faster answers, fewer misunderstandings and quicker projects.
? What should you compare between quotes?
- Only the hourly rate
- *The total project cost, timeline, stack and code ownership
- The logo of the agency
= The hourly rate hides delays and rework; the total cost and ownership tell the full story.
:::

## Conclusion {#conclusion}

Nearshore development gives US companies the best of both worlds: the collaboration of a local team and the value of working with Latin America. If you're comparing options, see [how to choose a web development company](/blog/como-elegir-empresa-desarrollo-web-colombia) or [tell us about your project](/#contacto): we reply the same business day, in English.
`,
  faq: [
    { q: "What is nearshore web development?", a: "It's hiring a web development team in a nearby country with overlapping time zones. For US companies, that usually means Latin America, such as Colombia or Mexico." },
    { q: "What's the difference between nearshore and offshore?", a: "Nearshore teams are in nearby countries with similar hours, which allows real-time collaboration. Offshore teams are far away, with large time differences." },
    { q: "Is Colombia in the same time zone as the US?", a: "Colombia uses UTC−5 all year: it matches US Eastern time in winter and Central time during daylight saving time." },
    { q: "How much does it cost to hire a web developer in Latin America?", a: "It depends on the scope. At K&T Code a landing page starts at $450,000 COP and a custom website at $2,500,000 COP; on kytcode.lat/precios you can see every plan in US dollars." },
  ],
  sources: [
    { title: "timeanddate.com: time zone in Colombia", url: "https://www.timeanddate.com/time/zone/colombia" },
    { title: "Google: Core Web Vitals", url: "https://web.dev/articles/vitals" },
  ],
};

export default post;
