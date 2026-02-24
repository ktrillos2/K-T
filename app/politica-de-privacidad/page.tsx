import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Privacidad | K&T Agency',
    description: 'Conoce nuestra Política de Privacidad sobre la recopilación y uso de datos a través de nuestros canales de soporte, incluyendo la API de WhatsApp Business.',
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <header className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-6">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
                        Política de Privacidad
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Última actualización: {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                    </p>
                </header>

                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                            1. Introducción
                        </h2>
                        <p className="leading-relaxed">
                            En <strong>K&T Agency</strong>, respetamos tu privacidad y estamos comprometidos con la protección de tus datos personales. Esta Política de Privacidad explica cómo recopilamos, utilizamos y salvaguardamos tu información cuando interactúas con nosotros a través de nuestros canales de atención, específicamente mediante la API de WhatsApp Business.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                            2. Información que recopilamos
                        </h2>
                        <p className="leading-relaxed">
                            Al comunicarte con nosotros a través de nuestros canales oficiales de mensajería (WhatsApp), recopilamos la siguiente información personal, estrictamente necesaria para poder identificarte y brindarte asistencia:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Nombre completo o de perfil:</strong> Como aparece registrado en tu cuenta de WhatsApp.</li>
                            <li><strong>Número de teléfono:</strong> Vinculado a la plataforma para el envío y recepción de los mensajes.</li>
                            <li><strong>Historial de conversación:</strong> Los mensajes, consultas y archivos adjuntos que nos envíes voluntariamente durante la asistencia.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                            3. Uso de la Información
                        </h2>
                        <p className="leading-relaxed">
                            Los datos proporcionados a K&T Agency a través de la API de WhatsApp Business son utilizados de manera <strong>exclusiva para fines de atención al cliente, soporte técnico y seguimiento comercial directo</strong>. Esto incluye:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Responder a tus consultas, preguntas o solicitudes de presupuesto.</li>
                            <li>Proveer asistencia técnica sobre nuestros servicios de desarrollo y diseño web.</li>
                            <li>Facilitar la comunicación necesaria para la correcta ejecución de tu proyecto.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                            4. Compartición y Venta de Datos
                        </h2>
                        <p className="leading-relaxed font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            K&T Agency garantiza de forma estricta que NO vendemos, alquilamos ni compartimos su número de teléfono, historial de chat ni ninguna otra información personal con terceros, plataformas de marketing, ni bases de datos externas bajo ninguna circunstancia.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                            5. Seguridad de los Datos
                        </h2>
                        <p className="leading-relaxed">
                            Mantenemos salvaguardias técnicas y operativas para proteger la confidencialidad de los mensajes y tus datos personales contra accesos no autorizados. Las comunicaciones son transmitidas bajo los estándares de cifrado de extremo a extremo que provee directamente WhatsApp (Meta).
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                            6. Consentimiento
                        </h2>
                        <p className="leading-relaxed">
                            Al iniciar una conversación con nuestro número empresarial de WhatsApp, tú aceptas expresamente los términos descritos en esta Política de Privacidad y consientes el tratamiento de tus datos básicos (nombre y teléfono) para recibir nuestro soporte y asistencia.
                        </p>
                    </section>
                </article>

                <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 text-center">
                    <p>Esta política ha sido redactada específicamente para cumplir con los lineamientos de desarrolladores de Meta (WhatsApp Business API).</p>
                    <p className="mt-2 text-primary font-medium hover:underline cursor-pointer">
                        <a href="https://www.kytcode.lat" target="_blank" rel="noopener noreferrer">Desarrollado por K&T ❤️</a>
                    </p>
                </footer>
            </div>
        </main>
    );
}
