"use server"

import { sendTikTokEvent, TikTokEventName } from "@/lib/tiktok-events"
import { headers, cookies } from "next/headers"

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
        ttclid?: string // Extended to allow manual override
    } = {}
) {
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] || ""
    const userAgent = headersList.get("user-agent") || ""
    const referer = headersList.get("referer") || ""

    const cookieStore = await cookies()
    const ttclid = cookieStore.get("ttclid")?.value
    const ttp = cookieStore.get("_ttp")?.value
    const externalId = cookieStore.get("external_id")?.value

    const eventData = {
        event_name: eventName,
        user: {
            ...userData,
            email: userData.email || "", // Default to empty string
            phone: userData.phone || "", // Default to empty string
            ip,
            user_agent: userAgent,
            ttclid: userData.ttclid || ttclid || "",
            external_id: userData.external_id || externalId || "",
            ttp: ttp || ""
        },
        page: {
            url: referer,
            referrer: referer,
        },
        properties,
    }

    return await sendTikTokEvent(eventData)
}
