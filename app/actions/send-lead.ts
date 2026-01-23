"use server"

import { Resend } from "resend"
import { sendTikTokEvent } from "@/lib/tiktok-events"


// Using the provided API key directly as requested. 
// Ideally this should be in process.env.RESEND_API_KEY
const resend = new Resend("re_AX8JcZYm_B7zefGf1GWgs9vvUVPKXbkU2")

interface LeadData {
  name: string
  phone: string
  country: string
  service: string
  priceQuote: string
  contactPreference: "whatsapp" | "call"
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
    const emailSubject = `🔥 Interesado en ${serviceName}: ${name}`

    // Construct the WhatsApp reply message for the agency to send BACK to the client
    const agencyReplyMessage = `Hola ${name}, recibimos tu solicitud sobre ${serviceName} (Presupuesto visto: ${priceQuote}). ¿Cómo podemos ayudarte?`
    const agencyWhatsappUrl = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(agencyReplyMessage)}`

    await resend.emails.send({
      from: "K&T Agency <onboarding@resend.dev>",
      to: ["contactoktweb@gmail.com"],
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #000; border-bottom: 2px solid #25D366; padding-bottom: 10px;">${serviceName}</h2>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>👤 Nombre:</strong> ${name}</p>
            <p><strong>📞 Teléfono:</strong> <a href="${agencyWhatsappUrl}" style="color: #25D366; text-decoration: none; font-weight: bold;">${phone}</a> (${country})</p>
            <p><strong>💬 Preferencia:</strong> <span style="background-color: ${contactPreference === 'whatsapp' ? '#dcf8c6' : '#e3f2fd'}; padding: 2px 6px; border-radius: 4px;">${contactPreference === 'call' ? 'Llamada' : 'WhatsApp'}</span></p>
          </div>

          <div style="margin-top: 20px;">
            <p><strong>💰 Cotización vista:</strong> ${priceQuote}</p>
          </div>

          <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #777;">Lead desde kytcode.lat</p>
          
          <div style="text-align: center; margin-top: 30px;">
             <a href="${agencyWhatsappUrl}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Contactar (Incluye precio en msg)</a>
          </div>
        </div>
      `,
    })

    await sendTikTokEvent({
      event_name: "Lead",
      user: {
        phone: phone,
        // name is not standard user_data for matching but can be property if needed? 
        // TikTok matching relies on email/phone/external_id. 
        // We don't have email in this form data? 
        // Ah, formData doesn't have email in the UI shown! 
        // Just phone.
      },
      properties: {
        value: 0, // Or estimate value?
        currency: "COP",
        content_name: serviceName,
        content_type: "product",
      }
    })

    return { success: true }

  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send email" }
  }
}
