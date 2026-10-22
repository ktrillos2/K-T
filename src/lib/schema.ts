import { localize, type Lang } from "@/i18n/config";
import { getDict } from "@/i18n";
import { SITE } from "./site";
import { PLANS } from "./pricing";
import type { ProjectView } from "./projects";

/** Datos estructurados (schema.org) para Google y para motores de IA. */

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const PERSON_ID = `${SITE.url}/#keyner-trillos`;
const abs = (path: string) => `${SITE.url}${path === "/" ? "" : path}`;

export function organization(lang: Lang) {
  const t = getDict(lang);
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/brand/logo-black.png`,
    image: `${SITE.url}/og.png`,
    description: t.meta.siteDescription,
    slogan: t.home.hero.title,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: String(SITE.founded),
    founder: { "@id": PERSON_ID },
    priceRange: "$$",
    currenciesAccepted: "COP, USD",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: "CO",
    },
    geo: { "@type": "GeoCoordinates", latitude: 7.8939, longitude: -72.5078 },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Country", name: "México" },
      { "@type": "Country", name: "Perú" },
      { "@type": "Country", name: "United States" },
      { "@type": "Place", name: "Latinoamérica" },
    ],
    knowsLanguage: ["es", "en"],
    knowsAbout: [
      "Desarrollo web a la medida",
      "Diseño web",
      "Tiendas virtuales",
      "Software a medida",
      "SEO técnico",
      "Generative Engine Optimization",
      "Velocidad web",
    ],
    contactPoint: [{ "@type": "ContactPoint", contactType: "sales", telephone: SITE.phone, email: SITE.email, availableLanguage: ["Spanish", "English"] }],
    sameAs: SITE.socials.map((s) => s.href),
    makesOffer: PLANS.map((p) => ({
      "@type": "Offer",
      priceCurrency: "COP",
      price: p.from,
      priceSpecification: { "@type": "PriceSpecification", minPrice: p.from, priceCurrency: "COP" },
      itemOffered: { "@type": "Service", name: t.pricing.plans[p.id].name, description: t.pricing.plans[p.id].pitch, provider: { "@id": ORG_ID } },
      url: abs(localize("/precios", lang)),
    })),
  };
}

export function website(lang: Lang) {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.url,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    inLanguage: lang === "en" ? "en" : "es-CO",
    publisher: { "@id": ORG_ID },
  };
}

export function person(lang: Lang) {
  const t = getDict(lang);
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.founder.name,
    jobTitle: t.about.founder.role,
    image: `${SITE.url}/team/keyner-trillos.jpg`,
    url: `${SITE.url}${localize("/autores/keyner-trillos", lang)}`,
    worksFor: { "@id": ORG_ID },
    address: { "@type": "PostalAddress", addressLocality: SITE.city, addressCountry: "CO" },
    knowsAbout: ["Desarrollo web a la medida", "Meta Ads", "SEO técnico", "Embudos de conversión"],
  };
}

export function breadcrumbs(lang: Lang, items: { name: string; path: string }[]) {
  const t = getDict(lang);
  const all = [{ name: t.nav.home, path: "/" }, ...items];
  return {
    "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(localize(it.path, lang)) })),
  };
}

export function faqPage(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function projectWork(p: ProjectView, lang: Lang, withImage = false) {
  return {
    "@type": "CreativeWork",
    "@id": `${abs(localize(p.href, lang))}#work`,
    name: p.name,
    headline: `${p.name}: ${p.summary}`,
    description: p.summary,
    url: abs(localize(p.href, lang)),
    ...(withImage && p.image ? { image: p.image.startsWith("http") ? p.image : `${SITE.url}${p.image}` } : {}),
    dateCreated: p.date,
    genre: p.sector,
    locationCreated: p.location,
    creator: { "@id": ORG_ID },
    inLanguage: lang === "en" ? "en" : "es",
    ...(p.site ? { mainEntity: { "@type": "WebSite", name: p.name, url: p.site } } : {}),
    keywords: p.tags.join(", "),
  };
}

export function itemList(lang: Lang, projects: ProjectView[]) {
  return {
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(localize(p.href, lang)), name: p.name })),
  };
}

export function blogPosting(o: {
  lang: Lang;
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  image?: string;
  words: number;
  section: string;
  keywords?: string[];
  sources?: { title: string; url: string }[];
  minutes?: number;
}) {
  const url = abs(localize(`/blog/${o.slug}`, o.lang));
  const blogUrl = abs(localize("/blog", o.lang));
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: o.title,
    description: o.description,
    url,
    mainEntityOfPage: url,
    datePublished: o.date,
    dateModified: o.updated ?? o.date,
    inLanguage: o.lang === "en" ? "en" : "es-CO",
    articleSection: o.section,
    wordCount: o.words,
    author: { "@id": PERSON_ID, "@type": "Person", name: SITE.founder.name, url: `${SITE.url}${localize("/autores/keyner-trillos", o.lang)}` },
    publisher: { "@id": ORG_ID },
    image: o.image ?? `${url}/opengraph-image`,
    isPartOf: { "@type": "Blog", "@id": `${blogUrl}#blog`, url: blogUrl },
    ...(o.keywords?.length ? { keywords: o.keywords.join(", ") } : {}),
    ...(o.minutes ? { timeRequired: `PT${o.minutes}M` } : {}),
    // Fuentes citadas: los motores generativos priorizan contenido con referencias verificables (GEO).
    ...(o.sources?.length ? { citation: o.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })) } : {}),
    // Resumen inicial y título: lo que un asistente de voz o una IA debería leer/citar primero.
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["#h-post", "[data-tldr]"] },
  };
}

/** Envuelve uno o varios nodos en un @graph. */
export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
