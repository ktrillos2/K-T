'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
    const [step, setStep] = useState<'password' | 'otp'>('password')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [factorId, setFactorId] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    // Step 1: Verify Password using Supabase
    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                setMessage(error.message || 'Credenciales incorrectas')
                setLoading(false)
                return
            }

            // Ya está logueado en supabase como AAL1. Comprobamos su nivel de MFA
            const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors()
            if (factorsError) throw factorsError

            const verifiedFactors = factorsData?.all.filter((f: any) => f.status === 'verified') || []

            if (verifiedFactors.length > 0) {
                // El usuario ya tiene MFA activo. Le pedimos el código TOTP
                setFactorId(verifiedFactors[0].id)
                setStep('otp')
                setMessage('Introduce el código de tu Authenticator.')
            } else {
                // Es la primera vez que entra, necesita configurar el MFA
                router.push('/admin/mfa-setup')
            }
        } catch (err: any) {
            setMessage(err.message || 'Error en autenticación')
        } finally {
            setLoading(false)
        }
    }

    // Step 2: Verify OTP via Supabase
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!factorId) return

        setLoading(true)
        setMessage('')

        try {
            const challenge = await supabase.auth.mfa.challenge({ factorId })
            if (challenge.error) throw challenge.error

            const verify = await supabase.auth.mfa.verify({
                factorId,
                challengeId: challenge.data.id,
                code: otp,
            })

            if (verify.error) throw verify.error

            // Redirige
            router.push('/CRM')
            router.refresh()
        } catch (err: any) {
            setMessage(err.message || 'Código inválido o expirado.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
            <Card className="w-full max-w-sm border-neutral-800 bg-neutral-900 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        {step === 'password' ? 'Acceso Privado' : 'Verificación de Seguridad'}
                    </CardTitle>
                    <CardDescription className="text-center text-neutral-400">
                        {step === 'password' ? 'Ingresa tus credenciales maestras' : 'Ingresa el código 2FA de tu Authenticator'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 'password' ? (
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@kytcode.lat"
                                    className="bg-neutral-800 border-neutral-700 text-white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
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
                                Ingresar
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Código OTP (Authenticator)</Label>
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
    )
}
