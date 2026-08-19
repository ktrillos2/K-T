import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Code2, Layers, Award, Sparkles, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
    title: "Cómo Elegir una Empresa de Desarrollo Web en Colombia (2026)",
    description: "Guía completa para contratar una empresa de desarrollo web en Colombia. Criterios clave: desarrollo a medida vs plantillas, precios, SEO técnico, portafolio y garantías.",
    keywords: [
        "empresa de desarrollo web colombia",
        "como elegir empresa desarrollo web",
        "contratar desarrollo web colombia",
        "agencia desarrollo web bogota",
        "desarrollo software colombia empresas",
        "precios paginas web colombia",
        "K&T Code blog",
    ],
    alternates: {
        canonical: "https://www.kytcode.lat/blog/como-elegir-empresa-desarrollo-web-colombia",
        languages: {
            "es-CO": "https://www.kytcode.lat/blog/como-elegir-empresa-desarrollo-web-colombia",
            "es": "https://www.kytcode.lat/blog/como-elegir-empresa-desarrollo-web-colombia",
            "x-default": "https://www.kytcode.lat/blog/como-elegir-empresa-desarrollo-web-colombia",
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
        title: "Cómo Elegir una Empresa de Desarrollo Web en Colombia (2026)",
        description: "Guía completa para contratar una empresa de desarrollo web en Colombia. Criterios clave: desarrollo a medida vs plantillas, precios, SEO técnico, portafolio y garantías.",
        type: "article",
        url: "https://www.kytcode.lat/blog/como-elegir-empresa-desarrollo-web-colombia",
        siteName: "K&T Code",
    }
}

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Cómo Elegir una Empresa de Desarrollo Web en Colombia en 2026",
    "description": "Guía completa para contratar una empresa de desarrollo web en Colombia. Criterios clave: desarrollo a medida vs plantillas, precios, SEO técnico, portafolio y garantías.",
    "url": "https://www.kytcode.lat/blog/como-elegir-empresa-desarrollo-web-colombia",
    "datePublished": "2026-02-25",
    "dateModified": "2026-02-25",
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

