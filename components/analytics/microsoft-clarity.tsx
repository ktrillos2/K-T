"use client"

import { useEffect, useState } from "react"
import Clarity from "@microsoft/clarity"

export default function MicrosoftClarity() {
    const [shouldLoad, setShouldLoad] = useState(false)
    const projectId = process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID || "v634mck150"

    useEffect(() => {
        // Only run in production
        if (process.env.NODE_ENV !== "production") return

        const enable = () => {
            setShouldLoad(true)
            cleanup()
        }

        const cleanup = () => {
            window.removeEventListener("pointerdown", enable)
            window.removeEventListener("keydown", enable)
            window.removeEventListener("scroll", enable)
            window.removeEventListener("touchstart", enable)
        }

        window.addEventListener("pointerdown", enable, { passive: true, once: true })
        window.addEventListener("keydown", enable, { passive: true, once: true })
        window.addEventListener("scroll", enable, { passive: true, once: true })
        window.addEventListener("touchstart", enable, { passive: true, once: true })

        return cleanup
    }, [])

    useEffect(() => {
        if (shouldLoad && projectId) {
            Clarity.init(projectId)
        }
    }, [shouldLoad, projectId])

    return null
}
