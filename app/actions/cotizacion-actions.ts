'use server';

import nodemailer from 'nodemailer';

// Email configurations
const ADMIN_EMAIL = 'keteruse@gmail.com';
const TRANSPOTER_OPTIONS = {
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "9e752d001@smtp-brevo.com",
    pass: "6rRVAHNgq9aXBhPs",
  },
};

export async function notifyQuotationViewed({ client }: { client: string }) {
  try {
    const transporter = nodemailer.createTransport(TRANSPOTER_OPTIONS);

    const htmlTemplate = `
      <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #000;">👀 ¡Cotización Vista!</h2>
        <p>El cliente <strong>${client}</strong> acaba de acceder a su cotización usando la contraseña.</p>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">Este es un mensaje automático de K&T Agency.</p>
      </div>
    `;

    await transporter.sendMail({
      from: '"K&T CRM" <info@kytcode.lat>',
      to: ADMIN_EMAIL,
      subject: `[K&T CRM] 👁️ ${client} está viendo la cotización`,
      html: htmlTemplate
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending quote viewed email:', error);
    return { success: false, error: 'Error enviando notificación' };
  }
}

export async function notifyQuotationAccepted({ client }: { client: string }) {
  try {
    const transporter = nodemailer.createTransport(TRANSPOTER_OPTIONS);

    const htmlTemplate = `
      <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #10b981; border-radius: 8px; background-color: #f0fdf4;">
        <h2 style="color: #059669;">🎉 ¡Cotización Aceptada!</h2>
        <p>¡Excelentes noticias! El cliente <strong>${client}</strong> ha hecho clic en "Aceptar Cotización".</p>
        <p>Es el momento de contactar al cliente para el paso a paso del pago y el inicio del proyecto.</p>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">Este es un mensaje automático de K&T Agency.</p>
      </div>
    `;

    await transporter.sendMail({
      from: '"K&T CRM" <info@kytcode.lat>',
      to: ADMIN_EMAIL,
      subject: `[K&T CRM] 💰 ¡¡${client} ACEPTÓ LA COTIZACIÓN!!`,
      html: htmlTemplate
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending quote accepted email:', error);
    return { success: false, error: 'Error enviando notificación' };
  }
}
