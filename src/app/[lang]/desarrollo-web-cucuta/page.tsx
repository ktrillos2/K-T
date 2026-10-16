import type { Metadata } from "next";
import { langOf, type LangParams } from "@/i18n/server";
import { LandingPage, landingMetadata, landingOrThrow } from "@/lib/landing-page";

const landing = landingOrThrow("/desarrollo-web-cucuta");

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  return landingMetadata(landing, await langOf(params));
}

export default async function CityPage({ params }: LangParams) {
  return <LandingPage landing={landing} lang={await langOf(params)} />;
}
