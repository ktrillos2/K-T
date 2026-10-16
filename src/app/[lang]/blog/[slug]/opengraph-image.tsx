import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { isLang, type Lang } from "@/i18n/config";
import { CATEGORY_LABELS, POSTS, getPostCard } from "@/content/blog/meta";
import { SITE } from "@/lib/site";

/**
 * Imagen social (1200×630) propia de cada artículo: título, categoría, minutos y la marca.
 * Antes todos los artículos compartían /og.png; con una imagen por artículo se ven distintos
 * al compartirlos y Google Discover / los resultados enriquecidos tienen algo que mostrar.
 */
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "K&T Code · Blog";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

const DOTS = ["#ef685f", "#f6bd4e", "#62c453"];

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang: Lang = isLang(raw) ? raw : "es";
  const post = getPostCard(slug, lang);
  const title = post?.title ?? SITE.name;
  const category = post ? CATEGORY_LABELS[post.lang][post.category] : "Blog";
  const minutes = post ? `${post.minutes} min` : "";

  let fonts: { name: string; data: ArrayBuffer; weight: 700; style: "normal" }[] | undefined;
  try {
    const buf = await readFile(join(process.cwd(), "src", "app", "font-files", "ari-w9500-bold.woff"));
    fonts = [{ name: "Ari", data: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer, weight: 700, style: "normal" }];
  } catch {
    fonts = undefined;
  }
  const fontSize = title.length > 90 ? 52 : title.length > 60 ? 62 : 76;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 72px", background: "#0b0b0c", color: "#f2f2ee", fontFamily: fonts ? "Ari" : "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {DOTS.map((c) => (
            <div key={c} style={{ width: 22, height: 22, borderRadius: 11, background: c }} />
          ))}
          <div style={{ marginLeft: 18, fontSize: 26, color: "#8b8b92", display: "flex" }}>
            {category} · {minutes}
          </div>
        </div>
        <div style={{ fontSize, lineHeight: 1.04, display: "flex", maxWidth: 1050 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 30 }}>
          <div style={{ display: "flex" }}>K&amp;T Code · Blog</div>
          <div style={{ display: "flex", color: "#62c453" }}>kytcode.lat</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
