import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, CalendarDays, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
    title: "Blog de Desarrollo Web y Estrategia Digital",
    description: "Recursos técnicos, guías y casos de estudio sobre ingeniería web, SEO y arquitectura de software de alto rendimiento impulsada por Next.js y Vercel.",
}

const posts = [
    {
        slug: "como-crear-pagina-web-2026",
        title: "Cómo crear una página web en 2026: La guía definitiva",
        excerpt: "Descubre el proceso técnico para construir un proyecto web que realmente convierta, ignorando plantillas.",
        date: "Feb 20, 2026",
        readTime: "8 min de lectura",
    },
    {
        slug: "desarrollo-web-medida-vs-plantillas",
        title: "Desarrollo web a la medida vs. Plantillas genéricas: ¿Qué necesita tu negocio?",
        excerpt: "Análisis técnico de por qué el código a medida vende más y supera a los CMS genéricos en Core Web Vitals.",
        date: "Feb 18, 2026",
        readTime: "6 min de lectura",
    },
    {
        slug: "seo-desde-la-raiz-crear-pagina",
        title: "¿Por qué el SEO debe ir desde la raíz al crear una página?",
        excerpt: "El error de hacer SEO después del lanzamiento. Conoce por qué la estructura en Next.js garantiza tu visibilidad.",
        date: "Feb 15, 2026",
        readTime: "7 min de lectura",
    },
    {
        slug: "costo-oculto-pagina-web-lenta",
        title: "El costo oculto de una página web lenta y cómo solucionarlo",
        excerpt: "Cada segundo de carga que pierdes, pierdes clientes. Descubre por qué alojar en Vercel es la solución definitiva.",
        date: "Feb 10, 2026",
        readTime: "5 min de lectura",
    }
]

export default function BlogIndex() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white font-mono text-sm mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al Inicio
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-title mb-6">
                        Blog Técnico
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl font-mono">
                        Arquitectura, SEO y Desarrollo Web de alto nivel. Construimos experiencias digitales indomables.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                            <article className="h-full flex flex-col p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative overflow-hidden">
                                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 mb-6">
                                    <div className="flex items-center gap-1.5">
                                        <CalendarDays className="w-4 h-4" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                <h2 className="text-2xl lg:text-3xl font-bold text-white font-title mb-4 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-neutral-400 leading-relaxed mb-8 flex-grow">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center gap-2 text-white font-mono text-sm font-bold mt-auto group-hover:translate-x-2 transition-transform">
                                    Leer Artículo <ArrowRight className="w-4 h-4" />
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}
