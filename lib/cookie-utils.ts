export function setCookie(name: string, value: string, days = 365) {
    if (typeof document === "undefined") return
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

export function getCookie(name: string) {
    if (typeof document === "undefined") return null
    return document.cookie.split("; ").reduce((r, v) => {
        const parts = v.split("=")
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, "")
}

export function getOrSetExternalId() {
    let id = getCookie("external_id")
    if (!id) {
        id = crypto.randomUUID()
        setCookie("external_id", id)
    }
    return id
}
