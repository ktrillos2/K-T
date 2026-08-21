"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
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

export function getTranslatedRoute(currentPathname: string, targetLanguage: "en" | "es"): string {
  const cleanPath = currentPathname.replace(/\/$/, "") || "/"

  // If target is English
  if (targetLanguage === "en") {
    if (cleanPath.startsWith("/en")) {
      return cleanPath
    }
    if (cleanPath === "/") {
      return "/en"
    }
    if (cleanPath === "/nosotros") {
      return "/en/about"
    }
    if (cleanPath === "/servicios") {
      return "/en/services"
    }
    if (cleanPath === "/precios" || cleanPath.startsWith("/precios/")) {
      return "/en/pricing"
    }
    if (cleanPath === "/portafolio") {
      return "/en/portfolio"
    }
    if (cleanPath === "/#contact" || cleanPath === "/contact") {
      return "/en/contact"
    }
    // Default fallback for any other Spanish route
    return "/en"
  }

  // If target is Spanish
  if (targetLanguage === "es") {
    if (!cleanPath.startsWith("/en")) {
      return cleanPath
    }
    if (cleanPath === "/en") {
      return "/"
    }
    if (cleanPath === "/en/about") {
      return "/nosotros"
    }
    if (cleanPath === "/en/services") {
      return "/servicios"
    }
    if (cleanPath === "/en/pricing") {
      return "/precios"
    }
    if (cleanPath === "/en/portfolio") {
      return "/portafolio"
    }
    if (cleanPath === "/en/contact") {
      return "/#contact"
    }
    // Default fallback for any other English route
    return "/"
  }

  return cleanPath
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isEnglishRoute = pathname?.startsWith("/en")

  const [language, setLanguage] = useState<Language>(isEnglishRoute ? "en" : "es")
  const [country, setCountry] = useState<Country>(isEnglishRoute ? "Estados Unidos" : "Colombia")
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})
  const [isAppReady, setIsAppReady] = useState(false)

  // Auto-sync language and country when route changes (e.g. direct navigation, back/forward)
  useEffect(() => {
    if (!pathname) return

    if (pathname.startsWith("/en")) {
      setLanguage("en")
      setCountry((prev) => (prev === "Colombia" ? "Estados Unidos" : prev))
    } else {
      setLanguage("es")
      setCountry((prev) => {
        if (prev === "Estados Unidos") {
          const stored = typeof window !== "undefined" ? (localStorage.getItem("user_country") as Country | null) : null
          const validCountries: Country[] = [
            "Colombia", "Panamá", "Argentina", "México", "Ecuador",
            "Perú", "Paraguay", "Uruguay", "Chile", "Puerto Rico"
          ]
          if (stored && validCountries.includes(stored)) {
            return stored
          }
          return "Colombia"
        }
        return prev
      })
    }
  }, [pathname])

  const dictionary = language === "en" ? en : es

  const handleSetCountry = useCallback(
    (newCountry: Country) => {
      const targetLang: Language = newCountry === "Estados Unidos" ? "en" : "es"

      setCountry(newCountry)
      setLanguage(targetLang)

      if (typeof window !== "undefined") {
        localStorage.setItem("user_country", newCountry)
      }

      if (!pathname) return

      // If switching to Spanish while currently on an English route
      if (targetLang === "es" && pathname.startsWith("/en")) {
        const targetRoute = getTranslatedRoute(pathname, "es")
        router.push(targetRoute)
      }
      // If switching to English while currently on a Spanish route
      else if (targetLang === "en" && !pathname.startsWith("/en")) {
        const targetRoute = getTranslatedRoute(pathname, "en")
        router.push(targetRoute)
      }
    },
    [pathname, router]
  )

  const handleSetLanguage = useCallback(
    (lang: Language) => {
      setLanguage(lang)
      if (lang === "en") {
        setCountry("Estados Unidos")
        if (typeof window !== "undefined") {
          localStorage.setItem("user_country", "Estados Unidos")
        }
        if (pathname && !pathname.startsWith("/en")) {
          router.push(getTranslatedRoute(pathname, "en"))
        }
      } else {
        if (country === "Estados Unidos") {
          const stored = typeof window !== "undefined" ? (localStorage.getItem("user_country") as Country | null) : null
          const fallback = stored && stored !== "Estados Unidos" ? stored : "Colombia"
          setCountry(fallback)
          if (typeof window !== "undefined") {
            localStorage.setItem("user_country", fallback)
          }
        }
        if (pathname && pathname.startsWith("/en")) {
          router.push(getTranslatedRoute(pathname, "es"))
        }
      }
    },
    [country, pathname, router]
  )

  const toggleLanguage = useCallback(() => {
    handleSetLanguage(language === "en" ? "es" : "en")
  }, [language, handleSetLanguage])

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

    const t = setTimeout(schedule, 800)
    return () => clearTimeout(t)
  }, [country])

  const convertPrice = (usdAmount: number) => {
    if (country === "Colombia") return "" // Handled specifically for fixed pricing

    const code = currencyMap[country]
    const rate = exchangeRates[code]

    if (!rate) return "Loading..."

    if (code === "USD") {
      return `$${usdAmount.toLocaleString()} USD`
    }

    const localAmount = usdAmount * rate
    return `${localAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${code}`
  }

  // Detect user location on mount
  useEffect(() => {
    const isEnPath = pathname?.startsWith("/en")

    // 1. Priority: Check LocalStorage
    if (typeof window !== "undefined") {
      const storedCountry = localStorage.getItem("user_country") as Country | null
      const validCountries: Country[] = [
        "Colombia", "Panamá", "Argentina", "México", "Ecuador",
        "Perú", "Paraguay", "Uruguay", "Estados Unidos", "Chile", "Puerto Rico"
      ]

      if (storedCountry && validCountries.includes(storedCountry)) {
        if (isEnPath) {
          setCountry(storedCountry === "Colombia" ? "Estados Unidos" : storedCountry)
          setLanguage("en")
        } else {
          setCountry(storedCountry === "Estados Unidos" ? "Colombia" : storedCountry)
          setLanguage("es")
        }
        return
      }
    }

    // 2. Fallback: Auto-detect
    const detectCountry = async () => {
      try {
        let countryName: string | null = null
        try {
          const res = await fetch("/api/geo", { cache: "no-store" })
          if (res.ok) {
            const geo = (await res.json()) as { countryName?: string | null }
            countryName = geo?.countryName ?? null
          }
        } catch {
          // Ignore and fall back
        }

        if (!countryName) {
          const response = await fetch("https://ipapi.co/json/")
          if (response.ok) {
            const data = await response.json()
            countryName = data.country_name
          }
        }

        if (countryName) {
          const countryNameMap: Record<string, Country> = {
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

          const detectedCountry = countryNameMap[countryName]
          if (detectedCountry) {
            if (typeof window !== "undefined") {
              localStorage.setItem("user_country", detectedCountry)
            }
            if (isEnPath) {
              setCountry(detectedCountry === "Colombia" ? "Estados Unidos" : detectedCountry)
              setLanguage("en")
            } else {
              setCountry(detectedCountry === "Estados Unidos" ? "Colombia" : detectedCountry)
              setLanguage("es")
            }
          }
        }
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

    const t = setTimeout(schedule, 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <LanguageContext.Provider
      value={{
        language,
        dictionary,
        country,
        toggleLanguage,
        setLanguage: handleSetLanguage,
        setCountry: handleSetCountry,
        convertPrice,
        isAppReady,
        setIsAppReady,
      }}
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
