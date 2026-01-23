"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { trackTikTokEvent } from "@/app/actions/tiktok"

export default function TikTokEventsTracker() {
    const pathname = usePathname()

    useEffect(() => {
        // Track ViewContent on path change
        trackTikTokEvent("ViewContent", {
            properties: {
                content_name: pathname, // or page title if available
                content_type: "product_group", // generic
            }
        })
    }, [pathname])

    return null
}
