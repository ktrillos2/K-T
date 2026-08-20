import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Bot, Sparkles, HelpCircle, ArrowRight, ShieldCheck, Zap } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Cómo hacer que una página web aparezca en ChatGPT en 2026",
  description:
    "Guía técnica de GEO (Generative Engine Optimization): aprende a optimizar tu sitio web para ser citado e indexado por ChatGPT Search, GPTBot y motores de IA.",
  keywords: [
    "como aparecer en chatgpt",
    "geo generative engine optimization",
    "seo para chatgpt 2026",
    "gptbot indexacion",
    "posicionamiento en inteligencia artificial",
    "optimizacion para llms",
    "como citar mi web en chatgpt",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/como-aparecer-en-chatgpt-2026"),
  },
  openGraph: {
    title: "Cómo hacer que una página web aparezca en ChatGPT en 2026",
    description:
      "Aprende a posicionar tu marca en ChatGPT Search, Perplexity y motores de respuesta con IA mediante arquitectura semántica y optimización GEO.",
    type: "article",
    url: absoluteUrl("/blog/como-aparecer-en-chatgpt-2026"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Qué rastreador utiliza ChatGPT para leer mi página web?",
    answer:
      "OpenAI utiliza principalmente el user-agent GPTBot para entrenamiento y rastreo web, así como ChatGPT-User para consultas en tiempo real de ChatGPT Search. Para permitir que lean tu contenido, tu archivo robots.txt debe permitir el acceso a estos bots.",
  },
  {
    question: "¿Qué es GEO (Generative Engine Optimization)?",
    answer:
      "GEO es el conjunto de prácticas de ingeniería web y redacción semántica diseñadas para que los Modelos de Lenguaje Grande (LLMs) como ChatGPT, Claude y Gemini comprendan, citen y recomienden tu empresa como fuente autorizada.",
  },
  {
    question: "¿Los datos estructurados Schema.org ayudan a aparecer en ChatGPT?",
    answer:
      "Sí, de forma determinante. Los formatos JSON-LD con tipos como Organization, Service, Product y FAQPage proporcionan entidades limpias y relaciones de conocimiento inequívocas que los modelos de lenguaje procesan con máxima prioridad.",
  },
]

export default function ComoAparecerEnChatGptPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Cómo hacer que una página web aparezca en ChatGPT en 2026",
            description:
              "Guía técnica de GEO: aprende a optimizar tu arquitectura web para que ChatGPT, Perplexity y los motores de IA citen y recomienden tu empresa.",
            path: "/blog/como-aparecer-en-chatgpt-2026",
            datePublished: "2026-08-19",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Aparecer en ChatGPT", path: "/blog/como-aparecer-en-chatgpt-2026" },
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
                <span>8 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>19 de agosto de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Cómo hacer que una página web aparezca en ChatGPT en 2026
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 19 de agosto de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                En 2026, la búsqueda de información ha evolucionado radicalmente. Los usuarios ya no solo hacen clic en los 10 enlaces azules de Google; consultan directamente a <strong>ChatGPT Search, Perplexity y Gemini</strong> para tomar decisiones de compra. Descubre cómo optimizar tu arquitectura web para que los modelos generativos recomienden tu negocio.
              </p>
            </header>

            <h2>1. Configuración de Rastreo: Acceso a GPTBot y ChatGPT-User</h2>
            <p>
              El primer paso técnico indispensable es asegurarte de que los crawlers de OpenAI tienen autorización para inspeccionar tu dominio. Muchos sitios web bloquean por error estos agentes en su archivo <code>robots.txt</code>.
            </p>
            <div className="not-prose bg-neutral-900 border border-white/10 rounded-2xl p-5 font-mono text-xs text-neutral-300 my-6 overflow-x-auto">
              <p className="text-emerald-400 font-bold mb-2">// Configuración recomendada en robots.txt</p>
              <pre className="text-neutral-200">
{`User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /`}
              </pre>
            </div>

            <h2>2. Implementación de Datos Estructurados (Schema JSON-LD)</h2>
            <p>
              Los modelos de lenguaje procesan con mayor precisión la información estructurada que el texto desordenado. Implementar <strong>Schema.org JSON-LD</strong> le proporciona a la IA relaciones de entidad claras sobre qué ofrece tu empresa, quiénes son sus fundadores y sus precios oficiales.
            </p>
            <ul>
              <li><strong>Organization / LocalBusiness:</strong> Nombre oficial, logotipo, fundadores, ubicación y redes verificadas (<code>sameAs</code>).</li>
              <li><strong>Service & Product:</strong> Precios exactos, monedas (COP, USD) y características técnicas sin ambigüedades.</li>
              <li><strong>FAQPage:</strong> Respuestas directas a preguntas frecuentes estructuradas en pares pregunta-respuesta.</li>
            </ul>

            <h2>3. Arquitectura de Contenido Directo: El Modelo Respuesta-Primero</h2>
            <p>
              ChatGPT extrae fragmentos que responden de forma precisa y objetiva a las intenciones del usuario. Para maximizar las probabilidades de ser citado:
            </p>
            <ul>
              <li><strong>Definición en el primer párrafo:</strong> Define el concepto o servicio en las primeras 40 palabras bajo un encabezado <code>H2</code> o <code>H3</code>.</li>
              <li><strong>Tablas comparativas en HTML puro:</strong> Las tablas semánticas son fácilmente procesadas y sintetizadas por los LLMs al formular recomendaciones.</li>
              <li><strong>Cifras y datos verificables:</strong> Incluye rangos de precios, metodologías y datos concretos en lugar de adjetivos genéricos.</li>
            </ul>

            <h2>4. Formato llms.txt para Indexación Especializada</h2>
            <p>
              El estándar emergente <code>/llms.txt</code> permite a los desarrolladores resumir de forma limpia toda la documentación y propuesta de valor de la empresa en texto plano con enlaces markdown, facilitando a los agentes autónomos de IA el consumo directo de tu información sin sobrecargar el servidor.
            </p>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Sparkles className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Posicionamiento IA en K&T Code</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                ¿Quieres que tu empresa sea recomendada por ChatGPT?
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Diseñamos arquitecturas web de alto rendimiento en Next.js con optimización GEO, datos estructurados Schema completos y entrega rápida en Edge CDN.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Cotizar Arquitectura Web con SEO IA <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <h2>Preguntas Frecuentes sobre Posicionamiento en ChatGPT</h2>
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
