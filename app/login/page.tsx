'use client';

import { useState } from 'react';
import { verifyPasswordAndSendOTP } from '@/app/actions/auth-actions';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [step, setStep] = useState<'password' | 'otp'>('password');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    // Step 1: Verify Password and Trigger OTP
    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const res = await verifyPasswordAndSendOTP(password);
        setLoading(false);

        if (res.success) {
            setStep('otp');
            setMessage('Código de verificación enviado.');
        } else {
            setMessage(res.error || 'Contraseña incorrecta');
        }
    };

    // Step 2: Verify OTP and Login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const res = await signIn('credentials', {
            email: 'keteruse@gmail.com', // Must match hardcoded logic
            otp,
            redirect: false,
        });

        setLoading(false);

        if (res?.error) {
            setMessage('Código inválido o expirado.');
        } else {
            router.push('/CRM');
            router.refresh();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
            <Card className="w-full max-w-sm border-neutral-800 bg-neutral-900 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        {step === 'password' ? 'Acceso Privado' : 'Verificación de Seguridad'}
                    </CardTitle>
                    <CardDescription className="text-center text-neutral-400">
                        {step === 'password' ? 'Ingresa la llave maestra' : 'Ingresa el código enviado a tu correo'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 'password' ? (
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-neutral-800 border-neutral-700 text-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-white text-black hover:bg-neutral-200" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                                Validar
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Código OTP</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="123456"
                                    className="bg-neutral-800 border-neutral-700 text-white text-center text-2xl tracking-widest"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-white text-black hover:bg-neutral-200" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                                Entrar
                            </Button>
                            <Button variant="link" type="button" onClick={() => setStep('password')} className="w-full text-neutral-400">
                                Volver
                            </Button>
                        </form>
                    )}
                    {message && <p className="mt-4 text-center text-sm text-yellow-500">{message}</p>}
                </CardContent>
            </Card>
        </div>
    );
}
