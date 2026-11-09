"use client";

import { useEffect } from "react";
import Script from "next/script";
import { trackEvent, WHATSAPP_LINK_SELECTOR } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function linkLocation(link: Element): string {
  const tagged = link.closest<HTMLElement>("[data-track]")?.dataset.track;
  if (tagged) return tagged;
  if (link.closest("header, nav")) return "menu";
  if (link.closest("footer")) return "pie";
  if (link.closest("article")) return "articulo";
  return "contenido";
}

/** Google Analytics y el registro de clics reales en WhatsApp, con un solo oyente para todos los enlaces del sitio. */
export function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.(WHATSAPP_LINK_SELECTOR);
      if (!link) return;
      const service = link.closest<HTMLElement>("[data-service]")?.dataset.service;
      trackEvent("whatsapp_click", { location: linkLocation(link), ...(service ? { service } : {}) });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag("js",new Date());gtag("config","${GA_ID}");`}
      </Script>
    </>
  );
}
