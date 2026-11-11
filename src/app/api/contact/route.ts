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
const PHONE = /^\+[1-9]\d{7,14}$/;

/**
 * Envía la solicitud al equipo con Resend. Si el cliente deja un correo,
 * también envía una confirmación con la ficha de costos.
 */
export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "contacto@kytcode.lat";
  const from = process.env.CONTACT_FROM_EMAIL || "K&T Code <hola@kytcode.lat>";
  if (!key) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let data: Record<string, unknown>;
  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
    }
    data = body as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  // Campo trampa: los humanos no lo ven, los bots lo llenan.
  if (clean(data.website)) return NextResponse.json({ ok: true });
  if (data.email != null && typeof data.email !== "string") {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const lang = clean(data.lang, 2);
  const lead: Lead = {
    what: clean(data.what, 80),
    planIndex: Number.isInteger(data.planIndex) ? (data.planIndex as number) : -1,
    biz: clean(data.biz, 160),
    when: clean(data.when, 60),
    name: clean(data.name, 80),
    email: clean(data.email, 120).toLowerCase() || undefined,
    phone: clean(data.phone, 40).replace(/[\s().-]/g, ""),
    country: clean(data.country, 40),
    currency: clean(data.currency, 3),
    localPrice: clean(data.localPrice, 40) || undefined,
    lang: isLang(lang) ? lang : "es",
    page: clean(data.page, 200) || undefined,
  };
  if (!lead.what || !lead.name || !PHONE.test(lead.phone) || (lead.email && !EMAIL.test(lead.email))) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const team = teamEmail(lead);

  // 1. Notificación prioritaria al equipo (contacto@kytcode.lat)
  const teamRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      ...(lead.email ? { reply_to: lead.email } : {}),
      subject: team.subject,
      html: team.html,
    }),
  }).catch(() => null);

  const teamOk = !!teamRes?.ok;
  if (!teamOk) {
    const errText = teamRes ? await teamRes.text().catch(() => "") : "network";
    console.error("[contact] Error enviando correo al equipo:", teamRes?.status, errText);
  }

  if (!teamOk) {
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  // 2. Confirmación opcional con ficha de costos al cliente.
  if (lead.email) {
    const client = clientEmail(lead);
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [lead.email],
        reply_to: to.split(",")[0].trim(),
        subject: client.subject,
        html: client.html,
      }),
    }).catch((err) => {
      console.warn("[contact] Aviso al cliente no enviado:", err);
    });
  }

  return NextResponse.json({ ok: true });
}
