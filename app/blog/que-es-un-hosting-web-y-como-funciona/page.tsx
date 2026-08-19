import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Server, HelpCircle, ArrowRight, Zap, Shield } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Qué es un Hosting Web y Cómo Funciona: Servidores, Tipos y Guía | K&T Code",
  description:
    "Aprende qué es el alojamiento web (hosting), cómo funciona un servidor y las diferencias entre hosting compartido, VPS y arquitecturas Edge Serverless en 2026.",
  keywords: [
    "que es un hosting web y como funciona",
    "tipos de hosting web colombia",
    "hosting compartido vs vps",
    "edge hosting serverless",
    "alojamiento web que es",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/que-es-un-hosting-web-y-como-funciona"),
  },
  openGraph: {
    title: "Qué es un Hosting Web y Cómo Funciona: Servidores, Tipos y Guía",
    description:
      "Descubre cómo se almacenan las páginas web y por qué la infraestructura Edge Serverless es el estándar de velocidad moderno.",
    type: "article",
    url: absoluteUrl("/blog/que-es-un-hosting-web-y-como-funciona"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Qué es el hosting Serverless o Edge Network?",
    answer:
      "A diferencia del hosting tradicional que depende de un único servidor físico (que puede colapsar con alto tráfico), el hosting Edge distribuye réplicas de tu sitio en cientos de centros de datos globales, entregando la web desde el punto más cercano al usuario en milisegundos.",
  },
  {
    question: "¿Cuánto cuesta el hosting para una página web?",
    answer:
      "Un hosting tradicional básico cuesta entre $4 y $15 USD mensuales. En arquitecturas modernas en Next.js alojadas en redes Edge (como Vercel o Cloudflare), el costo de infraestructura suele ser de $0 a $20 USD mensuales para sitios corporativos.",
  },
]

export default function QueEsUnHostingWebPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Qué es un Hosting Web y Cómo Funciona: Servidores, Tipos y Guía",
            description:
              "Explicación completa y accesible de los tipos de alojamiento web y su impacto en la velocidad de tu sitio.",
            path: "/blog/que-es-un-hosting-web-y-como-funciona",
            datePublished: "2026-07-27",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Qué es un Hosting", path: "/blog/que-es-un-hosting-web-y-como-funciona" },
          ]),
          buildFaqJsonLd(faqs),
        ]}
      />

      <main className="min-h-screen bg-black pt-32 pb-24 px-4 sm:px-6 text-white">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white font-mono text-sm mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Blog
          </Link>

          <article className="prose prose-invert prose-lg max-w-none prose-headings:font-title prose-a:text-white hover:prose-a:text-neutral-300">
            <header className="mb-14 not-prose">
              <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 mb-4 uppercase tracking-wider">
                <span className="text-emerald-400 font-bold">Precios & Guías</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>8 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>27 de julio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Qué es un Hosting Web y Cómo Funciona: Servidores, Tipos y Guía
              </h1>

              <div className="flex items-center gap-3 py-4 border-t border-b border-white/10 my-6 font-mono text-xs text-neutral-400">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0 bg-neutral-800">
                  <Image src="/perfil.png" alt="Keyner Trillos" fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <span>Escrito por </span>
                  <Link href="/autores/keyner-trillos" className="text-white font-bold hover:underline">
                    Keyner Trillos
                  </Link>
                  <span className="text-neutral-400"> • Co-Fundador & Lead Software Engineer</span>
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 27 de julio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                El <strong>hosting web (o alojamiento web)</strong> es el servicio de almacenamiento que guarda todos los archivos, imágenes, código y bases de datos de tu sitio en servidores conectados a internet las 24 horas del día.
              </p>
            </header>

            <h2>Tipos Principales de Hosting</h2>
            <ul>
              <li><strong>Hosting Compartido:</strong> Cientos de sitios web comparten la memoria y CPU de un mismo servidor. Es económico pero lento e inestable bajo picos de tráfico.</li>
              <li><strong>VPS (Servidor Privado Virtual):</strong> Recursos dedicados garantizados mediante virtualización, ideal para aplicaciones medianas.</li>
              <li><strong>Servidores Dedicados:</strong> Una máquina física completa para un único cliente de alta demanda empresarial.</li>
              <li><strong>Edge Network / Serverless (Estándar Moderno de K&T):</strong> Despliegue global en servidores distribuidos perimetrales que escalan automáticamente al instante sin riesgo de caída.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Server className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Infraestructura de Alto Rendimiento</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Despliegue ultrarrápido con 99.99% de disponibilidad
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Olvídate de servidores lentos y caídas inesperadas. En K&T Code desplegamos todas las aplicaciones en redes Edge con tiempos de respuesta récord.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Conocer Nuestra Arquitectura Cloud <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <h2>Preguntas Frecuentes</h2>
            <div className="not-prose space-y-4 my-8">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h3 className="font-title font-bold text-lg text-white mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="font-mono text-sm text-neutral-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  )
}
