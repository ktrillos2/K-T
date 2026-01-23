"use client"

import { useEffect, useState } from "react"
import Clarity from "@microsoft/clarity"

export default function MicrosoftClarity() {
    const projectId = process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID || "v634mck150"

    useEffect(() => {
        // Only run in production
        if (process.env.NODE_ENV !== "production") return

        if (projectId) {
            Clarity.init(projectId)
        }
    }, [projectId])

    return null
}
