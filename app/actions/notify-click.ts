"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function notifyInteraction(buttonName: string, context: Record<string, any> = {}) {
    try {
        const timestamp = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })

        // Convert context object to readable string
        const contextHtml = Object.entries(context)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join("")

        await resend.emails.send({
            from: "K&T Code <onboarding@resend.dev>",
            to: ["contactktweb@gmail.com"],
            subject: `🔔 Interacción en Web: ${buttonName}`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #000; border-bottom: 2px solid #0070f3; padding-bottom: 10px;">Nueva Interacción Detectada</h2>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>🎯 Acción:</strong> Clic en botón "${buttonName}"</p>
            <p><strong>📅 Fecha/Hora:</strong> ${timestamp}</p>
            ${contextHtml}
          </div>

          <p style="font-size: 12px; color: #777; margin-top: 20px;">Notificación automática del sitio web.</p>
        </div>
      `,
        })

        return { success: true }

    } catch (error) {
        console.error("Error sending notification:", error)
        return { success: false, error: "Failed to send notification" }
    }
}
