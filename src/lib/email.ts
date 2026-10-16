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

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const LOGO_URL = "https://cdn.sanity.io/images/bc3zxc91/production/1ff3027f84248e0273fc020e7fd7b8746016e148-500x500.png";

/** Estructura base estilo terminal dark mode con logo oficial para todos los correos. */
const shell = (title: string, body: string) => `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#0b0b0c;font-family:ui-monospace,Menlo,Consolas,Monaco,'Segoe UI',Roboto,monospace;color:#f2f2ee;-webkit-font-smoothing:antialiased">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0b0c;padding:32px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#141416;border:1px solid #2a2a2f;border-radius:16px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.6)">
          <!-- Barra superior de terminal con logo -->
          <tr>
            <td style="padding:14px 20px;background-color:#1c1c1f;border-bottom:1px solid #2a2a2f">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="vertical-align:middle">
                    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#ef685f;margin-right:4px"></span>
                    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#f6bd4e;margin-right:4px"></span>
                    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#62c453;margin-right:12px"></span>
                    <img src="${LOGO_URL}" width="24" height="24" alt="K&T Code" style="display:inline-block;vertical-align:middle;border-radius:4px;margin-right:8px" />
                    <span style="color:#f2f2ee;font-size:13px;font-weight:700;vertical-align:middle">K&amp;T CODE</span>
                    <span style="color:#8b8b92;font-size:12px;margin-left:8px;vertical-align:middle">// ${esc(title)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contenido principal -->
          <tr>
            <td style="padding:32px 28px;font-size:14px;line-height:1.65;color:#f2f2ee">
              ${body}
            </td>
          </tr>

          <!-- Pie de página de marca -->
          <tr>
            <td style="padding:20px 28px;background-color:#111113;border-top:1px solid #2a2a2f;color:#8b8b92;font-size:12px;text-align:center">
              <p style="margin:0 0 6px">
                <a href="${SITE.url}" target="_blank" rel="noopener noreferrer" style="color:#f2f2ee;text-decoration:none;font-weight:700">
                  Desarrollado por K&amp;T <span style="color:#ffffff">🤍</span>
                </a>
              </p>
              <p style="margin:0;color:#6b6b72">
                © ${new Date().getFullYear()} K&amp;T CODE · Diseño único y código a la medida · ${SITE.city}, ${SITE.country}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

function sheetHtml(lead: Lead) {
  const t = getDict(lead.lang);
  const c = t.contact;
  const id = planForIndex(lead.planIndex);
  const plans = id ? PLANS.filter((p) => p.id === id) : PLANS;
  const rows = plans
    .map((p) => {
      const d = t.pricing.plans[p.id];
      const local =
        id && lead.localPrice && lead.currency !== "COP"
          ? `<div style="color:#8b8b92;font-size:12px">≈ ${esc(lead.localPrice)}</div>`
          : "";
      return `<div style="border:1px solid #2a2a2f;border-radius:12px;padding:18px;margin:0 0 14px;background-color:#18181b">
<div style="font-size:18px;font-weight:700;color:#f2f2ee">${esc(d.name)}</div>
<div style="color:#8b8b92;font-size:13px;margin:4px 0 12px">${esc(d.pitch)}</div>
<div style="font-size:11px;color:#8b8b92;text-transform:uppercase;letter-spacing:0.05em">${esc(c.sheetFrom)}</div>
<div style="font-size:22px;font-weight:800;color:#62c453;margin:2px 0 8px">${p.quote ? esc(t.price.quote) + " · " : ""}${formatCOP(p.from)} COP</div>${local}
<div style="font-size:12px;color:#8b8b92;margin-top:8px">⏱️ ${esc(c.sheetDelivery)}: <strong style="color:#f2f2ee">${esc(d.delivery)}</strong></div>
<div style="font-size:12px;color:#8b8b92;margin-top:12px">${esc(c.sheetIncludes)}:</div>
<ul style="margin:6px 0 0;padding-left:20px;color:#d4d4d8">${d.features.map((f) => `<li style="margin-bottom:4px">${esc(f)}</li>`).join("")}</ul></div>`;
    })
    .join("");
  return `<h2 style="font-size:16px;margin:24px 0 14px;color:#62c453">// ${esc(id ? c.sheetTitle : c.sheetAll)}</h2>${rows}<p style="color:#8b8b92;font-size:12px">${esc(c.sheetNote)}</p>`;
}

