import { NextResponse } from 'next/server';
import { z } from 'zod';
import Groq from 'groq-sdk';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import * as XLSX from 'xlsx';

export const runtime = 'nodejs';

// ==========================================
// 1. VALIDACIÓN DE ENTORNO (Zod)
// ==========================================
const envSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().min(1, 'Falta TELEGRAM_BOT_TOKEN'),
  TELEGRAM_WEBHOOK_SECRET: z.string().min(1, 'Falta TELEGRAM_WEBHOOK_SECRET'),
  ALLOWED_TELEGRAM_USER_IDS: z.string().min(1, 'Falta ALLOWED_TELEGRAM_USER_IDS'),
  GROQ_API_KEY: z.string().min(1, 'Falta GROQ_API_KEY'),
  GEMINI_API_KEY: z.string().optional(),
  EMAIL_IMAP_HOST: z.string().optional(),
  EMAIL_IMAP_PORT: z.string().optional(),
  EMAIL_IMAP_USER: z.string().optional(),
  EMAIL_IMAP_PASSWORD: z.string().optional(),
  EMAIL_IMAP_TLS: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Falta Service Role de Supabase'),
});

const env = envSchema.parse({
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET,
  ALLOWED_TELEGRAM_USER_IDS: process.env.ALLOWED_TELEGRAM_USER_IDS,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  EMAIL_IMAP_HOST: process.env.EMAIL_IMAP_HOST,
  EMAIL_IMAP_PORT: process.env.EMAIL_IMAP_PORT,
  EMAIL_IMAP_USER: process.env.EMAIL_IMAP_USER,
  EMAIL_IMAP_PASSWORD: process.env.EMAIL_IMAP_PASSWORD,
  EMAIL_IMAP_TLS: process.env.EMAIL_IMAP_TLS,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
});

const groq = new Groq({ apiKey: env.GROQ_API_KEY });
const geminiKey = env.GEMINI_API_KEY?.replace(/^"|"$/g, '').replace(/^'|'$/g, '').trim();
const gemini = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const botToken = env.TELEGRAM_BOT_TOKEN.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
const TELEGRAM_API_URL = `https://api.telegram.org/bot${botToken}`;
const PENDING_TYPES = ['pendiente_ingreso', 'pendiente_gasto'] as const;

type PendingType = (typeof PENDING_TYPES)[number];
type FinanceBaseType = 'ingreso' | 'gasto';

interface FinanceSuggestion {
  tipo: FinanceBaseType;
  monto: number;
  concepto: string;
  origen: 'IMAGEN' | 'CORREO';
}

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
  caption?: string;
  photo?: TelegramPhotoSize[];
  document?: TelegramDocument;
}

interface TelegramPhotoSize {
  file_id: string;
  width: number;
  height: number;
  file_size?: number;
}

interface TelegramDocument {
  file_id: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
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

async function sendDocument(chatId: number, fileName: string, fileBuffer: Buffer, caption?: string) {
  const binary = new Uint8Array(fileBuffer);
  const formData = new FormData();
  formData.append('chat_id', String(chatId));
  if (caption) formData.append('caption', caption);
  formData.append(
    'document',
    new Blob([
      binary,
    ], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }),
    fileName,
  );

