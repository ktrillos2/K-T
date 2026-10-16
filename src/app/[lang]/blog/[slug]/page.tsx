import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict } from "@/i18n";
import { isLang, type Lang } from "@/i18n/config";
import { POSTS, CATEGORY_LABELS } from "@/content/blog/meta";
import { getPost, plainText, wordCount } from "@/content/blog";
import { pageMeta } from "@/lib/seo";
import { blogPosting, breadcrumbs, faqPage, graph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleView } from "@/components/blog/ArticleView";

type Params = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

async function resolve(params: Params["params"]) {
  const { lang: raw, slug } = await params;
  const lang: Lang = isLang(raw) ? raw : "es";
  return { lang, post: getPost(slug, lang) };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, post } = await resolve(params);
  if (!post) return {};
  return pageMeta({
    lang,
    path: post.href,
    title: post.title,
    description: post.description,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
    onlyEs: !post.langs.includes("en"),
    // Si se pide en inglés un artículo que solo existe en español, la versión canónica es la española.
    noindex: post.fallback,
  });
}

export default async function PostPage({ params }: Params) {
  const { lang, post } = await resolve(params);
  if (!post) notFound();
  const t = getDict(lang);
  const words = wordCount(post.body);
  return (
    <>
      <ArticleView post={post} words={words} plain={plainText(post.body)} />
      <JsonLd
        data={graph(
          breadcrumbs(lang, [
            { name: t.nav.blog, path: "/blog" },
            { name: post.title, path: post.href },
          ]),
          blogPosting({
            lang: post.lang,
            slug: post.slug,
            title: post.title,
            description: post.description,
            date: post.date,
            updated: post.updated,
            words,
            section: CATEGORY_LABELS[post.lang][post.category],
            keywords: post.tags,
            sources: post.body.sources,
            minutes: post.minutes,
          }),
          ...(post.body.faq?.length ? [faqPage(post.body.faq)] : []),
        )}
      />
    </>
  );
}
