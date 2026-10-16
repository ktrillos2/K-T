import type { Lang } from "@/i18n/config";
import { SERVICES } from "./services";
import { GUIDES } from "./guides";
import { INDUSTRIES } from "./industries";
import { CITY_LANDINGS } from "./cities";
import type { Landing, LandingCopy } from "./types";

export type { Landing, LandingCopy };
export { SERVICES, GUIDES, INDUSTRIES, CITY_LANDINGS };

export const LANDINGS: Landing[] = [...SERVICES, ...GUIDES, ...INDUSTRIES, ...CITY_LANDINGS];

export const landingByPath = (path: string) => LANDINGS.find((l) => l.path === path);

/** Copia en el idioma pedido (respaldo en español) e indica si es una traducción faltante. */
export function landingCopy(l: Landing, lang: Lang): { copy: LandingCopy; fallback: boolean } {
  const c = l.copy[lang];
  return c ? { copy: c, fallback: false } : { copy: l.copy.es, fallback: true };
}

export const landingLangs = (l: Landing): Lang[] => (l.copy.en ? ["es", "en"] : ["es"]);
