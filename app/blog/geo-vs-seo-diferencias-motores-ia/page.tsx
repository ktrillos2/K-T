import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Zap, HelpCircle, ArrowRight, Layers, Cpu } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"
import RelatedPosts from "@/components/blog/related-posts"

export const metadata: Metadata = {
  title: "GEO vs. SEO: Diferencias y Cómo Preparar una Web para Motores de IA",
  description:
    "Comparativa exhaustiva entre SEO tradicional y GEO (Generative Engine Optimization). Qué cambia en los motores de búsqueda con IA y cómo adaptar tu arquitectura.",
  keywords: [
    "geo vs seo",
    "diferencias geo y seo",
    "generative engine optimization",
    "optimizacion motores ia",
    "como preparar web para ia",
    "futuro del seo 2026",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/geo-vs-seo-diferencias-motores-ia"),
  },
  openGraph: {
    title: "GEO vs. SEO: Diferencias Clave y Cómo Preparar tu Web para Motores de IA",
    description:
      "Descubre cómo la optimización para motores generativos (GEO) complementa y transforma el SEO técnico tradicional.",
    type: "article",
    url: absoluteUrl("/blog/geo-vs-seo-diferencias-motores-ia"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿El GEO reemplazará completamente al SEO?",
    answer:
      "No. El GEO no reemplaza al SEO, sino que es su evolución natural. Un sitio con mala estructura técnica, enlaces rotos o sin datos Schema fallará tanto en Google como en ChatGPT y Perplexity.",
  },
  {
    question: "¿Cuál es la principal métrica de éxito en GEO?",
    answer:
      "Mientras que en SEO tradicional se mide la posición en SERP y el tráfico orgánico, en GEO se mide la tasa de mención como fuente recomendada (Citation Share) y la exactitud con la que el modelo describe tus productos o servicios.",
  },
]

export default function GeoVsSeoPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "GEO vs. SEO: Diferencias Clave y Cómo Preparar tu Web para Motores de IA",
            description:
              "Análisis técnico de las diferencias entre Search Engine Optimization tradicional y Generative Engine Optimization.",
            path: "/blog/geo-vs-seo-diferencias-motores-ia",
            datePublished: "2026-08-12",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "GEO vs SEO", path: "/blog/geo-vs-seo-diferencias-motores-ia" },
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
                <span>7 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>12 de agosto de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                GEO vs. SEO: Diferencias y Cómo Preparar una Web para Motores de IA
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 12 de agosto de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                El paso del algoritmo de búsqueda por palabras clave a los modelos generativos ha dado origen al concepto de <strong>GEO (Generative Engine Optimization)</strong>. Analizamos qué cambia y qué debes implementar hoy mismo en tu web.
              </p>
            </header>

            <h2>Tabla Comparativa: SEO Tradicional vs. GEO (IA)</h2>
            <div className="not-prose overflow-x-auto my-8 border border-white/15 rounded-2xl">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <thead className="bg-neutral-900 border-b border-white/10 text-white">
                  <tr>
                    <th className="p-4">Criterio</th>
                    <th className="p-4 text-neutral-300">SEO Tradicional</th>
                    <th className="p-4 text-emerald-400">GEO (Motores de IA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-neutral-300">
                  <tr>
                    <td className="p-4 font-bold text-white">Objetivo Principal</td>
                    <td className="p-4">Posición en los 10 enlaces azules (SERP)</td>
                    <td className="p-4">Ser citado como la fuente de respuesta sintetizada</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Consumo del Contenido</td>
                    <td className="p-4">Clic del usuario en el enlace orgánico</td>
                    <td className="p-4">Extracción y lectura semántica por el LLM</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Estructura Ideal</td>
                    <td className="p-4">Palabras clave en títulos y párrafos</td>
                    <td className="p-4">Entidades Schema, tablas y definiciones precisas</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Métrica Clave</td>
                    <td className="p-4">Impresiones, clics y CTR</td>
                    <td className="p-4">Share of Voice y citas de recomendación</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Cómo Adaptar tu Web para GEO</h2>
            <p>
              Para ganar visibilidad en ChatGPT, Claude y Perplexity:
            </p>
            <ul>
              <li><strong>Desacopla el contenido con arquitecturas Headless:</strong> Entregar contenido en JSON estructurado a través de APIs acelera la ingestión por agentes de búsqueda.</li>
              <li><strong>Optimiza Core Web Vitals y métricas de rendimiento:</strong> Los bots de IA tienen límites de cómputo y priorizan páginas con tiempos de respuesta instantáneos.</li>
              <li><strong>Evita el contenido relleno o clickbait:</strong> Los LLMs descartan rápidamente textos con baja densidad de información útil.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Cpu className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Desarrollo Web Preparado para el Futuro</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Construye tu web con ingeniería Next.js y SEO IA
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Desarrollamos plataformas empresariales con código limpio, arquitectura semántica y optimización para todos los motores de búsqueda actuales y futuros.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Solicitar Cotización de Proyecto <ArrowRight className="w-4 h-4" />
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

            <RelatedPosts currentSlug="geo-vs-seo-diferencias-motores-ia" category="Ingeniería & SEO" />
          </article>
        </div>
      </main>

      <Footer />
    </>
  )
}
