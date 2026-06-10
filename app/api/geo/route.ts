import { NextResponse } from "next/server"

export const runtime = "edge"

type GeoResponse = {
  countryName: string | null
  source: "vercel" | "cloudflare" | "none"
}

const COUNTRY_CODE_TO_NAME: Record<string, string> = {
  CO: "Colombia",
  PA: "Panama",
  AR: "Argentina",
  MX: "Mexico",
  EC: "Ecuador",
  PE: "Peru",
  PY: "Paraguay",
  UY: "Uruguay",
  US: "United States",
}

function normalizeCountryCode(raw: string | null): string | null {
  if (!raw) return null
  const code = raw.trim().toUpperCase()
  if (code.length !== 2) return null
  return code
}

export function GET(request: Request) {
  const headers = new Headers(request.headers)

  const vercel = normalizeCountryCode(headers.get("x-vercel-ip-country"))
  if (vercel && COUNTRY_CODE_TO_NAME[vercel]) {
    const body: GeoResponse = { countryName: COUNTRY_CODE_TO_NAME[vercel], source: "vercel" }
    return NextResponse.json(body, {
      headers: {
        // Cache at the edge for a bit; safe because it’s per-request header-derived.
        "cache-control": "private, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  }

  const cloudflare = normalizeCountryCode(headers.get("cf-ipcountry"))
  if (cloudflare && COUNTRY_CODE_TO_NAME[cloudflare]) {
    const body: GeoResponse = { countryName: COUNTRY_CODE_TO_NAME[cloudflare], source: "cloudflare" }
    return NextResponse.json(body, {
      headers: {
        "cache-control": "private, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  }

  const body: GeoResponse = { countryName: null, source: "none" }
  return NextResponse.json(body, {
    headers: {
      "cache-control": "no-store",
    },
  })
}
