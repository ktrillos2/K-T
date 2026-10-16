export const LOCALES = ["es", "en"] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = "es";

export const isLang = (v: string | undefined): v is Lang => !!v && (LOCALES as readonly string[]).includes(v);

/** Ruta pública en el idioma dado. El español va sin prefijo; el inglés bajo /en. */
export function localize(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

/** Separa el prefijo de idioma de una ruta pública. */
export function splitLang(pathname: string): { lang: Lang; path: string } {
  const m = pathname.match(/^\/(en|es)(?=\/|$)/);
  if (!m) return { lang: DEFAULT_LANG, path: pathname || "/" };
  const rest = pathname.slice(m[0].length) || "/";
  return { lang: m[1] as Lang, path: rest };
}

export const HREFLANG: Record<Lang, string> = { es: "es", en: "en" };
export const OG_LOCALE: Record<Lang, string> = { es: "es_CO", en: "en_US" };
