function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // IMPORTANTE: Reemplaza 'TU_ID_DE_HOJA_DE_CALCULO' con el ID real de tu hoja de Google Sheets
    const sheet = SpreadsheetApp.openById('1DetNAjSygZtvOHAJAtgcMdtIPdO1lZmO-I716HX-2ic').getSheets()[0];
    
    // 1. Intentar parsear los datos recibidos
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      // Si no es JSON, intentar usar parámetros de formulario
      data = e.parameter;
    }

    // 2. Normalizar campos (Buscamos claves comunes en diferentes APIs)
    // TikTok suele enviar estructuras anidadas, pero si usamos Make/Zapier llega plano.
    // Este código intenta encontrar datos útiles donde sea.
    
    const timestamp = new Date();
    const id = Utilities.getUuid();

    // Función auxiliar para buscar valor insensitive (nombre, Name, full_name, etc)
    const findValue = (obj, keys) => {
      const foundKey = Object.keys(obj).find(k => keys.includes(k.toLowerCase()));
      return foundKey ? obj[foundKey] : '';
    };

    let nombre = findValue(data, ['nombre', 'name', 'full_name', 'fullname', 'first_name']) || 'Sin nombre';
    let empresa = findValue(data, ['empresa', 'company', 'company_name', 'business']) || '';
    let servicio = findValue(data, ['servicio', 'service', 'campaign', 'ad_name', 'form_name']) || 'TikTok Lead';
    let email = findValue(data, ['email', 'correo', 'mail']) || '';
    let telefono = findValue(data, ['telefono', 'phone', 'phone_number', 'celular']) || '';
    
    // Si llega de TikTok directo (estructura compleja), a veces viene en data.page_info o similar.
    // Por seguridad, si todo está vacío, guardamos el JSON crudo en la columna de 'Empresa' para no perder el lead.
    if (nombre === 'Sin nombre' && !empresa && !email) {
       empresa = "RAW: " + JSON.stringify(data).substring(0, 500);
    }

    // Append row: [id, name, company/raw, service, status, date, email, phone]
    // Asegúrate de tener columnas suficientes en tu Sheet
    sheet.appendRow([
      id,
      nombre,
      empresa,
      servicio,
      'Nuevo',
      timestamp,
      email, // Nueva columna G sugerida
      telefono // Nueva columna H sugerida
    ]);

    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Lead recibido',
      id: id
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: e.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    // IMPORTANTE: Reemplaza 'TU_ID_DE_HOJA_DE_CALCULO' con el ID real de tu hoja de Google Sheets
    const sheet = SpreadsheetApp.openById('1DetNAjSygZtvOHAJAtgcMdtIPdO1lZmO-I716HX-2ic').getSheets()[0];
    const rows = sheet.getDataRange().getValues();
    const headers = rows[0]; 
    const data = rows.slice(1); // Skip header

    // Map rows to objects
    // Assuming columns order: ID, Nombre, Empresa, Servicio, Estado, Fecha, Telefono
    const leads = data.map(row => {
      let estado = row[4];
      // Si el estado viene vacío (común en TikTok), poner 'Nuevo'
      if (!estado) estado = 'Nuevo';

      let fecha = row[5];
      // TikTok envía Timestamp numérico (segundos), convertir a fecha legible
      // Si es un número grande (tipo 17xxxxxx), asumimos timestamp Unix
      if (typeof fecha === 'number' && fecha > 1000000000) {
        fecha = new Date(fecha * 1000).toLocaleString('es-ES'); 
      }

      return {
        id: row[0],
        nombre: row[1],
        empresa: row[2],
        servicio: row[3],
        estado: estado,
        fecha: fecha,
        telefono: (row[6] || '').toString() // Columna G - Force string to avoid undefined
      };
    });

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      data: leads
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: e.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
