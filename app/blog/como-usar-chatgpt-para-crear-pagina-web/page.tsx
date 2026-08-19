import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Bot, Sparkles, HelpCircle, ArrowRight, Code2 } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Cómo Usar ChatGPT para Crear una Página Web: Prompts, Código y Estrategia | K&T Code",
  description:
    "Aprende a potenciar el desarrollo web con ChatGPT: generación de componentes React, redacción de textos persuasivos (copywriting) y optimización SEO.",
  keywords: [
    "como usar chatgpt para crear pagina web",
    "chatgpt desarrollo web",
    "prompts chatgpt para paginas web",
    "crear codigo html react con chatgpt",
    "inteligencia artificial para programar web",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/como-usar-chatgpt-para-crear-pagina-web"),
  },
  openGraph: {
    title: "Cómo Usar ChatGPT para Crear una Página Web: Prompts, Código y Estrategia",
    description:
      "Guía práctica para aprovechar la IA generativa en el diseño y programación de sitios web profesionales.",
    type: "article",
    url: absoluteUrl("/blog/como-usar-chatgpt-para-crear-pagina-web"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Puede ChatGPT crear una página web completa por sí solo?",
    answer:
      "ChatGPT puede generar fragmentos de código HTML, CSS o componentes React, pero no puede configurar la infraestructura en la nube, gestionar la seguridad de las bases de datos ni optimizar el rendimiento real de producción sin supervisión de un ingeniero.",
  },
  {
    question: "¿En qué tareas de desarrollo web es más útil ChatGPT?",
    answer:
      "Es extraordinariamente útil para redactar borradores de contenido, estructurar esquemas de datos JSON-LD, crear pruebas unitarias y acelerar la creación de componentes modulares.",
  },
]

export default function ComoUsarChatGptWebPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Cómo Usar ChatGPT para Crear una Página Web: Prompts, Código y Estrategia",
            description:
              "Aprende cómo desarrolladores y diseñadores utilizan ChatGPT para acelerar la creación de plataformas digitales modernas.",
            path: "/blog/como-usar-chatgpt-para-crear-pagina-web",
            datePublished: "2026-07-04",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "ChatGPT para Crear Web", path: "/blog/como-usar-chatgpt-para-crear-pagina-web" },
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
                <span>9 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>4 de julio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Cómo Usar ChatGPT para Crear una Página Web: Prompts, Código y Estrategia
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 4 de julio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                La inteligencia artificial ha revolucionado la velocidad con la que se conciben y construyen sitios web. Conoce cómo integrar ChatGPT en el flujo de trabajo de desarrollo sin comprometer la calidad ni la seguridad técnica.
              </p>
            </header>

            <h2>4 Casos de Uso Reales de ChatGPT en Desarrollo Web</h2>
            <ul>
              <li><strong>Redacción de Propuestas de Valor y Copys:</strong> Generar textos persuasivos para secciones Hero, características y beneficios adaptados a tu cliente ideal.</li>
              <li><strong>Estructuración de Esquemas JSON-LD:</strong> Crear datos estructurados válidos de Schema.org para productos, FAQs y negocios locales.</li>
              <li><strong>Generación de Componentes Modulares:</strong> Acelerar la maquetación de tarjetas, carruseles y modales en React y Tailwind CSS.</li>
              <li><strong>Optimización de Consultas SQL y APIs:</strong> Crear consultas eficientes para bases de datos relacionales en PostgreSQL / Supabase.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Sparkles className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Ingeniería Web con IA</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Potenciamos tu web con las últimas tecnologías
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Combinamos inteligencia artificial con ingeniería de software rigurosa en Next.js para entregar proyectos un 40% más rápido.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Iniciar Proyecto con K&T <ArrowRight className="w-4 h-4" />
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
