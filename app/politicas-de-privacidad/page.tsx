"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
    const router = useRouter()

    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <button
                    onClick={() => router.push('/')}
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 font-mono cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al inicio
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-title mb-8">Política de Privacidad</h1>

                    <div className="prose prose-invert prose-lg max-w-none font-mono text-white/80 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Introducción</h2>
                            <p>
                                En K&T Agencia Digital ("nosotros", "nuestro"), respetamos su privacidad y nos comprometemos a proteger los datos personales que pueda compartir con nosotros a través de nuestro sitio web. Esta política describe cómo recopilamos, usamos y protegemos su información.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Información que recopilamos</h2>
                            <p>Podemos recopilar la siguiente información:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Información de contacto (nombre, correo electrónico, número de teléfono) proporcionada voluntariamente a través de nuestros formularios.</li>
                                <li>Datos técnicos (dirección IP, tipo de navegador, ubicación aproximada) recopilados automáticamente para análisis y seguridad.</li>
                                <li>Datos sobre su interacción con nuestro sitio web para mejorar la experiencia del usuario.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Uso de la información</h2>
                            <p>Utilizamos su información para:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Responder a sus consultas y proporcionar los servicios solicitados.</li>
                                <li>Mejorar nuestro sitio web y servicios mediante análisis de datos.</li>
                                <li>Cumplir con obligaciones legales y proteger la seguridad de nuestro sitio.</li>
                                <li>Realizar campañas de marketing y publicidad (con su consentimiento implícito al interactuar con nuestros anuncios).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Cookies y Tecnologías de Rastreo</h2>
                            <p>
                                Utilizamos cookies y herramientas de terceros como Google Analytics, Google Ads y Microsoft Clarity para analizar el tráfico y la efectividad de nuestra publicidad. Estas herramientas pueden recopilar datos anónimos sobre su navegación.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Compartir información</h2>
                            <p>
                                No vendemos su información personal. Podemos compartir datos con proveedores de servicios de confianza (como plataformas de alojamiento o análisis) estrictamente para operar nuestro negocio.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Contacto</h2>
                            <p>
                                Si tiene preguntas sobre esta política, puede contactarnos a través de nuestro formulario de contacto o enviando un correo a contactoktweb@gmail.com.
                            </p>
                        </section>

                        <p className="text-sm text-white/40 pt-8 border-t border-white/10">
                            Última actualización: Diciembre 2024
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
