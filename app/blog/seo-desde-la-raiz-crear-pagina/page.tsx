import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, TrendingUp, Search, ShieldCheck, FileJson, CheckCircle2 } from "lucide-react"
import BlogArticleEnhancements from "@/components/seo/blog-article-enhancements"

export const metadata: Metadata = {
    title: "SEO desde el inicio: arquitectura para posicionamiento",
    description: "Cómo planear rastreo, contenido, datos estructurados y rendimiento desde el comienzo de un proyecto web.",
    alternates: { canonical: "https://www.kytcode.lat/blog/seo-desde-la-raiz-crear-pagina" },
    keywords: ["seo técnico", "server side rendering", "json-ld markup", "optimización motores de búsqueda", "K&T seo"],
    openGraph: {
        title: "SEO Técnico desde el Código: La Arquitectura del Posicionamiento",
        description: "En K&T inyectamos rendimiento SEO desde el primer bloque de código lógico usando Next.js para una base orgánica rastreable y medible.",
        type: "article",
        url: "https://www.kytcode.lat/blog/seo-desde-la-raiz-crear-pagina",
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
                            Las personas nos preguntan todo el tiempo <strong>cómo crear una pagina web</strong> que tenga mejores condiciones para competir en resultados orgánicos. No existe un único secreto: la arquitectura, el contenido, la experiencia, la autoridad y la medición deben trabajar en conjunto.
                        </p>
                    </header>

                    {/* H2 Introducción */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <TrendingUp className="w-8 h-8 text-green-500" />
                            El error de "primero el diseño, luego el SEO"
                        </h2>
                        <p>
                            Al crear una página web, un error frecuente es dejar el SEO para el final. Construyen una interfaz visual atractiva primero y, una vez finalizado, deciden "comprar un paquete SEO" e instalarlo. Para ese momento, la arquitectura ya está consolidada.
                        </p>
                        <p>
                            Existen métricas críticas ("Server-Side Rendering" vs "Client-Side Rendering") que definen cómo los bots de Google leerán tu sitio. Si la base de código inicial no transpiló apropiadamente la jerarquía (H1 a H6), los metadatos globales o la legibilidad de la red, corregirlo después puede requerir cambios de arquitectura, contenido, redirecciones y componentes.
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
                            <span><strong>Páginas Estáticas Generadas (SSG):</strong> Cada blog, producto o servicio se entrega como un recurso pre-renderizado cuando el contenido y la frecuencia de actualización lo permiten. Esto puede reducir trabajo en el servidor y mejorar la entrega.</span>
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
                            A diferencia del <i>desarrollo web</i> tradicional, en <strong>K&T Code</strong> definimos desde la propuesta qué tareas de SEO técnico forman parte del alcance. La disponibilidad, el alojamiento y la distribución dependen del proveedor y del plan seleccionado, por lo que se documentan sin promesas absolutas.
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

                                    <BlogArticleEnhancements slug="seo-desde-la-raiz-crear-pagina" />
                </article>
            </div>
        </main>
    )
}
