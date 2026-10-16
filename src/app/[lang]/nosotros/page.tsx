import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { langOf, type LangParams } from "@/i18n/server";
import { localize } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutHero } from "@/components/about/AboutHero";
import { Founder } from "@/components/about/Founder";
import { Disciplines } from "@/components/about/Disciplines";
import { GitLog } from "@/components/about/GitLog";
import { TestRun } from "@/components/about/TestRun";
import { InfoTerminal } from "@/components/about/InfoTerminal";
import { Reviews } from "@/components/home/Reviews";
import { getTestimonials } from "@/lib/testimonials";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = getDict(lang);
  return pageMeta({ lang, path: "/nosotros", title: t.meta.about.title, description: t.meta.about.description });
}

export default async function AboutPage({ params }: LangParams) {
  const lang = await langOf(params);
  const t = getDict(lang);
  const url = `${SITE.url}${localize("/nosotros", lang)}`;
  const reviews = await getTestimonials();
  return (
    <>
      <AboutHero />
      <Founder />
      <Disciplines />
      <GitLog />
      <Reviews reviews={reviews} />
      <TestRun />
      <InfoTerminal />
      <JsonLd
        data={graph(
          breadcrumbs(lang, [{ name: t.nav.about, path: "/nosotros" }]),
          {
            "@type": "AboutPage",
            "@id": `${url}#page`,
            url,
            name: t.meta.about.title,
            description: t.meta.about.description,
            inLanguage: lang === "en" ? "en" : "es-CO",
            about: { "@id": `${SITE.url}/#organization` },
            mainEntity: { "@id": `${SITE.url}/#keyner-trillos` },
          },
        )}
      />
    </>
  );
}