export default function ComoElegirEmpresaDesarrolloWeb() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-white font-mono text-sm mb-12 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al Blog
                </Link>

                <article className="prose prose-invert prose-lg max-w-none prose-headings:font-title prose-a:text-white prose-a:underline hover:prose-a:text-neutral-300">
                    <header className="mb-12">
                        <div className="flex items-center gap-4 text-sm font-mono text-neutral-400 mb-6">
                            <span>Feb 25, 2026</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-600" />
                            <span>10 min de lectura</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-600" />
                            <span>Estrategia & Contratación</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Cómo Elegir una Empresa de Desarrollo Web en Colombia en 2026
                        </h1>
                        <p className="text-xl text-neutral-300 font-mono leading-relaxed border-l-2 border-white pl-6 py-2">
                            Contratar el proveedor tecnológico equivocado puede costarle a tu empresa meses de retraso, pérdidas comerciales y una plataforma lenta que no posiciona en Google. En esta guía te explicamos los criterios técnicos y comerciales indispensables para tomar la mejor decisión.
                        </p>
                    </header>

                    {/* Section 1 */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            1. Código a Medida vs. Plantillas CMS Infladas
                        </h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            Uno de los mayores filtros al cotizar es entender <em>cómo</em> construirá la empresa tu solución:
                        </p>
                        <ul className="space-y-3 font-mono text-sm text-neutral-300 mb-6 list-disc pl-6">
                            <li>
                                <strong>Desarrollo con plantillas genéricas (WordPress, constructores visuales):</strong> Aunque parecen económicas inicialmente, suelen cargar decenas de plugins pesados, vulnerabilidades de seguridad y tiempos de carga lentos que perjudican las conversiones y el SEO.
                            </li>
                            <li>
                                <strong>Desarrollo a medida moderno (<Link href="/servicios/desarrollo-web-a-medida">Next.js, React, TypeScript</Link>):</strong> El código se diseña específicamente para tu negocio. Se compila estáticamente con renderizado en el servidor (SSR/SSG), garantizando velocidad milimétrica y seguridad blindada.
                            </li>
                        </ul>
                        <p className="text-neutral-300 leading-relaxed">
                            Si tu proyecto busca posicionarse y competir seriamente en el mercado colombiano o internacional, exige arquitecturas limpias y modernas.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            2. Transparencia en Precios y Estructura de Costos
                        </h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            Una empresa seria de desarrollo web debe entregarte cotizaciones detalladas con rangos claros según el tipo de solución. En el mercado colombiano, los rangos de referencia son:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-6 font-mono text-sm">
                            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                                <h3 className="text-white font-bold text-base mb-2">Página Web Profesional</h3>
                                <p className="text-emerald-400 font-bold text-lg mb-2">Desde $450.000 COP</p>
                                <p className="text-neutral-400 text-xs">Ideal para aterrizaje comercial, presencia corporativa y conversión rápida.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                                <h3 className="text-white font-bold text-base mb-2">Tienda Virtual E-commerce</h3>
                                <p className="text-emerald-400 font-bold text-lg mb-2">Desde $1.300.000 COP</p>
                                <p className="text-neutral-400 text-xs">Catálogo de productos, pasarelas de pago y gestión de inventario.</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                                <h3 className="text-white font-bold text-base mb-2">Software y Plataformas</h3>
                                <p className="text-blue-400 font-bold text-lg mb-2">Cotización a medida</p>
                                <p className="text-neutral-400 text-xs">Paneles de administración, CRMs y sistemas a la medida de tu flujo de trabajo.</p>
                            </div>
                        </div>
                        <p className="text-neutral-300 leading-relaxed">
                            Puedes consultar el detalle completo de inclusiones y planes en nuestra sección de <Link href="/precios">precios de desarrollo web en Colombia</Link>.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            3. Portafolio Real y Verificable
                        </h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            No te fíes de capturas estáticas o maquetas ficticias. Pide ver proyectos reales en funcionamiento donde puedas comprobar:
                        </p>
                        <div className="space-y-3 font-mono text-sm text-neutral-300 my-4">
                            <div className="flex items-start gap-3 bg-white/[0.02] border border-white/10 p-4 rounded-xl">
                                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                <span>Velocidad de navegación fluida en dispositivos móviles y de escritorio.</span>
                            </div>
                            <div className="flex items-start gap-3 bg-white/[0.02] border border-white/10 p-4 rounded-xl">
                                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                <span>Diseño responsive sin saltos de contenido ni desbordamientos horizontales.</span>
                            </div>
                            <div className="flex items-start gap-3 bg-white/[0.02] border border-white/10 p-4 rounded-xl">
                                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                <span>Claridad en los llamados a la acción (WhatsApp, formularios, botones de compra).</span>
                            </div>
                        </div>
                        <p className="text-neutral-300 leading-relaxed">
                            Revisa casos de estudio reales en nuestro <Link href="/portafolio">portafolio de proyectos</Link>.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            4. SEO Técnico desde el Primer Bloque de Código
                        </h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            El SEO no es algo que se "agrega después". Una página web para empresas debe incluir de forma nativa:
                        </p>
                        <ul className="space-y-2 font-mono text-sm text-neutral-300 list-disc pl-6 mb-6">
                            <li>Jerarquía semántica estricta (un único <code>H1</code> por página, encabezados <code>H2</code>-<code>H3</code> lógicos).</li>
                            <li>Datos estructurados Schema JSON-LD (Organization, WebSite, Product, BreadcrumbList).</li>
                            <li>Optimización de imágenes con formatos de nueva generación (WebP / AVIF) de bajo peso.</li>
                            <li>Puntajes superiores al 90% en Google Lighthouse y Core Web Vitals (LCP &lt; 1.5s, CLS &lt; 0.05).</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            5. Propiedad del Código y Garantía Post-Lanzamiento
                        </h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            Asegúrate de que la empresa te entregue la propiedad total del código fuente, repositorio y accesos a la infraestructura en la nube. En <Link href="/nosotros">K&T Code</Link>, cada desarrollo es 100% propiedad del cliente, sin contratos de permanencia forzosa ni cobros sorpresa.
                        </p>
                    </section>

                    {/* Commercial CTA */}
                    <div className="bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-2xl p-8 lg:p-10 my-16 not-prose">
                        <h3 className="text-2xl font-bold text-white font-title mb-4 flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-white" />
                            Desarrolla tu Proyecto con K&T Code
                        </h3>
                        <p className="text-neutral-300 font-mono text-sm mb-8 leading-relaxed">
                            Diseñamos y programamos páginas web, tiendas virtuales y plataformas de software a medida para empresas en Colombia y Latinoamérica. Solicita una cotización detallada en menos de 24 horas.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/precios"
                                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 rounded-xl font-bold font-mono hover:bg-neutral-200 transition-colors"
                            >
                                <Code2 className="w-4 h-4" />
                                Cotizar mi página web
                            </Link>
                            <a
                                href="https://wa.me/573116360057?text=Hola%20K%26T%20Code,%20le%C3%AD%20el%20art%C3%ADculo%20sobre%20c%C3%B3mo%20elegir%20empresa%20de%20desarrollo%20web%20en%20Colombia%20y%20quiero%20cotizar%20un%20proyecto."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3.5 rounded-xl font-bold font-mono hover:bg-white/20 transition-colors"
                            >
                                Hablar por WhatsApp
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    )
}
