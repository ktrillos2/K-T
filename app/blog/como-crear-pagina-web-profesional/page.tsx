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
    "@type": "Article",
    "headline": "Desarrollo Web Profesional: Guía Definitiva Empresarial",
    "description": "Descubre cómo estructurar una plataforma web empresarial que convierta. Fundamentos de arquitectura, UX y por qué Next.js domina el mercado B2B.",
    "url": "https://www.kytcode.lat/blog/como-crear-pagina-web-profesional",
    "datePublished": "2026-02-15",
    "dateModified": "2026-02-15",
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

export default function BlogPostPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
                        Para saber exactamente <strong>cómo crear una página web</strong> competitiva en la actualidad, necesitas dejar de pensar en "plantillas" y comenzar a pensar en "arquitectura web". El código subyacente y la elección de dónde se aloja tu plataforma son responsables directos de si lograrás posicionar en la página 1 de resultados y de si los usuarios esperarán lo suficiente como para ver tu contenido.
                    </p>
                    <ul className="space-y-4 mb-12 list-none pl-0">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                            <span><strong>Dominio propio y DNS:</strong> La identidad. Debes alojarlos en registradores que soporten redes de entrega de contenidos (CDN).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                            <span><strong>Hosting de borde (Edge):</strong> Olvida el hosting compartido tradicional. Si quieres que cargue rápido globalmente, requieres plataformas serverless como Vercel o AWS.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                            <span><strong>Código Moderno:</strong> React y su framework base (Next.js) se han convertido en la norma empresarial por sus capacidades de ISR y SSR automáticos.</span>
                        </li>
                    </ul>

                    <h2 className="text-3xl font-bold text-white font-title mt-16 mb-6 flex items-center gap-3">
                        <Code2 className="w-8 h-8 text-primary" />
                        Paso 1: Elección del Stack Tecnológico (Por qué ignorar CMS tradicionales)
                    </h2>
                    <p className="text-neutral-300 mb-6">
                        Al investigar sobre <i>crear pagina web</i>, lo primero que te recomiendan los tutoriales son gestores de contenido básicos con miles de plugins (como WordPress tradicional). El inconveniente de esta ruta técnica a nivel empresarial es la <strong>deuda técnica y la contaminación del DOM</strong>.
                    </p>
                    <p className="text-neutral-300 mb-12">
                        En su lugar, la arquitectura "Headless" separa la interfaz que ve tu cliente final de la base de datos o el gestor donde subes tu contenido (ej. Sanity.io). Esto garantiza que no haya código genérico inflado ralentizando el navegador e impidiendo que pases las auditorías técnicas (Core Web Vitals). Al construir plataformas para clientes, en <strong className="text-white"><Link href="/nosotros" className="underline hover:text-neutral-300">K&T Code</Link></strong> aseguramos esta capa técnica en todos nuestros servicios de <Link href="/servicios/desarrollo-web-a-medida" className="underline hover:text-neutral-300">desarrollo web a medida</Link>.
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
