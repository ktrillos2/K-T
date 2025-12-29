"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

export default function GoogleAnalytics() {
    const [shouldLoad, setShouldLoad] = useState(false)

    const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-17825211485"

    useEffect(() => {
        if (process.env.NODE_ENV !== "production") return

        const enable = () => {
            setShouldLoad(true)
            window.removeEventListener("pointerdown", enable)
            window.removeEventListener("keydown", enable)
            window.removeEventListener("scroll", enable)
            window.removeEventListener("touchstart", enable)
        }

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

    if (process.env.NODE_ENV !== "production") return null
    if (!adsId) return null
    if (!shouldLoad) return null

    return (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(adsId)}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${adsId}');
        `}
            </Script>
        </>
    )
}
