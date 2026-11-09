import type { Lang } from "@/i18n/config";
import { SERVICES } from "./services";
import { INDUSTRIES } from "./industries";
import { CITY_LANDINGS } from "./cities";
import { COUNTRY_LANDINGS } from "./countries";
import type { Landing, LandingCopy } from "./types";

export type { Landing, LandingCopy };
export { SERVICES, INDUSTRIES, CITY_LANDINGS, COUNTRY_LANDINGS };

export const LANDINGS: Landing[] = [...SERVICES, ...INDUSTRIES, ...CITY_LANDINGS, ...COUNTRY_LANDINGS];

export const landingByPath = (path: string) => LANDINGS.find((l) => l.path === path);

/** Copia en el idioma pedido (respaldo en español) e indica si es una traducción faltante. */
export function landingCopy(l: Landing, lang: Lang): { copy: LandingCopy; fallback: boolean } {
  const c = l.copy[lang];
  return c ? { copy: c, fallback: false } : { copy: l.copy.es, fallback: true };
}

/** Landings con búsqueda solo en español: sus URLs en inglés se retiraron (ver EN_RETIRED en next.config.ts). */
const SPANISH_ONLY_KINDS: Landing["kind"][] = ["industria", "ciudad"];
const SPANISH_ONLY_PATHS = ["/desarrollo-web-mexico"];
const isSpanishOnly = (l: Landing) => SPANISH_ONLY_KINDS.includes(l.kind) || SPANISH_ONLY_PATHS.includes(l.path);

export const landingLangs = (l: Landing): Lang[] => (l.copy.en && !isSpanishOnly(l) ? ["es", "en"] : ["es"]);