/** Correo interno para notificar a contacto@kytcode.lat sobre un nuevo lead desde la web */
export function teamEmail(lead: Lead) {
  const row = (icon: string, label: string, value?: string, isHighlight = false) =>
    value
      ? `<tr>
          <td style="color:#8b8b92;padding:9px 12px 9px 0;border-bottom:1px solid #222226;vertical-align:top;font-size:13px;width:150px">
            ${icon} ${esc(label)}
          </td>
          <td style="padding:9px 0;border-bottom:1px solid #222226;font-size:14px;color:${isHighlight ? "#62c453;font-weight:700" : "#f2f2ee"}">
            ${esc(value)}
          </td>
        </tr>`
      : "";

  const rawPhone = lead.phone ? lead.phone.replace(/\D/g, "") : "";
  const waLink = rawPhone ? `https://wa.me/${rawPhone}` : null;

  const body = `
    <!-- Badge de estado -->
    <div style="margin-bottom:18px">
      <span style="background-color:rgba(98,196,83,0.15);color:#73d964;border:1px solid rgba(98,196,83,0.3);font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;padding:5px 12px;border-radius:6px;display:inline-block">
        ⚡ NUEVO LEAD DESDE LA WEB
      </span>
    </div>

    <h1 style="margin:0 0 6px;font-size:22px;font-weight:800;color:#f2f2ee;letter-spacing:-0.02em">
      ¡Nuevo cliente interesado en tu web!
    </h1>
    <p style="margin:0 0 24px;color:#8b8b92;font-size:14px">
      Un prospecto completó el formulario de contacto de <strong>kytcode.lat</strong>.
    </p>

    <!-- Ficha de datos del cliente -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#18181b;border:1px solid #2a2a2f;border-radius:12px;padding:16px 20px;margin-bottom:24px">
      ${row("👤", "Nombre", lead.name, true)}
      ${row("📱", "WhatsApp", lead.phone)}
      ${row("✉️", "Correo", lead.email)}
      ${row("🚀", "Quiere construir", lead.what, true)}
      ${row("🏢", "Negocio", lead.biz)}
      ${row("⏱️", "Plazo deseado", lead.when)}
      ${row("🌎", "País / Moneda", `${lead.country} (${lead.currency})`)}
      ${row("💵", "Precio que vio", lead.localPrice)}
      ${row("🌐", "Idioma web", lead.lang === "en" ? "Inglés (EN)" : "Español (ES)")}
      ${row("🔗", "Página origen", lead.page)}
    </table>

    <!-- Acciones rápidas para el equipo -->
    <div style="margin:28px 0 10px;text-align:left">
      ${
        waLink
          ? `<a href="${waLink}" target="_blank" rel="noopener noreferrer" style="background-color:#25d366;color:#0b0b0c;padding:12px 20px;border-radius:8px;font-weight:800;text-decoration:none;display:inline-block;margin-right:12px;font-size:14px;box-shadow:0 4px 14px rgba(37,211,102,0.3)">
              💬 Abrir WhatsApp con ${esc(lead.name.split(" ")[0])}
            </a>`
          : ""
      }
      <a href="mailto:${esc(lead.email)}?subject=${encodeURIComponent(`Respuesta K&T Code: ${lead.what}`)}" style="background-color:#f2f2ee;color:#0b0b0c;padding:12px 20px;border-radius:8px;font-weight:800;text-decoration:none;display:inline-block;font-size:14px">
        ✉️ Responder por Correo
      </a>
    </div>
  `;

  return {
    subject: `⚡ Nuevo Lead desde la web: ${lead.name} · ${lead.what}`,
    html: shell("kt lead-inbox", body),
  };
}

/** Confirmación para el cliente con el branding de K&T Code y la ficha de costos */
export function clientEmail(lead: Lead) {
  const t = getDict(lead.lang);
  const en = lead.lang === "en";

  const body = `
    <div style="margin-bottom:18px">
      <span style="background-color:rgba(98,196,83,0.15);color:#73d964;border:1px solid rgba(98,196,83,0.3);font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;padding:5px 12px;border-radius:6px;display:inline-block">
        ${en ? "PROJECT RECEIVED" : "PROYECTO RECIBIDO"}
      </span>
    </div>

    <h1 style="margin:0 0 10px;font-size:22px;font-weight:800;color:#f2f2ee;letter-spacing:-0.02em">
      ${en ? "Hi" : "Hola"} ${esc(lead.name)} 👋
    </h1>
    <p style="margin:0 0 16px;color:#d4d4d8;font-size:15px;line-height:1.6">
      ${
        en
          ? "We received your project details. We will review your requirements and respond the same business day."
          : "Recibimos la información de tu proyecto. Revisaremos los detalles y te responderemos el mismo día hábil."
      }
    </p>

    <!-- Resumen de lo enviado -->
    <div style="background-color:#18181b;border-left:4px solid #62c453;padding:14px 18px;border-radius:8px;margin-bottom:24px;color:#8b8b92;font-size:13px;line-height:1.6">
      ${esc(t.contact.message({ what: lead.what, biz: lead.biz, when: lead.when, name: lead.name })).replace(/\n/g, "<br>")}
      ${lead.phone ? `<br><strong style="color:#f2f2ee">WhatsApp:</strong> ${esc(lead.phone)}` : ""}
    </div>

    ${sheetHtml(lead)}

    <div style="margin:28px 0 10px">
      <a href="https://wa.me/${SITE.phoneRaw}" target="_blank" rel="noopener noreferrer" style="background-color:#25d366;color:#0b0b0c;padding:12px 22px;border-radius:8px;font-weight:800;text-decoration:none;display:inline-block;font-size:14px;box-shadow:0 4px 14px rgba(37,211,102,0.3)">
        💬 ${en ? "Chat with us on WhatsApp" : "Escríbenos directamente por WhatsApp"}
      </a>
    </div>
  `;

  return {
    subject: en ? `Your K&T Code project: ${lead.what} 🚀` : `Tu proyecto con K&T Code: ${lead.what} 🚀`,
    html: shell(en ? "kt new-project" : "kt nuevo-proyecto", body),
  };
}
