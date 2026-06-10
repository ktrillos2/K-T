'use server';

import * as TOTP from 'otpauth';
import nodemailer from 'nodemailer';

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

  // 3. Send via Brevo (Nodemailer) with User's Template
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "9e752d001@smtp-brevo.com",
        pass: "6rRVAHNgq9aXBhPs",
      },
    });

    const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Courier New', Courier, monospace; 
              background-color: #000000; 
              color: #ffffff; 
              padding: 40px 20px;
              line-height: 1.6;
            }
            .email-container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #0a0a0a;
              border: 2px solid #ffffff;
              border-radius: 8px;
              overflow: hidden;
            }
            .header { 
              background-color: #000000;
              padding: 40px 30px;
              text-align: center;
              border-bottom: 2px solid #ffffff;
            }
            .brand-name { 
              color: #ffffff; 
              font-size: 32px; 
              font-weight: 700;
              margin-bottom: 10px;
              letter-spacing: 4px;
            }
            .header h1 { 
              color: #ffffff; 
              font-size: 18px; 
              font-weight: 400;
              margin: 0;
              letter-spacing: 1px;
            }
            .content { 
              padding: 40px 30px;
              background-color: #0a0a0a;
            }
            .field-group { 
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 1px solid #333333;
            }
            .field-group:last-child {
              border-bottom: none;
            }
            .field-label { 
              color: #ffffff; 
              font-size: 11px; 
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-bottom: 10px;
              display: block;
              font-weight: 700;
            }
            .field-value { 
              color: #ffffff;
              font-size: 16px; 
              font-weight: 400;
              word-wrap: break-word;
            }
            .otp-code {
              color: #ffffff;
              font-size: 36px;
              font-weight: 700;
              letter-spacing: 8px;
              text-align: center;
              background: #1a1a1a;
              padding: 20px;
              border: 1px dashed #333;
            }
            .footer { 
              background-color: #000000;
              padding: 30px;
              text-align: center;
              border-top: 2px solid #ffffff;
            }
            .footer p { 
              color: #ffffff; 
              font-size: 11px;
              margin: 5px 0;
              letter-spacing: 1px;
            }
            @media only screen and (max-width: 600px) {
              .content { padding: 30px 20px; }
              .header { padding: 30px 20px; }
              .brand-name { font-size: 28px; }
              .header h1 { font-size: 16px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="brand-name">K&T CRM</div>
              <h1>Verificación de Seguridad</h1>
            </div>
            
            <div class="content">
              <div class="field-group">
                <span class="field-label">Solicitud de Acceso</span>
                <div class="field-value">Se ha solicitado inicio de sesión en el CRM.</div>
              </div>

              <div class="field-group">
                <span class="field-label">Tu Código Único</span>
                <div class="otp-code">${code}</div>
              </div>

              <div class="field-group">
                <span class="field-label">Expiración</span>
                <div class="field-value">Este código vencerá en 5 minutos.</div>
              </div>
            </div>

            <div class="footer">
              <p>K&T Agencia Digital © ${new Date().getFullYear()}</p>
              <p style="margin-top: 5px;">Seguridad Automática</p>
            </div>
          </div>
        </body>
        </html>
        `;

    const info = await transporter.sendMail({
      from: '"K&T Security" <info@kytcode.lat>',
      to: ADMIN_EMAIL,
      subject: '🔐 Código de Acceso - K&T CRM',
      html: htmlTemplate
    });

    console.log('Mail sent successfully via Brevo. MessageId:', info.messageId);
    return { success: true };

  } catch (error) {
    console.error('Error sending OTP via Brevo:', error);
    return { success: false, error: 'Error al enviar el correo (SMTP).' };
  }
}
