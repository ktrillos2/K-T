import type { MetadataRoute } from "next";
import { localize, LOCALES, type Lang } from "@/i18n/config";
import { ROUTES } from "@/lib/routes";
import { CONTENT_UPDATED, SITE } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";
import { hasShot } from "@/lib/shots";
import { POSTS } from "@/content/blog/meta";
import { LANDINGS, landingLangs } from "@/content/landings";

const abs = (path: string) => `${SITE.url}${path === "/" ? "" : path}`;
const day = (iso: string) => new Date(`${iso.slice(0, 10)}T12:00:00Z`);

type Freq = "weekly" | "monthly" | "yearly";

/**
 * Una entrada por URL e idioma, con sus alternativas hreflang.
 * Las fechas (<lastmod>) salen del contenido real (fecha del artículo, del proyecto o
 * CONTENT_UPDATED), no de la hora del build: así Google sigue confiando en ellas.
 */
function entry(path: string, o: { lastModified: Date; priority: number; changeFrequency: Freq; langs?: readonly Lang[]; images?: string[] }) {
  const langs = o.langs ?? LOCALES;
  const languages: Record<string, string> = {};
  langs.forEach((l) => (languages[l] = abs(localize(path, l))));
  languages["x-default"] = abs(localize(path, "es"));
  return langs.map((l) => ({
    url: abs(localize(path, l)),
    lastModified: o.lastModified,
    changeFrequency: o.changeFrequency,
    priority: l === "es" ? o.priority : Math.max(0.1, Math.round((o.priority - 0.1) * 10) / 10),
    alternates: { languages },
    ...(o.images?.length ? { images: o.images } : {}),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const content = day(CONTENT_UPDATED);
  const latest = (...dates: string[]) => day(dates.filter(Boolean).sort().at(-1) ?? CONTENT_UPDATED);
  const lastPost = latest(...POSTS.map((p) => p.updated ?? p.date));
  const lastProject = latest(...PROJECTS.map((p) => `${p.date}-15`));
  const abs2 = (u: string) => (u.startsWith("http") ? u : `${SITE.url}${u}`);
  // Imágenes del proyecto en el sitemap: captura propia (si existe) y portada del portafolio.
  const shot = (p: (typeof PROJECTS)[number]) =>
    [p.hasShot && hasShot(p.shot) ? abs2(p.shot) : null, p.cover ? abs2(p.cover) : null].filter((u): u is string => !!u).map((u) => u.split("?")[0]); // sin parámetros: evita "&" en el XML

  return [
    ...ROUTES.flatMap((r) =>
      entry(r.href, {
        lastModified: r.key === "blog" ? lastPost : r.key === "proyectos" ? lastProject : r.key === "inicio" ? latest(CONTENT_UPDATED, lastPost.toISOString(), lastProject.toISOString()) : content,
        priority: r.href === "/" ? 1 : 0.8,
        changeFrequency: r.key === "blog" ? "weekly" : "monthly",
        images: r.href === "/" ? [`${SITE.url}/og.png`] : undefined,
      }),
    ),
    ...PROJECTS.flatMap((p) => entry(p.href, { lastModified: day(`${p.date}-15`), priority: 0.7, changeFrequency: "yearly", images: shot(p) })),
    ...POSTS.flatMap((p) => entry(`/blog/${p.slug}`, { lastModified: day(p.updated ?? p.date), priority: 0.7, changeFrequency: "monthly", langs: p.langs })),
    ...LANDINGS.flatMap((l) =>
      entry(l.path, { lastModified: content, priority: l.kind === "servicio" || l.kind === "guia" ? 0.8 : 0.7, changeFrequency: "monthly", langs: landingLangs(l) }),
    ),
    ...entry("/industrias", { lastModified: content, priority: 0.7, changeFrequency: "monthly" }),
    ...entry("/testimonios", { lastModified: content, priority: 0.6, changeFrequency: "monthly" }),
    ...entry("/preguntas-frecuentes", { lastModified: content, priority: 0.7, changeFrequency: "monthly" }),
    ...entry("/autores/keyner-trillos", { lastModified: lastPost, priority: 0.5, changeFrequency: "monthly" }),
    ...entry("/politica-de-privacidad", { lastModified: content, priority: 0.2, changeFrequency: "yearly" }),
  ];
}
