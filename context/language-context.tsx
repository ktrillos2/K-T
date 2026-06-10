"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { en } from "@/dictionaries/en"
import { es } from "@/dictionaries/es"

type Language = "en" | "es"
export type Country =
  | "Colombia"
  | "Panamá"
  | "Argentina"
  | "México"
  | "Ecuador"
  | "Perú"
  | "Paraguay"
  | "Uruguay"
  | "Estados Unidos"
  | "Chile"
  | "Puerto Rico"

type Dictionary = typeof en

interface LanguageContextType {
  language: Language
  dictionary: Dictionary
  country: Country
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
  setCountry: (country: Country) => void

  convertPrice: (usdAmount: number) => string
  isAppReady: boolean
  setIsAppReady: (ready: boolean) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")
  const [country, setCountry] = useState<Country>("Colombia")
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [isAppReady, setIsAppReady] = useState(false)

  const dictionary = language === "en" ? en : es

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"))
  }

  const handleSetCountry = (newCountry: Country) => {
    setCountry(newCountry)
    if (typeof window !== "undefined") {
      localStorage.setItem("user_country", newCountry)
    }
    if (newCountry === "Estados Unidos") {
      setLanguage("en")
    } else {
      setLanguage("es")
    }
  }

  // Country to Currency Code Map
  const currencyMap: Record<Country, string> = {
    Colombia: "COP",
    Panamá: "USD",
    Argentina: "ARS",
    México: "MXN",
    Ecuador: "USD",
    Perú: "PEN",
    Paraguay: "PYG",
    Uruguay: "UYU",
    "Estados Unidos": "USD",
    Chile: "CLP",
    "Puerto Rico": "USD",
  }

  const EXCHANGE_CACHE_KEY = "kyt.exchangeRates.usd.v1"
  const EXCHANGE_CACHE_TTL_MS = 24 * 60 * 60 * 1000

  const loadExchangeRates = async () => {
    if (Object.keys(exchangeRates).length > 0) return

    try {
      const cachedRaw = typeof window !== "undefined" ? window.sessionStorage.getItem(EXCHANGE_CACHE_KEY) : null
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw) as { ts: number; rates: Record<string, number> }
        if (cached?.ts && cached?.rates && Date.now() - cached.ts < EXCHANGE_CACHE_TTL_MS) {
          setExchangeRates(cached.rates)
          return
        }
      }
    } catch {
      // Ignore cache errors
    }

    try {
      const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
      const data = await res.json()
      if (data?.rates) {
        setExchangeRates(data.rates)
        try {
          window.sessionStorage.setItem(EXCHANGE_CACHE_KEY, JSON.stringify({ ts: Date.now(), rates: data.rates }))
        } catch {
          // Ignore cache write errors
        }
      }
    } catch {
      // Silent fail: UI already handles missing rate with "Loading..."
    }
  }

  // Load exchange rates only when needed (non-Colombia users) and do it during idle time.
  useEffect(() => {
    if (country === "Colombia") return

    const schedule = () => {
      void loadExchangeRates()
    }

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(schedule, { timeout: 2000 })
      return () => (window as any).cancelIdleCallback?.(id)
    }

    const t = window.setTimeout(schedule, 800)
    return () => window.clearTimeout(t)
  }, [country])

  const convertPrice = (usdAmount: number) => {
    if (country === "Colombia") return "" // Handled specifically for fixed pricing

    const code = currencyMap[country]
    const rate = exchangeRates[code]

    if (!rate) return "Loading..."

    // No conversion needed for USD based countries if we want just the number, 
    // but the requirement says "convert... except Colombia". 
    // For Panama/Ecuador/USA it's 1:1 so it works naturally.

    if (code === "USD") {
      return `$${usdAmount.toLocaleString()} USD`
    }

    // For others, calculate
    const localAmount = usdAmount * rate

    // Rounding logic for cleaner numbers
    // If simplistic, just format. For "pretty" numbers like 1,005,000 GS it might need custom rounding but let's stick to math first.
    return `${localAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${code}`
  }

  // Detect user location on mount
  useEffect(() => {
    // 1. Priority: Check LocalStorage
    if (typeof window !== "undefined") {
      const storedCountry = localStorage.getItem("user_country") as Country | null
      const validCountries: Country[] = [
        "Colombia", "Panamá", "Argentina", "México", "Ecuador",
        "Perú", "Paraguay", "Uruguay", "Estados Unidos", "Chile", "Puerto Rico"
      ]

      if (storedCountry && validCountries.includes(storedCountry)) {
        handleSetCountry(storedCountry)
        return // Stop detection if stored
      }
    }

    // 2. Fallback: Auto-detect
    const detectCountry = async () => {
      try {
        // Prefer server-provided geo (no third-party rate limits, avoids PSI console errors)
        try {
          const res = await fetch("/api/geo", { cache: "no-store" })
          if (res.ok) {
            const geo = (await res.json()) as { countryName?: string | null }
            const countryName = geo?.countryName ?? null
            if (countryName) {
              const countryMap: Record<string, Country> = {
                Colombia: "Colombia",
                Panama: "Panamá",
                Argentina: "Argentina",
                Mexico: "México",
                Ecuador: "Ecuador",
                Peru: "Perú",
                Paraguay: "Paraguay",
                Uruguay: "Uruguay",
                "United States": "Estados Unidos",
                Chile: "Chile",
                "Puerto Rico": "Puerto Rico",
              }

              const detectedCountry = countryMap[countryName]
              if (detectedCountry) {
                handleSetCountry(detectedCountry)
                return
              }
            }
          }
        } catch {
          // Ignore and fall back
        }

        // Fallback (may be rate-limited on free tier)
        const response = await fetch("https://ipapi.co/json/")
        if (!response.ok) return
        const data = await response.json()
        const countryName = data.country_name

        const countryMap: Record<string, Country> = {
          Colombia: "Colombia",
          Panama: "Panamá",
          Argentina: "Argentina",
          Mexico: "México",
          Ecuador: "Ecuador",
          Peru: "Perú",
          Paraguay: "Paraguay",
          Uruguay: "Uruguay",
          "United States": "Estados Unidos",
          Chile: "Chile",
          "Puerto Rico": "Puerto Rico",
        }

        const detectedCountry = countryMap[countryName]
        if (detectedCountry) handleSetCountry(detectedCountry)
      } catch {
        // Ignore errors; keep defaults
      }
    }

    const schedule = () => {
      void detectCountry()
    }

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(schedule, { timeout: 2500 })
      return () => (window as any).cancelIdleCallback?.(id)
    }

    const t = window.setTimeout(schedule, 1200)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <LanguageContext.Provider
      value={{ language, dictionary, country, toggleLanguage, setLanguage, setCountry: handleSetCountry, convertPrice, isAppReady, setIsAppReady }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
