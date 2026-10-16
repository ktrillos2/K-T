import { NextResponse } from "next/server";
import { clientEmail, teamEmail, type Lead } from "@/lib/email";
import { isLang } from "@/i18n/config";

export const runtime = "nodejs";

/** Límite simple por IP (5 envíos cada 10 minutos por instancia). */
const hits = new Map<string, number[]>();
const limited = (ip: string) => {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
};

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Recibe el formulario tipo chat y envía dos correos con Resend:
 * uno al equipo (con el correo del cliente como respuesta) y una confirmación con la ficha de costos al cliente.
 */
export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let data: Record<string, unknown>;
  try {
    data = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  // Campo trampa: los humanos no lo ven, los bots lo llenan.
  if (clean(data.website)) return NextResponse.json({ ok: true });

  const lang = clean(data.lang, 2);
  const lead: Lead = {
    what: clean(data.what, 80),
    planIndex: Number.isInteger(data.planIndex) ? (data.planIndex as number) : -1,
    biz: clean(data.biz, 160),
    when: clean(data.when, 60),
    name: clean(data.name, 80),
    email: clean(data.email, 120).toLowerCase(),
    phone: clean(data.phone, 30) || undefined,
    country: clean(data.country, 40),
    currency: clean(data.currency, 3),
    localPrice: clean(data.localPrice, 40) || undefined,
    lang: isLang(lang) ? lang : "es",
    page: clean(data.page, 200) || undefined,
  };
  if (!lead.what || !lead.name || !EMAIL.test(lead.email)) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });

  const team = teamEmail(lead);
  const client = clientEmail(lead);
  const res = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      { from, to: to.split(",").map((s) => s.trim()), reply_to: lead.email, subject: team.subject, html: team.html },
      { from, to: [lead.email], reply_to: to.split(",")[0].trim(), subject: client.subject, html: client.html },
    ]),
  }).catch(() => null);

  if (!res || !res.ok) {
    const detail = res ? await res.text().catch(() => "") : "network";
    console.error("[contact] Resend error", res?.status, detail);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