  await fetch(`${TELEGRAM_API_URL}/sendDocument`, {
    method: 'POST',
    body: formData,
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

function sanitizeColumnName(input: unknown): string | null {
  if (!input || typeof input !== 'string') return null;
  const normalized = input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');

  if (!/^[a-z_][a-z0-9_]*$/.test(normalized)) return null;
  return normalized;
}

function normalizeSqlType(input: unknown): string {
  if (!input || typeof input !== 'string') return 'text';
  const value = input.trim().toLowerCase();

  const fixedAllowed = new Set([
    'text',
    'integer',
    'bigint',
    'numeric',
    'boolean',
    'date',
    'timestamp',
    'timestamptz',
    'jsonb',
    'uuid',
  ]);

  if (fixedAllowed.has(value)) return value;
  if (/^varchar\((\d{1,5})\)$/.test(value)) return value;
  if (/^numeric\((\d{1,5}),(\d{1,5})\)$/.test(value)) return value;

  return 'text';
}

function parseMoneyValue(raw: unknown): number {
  const amount = Number(raw);
  return Number.isFinite(amount) ? amount : 0;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function normalizeAmount(raw: unknown): number {
  if (typeof raw === 'number' && Number.isFinite(raw)) return raw;
  if (typeof raw === 'string') {
    const cleaned = raw
      .trim()
      .replace(/[^0-9,.-]/g, '')
      .replace(/\./g, '')
      .replace(',', '.');
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function stripPendingMarkers(concepto: string): string {
  return concepto
    .replace(/^\[PENDIENTE_[A-Z]+\]\s*/i, '')
    .replace(/^\[EMAIL_UID:[^\]]+\]\s*/i, '')
    .trim();
}

function isValidFinanceBaseType(input: unknown): input is FinanceBaseType {
  return input === 'ingreso' || input === 'gasto';
}

function inferMimeType(filePath: string, fallbackHeader?: string | null): string {
  const lower = filePath.toLowerCase();
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.gif')) return 'image/gif';
  return fallbackHeader || 'image/jpeg';
}

async function fetchTelegramFileBuffer(fileId: string): Promise<{ buffer: Buffer; mimeType: string }> {
  const fileMetaResponse = await fetch(`${TELEGRAM_API_URL}/getFile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file_id: fileId }),
  });
  const fileMeta = await fileMetaResponse.json() as { ok?: boolean; result?: { file_path?: string } };

  if (!fileMeta.ok || !fileMeta.result?.file_path) {
    throw new Error('No se pudo obtener la ruta del archivo en Telegram.');
  }

  const filePath = fileMeta.result.file_path;
  const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;
  const binaryResponse = await fetch(fileUrl);

  if (!binaryResponse.ok) {
    throw new Error(`Error descargando archivo de Telegram: ${binaryResponse.status}`);
  }

  const mimeType = inferMimeType(filePath, binaryResponse.headers.get('content-type'));
  const arrayBuffer = await binaryResponse.arrayBuffer();
  return { buffer: Buffer.from(arrayBuffer), mimeType };
}

async function savePendingFinanceSuggestion(suggestion: FinanceSuggestion) {
  const pendingType: PendingType = suggestion.tipo === 'ingreso' ? 'pendiente_ingreso' : 'pendiente_gasto';
  const concepto = `[PENDIENTE_${suggestion.origen}] ${suggestion.concepto}`;

  const { data, error } = await supabase
    .from('kt_finanzas')
    .insert([{ tipo: pendingType, monto: suggestion.monto, concepto, fecha: new Date().toISOString() }])
    .select('id,tipo,monto,concepto,fecha')
    .single();

  if (error) throw error;
  return data;
}

async function sendPendingFinanceReminders(chatId: number, limit = 5): Promise<number> {
  const { data: pending, error } = await supabase
    .from('kt_finanzas')
    .select('id,tipo,monto,concepto,fecha')
    .in('tipo', [...PENDING_TYPES])
    .order('fecha', { ascending: false })
    .limit(limit);

  if (error || !pending || pending.length === 0) return 0;

  const lines = pending.map((item, idx) => {
    const tipo = item.tipo === 'pendiente_ingreso' ? 'Ingreso' : 'Gasto';
    const monto = Number(item.monto || 0).toLocaleString('es-CO');
    const concepto = escapeHtml(stripPendingMarkers(String(item.concepto || 'Sin concepto')));
    return `${idx + 1}. ${tipo} | $${monto} | ${concepto}`;
  });

  const inline_keyboard = pending.flatMap((item, idx) => {
    const tipo = item.tipo === 'pendiente_ingreso' ? 'Ingreso' : 'Gasto';
    return [[
      { text: `✅ Guardar #${idx + 1} (${tipo})`, callback_data: `CONFIRM_PEND_${item.id}` },
      { text: `🗑️ Descartar #${idx + 1}`, callback_data: `DISMISS_PEND_${item.id}` },
    ]];
  });

  await sendMessage(
    chatId,
    `🧠 <b>Recordatorio de Movimientos Pendientes</b>\n\nEncontré ${pending.length} sugerencias por confirmar:\n${lines.join('\n')}\n\n¿Deseas guardar o descartar alguno?`,
    { inline_keyboard },
  );

  return pending.length;
}

async function analyzeImageWithGemini(imageBuffer: Buffer, mimeType: string, caption?: string) {
  if (!gemini) {
    return { intent: 'desconocido', resumen: 'GEMINI_API_KEY no está configurada.' };
  }

  const model = gemini.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
  const prompt = `Analiza esta imagen (factura, cuenta de cobro, cotización, comprobante o recibo) y responde SOLO un JSON válido con la estructura:
  {
    "intent": "finanza_registro|cotizacion|cuenta_cobro|desconocido",
    "tipo": "ingreso|gasto|desconocido",
    "monto": 0,
    "cliente": "",
    "servicio": "",
    "concepto": "",
    "resumen": "",
    "confianza": 0
  }

  Reglas:
  - Si es comprobante de pago recibido por K&T, clasifícalo como ingreso.
  - Si es factura de proveedor o pago hecho por K&T, clasifícalo como gasto.
  - Si es una cotización, usa intent=cotizacion.
  - Si es cuenta de cobro, usa intent=cuenta_cobro.
  - Si no se entiende, usa intent=desconocido.
  - monto debe ser numérico sin símbolo.
  - concepto y resumen deben ser cortos y claros en español.
  - Contexto adicional de caption: ${caption || 'Sin caption'}`;

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType,
        data: imageBuffer.toString('base64'),
      },
    },
    { text: prompt },
  ]);

  const raw = result.response.text();
  const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();

  try {
    const parsed = JSON.parse(cleaned) as Record<string, unknown>;
    return {
      intent: typeof parsed.intent === 'string' ? parsed.intent : 'desconocido',
      tipo: typeof parsed.tipo === 'string' ? parsed.tipo : 'desconocido',
      monto: normalizeAmount(parsed.monto),
      cliente: typeof parsed.cliente === 'string' ? parsed.cliente : '',
      servicio: typeof parsed.servicio === 'string' ? parsed.servicio : '',
      concepto: typeof parsed.concepto === 'string' ? parsed.concepto : '',
      resumen: typeof parsed.resumen === 'string' ? parsed.resumen : '',
      confianza: typeof parsed.confianza === 'number' ? parsed.confianza : 0,
    };
  } catch {
    return { intent: 'desconocido', tipo: 'desconocido', monto: 0, concepto: '', servicio: '', cliente: '', resumen: cleaned, confianza: 0 };
  }
}

