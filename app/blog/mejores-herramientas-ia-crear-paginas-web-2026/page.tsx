import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Cpu, HelpCircle, ArrowRight, Sparkles, Wrench } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Las Mejores Herramientas de IA para Crear Páginas Web en 2026",
  description:
    "Revisión y comparativa de las mejores herramientas de inteligencia artificial para diseño, programación y optimización de páginas web en 2026.",
  keywords: [
    "mejores herramientas ia crear paginas web 2026",
    "ia para desarrollo web",
    "creadores de paginas web con ia",
    "v0 dev cursor ai chatgpt",
    "herramientas ia diseno web",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/mejores-herramientas-ia-crear-paginas-web-2026"),
  },
  openGraph: {
    title: "Las Mejores Herramientas de IA para Crear Páginas Web en 2026",
    description:
      "Descubre el stack de herramientas con IA que utilizan las agencias de software más productivas del mundo.",
    type: "article",
    url: absoluteUrl("/blog/mejores-herramientas-ia-crear-paginas-web-2026"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Cuáles son las herramientas de IA más destacadas en 2026?",
    answer:
      "Las líderes en la industria incluyen: Cursor (IDE con IA integrada), v0 by Vercel (generación de componentes React en Tailwind), Midjourney / Imagen 3 (activos visuales) y ChatGPT / Claude (lógica y arquitectura de contenidos).",
  },
  {
    question: "¿Reemplazarán las herramientas de IA a las agencias de desarrollo web?",
    answer:
      "No. La IA acelera la escritura de código repetitivo, pero la estrategia de negocio, la arquitectura de seguridad, la integración con pasarelas de pago y el SEO técnico de alto nivel requieren la visión y criterio de ingenieros expertos.",
  },
]

export default function MejoresHerramientasIaWebPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Las Mejores Herramientas de IA para Crear Páginas Web en 2026",
            description:
              "Análisis comparativo de las soluciones de inteligencia artificial más potentes para diseño y desarrollo web.",
            path: "/blog/mejores-herramientas-ia-crear-paginas-web-2026",
            datePublished: "2026-06-28",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Herramientas IA Web", path: "/blog/mejores-herramientas-ia-crear-paginas-web-2026" },
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
                <span className="text-emerald-400 font-bold">Ingeniería & IA</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>9 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>28 de junio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Las Mejores Herramientas de IA para Crear Páginas Web en 2026
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 28 de junio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                En 2026, el desarrollo web no se entiende sin asistentes de inteligencia artificial. Analizamos las mejores herramientas que maximizan la velocidad y calidad del código moderno.
              </p>
            </header>

            <h2>El Top 4 de Herramientas IA para Desarrollo Web</h2>
            <ul>
              <li><strong>Cursor:</strong> El editor de código impulsado por IA más avanzado, capaz de refactorizar arquitecturas completas y escribir tests unitarios contextuales.</li>
              <li><strong>v0 by Vercel:</strong> Generación instantánea de interfaces accesibles en React y Tailwind CSS a partir de descripciones en lenguaje natural.</li>
              <li><strong>ChatGPT Plus & Claude 3.5 Sonnet:</strong> Redacción de contenidos, estructuración semántica y resolución de problemas algorítmicos complejos.</li>
              <li><strong>Perplexity Pro:</strong> Búsqueda técnica en tiempo real para validar las últimas APIs y librerías del ecosistema de software.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Cpu className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Ingeniería de Vanguardia</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Tu proyecto desarrollado con los más altos estándares
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Utilizamos el stack más avanzado de la industria para entregar plataformas robustas, escalables y con rendimiento perfecto.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Solicitar Cotización de Software <ArrowRight className="w-4 h-4" />
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
