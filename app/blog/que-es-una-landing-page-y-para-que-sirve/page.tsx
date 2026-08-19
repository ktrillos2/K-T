import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Target, HelpCircle, ArrowRight, Zap, MousePointerClick } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Qué es una Landing Page y Para Qué Sirve: Guía de Conversión | K&T Code",
  description:
    "Aprende qué es una landing page (página de aterrizaje), en qué se diferencia de un sitio web corporativo y cómo diseñar páginas que conviertan visitas en clientes en pauta digital.",
  keywords: [
    "que es una landing page y para que sirve",
    "diferencia landing page y pagina web",
    "como crear landing page que convierta",
    "diseno de landing page colombia",
    "landing page para meta ads y google ads",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/que-es-una-landing-page-y-para-que-sirve"),
  },
  openGraph: {
    title: "Qué es una Landing Page y Para Qué Sirve: Guía de Conversión",
    description:
      "Descubre cómo una landing page optimizada multiplica el retorno de inversión de tus campañas publicitarias.",
    type: "article",
    url: absoluteUrl("/blog/que-es-una-landing-page-y-para-que-sirve"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Por qué no enviar el tráfico de mis anuncios de Instagram o Google a la página de inicio?",
    answer:
      "La página de inicio tiene múltiples enlaces de navegación y menús que distraen al usuario. Una landing page elimina las distracciones y enfoca toda la atención en un único llamado a la acción (CTA), aumentando la tasa de conversión hasta en un 300%.",
  },
  {
    question: "¿Qué elementos son obligatorios en una buena landing page?",
    answer:
      "Una propuesta de valor clara en el primer pliegue visual (Hero), prueba social (testimonios y clientes), beneficios específicos del producto o servicio, formulario de contacto simplificado o botón directo de WhatsApp.",
  },
]

export default function QueEsUnaLandingPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Qué es una Landing Page y Para Qué Sirve: Guía de Conversión",
            description:
              "Aprende cómo estructurar páginas de aterrizaje de alto rendimiento para tus campañas de pauta digital.",
            path: "/blog/que-es-una-landing-page-y-para-que-sirve",
            datePublished: "2026-06-16",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Qué es una Landing Page", path: "/blog/que-es-una-landing-page-y-para-que-sirve" },
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
                <span>16 de junio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Qué es una Landing Page y Para Qué Sirve: Guía de Conversión
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 16 de junio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Una <strong>landing page (o página de aterrizaje)</strong> es una página web diseñada con un único objetivo específico: transformar al visitante en un cliente potencial (lead) o comprador, eliminando cualquier distracción innecesaria.
              </p>
            </header>

            <h2>Diferencias entre un Sitio Web y una Landing Page</h2>
            <div className="not-prose overflow-x-auto my-8 border border-white/15 rounded-2xl">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <thead className="bg-neutral-900 border-b border-white/10 text-white">
                  <tr>
                    <th className="p-4">Aspecto</th>
                    <th className="p-4 text-neutral-300">Sitio Web Corporativo</th>
                    <th className="p-4 text-emerald-400">Landing Page de Campaña</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-neutral-300">
                  <tr>
                    <td className="p-4 font-bold text-white">Objetivo</td>
                    <td className="p-4">Informar, presentar la empresa y explorar</td>
                    <td className="p-4 text-emerald-400">1 sola acción: compra o cotización</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Navegación / Menús</td>
                    <td className="p-4">Menús con múltiples páginas</td>
                    <td className="p-4 text-emerald-400">Sin menús de fuga</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Tráfico Principal</td>
                    <td className="p-4">Búsquedas orgánicas directas</td>
                    <td className="p-4 text-emerald-400">Meta Ads, Google Ads o campañas de email</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Target className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Landing Pages de Alta Conversión</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Convierte más clics en clientes reales
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Diseñamos landing pages ultra rápidas en Next.js optimizadas para tus campañas de Meta Ads y Google Ads con integración directa a WhatsApp.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Cotizar Landing Page <ArrowRight className="w-4 h-4" />
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
