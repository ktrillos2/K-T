import { NextResponse } from "next/server"

import { createSmtpTransport, escapeHtml, mailAddresses } from "@/lib/email"
import { verifyRewardClaim } from "@/lib/game-reward"
import { checkRateLimit, getRequestIp } from "@/lib/rate-limit"
import { sendTikTokEvent } from "@/lib/tiktok-events"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const requestIp = getRequestIp(req)
    const rateLimit = checkRateLimit(`contact:${requestIp}`, 5, 10 * 60 * 1000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Has enviado varias solicitudes. Espera unos minutos e inténtalo nuevamente." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) } },
      )
    }
    const body = await req.json()
    const name = String(body.name || "").trim()
    const phone = String(body.phone || "").trim()
    const message = String(body.message || "").trim()
    const service = String(body.service || "General").trim()
    const discountCode = body.discountCode ? String(body.discountCode) : ""
    const rewardToken = body.rewardToken ? String(body.rewardToken) : ""

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "Completa los campos obligatorios." },
        { status: 400 },
      )
    }

    const reward = verifyRewardClaim(rewardToken, discountCode)
    const transporter = createSmtpTransport()

    const safeName = escapeHtml(name)
    const safePhone = escapeHtml(phone)
    const safeMessage = escapeHtml(message)
    const safeService = escapeHtml(service)
    const rewardBlock = reward
      ? `
        <div class="field-group">
          <span class="field-label">Recompensa del minijuego validada</span>
          <div class="service-value">${escapeHtml(reward.code)} · ${reward.discount}% de descuento</div>
        </div>
      `
      : ""

    await transporter.sendMail({
      from: mailAddresses.from,
      to: mailAddresses.contact,
      subject: `Nueva solicitud de servicio - ${service || "General"}`,
      html: `
        <!doctype html>
        <html lang="es">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              * { box-sizing: border-box; }
              body { margin: 0; padding: 40px 20px; background: #000; color: #fff; font-family: "Courier New", monospace; line-height: 1.6; }
              .email-container { max-width: 640px; margin: 0 auto; overflow: hidden; border: 1px solid #fff; border-radius: 12px; background: #0a0a0a; }
              .header, .footer { padding: 28px; background: #000; text-align: center; }
              .header { border-bottom: 1px solid #fff; }
              .footer { border-top: 1px solid #fff; color: #aaa; font-size: 12px; }
              .content { padding: 32px; }
              .field-group { padding: 0 0 20px; margin: 0 0 20px; border-bottom: 1px solid #333; }
              .field-label { display: block; margin-bottom: 8px; color: #aaa; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
              .field-value, .service-value { color: #fff; word-break: break-word; }
              .service-value { font-size: 18px; font-weight: 700; }
              .message-value { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header"><strong style="font-size:28px;letter-spacing:4px">K&T</strong><br>Nueva solicitud desde kytcode.lat</div>
              <div class="content">
                <div class="field-group"><span class="field-label">Cliente</span><div class="field-value">${safeName}</div></div>
                <div class="field-group"><span class="field-label">Celular / WhatsApp</span><div class="field-value">${safePhone}</div></div>
                <div class="field-group"><span class="field-label">Servicio</span><div class="service-value">${safeService}</div></div>
                ${rewardBlock}
                <div class="field-group"><span class="field-label">Mensaje</span><div class="field-value message-value">${safeMessage}</div></div>
              </div>
              <div class="footer">K&T Code © ${new Date().getFullYear()} · kytcode.lat</div>
            </div>
          </body>
        </html>
      `,
    })

    const ip = requestIp
    const userAgent = req.headers.get("user-agent") || ""
    const referer = req.headers.get("referer") || ""

    await sendTikTokEvent({
      event_name: "Contact",
      user: {
        phone,
        ip,
        user_agent: userAgent,
      },
      page: {
        url: referer,
        referrer: referer,
      },
      properties: {
        content_name: service || "General Contact",
      },
    })

    return NextResponse.json({
      success: true,
      rewardValidated: Boolean(reward),
    })
  } catch (error) {
    console.error("Error sending contact email:", error)
    return NextResponse.json(
      { success: false, error: "No fue posible enviar el mensaje." },
      { status: 500 },
    )
  }
}
