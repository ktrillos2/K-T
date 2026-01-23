import { useLanguage } from "@/context/language-context"

export type PlanType = "landing" | "ecommerce" | "custom" | "social"

export function usePricing() {
    const { country, convertPrice, dictionary } = useLanguage()

    // Pricing tiers in USD
    const TIER_HIGH = { landing: 200, ecommerce: 500 } // USA, Panama, Mexico
    const TIER_LOW = { landing: 150, ecommerce: 400 } // Argentina, Ecuador, Peru, Paraguay, Uruguay

    const getPrice = (plan: PlanType) => {
        // Custom and Social don't have fixed starting prices in this logic
        if (plan === "custom") return dictionary.services.custom.price
        if (plan === "social") return "Cotizar" // Or fetch from dictionary if available

        if (country === "Colombia") {
            return plan === "landing" ? "$450,000 COP" : "$1,300,000 COP"
        }

        // Define tiers
        const highTierCountries = ["Panamá", "México", "Estados Unidos"]
        const isHighTier = highTierCountries.includes(country)
        // @ts-ignore
        const basePrice = isHighTier ? TIER_HIGH[plan] : TIER_LOW[plan]

        return convertPrice(basePrice)
    }

    return { getPrice }
}
