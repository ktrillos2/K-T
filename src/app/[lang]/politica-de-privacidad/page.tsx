import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { langOf, type LangParams } from "@/i18n/server";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPage } from "@/components/legal/LegalPage";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = getDict(lang);
  return pageMeta({ lang, path: "/politica-de-privacidad", title: t.meta.privacy.title, description: t.meta.privacy.description });
}

export default async function PrivacyPage({ params }: LangParams) {
  const lang = await langOf(params);
  const t = getDict(lang);
  return (
    <>
      <LegalPage />
      <JsonLd data={graph(breadcrumbs(lang, [{ name: t.privacy.title, path: "/politica-de-privacidad" }]))} />
    </>
  );
}
