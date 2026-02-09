"use client"

import Script from "next/script"
import { useEffect, useState } from "react"

export default function GoogleTagManager() {
    const [shouldLoad, setShouldLoad] = useState(false)

    useEffect(() => {
        const enable = () => {
            setShouldLoad(true)
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

    if (!shouldLoad) return null

    return (
        <>
            <Script
                id="gtm"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WZJSH8FV');`,
                }}
            />
        </>
    )
}
