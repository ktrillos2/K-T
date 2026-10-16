import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang, type Lang } from "@/i18n/config";
import { INDUSTRIES } from "@/content/landings";
import { LandingPage, landingMetadata } from "@/lib/landing-page";

type Params = { params: Promise<{ lang: string; slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => INDUSTRIES.map((s) => ({ slug: s.slug }));

async function resolve(params: Params["params"]) {
  const { lang: raw, slug } = await params;
  const lang: Lang = isLang(raw) ? raw : "es";
  return { lang, landing: INDUSTRIES.find((s) => s.slug === slug) };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, landing } = await resolve(params);
  return landing ? landingMetadata(landing, lang) : {};
}

export default async function IndustryPage({ params }: Params) {
  const { lang, landing } = await resolve(params);
  if (!landing) notFound();
  return <LandingPage landing={landing} lang={lang} />;
}
