import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Search, HelpCircle, ArrowRight, TrendingUp, Cpu } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Qué es el SEO y Cómo Funciona: Guía Definitiva para Principiantes",
  description:
    "Aprende qué es el SEO (Search Engine Optimization) y cómo funciona el algoritmo de Google: SEO On-page, SEO técnico, palabras clave y autoridad.",
  keywords: [
    "que es el seo y como funciona",
    "guia seo para principiantes",
    "como funciona el algoritmo de google",
    "seo on page y seo tecnico",
    "posicionamiento web organico colombia",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/que-es-el-seo-y-como-funciona-guia"),
  },
  openGraph: {
    title: "Qué es el SEO y Cómo Funciona: Guía Definitiva para Principiantes",
    description:
      "Aprende las bases fundamentales del posicionamiento web orgánico para atraer clientes de forma constante sin pagar por cada clic.",
    type: "article",
    url: absoluteUrl("/blog/que-es-el-seo-y-como-funciona-guia"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Cuál es la diferencia entre SEO y SEM (Google Ads)?",
    answer:
      "En SEM (publicidad pagada), pagas por cada clic y el tráfico se detiene en cuanto apagas la campaña. En SEO (posicionamiento orgánico), construyes activos técnicos y de contenido que atraen visitas gratuitas y constantes mes tras mes.",
  },
  {
    question: "¿Cuánto tiempo toma ver resultados con SEO?",
    answer:
      "Generalmente los resultados sólidos comienzan a verse entre los 3 y 6 meses de trabajo continuo, dependiendo de la competencia del sector y la autoridad inicial del dominio.",
  },
]

export default function QueEsElSeoGuiaPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Qué es el SEO y Cómo Funciona: Guía Definitiva para Principiantes",
            description:
              "Guía paso a paso sobre el funcionamiento del posicionamiento orgánico en motores de búsqueda.",
            path: "/blog/que-es-el-seo-y-como-funciona-guia",
            datePublished: "2026-08-10",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Qué es el SEO", path: "/blog/que-es-el-seo-y-como-funciona-guia" },
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
                <span className="text-emerald-400 font-bold">Ingeniería & SEO</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>10 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>10 de agosto de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Qué es el SEO y Cómo Funciona: Guía Definitiva para Principiantes
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 10 de agosto de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                El <strong>SEO (Search Engine Optimization)</strong> es el conjunto de técnicas y metodologías de ingeniería que permiten a una página web ubicarse en las primeras posiciones de Google cuando un usuario busca un servicio o producto relevante.
              </p>
            </header>

            <h2>Los 3 Pilares Fundamentales del SEO</h2>

            <h3>1. SEO Técnico (La Base del Sitio Web)</h3>
            <p>
              Garantiza que Google pueda rastrear e interpretar la web sin obstáculos: velocidad de carga sub-segundo, renderizado en servidor (SSR), arquitectura responsive y etiquetas Schema JSON-LD.
            </p>

            <h3>2. SEO On-Page (Contenido y Palabras Clave)</h3>
            <p>
              Estructuración lógica del texto resolviendo la intención de búsqueda del usuario, utilizando encabezados <code>H1, H2, H3</code> bien organizados y enlazado interno estratégico.
            </p>

            <h3>3. SEO Off-Page (Autoridad y Enlaces de Confianza)</h3>
            <p>
              Menciones de marca, enlaces entrantes (backlinks) de medios especializados y señales de confiabilidad en redes sociales.
            </p>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">SEO Técnico en K&T Code</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Posiciona tu empresa en Google de forma orgánica
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Desarrollamos páginas web con optimización SEO integrada desde la primera línea de código para multiplicar tu visibilidad orgánica.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Solicitar Consultoría SEO <ArrowRight className="w-4 h-4" />
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
