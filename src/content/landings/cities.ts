import type { Landing, LandingCopy } from "./types";

type CityData = { slug: string; name: string; region: string; lat: number; lng: number; color: Landing["color"]; projects: string[]; sectors: string[]; intro: string; local: string; meet: string };

const CITIES: CityData[] = [
  {
    slug: "cucuta",
    name: "Cúcuta",
    region: "Norte de Santander",
    lat: 7.8939,
    lng: -72.5078,
    color: "green",
    projects: ["olimpiadas-robotica-up"],
    sectors: ["Textil y confección", "Calzado y marroquinería", "Clínicas y odontología", "Comercio fronterizo y logística", "Inmobiliarias y constructoras", "Software y automatización"],
    intro: "Diseñamos y desarrollamos páginas web en Cúcuta para captar consultas por WhatsApp, presentar tu empresa o vender en línea. K&T Code tiene su sede principal en San José de Cúcuta y atiende empresas de Los Patios, Villa del Rosario y Norte de Santander, de forma presencial y virtual. Landing pages desde $450.000 COP, sitios corporativos desde $2.500.000 COP y tiendas desde $1.300.000 COP.",
    local: "Conocemos la economía de la región: comercio fronterizo, textiles, calzado, salud y construcción. Una landing puede ayudarte a recibir consultas por WhatsApp; un sitio corporativo, a explicar tus servicios; y una tienda virtual, a vender con pagos en línea. Definimos contigo las páginas, el catálogo y las integraciones antes de cotizar.",
    meet: "Sí. Podemos reunirnos en persona en Cúcuta (por ejemplo en Caobos o el Centro) o por videollamada.",
  },
  {
    slug: "bogota",
    name: "Bogotá",
    region: "Cundinamarca",
    lat: 4.711,
    lng: -74.0721,
    color: "yellow",
    projects: ["cxellence-group", "motofox", "qvareli", "eccocia", "academia-sea", "nosky-group", "traum-drop"],
    sectors: ["Consultoría B2B", "Ingeniería y construcción", "Moda y comercio", "Educación", "Automotriz", "Turismo"],
    intro: "Bogotá es la ciudad donde más proyectos hemos entregado: CXellence Group, Motofox, Qvareli, Eccocia, Academia SEA, Noskygroup y Traum Drop, entre otros. Desarrollamos sitios corporativos B2B, tiendas virtuales y plataformas a la medida para empresas bogotanas, en remoto y con entregas por etapas.",
    local: "En un mercado tan competido como el bogotano, la diferencia está en un diseño propio, una web que carga en menos de un segundo y un SEO que te ponga frente a clientes empresariales.",
    meet: "Trabajamos por videollamada con reuniones de seguimiento por etapa; si el proyecto lo requiere coordinamos una visita.",
  },
  {
    slug: "medellin",
    name: "Medellín",
    region: "Antioquia",
    lat: 6.2442,
    lng: -75.5812,
    color: "red",
    projects: ["telas-real", "psicowork"],
    sectors: ["Textil y moda", "Salud mental y bienestar", "Comercio B2B", "Tecnología", "Servicios profesionales"],
    intro: "Desde Medellín nos han confiado proyectos como Telas Real, el catálogo B2B con más de 850 referencias, y Psicowork, un portal de psicología clínica y organizacional. Desarrollamos páginas web, tiendas y software a la medida para empresas antioqueñas, en remoto.",
    local: "La industria textil, de moda y de servicios de Medellín necesita catálogos rápidos y procesos de cotización simples: es lo que construimos.",
    meet: "Por videollamada, con avances que puedes revisar en línea en cada etapa.",
  },
  {
    slug: "cali",
    name: "Cali",
    region: "Valle del Cauca",
    lat: 3.4516,
    lng: -76.532,
    color: "yellow",
    projects: ["telas-real", "gmx-gaming", "casa-medina"],
    sectors: ["Comercio y distribución", "Salud", "Agroindustria", "Turismo", "Servicios profesionales"],
    intro: "Trabajamos en remoto con empresas de Cali y del Valle del Cauca que necesitan una web propia: sitios corporativos, tiendas virtuales con pagos colombianos y software a la medida, con el mismo método y los mismos tiempos que en el resto del país.",
    local: "Para un negocio caleño, una web rápida con WhatsApp integrado y SEO local es la forma más directa de captar clientes en la ciudad y vender a todo Colombia.",
    meet: "Por videollamada, con entregas por etapas y revisiones en línea.",
  },
  {
    slug: "barranquilla",
    name: "Barranquilla",
    region: "Atlántico",
    lat: 10.9685,
    lng: -74.7813,
    color: "green",
    projects: ["occ-partes", "eccodotaciones", "aerolinea-santander"],
    sectors: ["Logística y puerto", "Comercio B2B", "Industria", "Turismo", "Salud"],
    intro: "Trabajamos en remoto con empresas de Barranquilla y la región Caribe: sitios corporativos para el sector logístico e industrial, catálogos B2B, tiendas virtuales y software a la medida.",
    local: "Para empresas de logística, industria y comercio, un catálogo técnico rápido y bien posicionado es una herramienta comercial que trabaja todos los días.",
    meet: "Por videollamada, con avances revisables en línea en cada etapa.",
  },
];

