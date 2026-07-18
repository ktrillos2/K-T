export const GA_CONVERSION_ID = 'AW-17825211485/4ScFCMvO9tUbEN3I3LNC'

export const reportMetaLead = () => {
    if (typeof window !== 'undefined' && typeof (window as any).fbq !== 'undefined') {
        (window as any).fbq('track', 'Lead');
    }
}

// @ts-ignore
export const reportConversion = (url: string) => {
    reportMetaLead();
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
