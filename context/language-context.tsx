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

type Dictionary = typeof en

interface LanguageContextType {
  language: Language
  dictionary: Dictionary
  country: Country
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
  setCountry: (country: Country) => void
  convertPrice: (usdAmount: number) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")
  const [country, setCountry] = useState<Country>("Colombia")
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({})

  const dictionary = language === "en" ? en : es

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"))
  }

  const handleSetCountry = (newCountry: Country) => {
    setCountry(newCountry)
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
  }

  // Fetch exchange rates
  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        setExchangeRates(data.rates)
      })
      .catch((err) => console.error("Error fetching rates:", err))
  }, [])

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

  // Detect user location on mount (existing logic)

  // Detect user location on mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/")
        if (!response.ok) throw new Error("Failed to fetch location")
        const data = await response.json()
        const countryName = data.country_name

        // Map English country names to our internal Country type
        const countryMap: Record<string, Country> = {
          "Colombia": "Colombia",
          "Panama": "Panamá",
          "Argentina": "Argentina",
          "Mexico": "México",
          "Ecuador": "Ecuador",
          "Peru": "Perú",
          "Paraguay": "Paraguay",
          "Uruguay": "Uruguay",
          "United States": "Estados Unidos",
        }

        const detectedCountry = countryMap[countryName]
        if (detectedCountry) {
          handleSetCountry(detectedCountry)
        }
        // Fallback or unknown countries remain as default (Colombia)
      } catch (error) {
        console.error("Location detection failed:", error)
        // Fallback remains Colombia
      }
    }

    detectCountry()
  }, [])

  return (
    <LanguageContext.Provider
      value={{ language, dictionary, country, toggleLanguage, setLanguage, setCountry: handleSetCountry, convertPrice }}
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
