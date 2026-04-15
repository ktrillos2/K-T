import { NextResponse } from 'next/server';
import { z } from 'zod';
import Groq from 'groq-sdk';
import { createClient } from '@supabase/supabase-js';

// ==========================================
// 1. VALIDACIÓN DE ENTORNO (Zod)
// ==========================================
const envSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().min(1, 'Falta TELEGRAM_BOT_TOKEN'),
  TELEGRAM_WEBHOOK_SECRET: z.string().min(1, 'Falta TELEGRAM_WEBHOOK_SECRET'),
  ALLOWED_TELEGRAM_USER_ID: z.string().min(1, 'Falta ALLOWED_TELEGRAM_USER_ID'),
  GROQ_API_KEY: z.string().min(1, 'Falta GROQ_API_KEY'),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Falta Service Role de Supabase'),
});

const env = envSchema.parse({
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET,
  ALLOWED_TELEGRAM_USER_ID: process.env.ALLOWED_TELEGRAM_USER_ID,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
});

const groq = new Groq({ apiKey: env.GROQ_API_KEY });
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const botToken = env.TELEGRAM_BOT_TOKEN.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
const TELEGRAM_API_URL = `https://api.telegram.org/bot${botToken}`;

// ==========================================
// 2. TIPOS E INTERFACES DE TELEGRAM
// ==========================================
interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  username?: string;
}

interface TelegramChat {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
}

interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
}

interface TelegramCallbackQuery {
  id: string;
  from: TelegramUser;
  message?: TelegramMessage;
  data?: string;
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
}

// ==========================================
// 3. REGLAS DE NEGOCIO K&T (PLANTILLAS)
// ==========================================
// NOTA: Abstenerse de usar la palabra "CODE". Siempre K&T.

export function getCotizacionTemplate(cliente: string, valor: number | string, servicio: string) {
  return `
    <div style="font-family: sans-serif; color: #333;">
      <h1>Cotización - K&T</h1>
      <p><strong>Cliente:</strong> ${cliente}</p>
      <p><strong>Servicio:</strong> ${servicio}</p>
      <p><strong>Valor Estimado:</strong> $${valor}</p>
      
      <h2>Especificaciones Técnicas</h2>
      <ul>
        <li><strong>Optimización SEO:</strong> Implementación de metadatos, sitemaps y optimización de rendimiento inicial para posicionamiento.</li>
        <li><strong>Infraestructura:</strong> El Hosting será Vercel para garantizar máxima velocidad y disponibilidad CDN global.</li>
      </ul>
      
      <h2>Garantía</h2>
      <p>K&T garantiza la correcta funcionalidad del código desplegado. Se incluye una garantía de 3 meses para corrección de bugs críticos sin costo adicional después del lanzamiento oficial a producción.</p>
    </div>
  `;
}

export function getCuentaDeCobroTemplate(cliente: string, valor: number | string, concepto: string) {
  return `
    <div style="font-family: sans-serif; color: #333;">
      <h1>K&T - Cuenta de Cobro</h1>
      <hr />
      <p><strong>A nombre de:</strong> Keyner Steban Trillos Useche</p>
      <p><strong>RUT:</strong> 1090384736-8</p>
      <br />
      <p><strong>Cliente:</strong> ${cliente}</p>
      
      <h2>Concepto del Servicio</h2>
      <!-- Formato estándar Vegaltex Tactical Colombia -->
      <p style="white-space: pre-line;">${concepto}</p>
      
      <h2 style="margin-top: 30px;">Total a Pagar: $${valor}</h2>
    </div>
  `;
}

// ==========================================
// 4. FUNCIONES UTILITARIAS Y LLAMADAS A IA
// ==========================================

async function sendMessage(chatId: number, text: string, replyMarkup?: any) {
  await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: replyMarkup,
    }),
  });
}

