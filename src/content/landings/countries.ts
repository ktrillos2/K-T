import type { Landing, LandingCopy } from "./types";

/**
 * Páginas por país (fuera de Colombia): desarrollo web en remoto para México, Perú, EE. UU., etc.
 * Los precios del cuerpo usan {{cop:N}} para mostrarse en la moneda del país elegido.
 * Para agregar un país: una entrada aquí y su ruta en src/app/[lang]/desarrollo-web-<slug>/page.tsx
 * (ver .claude/skills/paginas-por-pais/SKILL.md).
 */
type CountryData = {
  slug: string;
  code: string;
  name: { es: string; en: string };
  lat: number;
  lng: number;
  color: Landing["color"];
  projects: string[];
  posts: string[];
  /** Medios de pago locales que integramos. */
  payments: string;
  /** Diferencia horaria o franja con Colombia (UTC−5). */
  hours: { es: string; en: string };
  sectors: { es: string[]; en: string[] };
  intro: { es: string; en: string };
  local: { es: string; en: string };
};

const COUNTRIES: CountryData[] = [
  {
    slug: "mexico",
    code: "MX",
    name: { es: "México", en: "Mexico" },
    lat: 19.4326,
    lng: -99.1332,
    color: "red",
    projects: ["gmx-gaming"],
    posts: ["cuanto-cuesta-una-pagina-web-latinoamerica", "como-vender-por-whatsapp-business", "nearshore-desarrollo-web-latinoamerica"],
    payments: "Mercado Pago, Stripe, OXXO y SPEI",
    hours: {
      es: "Ciudad de México y Colombia comparten la hora (UTC−6 y UTC−5) la mayor parte del año: trabajamos en tu mismo horario laboral.",
      en: "Mexico City and Colombia share working hours (UTC−6 and UTC−5) most of the year: we work during your business day.",
    },
    sectors: {
      es: ["Videojuegos y eSports", "Comercio electrónico", "Servicios profesionales", "Salud y bienestar", "Inmobiliarias", "Educación"],
      en: ["Gaming and eSports", "E-commerce", "Professional services", "Health and wellness", "Real estate", "Education"],
    },
    intro: {
      es: "K&T Code diseña y desarrolla páginas web, tiendas virtuales y software a la medida para empresas de México, en remoto desde Colombia. Entregamos proyectos como la plataforma de torneos de GMX Gaming, con diseño único, carga en menos de un segundo y el código a tu nombre.",
      en: "K&T Code designs and builds custom websites, online stores and software for companies in Mexico, remotely from Colombia. We've delivered projects like GMX Gaming's tournament platform, with a unique design, sub-second load times and the code in your name.",
    },
    local: {
      es: "Trabajamos con empresas de Ciudad de México, Guadalajara, Monterrey y todo el país por videollamada, con entregas por etapas. Integramos los pagos que usan tus clientes mexicanos y optimizamos tu sitio para aparecer en Google México y en los buscadores con IA.",
      en: "We work with companies in Mexico City, Guadalajara, Monterrey and the whole country over video calls, with staged deliveries. We integrate the payment methods your Mexican customers use and optimize your site to rank on Google Mexico and in AI search.",
    },
  },
];

const table = (c: CountryData, lang: "es" | "en") =>
  lang === "es"
    ? `Tabla: Planes de desarrollo web para empresas de ${c.name.es} (precios en tu moneda).
| Plan | Desde | Entrega | Ideal para |
|---|---|---|---|
| [Landing page](/servicios/landing-pages) | {{cop:450000}} | 7 a 12 días | Campañas y captación |
| [Sitio corporativo](/servicios/diseno-web-corporativo) | {{cop:2500000}} | 15 a 25 días | Presencia completa de la empresa |
| [Tienda virtual](/servicios/tiendas-virtuales) | {{cop:1300000}} | 25 a 40 días | Vender en línea con pagos locales |
| [Software a medida](/servicios/software-a-medida) | {{cop:4500000}} | 4 a 12 semanas | Paneles, plataformas y automatización |`
    : `Table: Web development plans for companies in ${c.name.en} (prices in your currency).
| Plan | From | Delivery | Best for |
|---|---|---|---|
| [Landing page](/servicios/landing-pages) | {{cop:450000}} | 7 to 12 days | Campaigns and lead capture |
| [Corporate website](/servicios/diseno-web-corporativo) | {{cop:2500000}} | 15 to 25 days | A complete company presence |
| [Online store](/servicios/tiendas-virtuales) | {{cop:1300000}} | 25 to 40 days | Selling online with local payments |
| [Custom software](/servicios/software-a-medida) | {{cop:4500000}} | 4 to 12 weeks | Dashboards, platforms and automation |`;

