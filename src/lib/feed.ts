import { localize, type Lang } from "@/i18n/config";
import { getDict } from "@/i18n";
import { CATEGORY_LABELS, postsFor } from "@/content/blog/meta";
import { SITE } from "./site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (iso: string) => new Date(`${iso.slice(0, 10)}T12:00:00Z`).toUTCString();

/**
 * Feed RSS 2.0 del blog. Lo usan lectores de noticias, agregadores y varios motores de IA
 * para descubrir artículos nuevos más rápido que con el sitemap.
 * En inglés solo entran los artículos traducidos (hoy son todos; si uno queda solo en español, no se duplica).
 */
export function rssFeed(lang: Lang): string {
  const t = getDict(lang);
  const posts = postsFor(lang).filter((p) => !p.fallback);
  const home = `${SITE.url}${localize("/blog", lang)}`;
  const self = `${SITE.url}${lang === "en" ? "/feed.en.xml" : "/feed.xml"}`;
  const last = posts.map((p) => p.updated ?? p.date).sort().at(-1) ?? new Date().toISOString();
  const items = posts
    .map((p) => {
      const url = `${SITE.url}${localize(p.href, lang)}`;
      return [
        "    <item>",
        `      <title>${esc(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${esc(p.description)}</description>`,
        `      <category>${esc(CATEGORY_LABELS[lang][p.category])}</category>`,
        `      <dc:creator>${esc(SITE.founder.name)}</dc:creator>`,
        `      <pubDate>${rfc822(p.date)}</pubDate>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(`${SITE.name} · Blog`)}</title>
    <link>${home}</link>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
    <description>${esc(t.meta.blog.description)}</description>
    <language>${lang === "en" ? "en" : "es-co"}</language>
    <lastBuildDate>${rfc822(last)}</lastBuildDate>
    <image>
      <url>${SITE.url}/icon-192.png</url>
      <title>${esc(SITE.name)}</title>
      <link>${home}</link>
    </image>
${items}
  </channel>
</rss>
`;
}
