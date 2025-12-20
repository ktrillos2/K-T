"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { en } from "@/dictionaries/en"
import { es } from "@/dictionaries/es"

type Language = "en" | "es"
type Dictionary = typeof en

interface LanguageContextType {
  language: Language
  dictionary: Dictionary
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  const dictionary = language === "en" ? en : es

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"))
  }

  return (
    <LanguageContext.Provider value={{ language, dictionary, toggleLanguage, setLanguage }}>
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
