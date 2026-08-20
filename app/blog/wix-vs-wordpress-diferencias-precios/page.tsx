import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Layers, HelpCircle, ArrowRight, DollarSign } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Wix vs. WordPress: Diferencias, Precios y Cuál Elegir en 2026",
  description:
    "Comparativa objetiva entre Wix y WordPress: facilidad de uso, precios de planes y renovaciones, rendimiento de velocidad y flexibilidad técnica en 2026.",
  keywords: [
    "wix vs wordpress",
    "diferencias wix y wordpress",
    "precios wix colombia",
    "wordpress o wix para negocio",
    "desventajas de wix",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/wix-vs-wordpress-diferencias-precios"),
  },
  openGraph: {
    title: "Wix vs. WordPress: Diferencias, Precios Reales y Cuál Elegir en 2026",
    description:
      "Tabla comparativa de costos, control de diseño y posicionamiento SEO entre Wix y WordPress.",
    type: "article",
    url: absoluteUrl("/blog/wix-vs-wordpress-diferencias-precios"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Es posible migrar de Wix a otra plataforma si mi empresa crece?",
    answer:
      "Wix es un sistema cerrado (walled garden), lo que significa que no permite exportar el código fuente ni la base de datos. Si decides migrar a una web profesional en el futuro, tendrás que reconstruir todo el sitio desde cero.",
  },
  {
    question: "¿Cuál es más económico para un negocio en Colombia?",
    answer:
      "WordPress con hosting propio suele costar una fracción del precio de los planes premium de Wix, además de evitar aumentos automáticos en las renovaciones anuales.",
  },
]

export default function WixVsWordPressPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Wix vs. WordPress: Diferencias, Precios Reales y Cuál Elegir en 2026",
            description:
              "Comparativa entre el creador visual de Wix y la arquitectura abierta de WordPress.",
            path: "/blog/wix-vs-wordpress-diferencias-precios",
            datePublished: "2026-07-18",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Wix vs WordPress", path: "/blog/wix-vs-wordpress-diferencias-precios" },
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
                <span className="text-emerald-400 font-bold">Comparativas</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>8 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>18 de julio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Wix vs. WordPress: Diferencias, Precios Reales y Cuál Elegir en 2026
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 18 de julio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Elegir entre la facilidad de arrastrar y soltar de <strong>Wix</strong> y la escalabilidad de <strong>WordPress</strong> es un dilema común. Analizamos los aspectos clave de costo, rendimiento y SEO.
              </p>
            </header>

            <h2>Comparativa de Aspectos Clave</h2>
            <div className="not-prose overflow-x-auto my-8 border border-white/15 rounded-2xl">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <thead className="bg-neutral-900 border-b border-white/10 text-white">
                  <tr>
                    <th className="p-4">Criterio</th>
                    <th className="p-4 text-neutral-300">Wix</th>
                    <th className="p-4 text-emerald-400">WordPress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-neutral-300">
                  <tr>
                    <td className="p-4 font-bold text-white">Facilidad de Inicio</td>
                    <td className="p-4 text-emerald-400">Muy alta (Drag & Drop)</td>
                    <td className="p-4">Media (Curva de aprendizaje)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Propiedad y Portabilidad</td>
                    <td className="p-4 text-rose-400">0% (No exportable)</td>
                    <td className="p-4 text-emerald-400">100% (Código libre)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Velocidad Core Web Vitals</td>
                    <td className="p-4 text-amber-400">Moderada (Scripts pesados)</td>
                    <td className="p-4 text-emerald-400">Alta con caché y optimización</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Layers className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Desarrollo Web Sin Restricciones</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Supera los límites de los constructores visuales
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Construimos plataformas en Next.js con rendimiento superior al de cualquier CMS tradicional, sin ataduras a plataformas propietarias.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Solicitar Cotización Web <ArrowRight className="w-4 h-4" />
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
