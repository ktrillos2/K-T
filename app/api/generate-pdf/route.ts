import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { z } from 'zod';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Puppeteer requires Node.js runtime, not Edge

// 1. Validación estricta del entorno
const envSchema = z.object({
  TELEGRAM_WEBHOOK_SECRET: z.string().min(1, 'Falta TELEGRAM_WEBHOOK_SECRET'),
});

const env = envSchema.parse({
  TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET,
});

export async function POST(req: Request) {
  try {
    // 2. Autenticación estricta del Webhook
    const secretToken = req.headers.get('x-telegram-bot-api-secret-token');
    if (secretToken !== env.TELEGRAM_WEBHOOK_SECRET) {
      console.error('[Generate PDF] Token inválido o no proporcionado.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 3. Extracción de los datos del Payload
    const body = await req.json();
    const { cliente, valor, servicio, tipo } = body;

    if (!cliente || !valor || !servicio) {
      return NextResponse.json({ error: 'Faltan parámetros obligatorios (cliente, valor, servicio).' }, { status: 400 });
    }

    // 4. Determinar la URL Base (Ruta Oculta)
    // En Vercel, req.headers.get('host') nos da el dominio actual de producción o preview
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    
    // Construimos la URL con los *Search Params* para inyectar los datos a la ruta oculta
    const pdfUrl = new URL(`${protocol}://${host}/pdf-render`);
    pdfUrl.searchParams.append('cliente', cliente);
    pdfUrl.searchParams.append('valor', valor.toString());
    pdfUrl.searchParams.append('servicio', servicio);
    if (tipo) pdfUrl.searchParams.append('tipo', tipo);

    // 5. Configuración y Lanzamiento de Puppeteer (Optimizado para Vercel)
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(), // Sparticuz Chromium se encarga de descargar/brindar el binario válido para Serverless
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    
    // 6. Navegar a la Ruta Oculta y esperar que la red se estabilice
    // waitUntil: 'networkidle0' garantiza que las fuentes, el CSS de Tailwind y las imágenes (logofonedo.png, etc) carguen antes de tomar la foto.
    await page.goto(pdfUrl.toString(), {
      waitUntil: 'networkidle0',
      timeout: 15000,
    });

    // 7. Generar PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true, // Requerido para gráficas e imágenes de CSS (bg-*)
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    });

    await browser.close();

    // 8. Retornar el documento PDF como un Buffer listo para ser consumido
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="documento-k-and-t.pdf"',
      },
    });
  } catch (error) {
    console.error('[Generate PDF] Error interno en Puppeteer:', error);
    return NextResponse.json(
      { 
        error: 'Error interno en la generación de PDF',
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
