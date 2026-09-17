'use server';

import { buildBrandedEmailHtml, escapeHtml, mailAddresses, sendEmail } from '@/lib/email';

export async function notifyQuotationViewed({ client }: { client: string }) {
  try {
    const contentHtml = `
      <div class="field-card">
        <span class="field-label">Cliente Activo</span>
        <div class="field-value" style="font-weight:700;color:#ffffff;font-size:17px;">${escapeHtml(client)}</div>
      </div>

      <div class="field-card">
        <span class="field-label">Detalle de la Actividad</span>
        <div class="field-value">
          El cliente acaba de ingresar la contraseña de seguridad y está explorando la propuesta comercial interactiva en tiempo real.
        </div>
      </div>
    `;

    const html = buildBrandedEmailHtml({
      badge: "Actividad CRM",
      title: "Cotización Abierta y en Lectura",
      subtitle: `// Cliente: ${client}`,
      contentHtml,
      footerNote: "Notificación de seguimiento comercial de K&T CRM.",
    });

    const result = await sendEmail({
      from: "K&T Code <no-reply@kytcode.lat>",
      to: mailAddresses.admin,
      subject: `[K&T CRM] 👁️ ${client} está viendo la cotización`,
      html,
    });

    return { success: result.success };
  } catch (error) {
    console.error('Error sending quote viewed email:', error);
    return { success: false, error: 'Error enviando notificación' };
  }
}

export async function notifyQuotationAccepted({ client }: { client: string }) {
  try {
    const contentHtml = `
      <div class="field-card" style="border:1px solid rgba(52, 211, 153, 0.4);background:rgba(52, 211, 153, 0.05);">
        <span class="field-label" style="color:#34d399;">Estado de la Negociación</span>
        <div class="field-value" style="font-weight:800;color:#34d399;font-size:18px;">
          🎉 PROPUESTA ACEPTADA FORMALMENTE
        </div>
      </div>

      <div class="field-card">
        <span class="field-label">Cliente Comercial</span>
        <div class="field-value" style="font-weight:700;color:#ffffff;font-size:17px;">${escapeHtml(client)}</div>
      </div>

      <div class="field-card">
        <span class="field-label">Siguiente Paso Requerido</span>
        <div class="message-box">
          El cliente ha presionado el botón oficial de "Aceptar Cotización". Es momento de contactarlo para la coordinación del anticipo, facturación e inicio del sprint de desarrollo.
        </div>
      </div>
    `;

    const html = buildBrandedEmailHtml({
      badge: "¡Victoria Comercial!",
      title: `¡${client} Aceptó la Cotización!`,
      subtitle: "// Cierre comercial confirmado",
      contentHtml,
      footerNote: "K&T Code System • Gestión Comercial y Cotizaciones.",
    });

    const result = await sendEmail({
      from: "K&T Code <no-reply@kytcode.lat>",
      to: mailAddresses.admin,
      subject: `[K&T CRM] 💰 ¡¡${client} ACEPTÓ LA COTIZACIÓN!!`,
      html,
    });

    return { success: result.success };
  } catch (error) {
    console.error('Error sending quote accepted email:', error);
    return { success: false, error: 'Error enviando notificación' };
  }
}
