"use client"

import { useEffect } from "react"
import Clarity from "@microsoft/clarity"

// TODO: Replace with your actual Clarity Project ID
const PROJECT_ID = "uobtn7p0mf"

export default function ClarityAnalytics() {
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') return;

        if (PROJECT_ID && PROJECT_ID !== "yourProjectId") {
            Clarity.init(PROJECT_ID)
        } else {
            console.warn("Microsoft Clarity: Project ID is missing or set to placeholder.")
        }
    }, [])

    return null
}
