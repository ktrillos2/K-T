"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface CursorContextType {
  cursorVariant: "default" | "hover" | "text"
  setCursorVariant: (variant: "default" | "hover" | "text") => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "text">("default")

  return <CursorContext.Provider value={{ cursorVariant, setCursorVariant }}>{children}</CursorContext.Provider>
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider")
  }
  return context
}