async function analyzeEmailForFinance(subject: string, from: string, body: string) {
  const system = `Eres un clasificador financiero de K&T. Debes responder SOLO JSON con este formato:
  {
    "tipo": "ingreso|gasto|otro",
    "monto": 0,
    "concepto": "",
    "confianza": 0
  }

  Reglas:
  - ingreso: dinero que entra a K&T.
  - gasto: dinero que sale de K&T.
  - otro: si no es movimiento financiero claro.
  - monto numérico sin símbolos, 0 si no se detecta.
  - concepto en una sola frase corta.
  - confianza entre 0 y 1.`;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: `From: ${from}\nSubject: ${subject}\nBody: ${body.slice(0, 6000)}` },
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0,
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0]?.message?.content || '{}';
  const parsed = JSON.parse(content) as Record<string, unknown>;
  const tipoRaw = String(parsed.tipo || 'otro').toLowerCase();
  const tipo = tipoRaw === 'ingreso' || tipoRaw === 'gasto' ? tipoRaw : 'otro';
  return {
    tipo,
    monto: normalizeAmount(parsed.monto),
    concepto: typeof parsed.concepto === 'string' ? parsed.concepto.trim() : '',
    confianza: typeof parsed.confianza === 'number' ? parsed.confianza : 0,
  };
}

function emailSyncConfigured(): boolean {
  return Boolean(env.EMAIL_IMAP_HOST && env.EMAIL_IMAP_USER && env.EMAIL_IMAP_PASSWORD);
}

