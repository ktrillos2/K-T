import type { Landing } from "./types";

const P = (slug: string) => `/precios/${slug}`;

export const GUIDES: Landing[] = [
  {
    kind: "guia",
    slug: "precio-pagina-web-colombia",
    path: P("precio-pagina-web-colombia"),
    color: "green",
    plan: "landing",
    serviceType: "Desarrollo de páginas web",
    projects: ["cxellence-group", "aerolinea-santander", "psicowork"],
    posts: ["cuanto-cuesta-una-pagina-web-en-colombia", "agencia-vs-freelance-desarrollo-web", "cuanto-cuesta-mantenimiento-pagina-web-colombia"],
    related: ["/servicios/landing-pages", "/servicios/diseno-web-corporativo", P("precio-tienda-virtual-colombia")],
    copy: {
      es: {
        title: "Precio de una página web en Colombia (2026): tarifas y qué incluye",
        description: "Precios de páginas web en Colombia en 2026: landing page desde $450.000, sitio corporativo desde $2.500.000, tienda virtual desde $1.300.000 y software desde $4.500.000 COP. Qué incluye cada plan y costos recurrentes.",
        eyebrow: "precios · página web en Colombia",
        h1: "¿Cuánto cuesta una página web en Colombia en 2026?",
        lead: "En K&T Code una landing page cuesta desde $450.000 COP, un sitio corporativo desde $2.500.000 COP, una tienda virtual desde $1.300.000 COP y un software a medida desde $4.500.000 COP. El valor final depende de las páginas, las funciones y las integraciones. El pago se divide en 50% al iniciar y 50% contra entrega.",
        facts: [["Landing", "Desde $450.000"], ["Corporativo", "Desde $2.500.000"], ["Tienda", "Desde $1.300.000"], ["Pago", "50% / 50%"]],
        includesTitle: "Qué incluye cada proyecto",
        includes: [
          { t: "Diseño a la medida", d: "Ningún proyecto parte de una plantilla comprada." },
          { t: "Velocidad medida", d: "Pruebas de carga en móvil antes de publicar." },
          { t: "SEO inicial o técnico", d: "Según el plan: títulos, datos estructurados, sitemap y analítica." },
          { t: "WhatsApp y formularios", d: "Conectados a tu correo y a tu WhatsApp." },
          { t: "Dominio y SSL", d: "Asesoría para registrar el dominio a tu nombre y dejarlo seguro." },
          { t: "Código a tu nombre", d: "Recibes el repositorio y los accesos." },
        ],
        forWhoTitle: "Cómo elegir el plan",
        forWho: ["Landing: una campaña o un servicio puntual", "Corporativo: empresas que necesitan presencia completa", "Tienda: vender productos en línea", "Software: procesos internos o plataformas"],
        body: `
## Precios y plazos {#tabla}

Tabla: Precios de K&T Code en pesos colombianos (2026).
| Proyecto | Desde | Plazo | Incluye | No incluye |
|---|---|---|---|---|
| Landing page | $450.000 | 7 a 12 días | Diseño a la medida, hasta 5 secciones, WhatsApp, SEO inicial | Varias páginas internas, carrito |
| Sitio corporativo | $2.500.000 | 15 a 25 días | Hasta 8 páginas, contenido editable, SEO técnico, analítica | Pasarela de pagos y carrito |
| Tienda virtual | $1.300.000 | 25 a 40 días | Catálogo, carrito, pasarelas colombianas, envíos, panel de pedidos | Reglas B2B complejas o ERP avanzado |
| Tienda headless | $2.000.000 | 25 a 40 días | Vitrina a la medida conectada a WooCommerce o Shopify | — |
| Software a medida | $4.500.000 | 4 a 12 semanas | Usuarios y roles, base de datos, APIs, facturación DIAN | Módulos fuera del alcance acordado |

## Costos recurrentes {#recurrentes}

Tabla: Costos que se pagan aparte.
| Concepto | Costo aproximado | Frecuencia |
|---|---|---|
| Dominio .com, .co o .com.co | $60.000 – $160.000 COP | Anual |
| Hosting en red global | $0 – $90.000 COP | Mensual |
| Mantenimiento (opcional) | Desde $180.000 COP | Mensual |

## Freelance, plataformas o agencia {#opciones}

Tabla: Comparación de opciones para tener tu web.
| Opción | Costo | Riesgos |
|---|---|---|
| Freelance económico | $200.000 – $500.000 COP | Plantillas lentas, poco SEO y soporte incierto |
| Constructores (Wix, Shopify) | Mensualidad en dólares | Pago recurrente y código que no es tuyo |
| K&T Code | Desde $450.000 COP | Requiere objetivos de negocio claros |

::widget price-calculator
`,
        faqs: [
          { q: "¿Cuánto cobra K&T Code por una página web?", a: "Desde $450.000 COP una landing page, desde $2.500.000 COP un sitio corporativo y desde $1.300.000 COP una tienda virtual." },
          { q: "¿El precio incluye dominio y hosting?", a: "Incluye la asesoría y la configuración. El dominio y el hosting se pagan aparte y quedan a nombre de tu empresa." },
          { q: "¿Cómo se divide el pago?", a: "50% de anticipo al iniciar y 50% contra entrega, después de que revisas el sitio en un ambiente de pruebas." },
          { q: "¿Puedo editar el contenido después?", a: "Sí, en los planes corporativo y tienda recibes un panel para editar textos, productos y artículos." },
          { q: "¿Los precios cambian si estoy fuera de Colombia?", a: "Cotizamos en pesos colombianos y te mostramos el valor aproximado en tu moneda con la tasa del día." },
        ],
        keywords: ["precio página web Colombia", "cuánto cuesta una página web", "tarifas diseño web 2026"],
      },
      en: {
        title: "Website prices in Colombia (2026): rates and what's included",
        description: "Website prices in Colombia in 2026: landing page from 450,000 COP, corporate site from 2,500,000, online store from 1,300,000 and custom software from 4,500,000 COP.",
        eyebrow: "pricing · websites in Colombia",
        h1: "How much does a website cost in Colombia in 2026?",
        lead: "At K&T Code a landing page costs from 450,000 COP, a corporate site from 2,500,000 COP, an online store from 1,300,000 COP and custom software from 4,500,000 COP. The final price depends on pages, features and integrations. Payment is 50% up front and 50% on delivery.",
        facts: [["Landing", "From 450,000"], ["Corporate", "From 2,500,000"], ["Store", "From 1,300,000"], ["Payment", "50% / 50%"]],
        includesTitle: "What every project includes",
        includes: [
          { t: "Custom design", d: "No project starts from a purchased template." },
          { t: "Measured speed", d: "Mobile load tests before launch." },
          { t: "Initial or technical SEO", d: "Depending on the plan: titles, structured data, sitemap and analytics." },
          { t: "WhatsApp and forms", d: "Connected to your email and WhatsApp." },
          { t: "Domain and SSL", d: "Help registering the domain in your name and securing it." },
          { t: "Code in your name", d: "You receive the repository and access." },
        ],
        forWhoTitle: "How to choose",
        forWho: ["Landing: one campaign or service", "Corporate: companies needing a full presence", "Store: selling products online", "Software: internal processes or platforms"],
        body: `
## Prices and timelines {#table}

Table: K&T Code prices in Colombian pesos (2026).
| Project | From | Timeline | Includes |
|---|---|---|---|
| Landing page | 450,000 | 7 to 12 days | Custom design, up to 5 sections, WhatsApp, initial SEO |
| Corporate site | 2,500,000 | 15 to 25 days | Up to 8 pages, editable content, technical SEO, analytics |
| Online store | 1,300,000 | 25 to 40 days | Catalog, cart, local gateways, shipping, order panel |
| Headless store | 2,000,000 | 25 to 40 days | Custom storefront connected to WooCommerce or Shopify |
| Custom software | 4,500,000 | 4 to 12 weeks | Users and roles, database, APIs, e-invoicing |

::widget price-calculator
`,
        faqs: [
          { q: "How much does K&T Code charge for a website?", a: "From 450,000 COP for a landing page, 2,500,000 COP for a corporate site and 1,300,000 COP for an online store." },
          { q: "How is payment split?", a: "50% up front and 50% on delivery, after you review the site in a staging environment." },
        ],
        keywords: ["website price Colombia", "web design rates"],
      },
    },
  },
  {
    kind: "guia",
    slug: "precio-tienda-virtual-colombia",
    path: P("precio-tienda-virtual-colombia"),
    color: "yellow",
    plan: "tienda",
    serviceType: "Desarrollo de tiendas virtuales",
    projects: ["telas-real", "motofox", "traum-drop"],
    posts: ["cuanto-cuesta-una-tienda-virtual-en-colombia-2026", "wompi-vs-mercado-pago-vs-payu-colombia", "shopify-vs-woocommerce-colombia"],
    related: ["/servicios/tiendas-virtuales", "/servicios/woocommerce-headless", P("precio-pagina-web-colombia")],
    copy: {
      es: {
        title: "Precio de una tienda virtual en Colombia (2026): costos y comisiones",
        description: "Cuánto cuesta una tienda virtual en Colombia: desarrollo desde $1.300.000 COP, tienda headless desde $2.000.000 COP, comisiones de Wompi, Bold y PayU, dominio, hosting y mantenimiento.",
        eyebrow: "precios · tienda virtual",
        h1: "¿Cuánto cuesta una tienda virtual en Colombia?",
        lead: "Una tienda virtual a la medida con K&T Code cuesta desde $1.300.000 COP y una tienda headless desde $2.000.000 COP, con pasarelas colombianas integradas y sin comisión de plataforma. Aparte pagas el dominio (anual), el hosting y la comisión de la pasarela por cada venta (aprox. 2,65% a 3,5% más un valor fijo).",
        facts: [["Tienda", "Desde $1.300.000"], ["Headless", "Desde $2.000.000"], ["Entrega", "25 a 40 días"], ["Comisión plataforma", "0%"]],
        includesTitle: "Qué incluye",
        includes: [
          { t: "Catálogo y variantes", d: "Tallas, colores, presentaciones y categorías." },
          { t: "Pasarelas", d: "Wompi, Bold o PayU con PSE, Nequi y tarjetas." },
          { t: "Envíos", d: "Tarifas por ciudad o integración con transportadoras." },
          { t: "Panel de pedidos", d: "Estados, inventario y clientes." },
          { t: "Checkout corto", d: "Menos pasos, más ventas en móvil." },
          { t: "SEO de producto", d: "Fichas indexables con precio y disponibilidad." },
        ],
        forWhoTitle: "Antes de cotizar, ten claro",
        forWho: ["Cuántos productos y variantes vendes", "A qué ciudades envías", "Qué pasarela prefieres", "Si necesitas factura electrónica automática"],
        body: `
## Desglose de costos {#costos}

Tabla: Costos de una tienda virtual a la medida (2026).
| Concepto | Costo | Frecuencia |
|---|---|---|
| Desarrollo de la tienda | Desde $1.300.000 COP | Pago único |
| Tienda headless | Desde $2.000.000 COP | Pago único |
| Dominio | $60.000 – $160.000 COP | Anual |
| Hosting en red global | $0 – $90.000 COP | Mensual |
| Comisión de pasarela | Aprox. 2,65% – 3,5% + valor fijo | Por venta |

## Comisiones de pasarelas (referencia) {#pasarelas}

Tabla: Tarifas de referencia; verifica las vigentes en cada pasarela.
| Pasarela | Comisión de referencia | Abono |
|---|---|---|
| Wompi | 2,65% + $700 COP | Automático a Bancolombia |
| Bold | 2,99% + $900 COP + IVA | A cualquier banco |
| PayU | 3,29% – 3,49% + $900 COP | Programable |
| Mercado Pago | 2,99% + $900 COP | Inmediato en la cuenta |

::widget price-calculator
`,
        faqs: [
          { q: "¿Cuánto cuesta una tienda virtual en Colombia?", a: "Con K&T Code desde $1.300.000 COP, o desde $2.000.000 COP en versión headless, más dominio, hosting y la comisión de la pasarela por venta." },
          { q: "¿Cobran comisión por cada venta?", a: "No. Solo pagas la comisión de la pasarela de pagos que elijas." },
          { q: "¿Cuánto tarda?", a: "Entre 25 y 40 días según el tamaño del catálogo y las integraciones." },
        ],
        keywords: ["precio tienda virtual Colombia", "cuánto cuesta una tienda online", "costo e-commerce Colombia"],
      },
      en: {
        title: "Online store prices in Colombia (2026): costs and fees",
        description: "How much an online store costs in Colombia: development from 1,300,000 COP, headless store from 2,000,000 COP, gateway fees, domain, hosting and maintenance.",
        eyebrow: "pricing · online store",
        h1: "How much does an online store cost in Colombia?",
        lead: "A custom online store with K&T Code costs from 1,300,000 COP, and a headless store from 2,000,000 COP, with local gateways included and no platform fee. Domain (yearly), hosting and the gateway fee per sale (about 2.65% to 3.5% plus a fixed amount) are separate.",
        facts: [["Store", "From 1,300,000"], ["Headless", "From 2,000,000"], ["Delivery", "25 to 40 days"], ["Platform fee", "0%"]],
        includesTitle: "What's included",
        includes: [
          { t: "Catalog and variants", d: "Sizes, colors, presentations and categories." },
          { t: "Gateways", d: "Wompi, Bold or PayU with PSE, Nequi and cards." },
          { t: "Shipping", d: "Rates by city or carrier integration." },
          { t: "Order panel", d: "Statuses, stock and customers." },
          { t: "Short checkout", d: "Fewer steps, more mobile sales." },
          { t: "Product SEO", d: "Indexable product pages with price and availability." },
        ],
        forWhoTitle: "Before getting a quote, know",
        forWho: ["How many products and variants you sell", "Which cities you ship to", "Which gateway you prefer", "Whether you need automatic e-invoicing"],
        faqs: [
          { q: "How much does an online store cost in Colombia?", a: "With K&T Code from 1,300,000 COP, or from 2,000,000 COP headless, plus domain, hosting and the gateway fee per sale." },
          { q: "Do you charge a fee per sale?", a: "No. You only pay the fee of the payment gateway you choose." },
        ],
        keywords: ["online store price Colombia", "e-commerce cost"],
      },
    },
  },
  {
    kind: "guia",
    slug: "precio-software-a-medida",
    path: P("precio-software-a-medida"),
    color: "red",
    plan: "software",
    serviceType: "Desarrollo de software a medida",
    projects: ["gmx-gaming", "brahneyker", "brambila-inmobiliaria"],
    posts: ["cuanto-cuesta-desarrollar-software-a-medida-colombia", "calcular-roi-automatizacion-software-ia", "cuanto-cuesta-automatizar-procesos-ia-colombia"],
    related: ["/servicios/software-a-medida", P("precio-pagina-web-colombia"), "/servicios/mantenimiento-web"],
    copy: {
      es: {
        title: "Precio de software a medida en Colombia (2026): rangos y modelos",
        description: "Cuánto cuesta un software a medida en Colombia: panel o MVP desde $4.500.000 COP, portal B2B desde $9.000.000 COP y plataforma SaaS desde $18.000.000 COP. Fases, plazos y factores de costo.",
        eyebrow: "precios · software a medida",
        h1: "¿Cuánto cuesta un software a medida en Colombia?",
        lead: "Un software a medida en Colombia cuesta desde $4.500.000 COP para un panel administrativo o MVP, entre $9.000.000 y $18.000.000 COP para un portal B2B y desde $18.000.000 COP para una plataforma SaaS completa. El precio depende de la lógica de negocio, las integraciones, los roles y la infraestructura.",
        facts: [["MVP", "Desde $4.500.000"], ["Portal B2B", "$9 – 18 M"], ["SaaS", "Desde $18 M"], ["Plazo", "4 a 20 semanas"]],
        includesTitle: "Qué compone el presupuesto",
        includes: [
          { t: "Descubrimiento", d: "Procesos, usuarios, reglas y alcance exacto." },
          { t: "Diseño de pantallas", d: "Flujos validados antes de programar." },
          { t: "Servidor y datos", d: "Modelo de datos, autenticación, roles y permisos." },
          { t: "Integraciones", d: "DIAN, pasarelas, CRM, ERP, WhatsApp e IA." },
          { t: "Calidad", d: "Pruebas funcionales, de carga y de seguridad." },
          { t: "Publicación y soporte", d: "Despliegue continuo y acompañamiento." },
        ],
        forWhoTitle: "Factores que más mueven el precio",
        forWho: ["Complejidad de la lógica de negocio", "Número de integraciones externas", "Tipos de usuario y permisos", "Volumen de usuarios y disponibilidad"],
        body: `
## Rangos por tipo de software {#rangos}

Tabla: Rangos de referencia en Colombia (2026).
| Tipo | Rango en COP | Rango en USD | Plazo |
|---|---|---|---|
| Panel administrativo o MVP | $4.500.000 – $9.000.000 | $1.200 – $2.300 | 3 a 5 semanas |
| Portal B2B o sistema para clientes | $9.000.000 – $18.000.000 | $2.300 – $4.500 | 6 a 10 semanas |
| Plataforma SaaS completa | $18.000.000 – $45.000.000+ | $4.500 – $11.000+ | 12 a 20 semanas |
| Agente de IA con 2 integraciones | Desde $4.500.000 | Desde $1.200 | 2 a 4 semanas |
`,
        faqs: [
          { q: "¿Cuánto cuesta un software a medida en Colombia?", a: "Desde $4.500.000 COP para un panel o MVP, entre $9.000.000 y $18.000.000 COP para un portal B2B y desde $18.000.000 COP para una plataforma SaaS." },
          { q: "¿Cobran por horas o por proyecto?", a: "Cotizamos por proyecto o por etapas con alcance definido, para que sepas el costo total desde el inicio." },
          { q: "¿El código es mío?", a: "Sí, recibes el código fuente, la base de datos y la propiedad intelectual." },
        ],
        keywords: ["precio software a medida", "cuánto cuesta un software", "costo desarrollo de software Colombia"],
      },
      en: {
        title: "Custom software prices in Colombia (2026): ranges and models",
        description: "How much custom software costs in Colombia: admin panel or MVP from 4,500,000 COP, B2B portal from 9,000,000 COP and SaaS platform from 18,000,000 COP.",
        eyebrow: "pricing · custom software",
        h1: "How much does custom software cost in Colombia?",
        lead: "Custom software in Colombia costs from 4,500,000 COP for an admin panel or MVP, 9 to 18 million COP for a B2B portal and from 18 million COP for a full SaaS platform. Price depends on business logic, integrations, roles and infrastructure.",
        facts: [["MVP", "From 4.5 M"], ["B2B portal", "9 – 18 M"], ["SaaS", "From 18 M"], ["Timeline", "4 to 20 weeks"]],
        includesTitle: "What makes up the budget",
        includes: [
          { t: "Discovery", d: "Processes, users, rules and exact scope." },
          { t: "Screen design", d: "Flows validated before coding." },
          { t: "Server and data", d: "Data model, authentication, roles and permissions." },
          { t: "Integrations", d: "E-invoicing, gateways, CRM, ERP, WhatsApp and AI." },
          { t: "Quality", d: "Functional, load and security testing." },
          { t: "Launch and support", d: "Continuous deployment and follow-up." },
        ],
        forWhoTitle: "What moves the price most",
        forWho: ["Business logic complexity", "Number of external integrations", "User types and permissions", "User volume and availability"],
        faqs: [
          { q: "How much does custom software cost in Colombia?", a: "From 4.5 million COP for a panel or MVP, 9 to 18 million COP for a B2B portal and from 18 million COP for a SaaS platform." },
          { q: "Is the code mine?", a: "Yes, you receive the source code, database and intellectual property." },
        ],
        keywords: ["custom software price", "software development cost Colombia"],
      },
    },
  },
];
