"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { en } from "@/dictionaries/en"
import { es } from "@/dictionaries/es"

type Language = "en" | "es"
export type Currency = "COP" | "USD" | "ARS" | "MXN" | "PEN" | "GS" | "UYU"

type Dictionary = typeof en

interface LanguageContextType {
  language: Language
  dictionary: Dictionary
  currency: Currency
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
  setCurrency: (currency: Currency) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")
  const [currency, setCurrency] = useState<Currency>("COP")

  const dictionary = language === "en" ? en : es

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"))
  }

  return (
    <LanguageContext.Provider value={{ language, dictionary, currency, toggleLanguage, setLanguage, setCurrency }}>
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
