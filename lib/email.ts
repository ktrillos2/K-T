import nodemailer from "nodemailer"

export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export function getMailConfig() {
  const host = process.env.SMTP_HOST || "smtp-relay.sendinblue.com"
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!user || !pass) {
    throw new Error("SMTP_USER and SMTP_PASS must be configured")
  }

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  }
}

export function createSmtpTransport() {
  return nodemailer.createTransport(getMailConfig())
}

export const mailAddresses = {
  contact: process.env.CONTACT_EMAIL || "contacto@kytcode.lat",
  admin: process.env.ADMIN_EMAIL || process.env.CONTACT_EMAIL || "contacto@kytcode.lat",
  from: process.env.MAIL_FROM || "K&T Code <info@kytcode.lat>",
}
