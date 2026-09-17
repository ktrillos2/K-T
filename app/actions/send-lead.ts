"use server"

import { sendEmail, buildBrandedEmailHtml, escapeHtml, getNotificationRecipients } from "@/lib/email"
import { sendTikTokEvent } from "@/lib/tiktok-events"

interface LeadData {
  name: string
  phone: string
  country: string
  service: string
  priceQuote: string
  contactPreference: "whatsapp" | "call"
  externalId?: string
}

const getServiceName = (key: string) => {
  const services: Record<string, string> = {
    'web-dev': 'Desarrollo Web a Medida',
    'landing': 'Landing Page',
    'ecommerce': 'Tienda Online / E-commerce',
    'social': 'Gestión de Redes / Ads',
    'other': 'Otro / Asesoría'
  }
  return services[key] || key
}

export async function sendLeadEmail(data: LeadData) {
  try {
    const { name, phone, country, service, priceQuote, contactPreference } = data

    const serviceName = getServiceName(service)
    const emailSubject = `🔥 Lead WhatsApp: ${name} (${serviceName})`

    const agencyReplyMessage = `Hola ${name}, recibimos tu solicitud sobre ${serviceName} (Presupuesto visto: ${priceQuote}). ¿Cómo podemos ayudarte?`
    const agencyWhatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(agencyReplyMessage)}`

    const contentHtml = `
      <div class="field-card">
        <span class="field-label">Cliente / Prospecto</span>
        <div class="field-value">${escapeHtml(name)}</div>
      </div>

      <div class="field-card">
        <span class="field-label">Celular / WhatsApp</span>
        <div class="field-value">
          <a href="${agencyWhatsappUrl}" style="color:#34d399;text-decoration:none;font-weight:700;">
            ${escapeHtml(phone)} ↗
          </a>
          <span style="color:#a1a1aa;font-size:12px;margin-left:6px;">(${escapeHtml(country)})</span>
        </div>
      </div>

      <div class="field-card">
        <span class="field-label">Servicio de Interés</span>
        <div class="field-value" style="font-weight:700;color:#ffffff;">${escapeHtml(serviceName)}</div>
      </div>

      <div class="field-card">
        <span class="field-label">Cotización / Tarifa Vista</span>
        <div class="field-value" style="color:#38bdf8;font-weight:700;">${escapeHtml(priceQuote)}</div>
      </div>

      <div class="field-card">
        <span class="field-label">Preferencia de Contacto</span>
        <div class="field-value">${contactPreference === 'call' ? '📞 Llamada directa' : '💬 Mensaje por WhatsApp'}</div>
      </div>

      <div style="margin-top:24px;text-align:center;">
        <a href="${agencyWhatsappUrl}" class="button" style="background:#25D366;color:#000000;font-weight:700;">
          Responder de inmediato por WhatsApp ↗
        </a>
      </div>
    `

    const html = buildBrandedEmailHtml({
      badge: "Lead WhatsApp",
      title: `Nuevo Lead — ${serviceName}`,
      subtitle: `Solicitud iniciada por ${name}`,
      contentHtml,
      footerNote: "Lead capturado a través del modal de cotización rápida de K&T Code.",
    })

    await sendEmail({
      from: "K&T Code <no-reply@kytcode.lat>",
      to: getNotificationRecipients(),
      subject: emailSubject,
      html,
    })

    await sendTikTokEvent({
      event_name: "Lead",
      user: {
        phone: phone,
        external_id: data.externalId
      },
      properties: {
        value: 0, // Or estimate value?
        currency: "COP",
        content_name: serviceName,
        content_type: "product",
        content_id: service || "general_lead",
      }
    })

    return { success: true }

  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send email" }
  }
}
