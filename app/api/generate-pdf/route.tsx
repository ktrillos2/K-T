import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { z } from 'zod';
import { KTDocumentNative } from '@/components/pdf/KTDocumentNative';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // @react-pdf/renderer requires Node limits

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

    // 4. Renderizar el PDF de manera nativa
    console.log('[Generate PDF] Iniciando renderToBuffer con @react-pdf/renderer...');
    
    // Aquí invocamos el componente estricto de React PDF
    const pdfBuffer = await renderToBuffer(
      <KTDocumentNative 
        cliente={cliente} 
        valor={valor} 
        servicio={servicio} 
        tipo={tipo || 'cotizacion'} 
      />
    );

    console.log(`[Generate PDF] Rendering finalizado. Tamaño: ${pdfBuffer.length} bytes`);

    // 5. Retornar el documento PDF como un Buffer
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="documento-k-and-t.pdf"',
      },
    });
  } catch (error) {
    console.error('[Generate PDF] Error interno en React PDF:', error);
    return NextResponse.json(
      { 
        error: 'Error interno en la generación de PDF nativa',
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
