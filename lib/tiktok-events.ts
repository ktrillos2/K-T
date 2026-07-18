import { createHash } from "crypto"

const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN
const TIKTOK_PIXEL_ID = process.env.TIKTOK_PIXEL_ID
const TIKTOK_TEST_EVENT_CODE = process.env.TIKTOK_TEST_EVENT_CODE

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
        ttp?: string // TikTok Cookie ID (_ttp)
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
        const userPayload: any = {
            ip: eventData.user?.ip || "",
            user_agent: eventData.user?.user_agent || "",
            ttclid: eventData.user?.ttclid || "",
            ttp: eventData.user?.ttp || ""
        }

        if (eventData.user?.external_id) {
            userPayload.external_id = sha256(String(eventData.user.external_id).trim())
        }

        // Email hashing
        if (eventData.user?.email) {
            const rawEmail = String(eventData.user.email).trim().toLowerCase()
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            const dummyEmails = ['mail@example.com', 'test@test.com', 'null', 'undefined']
            
            if (rawEmail !== "" && emailRegex.test(rawEmail) && !dummyEmails.includes(rawEmail)) {
                userPayload.email = sha256(rawEmail)
            }
        }

        // Phone hashing
        if (eventData.user?.phone) {
            const phone = String(eventData.user.phone).replace(/[^\d+]/g, "")
            if (phone.length > 5 && phone !== "null" && phone !== "undefined") {
                userPayload.phone_number = sha256(phone)
            }
        }

        // Correct structure for batch endpoint
        const requestBody: any = {
            pixel_code: TIKTOK_PIXEL_ID,
            event_source_id: TIKTOK_PIXEL_ID,
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

        if (TIKTOK_TEST_EVENT_CODE) {
            requestBody.test_event_code = TIKTOK_TEST_EVENT_CODE
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
