import type { Lang } from "@/i18n/config";
import { getDict } from "@/i18n";
import { postsFor } from "@/content/blog/meta";
import { CITY_LANDINGS, COUNTRY_LANDINGS, INDUSTRIES, SERVICES, landingCopy, landingLangs, type Landing } from "@/content/landings";

/** Artículos de precios que responden las búsquedas de costo en Colombia (solo en español). */
const PRICE_ARTICLES: ShellLink[] = [
  { href: "/blog/cuanto-cuesta-una-pagina-web-en-colombia", label: "Precio de una página web" },
  { href: "/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026", label: "Precio de una tienda virtual" },
  { href: "/blog/cuanto-cuesta-desarrollar-software-a-medida-colombia", label: "Precio de software a medida" },
];

export type ShellLink = { href: string; label: string };
export type ShellLinks = {
  services: ShellLink[];
  industries: ShellLink[];
  cities: ShellLink[];
  countries: ShellLink[];
  guides: ShellLink[];
  /** Entradas de búsqueda del ⌘K: servicios e industrias, y artículos del blog. */
  searchLandings: ShellLink[];
  searchPosts: (ShellLink & { minutes: number })[];
};

/**
 * Enlaces del pie y del buscador como texto plano. Se calculan en el servidor (layout)
 * para que el contenido completo de las landings y del blog no viaje en el JavaScript
 * de cada página: solo viajan las etiquetas.
 */
export function shellLinks(lang: Lang): ShellLinks {
  const t = getDict(lang);
  const label = (l: Landing) => {
    const e = landingCopy(l, lang).copy.eyebrow.split("·").pop()!.trim();
    return e.charAt(0).toUpperCase() + e.slice(1);
  };
  const published = (list: Landing[]) => list.filter((l) => landingLangs(l).includes(lang));
  return {
    services: SERVICES.map((l) => ({ href: l.path, label: label(l) })),
    industries: published(INDUSTRIES).map((l) => ({ href: l.path, label: label(l) })),
    cities: published(CITY_LANDINGS).map((l) => ({ href: l.path, label: `${t.landing.crumbs.ciudad} ${l.city!.name}` })),
    countries: published(COUNTRY_LANDINGS).map((l) => ({ href: l.path, label: `${t.landing.crumbs.pais} ${lang === "en" ? l.country!.nameEn : l.country!.name}` })),
    guides: lang === "es" ? PRICE_ARTICLES : [],
    searchLandings: [...SERVICES, ...published(INDUSTRIES)].map((l) => ({ href: l.path, label: landingCopy(l, lang).copy.h1 })),
    searchPosts: postsFor(lang).map((b) => ({ href: b.href, label: b.title, minutes: b.minutes })),
  };
}