async function answerCallbackQuery(callbackQueryId: string, text?: string) {
  await fetch(`${TELEGRAM_API_URL}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text,
    }),
  });
}

async function analyzeTelegramMessage(prompt: string) {
  try {
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
      
      Debes devolver SIEMPRE un único JSON estructurado seleccionando el intent más adecuado.

      1. Si el usuario pide generar una COTIZACIÓN:
      { "intent": "cotizacion", "respuesta": "Claro jefe, he preparado los datos de la cotización. Revísalos antes de enviarla en texto:", "cliente": "Nombre", "valor": 0, "servicio": "Resumen técnico; Hosting en Vercel; SEO Técnico; Límite de Sanity..." }
      
      2. Si pide generar CUENTA DE COBRO:
      { "intent": "cuenta_cobro", "respuesta": "Excelente, aquí tienes el desglose para cobrar. Confírmame.", "cliente": "Nombre", "valor": 0, "servicio": "Detalle del cobro" }

      3. Si el usuario reporta un INGRESO o GASTO:
      { "intent": "finanza_registro", "respuesta": "¿Estás de acuerdo en registrar esto en los libros jefe?", "tipo": "ingreso" o "gasto", "monto": 0, "concepto": "Motivo del pago" }

      4. Si el usuario pregunta por ESTADO financiero, resumen o balances:
      { "intent": "finanza_resumen", "respuesta": "Entendido jefe, aquí tienes tus números:" }

      5. Si el usuario pide ELIMINAR O BORRAR un registro financiero (por monto o concepto):
      { "intent": "finanza_buscar_eliminar", "respuesta": "Buscando esos registros para eliminar...", "busqueda": "Monto o palabra clave a buscar" }

      6. Chatter general, inversión:
      { "intent": "chat", "respuesta": "Tu respuesta amistosa." }
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

    if (update.message) {
      const fromId = update.message.from?.id.toString();
      const cId = update.message.chat.id.toString();
      chatId = update.message.chat.id;
      
      if (fromId === env.ALLOWED_TELEGRAM_USER_ID || cId === env.ALLOWED_TELEGRAM_USER_ID) {
        isAllowed = true;
      }
    } else if (update.callback_query && update.callback_query.message) {
      const fromId = update.callback_query.from.id.toString();
      const cId = update.callback_query.message.chat.id.toString();
      chatId = update.callback_query.message.chat.id;

      if (fromId === env.ALLOWED_TELEGRAM_USER_ID || cId === env.ALLOWED_TELEGRAM_USER_ID) {
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
        await sendMessage(chatId, 'Hola jefe 🚀. Soy la IA administrativa de K&T. Pídeme cotizaciones, cuentas de cobro, reporta ingresos/gastos (ej: pago del 50%), o hablemos de estrategias.');
      } else {
        await sendMessage(chatId, '🧠 <i>K&T Brain trabajando...</i>');
        const data = await analyzeTelegramMessage(text);

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
          const { data: records, error } = await supabase.from('kt_finanzas').select('*').order('id', { ascending: false }).limit(5);
          if (error) {
             await sendMessage(chatId, `❌ Error consultando para eliminar: ${error.message}`);
          } else if (!records || records.length === 0) {
             await sendMessage(chatId, '📭 No encontré registros recientes para eliminar, jefe.');
          } else {
             const inline_keyboard = records.map(r => ([{ text: `🗑️ $${r.monto.toLocaleString('es-CO')} - ${r.concepto.substring(0, 20)}`, callback_data: `DEL_FIN_${r.id}` }]));
             inline_keyboard.push([{ text: '❌ Cancelar', callback_data: 'CANCEL' }]);
             await sendMessage(chatId, `🔍 <b>${data.respuesta}</b>\nAquí están los últimos 5 registros. Selecciona cuál eliminar:`, { inline_keyboard });
          }

        } else if (data.intent === 'finanza_resumen') {
          const { data: records, error } = await supabase.from('kt_finanzas').select('*');
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
            
            // Si estuviéramos creando gráficas sofisticadas se haría un render igual a generate-pdf
            await sendMessage(chatId, `📊 <b>RESUMEN FINANCIERO K&T</b>\n\n📈 <b>Ingresos:</b> $${ingresos.toLocaleString('es-CO')}\n📉 <b>Gastos:</b> $${gastos.toLocaleString('es-CO')}\n${balEmoji} <b>Balance:</b> $${balance.toLocaleString('es-CO')}\n\n<i>(En el futuro podré exportarte Excels directos desde acá jefe, por ahora así están nuestros números generales).</i>`);
          }

        } else if (data.intent === 'chat') {
          // Simplemente respondemos lo que Groq determinó amistosamente
          await sendMessage(chatId, `🤖 ${data.respuesta}`);
        } else {
          await sendMessage(chatId, '🤷‍♂️ Disculpa jefe, hubo una confusión en mi circuito. Reformula por favor.');
        }
      }
    }

    // 5.5. FLUJO INTERACTIVO (CALLBACK QUERIES)
    if (update.callback_query) {
      const callbackData = update.callback_query.data;
      const callbackId = update.callback_query.id;

      let alertText = '';

      if (callbackData?.startsWith('GEN_COT') || callbackData?.startsWith('GEN_CUE')) {
        const esCuenta = callbackData.startsWith('GEN_CUE');
        await sendMessage(chatId, `⏳ Procesando cotización jefe... \n<i>Inyectando estándares K&T...</i>`);
        
        // 1. Extraer los datos del texto del mensaje original
        const originalText = update.callback_query.message?.text || '';
        const clienteMatch = originalText.match(/(?:Cliente|Facturar a):\s*([^\n]+)/);
        const servicioMatch = originalText.match(/(?:Servicio|Detalle):\s*([^\n]+)/);
        const valorMatch = originalText.match(/Valor:\s*\$([0-9,.]+)/);

        const cliente = clienteMatch ? clienteMatch[1].trim() : 'Cliente';
        const servicio = servicioMatch ? servicioMatch[1].trim() : 'Servicio Web';
        const valor = valorMatch ? valorMatch[1].replace(/,/g, '').trim() : '0';

        // 2. Generar el texto completo con Groq usando las reglas estrictas
        try {
          const tipoTexto = esCuenta ? 'CUENTA DE COBRO' : 'COTIZACIÓN K&T';
          const fecha = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
          
          const completion = await groq.chat.completions.create({
            messages: [
              { 
                role: "system", 
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
                - Siempre muestra todos los precios por defecto en moneda colombiana (COP) a menos que se hayan pedido en USD.` 
              },
              { role: "user", content: `Genera la ${tipoTexto} final y ultradetallada para el cliente ${cliente} por el servicio: ${servicio}. Debe tener un valor de Desarrollo Principal exacto de $${Number(valor).toLocaleString('es-CO')} COP e incluir absolutamente todas las 7 secciones indicadas.` }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
          });

          const textoEscrito = completion.choices[0]?.message?.content || "❌ Error generando el documento detallado mediante Groq.";

          await sendMessage(chatId, textoEscrito);

          alertText = '✅ Cotización enviada en texto';
        } catch (err) {
          console.error('[Telegram API] Error enviando cotización en texto:', err);
          await sendMessage(chatId, '❌ Hubo un error enviando la cotización. Intenta de nuevo.');
          alertText = 'Error en Cotización';
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
      } else if (callbackData?.startsWith('DEL_FIN_')) {
        const recordId = callbackData.replace('DEL_FIN_', '');
        const replyMarkup = { inline_keyboard: [[ { text: '☠️ SÍ, ELIMINAR', callback_data: `CONFIRM_DEL_${recordId}` }, { text: '❌ No, conservar', callback_data: 'CANCEL' } ]] };
        await sendMessage(chatId, `🚧 <b>Cuidado Jefe</b>\n¿Estás totalmente seguro de eliminar el registro financiero #${recordId}? Esta acción es irreversible y afectará el balance de K&T.`, replyMarkup);
        alertText = 'Esperando confirmación';
      } else if (callbackData?.startsWith('CONFIRM_DEL_')) {
        const recordId = callbackData.replace('CONFIRM_DEL_', '');
        await sendMessage(chatId, `⏳ Eliminando...`);
        const { error: dbError } = await supabase.from('kt_finanzas').delete().eq('id', recordId);
        if (dbError) {
           await sendMessage(chatId, `❌ Error eliminando en Supabase: ${dbError.message}`);
           alertText = 'Error en DB';
        } else {
           await sendMessage(chatId, `🗑️ <b>Registro #${recordId} Eliminado</b> exitosamente de los libros de K&T.`);
           alertText = 'Eliminado';
        }
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
