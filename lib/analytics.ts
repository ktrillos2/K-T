/**
 * K&T Code Analytics & AI Search Engine Attribution Helper
 * Tracks visits and conversions from AI engines (ChatGPT Search, Perplexity, Claude, Gemini, Copilot) in GA4.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export type AiEngine = "chatgpt" | "perplexity" | "claude" | "gemini" | "copilot" | "organic_or_direct"

export interface AttributionInfo {
  source: string
  medium: string
  campaign?: string
  isAiSearch: boolean
  aiEngine: AiEngine
  landingPage: string
  referrer: string
}

const AI_ATTRIBUTION_STORAGE_KEY = "kyt_attribution_v1"

/**
 * Detects whether the current session was referred by an AI Search Engine or Generative Engine.
 */
export function detectTrafficAttribution(): AttributionInfo {
  if (typeof window === "undefined") {
    return {
      source: "server",
      medium: "none",
      isAiSearch: false,
      aiEngine: "organic_or_direct",
      landingPage: "/",
      referrer: "",
    }
  }

  const urlParams = new URLSearchParams(window.location.search)
  const utmSource = urlParams.get("utm_source")?.toLowerCase() || ""
  const utmMedium = urlParams.get("utm_medium")?.toLowerCase() || ""
  const utmCampaign = urlParams.get("utm_campaign") || undefined
  const referrer = (document.referrer || "").toLowerCase()

  let isAiSearch = false
  let aiEngine: AiEngine = "organic_or_direct"
  let source = utmSource || "direct"
  let medium = utmMedium || (referrer ? "referral" : "none")

  // Check for ChatGPT Search
  if (utmSource.includes("chatgpt") || referrer.includes("chatgpt.com") || referrer.includes("openai.com")) {
    isAiSearch = true
    aiEngine = "chatgpt"
    source = "chatgpt.com"
    medium = utmMedium || "ai_search"
  }
  // Check for Perplexity
  else if (utmSource.includes("perplexity") || referrer.includes("perplexity.ai")) {
    isAiSearch = true
    aiEngine = "perplexity"
    source = "perplexity.ai"
    medium = utmMedium || "ai_search"
  }
  // Check for Claude
  else if (utmSource.includes("claude") || referrer.includes("claude.ai") || referrer.includes("anthropic.com")) {
    isAiSearch = true
    aiEngine = "claude"
    source = "claude.ai"
    medium = utmMedium || "ai_search"
  }
  // Check for Gemini
  else if (referrer.includes("gemini.google.com") || utmSource.includes("gemini")) {
    isAiSearch = true
    aiEngine = "gemini"
    source = "gemini.google.com"
    medium = utmMedium || "ai_search"
  }
  // Check for Copilot
  else if (referrer.includes("copilot.microsoft.com") || utmSource.includes("copilot")) {
    isAiSearch = true
    aiEngine = "copilot"
    source = "copilot.microsoft.com"
    medium = utmMedium || "ai_search"
  } else if (referrer) {
    try {
      const parsed = new URL(referrer)
      source = parsed.hostname.replace(/^www\./, "")
    } catch {
      source = referrer
    }
  }

  const attribution: AttributionInfo = {
    source,
    medium,
    campaign: utmCampaign,
    isAiSearch,
    aiEngine,
    landingPage: window.location.pathname,
    referrer: document.referrer,
  }

  // Persist in sessionStorage for session-level lead attribution
  try {
    const existing = sessionStorage.getItem(AI_ATTRIBUTION_STORAGE_KEY)
    if (!existing || isAiSearch) {
      sessionStorage.setItem(AI_ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution))
    }
  } catch {
    // Ignore storage errors
  }

  return attribution
}

/**
 * Returns the stored attribution for the current user's session.
 */
export function getSessionAttribution(): AttributionInfo {
  if (typeof window === "undefined") {
    return {
      source: "server",
      medium: "none",
      isAiSearch: false,
      aiEngine: "organic_or_direct",
      landingPage: "/",
      referrer: "",
    }
  }

  try {
    const raw = sessionStorage.getItem(AI_ATTRIBUTION_STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch {
    // fallback to detection
  }

  return detectTrafficAttribution()
}

/**
 * Sends a custom event to Google Analytics 4 (GA4).
 */
export function trackGAEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return
  }

  const attribution = getSessionAttribution()

  window.gtag("event", eventName, {
    traffic_source: attribution.source,
    traffic_medium: attribution.medium,
    is_ai_search: attribution.isAiSearch,
    ai_engine: attribution.aiEngine,
    page_path: window.location.pathname,
    ...params,
  })
}

/**
 * Tracks AI traffic arrival specifically.
 */
export function trackAiTrafficArrival() {
  const attribution = detectTrafficAttribution()
  if (attribution.isAiSearch) {
    trackGAEvent("ai_search_session", {
      ai_engine: attribution.aiEngine,
      source: attribution.source,
      medium: attribution.medium,
      landing_page: attribution.landingPage,
    })
  }
}

/**
 * Tracks WhatsApp click with full traffic attribution.
 */
export function trackWhatsAppClick(location: string, extraData?: Record<string, any>) {
  const attribution = getSessionAttribution()

  trackGAEvent("whatsapp_click", {
    click_location: location,
    traffic_source: attribution.source,
    is_ai_search: attribution.isAiSearch,
    ai_engine: attribution.aiEngine,
    ...extraData,
  })
}

/**
 * Tracks a completed lead submission with AI source attribution.
 */
export function trackLeadSubmission(service: string, quote?: string) {
  const attribution = getSessionAttribution()

  trackGAEvent("generate_lead", {
    service_type: service,
    price_quote: quote,
    traffic_source: attribution.source,
    is_ai_search: attribution.isAiSearch,
    ai_engine: attribution.aiEngine,
  })
}
