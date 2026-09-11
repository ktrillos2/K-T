export const GA_CONVERSION_ID = 'AW-17825211485/4ScFCMvO9tUbEN3I3LNC'

export const reportConversion = (url?: string) => {
    const callback = () => {
        if (typeof url === 'string' && url.length > 0 && typeof window !== 'undefined') {
            window.location.href = url
        }
    }

    if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'conversion', {
            'send_to': GA_CONVERSION_ID,
            'value': 1.0,
            'currency': 'COP',
            'event_callback': callback
        })
        return false
    } else if (typeof url === 'string' && url.length > 0 && typeof window !== 'undefined') {
        window.location.href = url
        return false
    }
    return false
}
