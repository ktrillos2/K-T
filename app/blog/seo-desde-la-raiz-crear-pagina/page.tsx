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
    "@type": "BlogPosting",
    "@id": "https://www.kytcode.lat/blog/seo-desde-la-raiz-crear-pagina#article",
    "headline": "¿Por qué el SEO debe planificarse desde la arquitectura inicial de una web?",
    "description": "El posicionamiento orgánico depende de una base técnica sólida: renderizado eficiente, jerarquía semántica y datos estructurados integrados en el código.",
    "url": "https://www.kytcode.lat/blog/seo-desde-la-raiz-crear-pagina",
    "mainEntityOfPage": "https://www.kytcode.lat/blog/seo-desde-la-raiz-crear-pagina",
    "datePublished": "2026-02-01",
    "dateModified": "2026-02-01",
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
            "name": "¿Por qué el SEO debe planificarse desde la raíz?",
            "item": "https://www.kytcode.lat/blog/seo-desde-la-raiz-crear-pagina"
        }
    ]
}

export default function SEODesdeLaRaiz() {
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
                            <span>Feb 15, 2026</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-600" />
                            <span>7 min de lectura</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            ¿Por qué el SEO debe planificarse desde la arquitectura inicial de una web?
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
                            El posicionamiento orgánico depende de una base técnica sólida: renderizado eficiente, jerarquía semántica, tiempos de respuesta óptimos y datos estructurados integrados desde el diseño de la arquitectura.
                        </p>
                    </header>

                    {/* H2 Introducción */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <TrendingUp className="w-8 h-8 text-green-500" />
                            Integración del SEO Técnico en la Fase de Desarrollo
                        </h2>
                        <p>
                            Al <strong>crear una página web</strong>, postergar la estrategia técnica de SEO hasta después del lanzamiento suele generar retrabajos complejos. Aspectos como el modelo de renderizado (Server-Side Rendering vs. Client-Side Rendering), la jerarquía semántica (H1 a H6), los metadatos y la accesibilidad deben concebirse en conjunto con la arquitectura del software.
                        </p>
                    </div>

                    {/* H2 Explicación Técnica */}
                    <h2 className="text-3xl font-bold text-white mt-16 mb-6 flex items-center gap-3">
                        <FileJson className="w-8 h-8 text-primary" />
                        Componentes Fundamentales del SEO Técnico
                    </h2>

                    <p>
                        Frameworks modernos como Next.js facilitan la implementación de patrones recomendados por motores de búsqueda:
                    </p>

                    <ul className="list-none space-y-4 mb-8">
                        <li className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                            <span><strong>Generación Estática (SSG) y Renderizado Híbrido:</strong> Servir contenido pre-renderizado reduce la latencia del servidor y facilita un rastreo e indexación más predecible por parte de los motores de búsqueda.</span>
                        </li>
                        <li className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                            <span><strong>Marcado Estructurado Schema JSON-LD:</strong> Estructurar datos explícitos (Organization, Service, FAQPage) ayuda a los motores de búsqueda y asistentes de IA a contextualizar con precisión los servicios y la entidad comercial.</span>
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
