import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import nodemailer from 'nodemailer';

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

        // Configure write client with token
        const writeClient = createClient({
            projectId,
            dataset,
            apiVersion,
            useCdn: false, // We're writing, so no CDN
            token: process.env.SANITY_API_TOKEN, // Required for write permissions
        });

        // 1. Upload Image to Sanity (if exists)
        let imageAssetId = null;
        if (imageFile) {
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
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            secure: false,
            auth: {
                user: "9e752d001@smtp-brevo.com",
                pass: "6rRVAHNgq9aXBhPs",
            },
        });

        const mailOptions = {
            from: '"K&T System" <info@kytcode.lat>',
            to: "contactoktweb@gmail.com",
            subject: `Nuevo Testimonio Recibido - ${project}`,
            html: `
                <h2>Nuevo Testimonio para ${project}</h2>
                <p><strong>De:</strong> ${formData.get('name') as string}</p>
                <p><strong>Calificación:</strong> ${rating} / 5</p>
                <p><strong>Cargo:</strong> ${role}</p>
                <p><strong>Mensaje:</strong></p>
                <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #333;">
                    ${message}
                </blockquote>
                <p style="margin-top: 20px;">
                    Este testimonio está en estado <strong>Pendiente</strong>. 
                    Ingresa a Sanity Studio para aprobarlo o rechazarlo.
                </p>
            `,
        };

        // Don't block response on email sending error, but try to send
        try {
            await transporter.sendMail(mailOptions);
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
