"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { en } from "@/dictionaries/en"
import { es } from "@/dictionaries/es"

type Language = "en" | "es"
export type Country = "Colombia" | "Panamá" | "Argentina" | "México" | "Ecuador" | "Perú" | "Paraguay" | "Uruguay"

type Dictionary = typeof en

interface LanguageContextType {
  language: Language
  dictionary: Dictionary
  country: Country
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
  setCountry: (country: Country) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")
  const [country, setCountry] = useState<Country>("Colombia")

  const dictionary = language === "en" ? en : es

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"))
  }

  return (
    <LanguageContext.Provider value={{ language, dictionary, country, toggleLanguage, setLanguage, setCountry }}>
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
