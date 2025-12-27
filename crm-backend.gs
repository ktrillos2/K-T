function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const sheet = SpreadsheetApp.openById('1DetNAjSygZtvOHAJAtgcMdtIPdO1lZmO-I716HX-2ic').getSheets()[0];
    
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      data = e.parameter;
    }

    // --- ACCIÓN: ENVIAR CORREO (Auth Action) ---
    if (data.action === 'send_email') {
       if (!data.key || data.key !== 'K_AND_T_SECURE_2025') {
          return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid Key' })).setMimeType(ContentService.MimeType.JSON);
       }
       MailApp.sendEmail({
         to: data.email,
         subject: data.subject,
         htmlBody: data.body
       });
       return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
    }

    // --- ACCIÓN: ACTUALIZAR ESTADO (CRM Action) ---
    if (data.action === 'update_status') {
       if (!data.key || data.key !== 'K_AND_T_SECURE_2025') {
          return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid Key' })).setMimeType(ContentService.MimeType.JSON);
       }
       const idToUpdate = data.id;
       const newStatus = data.status;
       const rows = sheet.getDataRange().getValues();
       let found = false;
       for (let i = 1; i < rows.length; i++) {
         if (rows[i][0] == idToUpdate) {
           sheet.getRange(i + 1, 5).setValue(newStatus);
           found = true;
           break;
         }
       }
       if (found) {
         return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
       } else {
         return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'ID not found' })).setMimeType(ContentService.MimeType.JSON);
       }
    }

    // --- ACCIÓN: CREAR LEAD (Default) ---
    const findValue = (obj, keys) => {
      const foundKey = Object.keys(obj).find(k => keys.includes(k.toLowerCase()));
      return foundKey ? obj[foundKey] : '';
    };

    const timestamp = new Date();
    const id = Utilities.getUuid();
    
    let nombre = findValue(data, ['nombre', 'name', 'full_name', 'fullname', 'first_name']) || 'Sin nombre';
    let empresa = findValue(data, ['empresa', 'company', 'company_name', 'business']) || '';
    let servicio = findValue(data, ['servicio', 'service', 'campaign', 'ad_name', 'form_name']) || 'TikTok Lead';
    let email = findValue(data, ['email', 'correo', 'mail']) || '';
    let telefono = findValue(data, ['telefono', 'phone', 'phone_number', 'celular']) || '';

    if (nombre === 'Sin nombre' && !empresa && !email) {
       empresa = "RAW: " + JSON.stringify(data).substring(0, 500);
    }

    sheet.appendRow([id, nombre, empresa, servicio, 'Nuevo', timestamp, telefono, email]);

    // --- NOTIFICACIÓN: NUEVO LEAD ---
    try {
      sendNotificationEmail(
        '¡Nueva Oportunidad! 🔥',
        'Nuevo Lead Detectado',
        'Un cliente potencial acaba de dejar sus datos de contacto.',
        { nombre, telefono, interes: servicio + (empresa ? ' - ' + empresa : '') }
      );
    } catch (mailErr) {
      console.log('Error enviando correo inicial: ' + mailErr);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', id: id })).setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: e.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const SECRET_KEY = 'K_AND_T_SECURE_2025'; 
  
  if (!e.parameter.key || e.parameter.key !== SECRET_KEY) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Acceso denegado' })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const sheet = SpreadsheetApp.openById('1DetNAjSygZtvOHAJAtgcMdtIPdO1lZmO-I716HX-2ic').getSheets()[0];
    const rows = sheet.getDataRange().getValues();
    const leads = rows.slice(1).map(row => ({
        id: row[0],
        nombre: row[1],
        empresa: row[2],
        servicio: row[3],
        estado: row[4] || 'Nuevo',
        fecha: row[5],
        telefono: (row[6] || '').toString(), 
        email: row[7] || '' 
    }));

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: leads })).setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: e.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