/** Textos en inglés de cada ciudad (mismo orden de ideas que la versión en español). */
const CITY_EN: Record<string, { sectors: string[]; intro: string; local: string; meet: string }> = {
  cucuta: {
    sectors: ["Textiles and apparel", "Footwear and leather goods", "Clinics and dentistry", "Cross-border trade and logistics", "Real estate and construction", "Software and automation"],
    intro: "We design and build websites in Cúcuta to generate WhatsApp inquiries, present your company or sell online. K&T Code is based in San José de Cúcuta and serves companies in Los Patios, Villa del Rosario and Norte de Santander, in person and remotely. Landing pages from 450,000 COP, corporate sites from 2,500,000 COP and stores from 1,300,000 COP.",
    local: "We know the region's economy: cross-border trade, textiles, footwear, healthcare and construction. A landing page can generate WhatsApp inquiries, a corporate site can explain your services, and an online store can sell with online payments. We agree on pages, catalog size and integrations before quoting.",
    meet: "Yes. We can meet in person in Cúcuta (for example in Caobos or downtown) or by video call.",
  },
  bogota: {
    sectors: ["B2B consulting", "Engineering and construction", "Fashion and retail", "Education", "Automotive", "Tourism"],
    intro: "Bogotá is the city where we've delivered the most projects: CXellence Group, Motofox, Qvareli, Eccocia, Academia SEA, Noskygroup and Traum Drop, among others. We build B2B corporate sites, online stores and custom platforms for Bogotá companies, remotely and with staged deliveries.",
    local: "In a market as competitive as Bogotá's, the difference is an original design, a website that loads in under a second and SEO that puts you in front of business clients.",
    meet: "We work by video call with follow-up meetings at each stage; if the project needs it, we arrange a visit.",
  },
  medellin: {
    sectors: ["Textiles and fashion", "Mental health and wellbeing", "B2B commerce", "Technology", "Professional services"],
    intro: "From Medellín, clients have trusted us with projects such as Telas Real, the B2B catalog with more than 850 SKUs, and Psicowork, a clinical and organizational psychology portal. We build websites, stores and custom software for companies in Antioquia, remotely.",
    local: "Medellín's textile, fashion and services industries need fast catalogs and simple quoting processes: that's what we build.",
    meet: "By video call, with progress you can review online at every stage.",
  },
  cali: {
    sectors: ["Retail and distribution", "Healthcare", "Agribusiness", "Tourism", "Professional services"],
    intro: "We work remotely with companies in Cali and Valle del Cauca that need a website of their own: corporate sites, online stores with Colombian payments and custom software, with the same method and timelines as in the rest of the country.",
    local: "For a business in Cali, a fast website with WhatsApp built in and local SEO is the most direct way to win customers in the city and sell across Colombia.",
    meet: "By video call, with staged deliveries and online reviews.",
  },
  barranquilla: {
    sectors: ["Logistics and port", "B2B commerce", "Industry", "Tourism", "Healthcare"],
    intro: "We work remotely with companies in Barranquilla and the Caribbean region: corporate sites for the logistics and industrial sectors, B2B catalogs, online stores and custom software.",
    local: "For logistics, industrial and trading companies, a fast, well-ranked technical catalog is a sales tool that works every day.",
    meet: "By video call, with progress you can review online at every stage.",
  },
};

