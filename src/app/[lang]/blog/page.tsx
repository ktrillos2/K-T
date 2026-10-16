import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { langOf, type LangParams } from "@/i18n/server";
import { localize } from "@/i18n/config";
import { pageMeta } from "@/lib/seo";
import { breadcrumbs, graph } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { postsFor } from "@/content/blog/meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogIndex } from "@/components/blog/BlogIndex";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = getDict(lang);
  return pageMeta({ lang, path: "/blog", title: t.meta.blog.title, description: t.meta.blog.description });
}

export default async function BlogPage({ params }: LangParams) {
  const lang = await langOf(params);
  const t = getDict(lang);
  const url = `${SITE.url}${localize("/blog", lang)}`;
  const posts = postsFor(lang);
  return (
    <>
      <BlogIndex />
      <JsonLd
        data={graph(breadcrumbs(lang, [{ name: t.nav.blog, path: "/blog" }]), {
          "@type": "Blog",
          "@id": `${url}#blog`,
          url,
          name: `${t.meta.blog.title} · ${SITE.name}`,
          description: t.meta.blog.description,
          inLanguage: lang === "en" ? "en" : "es-CO",
          publisher: { "@id": `${SITE.url}/#organization` },
          author: { "@id": `${SITE.url}/#keyner-trillos` },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            "@id": `${SITE.url}${localize(p.href, p.lang)}#article`,
            headline: p.title,
            description: p.description,
            url: `${SITE.url}${localize(p.href, p.lang)}`,
            datePublished: p.date,
            dateModified: p.updated,
            inLanguage: p.lang === "en" ? "en" : "es-CO",
            keywords: p.tags.join(", "),
            author: { "@id": `${SITE.url}/#keyner-trillos` },
          })),
        })}
      />
    </>
  );
}