const copyEs = (c: CountryData): LandingCopy => ({
  title: `Desarrollo de páginas web en ${c.name.es}: diseño y software a la medida`,
  description: `Páginas web, tiendas virtuales y software a la medida para empresas de ${c.name.es}, en remoto. Diseño único, carga en menos de un segundo, SEO y pagos locales (${c.payments}).`,
  eyebrow: `desarrollo web · ${c.name.es.toLowerCase()}`,
  h1: `Desarrollo de páginas web en ${c.name.es}`,
  lead: c.intro.es,
  facts: [["Trabajo", "100% remoto"], ["Horario", "El tuyo"], ["Pagos", "Moneda local"], ["Código", "A tu nombre"]],
  includesTitle: `Por qué empresas de ${c.name.es} nos eligen`,
  includes: [
    { t: "Diseño único", d: "Tu marca, no una plantilla que comparten miles de negocios." },
    { t: "Tu mismo horario", d: c.hours.es },
    { t: "Velocidad", d: "Tu web carga en menos de un segundo, también en datos móviles." },
    { t: "SEO local", d: `Estructura y datos para aparecer cuando buscan tu servicio en ${c.name.es}.` },
    { t: "Pagos locales", d: `${c.payments} integrados en tu tienda o plataforma.` },
    { t: "Propiedad del código", d: "El código, el dominio y las cuentas quedan a tu nombre." },
  ],
  forWhoTitle: `Sectores que atendemos en ${c.name.es}`,
  forWho: c.sectors.es,
  body: `
## Desarrollo web para empresas de ${c.name.es} {#local}

${c.local.es}

${table(c, "es")}

En [precios](/precios) eliges tu país y ves todos los planes en tu moneda. ¿Quieres saber qué cambia el valor? Lee [cuánto cuesta una página web en Latinoamérica](/blog/cuanto-cuesta-una-pagina-web-latinoamerica).
`,
  faqs: [
    { q: `¿Cuánto cuesta una página web en ${c.name.es}?`, a: `Con K&T Code una landing page parte de $450.000 COP, una tienda virtual de $1.300.000 COP y un sitio corporativo de $2.500.000 COP. En kytcode.lat/precios ves los valores en la moneda de ${c.name.es}.` },
    { q: "¿Pueden trabajar con mi empresa si están en Colombia?", a: `Sí. Trabajamos en remoto con empresas de ${c.name.es} por videollamada, con entregas por etapas. ${c.hours.es}` },
    { q: "¿Cómo es el pago?", a: "50% al iniciar el diseño y 50% después de las pruebas y el lanzamiento, por transferencia internacional o tarjeta." },
    { q: "¿Cuánto tarda?", a: "Una landing entre 7 y 12 días, un sitio corporativo entre 15 y 25 días y una tienda virtual entre 25 y 40 días." },
  ],
  keywords: [`páginas web ${c.name.es}`, `desarrollo web ${c.name.es}`, `diseño web ${c.name.es}`, `tienda virtual ${c.name.es}`],
});

const copyEn = (c: CountryData): LandingCopy => ({
  title: `Web development in ${c.name.en}: custom design and software`,
  description: `Custom websites, online stores and software for companies in ${c.name.en}, built remotely. Unique design, sub-second load times, SEO and local payments (${c.payments}).`,
  eyebrow: `web development · ${c.name.en.toLowerCase()}`,
  h1: `Web development in ${c.name.en}`,
  lead: c.intro.en,
  facts: [["Work", "100% remote"], ["Hours", "Yours"], ["Payments", "Local currency"], ["Code", "In your name"]],
  includesTitle: `Why companies in ${c.name.en} choose us`,
  includes: [
    { t: "Unique design", d: "Your brand, not a template shared by thousands of businesses." },
    { t: "Your working hours", d: c.hours.en },
    { t: "Speed", d: "Your website loads in under a second, even on mobile data." },
    { t: "Local SEO", d: `Structure and data to show up when people search for your service in ${c.name.en}.` },
    { t: "Local payments", d: `${c.payments} integrated into your store or platform.` },
    { t: "Code ownership", d: "The code, domain and accounts are in your name." },
  ],
  forWhoTitle: `Industries we serve in ${c.name.en}`,
  forWho: c.sectors.en,
  body: `
## Web development for companies in ${c.name.en} {#local}

${c.local.en}

${table(c, "en")}

On [pricing](/precios) you choose your country and see every plan in your currency. Want to know what changes the price? Read [how much a website costs in Latin America](/blog/cuanto-cuesta-una-pagina-web-latinoamerica).
`,
  faqs: [
    { q: `How much does a website cost in ${c.name.en}?`, a: `With K&T Code a landing page starts at $450,000 COP, an online store at $1,300,000 COP and a corporate site at $2,500,000 COP. On kytcode.lat/precios you see prices in your local currency.` },
    { q: "Can you work with my company from Colombia?", a: `Yes. We work remotely with companies in ${c.name.en} over video calls, with staged deliveries. ${c.hours.en}` },
    { q: "How does payment work?", a: "50% when design starts and 50% after testing and launch, by international transfer or card." },
    { q: "How long does it take?", a: "A landing page takes 7 to 12 days, a corporate site 15 to 25 days and an online store 25 to 40 days." },
  ],
  keywords: [`web development ${c.name.en}`, `web design ${c.name.en}`, `website design company ${c.name.en}`, `online store ${c.name.en}`],
});

export const COUNTRY_LANDINGS: Landing[] = COUNTRIES.map((c) => ({
  kind: "pais",
  slug: `desarrollo-web-${c.slug}`,
  path: `/desarrollo-web-${c.slug}`,
  color: c.color,
  plan: "corporativo",
  serviceType: `Desarrollo web en ${c.name.es}`,
  projects: c.projects,
  posts: c.posts,
  related: ["/servicios/desarrollo-web-a-medida", "/servicios/tiendas-virtuales", "/precios"],
  country: { name: c.name.es, nameEn: c.name.en, code: c.code, lat: c.lat, lng: c.lng },
  copy: { es: copyEs(c), en: copyEn(c) },
}));