const copyEn = (c: CityData): LandingCopy | undefined => {
  const e = CITY_EN[c.slug];
  if (!e) return undefined;
  return {
    title: `Website development in ${c.name}: custom design and software`,
    description: `Websites, online stores and custom software for companies in ${c.name}, ${c.region}. Original design, sub-second loading and local SEO. Landing pages from 450,000 COP.`,
    eyebrow: `web development · ${c.name.toLowerCase()}, ${c.region.toLowerCase()}`,
    h1: `Website development in ${c.name}`,
    lead: e.intro,
    facts: [["Landing", "From 450,000"], ["Corporate", "From 2,500,000"], ["Store", "From 1,300,000"], ["Payment", "50% / 50%"]],
    includesTitle: `Why companies in ${c.name} choose us`,
    includes: [
      { t: "Original design", d: "Your brand, not a template shared by thousands of businesses." },
      { t: "Direct engineering", d: "You talk to the people who design and code, with no middlemen or subcontracting." },
      { t: "Speed", d: "Your website loads in under a second, on mobile data too." },
      { t: "Local SEO", d: `Structure and data to show up when people search for your service in ${c.name}.` },
      { t: "Colombian payments", d: "Wompi, Bold, PayU, PSE and Nequi built in." },
      { t: "Code ownership", d: "The code, the domain and the accounts are in your name." },
    ],
    forWhoTitle: `Sectors we serve in ${c.name}`,
    forWho: e.sectors,
    body: `
## Web development for companies in ${c.name} {#local}

${e.local}

Table: Web development plans for companies in ${c.name} (2026).
| Plan | From | Delivery | Ideal for |
|---|---|---|---|
| Landing page | 450,000 COP | 7 to 12 days | Campaigns and lead generation |
| Corporate site | 2,500,000 COP | 15 to 25 days | The company's complete presence |
| Online store | 1,300,000 COP | 25 to 40 days | Selling online with Colombian payments |
| Custom software | 4,500,000 COP | 4 to 12 weeks | Dashboards, platforms and automation |
${c.slug === "cucuta" ? `
These are starting prices. We confirm scope, integrations and delivery in the quote. Website timelines start once we have your copy and brand assets; custom software is planned by milestones. See [plans and inclusions](/precios) or tell us what your business needs through the contact form.

## A project in Cúcuta: XIX Robotics Olympiad {#local-project}

We built the [XIX Robotics Olympiad platform](/proyectos/olimpiadas-robotica-up), an event of the Mechatronics Engineering Program at Universidad de Pamplona, in collaboration with engineer Jeisson Martínez. It includes user accounts with email verification, online team pre-registration and payment receipt upload, nine categories with their rules, stage-based fees and the event calendar, plus a history of previous editions and sponsors.

This case describes our development collaboration on the event platform; it does not imply institutional endorsement of K&T Code.
` : ""}
`,
    faqs: [
      { q: `How much does a website cost in ${c.name}?`, a: "With K&T Code a landing page starts at 450,000 COP, a corporate site at 2,500,000 COP and an online store at 1,300,000 COP." },
      { q: "How does payment work?", a: "50% when design starts and 50% after testing and launch. We accept bank transfer, Nequi, Daviplata and card." },
      { q: "Can we meet?", a: e.meet },
      { q: "How long does it take?", a: "A landing page takes 7 to 12 days, a corporate site 15 to 25 days and an online store 25 to 40 days." },
      ...(c.slug === "cucuta" ? [
        { q: "What does the starting price include?", a: "A landing page includes custom design, up to five sections, WhatsApp, a contact form and initial SEO. For other plans, we agree on pages, catalog size and integrations in the quote. Domain, hosting and payment gateway fees are separate." },
        { q: "What do you need to quote my website?", a: "Tell us what your business does, whether you need inquiries or online sales, and which pages or features you need. We review the scope and confirm price and delivery. Website timelines start once we have your copy and brand assets." },
        { q: "Do you serve Los Patios and Villa del Rosario?", a: "Yes. We serve companies in Cúcuta, Los Patios, Villa del Rosario and Norte de Santander. We can arrange an in-person meeting in Cúcuta or a video call." },
      ] : []),
    ],
    keywords: [`web design ${c.name}`, `web development ${c.name}`, `website ${c.name} Colombia`, `online store ${c.name}`],
  };
};

