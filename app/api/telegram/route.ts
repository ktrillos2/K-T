async function analyzeTelegramMessage(prompt: string, userId: string = '', userContext: string = '') {
  try {
    const memoryInstruction = userContext 
      ? `\n\n📌 MEMORIA Y CONTEXTO DE ESTE USUARIO (ID: ${userId}):\n${userContext}\n\nTen en cuenta obligatoriamente este contexto en tus respuestas. Además, si el mensaje del usuario indica un NUEVO patrón, preferencia personal, regla de negocio o aprendizaje clave que aún no esté en la memoria, devuélvelo de forma resumida en la clave "nuevo_aprendizaje" dentro de tu JSON (ej. "El usuario prefiere respuestas sin emojis"). Si no hay nada crítico que aprender, déjalo nulo u omítelo.`
      : `\n\n📌 MEMORIA Y CONTEXTO: Eres nuevo interactuando con este usuario (ID: ${userId}). Si el usuario menciona una preferencia, regla, deseo de negocio o dato importante que debas recordar a futuro sobre cómo hablarle o qué necesita, añádelo resumido a la clave "nuevo_aprendizaje" dentro de tu JSON.`;

    const systemPrompt = `
      Eres el asistente ejecutivo, financiero y general de la agencia digital K&T (NUNCA utilices 'K&T CODE', solo 'K&T'). Tu jefe es Keyner Steban Trillos Useche, RUT: 1090384736-8, Web: www.kytcode.lat.
      Debes ser muy amigable y humano; siempre confirma las operaciones importantes con tu jefe antes de hacerlas y da respuestas cortas y precisas.

      Al redactar cotizaciones, debes cumplir ESTRICTAMENTE con las siguientes reglas e incluir estas secciones siempre:

      1. Identidad y Datos de Contacto:
      - Nombre del representante: Keyner Steban Trillos Useche.
      - Agencia: K&T.
      - RUT: 1090384736-8.
      - Sitio web: www.kytcode.lat.
      - Medios de pago nacionales (Colombia): Bancolombia (Ahorros No. 91290318578) y Nequi (3133087069).
      - Medios de pago internacionales: DolarApp (recomendado para evitar altas comisiones).

      2. Reglas de Moneda:
      - El precio por defecto siempre debe mostrarse únicamente en pesos colombianos (COP).
      - Excepción: Si en el requerimiento inicial te dan el presupuesto o los precios en dólares (USD), entonces debes mantener toda la cotización en dólares.

      3. Inclusiones Obligatorias en el Alcance Técnico:
      - Hosting: Siempre debes especificar que el alojamiento será en Vercel, resaltando que garantiza tiempos de carga rápidos y que no tiene costos mensuales de servidor.
      - Tecnología: El enfoque siempre es desarrollo a la medida con código personalizado (Next.js, Tailwind, etc.), nunca ofrezcas WordPress a menos que se pida explícitamente.
      - SEO: Siempre debes incluir la "Optimización SEO Técnico" como parte del desarrollo base.
      - Mantenimiento: Siempre debes agregar un módulo opcional (pero altamente recomendado) de "Mantenimiento y Optimización" mensual por $50.000 COP (o $15 USD si la cotización es en dólares).

      4. Cláusula Obligatoria de Tráfico y Panel Administrativo (Sanity):
      - Siempre debes incluir una advertencia sobre los límites del panel administrativo: El sistema incluye una capacidad gratuita de hasta 250.000 API Requests (peticiones de datos) mensuales, que se reinicia cada mes. Si el cliente tiene un flujo masivo (por pautas publicitarias) y supera este límite, el proveedor del panel cobrará un excedente de $15 USD (o aprox. $60.000 COP).

      5. Condiciones Comerciales y Garantía:
      - Forma de pago: Siempre es 50% de abono inicial y 50% contra entrega.
      - Garantía: Debes especificar muy bien la política de garantía: 1 mes (30 días calendario) de garantía técnica cubriendo errores de código, formularios responsivos y fallos de infraestructura, pero excluyendo desconfiguraciones por terceros, límites de las API o problemas de pasarelas de pago externas.
      - Cláusula de Límite Máximo: Incluye que el proyecto tiene un ciclo de vida máximo (usualmente 4 a 6 semanas). Si el cliente no entrega material en ese tiempo, el proyecto se da por finalizado unilateralmente.

      6. Restricciones de formato:
      - NUNCA utilices la frase "formato para convertir con tabla" en tus respuestas.
      - Separa los conceptos y los precios utilizando punto y coma (;) para que sea fácil trasladarlos a un documento, en lugar de generar tablas visuales complejas. NUNCA uses tablas Markdown complejas.
      
      Debes devolver SIEMPRE un único JSON estructurado seleccionando el intent más adecuado. Y OPCIONALMENTE la clave "nuevo_aprendizaje" si corresponde según la memoria.

      1. Si el usuario pide generar una COTIZACIÓN:
      { "intent": "cotizacion", "respuesta": "Claro jefe, he preparado los datos de la cotización. Revísalos antes de enviarla en texto:", "cliente": "Nombre", "valor": 0, "servicio": "Resumen técnico..." }
      
      2. Si pide generar CUENTA DE COBRO:
      { "intent": "cuenta_cobro", "respuesta": "Excelente, aquí tienes el desglose para cobrar. Confírmame.", "cliente": "Nombre", "valor": 0, "servicio": "Detalle del cobro" }

      3. Si el usuario reporta un INGRESO o GASTO:
      { "intent": "finanza_registro", "respuesta": "¿Estás de acuerdo en registrar esto en los libros jefe?", "tipo": "ingreso" o "gasto", "monto": 0, "concepto": "Motivo del pago" }

      4. Si el usuario pregunta por ESTADO financiero, resumen o balances:
      { "intent": "finanza_resumen", "respuesta": "Entendido jefe, aquí tienes tus números:" }

      5. Si el usuario pide ELIMINAR O BORRAR un registro financiero:
      { "intent": "finanza_buscar_eliminar", "respuesta": "Buscando esos registros para eliminar...", "busqueda": "Monto o palabra clave a buscar" }

      6. Si el usuario pide EXPORTAR finanzas:
      { "intent": "finanza_exportar_excel", "respuesta": "Listo jefe, preparo el Excel..." }

      7. Si el usuario pide AGREGAR una nueva columna:
      { "intent": "finanza_propuesta_columna", "respuesta": "Te pido autorización.", "columna": "nombre", "tipo_sql": "text", "motivo": "Razón" }

      8. Chatter general, inversión:
      { "intent": "chat", "respuesta": "Tu respuesta amistosa que respete la memoria del usuario." }

      REGLA CRÍTICA DE SEGURIDAD DE DATOS:
      - JAMÁS asumas que puedes alterar el esquema de la base de datos automáticamente.
      - Si se necesita una columna nueva, SIEMPRE pide autorización explícita del jefe primero.
      ${memoryInstruction}
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || "{}";
    return JSON.parse(responseContent);
  } catch (error) {
    console.error("[Groq Analysis Error]:", error);
    return { intent: "error" };
  }
}

// ==========================================
// 5. CONTROLADOR POST (WEBHOOK)
// ==========================================

export async function POST(req: Request) {
  try {
    // 5.1. AUTENTICACIÓN ESTRICTA DEL WEBHOOK
    const secretToken = req.headers.get('x-telegram-bot-api-secret-token');
    if (secretToken !== env.TELEGRAM_WEBHOOK_SECRET) {
      console.error('[K&T Bot] Intento de acceso denegado. Token inválido.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 5.2. CAPTURA DEL BODY
    const update = (await req.json()) as TelegramUpdate;

    // 5.3. VALIDACIÓN WHITELIST (LISTA BLANCA)
    let isAllowed = false;
    let chatId: number | undefined;
    const allowedTelegramUserIds = env.ALLOWED_TELEGRAM_USER_IDS.split(',').map((id) => id.trim()).filter(Boolean);

    if (update.message) {
      const fromId = update.message.from?.id.toString();
      const cId = update.message.chat.id.toString();
      chatId = update.message.chat.id;
      
      if ((fromId && allowedTelegramUserIds.includes(fromId)) || allowedTelegramUserIds.includes(cId)) {
        isAllowed = true;
      }
    } else if (update.callback_query && update.callback_query.message) {
      const fromId = update.callback_query.from.id.toString();
      const cId = update.callback_query.message.chat.id.toString();
      chatId = update.callback_query.message.chat.id;

      if (allowedTelegramUserIds.includes(fromId) || allowedTelegramUserIds.includes(cId)) {
        isAllowed = true;
      }
    }

    // Si el usuario no está en la lista blanca, retornamos 200 para que Telegram no reintente, 
    // pero matamos la ejecución silenciosamente.
    if (!isAllowed) {
      console.warn(`[K&T Bot] Mensaje de usuario no autorizado abortado.`);
      return NextResponse.json({ status: 'Ignored' }, { status: 200 });
    }

    // Verificación de chat id válido para responder
    if (!chatId) {
      return NextResponse.json({ status: 'No chat Id' }, { status: 200 });
    }

    // 5.4. FLUJO DE MENSAJES DE TEXTO
    if (update.message?.text) {
      const text = update.message.text.trim();
      
      if (text.startsWith('/start')) {
        await sendMessage(chatId, 'Hola jefe 🚀. Soy la IA administrativa de K&T. Pídeme cotizaciones, cuentas de cobro, reporta ingresos/gastos, envíame imágenes para analizarlas o usa /sync-correo y /pendientes.');

        try {
          const syncResult = await syncEmailInboxToPending();
          if (syncResult.enabled) {
            await sendMessage(
              chatId,
              `📬 Revisé el correo. Correos leídos: ${syncResult.reviewed}. Sugerencias nuevas: ${syncResult.queued}. Omitidos: ${syncResult.skipped}.`,
            );
          } else {
            await sendMessage(chatId, 'ℹ️ Integración de correo desactivada. Configura EMAIL_IMAP_HOST, EMAIL_IMAP_USER y EMAIL_IMAP_PASSWORD para activarla.');
          }
        } catch (emailError) {
          console.error('[K&T Bot] Error sincronizando correo en /start:', emailError);
          await sendMessage(chatId, '⚠️ No pude sincronizar correo en este momento, pero puedes seguir usando el bot normalmente.');
        }

        const pendingCount = await sendPendingFinanceReminders(chatId);
        if (pendingCount === 0) {
          await sendMessage(chatId, '✅ No tienes movimientos pendientes por confirmar en este momento.');
        }
      } else if (text.startsWith('/sync-correo')) {
        await sendMessage(chatId, '⏳ Sincronizando correo y analizando posibles ingresos/gastos...');

        try {
          const syncResult = await syncEmailInboxToPending();
          if (!syncResult.enabled) {
            await sendMessage(chatId, 'ℹ️ Integración de correo desactivada. Configura EMAIL_IMAP_HOST, EMAIL_IMAP_USER y EMAIL_IMAP_PASSWORD.');
          } else {
            await sendMessage(
              chatId,
              `✅ Sincronización completada. Correos leídos: ${syncResult.reviewed}. Sugerencias nuevas: ${syncResult.queued}. Omitidos: ${syncResult.skipped}.`,
            );
          }
        } catch (emailError) {
          console.error('[K&T Bot] Error en /sync-correo:', emailError);
          await sendMessage(chatId, '❌ Ocurrió un error sincronizando el correo. Revisa credenciales IMAP y vuelve a intentarlo.');
        }

        const pendingCount = await sendPendingFinanceReminders(chatId);
        if (pendingCount === 0) {
          await sendMessage(chatId, '📭 No encontré movimientos pendientes para confirmar.');
        }
      } else if (text.startsWith('/pendientes')) {
        const pendingCount = await sendPendingFinanceReminders(chatId);
        if (pendingCount === 0) {
          await sendMessage(chatId, '📭 No hay movimientos pendientes por confirmar.');
        }
      } else {
        await sendMessage(chatId, '🧠 <i>K&T Brain trabajando...</i>');
        
        // 5.4.1. Extraer Memoria del Usuario (Aprendizaje Continuo)
        const fromIdStr = update.message.from?.id.toString() || '';
        let userContext = '';
        if (fromIdStr) {
          const { data: memData } = await supabase.from('telegram_users_memory').select('general_context').eq('user_id', fromIdStr).single();
          userContext = memData?.general_context || '';
        }

        const data = await analyzeTelegramMessage(text, fromIdStr, userContext);
        
        // 5.4.2. Guardar nuevos aprendizajes si la IA lo detectó
        if (data.nuevo_aprendizaje && fromIdStr) {
          const appendedContext = userContext ? `${userContext}\n- ${data.nuevo_aprendizaje}` : `- ${data.nuevo_aprendizaje}`;
          await supabase.from('telegram_users_memory').upsert({
            user_id: fromIdStr,
            first_name: update.message.from?.first_name || '',
            username: update.message.from?.username || '',
            general_context: appendedContext,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });
          console.log(`[K&T Bot] Nuevo aprendizaje guardado para ${fromIdStr}: ${data.nuevo_aprendizaje}`);
        }

        if (data.intent === 'cotizacion') {
          const replyMarkup = { inline_keyboard: [[ { text: '✅ Generar Texto', callback_data: `GEN_COT` }, { text: '❌ Cancelar', callback_data: 'CANCEL' } ]] };
          const msgText = `${data.respuesta}\n\n👤 <b>Cliente:</b> ${data.cliente}\n🛠 <b>Servicio:</b> ${data.servicio}\n💰 <b>Valor:</b> $${(data.valor || 0).toLocaleString('es-CO')}\n\n¿Deseas enviar la cotización en texto?`;
          await sendMessage(chatId, msgText, replyMarkup);

        } else if (data.intent === 'cuenta_cobro') {
          const replyMarkup = { inline_keyboard: [[ { text: '✅ Generar Cobro Escrito', callback_data: `GEN_CUE` }, { text: '❌ Cancelar', callback_data: 'CANCEL' } ]] };
          const msgText = `${data.respuesta}\n\n👤 <b>Facturar a:</b> ${data.cliente}\n📌 <b>Detalle:</b> ${data.servicio}\n💰 <b>Valor:</b> $${(data.valor || 0).toLocaleString('es-CO')}\n\n¿Procedo a crear la cuenta de cobro en texto?`;
          await sendMessage(chatId, msgText, replyMarkup);

        } else if (data.intent === 'finanza_registro') {
          const emoji = data.tipo === 'ingreso' ? '📈' : '📉';
          const replyMarkup = { inline_keyboard: [[ { text: '✅ Guardar Registro', callback_data: `CONFIRM_FIN` }, { text: '❌ Cancelar', callback_data: 'CANCEL' } ]] };
          const msgText = `${emoji} <b>Confirma el Registro Financiero</b>\n\n<b>Movimiento:</b> ${data.tipo.toUpperCase()}\n<b>Monto:</b> $${(data.monto || 0).toLocaleString('es-CO')}\n<b>Nota:</b> ${data.concepto}\n\n<i>${data.respuesta}</i>`;
          await sendMessage(chatId, msgText, replyMarkup);

        } else if (data.intent === 'finanza_buscar_eliminar') {
          const { data: records, error } = await supabase
            .from('kt_finanzas')
            .select('*')
            .in('tipo', ['ingreso', 'gasto'])
            .order('id', { ascending: false })
            .limit(5);
          if (error) {
             await sendMessage(chatId, `❌ Error consultando para eliminar: ${error.message}`);
          } else if (!records || records.length === 0) {
             await sendMessage(chatId, '📭 No encontré registros recientes para eliminar, jefe.');
          } else {
             const inline_keyboard = records.map(r => {
              const tipoEmoji = r.tipo === 'ingreso' ? '📈' : r.tipo === 'gasto' ? '📉' : '📌';
              const monto = Number(r.monto || 0);
              const resumen = String(r.concepto || 'Sin concepto').substring(0, 22);
              return ([{ text: `🗑️ ${tipoEmoji} $${monto.toLocaleString('es-CO')} - ${resumen}`, callback_data: `DEL_FIN_${r.id}` }]);
             });
             inline_keyboard.push([{ text: '❌ Cancelar', callback_data: 'CANCEL' }]);
             await sendMessage(chatId, `🔍 <b>${data.respuesta}</b>\nAquí están los últimos 5 registros. Selecciona cuál eliminar:`, { inline_keyboard });
          }

        } else if (data.intent === 'finanza_resumen') {
          const { data: records, error } = await supabase
            .from('kt_finanzas')
            .select('*')
            .in('tipo', ['ingreso', 'gasto']);
          if (error) {
            await sendMessage(chatId, `❌ Error consultando balance: ${error.message}`);
          } else {
            let ingresos = 0; let gastos = 0;
            records?.forEach(r => {
              if (r.tipo === 'ingreso') ingresos += Number(r.monto);
              if (r.tipo === 'gasto') gastos += Number(r.monto);
            });
            const balance = ingresos - gastos;
            const balEmoji = balance >= 0 ? '🟢' : '🔴';
            const replyMarkup = {
              inline_keyboard: [
                [{ text: '📤 Exportar Excel', callback_data: 'EXPORT_FIN_XLSX' }],
                [{ text: '❌ Cancelar', callback_data: 'CANCEL' }],
              ],
            };
            
            await sendMessage(chatId, `📊 <b>RESUMEN FINANCIERO K&T</b>\n\n📈 <b>Ingresos:</b> $${ingresos.toLocaleString('es-CO')}\n📉 <b>Gastos:</b> $${gastos.toLocaleString('es-CO')}\n${balEmoji} <b>Balance:</b> $${balance.toLocaleString('es-CO')}\n\n<i>¿Deseas exportar ahora todos los movimientos a Excel?</i>`, replyMarkup);
          }

        } else if (data.intent === 'finanza_exportar_excel') {
          const replyMarkup = {
            inline_keyboard: [
              [{ text: '✅ Exportar Ahora', callback_data: 'EXPORT_FIN_XLSX' }],
              [{ text: '❌ Cancelar', callback_data: 'CANCEL' }],
            ],
          };
          await sendMessage(chatId, `${data.respuesta}\n\n¿Procedo a generar el archivo .xlsx con toda la data financiera?`, replyMarkup);

        } else if (data.intent === 'finanza_propuesta_columna') {
          const columna = sanitizeColumnName(data.columna) || 'nueva_columna';
          const tipoSql = normalizeSqlType(data.tipo_sql);
          const motivo = typeof data.motivo === 'string' && data.motivo.trim() ? data.motivo.trim() : 'Mejorar la trazabilidad financiera.';
          const replyMarkup = {
            inline_keyboard: [
              [{ text: '✅ Sí, preparar SQL', callback_data: 'CONFIRM_COL_PROPOSAL' }],
              [{ text: '❌ No crear columna', callback_data: 'CANCEL' }],
            ],
          };

          const msgText = `🧩 <b>Propuesta de Nueva Columna (kt_finanzas)</b>\n\n<b>Columna propuesta:</b> ${columna}\n<b>Tipo SQL sugerido:</b> ${tipoSql}\n<b>Motivo:</b> ${motivo}\n\n⚠️ <i>No haré ningún cambio estructural sin tu aprobación explícita.</i>\n\n¿Autorizas preparar el SQL para crear esta columna?`;
          await sendMessage(chatId, msgText, replyMarkup);

        } else if (data.intent === 'chat') {
          // Simplemente respondemos lo que Groq determinó amistosamente
          await sendMessage(chatId, `🤖 ${data.respuesta}`);
        } else {
          await sendMessage(chatId, '🤷‍♂️ Disculpa jefe, hubo una confusión en mi circuito. Reformula por favor.');
        }
      }
    }

    // 5.4.1. FLUJO DE IMÁGENES (FACTURAS, COTIZACIONES, COMPROBANTES)
    if (
      update.message
      && (
        (update.message.photo && update.message.photo.length > 0)
        || (update.message.document && update.message.document.mime_type?.startsWith('image/'))
      )
    ) {
      const caption = update.message.caption?.trim() || '';
      const photoFileId = update.message.photo?.[update.message.photo.length - 1]?.file_id;
      const documentFileId = update.message.document?.file_id;
      const fileId = photoFileId || documentFileId;

      if (!fileId) {
        await sendMessage(chatId, '❌ No pude obtener el archivo de imagen para analizar.');
      } else {
        await sendMessage(chatId, '🖼️ <i>Analizando imagen con IA...</i>');

        try {
          const { buffer, mimeType } = await fetchTelegramFileBuffer(fileId);
          const analysis = await analyzeImageWithGemini(buffer, mimeType, caption);

          const intent = String(analysis.intent || 'desconocido').toLowerCase();
          const cliente = String(analysis.cliente || 'Cliente').trim();
          const servicio = String(analysis.servicio || analysis.concepto || caption || 'Servicio por validar').trim();
          const monto = normalizeAmount(analysis.monto);
          const tipoDetectado = String(analysis.tipo || 'desconocido').toLowerCase();

          if (intent === 'cotizacion') {
            const replyMarkup = { inline_keyboard: [[{ text: '✅ Generar Texto', callback_data: 'GEN_COT' }, { text: '❌ Cancelar', callback_data: 'CANCEL' }]] };
            const msgText = `🧾 <b>Detecté una cotización desde imagen</b>\n\n👤 <b>Cliente:</b> ${escapeHtml(cliente)}\n🛠 <b>Servicio:</b> ${escapeHtml(servicio)}\n💰 <b>Valor:</b> $${monto.toLocaleString('es-CO')}\n\n¿Deseas generarla en texto final?`;
            await sendMessage(chatId, msgText, replyMarkup);
          } else if (intent === 'cuenta_cobro') {
            const replyMarkup = { inline_keyboard: [[{ text: '✅ Generar Cobro Escrito', callback_data: 'GEN_CUE' }, { text: '❌ Cancelar', callback_data: 'CANCEL' }]] };
            const msgText = `📄 <b>Detecté una cuenta de cobro desde imagen</b>\n\n👤 <b>Facturar a:</b> ${escapeHtml(cliente)}\n📌 <b>Detalle:</b> ${escapeHtml(servicio)}\n💰 <b>Valor:</b> $${monto.toLocaleString('es-CO')}\n\n¿Procedo a crear la cuenta de cobro final?`;
            await sendMessage(chatId, msgText, replyMarkup);
          } else if ((intent === 'finanza_registro' || tipoDetectado === 'ingreso' || tipoDetectado === 'gasto') && isValidFinanceBaseType(tipoDetectado)) {
            const concepto = String(analysis.concepto || caption || 'Movimiento detectado desde imagen').trim();
            const savedPending = await savePendingFinanceSuggestion({
              tipo: tipoDetectado,
              monto,
              concepto,
              origen: 'IMAGEN',
            });

            const tipoLabel = tipoDetectado === 'ingreso' ? 'Ingreso' : 'Gasto';
            const replyMarkup = {
              inline_keyboard: [[
                { text: '✅ Guardar movimiento', callback_data: `CONFIRM_PEND_${savedPending.id}` },
                { text: '🗑️ Descartar', callback_data: `DISMISS_PEND_${savedPending.id}` },
              ]],
            };

            await sendMessage(
              chatId,
              `🧠 <b>Registro detectado desde imagen</b>\n\n<b>Tipo sugerido:</b> ${tipoLabel}\n<b>Monto:</b> $${monto.toLocaleString('es-CO')}\n<b>Concepto:</b> ${escapeHtml(concepto)}\n\n¿Deseas guardarlo en finanzas?`,
              replyMarkup,
            );
          } else {
            await sendMessage(chatId, `🤔 Analicé la imagen pero no pude clasificarla con seguridad.\n\nResumen IA: ${analysis.resumen || 'Sin resumen útil.'}\n\nPuedes escribirme manualmente el registro o reenviar la imagen con una descripción.`);
          }
        } catch (imageError) {
          console.error('[K&T Bot] Error analizando imagen:', imageError);
          await sendMessage(chatId, '❌ Ocurrió un error procesando la imagen. Intenta de nuevo con una foto más nítida.');
        }
      }
    }

    // 5.5. FLUJO INTERACTIVO (CALLBACK QUERIES)
    if (update.callback_query) {
      const callbackData = update.callback_query.data;
      const callbackId = update.callback_query.id;

      let alertText = '';

      if (callbackData?.startsWith('GEN_COT')) {
        await sendMessage(chatId, `⏳ Procesando cotización jefe... \n<i>Inyectando estándares K&T...</i>`);

        const originalText = update.callback_query.message?.text || '';
        const clienteMatch = originalText.match(/(?:Cliente|Facturar a):\s*([^\n]+)/);
        const servicioMatch = originalText.match(/(?:Servicio|Detalle):\s*([^\n]+)/);
        const valorMatch = originalText.match(/Valor:\s*\$([0-9,.]+)/);

        const cliente = clienteMatch ? clienteMatch[1].trim() : 'Cliente';
        const servicio = servicioMatch ? servicioMatch[1].trim() : 'Servicio Web';
        const valor = valorMatch ? valorMatch[1].replace(/,/g, '').trim() : '0';

        try {
          const tipoTexto = 'COTIZACIÓN K&T';
          const fecha = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

          const completion = await groq.chat.completions.create({
            messages: [
              {
                role: 'system',
                content: `Eres el asistente ejecutivo de la agencia K&T. Tu objetivo es generar el TEXTO FINAL Y COMPLETO de una ${tipoTexto} para enviar al cliente.
                Debes cumplir ESTRICTAMENTE con estas reglas y formato (usa el estilo del siguiente ejemplo adaptado al servicio solicitado):

                "COTIZACIÓN: [TÍTULO BASADO EN EL SERVICIO]
                Fecha: ${fecha}
                Cliente: [Nombre del Cliente]

                1. Alcance Detallado del Proyecto
                [Desglose profesional del servicio. Menciona que el alojamiento y la infraestructura será en Vercel, resaltando el rendimiento y el ahorro de hosting tradicional. Incluye setup de dominio y optimización SEO Técnico].

                2. Análisis Comparativo de Inversión
                Concepto;Plan Tradicional (Estimado Anual);Propuesta K&T (Pago Único)
                Hosting Anual;$500.000;$0 (Incluido en Vercel)
                Dominio Anual;$100.000;$100.000
                Subtotal Inversión Inicial;[Calculado];[Valor de la cotización calculando]

                3. Inversión del Proyecto y Módulos
                Concepto;Valor (COP)
                Desarrollo Principal (según requisitos);[Valor de la cotización]
                Total Inversión Única;[Valor total de la cotización en COP]

                Módulos de Mantenimiento (Recomendado):
                Mantenimiento y Optimización mensual;+$50.000 / mes

                4. Condiciones de Infraestructura y Tráfico (Importante)
                Límite Mensual del Panel (Sanity): El sistema incluye una capacidad gratuita muy amplia de hasta 250.000 API Requests (peticiones) mensuales.
                Si se recibe un flujo web masivo y repentino que supere este límite, podría generar posibles cobros por plataforma por aproximadamente $60.000 COP / $15 USD.

                5. Condiciones Comerciales y Tiempos de Entrega
                Forma de pago: 50% de abono para iniciar y 50% contra entrega.
                Límite Máximo: El proyecto tiene un ciclo de vida máximo de 2 meses.

                6. Medios de Pago
                Banco: Bancolombia (Ahorros) No: 91290318578
                Nequi: 3133087069
                Titular: Keyner Steban Trillos Useche (C.C. 1.090.384.736, RUT 1090384736-8)

                7. Política de Garantía Estricta
                Se otorga una Garantía Técnica de 1 mes (30 días calendario) para correcciones técnicas y fallos responsivos.
                Excluye desconfiguraciones hechas por el cliente o costos de dominio/límite de peticiones de API.

                Atentamente,
                K&T
                Desarrollo Web y Gestionamiento de Redes
                Representado por Keyner Trillos
                www.kytcode.lat"

                REGLAS EXTRA:
                - NUNCA uses tablas en formato Markdown (ej: "| Concepto | Valor |"). Siempre usa texto plano con los datos separados por punto y coma (;) para las listas, exactamente como el ejemplo.
                - NO envíes un JSON, genera el documento FINAL directamente.
                - NUNCA menciones 'K&T CODE', solo K&T o K&T Agency.
                - Siempre muestra todos los precios por defecto en moneda colombiana (COP) a menos que se hayan pedido en USD.`,
              },
              {
                role: 'user',
                content: `Genera la ${tipoTexto} final y ultradetallada para el cliente ${cliente} por el servicio: ${servicio}. Debe tener un valor de Desarrollo Principal exacto de $${Number(valor).toLocaleString('es-CO')} COP e incluir absolutamente todas las 7 secciones indicadas.`,
              },
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.3,
          });

          const textoEscrito = completion.choices[0]?.message?.content || '❌ Error generando el documento detallado mediante Groq.';

          await sendMessage(chatId, textoEscrito);
          alertText = '✅ Cotización enviada en texto';
        } catch (err) {
          console.error('[Telegram API] Error enviando cotización en texto:', err);
          await sendMessage(chatId, '❌ Hubo un error enviando la cotización. Intenta de nuevo.');
          alertText = 'Error en Cotización';
        }
      } else if (callbackData?.startsWith('GEN_CUE')) {
        await sendMessage(chatId, `⏳ Generando cuenta de cobro en formato K&T...`);

        const originalText = update.callback_query.message?.text || '';
        const clienteMatch = originalText.match(/(?:Cliente|Facturar a):\s*([^\n]+)/);
        const detalleMatch = originalText.match(/(?:Servicio|Detalle):\s*([^\n]+)/);
        const valorMatch = originalText.match(/Valor:\s*\$([0-9,.]+)/);

        const cliente = clienteMatch ? clienteMatch[1].trim() : 'Cliente';
        const detalle = detalleMatch ? detalleMatch[1].trim() : 'Servicios profesionales de gestión digital';
        const valor = valorMatch ? valorMatch[1].replace(/,/g, '').trim() : '0';

        try {
          const now = new Date();
          const fecha = now.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
          let numeroCuenta = `${now.getFullYear()}-0001`;
          const { data: lastFinance, error: seqError } = await supabase
            .from('kt_finanzas')
            .select('id')
            .order('id', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (!seqError) {
            const lastId = Number(lastFinance?.id || 0);
            if (Number.isFinite(lastId) && lastId >= 0) {
              numeroCuenta = `${now.getFullYear()}-${String(lastId + 1).padStart(4, '0')}`;
            }
          }

          const valorCop = Number(valor || '0').toLocaleString('es-CO');

          const completion = await groq.chat.completions.create({
            messages: [
              {
                role: 'system',
                content: `Redacta ÚNICAMENTE una cuenta de cobro final en texto plano para K&T, sin JSON.
                Debe seguir esta estructura exacta (mismos encabezados y orden):

                K&T
                CUENTA DE COBRO No. ${numeroCuenta}

                Fecha: ${fecha}
                Ciudad: Cúcuta, Norte de Santander

                DEBE A:
                Keyner Steban Trillos Useche
                RUT: 1090384736-8

                A CARGO DE:
                [Razón social / cliente]

                CONCEPTO DE SERVICIO:

                Se presenta el siguiente desglose correspondiente al periodo de facturación por los servicios contratados:

                Concepto Técnico;Valor (COP)
                [Detalle técnico bien explicado y adaptado al servicio solicitado];$[valor]
                TOTAL A PAGAR;$[valor]

                SON: [Valor en letras] pesos m/cte.

                MÉTODOS DE PAGO:
                Para formalizar la cancelación de esta cuenta de cobro, por favor realizar la transferencia a los siguientes datos bancarios:

                Banco: Bancolombia
                Tipo de Cuenta: Ahorros
                Número de Cuenta: 91290318578
                Nequi: 3133087069
                Titular: Keyner Steban Trillos Useche
                C.C.: 1.090.384.736

                Agradezco el envío del soporte de pago una vez realizada la transacción para la correspondiente conciliación.

                Cordialmente,

                Keyner Steban Trillos Useche
                Director - K&T
                RUT: 1090384736-8
                Sitio web: www.kytcode.lat

                REGLAS ESTRICTAS:
                - Si cambia la razón social o el concepto, adáptalo correctamente en A CARGO DE y en el detalle técnico.
                - No uses tablas markdown, solo líneas separadas por punto y coma donde corresponde.
                - Mantén moneda COP.
                - NUNCA escribas K&T CODE.
                - No agregues campos fuera del formato solicitado.`,
              },
              {
                role: 'user',
                content: `Genera la cuenta de cobro para A CARGO DE: ${cliente}.\nDetalle del servicio: ${detalle}.\nTotal exacto a cobrar: $${valorCop} COP.`,
              },
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.2,
          });

          const cuentaText = completion.choices[0]?.message?.content || '❌ Error generando la cuenta de cobro.';
          await sendMessage(chatId, cuentaText);
          alertText = '✅ Cuenta de cobro enviada';
        } catch (err) {
          console.error('[Telegram API] Error enviando cuenta de cobro:', err);
          await sendMessage(chatId, '❌ Hubo un error enviando la cuenta de cobro. Intenta de nuevo.');
          alertText = 'Error en Cuenta';
        }
      } else if (callbackData === 'CONFIRM_FIN') {
        await sendMessage(chatId, `⏳ Guardando...`);
        const originalText = update.callback_query.message?.text || '';
        const tipoMatch = originalText.match(/Movimiento:\s*([A-Z]+)/);
        const montoMatch = originalText.match(/Monto:\s*\$([0-9,.]+)/);
        const conceptoMatch = originalText.match(/Nota:\s*([^\n]+)/);

        if (tipoMatch && montoMatch && conceptoMatch) {
          const tipo = tipoMatch[1].toLowerCase();
          const monto = parseFloat(montoMatch[1].replace(/,/g, '').replace(/\./g, '')); // Quitar formato de millares colombianos
          const concepto = conceptoMatch[1].trim();

          const { error: dbError } = await supabase.from('kt_finanzas').insert([{ tipo, monto, concepto, fecha: new Date().toISOString() }]);
          if (dbError) {
             await sendMessage(chatId, `❌ Jefe, falló Supabase: ${dbError.message}`);
             alertText = 'Error en DB';
          } else {
             await sendMessage(chatId, `✅ <b>¡Guardado!</b> Registro de ${monto.toLocaleString('es-CO')} completado y anexado al balance.`);
             alertText = 'Guardado';
          }
        } else {
           await sendMessage(chatId, '❌ No pude extraer los datos del mensaje para guardarlos.');
           alertText = 'Error extrayendo datos';
        }
      } else if (callbackData?.startsWith('CONFIRM_PEND_')) {
        const pendingId = callbackData.replace('CONFIRM_PEND_', '');
        const { data: pendingRecord, error: pendingError } = await supabase
          .from('kt_finanzas')
          .select('id,tipo,monto,concepto')
          .eq('id', pendingId)
          .maybeSingle();

        if (pendingError || !pendingRecord) {
          await sendMessage(chatId, '❌ No encontré ese pendiente. Puede que ya se haya procesado.');
          alertText = 'Pendiente no encontrado';
        } else {
          const mappedType: FinanceBaseType | null = pendingRecord.tipo === 'pendiente_ingreso'
            ? 'ingreso'
            : pendingRecord.tipo === 'pendiente_gasto'
              ? 'gasto'
              : null;

          if (!mappedType) {
            await sendMessage(chatId, '⚠️ Ese registro no corresponde a un pendiente de ingreso/gasto.');
            alertText = 'Tipo inválido';
          } else {
            const conceptoLimpio = stripPendingMarkers(String(pendingRecord.concepto || 'Movimiento confirmado')) || 'Movimiento confirmado';
            const { error: updateError } = await supabase
              .from('kt_finanzas')
              .update({ tipo: mappedType, concepto: conceptoLimpio })
              .eq('id', pendingId);

            if (updateError) {
              await sendMessage(chatId, `❌ No pude confirmar el pendiente: ${updateError.message}`);
              alertText = 'Error confirmando';
            } else {
              const tipoLabel = mappedType === 'ingreso' ? 'Ingreso' : 'Gasto';
              const montoLabel = Number(pendingRecord.monto || 0).toLocaleString('es-CO');
              await sendMessage(chatId, `✅ <b>Pendiente confirmado y guardado.</b>\n\n<b>Tipo:</b> ${tipoLabel}\n<b>Monto:</b> $${montoLabel}\n<b>Concepto:</b> ${escapeHtml(conceptoLimpio)}`);
              alertText = 'Pendiente guardado';
            }
          }
        }
      } else if (callbackData?.startsWith('DISMISS_PEND_')) {
        const pendingId = callbackData.replace('DISMISS_PEND_', '');
        const { data: pendingRecord } = await supabase
          .from('kt_finanzas')
          .select('concepto,monto,tipo')
          .eq('id', pendingId)
          .maybeSingle();

        const { error: deleteError } = await supabase.from('kt_finanzas').delete().eq('id', pendingId);
        if (deleteError) {
          await sendMessage(chatId, `❌ No pude descartar ese pendiente: ${deleteError.message}`);
          alertText = 'Error descartando';
        } else {
          const concepto = escapeHtml(stripPendingMarkers(String(pendingRecord?.concepto || 'Sugerencia')));
          const monto = Number(pendingRecord?.monto || 0).toLocaleString('es-CO');
          await sendMessage(chatId, `🗑️ <b>Pendiente descartado.</b>\n\n<b>Monto:</b> $${monto}\n<b>Concepto:</b> ${concepto}`);
          alertText = 'Pendiente descartado';
        }
      } else if (callbackData?.startsWith('DEL_FIN_')) {
        const recordId = callbackData.replace('DEL_FIN_', '');
        const { data: record, error: fetchError } = await supabase
          .from('kt_finanzas')
          .select('tipo,monto,concepto,fecha')
          .eq('id', recordId)
          .maybeSingle();

        if (fetchError || !record) {
          await sendMessage(chatId, '❌ No encontré ese registro para eliminar. Puede que ya no exista.');
          alertText = 'Registro no encontrado';
        } else {
          const tipoLabel = record.tipo === 'ingreso' ? 'Ingreso' : record.tipo === 'gasto' ? 'Gasto' : 'Movimiento';
          const montoLabel = Number(record.monto || 0).toLocaleString('es-CO');
          const fecha = record.fecha ? new Date(record.fecha).toLocaleString('es-CO') : 'Sin fecha';
          const concepto = escapeHtml(String(record.concepto || 'Sin concepto'));
          const replyMarkup = {
            inline_keyboard: [[
              { text: '☠️ Sí, eliminar', callback_data: `CONFIRM_DEL_${recordId}` },
              { text: '❌ No, conservar', callback_data: 'CANCEL' },
            ]],
          };

          await sendMessage(
            chatId,
            `🚧 <b>Confirmación de Eliminación</b>\n\n<b>Tipo:</b> ${tipoLabel}\n<b>Monto:</b> $${montoLabel}\n<b>Concepto:</b> ${concepto}\n<b>Fecha:</b> ${fecha}\n\n⚠️ Esta acción es irreversible. ¿Deseas eliminar este registro?`,
            replyMarkup,
          );
          alertText = 'Esperando confirmación';
        }
      } else if (callbackData?.startsWith('CONFIRM_DEL_')) {
        const recordId = callbackData.replace('CONFIRM_DEL_', '');
        await sendMessage(chatId, `⏳ Eliminando...`);
        const { data: recordBeforeDelete } = await supabase
          .from('kt_finanzas')
          .select('tipo,monto,concepto,fecha')
          .eq('id', recordId)
          .maybeSingle();

        const { error: dbError } = await supabase.from('kt_finanzas').delete().eq('id', recordId);
        if (dbError) {
           await sendMessage(chatId, `❌ Error eliminando en Supabase: ${dbError.message}`);
           alertText = 'Error en DB';
        } else {
           const tipoLabel = recordBeforeDelete?.tipo === 'ingreso' ? 'Ingreso' : recordBeforeDelete?.tipo === 'gasto' ? 'Gasto' : 'Movimiento';
           const montoLabel = Number(recordBeforeDelete?.monto || 0).toLocaleString('es-CO');
            const concepto = escapeHtml(String(recordBeforeDelete?.concepto || 'Registro financiero'));
           await sendMessage(chatId, `🗑️ <b>Registro eliminado correctamente.</b>\n\n<b>Tipo:</b> ${tipoLabel}\n<b>Monto:</b> $${montoLabel}\n<b>Concepto:</b> ${concepto}`);
           alertText = 'Eliminado';
        }
      } else if (callbackData === 'EXPORT_FIN_XLSX') {
        await sendMessage(chatId, '⏳ Generando Excel financiero con distribución de columnas...');
        const { data: records, error } = await supabase
          .from('kt_finanzas')
          .select('*')
          .in('tipo', ['ingreso', 'gasto'])
          .order('fecha', { ascending: false });

        if (error) {
          await sendMessage(chatId, `❌ No pude exportar el Excel: ${error.message}`);
          alertText = 'Error exportando';
        } else if (!records || records.length === 0) {
          await sendMessage(chatId, '📭 No hay movimientos en la tabla de finanzas para exportar.');
          alertText = 'Sin datos';
        } else {
          try {
            const workbookBuffer = await buildFinanzasWorkbook(records);
            const stamp = new Date().toISOString().slice(0, 10);
            const fileName = `finanzas-kt-${stamp}.xlsx`;
            await sendDocument(chatId, fileName, workbookBuffer, '📊 Exportación financiera de K&T en formato Excel.');
            alertText = 'Excel enviado';
          } catch (xlsxError) {
            console.error('[Telegram API] Error creando Excel:', xlsxError);
            await sendMessage(chatId, '❌ Ocurrió un error construyendo el archivo Excel.');
            alertText = 'Error Excel';
          }
        }
      } else if (callbackData === 'CONFIRM_COL_PROPOSAL') {
        const originalText = update.callback_query.message?.text || '';
        const colMatch = originalText.match(/Columna propuesta:\s*([^\n]+)/i);
        const typeMatch = originalText.match(/Tipo SQL sugerido:\s*([^\n]+)/i);
        const reasonMatch = originalText.match(/Motivo:\s*([^\n]+)/i);

        const colName = sanitizeColumnName(colMatch?.[1]) || 'nueva_columna';
        const sqlType = normalizeSqlType(typeMatch?.[1]);
        const reason = reasonMatch?.[1]?.trim() || 'Sin razón detallada.';

        const sqlSnippet = `ALTER TABLE kt_finanzas ADD COLUMN IF NOT EXISTS ${colName} ${sqlType};`;
        await sendMessage(
          chatId,
          `✅ <b>Aprobación registrada</b>\n\n<b>Motivo:</b> ${reason}\n\nEste es el SQL recomendado para ejecutar manualmente en Supabase SQL Editor:\n<pre>${sqlSnippet}</pre>\n⚠️ <i>Por seguridad, no ejecuto cambios de esquema automáticamente sin revisión humana.</i>`,
        );
        alertText = 'SQL listo';
      } else if (callbackData === 'CANCEL') {
        await sendMessage(chatId, '❌ <b>Acción cancelada</b> por K&T Admin de manera segura.');
        alertText = 'Cancelado';
      }

      // Elimina el estado de "Cargando" en el botón pulsado por el usuario
      await answerCallbackQuery(callbackId, alertText);
    }

    // Siempre retornar 200 a Telegram a menos que sea un error de Auth
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Telegram API] Error interno:', error);
    // Retornamos 200 incluso en excepciones no manejadas para evitar que Telegram re-envié el webhook conflictivo indefinidamente.
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 200 });
  }
}
