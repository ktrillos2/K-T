import { useLanguage } from "@/context/language-context"

export type PlanType = "landing" | "corporate" | "ecommerce" | "custom" | "social"

export function usePricing() {
    const { country, convertPrice, dictionary } = useLanguage()

    // Pricing tiers in USD (aligned with /precios)
    const TIER_HIGH: Record<string, number> = { landing: 200, corporate: 600, ecommerce: 450 } // USA, Panama, Mexico
    const TIER_LOW: Record<string, number> = { landing: 150, corporate: 500, ecommerce: 350 } // Argentina, Ecuador, Peru, Paraguay, Uruguay

    const getPrice = (plan: PlanType) => {
        // Custom and Social don't have fixed starting prices in this logic
        if (plan === "custom") return dictionary.services.custom.price
        if (plan === "social") return "Cotizar"

        const isEnglish = country === "Estados Unidos"
        const prefix = isEnglish ? "From " : "Desde "

        if (country === "Colombia") {
            if (plan === "landing") return "Desde $450.000 COP"
            if (plan === "corporate") return "Desde $2.500.000 COP"
            if (plan === "ecommerce") return "Desde $1.300.000 COP"
            return "Cotización personalizada"
        }

        // Define tiers
        const highTierCountries = ["Panamá", "México", "Estados Unidos", "Puerto Rico"]
        const isHighTier = highTierCountries.includes(country)
        const basePrice = isHighTier ? TIER_HIGH[plan] || 200 : TIER_LOW[plan] || 150

        const converted = convertPrice(basePrice)
        if (converted === "Loading...") return converted

        return `${prefix}${converted}`
    }

    return { getPrice }
}
