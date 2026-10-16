import { PLANS, type PlanId } from "./pricing";
import { SITE } from "./site";
import { formatCOP } from "./money";
import { getDict } from "@/i18n";
import type { Lang } from "@/i18n/config";

export type Lead = {
  what: string;
  planIndex: number;
  biz: string;
  when: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  currency: string;
  localPrice?: string;
  lang: Lang;
  page?: string;
};

const PLAN_ORDER: PlanId[] = ["landing", "tienda", "corporativo", "software"];
export const planForIndex = (i: number): PlanId | null => PLAN_ORDER[i] ?? null;

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const shell = (title: string, body: string) => `<!doctype html><html><body style="margin:0;background:#0b0b0c;font-family:ui-monospace,Menlo,Consolas,monospace;color:#f2f2ee">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0c;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#141416;border:1px solid #2a2a2f;border-radius:16px;overflow:hidden">
<tr><td style="padding:14px 18px;background:#1c1c1f;border-bottom:1px solid #2a2a2f">
<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#ef685f"></span>
<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#f6bd4e;margin-left:4px"></span>
<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#62c453;margin-left:4px"></span>
<span style="color:#8b8b92;font-size:12px;margin-left:12px">${esc(title)}</span></td></tr>
<tr><td style="padding:24px 22px;font-size:14px;line-height:1.65">${body}</td></tr>
<tr><td style="padding:14px 22px;border-top:1px solid #2a2a2f;color:#8b8b92;font-size:12px">${SITE.name} · ${SITE.city}, ${SITE.country} · <a href="${SITE.url}" style="color:#62c453">kytcode.lat</a></td></tr>
</table></td></tr></table></body></html>`;

function sheetHtml(lead: Lead) {
  const t = getDict(lead.lang);
  const c = t.contact;
  const id = planForIndex(lead.planIndex);
  const plans = id ? PLANS.filter((p) => p.id === id) : PLANS;
  const rows = plans
    .map((p) => {
      const d = t.pricing.plans[p.id];
      const local = id && lead.localPrice && lead.currency !== "COP" ? `<div style="color:#8b8b92;font-size:12px">≈ ${esc(lead.localPrice)}</div>` : "";
      return `<div style="border:1px solid #2a2a2f;border-radius:12px;padding:16px;margin:0 0 12px">
<div style="font-size:18px;font-weight:700">${esc(d.name)}</div>
<div style="color:#8b8b92;font-size:13px;margin:4px 0 10px">${esc(d.pitch)}</div>
<div style="font-size:12px;color:#8b8b92">${esc(c.sheetFrom)}</div>
<div style="font-size:24px;font-weight:700;color:#62c453">${p.quote ? esc(t.price.quote) + " · " : ""}${formatCOP(p.from)} COP</div>${local}
<div style="font-size:12px;color:#8b8b92;margin-top:8px">${esc(c.sheetDelivery)}: ${esc(d.delivery)}</div>
<div style="font-size:12px;color:#8b8b92;margin-top:10px">${esc(c.sheetIncludes)}:</div>
<ul style="margin:6px 0 0;padding-left:18px">${d.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></div>`;
    })
    .join("");
  return `<h2 style="font-size:16px;margin:18px 0 12px">${esc(id ? c.sheetTitle : c.sheetAll)}</h2>${rows}<p style="color:#8b8b92;font-size:12px">${esc(c.sheetNote)}</p>`;
}

/** Correo interno para el equipo con los datos del prospecto. */
export function teamEmail(lead: Lead) {
  const row = (k: string, v?: string) => (v ? `<tr><td style="color:#8b8b92;padding:4px 12px 4px 0;vertical-align:top">${esc(k)}</td><td style="padding:4px 0">${esc(v)}</td></tr>` : "");
  const wa = lead.phone ? `https://wa.me/${lead.phone.replace(/\D/g, "")}` : null;
  const body = `<p style="font-size:18px;margin:0 0 14px">Nuevo prospecto: <b>${esc(lead.name)}</b></p>
<table role="presentation" style="font-size:14px">${row("Quiere", lead.what)}${row("Negocio", lead.biz)}${row("Plazo", lead.when)}${row("Correo", lead.email)}${row("WhatsApp", lead.phone)}${row("País", `${lead.country} (${lead.currency})`)}${row("Precio que vio", lead.localPrice)}${row("Idioma", lead.lang)}${row("Página", lead.page)}</table>
<p style="margin:18px 0 0"><a href="mailto:${esc(lead.email)}" style="color:#0b0b0c;background:#f2f2ee;padding:10px 14px;border-radius:8px;text-decoration:none;display:inline-block">Responder por correo</a>${wa ? ` <a href="${wa}" style="color:#0b0b0c;background:#25d366;padding:10px 14px;border-radius:8px;text-decoration:none;display:inline-block">Abrir WhatsApp</a>` : ""}</p>`;
  return { subject: `Nuevo proyecto: ${lead.what} — ${lead.name}`, html: shell("kt nuevo-proyecto", body) };
}

/** Confirmación para el cliente con la ficha de costos del servicio que eligió. */
export function clientEmail(lead: Lead) {
  const t = getDict(lead.lang);
  const en = lead.lang === "en";
  const body = `<p style="font-size:18px;margin:0 0 10px">${en ? "Hi" : "Hola"} ${esc(lead.name)} 👋</p>
<p style="margin:0 0 6px">${en ? "We received your project details and we'll reply the same business day." : "Recibimos la información de tu proyecto y te respondemos el mismo día hábil."}</p>
<p style="margin:0;color:#8b8b92">${esc(t.contact.message({ what: lead.what, biz: lead.biz, when: lead.when, name: lead.name })).replace(/\n/g, "<br>")}</p>
${sheetHtml(lead)}
<p style="margin:16px 0 0"><a href="https://wa.me/${SITE.phoneRaw}" style="color:#0b0b0c;background:#25d366;padding:10px 14px;border-radius:8px;text-decoration:none;display:inline-block">${en ? "Chat on WhatsApp" : "Escríbenos por WhatsApp"}</a></p>`;
  return { subject: en ? `Your K&T Code project: ${lead.what}` : `Tu proyecto con K&T Code: ${lead.what}`, html: shell(en ? "kt new-project" : "kt nuevo-proyecto", body) };
}
