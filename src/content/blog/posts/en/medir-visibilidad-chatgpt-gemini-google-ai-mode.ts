import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "AI visibility isn't measured in clicks: it's measured in mentions, linked citations, crawler access and the accuracy of what AI says about you.",
    "Audit in four phases: technical access, structured data, a prompt battery and an analysis of cited sources.",
    "Allow OAI-SearchBot (ChatGPT Search) and PerplexityBot; deciding on GPTBot (training) is your company's policy call.",
  ],
  md: `
Search Console tells you how many clicks you got from Google, but not whether ChatGPT recommends you. For that you have to measure differently: **does AI mention you, link to you and say correct things about you?**

## The 4-phase GEO audit framework {#phases}

1. **Technical access:** confirm AI crawlers aren't being blocked (403 errors or firewall challenges).
2. **Entity and structured data:** organization, local business, services and FAQs.
3. **Prompt battery:** commercial, comparison and technical questions, in clean sessions.
4. **Attribution:** how many answers link to your site and whether your llms.txt is available.

## Key metrics {#metrics}

Table: AI visibility metrics.
| Metric | What it measures | Calculation | Indicative target |
|---|---|---|---|
| Share of voice in the model | Answers that recommend you vs. competitors | Mentions ÷ answers × 100 | Grow month over month in your city and sector |
| Citation rate | Answers that link to your site | Answers with a link ÷ mentions × 100 | Most of your mentions |
| Entity accuracy | Whether AI gets your prices, city and services right | Review errors in the answers | Zero contradictions |
| Crawl health | 200 responses to AI bots | Server or CDN logs | 100% unblocked |

## The prompt battery {#prompts}

Run the tests in a private window, with no history and a location in Colombia. Repeat every month.

### Type A: commercial intent

*"Best web development companies in Cúcuta"*, *"Colombian agency for fast online stores"*. Do you appear in the top three? Does it describe what you do correctly?

### Type B: comparisons and prices

*"How much does a corporate website cost in Colombia in 2026"*. Does it cite your official ranges?

### Type C: technical

*"Companies in Colombia that integrate WhatsApp with Wompi and Bold"*. Does it recognize you as a reference on the topic?

:::checklist id="geo-audit" title="Monthly audit log"
- I tested 5 commercial prompts in ChatGPT
- I tested the same ones in Gemini and Perplexity
- I noted whether I appear, in what position and with what link
- I checked that the prices and city the AI mentions are correct
- I checked in the logs that AI bots get a 200 response
:::

## Crawlers: search vs. training {#bots}

- **OAI-SearchBot:** the ChatGPT Search crawler. Allow it so you can be cited; OpenAI states it doesn't use what it crawls to train models.
- **GPTBot:** collects data for training. Allowing it or not is your company's policy decision.
- **PerplexityBot** and **Google-Extended** follow the same logic on their platforms.

## How to improve so you get cited {#improve}

1. Answer within the first 40–45 words of each section.
2. Use HTML comparison tables.
3. Publish an [llms.txt](/blog/llms-txt-2026) with your services and prices.
4. Implement error-free structured data for organization, services and breadcrumbs.

Want us to audit it for you? See our [technical SEO](/servicios/seo-tecnico) service.
`,
  faq: [
    { q: "How do I know if ChatGPT recommends my company?", a: "Ask the questions your customer would ask in clean sessions, note whether you appear, in what position and with what link, and repeat every month in ChatGPT, Gemini and Perplexity." },
    { q: "Should I block GPTBot?", a: "It's your company's decision. To appear in ChatGPT Search, what matters is allowing OAI-SearchBot, which isn't used to train models." },
  ],
  sources: [
    { title: "OpenAI: Overview of OpenAI crawlers", url: "https://platform.openai.com/docs/bots" },
    { title: "Google Search Central: AI features and your website", url: "https://developers.google.com/search/docs/appearance/ai-features" },
  ],
};

export default post;
