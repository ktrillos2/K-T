import type { Lang } from "@/i18n/config";

export type Currency = "COP" | "USD" | "MXN" | "PEN" | "ARS" | "CLP" | "EUR";

export type Country = {
  code: string;
  name: { es: string; en: string };
  currency: Currency;
  /** Locale para formatear números y moneda. */
  locale: string;
  /** Idioma sugerido al elegir este país. */
  lang: Lang;
};

export const COUNTRIES: Country[] = [
  { code: "CO", name: { es: "Colombia", en: "Colombia" }, currency: "COP", locale: "es-CO", lang: "es" },
  { code: "MX", name: { es: "México", en: "Mexico" }, currency: "MXN", locale: "es-MX", lang: "es" },
  { code: "PE", name: { es: "Perú", en: "Peru" }, currency: "PEN", locale: "es-PE", lang: "es" },
  { code: "AR", name: { es: "Argentina", en: "Argentina" }, currency: "ARS", locale: "es-AR", lang: "es" },
  { code: "CL", name: { es: "Chile", en: "Chile" }, currency: "CLP", locale: "es-CL", lang: "es" },
  { code: "EC", name: { es: "Ecuador", en: "Ecuador" }, currency: "USD", locale: "es-EC", lang: "es" },
  { code: "VE", name: { es: "Venezuela", en: "Venezuela" }, currency: "USD", locale: "es-VE", lang: "es" },
  { code: "ES", name: { es: "España", en: "Spain" }, currency: "EUR", locale: "es-ES", lang: "es" },
  { code: "US", name: { es: "Estados Unidos", en: "United States" }, currency: "USD", locale: "en-US", lang: "en" },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];
export const countryByCode = (code?: string | null) => COUNTRIES.find((c) => c.code === code?.toUpperCase()) ?? DEFAULT_COUNTRY;

/** Recargo sobre la tasa de cambio del día para precios fuera de Colombia. */
export const FX_MARKUP = 0.1;

export type Rates = { base: "COP"; rates: Partial<Record<Currency, number>>; updated: string; source: string; fallback: boolean };

/**
 * Tasas de respaldo (1 COP en cada moneda). Solo se usan si la API de tasas no responde;
 * en producción el endpoint /api/rates entrega la tasa del día.
 */
export const FALLBACK_RATES: Rates = {
  base: "COP",
  rates: { COP: 1, USD: 0.00025, MXN: 0.0047, PEN: 0.00093, ARS: 0.3, CLP: 0.24, EUR: 0.00022 },
  updated: "fallback",
  source: "valores de respaldo",
  fallback: true,
};

/** Redondeo comercial según la magnitud del número. */
function nice(v: number) {
  if (v >= 100000) return Math.round(v / 1000) * 1000;
  if (v >= 10000) return Math.round(v / 100) * 100;
  if (v >= 1000) return Math.round(v / 10) * 10;
  return Math.round(v);
}

/** Convierte un precio en COP a la moneda del país: tasa del día + 10% fuera de Colombia. */
export function convert(cop: number, country: Country, rates: Rates): number {
  if (country.currency === "COP") return cop;
  const r = rates.rates[country.currency] ?? FALLBACK_RATES.rates[country.currency];
  if (!r) return cop;
  return nice(cop * r * (1 + FX_MARKUP));
}

export function formatMoney(value: number, country: Country) {
  try {
    return new Intl.NumberFormat(country.locale, {
      style: "currency",
      currency: country.currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${country.currency} ${Math.round(value).toLocaleString()}`;
  }
}

export const formatCOP = (n: number) => "$" + n.toLocaleString("es-CO");
