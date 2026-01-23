import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sendTikTokEvent } from '@/lib/tiktok-events';


export async function POST(req: Request) {
  try {
    const { name, phone, message, service } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "9e752d001@smtp-brevo.com",
        pass: "6rRVAHNgq9aXBhPs",
      },
    });

    const mailOptions = {
      from: '"K&T" <info@kytcode.lat>', // Sender address
      to: "contactoktweb@gmail.com", // List of receivers
      subject: `Nueva Solicitud de Servicio - ${service || 'General'}`, // Subject line
      html: `
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
            .service-value {
              color: #ffffff;
              font-size: 18px;
              font-weight: 700;
              text-transform: uppercase;
            }
            .message-value {
              white-space: pre-wrap;
              color: #ffffff;
              font-size: 15px;
              line-height: 1.8;
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
              <div class="brand-name">K&T</div>
              <h1>Nuevo Mensaje de Contacto</h1>
            </div>
            
            <div class="content">
              <div class="field-group">
                <span class="field-label">Cliente</span>
                <div class="field-value">${name}</div>
              </div>

              <div class="field-group">
                <span class="field-label">Celular / WhatsApp</span>
                <div class="field-value">${phone}</div>
              </div>

              <div class="field-group">
                <span class="field-label">Servicio de Interés</span>
                <div class="service-value">${service || 'No especificado'}</div>
              </div>

              <div class="field-group">
                <span class="field-label">Mensaje</span>
                <div class="message-value">${message}</div>
              </div>
            </div>

            <div class="footer">
              <p>K&T © ${new Date().getFullYear()}</p>
              <p style="margin-top: 5px;">kytcode.lat</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Track TikTok Event
    // Get IP and User Agent from request if possible
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "";
    const userAgent = req.headers.get("user-agent") || "";
    const referer = req.headers.get("referer") || "";

    // Contact form has name, phone, message, service. 
    // We can use phone for matching.
    await sendTikTokEvent({
      event_name: "Contact",
      user: {
        phone: phone, // variable from scope
        ip,
        user_agent: userAgent
      },
      page: {
        url: referer,
        referrer: referer
      },
      properties: {
        content_name: service || "General Contact",
      }
    });

    return NextResponse.json({ success: true, message: 'Email passed to delivery provider' });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error', details: error }, { status: 500 });
  }
}
