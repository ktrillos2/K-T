import { createHash } from "crypto"

const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN
const TIKTOK_PIXEL_ID = process.env.TIKTOK_PIXEL_ID

// Standard events supported by TikTok
export type TikTokEventName =
    | "ViewContent"
    | "ClickButton"
    | "Search"
    | "Contact"
    | "Lead"
    | "SubmitForm"
    | "CompleteRegistration"
// Add others as needed

interface TikTokEventData {
    event_name: TikTokEventName
    event_time?: number // Unix timestamp (seconds)
    event_id?: string // Deduplication ID
    user?: {
        email?: string
        phone?: string
        ip?: string
        user_agent?: string
        ttclid?: string // TikTok Click ID from cookie
        external_id?: string
    }
    page?: {
        url?: string
        referrer?: string
    }
    properties?: Record<string, any> // value, currency, content_type, etc.
}

/**
 * SHA256 helper for TikTok userdata hashing
 * TikTok requires email/phone to be lowercased and then hashed if not sent as plain text.
 * However, the Events API docs often allow sending plain text over HTTPS.
 * Best practice: verify if TikTok API expects hashed data.
 * The standard for pixel/server events usually recommends hashing emails and phones.
 */
function sha256(value: string): string {
    return createHash("sha256").update(value).digest("hex")
}

export async function sendTikTokEvent(eventData: TikTokEventData) {
    if (!TIKTOK_ACCESS_TOKEN || !TIKTOK_PIXEL_ID) {
        console.warn("TikTok Events API: Missing credentials in environment variables.")
        return { success: false, error: "Missing config" }
    }

    try {
        const timestamp = eventData.event_time || Math.floor(Date.now() / 1000)

        // Prepare user data
        const userPayload: any = {}
        if (eventData.user?.ip) userPayload.ip = eventData.user.ip
        if (eventData.user?.user_agent) userPayload.user_agent = eventData.user.user_agent
        if (eventData.user?.ttclid) userPayload.ttclid = eventData.user.ttclid
        if (eventData.user?.external_id) userPayload.external_id = sha256(eventData.user.external_id)

        // Email hashing
        if (eventData.user?.email) {
            const email = eventData.user.email.trim().toLowerCase()
            // It's safer to always hash PII for server events if uncertain, 
            // but some specific integrations allow plaintext. 
            // TikTok documents say: "The email address... should be hashed using SHA-256."
            userPayload.email = sha256(email)
        }

        // Phone hashing
        if (eventData.user?.phone) {
            // E.164 format recommended before hashing: +[country code][number]
            // Remove all non-numeric chars except leading +
            let phone = eventData.user.phone.replace(/[^\d+]/g, "")
            userPayload.phone = sha256(phone)
        }

        const payload = {
            pixel_code: TIKTOK_PIXEL_ID,
            event: eventData.event_name,
            event_time: timestamp,
            event_id: eventData.event_id,
            user: userPayload,
            properties: eventData.properties,
            context: {
                page: {
                    url: eventData.page?.url,
                    referrer: eventData.page?.referrer
                },
                ...eventData.user // IP and User Agent often go in context or user object depending on version
            }
            // Note: Structure varies slightly by API version. 
            // v1.3 /event/track/ usually takes a list of events "data": [...]
        }

        // Correct structure for batch endpoint (even for single event)
        const requestBody = {
            pixel_code: TIKTOK_PIXEL_ID,
            event_source: "web",
            data: [
                {
                    event: eventData.event_name,
                    event_time: timestamp,
                    event_id: eventData.event_id,
                    user: userPayload,
                    properties: eventData.properties,
                    context: {
                        page: {
                            url: eventData.page?.url,
                            referrer: eventData.page?.referrer
                        },
                        ip: eventData.user?.ip,
                        user_agent: eventData.user?.user_agent
                    }
                }
            ]
        }

        const response = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Token": TIKTOK_ACCESS_TOKEN,
            },
            body: JSON.stringify(requestBody),
        })

        const data = await response.json()

        if (data.code !== 0) {
            console.error("TikTok API Error:", data)
            return { success: false, error: data.message }
        }

        console.log(`[TikTok Event] ${eventData.event_name} sent successfully.`)
        return { success: true, data }

    } catch (error) {
        console.error("TikTok Event Exception:", error)
        return { success: false, error }
    }
}
