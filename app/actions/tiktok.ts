"use server"

import { sendTikTokEvent, TikTokEventName } from "@/lib/tiktok-events"
import { headers } from "next/headers"

/**
 * Server action to track TikTok events from the client side.
 * This proxies the event through the server to use the Events API.
 */
export async function trackTikTokEvent(
    eventName: TikTokEventName,
    properties: Record<string, any> = {},
    userData: {
        email?: string
        phone?: string
        external_id?: string
    } = {}
) {
    const headersList = headers()
    const ip = (await headersList).get("x-forwarded-for")?.split(",")[0] || ""
    const userAgent = (await headersList).get("user-agent") || ""
    const referer = (await headersList).get("referer") || ""
    // ttclid might be in cookies, but for simplicity here we assume it's passed or handled elsewhere if critical.
    // Ideally, parse cookies here if needed.

    const eventData = {
        event_name: eventName,
        user: {
            ...userData,
            ip,
            user_agent: userAgent,
        },
        page: {
            url: referer,
            referrer: referer, // Simplified
        },
        properties,
    }

    return await sendTikTokEvent(eventData)
}
