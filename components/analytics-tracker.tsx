"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { trackAiTrafficArrival } from "@/lib/analytics"

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Detect and log traffic arrival from ChatGPT Search / AI Engines
    trackAiTrafficArrival()
  }, [pathname, searchParams])

  return null
}
