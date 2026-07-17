type Bucket = { count: number; resetAt: number }

declare global {
  // eslint-disable-next-line no-var
  var __kytRateLimitBuckets: Map<string, Bucket> | undefined
}

const buckets = globalThis.__kytRateLimitBuckets ?? new Map<string, Bucket>()
globalThis.__kytRateLimitBuckets = buckets

export function getRequestIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  )
}

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  const existing = buckets.get(key)

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs }
  }

  existing.count += 1
  buckets.set(key, existing)

  return {
    allowed: existing.count <= limit,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  }
}
