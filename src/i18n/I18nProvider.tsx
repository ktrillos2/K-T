"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getDict, type Dict } from "./index";
import { localize, type Lang } from "./config";
import { COUNTRIES, DEFAULT_COUNTRY, FALLBACK_RATES, convert, convertUsd, countryByCode, formatMoney, type Country, type Rates } from "@/lib/money";

type Ctx = {
  lang: Lang;
  t: Dict;
  /** Ruta pública en el idioma actual. */
  href: (path: string) => string;
  country: Country;
  setCountry: (code: string) => void;
  rates: Rates;
  /** Precio en COP → texto formateado en la moneda del país elegido. */
  money: (cop: number) => string;
  /** Precio fijo en dólares mostrado en la moneda del país (fuera de Colombia). */
  moneyUsd: (usd: number) => string;
  convert: (cop: number) => number;
};

const I18nCtx = createContext<Ctx | null>(null);

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

export function I18nProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const t = getDict(lang);
  const [country, setCountryState] = useState<Country>(DEFAULT_COUNTRY);
  const [rates, setRates] = useState<Rates>(FALLBACK_RATES);

  // País guardado por el visitante o detectado por el servidor (cookie del middleware).
  useEffect(() => {
    let code: string | null = null;
    try {
      code = localStorage.getItem("kt-country");
    } catch {
      /* sin almacenamiento */
    }
    code = code ?? readCookie("kt-country");
    if (code && COUNTRIES.some((c) => c.code === code)) setCountryState(countryByCode(code));
  }, []);

  // Tasa del día (cacheada en la sesión).
  useEffect(() => {
    let alive = true;
    try {
      const cached = sessionStorage.getItem("kt-rates");
      if (cached) {
        setRates(JSON.parse(cached) as Rates);
        return;
      }
    } catch {
      /* sin almacenamiento */
    }
    fetch("/api/rates")
      .then((r) => (r.ok ? (r.json() as Promise<Rates>) : FALLBACK_RATES))
      .then((r) => {
        if (!alive) return;
        setRates(r);
        try {
          sessionStorage.setItem("kt-rates", JSON.stringify(r));
        } catch {
          /* sin almacenamiento */
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const setCountry = useCallback((code: string) => {
    const c = countryByCode(code);
    setCountryState(c);
    try {
      localStorage.setItem("kt-country", c.code);
    } catch {
      /* sin almacenamiento */
    }
    document.cookie = `kt-country=${c.code}; path=/; max-age=${60 * 60 * 24 * 180}; samesite=lax`;
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      t,
      href: (path: string) => localize(path, lang),
      country,
      setCountry,
      rates,
      convert: (cop: number) => convert(cop, country, rates),
      money: (cop: number) => formatMoney(convert(cop, country, rates), country),
      moneyUsd: (usd: number) => formatMoney(convertUsd(usd, country, rates), country),
    }),
    [lang, t, country, setCountry, rates],
  );

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const v = useContext(I18nCtx);
  if (!v) throw new Error("useI18n debe usarse dentro de <I18nProvider>");
  return v;
}

export const useT = () => useI18n().t;
