import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, CreditCard, HelpCircle, ArrowRight, ShieldCheck, Zap } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Wompi vs. Mercado Pago vs. PayU en Colombia (2026): Comisiones y Comparativa",
  description:
    "Comparativa técnica y comercial de las principales pasarelas de pago en Colombia: comisiones de Wompi, Mercado Pago, PayU y Bold, tiempos de abono y facilidad de integración.",
  keywords: [
    "wompi vs mercado pago vs payu",
    "pasarelas de pago colombia comparativa",
    "comisiones wompi bancolombia",
    "comisiones mercado pago colombia",
    "mejor pasarela de pago colombia 2026",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/wompi-vs-mercado-pago-vs-payu-colombia"),
  },
  openGraph: {
    title: "Wompi vs. Mercado Pago vs. PayU en Colombia: Costos y Comparativa",
    description:
      "Tabla comparativa real de comisiones, métodos de pago aceptados y soporte técnico de pasarelas de pago en Colombia.",
    type: "article",
    url: absoluteUrl("/blog/wompi-vs-mercado-pago-vs-payu-colombia"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Cuál es la mejor pasarela para tiendas virtuales en Colombia?",
    answer:
      "Wompi (de Bancolombia) es ampliamente preferida por su excelente soporte para pagos por botón Bancolombia, Nequi y PSE con tasas competitivas (2.65% + $700 COP). Bold y Mercado Pago también destacan por su facilidad de alta para pequeños comercios.",
  },
  {
    question: "¿Cuánto tardan en transferir el dinero de las ventas a mi cuenta bancaria?",
    answer:
      "Wompi transfiere automáticamente a cuentas Bancolombia al siguiente día hábil sin costo de retiro. Mercado Pago permite disponer del dinero inmediatamente en su cuenta digital o transferir a bancos en 24 a 48 horas.",
  },
]

export default function WompiVsMercadoPagoVsPayuPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Wompi vs. Mercado Pago vs. PayU en Colombia: Costos y Comparativa",
            description:
              "Análisis comparativo de comisiones bancarias, tiempos de desembolso y facilidad de integración técnica de pasarelas en Colombia.",
            path: "/blog/wompi-vs-mercado-pago-vs-payu-colombia",
            datePublished: "2026-07-20",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Wompi vs Mercado Pago vs PayU", path: "/blog/wompi-vs-mercado-pago-vs-payu-colombia" },
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
                <span>20 de julio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Wompi vs. Mercado Pago vs. PayU en Colombia: Comisiones y Comparativa
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 20 de julio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Elegir la pasarela de pagos adecuada para tu comercio electrónico en Colombia repercute directamente en tu tasa de conversión y margen neto de ganancia. Comparamos las tres opciones líderes del mercado nacional.
              </p>
            </header>

            <h2>Tabla Comparativa de Comisiones y Métodos</h2>
            <div className="not-prose overflow-x-auto my-8 border border-white/15 rounded-2xl">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <thead className="bg-neutral-900 border-b border-white/10 text-white">
                  <tr>
                    <th className="p-4">Pasarela</th>
                    <th className="p-4 text-emerald-400">Comisión Estándar</th>
                    <th className="p-4 text-neutral-300">Métodos Principales</th>
                    <th className="p-4 text-neutral-400">Dispersión de Fondos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-neutral-300">
                  <tr>
                    <td className="p-4 font-bold text-white">Wompi (Bancolombia)</td>
                    <td className="p-4 text-emerald-400">2.65% + $700 COP</td>
                    <td className="p-4">Botón Bancolombia, Nequi, PSE, Tarjetas</td>
                    <td className="p-4">Automática diaria a Bancolombia (Gratis)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Mercado Pago</td>
                    <td className="p-4 text-emerald-400">2.99% + $900 COP</td>
                    <td className="p-4">Saldo en cuenta, Tarjetas, PSE, Efecty</td>
                    <td className="p-4">Inmediata en cuenta MP / 24-48h a bancos</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">PayU Latam</td>
                    <td className="p-4 text-emerald-400">3.49% + $900 COP</td>
                    <td className="p-4">Tarjetas internacionales, PSE, Efectivo</td>
                    <td className="p-4">Solicitud manual de retiro (primeros 3 gratis)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Recomendación Técnica de K&T Code</h2>
            <ul>
              <li><strong>Para comercio electrónico 100% colombiano:</strong> Wompi ofrece la mejor tasa de aprobación y menor fricción para usuarios con cuentas Bancolombia y Nequi.</li>
              <li><strong>Para ventas internacionales y omnicanal:</strong> Bold o Stripe son excelentes complementos para procesar cobros en dólares y tarjetas del exterior sin bloqueos antifraude erróneos.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <CreditCard className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Integración de Pasarelas Seguras</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Integra pasarelas colombianas en tu tienda online
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Conectamos tu web a Wompi, Bold, PayU o Mercado Pago con webhooks seguros, cálculo automático de impuestos y confirmación instantánea.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Solicitar Integración de Pagos <ArrowRight className="w-4 h-4" />
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
