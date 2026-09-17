import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { sendEmail, buildBrandedEmailHtml, escapeHtml, getNotificationRecipients } from '@/lib/email';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const project = formData.get('project') as string;
        const rating = parseInt(formData.get('rating') as string);
        const message = formData.get('message') as string;
        const role = formData.get('role') as string;
        const imageFile = formData.get('image') as File | null;

        if (!project || !rating || !message) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const token = process.env.SANITY_API_TOKEN;
        if (!token) {
            console.error('SANITY_API_TOKEN is not defined in the environment');
            return NextResponse.json({ success: false, error: 'Sanity API token is missing' }, { status: 500 });
        }

        // Configure write client with token
        const writeClient = createClient({
            projectId,
            dataset,
            apiVersion,
            useCdn: false, // We're writing, so no CDN
            token: token, // Required for write permissions
        });

        // 1. Upload Image to Sanity (if exists)
        let imageAssetId = null;
        if (imageFile) {
            // Validar límite máximo de subida a 5MB
            if (imageFile.size > 5 * 1024 * 1024) {
                return NextResponse.json(
                    { success: false, error: 'El archivo de imagen no debe superar los 5MB' },
                    { status: 400 }
                );
            }

            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const asset = await writeClient.assets.upload('image', buffer, {
                filename: imageFile.name,
                contentType: imageFile.type,
            });
            imageAssetId = asset._id;
        }

        // 2. Create Testimonial in Sanity (Pending)
        const doc = {
            _type: 'testimonial',
            name: formData.get('name') as string,
            project,
            rating,
            content: message,
            role,
            status: 'pending',
            image: imageAssetId ? {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imageAssetId,
                },
            } : undefined,
        };

        await writeClient.create(doc);

        // 3. Send Email Notification
        const senderName = (formData.get('name') as string) || 'Cliente Verificado';
        const starsText = "★".repeat(Math.max(1, Math.min(5, rating))) + "☆".repeat(Math.max(0, 5 - rating));

        const contentHtml = `
          <div class="field-card">
            <span class="field-label">Proyecto Asociado</span>
            <div class="field-value" style="font-weight:700;color:#ffffff;">${escapeHtml(project)}</div>
          </div>

          <div class="field-card">
            <span class="field-label">Cliente / Autor</span>
            <div class="field-value">${escapeHtml(senderName)} <span style="color:#a1a1aa;font-size:13px;">(${escapeHtml(role || 'Sin cargo')})</span></div>
          </div>

          <div class="field-card">
            <span class="field-label">Calificación</span>
            <div class="field-value" style="color:#fbbf24;font-size:18px;letter-spacing:2px;">
              ${starsText} <span style="color:#a1a1aa;font-size:13px;margin-left:8px;">(${rating} / 5)</span>
            </div>
          </div>

          <div class="field-card">
            <span class="field-label">Mensaje del Testimonio</span>
            <div class="message-box">${escapeHtml(message)}</div>
          </div>
        `;

        const html = buildBrandedEmailHtml({
          badge: "Nuevo Testimonio",
          title: `Testimonio Recibido — ${project}`,
          subtitle: `Enviado por ${senderName}`,
          contentHtml,
          footerNote: "El testimonio queda en estado Pendiente. Ingresa a Sanity Studio para aprobarlo y publicarlo.",
        });

        // Don't block response on email sending error, but send notification
        try {
          await sendEmail({
            from: "K&T Code <no-reply@kytcode.lat>",
            to: getNotificationRecipients(),
            subject: `⭐ Nuevo Testimonio Recibido - ${project} (${rating}/5)`,
            html,
          });
        } catch (emailError) {
          console.error('Error sending notification email:', emailError);
        }

        return NextResponse.json({ success: true, message: 'Testimonial submitted successfully' });

    } catch (error) {
        console.error('Error processing testimonial:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
