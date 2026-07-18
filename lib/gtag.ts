import { trackTikTokEvent } from "@/app/actions/tiktok"

export const GA_CONVERSION_ID = 'AW-17825211485/4ScFCMvO9tUbEN3I3LNC'

export const reportPixelLead = () => {
    if (typeof window !== 'undefined') {
        if (typeof (window as any).fbq !== 'undefined') {
            (window as any).fbq('track', 'Lead');
        }
        if (typeof (window as any).ttq !== 'undefined') {
            (window as any).ttq.track('Contact');
        }
    }
    // Dispara el evento también mediante la API de servidor (Events API)
    trackTikTokEvent("Contact", {
        content_name: "WhatsApp Lead",
    }).catch(err => console.error("Error triggering server TikTok event:", err));
}

// @ts-ignore
export const reportConversion = (url: string) => {
    reportPixelLead();
    const callback = () => {
        if (typeof url !== 'undefined') {
            window.location.href = url
        }
    }

    // @ts-ignore
    if (typeof window.gtag !== 'undefined') {
        // @ts-ignore
        window.gtag('event', 'conversion', {
            'send_to': GA_CONVERSION_ID,
            'value': 1.0,
            'currency': 'COP',
            'event_callback': callback
        })
        return false
    } else {
        // Fallback if gtag is not loaded
        window.location.href = url
        return false
    }
}
