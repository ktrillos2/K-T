'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { sendOTP } from '@/app/actions/auth-actions';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const res = await sendOTP(email);
        setLoading(false);

        if (res.success) {
            setStep('otp');
            setMessage('Código enviado! Revisa tu email.');
        } else {
            setMessage(res.error || 'Error al enviar código');
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const res = await signIn('credentials', {
            email,
            otp,
            redirect: false,
        });

        setLoading(false);

        if (res?.error) {
            setMessage('Código inválido o expirado.');
        } else {
            router.push('/CRM');
            router.refresh(); // Ensure middleware state updates
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
            <Card className="w-full max-w-sm border-neutral-800 bg-neutral-900 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Acceso Seguro</CardTitle>
                    <CardDescription className="text-center text-neutral-400">
                        {step === 'email' ? 'Ingresa tu correo autorizado' : 'Ingresa el código enviado a tu correo'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 'email' ? (
                        <form onSubmit={handleSendCode} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@ejemplo.com"
                                    className="bg-neutral-800 border-neutral-700 text-white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-white text-black hover:bg-neutral-200" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                                Enviar Código
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Código de Verificación</Label>
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
                                Iniciar Sesión
                            </Button>
                            <Button variant="link" type="button" onClick={() => setStep('email')} className="w-full text-neutral-400">
                                Volver / Reenviar
                            </Button>
                        </form>
                    )}
                    {message && <p className="mt-4 text-center text-sm text-yellow-500">{message}</p>}
                </CardContent>
            </Card>
        </div>
    );
}
