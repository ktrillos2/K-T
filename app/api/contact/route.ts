import { NextResponse } from "next/server"
import { sendTikTokEvent } from "@/lib/tiktok-events"
import { buildBrandedEmailHtml, escapeHtml, getNotificationRecipients, sendEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const { name, phone, email, message, service } = await req.json()

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Nombre y teléfono son obligatorios" },
        { status: 400 }
      )
    }

    const serviceName = service || "General / No especificado"

    const contentHtml = `
      <div class="field-card">
        <span class="field-label">Cliente / Solicitante</span>
        <div class="field-value">${escapeHtml(name)}</div>
      </div>

      <div class="field-card">
        <span class="field-label">Celular / WhatsApp</span>
        <div class="field-value">
          <a href="https://wa.me/${String(phone).replace(/\D/g, "")}" style="color:#34d399;text-decoration:none;font-weight:700;">
            ${escapeHtml(phone)} ↗
          </a>
        </div>
      </div>

      ${email ? `
      <div class="field-card">
        <span class="field-label">Correo Electrónico</span>
        <div class="field-value">
          <a href="mailto:${escapeHtml(email)}" style="color:#38bdf8;text-decoration:none;font-weight:600;">
            ${escapeHtml(email)} ↗
          </a>
        </div>
      </div>` : ''}

      <div class="field-card">
        <span class="field-label">Servicio de Interés</span>
        <div class="field-value" style="font-weight:700;color:#ffffff;">${escapeHtml(serviceName)}</div>
      </div>

      <div class="field-card">
        <span class="field-label">Mensaje o Requerimiento</span>
        <div class="message-box">${escapeHtml(message || "Sin mensaje adicional.")}</div>
      </div>
    `

    const html = buildBrandedEmailHtml({
      badge: "Nueva Solicitud Web",
      title: "Nuevo Mensaje de Contacto",
      subtitle: `// Solicitado por ${name}`,
      contentHtml,
      footerNote: "Notificación de lead entrante • Responde al cliente a la brevedad.",
    })

    const emailResult = await sendEmail({
      from: "K&T Code <no-reply@kytcode.lat>",
      to: getNotificationRecipients(),
      replyTo: email || undefined,
      subject: `🔥 Nueva Solicitud de Contacto - ${name} (${serviceName})`,
      html,
    })

    if (!emailResult.success) {
      console.error("Failed to send contact email:", emailResult.error)
      return NextResponse.json(
        { success: false, error: emailResult.error || "Error al enviar el correo" },
        { status: 500 }
      )
    }

    // Track TikTok Event
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || ""
    const userAgent = req.headers.get("user-agent") || ""
    const referer = req.headers.get("referer") || ""

    await sendTikTokEvent({
      event_name: "Contact",
      user: {
        phone: phone,
        ip,
        user_agent: userAgent,
      },
      page: {
        url: referer,
        referrer: referer,
      },
      properties: {
        content_name: serviceName,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Mensaje recibido y notificado con éxito",
      emailId: emailResult.id,
    })
  } catch (error: any) {
    console.error("Error sending contact email:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    )
  }
}
