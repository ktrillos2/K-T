"use client"

import type React from "react"
import { useLanguage } from "@/context/language-context"
import { usePathname } from "next/navigation"

export default function ContentWrapper({ children }: { children: React.ReactNode }) {
    const { isAppReady } = useLanguage()
    const pathname = usePathname()

    // If we are on the home page and the app is not ready (country not selected/modal active), 
    // do not render the main content.
    if (pathname === "/" && !isAppReady) {
        return null
    }

    // On other pages, or when ready, render children.
    return <>{children}</>
}
