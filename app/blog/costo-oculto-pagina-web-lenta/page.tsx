import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, GaugeCircle, Server, Activity, ArrowDownRight, Globe2, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
    title: "El Costo Oculto de un Sitio Web Lento y su Solución Técnica",
    description: "Conoce cómo la velocidad de carga y las métricas de Core Web Vitals influyen en la experiencia de usuario, retención y señales de calidad en Google.",
    keywords: ["web lenta", "core web vitals", "optimización LCP", "edge computing", "Next.js rendimiento"],
    alternates: {
        canonical: "https://www.kytcode.lat/blog/costo-oculto-pagina-web-lenta",
        languages: {
            "es-CO": "https://www.kytcode.lat/blog/costo-oculto-pagina-web-lenta",
            "es": "https://www.kytcode.lat/blog/costo-oculto-pagina-web-lenta",
            "x-default": "https://www.kytcode.lat/blog/costo-oculto-pagina-web-lenta",
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
        title: "El Costo Oculto de un Sitio Web Lento (Y cómo optimizarlo)",
        description: "El impacto de la latencia y la sobrecarga del servidor en la tasa de conversión y cómo optimizar Core Web Vitals con arquitecturas modernas.",
        type: "article",
        url: "https://www.kytcode.lat/blog/costo-oculto-pagina-web-lenta",
        siteName: "K&T Code",
    }
}

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": "https://www.kytcode.lat/blog/costo-oculto-pagina-web-lenta#article",
    "headline": "El Costo Oculto de un Sitio Web Lento y su Solución Técnica",
    "description": "Conoce cómo la velocidad de carga y las métricas de Core Web Vitals influyen en la experiencia de usuario, retención y señales de calidad en Google.",
    "url": "https://www.kytcode.lat/blog/costo-oculto-pagina-web-lenta",
    "mainEntityOfPage": "https://www.kytcode.lat/blog/costo-oculto-pagina-web-lenta",
    "datePublished": "2026-02-10",
    "dateModified": "2026-02-10",
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
            "name": "El costo de una página web lenta",
            "item": "https://www.kytcode.lat/blog/costo-oculto-pagina-web-lenta"
        }
    ]
}

export default function CostoWebLenta() {
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
                            <span>Feb 10, 2026</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-600" />
                            <span>5 min de lectura</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            El costo de una página web lenta y cómo optimizar su rendimiento
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
                            La velocidad de carga y la estabilidad visual influyen de forma directa en cómo los usuarios interactúan con tu sitio y en su disposición para completar una compra o formulario.
                        </p>
                    </header>

                    {/* H2 Introducción */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <Activity className="w-8 h-8 text-amber-500" />
                            Impacto del Retardo en la Retención y Conversión
                        </h2>
                        <p>
                            Diversos estudios de usabilidad web coinciden en que los tiempos de respuesta lentos aumentan la tasa de abandono. Cuando una página tarda varios segundos en renderizar su elemento visual principal (LCP), la probabilidad de rebote se incrementa notablemente, afectando tanto el rendimiento comercial como las señales de satisfacción del usuario.
                        </p>
                        <p>
                            Un factor recurrente es la sobrecarga en servidores compartidos tradicionales, donde los recursos de CPU y memoria se distribuyen entre múltiples sitios simultáneos, generando cuellos de botella en momentos de alta concurrencia.
                        </p>
                    </div>

                    {/* H2 Explicación Arquitectónica */}
                    <h2 className="text-3xl font-bold text-white mt-16 mb-6 flex items-center gap-3">
                        <Globe2 className="w-8 h-8 text-primary" />
                        Next.js y Hosting Perimetral (Edge)
                    </h2>

                    <p>
                        Adoptar una arquitectura orientada al rendimiento permite reducir significativamente los tiempos de carga y sus efectos negativos sobre la conversión. En <strong>K&T Code</strong> construimos sobre infraestructura moderna, no plantillas, aplicando prácticas de ingeniería y optimización de rendimiento web (WPO):
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 my-10">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                            <GaugeCircle className="w-8 h-8 text-green-500 mb-4" />
                            <h3 className="text-xl font-bold text-white m-0 mb-2">Framework Estático</h3>
                            <p className="text-sm text-neutral-400 m-0">Compilamos el código a HTML/CSS estáticos de forma anticipada, reduciendo al mínimo los scripts que el navegador necesita procesar en tiempo de carga.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                            <Server className="w-8 h-8 text-blue-500 mb-4" />
                            <h3 className="text-xl font-bold text-white m-0 mb-2">Edge Computing</h3>
                            <p className="text-sm text-neutral-400 m-0">Las imágenes e interfaces de tu web se despliegan geo-referenciadas directamente desde un nodo del país del cliente.</p>
                        </div>
                    </div>

                    {/* CTA Pitch */}
                    <div className="bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8 lg:p-10 mt-16 text-center">
                        <ShieldCheck className="w-12 h-12 text-blue-500 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-white font-title mb-4">
                            Garantía de Alto Rendimiento en Cada Proyecto
                        </h3>
                        <p className="text-neutral-300 mb-8 max-w-xl mx-auto font-mono text-sm leading-relaxed">
                            En <Link href="/nosotros" className="text-white underline">K&T Code</Link>, diseñamos y desplegamos plataformas de <Link href="/servicios/desarrollo-web-a-medida" className="text-white underline">desarrollo web a medida</Link> en infraestructura global de borde (Edge Network). Conoce nuestros <Link href="/precios" className="text-white underline">planes y precios</Link> o solicita una auditoría de rendimiento.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/precios"
                                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold font-mono hover:bg-neutral-200 transition-colors w-full sm:w-auto"
                            >
                                Cotizar mi página web
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href="https://wa.me/573116360057?text=Hola%20K%26T%20Code,%20le%C3%AD%20sobre%20el%20costo%20oculto%20de%20una%20web%20lenta%20y%20quiero%20auditar%20mi%20proyecto."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold font-mono hover:bg-white/20 transition-colors w-full sm:w-auto"
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
