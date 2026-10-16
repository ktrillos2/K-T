import type { Metadata } from "next";
import { HREFLANG, OG_LOCALE, localize, type Lang } from "@/i18n/config";
import { getDict } from "@/i18n";
import { SITE } from "./site";

/** Imagen social por defecto (1200×630). */
export const DEFAULT_OG = "/og.png";

/** Indexable, con vista previa grande de imagen, fragmentos y video sin límite (igual que el sitio anterior). */
export const ROBOTS_INDEX: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  "max-image-preview": "large",
  "max-snippet": -1,
  "max-video-preview": -1,
  googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
};

/** Recorta en la última palabra completa (Google muestra ~155–160 caracteres de la descripción). */
export function clip(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:·–-]+$/, "")}…`;
}

/** Con la marca el título debe caber en ~60 caracteres; si no, va solo (sin " · K&T Code"). */
const BRAND_SUFFIX = ` · ${SITE.name}`;
const titleFor = (title: string) => (title.length + BRAND_SUFFIX.length <= 62 ? title : { absolute: title });

type PageMetaInput = {
  lang: Lang;
  /** Ruta sin prefijo de idioma, p. ej. "/precios". */
  path: string;
  title?: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Si la página solo existe en español (p. ej. artículos sin traducir). */
  onlyEs?: boolean;
  noindex?: boolean;
};

/** Metadata completa de una página: canonical, hreflang, Open Graph y Twitter. */
export function pageMeta(o: PageMetaInput): Metadata {
  const t = getDict(o.lang);
  const url = localize(o.path, o.lang);
  const languages: Record<string, string> = o.onlyEs
    ? { [HREFLANG.es]: localize(o.path, "es"), "x-default": localize(o.path, "es") }
    : { [HREFLANG.es]: localize(o.path, "es"), [HREFLANG.en]: localize(o.path, "en"), "x-default": localize(o.path, "es") };
  const fullTitle = o.title ? `${o.title} · ${SITE.name}` : t.meta.siteTitle;
  const description = clip(o.description);
  // Siempre hay imagen social (antes dependía de opengraph-image.png dentro de [lang], que publicaba /es/opengraph-image.png).
  const images = [{ url: o.image ?? DEFAULT_OG, width: 1200, height: 630, alt: fullTitle, type: "image/png" }];
  // Una traducción que no existe (inglés con texto en español) apunta a la versión española.
  const canonical = o.onlyEs ? localize(o.path, "es") : url;
  return {
    title: o.title ? titleFor(o.title) : { absolute: t.meta.siteTitle },
    description,
    alternates: {
      canonical,
      languages,
      types: { "application/rss+xml": [{ url: o.lang === "en" ? "/feed.en.xml" : "/feed.xml", title: `${SITE.name} · Blog` }] },
    },
    openGraph: {
      type: o.type ?? "website",
      url,
      siteName: SITE.name,
      locale: OG_LOCALE[o.lang],
      alternateLocale: o.lang === "es" ? [OG_LOCALE.en] : [OG_LOCALE.es],
      title: fullTitle,
      description,
      images,
      ...(o.publishedTime ? { publishedTime: o.publishedTime } : {}),
      ...(o.modifiedTime ? { modifiedTime: o.modifiedTime } : {}),
      ...(o.type === "article" ? { authors: [`${SITE.url}${localize("/autores/keyner-trillos", o.lang)}`] } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: images.map((i) => i.url) },
    robots: o.noindex ? { index: false, follow: true, googleBot: { index: false, follow: true } } : ROBOTS_INDEX,
  };
}