async function syncEmailInboxToPending() {
  if (!emailSyncConfigured()) {
    return { enabled: false, reviewed: 0, queued: 0, skipped: 0 };
  }

  const host = env.EMAIL_IMAP_HOST!.replace(/^"|"$/g, '').replace(/^'|'$/g, '').trim();
  const user = env.EMAIL_IMAP_USER!.replace(/^"|"$/g, '').replace(/^'|'$/g, '').trim();
  const pass = env.EMAIL_IMAP_PASSWORD!.replace(/^"|"$/g, '').replace(/^'|'$/g, '').trim();
  const port = Number((env.EMAIL_IMAP_PORT || '993').replace(/^"|"$/g, '').replace(/^'|'$/g, '').trim());
  const secure = String(env.EMAIL_IMAP_TLS || 'true').toLowerCase() !== 'false';

  const client = new ImapFlow({
    host,
    port: Number.isFinite(port) ? port : 993,
    secure,
    auth: { user, pass },
  });

  let reviewed = 0;
  let queued = 0;
  let skipped = 0;

  try {
    await client.connect();
    const lock = await client.getMailboxLock('INBOX');

    try {
      await client.mailboxOpen('INBOX');
      const unseenUids = await client.search({ seen: false });
      const uidCandidates: number[] = Array.isArray(unseenUids) ? unseenUids : [];
      const targetUids = uidCandidates.slice(-15);

      for await (const msg of client.fetch(targetUids, { uid: true, envelope: true, source: true })) {
        reviewed += 1;
        const uid = Number(msg.uid || 0);
        const marker = `[EMAIL_UID:${uid}]`;

        const { data: already } = await supabase
          .from('kt_finanzas')
          .select('id')
          .ilike('concepto', `%${marker}%`)
          .limit(1);

        if (already && already.length > 0) {
          skipped += 1;
          continue;
        }

        const parsedMail = await simpleParser(msg.source as Buffer);
        const from = parsedMail.from?.text || msg.envelope?.from?.map((a) => a.address || a.name || '').join(', ') || 'Desconocido';
        const subject = parsedMail.subject || msg.envelope?.subject || 'Sin asunto';
        const body = (parsedMail.text || '').trim();

        if (!body) {
          skipped += 1;
          continue;
        }

        const analysis = await analyzeEmailForFinance(subject, from, body);
        if (!isValidFinanceBaseType(analysis.tipo) || analysis.confianza < 0.45) {
          skipped += 1;
          continue;
        }

        const monto = analysis.monto > 0 ? analysis.monto : 0;
        const conceptoBase = analysis.concepto || `${subject} (${from})`;
        await savePendingFinanceSuggestion({
          tipo: analysis.tipo,
          monto,
          concepto: `${marker} ${conceptoBase}`,
          origen: 'CORREO',
        });
        queued += 1;
      }
    } finally {
      lock.release();
    }
  } finally {
    try {
      await client.logout();
    } catch {
      // noop
    }
  }

  return { enabled: true, reviewed, queued, skipped };
}

async function buildFinanzasWorkbook(records: any[]): Promise<Buffer> {
  const workbook = XLSX.utils.book_new();
  let ingresos = 0;
  let gastos = 0;

  const movimientosRows = records.map((record, index) => {
    const tipoRaw = String(record.tipo || '').toLowerCase();
    const tipo = tipoRaw === 'ingreso' ? 'INGRESO' : tipoRaw === 'gasto' ? 'GASTO' : 'OTRO';
    const monto = parseMoneyValue(record.monto);
    const neto = tipo === 'GASTO' ? -monto : monto;
    const rawFecha = record.fecha || record.created_at || null;
    const fechaObj = rawFecha ? new Date(rawFecha) : null;
    const fecha = fechaObj && !Number.isNaN(fechaObj.getTime())
      ? fechaObj.toLocaleString('es-CO')
      : String(rawFecha || '');

    if (tipo === 'INGRESO') ingresos += monto;
    if (tipo === 'GASTO') gastos += monto;

    return {
      '#': index + 1,
      ID: record.id ?? '',
      Fecha: fecha,
      Tipo: tipo,
      Concepto: record.concepto || '',
      'Monto (COP)': monto,
      'Monto Neto (COP)': neto,
    };
  });

  const balance = ingresos - gastos;
  const resumenRows = [
    { Indicador: 'Registros exportados', Valor: records.length },
    { Indicador: 'Total ingresos (COP)', Valor: ingresos },
    { Indicador: 'Total gastos (COP)', Valor: gastos },
    { Indicador: 'Balance neto (COP)', Valor: balance },
    { Indicador: 'Fecha de exportación', Valor: new Date().toLocaleString('es-CO') },
  ];

  const movimientosSheet = XLSX.utils.json_to_sheet(movimientosRows);
  movimientosSheet['!cols'] = [
    { wch: 6 },
    { wch: 10 },
    { wch: 22 },
    { wch: 14 },
    { wch: 56 },
    { wch: 20 },
    { wch: 20 },
  ];

  const resumenSheet = XLSX.utils.json_to_sheet(resumenRows);
  resumenSheet['!cols'] = [{ wch: 42 }, { wch: 24 }];

  XLSX.utils.book_append_sheet(workbook, movimientosSheet, 'Movimientos');
  XLSX.utils.book_append_sheet(workbook, resumenSheet, 'Resumen');

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  return Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
}

