import { NextResponse } from "next/server";
import { PROJECTS } from "@/lib/projects";
import { esc } from "@/lib/email";
import { SANITY_API, SANITY_DATASET } from "@/lib/testimonials";

export const runtime = "nodejs";

/** Límite simple por IP (3 reseñas cada 10 minutos por instancia). */
const hits = new Map<string, number[]>();
const limited = (ip: string) => {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 3;
};

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u0009\u000b-\u001f]/g, " ").trim().slice(0, max) : "");

/**
 * Recibe una reseña (proyecto, nombre y mensaje).
 * 1. La guarda en Sanity como documento "testimonial" con status "pending" (SANITY_WRITE_TOKEN):
 *    es el mismo flujo del sitio anterior; al cambiarla a "approved" en Sanity Studio se publica sola.
 * 2. Avisa por correo al equipo con Resend (si está configurado), con el bloque listo para pegar
 *    en src/content/testimonials.ts por si prefieres publicarla a mano.
 */
export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let data: Record<string, unknown>;
  try {
    data = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (clean(data.website, 100)) return NextResponse.json({ ok: true }); // trampa para bots

  const project = PROJECTS.find((p) => p.slug === clean(data.project, 80));
  const name = clean(data.name, 80);
  const message = clean(data.message, 800);
  if (!project || name.length < 2 || message.length < 10) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });

  let saved = false;
  let mailed = false;

  // 1) Sanity (pendiente de aprobación)
  const token = process.env.SANITY_WRITE_TOKEN;
  if (token) {
    const res = await fetch(`${SANITY_API}/mutate/${SANITY_DATASET}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        mutations: [
          {
            create: {
              _type: "testimonial",
              name,
              project: project.name,
              ...(project.site ? { projectUrl: project.site } : {}),
              content: message,
              status: "pending",
            },
          },
        ],
      }),
    }).catch(() => null);
    saved = !!res?.ok;
    if (!saved) console.error("[reviews] Sanity error", res?.status, res ? await res.text().catch(() => "") : "network");
  }

  // 2) Aviso por correo
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (key && to && from) {
    const snippet = `{\n  id: "${project.slug}-${name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}",\n  project: "${project.slug}",\n  projectName: "${project.name}",\n  name: ${JSON.stringify(name)},\n  message: ${JSON.stringify(message)},\n  date: "${new Date().toISOString().slice(0, 10)}",\n  source: "web",\n},`;
    const html = `<div style="font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:1.6;color:#0b0b0c">
<h2 style="margin:0 0 12px">Nueva reseña · ${esc(project.name)}</h2>
<p><b>Nombre:</b> ${esc(name)}<br><b>Proyecto:</b> ${esc(project.name)}</p>
<blockquote style="margin:12px 0;padding:12px 16px;border-left:4px solid #62c453;background:#f4f4f0">${esc(message)}</blockquote>
<p>${saved ? "Quedó <b>pendiente</b> en Sanity: cámbiala a <b>approved</b> en Sanity Studio para publicarla." : "Para publicarla, pega este bloque en <code>src/content/testimonials.ts</code>:"}</p>
<pre style="background:#0b0b0c;color:#f2f2ee;padding:14px;border-radius:8px;white-space:pre-wrap">${esc(snippet)}</pre>
</div>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: to.split(",").map((s) => s.trim()), subject: `Nueva reseña: ${name} · ${project.name}`, html }),
    }).catch(() => null);
    mailed = !!res?.ok;
    if (!mailed) console.error("[reviews] Resend error", res?.status);
  }

  if (!saved && !mailed) return NextResponse.json({ ok: false, error: token || key ? "send_failed" : "not_configured" }, { status: 503 });
  return NextResponse.json({ ok: true, saved, mailed });
}
