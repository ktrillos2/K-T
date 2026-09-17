import nodemailer from "nodemailer"

// URL permanente del logo corporativo de K&T alojado y optimizado en Sanity CDN
export const SANITY_LOGO_URL =
  process.env.SANITY_LOGO_URL ||
  "https://cdn.sanity.io/images/bc3zxc91/production/1ff3027f84248e0273fc020e7fd7b8746016e148-500x500.png"

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export const mailAddresses = {
  from: process.env.MAIL_FROM || "K&T Code <no-reply@kytcode.lat>",
  contact: process.env.CONTACT_EMAIL || "contacto@kytcode.lat",
  admin: process.env.ADMIN_EMAIL || "keteruse@gmail.com",
}

export function getNotificationRecipients(): string[] {
  const envRecipients = process.env.NOTIFICATION_EMAIL;
  if (envRecipients) {
    const list = envRecipients.split(",").map((e) => e.trim()).filter(Boolean);
    if (list.length > 0) return list;
  }
  const recipients = new Set<string>();
  if (mailAddresses.contact) recipients.add(mailAddresses.contact);
  if (mailAddresses.admin) recipients.add(mailAddresses.admin);
  return Array.from(recipients);
}

/**
 * Plantilla HTML de correo premium corporativo con logo desde Sanity,
 * estética dark mode cuidada, borde sutil y firma oficial de K&T.
 */
export function buildBrandedEmailHtml({
  badge,
  title,
  subtitle,
  contentHtml,
  footerNote = "Notificación del sistema K&T Code • Este correo se genera automáticamente.",
}: {
  badge?: string
  title: string
  subtitle?: string
  contentHtml: string
  footerNote?: string
}): string {
  const currentYear = new Date().getFullYear()

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: #030303;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      padding: 32px 16px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      max-width: 620px;
      margin: 0 auto;
      background: #09090b;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }
    .header {
      background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.06), transparent 75%), #09090b;
      padding: 40px 32px 28px 32px;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .logo {
      display: inline-block;
      margin-bottom: 18px;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #34d399;
      background: rgba(52, 211, 153, 0.1);
      border: 1px solid rgba(52, 211, 153, 0.25);
      border-radius: 9999px;
      margin-bottom: 12px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .header h1 {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.5px;
      line-height: 1.3;
      margin: 0;
    }
    .header p {
      font-size: 14px;
      color: #a1a1aa;
      margin-top: 6px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .content {
      padding: 36px 32px;
      background-color: #09090b;
    }
    .field-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 18px 20px;
      margin-bottom: 18px;
    }
    .field-card:last-child {
      margin-bottom: 0;
    }
    .field-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #a1a1aa;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      margin-bottom: 6px;
      display: block;
      font-weight: 700;
    }
    .field-value {
      font-size: 15px;
      color: #f4f4f5;
      word-break: break-word;
    }
    .message-box {
      background: #000000;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 16px;
      color: #e4e4e7;
      font-size: 14px;
      line-height: 1.7;
      white-space: pre-wrap;
    }
    .otp-display {
      background: #000000;
      border: 2px dashed rgba(255, 255, 255, 0.25);
      border-radius: 14px;
      padding: 24px;
      text-align: center;
      margin: 20px 0;
    }
    .otp-code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 38px;
      font-weight: 800;
      letter-spacing: 10px;
      color: #ffffff;
      text-indent: 10px;
    }
    .footer {
      background: #050507;
      padding: 28px 32px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 12px;
      color: #71717a;
    }
    .footer a {
      color: #ffffff;
      text-decoration: none;
      font-weight: 600;
    }
    .footer p {
      margin: 4px 0;
    }
    @media only screen and (max-width: 600px) {
      body { padding: 16px 8px; }
      .header, .content, .footer { padding-left: 20px; padding-right: 20px; }
      .header h1 { font-size: 20px; }
      .otp-code { font-size: 28px; letter-spacing: 6px; text-indent: 6px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo">
        <a href="https://www.kytcode.lat" target="_blank" rel="noopener noreferrer">
          <img
            src="${SANITY_LOGO_URL}"
            alt="K&T Code"
            width="110"
            height="110"
            style="display:block;margin:0 auto;width:110px;height:110px;object-fit:contain;border:0;"
          />
        </a>
      </div>
      ${badge ? `<div class="badge">${escapeHtml(badge)}</div>` : ""}
      <h1>${escapeHtml(title)}</h1>
      ${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ""}
    </div>

    <div class="content">
      ${contentHtml}
    </div>

    <div class="footer">
      <p style="color:#a1a1aa;">${escapeHtml(footerNote)}</p>
      <p style="margin-top:12px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;">
        © ${currentYear} <a href="https://www.kytcode.lat">K&T Code</a>. Todos los derechos reservados.
      </p>
      <p style="font-size:11px;color:#52525b;margin-top:4px;">
        San José de Cúcuta, Colombia • Cobertura Nacional e Internacional
      </p>
    </div>
  </div>
</body>
</html>`
}

/**
 * Enviar correo de forma robusta.
 * Intenta primero mediante Resend API (desde no-reply@kytcode.lat).
 * Si no está disponible o falla, utiliza SMTP relay como fallback.
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = mailAddresses.from,
  replyTo,
}: {
  to: string | string[]
  subject: string
  html: string
  from?: string
  replyTo?: string
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const resendApiKey = process.env.RESEND_API_KEY

  // 1. Prioridad: Resend API (Garantiza entrega desde no-reply@kytcode.lat sin bloqueos SMTP)
  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: Array.isArray(to) ? to : [to],
          subject,
          html,
          reply_to: replyTo,
        }),
      })

      const data = await response.json()
      if (response.ok && data?.id) {
        return { success: true, id: data.id }
      }

      console.warn("Resend API returned an error, attempting SMTP fallback:", data)
    } catch (resendError) {
      console.error("Resend API failed, attempting SMTP fallback:", resendError)
    }
  }

  // 2. Fallback: SMTP Transport
  try {
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (!smtpUser || !smtpPass) {
      throw new Error("Neither Resend nor SMTP credentials are fully configured")
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp-relay.sendinblue.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      replyTo,
    })

    return { success: true, id: info.messageId }
  } catch (smtpError: any) {
    console.error("All email delivery methods failed:", smtpError)
    return {
      success: false,
      error: smtpError?.message || "Error al enviar el correo electrónico",
    }
  }
}
