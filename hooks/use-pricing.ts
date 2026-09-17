import { useLanguage } from "@/context/language-context"

export type PlanType = "landing" | "corporate" | "ecommerce" | "custom" | "social"

export function usePricing() {
    const { country, convertPrice, dictionary, language } = useLanguage()

    // Pricing tiers in USD (aligned with /precios)
    const TIER_HIGH: Record<string, number> = { landing: 200, corporate: 600, ecommerce: 450, custom: 1200 } // USA, Panama, Mexico, Puerto Rico
    const TIER_LOW: Record<string, number> = { landing: 150, corporate: 500, ecommerce: 350, custom: 950 } // Argentina, Ecuador, Peru, Paraguay, Uruguay, Chile

    const getPrice = (plan: PlanType) => {
        if (plan === "social") return language === "en" ? "Quote" : "Cotizar"

        const isEnglish = language === "en" || country === "Estados Unidos"
        const prefix = isEnglish ? "From " : "Desde "

        if (country === "Colombia") {
            if (plan === "landing") return "Desde $450.000 COP"
            if (plan === "corporate") return "Desde $2.500.000 COP"
            if (plan === "ecommerce") return "Desde $1.300.000 COP"
            if (plan === "custom") return "Desde $4.500.000 COP / Cotización"
            return "Cotización personalizada"
        }

        // Define tiers
        const highTierCountries = ["Panamá", "México", "Estados Unidos", "Puerto Rico"]
        const isHighTier = highTierCountries.includes(country)
        const basePrice = isHighTier ? (TIER_HIGH[plan] || 200) : (TIER_LOW[plan] || 150)

        const converted = convertPrice(basePrice)

        if (plan === "custom") {
            if (!converted || converted === "Loading...") {
                return isEnglish ? `From $${basePrice.toLocaleString()} USD / Quote` : `Desde $${basePrice.toLocaleString()} USD / Cotización`
            }
            return `${prefix}${converted} / ${isEnglish ? "Quote" : "Cotización"}`
        }

        if (!converted || converted === "Loading...") {
            return `${prefix}$${basePrice} USD`
        }

        return `${prefix}${converted}`
    }

    return { getPrice }
}
