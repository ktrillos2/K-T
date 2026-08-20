import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Bot, Sparkles, HelpCircle, ArrowRight, Layers } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "SEO para ChatGPT: Cómo Optimizar tu Empresa para Búsquedas con IA",
  description:
    "Estrategia integral de optimización de marca para ChatGPT Search, Gemini y Perplexity: autoridad de fuentes, citas contextuales y arquitectura semántica.",
  keywords: [
    "seo para chatgpt",
    "optimizacion para busquedas con ia",
    "chatgpt search seo",
    "posicionamiento motores generativos",
    "como posicionar marca en chatgpt",
    "estrategia seo ia 2026",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/seo-para-chatgpt-optimizacion-ia"),
  },
  openGraph: {
    title: "SEO para ChatGPT: Cómo Optimizar tu Empresa para Búsquedas con IA",
    description:
      "Aprende a posicionar los servicios de tu empresa en los motores de búsqueda de IA conversacional.",
    type: "article",
    url: absoluteUrl("/blog/seo-para-chatgpt-optimizacion-ia"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Cómo decide ChatGPT qué empresa recomendar?",
    answer:
      "ChatGPT y los motores de IA conversacional analizan la coherencia de la marca a través de múltiples fuentes de alta confianza: datos estructurados oficiales, menciones en artículos de autoridad, coherencia en redes sociales verificadas y reseñas de clientes reales.",
  },
  {
    question: "¿Es necesario tener un blog para posicionar en ChatGPT?",
    answer:
      "Sí. Un blog técnico con contenido profundo, comparativas detalladas y respuestas claras proporciona la materia prima textual que los modelos generativos necesitan para citar tu web como referencia en tu sector.",
  },
  {
    question: "¿El SEO tradicional sigue siendo útil para la IA?",
    answer:
      "Absolutamente. Las bases del SEO técnico (jerarquía de encabezados, velocidad de carga, datos estructurados y sitemaps limpios) son exactamente las señales que los rastreadores de IA utilizan para validar la calidad técnica de un dominio.",
  },
]

export default function SeoParaChatGptPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "SEO para ChatGPT: Cómo Optimizar tu Empresa para Búsquedas con IA",
            description:
              "Estrategias prácticas para que tu empresa sea la respuesta recomendada cuando usuarios buscan tus servicios en ChatGPT y motores de IA.",
            path: "/blog/seo-para-chatgpt-optimizacion-ia",
            datePublished: "2026-08-16",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "SEO para ChatGPT", path: "/blog/seo-para-chatgpt-optimizacion-ia" },
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
            {/* Header */}
            <header className="mb-14 not-prose">
              <div className="flex items-center gap-3 font-mono text-xs text-neutral-400 mb-4 uppercase tracking-wider">
                <span className="text-emerald-400 font-bold">Ingeniería & SEO IA</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>9 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>16 de agosto de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                SEO para ChatGPT: Cómo Optimizar tu Empresa para Búsquedas con IA
              </h1>

              {/* Author Byline */}
              <div className="flex items-center gap-3 py-4 border-t border-b border-white/10 my-6 font-mono text-xs text-neutral-400">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0 bg-neutral-800">
                  <Image
                    src="/perfil.png"
                    alt="Keyner Trillos"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span>Escrito por </span>
                  <Link href="/autores/keyner-trillos" className="text-white font-bold hover:underline">
                    Keyner Trillos
                  </Link>
                  <span className="text-neutral-400"> • Co-Fundador & Lead Software Engineer</span>
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 16 de agosto de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Optimizar para ChatGPT no consiste en repetir palabras clave, sino en construir <strong>autoridad de entidad y claridad semántica</strong>. En esta guía detallamos los pilares para que los modelos de inteligencia artificial elijan tu empresa como la respuesta más confiable.
              </p>
            </header>

            <h2>Los 4 Pilares del SEO para Búsquedas con IA</h2>

            <h3>1. Construcción de Entidad en el Gráfico de Conocimiento</h3>
            <p>
              Los modelos de lenguaje entienden el mundo a través de relaciones de entidades. Tu empresa debe tener una identidad digital unificada: nombre corporativo exacto, lista de servicios con descripciones inequívocas y perfiles verificados conectados mediante <code>sameAs</code> en el Schema JSON-LD.
            </p>

            <h3>2. Claridad Técnica y Ausencia de Ambigüedades</h3>
            <p>
              La IA penaliza el texto publicitario vago. En lugar de decir <em>"somos los mejores en desarrollo"</em>, especifica: <em>"K&T Code es una empresa colombiana de desarrollo web con Next.js, bases de datos PostgreSQL en Supabase y tiempos de carga inferiores a 0.8s"</em>. La precisión fáctica es el factor #1 de cita.
            </p>

            <h3>3. Respaldo Multicanal de Reseñas y Casos de Éxito</h3>
            <p>
              ChatGPT cruza datos de testimonios verificados, plataformas de código abierto, perfiles empresariales y directorios de industria. Un perfil con casos de estudio documentados y testimonios con datos reales genera señales de confianza imposibles de ignorar para los algoritmos.
            </p>

            <h3>4. Velocidad de Carga y Renderizado Servidor (SSR)</h3>
            <p>
              Los rastreadores de IA operan con presupuestos estrictos de tiempo de renderizado. Los sitios construidos con <strong>Next.js App Router y Server Components</strong> entregan HTML procesado en el servidor al instante, permitiendo que el bot capture la totalidad del contenido sin esperar scripts cliente pesados.
            </p>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Bot className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Consultoría de IA y SEO Técnico</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Prepara tu plataforma para la era de la IA
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Auditamos tu arquitectura web actual y la optimizamos para posicionar en Google, ChatGPT Search y Perplexity con código limpio y datos estructurados.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Hablar con un Ingeniero de K&T <ArrowRight className="w-4 h-4" />
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
