"use client"

import { createHash } from "crypto"

/**
 * SHA256 helper (Client-side compatible)
 * Note: crypto is Node.js only preferably, but for basic hashing we can use a small implementation 
 * or the Web Crypto API. For simplicity and since we used 'crypto' import which might fail on client,
 * let's use a pure JS implementation or Web Crypto API for the client.
 * Actually, importing 'crypto' in a "use client" file often breaks in Next.js edge/browser runtime 
 * if not polyfilled.
 * 
 * Better approach: Send unhashed data to TikTok Pixel if it supports it (it usually does for identify)
 * OR use a simple JS hash function. 
 * TikTok Pixel 'identify' takes plain text and hashes it internally usually, OR we send it hashed.
 * The docs say: "We recommend you hash PII data... before passing it."
 * 
 * Let's use a simple robust SHA-256 function using Web Crypto API.
 */

async function sha256(message: string) {
    const msgBuffer = new TextEncoder().encode(message)
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
}

export async function identifyTikTokUser(userData: {
    email?: string
    phone?: string
    external_id?: string
}) {
    if (typeof window === "undefined" || !(window as any).ttq) return

    const identityParams: any = {}

    if (userData.email && userData.email.trim() !== "") {
        identityParams.email = await sha256(userData.email.trim().toLowerCase())
    }

    if (userData.phone && userData.phone.trim() !== "") {
        // E.164 cleaner
        const phone = userData.phone.replace(/[^\d+]/g, "")
        if (phone.length > 5) {
            identityParams.phone = await sha256(phone)
        }
    }

    if (userData.external_id && userData.external_id.trim() !== "") {
        identityParams.external_id = await sha256(userData.external_id)
    }

    if (Object.keys(identityParams).length > 0) {
        // console.log("Identifying TikTok User...", identityParams)
        ; (window as any).ttq.identify(identityParams)
    }
}
