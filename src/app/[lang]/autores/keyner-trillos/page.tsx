import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { langOf, type LangParams } from "@/i18n/server";
import { localize } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph, person } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { AuthorView } from "@/components/landing/AuthorView";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const a = getDict(lang).landing.author;
  return pageMeta({ lang, path: "/autores/keyner-trillos", title: a.title, description: a.description, image: SITE.founder.photo });
}

export default async function AuthorPage({ params }: LangParams) {
  const lang = await langOf(params);
  const a = getDict(lang).landing.author;
  const url = `${SITE.url}${localize("/autores/keyner-trillos", lang)}`;
  return (
    <>
      <AuthorView />
      <JsonLd
        data={graph(breadcrumbs(lang, [{ name: SITE.founder.name, path: "/autores/keyner-trillos" }]), { "@type": "ProfilePage", "@id": `${url}#page`, url, name: a.title, mainEntity: { "@id": `${SITE.url}/#keyner-trillos` } }, person(lang))}
      />
    </>
  );
}
