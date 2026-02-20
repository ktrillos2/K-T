import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, GaugeCircle, Server, Activity, ArrowDownRight, Globe2, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
    title: "El costo oculto de una página web lenta y cómo solucionarlo | K&T",
    description: "Cada segundo extra que tarda tu sitio en cargar destruye un 20% de tus ventas. Descubre cómo K&T soluciona el problema de raíz con Next.js y Vercel.",
    openGraph: {
        title: "Por qué una página web lenta te cuesta dinero a diario",
        description: "El costo oculto (y devastador) de un mal hosting. Soluciona métricas de LCP con nuestra infraestructura serverless.",
        type: "article",
    }
}

export default function CostoWebLenta() {
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
                            <span>Feb 10, 2026</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-600" />
                            <span>5 min de lectura</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            El costo oculto de una página web lenta (y cómo solucionarlo)
                        </h1>
                        <p className="text-xl text-neutral-300 leading-relaxed border-l-2 border-primary pl-6">
                            Tus clientes invierten menos de 3 segundos en decidir si comprarán en tu tienda o si irán a Google a buscar a tu competidor principal. <strong>¿Sabes qué velocidad entrega tu página actual?</strong>
                        </p>
                    </header>

                    {/* H2 Introducción */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <Activity className="w-8 h-8 text-red-500" />
                            La matemática del rebote
                        </h2>
                        <p>
                            Al estudiar el comportamiento corporativo frente al <strong>desarrollo web</strong>, las grandes consultoras han revelado una métrica cruda: por cada segundo extra que la pantalla de un usuario gasta "cargando la foto principal", <strong>el ratio de conversiones cae hasta un 20% de manera irreversible</strong>.
                        </p>
                        <p>
                            El problema fundamental de quienes no saben <strong>cómo crear una pagina</strong> de manera escalable técnica es el paradigma antiguo de un "Hosting Compartido". Alojar el código de tu empresa en un servidor saturado por cientos de otras páginas en simultáneo es como prender un Ferrari en medio de un embotellamiento.
                        </p>
                    </div>

                    {/* H2 Explicación Arquitectónica */}
                    <h2 className="text-3xl font-bold text-white mt-16 mb-6 flex items-center gap-3">
                        <Globe2 className="w-8 h-8 text-primary" />
                        Next.js y Hosting Perimetral (Edge)
                    </h2>

                    <p>
                        La frustración desaparece al adoptar arquitectura profesional. En la agencia de <strong>desarrollo web K&T</strong> construimos infraestructura, no plantillas, empleando estas reglas imperativas de Ingeniería y WPO:
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 my-10">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                            <GaugeCircle className="w-8 h-8 text-green-500 mb-4" />
                            <h3 className="text-xl font-bold text-white m-0 mb-2">Framework Estático</h3>
                            <p className="text-sm text-neutral-400 m-0">Transpilamos el código a HTML/CSS puros de forma adelantada, el navegador jamás debe procesar scripts inútiles al cargar.</p>
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
                            Toda cotización nuestra nace con garantía de Red
                        </h3>
                        <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
                            No juegues con tu embudo de ventas. Nuestro <strong>desarrollo web se aloja obligatoriamente en Vercel</strong>, garantizando que tu página responda sin caídas, picos de tráfico ni cuellos de botella. Esto no es un complemento opcional, es el estándar que garantizamos en cada acta técnica de diseño.
                        </p>
                        <a
                            href="https://wa.me/573116360057?text=Hola%20K%26T%2C%20le%C3%AD%20sobre%20el%20costo%20oculto%20de%20una%20web%20lenta.%20Quisiera%20auditar%20y%20mejorar%20la%20velocidad%20de%20mi%20proyecto."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold font-mono hover:bg-neutral-200 transition-colors w-full sm:w-auto"
                        >
                            Auditar la Velocidad de mi Proyecto Hoy
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                    </div>

                </article>
            </div>
        </main>
    )
}