async function analyzeTelegramMessage(prompt: string, userId: string = '', userContext: string = '', chatHistory: any[] = []) {
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
      { "intent": "cotizacion", "respuesta": "Claro jefe, he preparado los datos de la cotización. Revísalos antes de enviarla en texto:", "cliente": "Nombre", "valor": 0, "servicio": "Resumen técnico; Hosting en Vercel; SEO Técnico; Límite de Sanity..." }
      
      2. Si pide generar CUENTA DE COBRO:
      { "intent": "cuenta_cobro", "respuesta": "Excelente, aquí tienes el desglose para cobrar. Confírmame.", "cliente": "Nombre", "valor": 0, "servicio": "Detalle del cobro" }

      3. Si el usuario reporta un INGRESO o GASTO:
      { "intent": "finanza_registro", "respuesta": "¿Estás de acuerdo en registrar esto en los libros jefe?", "tipo": "ingreso" o "gasto", "monto": 0, "concepto": "Motivo del pago" }

      4. Si el usuario pregunta por ESTADO financiero, resumen o balances:
      { "intent": "finanza_resumen", "respuesta": "Entendido jefe, aquí tienes tus números:" }

      5. Si el usuario pide ELIMINAR O BORRAR un registro financiero (por monto o concepto):
      { "intent": "finanza_buscar_eliminar", "respuesta": "Buscando esos registros para eliminar...", "busqueda": "Monto o palabra clave a buscar" }

      6. Si el usuario pide EXPORTAR finanzas a Excel (xlsx), descargar informe, reporte para contabilidad o archivo de movimientos:
      { "intent": "finanza_exportar_excel", "respuesta": "Listo jefe, preparo el Excel con todos los movimientos para exportarlo." }

      7. Si el usuario pide AGREGAR/CREAR una nueva columna en la tabla de finanzas, o si detectas que sería útil proponer una nueva columna:
      { "intent": "finanza_propuesta_columna", "respuesta": "Antes de tocar estructura, te pido autorización.", "columna": "nombre_columna", "tipo_sql": "text", "motivo": "Razón de negocio" }

      8. Chatter general, inversión:
      { "intent": "chat", "respuesta": "Tu respuesta amistosa que respete la memoria del usuario." }

      REGLA CRÍTICA DE SEGURIDAD DE DATOS:
      - JAMÁS asumas que puedes alterar el esquema de la base de datos automáticamente.
      - Si se necesita una columna nueva, SIEMPRE pide autorización explícita del jefe primero.
      ${memoryInstruction}
`;

    const messagesArray = [
      { role: "system", content: systemPrompt },
      ...chatHistory,
      { role: "user", content: prompt }
    ];
    // Cast strict a cualquier tipo válido de Groq para evitar errores de type:
    const chatCompletion = await groq.chat.completions.create({
      messages: messagesArray as any,
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

        // Extraer Memoria del Usuario
        const fromIdStr = update.message?.from?.id.toString() || update.callback_query?.from.id.toString() || '';
        let userContext = '';
        let chatHistory: any[] = [];
        if (fromIdStr) {
          const { data: memData } = await supabase.from('telegram_users_memory').select('general_context, chat_history').eq('user_id', fromIdStr).single();
          userContext = memData?.general_context || '';
          if (memData?.chat_history && Array.isArray(memData.chat_history)) {
             chatHistory = memData.chat_history;
          }
        }

        const data = await analyzeTelegramMessage(text, fromIdStr, userContext, chatHistory);

        // Actualizar chat history local y truncarlo para evitar saturar tokens
        chatHistory.push({ role: 'user', content: text });
        let expectedAssistantResponse = data.respuesta || '';
        if (expectedAssistantResponse) {
           chatHistory.push({ role: 'assistant', content: expectedAssistantResponse });
        }
        if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

        // Mantener también la lógica de nuevo aprendizaje:
        const appendedContext = (data.nuevo_aprendizaje && fromIdStr)
             ? (userContext ? `${userContext}\n- ${data.nuevo_aprendizaje}` : `- ${data.nuevo_aprendizaje}`)
             : userContext;
        
        if (fromIdStr) {
          await supabase.from('telegram_users_memory').upsert({
            user_id: fromIdStr,
            first_name: update.message?.from?.first_name || update.callback_query?.from.first_name || '',
            username: update.message?.from?.username || update.callback_query?.from.username || '',
            general_context: appendedContext,
            chat_history: chatHistory,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });
          if (data.nuevo_aprendizaje) {
             console.log(`[K&T Bot] Nuevo aprendizaje guardado: ${data.nuevo_aprendizaje}`);
          }
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
