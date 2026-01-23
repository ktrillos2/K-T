"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { useEffect, useState } from "react"

export default function TiktokPixel() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // Esto asegura que detecte cambios de ruta (Navegación en Next.js)
        // @ts-ignore
        if (isLoaded && window.ttq) {
            // @ts-ignore
            window.ttq.page()
        }
    }, [pathname, searchParams, isLoaded])

    return (
        <Script
            id="tiktok-pixel"
            // CAMBIO 1: Usa 'afterInteractive' para que cargue más rápido y no pierdas visitas de rebote
            strategy="afterInteractive"
            onLoad={() => {
                setIsLoaded(true)
                // Disparo inicial manual una vez que carga el script
                // @ts-ignore
                if (window.ttq) {
                    // @ts-ignore
                    window.ttq.page()
                }
            }}
            dangerouslySetInnerHTML={{
                __html: `
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
            var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
            ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
          
            ttq.load('D5PGFD3C77UAU1QU4SH0');
            // MANTENER COMENTADO: ttq.page(); 
            // Lo dejamos comentado porque lo manejamos arriba con onLoad y useEffect
          }(window, document, 'ttq');
        `,
            }}
        />
    )
}