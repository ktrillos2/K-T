import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { localize, type Lang } from "@/i18n/config";
import { landingByPath, landingCopy, landingLangs, type Landing } from "@/content/landings";
import { parseMarkdown } from "@/content/blog/markdown";
import { PLANS } from "./pricing";
import { SITE } from "./site";
import { pageMeta } from "./seo";
import { breadcrumbs, faqPage, graph } from "./schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { LandingView } from "@/components/landing/LandingView";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Nombre corto de una página para migas de pan y enlaces relacionados. */
export function landingLabel(path: string, lang: Lang): string {
  const l = landingByPath(path);
  const t = getDict(lang);
  if (l) {
    const { copy } = landingCopy(l, lang);
    if (l.kind === "ciudad" || l.kind === "pais") return copy.h1;
    return cap(copy.eyebrow.split("·").pop()!.trim());
  }
  if (path === "/precios") return t.nav.pricing;
  if (path === "/proyectos") return t.nav.projects;
  if (path === "/servicios") return t.nav.services;
  if (path === "/industrias") return t.nav.industries;
  return path;
}

function crumbsFor(l: Landing, lang: Lang) {
  const t = getDict(lang);
  const parent =
    l.kind === "servicio" ? { href: "/servicios", label: t.nav.services } : l.kind === "industria" ? { href: "/industrias", label: t.nav.industries } : l.kind === "guia" ? { href: "/precios", label: t.nav.pricing } : null;
  return [...(parent ? [parent] : []), { href: l.path, label: landingLabel(l.path, lang) }];
}

export function landingMetadata(l: Landing, lang: Lang): Metadata {
  const { copy, fallback } = landingCopy(l, lang);
  return pageMeta({ lang, path: l.path, title: copy.title, description: copy.description, onlyEs: !landingLangs(l).includes("en"), noindex: fallback });
}

export function LandingPage({ landing: l, lang }: { landing: Landing; lang: Lang }) {
  const { copy, fallback } = landingCopy(l, lang);
  const t = getDict(lang);
  const url = `${SITE.url}${localize(l.path, lang)}`;
  const plan = l.plan ? PLANS.find((p) => p.id === l.plan) : undefined;
  const crumbs = crumbsFor(l, lang);

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: copy.h1,
    serviceType: lang === "en" && !fallback ? copy.h1 : (l.serviceType ?? copy.h1),
    description: copy.description,
    url,
    inLanguage: lang === "en" && !fallback ? "en" : "es-CO",
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: l.country
      ? { "@type": "Country", name: l.country.nameEn }
      : l.city
      ? { "@type": "City", name: l.city.name, containedInPlace: { "@type": "AdministrativeArea", name: l.city.region, containedInPlace: { "@type": "Country", name: "Colombia" } } }
      : [{ "@type": "Country", name: "Colombia" }, { "@type": "Place", name: "Latinoamérica" }, { "@type": "Country", name: "United States" }],
    keywords: copy.keywords.join(", "),
    ...(plan && !plan.quote
      ? { offers: { "@type": "Offer", priceCurrency: "COP", price: plan.from, priceSpecification: { "@type": "PriceSpecification", minPrice: plan.from, priceCurrency: "COP" }, availability: "https://schema.org/InStock", seller: { "@id": `${SITE.url}/#organization` } } }
      : {}),
  };
  const webPage = {
    "@type": "WebPage",
    "@id": `${url}#page`,
    url,
    name: copy.title,
    description: copy.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${url}#service` },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "header p"] },
  };

  return (
    <>
      <LandingView
        kind={l.kind}
        color={l.color}
        plan={l.plan}
        copy={copy}
        blocks={copy.body ? parseMarkdown(copy.body) : []}
        projects={l.projects}
        posts={l.posts}
        related={l.related.map((href) => ({ href, label: landingLabel(href, lang) }))}
        fallback={fallback}
        crumbs={crumbs}
      />
      <JsonLd data={graph(breadcrumbs(lang, crumbs.map((c) => ({ name: c.label, path: c.href }))), webPage, service, faqPage(copy.faqs))} />
    </>
  );
}

/** Para las páginas con ruta fija (ciudades): metadata y página a partir de la ruta. */
export const landingOrThrow = (path: string) => {
  const l = landingByPath(path);
  if (!l) throw new Error(`Landing no encontrada: ${path}`);
  return l;
};

export const titleOf = (l: Landing, lang: Lang) => landingCopy(l, lang).copy.title;
export const dictOf = getDict;
