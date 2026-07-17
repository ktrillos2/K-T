import { NextResponse } from "next/server"

import { issueReward } from "@/lib/game-reward"
import { checkRateLimit, getRequestIp } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const requestIp = getRequestIp(request)
  const rateLimit = checkRateLimit(`game:${requestIp}:${request.url}`, 20, 600000)
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Demasiadas solicitudes." }, { status: 429 })
  }
  try {
    const body = await request.json()
    const reward = issueReward(String(body.token || ""))

    if (!reward) {
      return NextResponse.json(
        { error: "La recompensa no pudo validarse." },
        { status: 400 },
      )
    }

    return NextResponse.json(reward, {
      headers: { "Cache-Control": "no-store" },
    })
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 })
  }
}
