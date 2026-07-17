import { NextResponse } from "next/server"

import { createGameSession } from "@/lib/game-reward"
import { checkRateLimit, getRequestIp } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const requestIp = getRequestIp(request)
  const rateLimit = checkRateLimit(`game-session:${requestIp}`, 20, 600000)
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Demasiadas solicitudes." }, { status: 429 })
  }
  try {
    return NextResponse.json(
      { token: createGameSession() },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch {
    return NextResponse.json(
      { error: "La recompensa no está configurada todavía." },
      { status: 503 },
    )
  }
}
