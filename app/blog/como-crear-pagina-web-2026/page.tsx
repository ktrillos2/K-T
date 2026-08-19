import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Zap, Code2, ShieldCheck, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
    title: "Cómo Crear una Página Web en 2026: Guía Definitiva",
    description: "Conoce el estándar técnico de 2026 para el desarrollo web profesional. Rendimiento, accesibilidad y arquitecturas headless sobre Next.js.",
    keywords: ["arquitectura web", "desarrollo web 2026", "tecnología headless", "rendimiento web", "K&T Code"],
    alternates: {
        canonical: "https://www.kytcode.lat/blog/como-crear-pagina-web-2026",
        languages: {
            "es-CO": "https://www.kytcode.lat/blog/como-crear-pagina-web-2026",
            "es": "https://www.kytcode.lat/blog/como-crear-pagina-web-2026",
            "x-default": "https://www.kytcode.lat/blog/como-crear-pagina-web-2026",
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
        title: "Cómo Crear una Página Web en 2026: Guía Definitiva",
        description: "El proceso técnico y arquitectónico completo para lanzar un proyecto web corporativo y de alto rendimiento.",
        type: "article",
        url: "https://www.kytcode.lat/blog/como-crear-pagina-web-2026",
        siteName: "K&T Code",
    }
}

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": "https://www.kytcode.lat/blog/como-crear-pagina-web-2026#article",
    "headline": "Cómo crear una página web en 2026: Guía de arquitectura y buenas prácticas",
    "description": "Conoce el estándar técnico de 2026 para el desarrollo web profesional. Rendimiento, accesibilidad y arquitecturas headless sobre Next.js.",
    "url": "https://www.kytcode.lat/blog/como-crear-pagina-web-2026",
    "mainEntityOfPage": "https://www.kytcode.lat/blog/como-crear-pagina-web-2026",
    "datePublished": "2026-02-20",
    "dateModified": "2026-02-20",
    "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.kytcode.lat/#website",
        "name": "K&T Code"
    },
    "author": {
        "@type": "Organization",
        "@id": "https://www.kytcode.lat/#organization",
        "name": "K&T Code",
        "url": "https://www.kytcode.lat/"
    },
    "publisher": {
        "@type": "Organization",
        "@id": "https://www.kytcode.lat/#organization",
        "name": "K&T Code",
        "url": "https://www.kytcode.lat/",
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.kytcode.lat/icon.png"
        }
    }
}

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://www.kytcode.lat/"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://www.kytcode.lat/blog"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Cómo crear una página web en 2026",
            "item": "https://www.kytcode.lat/blog/como-crear-pagina-web-2026"
        }
    ]
}

export default function ComoCrearPaginaWeb() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]) }}
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
                            <span>Feb 20, 2026</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-600" />
                            <span>8 min de lectura</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Cómo crear una página web en 2026: Guía de arquitectura y buenas prácticas
                        </h1>

                        <div className="flex items-center gap-3 py-4 border-t border-b border-white/10 my-6 font-mono text-xs text-neutral-400 not-prose">
                            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                KT
                            </div>
                            <div>
                                <span>Escrito por </span>
                                <Link href="/autores/keyner-trillos" className="text-white font-bold hover:underline">
                                    Keyner Trillos
                                </Link>
                                <span className="text-neutral-400"> • Lead Software Engineer — K&T Code</span>
                                <span className="block text-[11px] text-neutral-500 mt-0.5">Revisado el 19 de agosto de 2026</span>
                            </div>
                        </div>

                        <p className="text-xl text-neutral-300 leading-relaxed border-l-2 border-primary pl-6">
                            Saber <strong>cómo crear una página web</strong> competitiva requiere entender las diferencias entre constructores visuales y arquitecturas basadas en código moderno para proyectos con altas exigencias de rendimiento y personalización.
                        </p>
                    </header>

                    {/* H2 Introducción */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <Zap className="w-8 h-8 text-primary" />
                            Constructores No-Code vs. Desarrollo Basado en Código
                        </h2>
                        <p>
                            Al evaluar opciones para <i>cómo crear una página</i>, existen plataformas que permiten publicar sitios rápidamente mediante módulos preconfigurados. Estas herramientas pueden ser útiles para proyectos personales o validaciones iniciales, pero para plataformas corporativas pueden introducir capas de código no utilizado que aumentan el peso del DOM y ralentizan la interacción.
                        </p>
                        <p>
                            Un tiempo de carga LCP deficiente puede deteriorar la retención del visitante y forma parte de las señales de experiencia de página que Google evalúa junto con múltiples factores de relevancia, arquitectura e indexación.
                        </p>
                    </div>

                    {/* H2 El Ecosistema */}
                    <h2 className="text-3xl font-bold text-white mt-16 mb-6">Fundamentos técnicos para una página web profesional</h2>

                    <h3 className="text-2xl font-bold text-white mt-8 mb-4">1. Infraestructura y Redes de Entrega de Contenidos (Edge CDN)</h3>
                    <p>
                        Frente a los servidores compartidos tradicionales que centralizan todas las peticiones en una única máquina, las arquitecturas modernas distribuyen recursos a través de redes CDN globales (como Vercel o Cloudflare Edge), entregando contenido estático desde el nodo geográfico más cercano al usuario.
                    </p>

                    <h3 className="text-2xl font-bold text-white mt-8 mb-4">2. Arquitecturas Headless y Renderizado Híbrido</h3>
                    <p>
                        Separar la capa visual del almacenamiento de datos permite que el frontend (construido en Next.js o React) consuma información mediante APIs optimizadas, mejorando la modularidad y facilitando integraciones a medida. Conoce nuestro enfoque en <Link href="/servicios/desarrollo-web-a-medida" className="text-white underline">desarrollo web a medida</Link>.
                    </p>

                    <h3 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        3. SEO Integrado desde la raíz
                    </h3>
                    <p>
                        No construimos la casa asumiendo que "luego le ponemos la tubería". El SEO avanzado debe inyectarse en el código desde su concepción. Estructuración técnica de etiquetas H1, H2, JSON-LD estructurado, sitemaps dinámicos y metaetiquetas precisas.
                    </p>

                    {/* CTA a medida K&T */}
                    <div className="bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8 lg:p-10 my-16">
                        <h3 className="text-2xl font-bold text-white font-title mb-4 flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-blue-500" />
                            Garantía Técnica de Alto Rendimiento K&T Code
                        </h3>
                        <p className="text-neutral-300 mb-8 font-mono text-sm leading-relaxed">
                            Entender cómo crear una página web es complejo, implementarlo es ingeniería pura. En nuestras cotizaciones comerciales detallamos nuestra arquitectura basada en Vercel y Next.js junto con la estrategia de SEO avanzado. Consulta nuestros <Link href="/precios" className="text-white underline">planes y precios</Link> o solicita una cotización personalizada.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/precios"
                                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold font-mono hover:bg-neutral-200 transition-colors w-full sm:w-auto"
                            >
                                <Code2 className="w-4 h-4" />
                                Cotizar mi página web
                            </Link>
                            <a
                                href="https://wa.me/573116360057?text=Hola%20K%26T%20Code,%20le%C3%AD%20el%20art%C3%ADculo%20sobre%20c%C3%B3mo%20crear%20una%20p%C3%A1gina%20web%20y%20quiero%20cotizar%20un%20proyecto."
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
