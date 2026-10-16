import type { MdPost } from "../../markdown";

const post: MdPost = {
  tldr: [
    "Wompi (Bancolombia) charges approx. 2.65% + COP 700 per transaction and pays out automatically to Bancolombia accounts.",
    "Mercado Pago charges approx. 2.99% + COP 900; the money sits in your Mercado Pago account and moves to banks in 24 to 48 hours.",
    "PayU charges approx. 3.49% + COP 900 and is strong on international cards.",
    "For 100% Colombian sales we recommend Wompi; for international payments, add another gateway. Always check current rates.",
  ],
  md: `
Your payment gateway directly affects your conversion and your margin. A fee one point higher, across thousands of sales, is a lot of money. We compare the three most used options in Colombia.

## How Colombians pay online {#context}

PSE (Colombia's bank-transfer system) and mobile transfers (Nequi, Daviplata) are among the favorite methods, along with cards. Your gateway should offer the PSE button with automatic payment verification so you don't lose sales.

## Fees and payment methods {#comparison}

Table: Comparison of gateways in Colombia (reference rates).
| Gateway | Standard fee | Main methods | Payouts |
|---|---|---|---|
| Wompi (Bancolombia) | 2.65% + COP 700 | Bancolombia button, Nequi, PSE, cards | Automatic to Bancolombia accounts |
| Mercado Pago | 2.99% + COP 900 | Mercado Pago balance, cards, PSE, cash | Instant in the account; 24 to 48 h to banks |
| PayU | 3.49% + COP 900 | International cards, PSE, cash | Withdrawal on request |

:::warn Rates change
These figures are for reference. Before integrating, check each gateway's current rates on its official page and ask about plans for your volume.
:::

## Tax withholdings {#taxes}

If you're a legal entity or registered for VAT, gateways may apply withholding taxes (ReteFuente, ReteICA and ReteIVA) on the amounts collected. Ask your accountant how they affect your cash flow.

## What each one costs you {#simulation}

Table: Estimated fee on a COP 200,000 sale.
| Gateway | Fee | You receive approx. |
|---|---|---|
| Wompi | COP 6,000 | COP 194,000 |
| Mercado Pago | COP 6,880 | COP 193,120 |
| PayU | COP 7,880 | COP 192,120 |

*Before withholdings and taxes.*

## Our recommendation {#recommendation}

- **100% Colombian commerce:** Wompi, for its integration with Bancolombia, Nequi and PSE and automatic payouts.
- **Small businesses just starting:** Bold or Mercado Pago, because opening the account is easy.
- **International sales:** add a gateway that is strong on foreign cards and dollar payments.

A custom store can have more than one gateway at the same time and let the customer choose. See [how much an online store costs in Colombia](/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026).
`,
  faq: [
    { q: "What's the best gateway for online stores in Colombia?", a: "For domestic sales, Wompi is one of the most convenient thanks to the Bancolombia button, Nequi and PSE and its reference fee of 2.65% + COP 700. Bold and Mercado Pago stand out for how easy they are to start with." },
    { q: "How long do sales take to reach my account?", a: "Wompi pays out automatically to Bancolombia accounts; Mercado Pago makes the money available in your account immediately and transfers it to banks in 24 to 48 hours." },
  ],
  sources: [
    { title: "Wompi: rates", url: "https://wompi.com/es/co/tarifas" },
    { title: "Mercado Pago: online payment costs", url: "https://www.mercadopago.com.co/ayuda/costo-cobrar-online_328" },
    { title: "PayU Colombia: rates", url: "https://colombia.payu.com/tarifas/" },
    { title: "DIAN", url: "https://www.dian.gov.co/" },
  ],
};

export default post;
