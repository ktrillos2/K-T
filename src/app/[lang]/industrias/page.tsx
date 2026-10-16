import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { langOf, type LangParams } from "@/i18n/server";
import { localize } from "@/i18n/config";
import { INDUSTRIES, SERVICES, landingCopy } from "@/content/landings";
import { landingLabel } from "@/lib/landing-page";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { LandingHub } from "@/components/landing/LandingHub";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const h = getDict(lang).landing.hubs.industrias;
  return pageMeta({ lang, path: "/industrias", title: h.title, description: h.description });
}

export default async function IndustriesHub({ params }: LangParams) {
  const lang = await langOf(params);
  const t = getDict(lang);
  const h = t.landing.hubs.industrias;
  const items = INDUSTRIES.map((s) => {
    const { copy } = landingCopy(s, lang);
    return { href: s.path, label: landingLabel(s.path, lang), text: copy.lead.split(". ")[0] + ".", color: s.color, meta: `${s.projects.length} ${t.nav.projects.toLowerCase()}` };
  });
  return (
    <>
      <LandingHub eyebrow={h.eyebrow} h1={h.h1} lead={h.lead} items={items} extra={[{ title: t.nav.services, links: SERVICES.map((g) => ({ href: g.path, label: landingLabel(g.path, lang) })) }]} />
      <JsonLd
        data={graph(breadcrumbs(lang, [{ name: t.nav.industries, path: "/industrias" }]), {
          "@type": "ItemList",
          name: h.title,
          itemListElement: INDUSTRIES.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}${localize(s.path, lang)}`, name: landingLabel(s.path, lang) })),
        })}
      />
    </>
  );
}
