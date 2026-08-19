import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Code2, Rocket, Server, Zap } from "lucide-react"
import { CursorProvider } from "@/context/cursor-context"

export const metadata: Metadata = {
    title: "Desarrollo Web Profesional: Guía Definitiva Empresarial",
    description: "Descubre cómo estructurar una plataforma web empresarial que convierta. Fundamentos de arquitectura, UX y por qué Next.js domina el mercado B2B.",
    keywords: ["desarrollo web empresarial", "arquitectura next.js", "agencia desarrollo SSR", "ux diseño web", "K&T"],
    alternates: {
        canonical: "https://www.kytcode.lat/blog/como-crear-pagina-web-profesional",
        languages: {
            "es-CO": "https://www.kytcode.lat/blog/como-crear-pagina-web-profesional",
            "es": "https://www.kytcode.lat/blog/como-crear-pagina-web-profesional",
            "x-default": "https://www.kytcode.lat/blog/como-crear-pagina-web-profesional",
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
        title: "Desarrollo Web Profesional: Arquitectura y Estrategia Empresarial",
        description: "Aprende el paso a paso desde código hasta Vercel. Una guía técnica para empresas y negocios digitales de alto nivel.",
        type: "article",
        url: "https://www.kytcode.lat/blog/como-crear-pagina-web-profesional",
        siteName: "K&T Code",
    }
}

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": "https://www.kytcode.lat/blog/como-crear-pagina-web-profesional#article",
    "headline": "Cómo Crear una Página Web Profesional: Arquitectura y Estrategia",
    "description": "Descubre cómo estructurar una plataforma web empresarial que convierta. Fundamentos de arquitectura, UX y por qué Next.js domina el mercado B2B.",
    "url": "https://www.kytcode.lat/blog/como-crear-pagina-web-profesional",
    "mainEntityOfPage": "https://www.kytcode.lat/blog/como-crear-pagina-web-profesional",
    "datePublished": "2026-02-15",
    "dateModified": "2026-02-15",
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
            "name": "Cómo Crear una Página Web Profesional",
            "item": "https://www.kytcode.lat/blog/como-crear-pagina-web-profesional"
        }
    ]
}

export default function BlogPostPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]) }}
            />
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-white font-mono text-sm mb-12 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al Inicio
                </Link>

                <article className="prose prose-invert prose-lg max-w-none">
                    {/* H1 SEO Optimizado */}
                    <div className="mb-12">
                        <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">Guía Técnica Empresarial</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-title leading-tight mb-6">
                            Cómo Crear una Página Web Profesional: Arquitectura y Estrategia
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

                        <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl">
                            ¿Estás buscando <strong>crear una página web</strong> para tu empresa o negocio digital? En esta guía eliminaremos el ruido de plataformas "fáciles" y abordaremos la ingeniería requerida para lanzar un ecosistema escalable, rápido y seguro.
                        </p>
                    </div>

                    {/* H2 Estructurado */}
                    <h2 className="text-3xl font-bold text-white font-title mt-16 mb-6 flex items-center gap-3">
                        <Server className="w-8 h-8 text-primary" />
                        Las bases técnicas para crear una página web escalable
                    </h2>
                    <p className="text-neutral-300 mb-6">
                        Para saber exactamente <strong>cómo crear una página web</strong> con proyección de crecimiento, es fundamental evaluar la arquitectura del software: el modelo de renderizado, la gestión de dependencias y la infraestructura de alojamiento influyen directamente en la velocidad y la experiencia del usuario final.
                    </p>
                    <ul className="space-y-4 mb-12 list-none pl-0">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                            <span><strong>Dominio propio y DNS en CDN:</strong> Configurar registros DNS en redes globales (como Cloudflare) optimiza la resolución y la seguridad inicial.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                            <span><strong>Infraestructura Edge y Serverless:</strong> Alojar el frontend en plataformas de borde (como Vercel o AWS CloudFront) asegura tiempos de respuesta homogéneos y escalabilidad ante picos de tráfico.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                            <span><strong>Next.js y Renderizado Híbrido:</strong> Next.js puede ser una opción adecuada cuando el proyecto requiere renderizado flexible (SSR/SSG/ISR), integraciones con APIs, una arquitectura basada en React o control avanzado sobre el rendimiento del frontend.</span>
                        </li>
                    </ul>

                    <h2 className="text-3xl font-bold text-white font-title mt-16 mb-6 flex items-center gap-3">
                        <Code2 className="w-8 h-8 text-primary" />
                        Paso 1: Elección del Stack Tecnológico y Arquitectura
                    </h2>
                    <p className="text-neutral-300 mb-6">
                        Al planificar un proyecto digital, los CMS tradicionales son viables para blogs estándar o sitios con bajo requerimiento de personalización. Sin embargo, para aplicaciones con necesidades de escalabilidad o integración con sistemas externos, el acoplamiento de plugins puede incrementar el costo de mantenimiento.
                    </p>
                    <p className="text-neutral-300 mb-12">
                        La arquitectura desacoplada ("Headless") permite que la interfaz gráfica opere independientemente del gestor de contenidos (como Sanity o Supabase). Esto proporciona interfaces más ligeras, mayor seguridad al no exponer la base de datos directamente y flexibilidad para rediseñar el frontend sin alterar los datos del negocio.
                    </p>

                    <h2 className="text-3xl font-bold text-white font-title mt-16 mb-6 flex items-center gap-3">
                        <Zap className="w-8 h-8 text-primary" />
                        Paso 2: Desarrollo Web enfocado en Core Web Vitals
                    </h2>
                    <p className="text-neutral-300 mb-6">
                        No basta con saber <strong>cómo crear una pagina</strong> de manera visual si a nivel de velocidad fracasa:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-white font-title mb-2">LCP (Largest Contentful Paint)</h3>
                            <p className="text-sm text-neutral-400">El tiempo que tarda tu imagen o bloque de texto más grande en renderizarse. Debe tomar menos de 2.5 segundos.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-white font-title mb-2">CLS (Cumulative Layout Shift)</h3>
                            <p className="text-sm text-neutral-400">La estabilidad visual de tu pantalla mientras va cargando el código. Los enlaces no deben saltar cuando tocas la pantalla.</p>
                        </div>
                    </div>

                    {/* Pitch de Venta (CTA Arquitectónico) */}
                    <div className="bg-gradient-to-r from-blue-900/40 to-black border border-blue-500/30 rounded-2xl p-8 lg:p-12 mb-16 text-center">
                        <Rocket className="w-12 h-12 text-blue-400 mx-auto mb-6" />
                        <h2 className="text-2xl md:text-3xl font-bold text-white font-title mb-4">
                            Desarrolla tu plataforma web con ingeniería moderna
                        </h2>
                        <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8 font-mono">
                            En K&T Code no usamos plantillas lentas. Construimos sitios corporativos, tiendas virtuales y software a medida en Next.js y Vercel. Consulta nuestros <Link href="/precios" className="underline hover:text-white">planes y precios</Link> o revisa nuestro <Link href="/portafolio" className="underline hover:text-white">portafolio de proyectos</Link>.
                        </p>
                        <Link
                            href="/precios"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-mono font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Cotizar mi página web
                        </Link>
                    </div>

                </article>
            </div>
        </main>
    )
}
