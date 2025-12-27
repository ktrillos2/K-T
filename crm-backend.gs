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
       // Validación de Seguridad Estricta
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
       if (!data.key || data.key !== 'K_AND_T_SECURE_2025') { // Misma llave maestra
          return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid Key' })).setMimeType(ContentService.MimeType.JSON);
       }

       const idToUpdate = data.id;
       const newStatus = data.status;
       
       const rows = sheet.getDataRange().getValues();
       let found = false;
       
       // Buscar fila por ID (asumiendo ID en columna A - índice 0)
       for (let i = 1; i < rows.length; i++) {
         if (rows[i][0] == idToUpdate) {
           // Actualizar columna E (Índice 4+1 = 5, pero getRange es 1-based)
           // status es la 5ta columna (A, B, C, D, E) -> fila i+1, col 5
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
    // Normalizar
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
    // Assuming: ID, Name, Company, Service, Status, Date, Phone, Email (Swapped based on user feedback)
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

// --- AUTOMATIZACIÓN ---
// Configura un Activador (Reloj) para ejecutar esto diariamente
function checkFollowUps() {
  const sheet = SpreadsheetApp.openById('1DetNAjSygZtvOHAJAtgcMdtIPdO1lZmO-I716HX-2ic').getSheets()[0];
  const rows = sheet.getDataRange().getValues();
  let leadsToContact = [];

  // Skip header
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const nombre = row[1];
    const estado = row[4];
    const fecha = new Date(row[5]);
    const telefono = row[7];
    
    // Lógica: Notificar si el estado es "Volver a Contactar" O si es "Nuevo" y tiene más de 2 días
    const daysOld = (new Date() - fecha) / (1000 * 60 * 60 * 24);
    
    if (estado === 'Volver a Contactar' || (estado === 'Nuevo' && daysOld > 2)) {
      leadsToContact.push(`${nombre} (${estado}) - Tel: ${telefono}`);
    }
  }

  if (leadsToContact.length > 0) {
    MailApp.sendEmail({
      to: 'keteruse@gmail.com', // Tu correo
      subject: '⚠️ Alerta CRM: Leads pendientes de seguimiento',
      htmlBody: `
        <h2>Tienes ${leadsToContact.length} leads esperando atención:</h2>
        <ul>
          ${leadsToContact.map(l => `<li>${l}</li>`).join('')}
        </ul>
        <p>Entra al CRM para gestionarlos.</p>
      `
    });
  }
}
