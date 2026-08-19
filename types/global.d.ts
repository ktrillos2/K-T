declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
    ttq?: any
  }
}

export {}
