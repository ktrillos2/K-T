import Clarity from "@microsoft/clarity"

/**
 * Identify the user to Clarity.
 * @param customId The unique identifier for the customer.
 * @param customSessionId A custom session identifier.
 * @param customPageId A custom page identifier.
 * @param friendlyName A friendly name for the customer.
 */
export const identify = (
    customId: string,
    customSessionId?: string,
    customPageId?: string,
    friendlyName?: string
) => {
    if (typeof window !== "undefined") {
        Clarity.identify(customId, customSessionId, customPageId, friendlyName)
    }
}

/**
 * Set a custom tag for the session.
 * @param key The key for the tag.
 * @param value The value(s) for the tag.
 */
export const setTag = (key: string, value: string | string[]) => {
    if (typeof window !== "undefined") {
        Clarity.setTag(key, value)
    }
}

/**
 * Track a custom event.
 * @param action The action/event name to track.
 */
export const event = (action: string) => {
    if (typeof window !== "undefined") {
        Clarity.event(action)
    }
}
