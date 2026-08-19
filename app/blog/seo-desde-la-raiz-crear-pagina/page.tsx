import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, TrendingUp, Search, ShieldCheck, FileJson, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
    title: "SEO Técnico desde el Código: La Arquitectura del Posicionamiento",
    description: "Por qué integrar optimización SEO en la fase de ingeniería es vital. Aprende sobre JSON-LD, Server-Side Rendering y posicionamiento real.",
    keywords: ["seo técnico", "server side rendering", "json-ld markup", "optimización motores de búsqueda", "K&T seo"],
    alternates: {
        canonical: "https://www.kytcode.lat/blog/seo-desde-la-raiz-crear-pagina",
        languages: {
            "es-CO": "https://www.kytcode.lat/blog/seo-desde-la-raiz-crear-pagina",
            "es": "https://www.kytcode.lat/blog/seo-desde-la-raiz-crear-pagina",
            "x-default": "https://www.kytcode.lat/blog/seo-desde-la-raiz-crear-pagina",
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: "SEO Técnico desde el Código: La Arquitectura del Posicionamiento",
        description: "En K&T inyectamos rendimiento SEO desde el primer bloque de código lógico usando Next.js para un posicionamiento orgánico dominante.",
        type: "article",
        url: "https://www.kytcode.lat/blog/seo-desde-la-raiz-crear-pagina",
        siteName: "K&T Code",
    }
}

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "SEO Técnico desde el Código: La Arquitectura del Posicionamiento",
    "description": "Por qué integrar optimización SEO en la fase de ingeniería es vital. Aprende sobre JSON-LD, Server-Side Rendering y posicionamiento real.",
    "url": "https://www.kytcode.lat/blog/seo-desde-la-raiz-crear-pagina",
    "datePublished": "2026-02-01",
    "dateModified": "2026-02-01",
    "author": {
        "@type": "Organization",
        "name": "K&T Code",
        "url": "https://www.kytcode.lat/"
    },
    "publisher": {
        "@type": "Organization",
        "name": "K&T Code",
        "url": "https://www.kytcode.lat/",
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.kytcode.lat/icon.png"
        }
    }
}

export default function SEODesdeLaRaiz() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
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
                            El Estándar K&T Code: SEO Técnico Integrado
                        </h3>
                        <p className="text-neutral-300 mb-8 font-mono text-sm leading-relaxed">
                            En <strong className="text-white"><Link href="/nosotros" className="underline hover:text-neutral-300">K&T Code</Link></strong> el SEO técnico y Core Web Vitals no son un costo oculto; forman parte esencial de nuestros servicios de <Link href="/servicios/desarrollo-web-a-medida" className="underline hover:text-neutral-300">desarrollo web a medida</Link>. Consulta nuestros <Link href="/precios" className="underline hover:text-neutral-300">planes y precios</Link> o solicita una asesoría técnica.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/precios"
                                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold font-mono hover:bg-neutral-200 transition-colors w-full sm:w-auto"
                            >
                                <Search className="w-4 h-4" />
                                Cotizar mi página web
                            </Link>
                            <a
                                href="https://wa.me/573116360057?text=Hola%20K%26T%20Code,%20le%C3%AD%20sobre%20SEO%20desde%20la%20ra%C3%ADz%20y%20quiero%20cotizar%20un%20proyecto."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-bold font-mono hover:bg-white/20 transition-colors w-full sm:w-auto"
                            >
                                Hablar por WhatsApp
                            </a>
                        </div>
                    </div>

                </article>
            </div>
        </main>
    )
}
