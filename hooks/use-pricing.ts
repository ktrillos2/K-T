import { useLanguage } from "@/context/language-context"

export type PlanType = "landing" | "ecommerce" | "custom" | "social"

export function usePricing() {
    const { country, convertPrice, dictionary } = useLanguage()

    // Base prices in USD
    const BASE_PRICES_USD = { landing: 200, ecommerce: 450 }

    const getPrice = (plan: PlanType) => {
        // Custom and Social don't have fixed starting prices in this logic
        if (plan === "custom") return dictionary.services.custom.price
        if (plan === "social") return "Cotizar" // Or fetch from dictionary if available

        if (country === "Colombia") {
            return plan === "landing" ? "$450,000 COP" : "$1,300,000 COP"
        }

        // @ts-ignore
        const basePrice = BASE_PRICES_USD[plan]

        return convertPrice(basePrice)
    }

    return { getPrice }
}
