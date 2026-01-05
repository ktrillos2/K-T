"use client"

import type React from "react"
import { useLanguage } from "@/context/language-context"
import { usePathname } from "next/navigation"

export default function ContentWrapper({ children }: { children: React.ReactNode }) {
    const { isAppReady } = useLanguage()
    const pathname = usePathname()

    // If we are on the home page and the app is not ready (country not selected/modal active), 
    // render the content but hide it visually. This ensures SEO bots can find the H1 tag 
    // even if the user sees the Country Selector.
    if (pathname === "/" && !isAppReady) {
        return <div style={{ display: 'none' }}>{children}</div>
    }

    // On other pages, or when ready, render children normally.
    return <>{children}</>
}
