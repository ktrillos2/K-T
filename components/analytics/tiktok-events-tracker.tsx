"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { trackTikTokEvent } from "@/app/actions/tiktok"

export default function TikTokEventsTracker() {
    const pathname = usePathname()

    useEffect(() => {
        if (pathname.startsWith('/admin') || pathname.startsWith('/crm') || pathname.startsWith('/proyectos') || pathname.startsWith('/finanzas') || pathname.startsWith('/usuarios')) return

        // Track ViewContent on path change
        trackTikTokEvent("ViewContent", {
            properties: {
                content_name: pathname, // or page title if available
                content_type: "product_group", // generic
                content_id: pathname === "/" ? "home" : pathname.replace(/^\//, ""), // ensure not empty
            }
        })
    }, [pathname])

    return null
}
