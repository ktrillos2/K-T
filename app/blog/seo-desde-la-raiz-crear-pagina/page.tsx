import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, TrendingUp, Search, ShieldCheck, FileJson, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
    title: "¿Por qué el SEO debe ir desde la raíz al crear una página? | K&T",
    description: "Si esperas al mes 6 para hacer SEO en tu sitio, perderás tu inversión. Aprende cómo el SEO técnico en la arquitectura de código te posiciona más rápido.",
    openGraph: {
        title: "El error de hacer SEO después de lanzar tu página web",
        description: "En K&T inyectamos SEO desde el primer bloque de código (JSON-LD, Server-Side Rendering) impulsado por Next.js y Vercel.",
        type: "article",
    }
}

export default function SEODesdeLaRaiz() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-white font-mono text-sm mb-12 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al Blog
                </Link>

                <article className="prose prose-invert prose-lg max-w-none prose-headings:font-title prose-a:text-primary hover:prose-a:text-white">
                    {/* H1 SEO Optimizado */}
                    <header className="mb-12">
                        <div className="flex items-center gap-4 text-sm font-mono text-neutral-400 mb-6">
                            <span>Feb 15, 2026</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-600" />
                            <span>7 min de lectura</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            ¿Por qué el SEO debe ir desde la raíz al crear una página?
                        </h1>
                        <p className="text-xl text-neutral-300 leading-relaxed border-l-2 border-primary pl-6">
                            Las personas nos preguntan todo el tiempo <strong>cómo crear una pagina web</strong> que rankee en el número 1 de Google. El secreto no está en un "plugin de semáforo verde", está escondido en la ingeniería misma con la que la página fue construida.
                        </p>
                    </header>

                    {/* H2 Introducción */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <TrendingUp className="w-8 h-8 text-green-500" />
                            El error de "primero el diseño, luego el SEO"
                        </h2>
                        <p>
                            Al <strong>crear pagina web</strong>, el 90% de las agencias comete el mismo error. Construyen una interfaz visual atractiva primero y, una vez finalizado, deciden "comprar un paquete SEO" e instalarlo. Para ese momento, la arquitectura ya está consolidada.
                        </p>
                        <p>
                            Existen métricas críticas ("Server-Side Rendering" vs "Client-Side Rendering") que definen cómo los bots de Google leerán tu sitio. Si la base de código inicial no transpiló apropiadamente la jerarquía (H1 a H6), los metadatos globales o la legibilidad de la red, ninguna varita mágica de marketing lo podrá solucionar sin reescribir la plataforma entera.
                        </p>
                    </div>

                    {/* H2 Explicación Técnica */}
                    <h2 className="text-3xl font-bold text-white mt-16 mb-6 flex items-center gap-3">
                        <FileJson className="w-8 h-8 text-primary" />
                        ¿Qué es SEO Técnico "Desde la Raíz"?
                    </h2>

                    <p>
                        Es la práctica de ingeniería dictada por frameworks modernos (como Next.js) donde el contenido es optimizado milisegundos antes de llegar a la pantalla del cliente:
                    </p>

                    <ul className="list-none space-y-4 mb-8">
                        <li className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                            <span><strong>Páginas Estáticas Generadas (SSG):</strong> Cada blog, producto o servicio se entrega como un archivo puramente estático ultra veloz, no a través de una base de datos saturada. Google ama esto.</span>
                        </li>
                        <li className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                            <span><strong>JSON-LD Markup:</strong> Las agencias élite inyectan estructuras legibles solo por los bots de Google (Schema Markup) enseñándole explícitamente qué servicios ofrece tu empresa corporativa.</span>
                        </li>
                    </ul>

                    {/* CTA K&T Vercel */}
                    <div className="bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8 lg:p-10 mt-16">
                        <h3 className="text-2xl font-bold text-white font-title mb-4 flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-blue-500" />
                            El estándar K&T: Transparencia en nuestras Cotizaciones
                        </h3>
                        <p className="text-neutral-300 mb-8">
                            A diferencia del <i>desarrollo web</i> tradicional, en <strong>Agencia K&T</strong> jamás te cobraremos el  SEO Técnico como un "extra milagroso". Cada cotización comercial que te entregamos incluye obligatoriamente el <strong>SEO pre-renderizado en la raíz de Next.js</strong>. Además, la estabilidad, el uptime del 99.9% y la distribución mundial siempre estará garantizada a través del hosting en <strong>Vercel</strong>. Esa es nuestra promesa de desarrollo y código de honor.
                        </p>
                        <a
                            href="https://wa.me/573116360057?text=Hola%20K%26T%2C%20le%C3%AD%20sobre%20SEO%20desde%20la%20ra%C3%ADz.%20Me%20interesa%20estructurar%20mi%20web%20correctamente%20con%20ustedes."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold font-mono hover:bg-neutral-200 transition-colors w-full sm:w-auto"
                        >
                            <Search className="w-5 h-5" />
                            Estructurar mi Web de Inmediato
                        </a>
                    </div>

                </article>
            </div>
        </main>
    )
}
