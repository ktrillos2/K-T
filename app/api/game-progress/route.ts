import { NextResponse } from "next/server"

import { registerBossDefeat } from "@/lib/game-reward"
import { checkRateLimit, getRequestIp } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const requestIp = getRequestIp(request)
  const rateLimit = checkRateLimit(`game:${requestIp}:${request.url}`, 90, 600000)
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Demasiadas solicitudes." }, { status: 429 })
  }
  try {
    const body = await request.json()
    const result = registerBossDefeat(String(body.token || ""))

    if (!result) {
      return NextResponse.json(
        { error: "El progreso no pudo validarse." },
        { status: 400 },
      )
    }

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    })
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 })
  }
}