// --- AUTOMATIZACIÓN DE SEGUIMIENTO ---
function checkFollowUps() {
  const sheet = SpreadsheetApp.openById('1DetNAjSygZtvOHAJAtgcMdtIPdO1lZmO-I716HX-2ic').getSheets()[0];
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const nombre = row[1];
    const servicio = row[3];
    const estado = row[4];
    const fecha = new Date(row[5]);
    const telefono = row[6];
    
    const daysOld = (new Date() - fecha) / (1000 * 60 * 60 * 24);
    
    // Condición: Estado "Volver a Contactar" O "Nuevo" con > 2 días
    if (estado === 'Volver a Contactar' || (estado === 'Nuevo' && daysOld > 2)) {
      const reason = estado === 'Volver a Contactar' ? 'Seguimiento Programado' : 'Lead Lento (>48h)';
      const badge = estado === 'Volver a Contactar' ? 'RECORDATORIO' : 'LEAD EN RIESGO';
      
      try {
        sendNotificationEmail(
          `⚠️ Acción CRM: ${nombre}`,
          badge,
          `Este lead requiere atención. Razón: <strong>${reason}</strong>. No dejes enfriar la venta.`,
          { nombre, telefono, interes: servicio }
        );
      } catch (e) {
        console.log('Error enviando follow-up a ' + nombre);
      }
    }
  }
}

// --- HELPER: PLANTILLA DE CORREO ---
function sendNotificationEmail(subject, badgeText, mainMessage, leadData) {
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; color: #333; }
        .email-container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #eaeaea; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .header { background-color: #1a1a1a; padding: 30px 20px; text-align: center; color: white; font-size: 24px; font-weight: bold; letter-spacing: 2px; }
        .content { padding: 40px 30px; text-align: center; }
        .notification-badge { display: inline-block; background-color: #e0f2fe; color: #0284c7; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 20px; }
        h1 { margin: 0 0 10px 0; font-size: 24px; color: #111827; }
        p { margin: 0 0 30px 0; color: #6b7280; font-size: 16px; line-height: 1.5; }
        .lead-card { background-color: #fafafa; border: 1px solid #eeeeee; border-radius: 8px; padding: 25px; margin-bottom: 30px; text-align: left; }
        .label { display: block; font-size: 12px; color: #9ca3af; text-transform: uppercase; font-weight: 600; margin-bottom: 5px; }
        .value { font-size: 18px; color: #1f2937; font-weight: 500; }
        .btn { display: block; width: 100%; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 15px 0; border-radius: 6px; font-weight: 600; text-align: center; margin-bottom: 10px; }
        .footer { background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #eaeaea; font-size: 12px; color: #9ca3af; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">K&T AGENCY</div>
        <div class="content">
            <div class="notification-badge">${badgeText}</div>
            <h1>¡Atención!</h1>
            <p>${mainMessage}</p>
            <div class="lead-card">
                <div style="margin-bottom: 15px;">
                    <span class="label">Nombre</span>
                    <div class="value" style="color: #2563eb; font-weight: 700;">${leadData.nombre}</div>
                </div>
                <div style="margin-bottom: 15px;">
                    <span class="label">CELULAR</span>
                    <div class="value">${leadData.telefono}</div>
                </div>
                <div style="border-top: 1px dashed #e5e7eb; padding-top: 15px;">
                    <span class="label">INTERÉS / SERVICIO</span>
                    <div class="value" style="font-size: 14px;">${leadData.interes}</div>
                </div>
            </div>
            <a href="https://wa.me/${leadData.telefono.replace(/\D/g, '')}" class="btn" style="background-color: #25D366;">💬 Contactar por WhatsApp</a>
            <a href="tel:${leadData.telefono}" class="btn" style="background-color: #f3f4f6; color: #374151;">📞 Llamar por Teléfono</a>
            <a href="https://crm.kytcode.lat/CRM" style="display:block; margin-top:15px; text-align:center; color:#6b7280; font-size:14px; text-decoration:none;">Ir al CRM</a>
        </div>
        <div class="footer">
            <p>Notificación automática del CRM K&T.</p>
        </div>
    </div>
</body>
</html>
  `;

  MailApp.sendEmail({
    to: 'keteruse@gmail.com', // CONFIG: Tu correo
    subject: subject,
    htmlBody: htmlTemplate
  });
}

// --- ÚTILES DE PRUEBA ---
function testEmail() {
  sendNotificationEmail(
    '🧪 Prueba de Plantilla', 
    'TEST SYSTEM', 
    'Si ves esto, la nueva plantilla HTML funciona correctamente.', 
    { nombre: 'Juan Pérez Test', telefono: '+573001234567', interes: 'Prueba de Sistema' }
  );
}
