import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle, ArrowRight, Layers, BarChart3 } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Software a Medida vs. SaaS: Costos, Ventajas y Cuándo Elegir Cada Uno",
  description:
    "Análisis comparativo entre pagar suscripciones SaaS comerciales vs. desarrollar software a medida propietario: retorno de inversión (ROI), escalabilidad y costos.",
  keywords: [
    "software a medida vs saas",
    "saas vs desarrollo a medida",
    "ventajas software propio",
    "costos saas empresas colombia",
    "cuando desarrollar software a medida",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/software-a-medida-vs-saas-comparativa"),
  },
  openGraph: {
    title: "Software a Medida vs. SaaS: Costos, Ventajas y Cuándo Elegir Cada Uno",
    description:
      "Descubre cuándo conviene pagar licencias mensuales de SaaS y cuándo el desarrollo de software a medida genera un retorno superior.",
    type: "article",
    url: absoluteUrl("/blog/software-a-medida-vs-saas-comparativa"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Cuándo es más rentable el software a medida que un SaaS?",
    answer:
      "El software a medida se vuelve sustancialmente más rentable cuando el costo recurrente de licencias por usuario supera los $500 - $1.000 USD mensuales, o cuando los procesos operativos de tu empresa requieren personalizaciones que ningún SaaS comercial permite.",
  },
  {
    question: "¿Quién es el dueño del código en un desarrollo a medida?",
    answer:
      "En K&T Code, el cliente es el propietario legal del 100% del código fuente, las bases de datos y la propiedad intelectual del proyecto, sin dependencias ni tarifas ocultas de licenciamiento.",
  },
]

export default function SoftwareMedidaVsSaasPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Software a Medida vs. SaaS: Costos, Ventajas y Cuándo Elegir Cada Uno",
            description:
              "Comparativa económica y estratégica entre suscribirse a un SaaS o construir software propietario a medida para tu empresa.",
            path: "/blog/software-a-medida-vs-saas-comparativa",
            datePublished: "2026-07-29",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Software a Medida vs SaaS", path: "/blog/software-a-medida-vs-saas-comparativa" },
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
                <span className="text-emerald-400 font-bold">Comparativas</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>8 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>29 de julio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Software a Medida vs. SaaS: Costos, Ventajas y Cuándo Elegir Cada Uno
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 29 de julio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Muchas empresas inician utilizando plataformas SaaS existentes para resolver necesidades inmediatas, pero a medida que el equipo crece, las tarifas por usuario mensual se vuelven insostenibles. Analizamos cuándo construir tu propio software a medida.
              </p>
            </header>

            <h2>Comparativa Estratégica</h2>
            <div className="not-prose overflow-x-auto my-8 border border-white/15 rounded-2xl">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <thead className="bg-neutral-900 border-b border-white/10 text-white">
                  <tr>
                    <th className="p-4">Aspecto</th>
                    <th className="p-4 text-neutral-300">SaaS Comercial</th>
                    <th className="p-4 text-emerald-400">Software a Medida</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-neutral-300">
                  <tr>
                    <td className="p-4 font-bold text-white">Costo Inicial</td>
                    <td className="p-4">Bajo (pago mensual inmediato)</td>
                    <td className="p-4">Inversión inicial de desarrollo</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Costo a Largo Plazo (3+ años)</td>
                    <td className="p-4 text-rose-400">Muy alto (crece con cada usuario)</td>
                    <td className="p-4 text-emerald-400">Muy bajo (solo infraestructura cloud)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Propiedad de Datos y Código</td>
                    <td className="p-4">Propiedad del proveedor SaaS</td>
                    <td className="p-4 text-emerald-400">100% propiedad de tu empresa</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Personalización</td>
                    <td className="p-4">Limitada a lo que la plataforma ofrezca</td>
                    <td className="p-4 text-emerald-400">100% adaptable a tus procesos</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Cuándo Elegir Software a Medida</h2>
            <ul>
              <li>Tienes flujos de trabajo únicos que las herramientas genéricas no cubren.</li>
              <li>Pagas miles de dólares anuales en licencias de software que solo usas al 30%.</li>
              <li>Necesitas integraciones directas con sistemas legacy, facturación electrónica DIAN o pasarelas de pago colombianas.</li>
              <li>Deseas monetizar tu propia plataforma convirtiéndola en un producto digital.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <BarChart3 className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Ingeniería a Medida en K&T Code</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Calcula el ROI de tu software propio
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Diseñamos software robusto con Next.js y bases de datos Supabase para reemplazar SaaS costosos y optimizar las finanzas de tu negocio.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Solicitar Asesoría de Arquitectura <ArrowRight className="w-4 h-4" />
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
