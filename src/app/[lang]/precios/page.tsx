import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { langOf, type LangParams } from "@/i18n/server";
import { localize } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, faqPage, graph } from "@/lib/schema";
import { PLANS } from "@/lib/pricing";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { PricingHero } from "@/components/pricing/PricingHero";
import { Plans } from "@/components/pricing/Plans";
import { AdsBanner } from "@/components/ads/AdsBanner";
import { QuoteBuilder } from "@/components/pricing/QuoteBuilder";
import { CompareTable } from "@/components/pricing/CompareTable";
import { Faq } from "@/components/pricing/Faq";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = getDict(lang);
  return pageMeta({ lang, path: "/precios", title: t.meta.pricing.title, description: t.meta.pricing.description });
}

export default async function PricingPage({ params }: LangParams) {
  const lang = await langOf(params);
  const t = getDict(lang);
  const url = `${SITE.url}${localize("/precios", lang)}`;
  return (
    <>
      <PricingHero />
      <Plans />
      <AdsBanner />
      <QuoteBuilder />
      <CompareTable />
      <Faq />
      <JsonLd
        data={graph(
          breadcrumbs(lang, [{ name: t.nav.pricing, path: "/precios" }]),
          faqPage(t.pricing.faq.items),
          {
            "@type": "OfferCatalog",
            "@id": `${url}#catalog`,
            name: t.meta.pricing.title,
            url,
            itemListElement: PLANS.map((p) => ({
              "@type": "Offer",
              name: t.pricing.plans[p.id].name,
              description: t.pricing.plans[p.id].pitch,
              priceCurrency: "COP",
              priceSpecification: { "@type": "PriceSpecification", minPrice: p.from, priceCurrency: "COP" },
              seller: { "@id": `${SITE.url}/#organization` },
            })),
          },
        )}
      />
    </>
  );
}
