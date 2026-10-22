import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { langOf, type LangParams } from "@/i18n/server";
import { pageMeta } from "@/lib/seo";
import { faqPage, graph, itemList } from "@/lib/schema";
import { FEATURED } from "@/lib/projects";
import { JsonLd } from "@/components/seo/JsonLd";
import { Marquee } from "@/components/motion/Marquee";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeServices } from "@/components/home/HomeServices";
import { FeaturedStack } from "@/components/home/FeaturedStack";
import { Reviews } from "@/components/home/Reviews";
import { QuickFacts } from "@/components/home/QuickFacts";
import { getTestimonials } from "@/lib/testimonials";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = getDict(lang);
  return pageMeta({ lang, path: "/", description: t.meta.home.description });
}

export default async function HomePage({ params }: LangParams) {
  const lang = await langOf(params);
  const t = getDict(lang);
  const reviews = await getTestimonials();
  return (
    <>
      <HomeHero />
      <Marquee items={t.home.values} label={t.home.valuesLabel} speed={1} />
      <HomeServices />
      <FeaturedStack />
      <Reviews reviews={reviews} />
      <QuickFacts />
      <JsonLd data={graph(faqPage(t.home.facts.items), itemList(lang, FEATURED))} />
    </>
  );
}
