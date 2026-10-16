import type { Lang } from "@/i18n/config";
import { splitLang } from "@/i18n/config";
import { getDict, projectsFor } from "@/i18n";
import { getPostCard } from "@/content/blog/meta";
import { landingByPath, landingCopy } from "@/content/landings";
import { ROUTES, normalizePath } from "./routes";

const humanize = (slug: string) => {
  const s = decodeURIComponent(slug).replace(/[-_]+/g, " ").trim();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
};

/** Primera letra en mayúscula (los eyebrows de las landings vienen en minúscula). */
const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/**
 * Nombre legible de una página para la pantalla de transición ("Compilando Proyectos").
 * Usa los mismos textos que ve el visitante: menú, nombre del proyecto, título del artículo
 * o el servicio de la landing. Nunca muestra la ruta.
 */
export function pageLabel(href: string): string {
  const { lang, path } = splitLang(normalizePath(href));
  const t = getDict(lang as Lang);

  const main = ROUTES.find((r) => r.href === path);
  if (main) return t.nav[main.nav];

  if (path.startsWith("/proyectos/")) {
    const slug = path.slice("/proyectos/".length);
    const p = projectsFor(lang).find((x) => x.slug === slug);
    return p?.name ?? humanize(slug);
  }
  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    return getPostCard(slug, lang)?.title ?? humanize(slug);
  }

  const landing = landingByPath(path);
  if (landing) {
    const c = landingCopy(landing, lang).copy;
    if (landing.kind === "ciudad" && landing.city) return lang === "en" ? `Web development in ${landing.city.name}` : `Desarrollo web en ${landing.city.name}`;
    if (landing.kind === "servicio") {
      const short = c.eyebrow.split("·").pop()?.trim();
      if (short) return cap(short);
    }
    return c.h1;
  }

  switch (path) {
    case "/industrias":
      return t.nav.industries;
    case "/testimonios":
      return t.landing.testimonials.h1;
    case "/preguntas-frecuentes":
      return t.landing.faqPage.h1;
    case "/politica-de-privacidad":
      return t.privacy.title;
  }
  if (path.startsWith("/autores/")) return "Keyner Trillos";

  const last = path.split("/").filter(Boolean).pop();
  return last ? humanize(last) : t.nav.home;
}
