import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import * as TOTP from 'otpauth';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), otp: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, otp } = parsedCredentials.data;

                    // 1. Check User
                    if (email !== process.env.ADMIN_USER) return null;

                    // 2. Verify OTP
                    // We use the same secret that is used to generate the code in the server action
                    const totp = new TOTP.TOTP({
                        issuer: 'KT_Agency',
                        label: 'K&T CRM',
                        algorithm: 'SHA1',
                        digits: 6,
                        period: 300, // 5 minutes validity
                        secret: TOTP.Secret.fromUTF8(process.env.AUTH_SECRET || 'secret')
                    });

                    // Validate delta: returns null if invalid
                    const delta = totp.validate({ token: otp, window: 1 });

                    if (delta !== null) {
                        return {
                            id: '1',
                            name: 'Admin',
                            email: email
                        };
                    }
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
