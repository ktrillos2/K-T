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

const TELEGRAM_API_URL = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}`;

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
      Eres el asistente ejecutivo y financiero de la agencia digital K&T (Vercel, Tailwind, Next.js).
      El usuario es tu jefe. Él te hablará para hacer UNA de dos cosas:
      1) Pedirte que generes una cotización/documento para un cliente.
      2) Pedirte que registres un ingreso o un gasto en las finanzas de la agencia.

      Si es una COTIZACIÓN, extrae y devuelve exactamente la siguiente estructura JSON:
      {
        "intent": "cotizacion",
        "cliente": "Nombre Empresa/Persona",
        "valor": 0,
        "servicio": "Breve resumen del servicio web/software"
      }

      Si es una FINANZA (Gasto o Ingreso), extrae y devuelve exactamente la siguiente estructura JSON:
      {
        "intent": "finanza",
        "tipo": "ingreso" | "gasto", 
        "monto": 0,
        "concepto": "Descripción corta de qué fue este movimiento"
      }

      Recuerda: valor y monto deben ser NÚMEROS (sin signos, sin comas, e.g., 500000). Responde ÚNICAMENTE EN JSON válido.
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
      
      // Solo processamos si no es comando o si es un texto normal
      if (text.startsWith('/start')) {
        await sendMessage(chatId, 'Hola equipo K&T. Envíame datos para generar una "Cotización" o registrar un "Gasto/Ingreso" (ej: "Registra un ingreso de 500000 por pago de la web").');
      } else {
        await sendMessage(chatId, '🧠 Analizando mensaje con K&T AI...');
        const data = await analyzeTelegramMessage(text);

        if (data.intent === 'cotizacion') {
          // Armamos el Inline Keyboard
          const replyMarkup = {
            inline_keyboard: [
              [
                { text: '✅ Generar Documento', callback_data: `GEN_COT` },
                { text: '❌ Cancelar', callback_data: 'CANCEL' }
              ]
            ]
          };

          const msgText = `🤖 <b>K&T IA Analysis (Cotización):</b>\nHe extraído los datos:\n\n👤 <b>Cliente:</b> ${data.cliente}\n🛠 <b>Servicio:</b> ${data.servicio}\n💰 <b>Valor:</b> $${data.valor}\n\n¿Deseas generar el PDF?`;
          await sendMessage(chatId, msgText, replyMarkup);
        } else if (data.intent === 'finanza') {
          // Guardar en la base de datos de Supabase, tabla "kt_finanzas"
          const { error: dbError } = await supabase
            .from('kt_finanzas')
            .insert([
              { 
                tipo: data.tipo, 
                monto: data.monto, 
                concepto: data.concepto,
                fecha: new Date().toISOString()
              }
            ]);

          if (dbError) {
            console.error('[Supabase Error]:', dbError);
            await sendMessage(chatId, `❌ Error al guardar en Supabase: ${dbError.message}`);
          } else {
            const emoji = data.tipo === 'ingreso' ? '📈' : '📉';
            await sendMessage(chatId, `✅ <b>Finanza Registrada:</b>\n${emoji} <b>Tipo:</b> ${data.tipo.toUpperCase()}\n💸 <b>Monto:</b> $${data.monto.toLocaleString('es-CO')}\n📝 <b>Concepto:</b> ${data.concepto}`);
          }
        } else {
          await sendMessage(chatId, '🤔 No entendí el mensaje. Asegúrate de pedir "Crear cotización" o "Registrar gasto/ingreso".');
        }
      }
    }

    // 5.5. FLUJO INTERACTIVO (CALLBACK QUERIES)
    if (update.callback_query) {
      const callbackData = update.callback_query.data;
      const callbackId = update.callback_query.id;

      let alertText = '';

      if (callbackData?.startsWith('GEN_COT')) {
        await sendMessage(chatId, `⏳ Generando PDF de cotización... \n<i>Nota: Incluyendo directrices de K&T. Este proceso puede tardar unos segundos.</i>`);
        
        // 1. Extraer los datos del texto del mensaje original
        const originalText = update.callback_query.message?.text || '';
        const clienteMatch = originalText.match(/Cliente:\s*(.+)/);
        const servicioMatch = originalText.match(/Servicio:\s*(.+)/);
        const valorMatch = originalText.match(/Valor:\s*\$([0-9,.]+)/);

        const cliente = clienteMatch ? clienteMatch[1].trim() : 'Cliente';
        const servicio = servicioMatch ? servicioMatch[1].trim() : 'Servicio Web';
        const valor = valorMatch ? valorMatch[1].replace(/,/g, '').trim() : '0';

        // 2. Llamar a la propia API de Puppeteer (asegurándonos de usar el secret)
        try {
          const host = req.headers.get('host') || 'localhost:3000';
          const protocol = host.includes('localhost') ? 'http' : 'https';
          
          const pdfResponse = await fetch(`${protocol}://${host}/api/generate-pdf`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-telegram-bot-api-secret-token': env.TELEGRAM_WEBHOOK_SECRET
            },
            body: JSON.stringify({
              tipo: 'cotizacion',
              cliente,
              servicio,
              valor
            })
          });

          if (!pdfResponse.ok) {
            throw new Error(`Error desde PDF API: ${pdfResponse.status}`);
          }

          const pdfBuffer = await pdfResponse.arrayBuffer();

          // 3. Enviar el Documento(Buffer) por Telegram Form Data
          const formData = new FormData();
          formData.append('chat_id', chatId.toString());
          const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
          formData.append('document', blob, `Cotizacion_KT_${cliente.replace(/\s+/g, '_')}.pdf`);
          formData.append('caption', '✅ Aquí tienes tu archivo PDF listo y optimizado para K&T.');

          await fetch(`${TELEGRAM_API_URL}/sendDocument`, {
            method: 'POST',
            body: formData
          });

          alertText = 'PDF Generado y Enviado!';
        } catch (pdfErr) {
          console.error('[Telegram API] Error conectando a generate-pdf:', pdfErr);
          await sendMessage(chatId, '❌ Hubo un error procesando el PDF en Vercel. Intenta de nuevo.');
          alertText = 'Error en PDF';
        }
      } else if (callbackData === 'CANCEL') {
        await sendMessage(chatId, '❌ <b>Acción cancelada</b> por K&T Admin.');
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
