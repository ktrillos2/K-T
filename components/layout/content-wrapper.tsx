"use client"

import React, { useEffect } from "react"
import { useLanguage } from "@/context/language-context"
import { usePathname } from "next/navigation"

export default function ContentWrapper({ children }: { children: React.ReactNode }) {
    const { isAppReady } = useLanguage()
    const pathname = usePathname()

    // Ensure content is always accessible in the DOM for SEO bots and initial render
    // without blocking behind display: 'none'.

    // On other pages, or when ready, render children normally.

    // Add logic to handle anchor links when the app becomes ready
    useEffect(() => {
        if (isAppReady && window.location.hash) {
            const hash = window.location.hash
            // Small timeout to ensure DOM is fully rendered
            setTimeout(() => {
                const element = document.querySelector(hash)
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                }
            }, 100)
        }
    }, [isAppReady])

    return <>{children}</>
}
