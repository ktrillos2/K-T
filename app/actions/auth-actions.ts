'use server';

import * as TOTP from 'otpauth';
import { sendEmail, buildBrandedEmailHtml } from '@/lib/email';

const AUTH_SECRET = process.env.AUTH_SECRET || 'secret';
// Hardcoded admin email as requested
const ADMIN_EMAIL = 'keteruse@gmail.com';

export async function verifyPasswordAndSendOTP(password: string) {
  console.log('--- Debug: verifyPasswordAndSendOTP Called ---');
  console.log('Env Password present:', !!AUTH_SECRET);

  // 1. Validate Password First
  if (password !== AUTH_SECRET) {
    console.log('Error: Password mismatch');
    return { success: false, error: 'Contraseña incorrecta' };
  }

  console.log('Password OK. Generating OTP...');

  // 2. Generate OTP
  const totp = new TOTP.TOTP({
    issuer: 'KT_Agency',
    label: 'K&T CRM',
    algorithm: 'SHA1',
    digits: 6,
    period: 300,
    secret: TOTP.Secret.fromUTF8(AUTH_SECRET)
  });

  const code = totp.generate();
  console.log('OTP Generated. Sending via Brevo to', ADMIN_EMAIL);

  // 3. Send via unified email service (Resend / SMTP) from no-reply@kytcode.lat
  try {
    const contentHtml = `
      <div class="field-card">
        <span class="field-label">Solicitud de Acceso Administrativo</span>
        <div class="field-value">
          Se ha ingresado la contraseña maestra para iniciar sesión en el CRM y panel de K&T Code.
        </div>
      </div>

      <div class="otp-display">
        <span class="field-label" style="margin-bottom:12px;color:#fbbf24;">Código de Verificación Único</span>
        <div class="otp-code">${code}</div>
      </div>

      <div class="field-card">
        <span class="field-label">Tiempo de Validez</span>
        <div class="field-value" style="color:#a1a1aa;font-size:13px;">
          ⏱️ Este código expirará automáticamente en <strong>5 minutos</strong>. Si no solicitaste este acceso, ignora este mensaje.
        </div>
      </div>
    `;

    const html = buildBrandedEmailHtml({
      badge: "Seguridad & Acceso CRM",
      title: "Verificación de Seguridad",
      subtitle: "// Código de autenticación de dos pasos",
      contentHtml,
      footerNote: "Seguridad Automática K&T Code • Nunca compartas este código con terceros.",
    });

    const result = await sendEmail({
      from: "K&T Security <no-reply@kytcode.lat>",
      to: ADMIN_EMAIL,
      subject: "🔐 Código de Acceso - K&T CRM",
      html,
    });

    if (!result.success) {
      console.error("Error sending OTP email:", result.error);
      return { success: false, error: "Error al enviar el código de seguridad." };
    }

    console.log("OTP sent successfully. MessageId:", result.id);
    return { success: true };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error: 'Error al enviar el correo de verificación.' };
  }
}
