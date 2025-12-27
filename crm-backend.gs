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

    // --- INTENTO DIRECTO (A veces falla según permisos de ejecución) ---
    try {
      sendNotificationEmail(
        '¡Nueva Oportunidad! 🔥',
        'Nuevo Lead Detectado',
        'Un cliente potencial acaba de dejar sus datos de contacto.',
        { nombre, telefono, interes: servicio + (empresa ? ' - ' + empresa : '') }
      );
    } catch (mailErr) {
      console.log('Error enviando correo inicial (Directo): ' + mailErr);
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
    
    // Condición: Estado "Volver a Contactar" O "Nuevo" con > 2 días
    if (estado === 'Volver a Contactar' || (estado === 'Nuevo' && (new Date() - fecha) / (1000 * 60 * 60 * 24) > 2)) {
      const reason = estado === 'Volver a Contactar' ? 'Seguimiento Programado' : 'Lead Lento (>48h)';
      const badge = estado === 'Volver a Contactar' ? 'RECORDATORIO' : 'LEAD EN RIESGO';
      
      try {
        sendNotificationEmail(
          `⚠️ Acción CRM: ${nombre}`,
          badge,
          `Este lead requiere atención. Razón: <strong>${reason}</strong>.`,
          { nombre, telefono, interes: servicio }
        );
      } catch (e) { console.log(e); }
    }
  }
}

// --- ALTERNATIVA ROBUSTA: TRIGGER DESDE LA HOJA ---
// Si doPost falla en enviar correos por permisos, usa esto.
// CONFIGURACIÓN: Añadir activador -> Seleccionar "notifyNewLeadFromSheet" -> Fuente "De la hoja de cálculo" -> "Al cambiar" (On Change)
function notifyNewLeadFromSheet(e) {
  // Solo nos interesa si el cambio es inserción de filas (INSERT_ROW) o cambios generales que implican nuevos datos
  if (e.changeType !== 'INSERT_ROW' && e.changeType !== 'EDIT' && e.changeType !== 'OTHER') return;

  const sheet = SpreadsheetApp.openById('1DetNAjSygZtvOHAJAtgcMdtIPdO1lZmO-I716HX-2ic').getSheets()[0];
  const lastRow = sheet.getLastRow();
  
  // Verificamos si la última fila tiene datos y es "Nuevo"
  // Columnas: ID(1), Nombre(2), Empresa(3), Servicio(4), Estado(5), Fecha(6), Tel(7), Email(8)
  const range = sheet.getRange(lastRow, 1, 1, 8); 
  const rowData = range.getValues()[0];
  
  const nombre = rowData[1];
  const estado = rowData[4];
  const timestamp = new Date(rowData[5]);
  const now = new Date();
  const diffMs = now - timestamp;
  
  // Si el lead se creó en los últimos 5 minutos y es Nuevo
  if (estado === 'Nuevo' && diffMs < 300000) { // 5 min tolerancia
     const scriptProperties = PropertiesService.getScriptProperties();
     const lastNotifiedId = scriptProperties.getProperty('LAST_NOTIFIED_ID');
     const currentId = rowData[0];

     if (lastNotifiedId !== currentId) {
        try {
           sendNotificationEmail(
            '¡Nueva Oportunidad! 🔥 (Vía Sheet)',
            'Nuevo Lead Detectado',
            'Un cliente potencial ha sido añadido a la base de datos.',
            { 
              nombre: nombre, 
              telefono: rowData[6], 
              interes: rowData[3] 
            }
          );
          scriptProperties.setProperty('LAST_NOTIFIED_ID', currentId);
        } catch(err) {
          console.error("Error en trigger de hoja: " + err);
        }
     }
  }
}


function sendNotificationEmail(subject, badgeText, mainMessage, leadData) {
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>${subject}</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; color: #333; }
        .email-container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #eaeaea; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .header { background-color: #1a1a1a; padding: 30px 20px; text-align: center; color: white; font-size: 24px; font-weight: bold; }
        .content { padding: 40px 30px; text-align: center; }
        .notification-badge { display: inline-block; background-color: #e0f2fe; color: #0284c7; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 20px; }
        h1 { margin: 0 0 10px 0; font-size: 24px; color: #111827; }
        p { margin: 0 0 30px 0; color: #6b7280; font-size: 16px; line-height: 1.5; }
        .label { display: block; font-size: 12px; color: #9ca3af; text-transform: uppercase; font-weight: 600; margin-bottom: 5px; }
        .value { font-size: 18px; color: #1f2937; font-weight: 500; margin-bottom: 15px; }
        .btn { display: block; width: 100%; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 15px 0; border-radius: 6px; font-weight: 600; text-align: center; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">K&T AGENCY</div>
        <div class="content">
            <div class="notification-badge">${badgeText}</div>
            <h1>¡Atención!</h1>
            <p>${mainMessage}</p>
            <hr style="border:0; border-top:1px dashed #eee; margin: 20px 0;">
            <span class="label">Nombre</span>
            <div class="value" style="color: #2563eb; font-weight: 700;">${leadData.nombre}</div>
            <span class="label">CELULAR</span>
            <div class="value">${leadData.telefono}</div>
            <span class="label">INTERÉS</span>
            <div class="value" style="font-size: 14px;">${leadData.interes}</div>
            
            <a href="https://wa.me/${leadData.telefono.replace(/\D/g, '')}" class="btn" style="background-color: #25D366;">💬 WhatsApp</a>
            <a href="https://crm.kytcode.lat/CRM" style="display:block; margin-top:15px; text-align:center; color:#6b7280; font-size:14px; text-decoration:none;">Ir al CRM</a>
        </div>
    </div>
</body>
</html>`;

  MailApp.sendEmail({
    to: 'keteruse@gmail.com', 
    subject: subject,
    htmlBody: htmlTemplate
  });
}

function testEmail() {
  sendNotificationEmail('🧪 Prueba', 'TEST', 'Verificación manual.', { nombre: 'Test', telefono: '123', interes: 'Prueba' });
}
