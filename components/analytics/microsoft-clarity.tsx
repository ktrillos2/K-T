"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Clarity from "@microsoft/clarity"

export default function MicrosoftClarity() {
    const projectId = process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID || "v634mck150"

    const [shouldLoad, setShouldLoad] = useState(false)

    const pathname = usePathname()
    const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/studio') || pathname?.startsWith('/crm') || pathname?.startsWith('/proyectos') || pathname?.startsWith('/finanzas')

    useEffect(() => {
        // Only run in production and not in admin routes
        if (process.env.NODE_ENV !== "production" || isAdminRoute) return

        const enable = () => {
            setShouldLoad(true)
            // Cleanup listeners
            window.removeEventListener("pointerdown", enable)
            window.removeEventListener("keydown", enable)
            window.removeEventListener("scroll", enable)
            window.removeEventListener("touchstart", enable)
        }

        // Add listeners for interaction
        window.addEventListener("pointerdown", enable, { passive: true, once: true })
        window.addEventListener("keydown", enable, { passive: true, once: true })
        window.addEventListener("scroll", enable, { passive: true, once: true })
        window.addEventListener("touchstart", enable, { passive: true, once: true })

        return () => {
            window.removeEventListener("pointerdown", enable)
            window.removeEventListener("keydown", enable)
            window.removeEventListener("scroll", enable)
            window.removeEventListener("touchstart", enable)
        }
    }, [])

    useEffect(() => {
        if (shouldLoad && projectId && !isAdminRoute) {
            Clarity.init(projectId)
        }
    }, [shouldLoad, projectId, isAdminRoute])

    return null
}