const copy = (c: CityData): LandingCopy => ({
  title: `Desarrollo de páginas web en ${c.name}: diseño y software a la medida`,
  description: `Páginas web, tiendas virtuales y software a la medida para empresas de ${c.name}, ${c.region}. Diseño único, carga en menos de un segundo y SEO local. Landing desde $450.000 COP.`,
  eyebrow: `desarrollo web · ${c.name.toLowerCase()}, ${c.region.toLowerCase()}`,
  h1: `Desarrollo de páginas web en ${c.name}`,
  lead: c.intro,
  facts: [["Landing", "Desde $450.000"], ["Corporativo", "Desde $2.500.000"], ["Tienda", "Desde $1.300.000"], ["Pago", "50% / 50%"]],
  includesTitle: `Por qué empresas de ${c.name} nos eligen`,
  includes: [
    { t: "Diseño único", d: "Tu marca, no una plantilla que comparten miles de negocios." },
    { t: "Ingeniería directa", d: "Hablas con quien diseña y programa, sin intermediarios ni subcontratación." },
    { t: "Velocidad", d: "Tu web carga en menos de un segundo, también en datos móviles." },
    { t: "SEO local", d: `Estructura y datos para aparecer cuando buscan tu servicio en ${c.name}.` },
    { t: "Pagos colombianos", d: "Wompi, Bold, PayU, PSE y Nequi integrados." },
    { t: "Propiedad del código", d: "El código, el dominio y las cuentas quedan a tu nombre." },
  ],
  forWhoTitle: `Sectores que atendemos en ${c.name}`,
  forWho: c.sectors,
  body: `
## Desarrollo web para empresas de ${c.name} {#local}

${c.local}

Tabla: Planes de desarrollo web para empresas de ${c.name} (2026).
| Plan | Desde | Entrega | Ideal para |
|---|---|---|---|
| Landing page | $450.000 COP | 7 a 12 días | Campañas y captación |
| Sitio corporativo | $2.500.000 COP | 15 a 25 días | Presencia completa de la empresa |
| Tienda virtual | $1.300.000 COP | 25 a 40 días | Vender en línea con pagos colombianos |
| Software a medida | $4.500.000 COP | 4 a 12 semanas | Paneles, plataformas y automatización |
${c.slug === "cucuta" ? `
Son precios de partida. Confirmamos el alcance, las integraciones y la entrega en la cotización. Los plazos de las páginas web empiezan cuando tenemos los textos y el material de tu marca; el software se planea por etapas. Revisa los [planes y lo que incluyen](/precios) o cuéntanos qué necesita tu negocio en el formulario de contacto.

## Un proyecto en Cúcuta: XIX Olimpiadas de Robótica {#caso-local}

Desarrollamos la [plataforma de las XIX Olimpiadas de Robótica](/proyectos/olimpiadas-robotica-up), evento del Programa de Ingeniería Mecatrónica de la Universidad de Pamplona, en colaboración con el Ing. Jeisson Martínez. Incluye cuentas de usuario con verificación de correo, preinscripción de equipos en línea y carga del comprobante de pago, nueve categorías con su reglamento, tarifas por etapa y calendario del evento, además del registro histórico de ediciones anteriores y patrocinadores.

Este caso describe nuestra colaboración en el desarrollo de la plataforma del evento; no implica un aval institucional a K&T Code.
` : ""}
`,
  faqs: [
    { q: `¿Cuánto cuesta una página web en ${c.name}?`, a: "Con K&T Code una landing page parte de $450.000 COP, un sitio corporativo de $2.500.000 COP y una tienda virtual de $1.300.000 COP." },
    { q: "¿Cómo es el pago?", a: "50% al iniciar el diseño y 50% después de las pruebas y el lanzamiento. Aceptamos transferencia, Nequi, Daviplata y tarjeta." },
    { q: "¿Podemos reunirnos?", a: c.meet },
    { q: "¿Cuánto tarda?", a: "Una landing entre 7 y 12 días, un sitio corporativo entre 15 y 25 días y una tienda virtual entre 25 y 40 días." },
    ...(c.slug === "cucuta" ? [
      { q: "¿Qué incluye el precio de partida?", a: "Una landing incluye diseño a la medida, hasta cinco secciones, WhatsApp, formulario y SEO inicial. Para los demás planes, acordamos las páginas, el catálogo y las integraciones en la cotización. Dominio, hosting y comisiones de las pasarelas se pagan aparte." },
      { q: "¿Qué necesitan para cotizar mi página web?", a: "Cuéntanos a qué se dedica tu negocio, si necesitas recibir consultas o vender en línea, y qué páginas o funciones buscas. Revisamos el alcance y confirmamos precio y entrega. Los plazos de las páginas web empiezan cuando tenemos los textos y el material de tu marca." },
      { q: "¿Atienden empresas de Los Patios y Villa del Rosario?", a: "Sí. Atendemos empresas de Cúcuta, Los Patios, Villa del Rosario y Norte de Santander. Podemos coordinar una reunión presencial en Cúcuta o una videollamada." },
    ] : []),
  ],
  keywords: [`páginas web ${c.name}`, `desarrollo web ${c.name}`, `diseño web ${c.name}`, `tienda virtual ${c.name}`],
});

export const CITY_LANDINGS: Landing[] = CITIES.map((c) => ({
  kind: "ciudad",
  slug: `desarrollo-web-${c.slug}`,
  path: `/desarrollo-web-${c.slug}`,
  color: c.color,
  plan: "corporativo",
  serviceType: `Desarrollo web en ${c.name}`,
  projects: c.projects,
  posts: ["cuanto-cuesta-una-pagina-web-en-colombia", "como-elegir-empresa-desarrollo-web-colombia", "mejores-agencias-software-a-medida-cucuta-2026"],
  related: ["/servicios/desarrollo-web-a-medida", "/servicios/tiendas-virtuales"],
  city: { name: c.name, region: c.region, lat: c.lat, lng: c.lng },
  copy: (() => {
    const en = copyEn(c);
    return en ? { es: copy(c), en } : { es: copy(c) };
  })(),
}));
