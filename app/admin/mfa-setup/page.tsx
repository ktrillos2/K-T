'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { QRCodeSVG } from 'qrcode.react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

export default function MFASetupPage() {
    const [error, setError] = useState('')
    const [qrCode, setQrCode] = useState<string | null>(null)
    const [factorId, setFactorId] = useState<string | null>(null)
    const [verifyCode, setVerifyCode] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function loadMFA() {
            setLoading(true)
            try {
                // Obtenemos los factores actuales
                const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors()
                if (factorsError) throw factorsError

                const enrolledFactors = factors?.all?.filter((f: any) => f.status === 'verified') || []

                // 1. Si ya tiene un factorTOTP enrolado Y verificado, en teoría no debería estar en esta página, pero si lo está:
                if (enrolledFactors.length > 0) {
                    // Ya tiene. Simplemente redirigimos al CRM o al verify.
                    router.push('/CRM')
                    return
                }

                // 2. Si no tiene, obtenemos los 'unverified' o creamos un nuevo enroll
                const unverifiedFactors = factors?.all?.filter((f: any) => f.status === 'unverified') || []
                let currentFactorId = unverifiedFactors.length > 0 ? unverifiedFactors[0].id : null

                if (!currentFactorId) {
                    const { data: enrollData, error: enrollError } = await supabase.auth.mfa.enroll({
                        factorType: 'totp',
                        issuer: 'Agencia K&T',
                    })
                    if (enrollError) throw enrollError

                    if (enrollData?.totp?.qr_code) {
                        setQrCode(enrollData.totp.qr_code)
                        setFactorId(enrollData.id)
                    }
                } else {
                    // Intentar recuperar el QR del factor si no enrolamos uno nuevo
                    // NOTA: supabase no devuelve el QR Code después del primer enroll. Tendríamos que desenrolar y volver a enrolar si se perdió.
                    const { error: unenrollError } = await supabase.auth.mfa.unenroll({
                        factorId: currentFactorId
                    })
                    if (unenrollError) throw unenrollError

                    const { data: enrollData, error: enrollError } = await supabase.auth.mfa.enroll({
                        factorType: 'totp',
                        issuer: 'Agencia K&T',
                    })
                    if (enrollError) throw enrollError

                    if (enrollData?.totp?.qr_code) {
                        setQrCode(enrollData.totp.qr_code)
                        setFactorId(enrollData.id)
                    }
                }
            } catch (err: any) {
                setError(err.message || 'Error al inicializar configuración MFA')
            } finally {
                setLoading(false)
            }
        }

        loadMFA()
    }, [])

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!factorId) return

        setSubmitting(true)
        setError('')

        try {
            const challenge = await supabase.auth.mfa.challenge({ factorId })
            if (challenge.error) throw challenge.error

            const verify = await supabase.auth.mfa.verify({
                factorId,
                challengeId: challenge.data.id,
                code: verifyCode,
            })

            if (verify.error) throw verify.error

            // ¡Verificación completada!
            router.push('/CRM')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'El código es inválido o ha caducado.')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
            <Card className="w-full max-w-sm border-neutral-800 bg-neutral-900 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">🔐 Configurar MFA</CardTitle>
                    <CardDescription className="text-center text-neutral-400">
                        Escanea el código QR con Google Authenticator, Authy, etc.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex justify-center bg-white p-4 rounded-xl">
                        {qrCode ? (
                            <QRCodeSVG value={qrCode} size={200} />
                        ) : (
                            <p className="text-black">No se pudo cargar el QR</p>
                        )}
                    </div>
                    <form onSubmit={handleVerify} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="code" className="text-center block">
                                Ingresa el código de 6 dígitos que aparece en tu app:
                            </Label>
                            <Input
                                id="code"
                                type="text"
                                placeholder="123456"
                                className="bg-neutral-800 border-neutral-700 text-white text-center text-2xl tracking-widest"
                                value={verifyCode}
                                onChange={(e) => setVerifyCode(e.target.value)}
                                maxLength={6}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-white text-black hover:bg-neutral-200" disabled={submitting}>
                            {submitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                            Vincular Authenticator
                        </Button>
                    </form>
                    {error && <p className="text-center text-sm text-red-500 font-medium">{error}</p>}
                </CardContent>
            </Card>
        </div>
    )
}
