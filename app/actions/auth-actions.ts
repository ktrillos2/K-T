'use server';

import * as TOTP from 'otpauth';

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';
const CR_SECRET_KEY = process.env.CR_SECRET_KEY || '';
const AUTH_SECRET = process.env.AUTH_SECRET || 'secret'; // Used for TOTP generation

export async function sendOTP(email: string) {
    // 1. Validate Email (Simple check against env for now)
    if (email !== process.env.ADMIN_USER) {
        // Return success even if failed to prevent user enumeration
        return { success: true, message: 'Si el correo es válido, recibirás un código.' };
    }

    // 2. Generate OTP
    // We use a TOTP allowing a window of time.
    const totp = new TOTP.TOTP({
        issuer: 'KT_Agency',
        label: 'K&T CRM',
        algorithm: 'SHA1',
        digits: 6,
        period: 300, // 5 minutes validity
        secret: TOTP.Secret.fromUTF8(AUTH_SECRET)
    });

    const code = totp.generate();

    // 3. Send via Google Apps Script
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'send_email',
                key: CR_SECRET_KEY,
                email: email,
                subject: 'Tu Código de Acceso CRM - K&T',
                body: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                        <h2>Código de Verificación</h2>
                        <p>Usa el siguiente código para iniciar sesión en K&T CRM:</p>
                        <h1 style="color: #000; letter-spacing: 5px; background: #f0f0f0; padding: 10px; display: inline-block;">${code}</h1>
                        <p>Este código es válido por 5 minutos.</p>
                       </div>`
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // Don't leak GAS errors, just return generic success
        return { success: true };

    } catch (error) {
        console.error('Error sending OTP:', error);
        return { success: false, error: 'Error al enviar el correo.' };
    }
}
