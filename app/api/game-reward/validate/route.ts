import { NextResponse } from "next/server"

import { verifyRewardClaim } from "@/lib/game-reward"
import { checkRateLimit, getRequestIp } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const requestIp = getRequestIp(request)
  const rateLimit = checkRateLimit(`game:${requestIp}:${request.url}`, 30, 600000)
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Demasiadas solicitudes." }, { status: 429 })
  }
  try {
    const body = await request.json()
    const reward = verifyRewardClaim(
      String(body.claimToken || ""),
      String(body.code || ""),
    )

    if (!reward) {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    return NextResponse.json(
      {
        valid: true,
        code: reward.code,
        discount: reward.discount,
        expiresAt: new Date(reward.exp).toISOString(),
      },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 })
  }
}
