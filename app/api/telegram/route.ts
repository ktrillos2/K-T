import { NextResponse } from 'next/server';
import { z } from 'zod';
import Groq from 'groq-sdk';

// ==========================================
// 1. VALIDACIÓN DE ENTORNO (Zod)
// ==========================================
// Aseguramos de que el servidor no arranque o la API falle temprano si faltan variables.
const envSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().min(1, 'Falta TELEGRAM_BOT_TOKEN'),
  TELEGRAM_WEBHOOK_SECRET: z.string().min(1, 'Falta TELEGRAM_WEBHOOK_SECRET'),
  ALLOWED_TELEGRAM_USER_ID: z.string().min(1, 'Falta ALLOWED_TELEGRAM_USER_ID'),
  GROQ_API_KEY: z.string().min(1, 'Falta GROQ_API_KEY'),
});

const env = envSchema.parse({
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET,
  ALLOWED_TELEGRAM_USER_ID: process.env.ALLOWED_TELEGRAM_USER_ID,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
});

const groq = new Groq({ apiKey: env.GROQ_API_KEY });

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

async function extractDataWithGroq(prompt: string) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Eres el asistente financiero de la agencia digital K&T. Tu única tarea es extraer datos de un mensaje para generar una cotización. Responde ÚNICAMENTE con un JSON válido que contenga la siguiente estructura exacta: {\"cliente\": \"Nombre de la empresa o persona\", \"valor\": 0, \"servicio\": \"Breve descripción del servicio\"}. El valor debe ser un número entero (solo números, sin símbolos de dólar ni comas)."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || "{}";
    const data = JSON.parse(responseContent);

    // Basic validation to ensure the required fields are present
    return {
      cliente: data.cliente || "Cliente Desconocido",
      valor: Number(data.valor) || 0,
      servicio: data.servicio || "Servicio no especificado"
    };
  } catch (error) {
    console.error("[Groq Extraction Error]:", error);
    // Retorno por defecto para evitar que el bot de Telegram se caiga
    return {
      cliente: "Error en extracción (revisar manual)",
      valor: 0,
      servicio: "Error en extracción (revisar manual)"
    };
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
      const lowerText = text.toLowerCase();

      // Trigger para Cotizaciones
      if (lowerText.startsWith('/cotizacion') || lowerText.includes('cotizar')) {
        // Ejecutamos la IA para extraer la metadata
        const data = await extractDataWithGroq(text);

        // Armamos el Inline Keyboard
        const replyMarkup = {
          inline_keyboard: [
            [
              { text: '✅ Generar Documento', callback_data: `GEN_COT_${data.valor}` },
              { text: '❌ Cancelar', callback_data: 'CANCEL' }
            ]
          ]
        };

        const msgText = `🤖 <b>K&T IA Analysis:</b>\nHe extraído los siguientes datos para la cotización:\n\n👤 <b>Cliente:</b> ${data.cliente}\n🛠 <b>Servicio:</b> ${data.servicio}\n💰 <b>Valor:</b> $${data.valor}\n\n¿Deseas generar el PDF de la cotización?`;
        await sendMessage(chatId, msgText, replyMarkup);
      } 
      // Comandos por defecto
      else {
        await sendMessage(chatId, 'Hola equipo K&T. Usa el comando <code>/cotizacion [Detalles]</code> para preparar un documento.');
      }
    }

    // 5.5. FLUJO INTERACTIVO (CALLBACK QUERIES)
    if (update.callback_query) {
      const callbackData = update.callback_query.data;
      const callbackId = update.callback_query.id;

      let alertText = '';

      if (callbackData?.startsWith('GEN_COT_')) {
        const valor = callbackData.replace('GEN_COT_', '');
        await sendMessage(chatId, `⏳ Generando PDF de cotización por $${valor}...\n<i>Nota: Incluyendo directrices de K&T (Vercel, SEO, Garantía).</i>`);
        
        // Aquí llamarías a un servicio para convertir las plantillas de HTML a PDF
        // e.g. generatePdf(getCotizacionTemplate(...))
        alertText = 'Generando documento...';
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
