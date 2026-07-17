import { createHmac, randomUUID, timingSafeEqual } from "node:crypto"

type SessionPayload = {
  type: "game-session"
  sid: string
  startedAt: number
  lastBossAt: number
  bosses: number
  exp: number
}

export type RewardPayload = {
  type: "game-reward"
  sid: string
  code: string
  discount: 10
  issuedAt: number
  exp: number
}

function getSecret() {
  const secret = process.env.GAME_REWARD_SECRET || process.env.AUTH_SECRET

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("GAME_REWARD_SECRET is not configured")
  }

  return secret || "kyt-local-development-secret-change-me"
}

function encode(value: object) {
  return Buffer.from(JSON.stringify(value)).toString("base64url")
}

function signature(encodedPayload: string) {
  return createHmac("sha256", getSecret()).update(encodedPayload).digest("base64url")
}

function sign<T extends object>(payload: T) {
  const encodedPayload = encode(payload)
  return `${encodedPayload}.${signature(encodedPayload)}`
}

function verify<T>(token: string): T | null {
  const [encodedPayload, providedSignature] = token.split(".")
  if (!encodedPayload || !providedSignature) return null

  const expectedSignature = signature(encodedPayload)
  const provided = Buffer.from(providedSignature)
  const expected = Buffer.from(expectedSignature)

  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return null
  }

  try {
    return JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as T
  } catch {
    return null
  }
}

export function createGameSession() {
  const now = Date.now()
  const payload: SessionPayload = {
    type: "game-session",
    sid: randomUUID(),
    startedAt: now,
    lastBossAt: now,
    bosses: 0,
    exp: now + 30 * 60 * 1000,
  }

  return sign(payload)
}

export function registerBossDefeat(token: string) {
  const payload = verify<SessionPayload>(token)
  const now = Date.now()

  if (
    !payload ||
    payload.type !== "game-session" ||
    payload.exp < now ||
    payload.bosses >= 3
  ) {
    return null
  }

  // Limita recompensas generadas mediante llamadas directas demasiado rápidas.
  const minimumTotalElapsed = (payload.bosses + 1) * 14_000
  const minimumSinceLastBoss = payload.bosses === 0 ? 12_000 : 10_000

  if (
    now - payload.startedAt < minimumTotalElapsed ||
    now - payload.lastBossAt < minimumSinceLastBoss
  ) {
    return null
  }

  const next: SessionPayload = {
    ...payload,
    bosses: payload.bosses + 1,
    lastBossAt: now,
  }

  return {
    token: sign(next),
    bosses: next.bosses,
  }
}

export function issueReward(token: string) {
  const payload = verify<SessionPayload>(token)
  const now = Date.now()

  if (
    !payload ||
    payload.type !== "game-session" ||
    payload.exp < now ||
    payload.bosses < 3 ||
    now - payload.startedAt < 42_000
  ) {
    return null
  }

  const rawCode = createHmac("sha256", getSecret())
    .update(`${payload.sid}:${payload.startedAt}:10`)
    .digest("hex")
    .slice(0, 8)
    .toUpperCase()

  const reward: RewardPayload = {
    type: "game-reward",
    sid: payload.sid,
    code: `KYT10-${rawCode}`,
    discount: 10,
    issuedAt: now,
    exp: now + 30 * 24 * 60 * 60 * 1000,
  }

  return {
    code: reward.code,
    discount: reward.discount,
    expiresAt: new Date(reward.exp).toISOString(),
    claimToken: sign(reward),
  }
}

export function verifyRewardClaim(claimToken?: string | null, code?: string | null) {
  if (!claimToken || !code) return null

  const payload = verify<RewardPayload>(claimToken)
  const now = Date.now()

  if (
    !payload ||
    payload.type !== "game-reward" ||
    payload.exp < now ||
    payload.code !== code ||
    payload.discount !== 10
  ) {
    return null
  }

  return payload
}
