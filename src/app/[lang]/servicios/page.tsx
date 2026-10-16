import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { langOf, type LangParams } from "@/i18n/server";
import { localize } from "@/i18n/config";
import { CITY_LANDINGS, GUIDES, INDUSTRIES, SERVICES, landingCopy } from "@/content/landings";
import { landingLabel } from "@/lib/landing-page";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { LandingHub } from "@/components/landing/LandingHub";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const h = getDict(lang).landing.hubs.servicios;
  return pageMeta({ lang, path: "/servicios", title: h.title, description: h.description });
}

export default async function ServicesHub({ params }: LangParams) {
  const lang = await langOf(params);
  const t = getDict(lang);
  const h = t.landing.hubs.servicios;
  const items = SERVICES.map((s) => {
    const { copy } = landingCopy(s, lang);
    return { href: s.path, label: landingLabel(s.path, lang), text: copy.lead.split(". ").slice(0, 2).join(". ") + ".", color: s.color, plan: s.plan, meta: copy.facts[0]?.join(": ") };
  });
  return (
    <>
      <LandingHub
        eyebrow={h.eyebrow}
        h1={h.h1}
        lead={h.lead}
        items={items}
        extra={[
          { title: t.nav.pricing, links: GUIDES.map((g) => ({ href: g.path, label: landingLabel(g.path, lang) })) },
          { title: t.nav.industries, links: INDUSTRIES.map((g) => ({ href: g.path, label: landingLabel(g.path, lang) })) },
          { title: t.landing.hubs.ciudades.title, links: CITY_LANDINGS.map((g) => ({ href: g.path, label: g.city!.name })) },
        ]}
      />
      <JsonLd
        data={graph(breadcrumbs(lang, [{ name: t.nav.services, path: "/servicios" }]), {
          "@type": "ItemList",
          name: h.title,
          itemListElement: SERVICES.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}${localize(s.path, lang)}`, name: landingLabel(s.path, lang) })),
        })}
      />
    </>
  );
}
