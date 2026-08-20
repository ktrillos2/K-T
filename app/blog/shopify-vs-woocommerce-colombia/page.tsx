import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Shopify vs. WooCommerce en Colombia en 2026: Costos y Pasarelas",
  description:
    "Comparativa detallada entre Shopify y WooCommerce para tiendas virtuales en Colombia: costos mensuales en COP/USD, comisiones de pasarelas (Wompi, PayU, Bold) y cuál conviene.",
  keywords: [
    "shopify vs woocommerce colombia",
    "tienda virtual shopify colombia",
    "woocommerce colombia precios",
    "pasarelas de pago shopify woocommerce",
    "comisiones wompi shopify",
    "cual es mejor shopify o woocommerce",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/shopify-vs-woocommerce-colombia"),
  },
  openGraph: {
    title: "Shopify vs. WooCommerce en Colombia en 2026: Costos y Pasarelas",
    description:
      "Tabla comparativa real entre Shopify y WooCommerce en el mercado colombiano: costos ocultos, comisiones y pasarelas de pago.",
    type: "article",
    url: absoluteUrl("/blog/shopify-vs-woocommerce-colombia"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Qué pasarelas de pago funcionan mejor con WooCommerce y Shopify en Colombia?",
    answer:
      "Ambas plataformas admiten pasarelas colombianas como Wompi (Bancolombia/PSE), Bold, PayU y Mercado Pago. Sin embargo, en Shopify existe una comisión transaccional adicional (del 0.5% al 2.0%) si no se utiliza Shopify Payments (el cual no está disponible para cuentas bancarias en Colombia), mientras que en WooCommerce la comisión de plataforma es del 0%.",
  },
  {
    question: "¿Cuál es más económico a largo plazo?",
    answer:
      "WooCommerce es más económico a mediano y largo plazo porque no cobra mensualidades obligatorias en dólares ni comisiones por venta. Shopify tiene un costo recurrente mínimo de $39 USD/mes más aplicaciones adicionales de suscripción.",
  },
  {
    question: "¿Qué es WooCommerce Headless con Next.js?",
    answer:
      "Es una arquitectura donde la gestión de inventario y pedidos se hace en WooCommerce, pero la tienda visual que ve el cliente es una aplicación en Next.js ultra rápida. Esto elimina la lentitud habitual de WordPress manteniendo el panel de administración autogestionable.",
  },
]

export default function ShopifyVsWoocommercePage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Shopify vs. WooCommerce en Colombia en 2026: Costos Reales, Pasarelas y Cuál Elegir",
            description:
              "Comparativa económica y técnica entre Shopify y WooCommerce en Colombia: tarifas, pasarelas locales, comisiones y escalabilidad.",
            path: "/blog/shopify-vs-woocommerce-colombia",
            datePublished: "2026-03-02",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Shopify vs. WooCommerce en Colombia", path: "/blog/shopify-vs-woocommerce-colombia" },
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
                <span className="text-emerald-400 font-bold">Comparativas E-commerce</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>9 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>Colombia 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Shopify vs. WooCommerce en Colombia (2026): Costos Reales, Pasarelas y Cuál Elegir
              </h1>

              {/* Author Byline */}
              <div className="flex items-center gap-3 py-4 border-t border-b border-white/10 my-6 font-mono text-xs text-neutral-400">
                <div className="w-9 h-9 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  KT
                </div>
                <div>
                  <span>Escrito por </span>
                  <Link href="/autores/keyner-trillos" className="text-white font-bold hover:underline">
                    Keyner Trillos
                  </Link>
                  <span className="text-neutral-400"> • Lead Software Engineer — K&T Code</span>
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Revisado el 19 de agosto de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-white pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Crear una <strong>tienda virtual en Colombia</strong> implica elegir entre dos gigantes del comercio electrónico: <strong>Shopify (plataforma SaaS por suscripción)</strong> y <strong>WooCommerce (sistema de código abierto autohospedado)</strong>. Analizamos los costos reales en pesos colombianos (COP), tarifas de pasarelas locales y la escalabilidad de cada opción.
              </p>
            </header>

            {/* Quick Summary Table */}
            <section className="mb-14 not-prose overflow-x-auto">
              <h2 className="text-2xl font-bold font-title text-white mb-6">
                Tabla Comparativa: Shopify vs. WooCommerce en Colombia
              </h2>
              <div className="border border-white/15 rounded-2xl overflow-hidden bg-white/[0.02]">
                <table className="w-full text-left font-mono text-xs md:text-sm">
                  <thead className="bg-white/10 text-white border-b border-white/10">
                    <tr>
                      <th className="p-4">Criterio</th>
                      <th className="p-4">Shopify</th>
                      <th className="p-4">WooCommerce</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-neutral-300">
                    <tr>
                      <td className="p-4 font-bold text-white">Costo Fijo Mensual</td>
                      <td className="p-4 text-amber-400">$39 a $399 USD / mes (+$160.000 COP/mes)</td>
                      <td className="p-4 text-emerald-400">$0 / mes de suscripción de plataforma</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Comisión Extra por Venta</td>
                      <td className="p-4 text-amber-400">0.5% a 2.0% adicional por pasarela externa</td>
                      <td className="p-4 text-emerald-400">0% comisión de plataforma</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Pasarelas en Colombia</td>
                      <td className="p-4">Wompi, Bold, PayU, Mercado Pago</td>
                      <td className="p-4">Wompi, Bold, PayU, Mercado Pago, PSE, Addi</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Mantenimiento de Servidor</td>
                      <td className="p-4 text-emerald-400">Incluido (Gestionado por Shopify)</td>
                      <td className="p-4">Requiere hosting propio o CDN Edge</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Propiedad de los Datos</td>
                      <td className="p-4">Alojados en servidores de Shopify</td>
                      <td className="p-4 text-emerald-400">100% propiedad de tu empresa</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Personalización del Checkout</td>
                      <td className="p-4">Limitada (salvo en planes Shopify Plus)</td>
                      <td className="p-4 text-emerald-400">Totalmente personalizable</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Opción Headless con Next.js</td>
                      <td className="p-4">Sí (Shopify Storefront API)</td>
                      <td className="p-4 text-emerald-400">Sí (WooCommerce REST API + Next.js)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* When to use Shopify */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-title mb-6">
                1. ¿Cuándo Elegir Shopify en Colombia?
              </h2>
              <ul className="space-y-2 text-neutral-300 font-mono text-sm list-none pl-0">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Validación comercial rápida:</strong> Si deseas lanzar una tienda en pocos días sin preocuparte por servidores ni copias de seguridad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Equipo sin conocimientos técnicos:</strong> Su panel de control es uno de los más pulidos del mercado para subir productos y gestionar envíos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Operación con bajo volumen inicial:</strong> Si el costo de $39 USD/mes no representa un porcentaje elevado de tu margen comercial.</span>
                </li>
              </ul>
            </section>

            {/* When to use WooCommerce */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-title mb-6">
                2. ¿Cuándo Elegir WooCommerce en Colombia?
              </h2>
              <ul className="space-y-2 text-neutral-300 font-mono text-sm list-none pl-0">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Ahorro en comisiones y mensualidades:</strong> Ideal para negocios con volumen de ventas recurrente que quieren maximizar su margen neto.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Integración nativa con pasarelas colombianas:</strong> Plugins oficiales de Wompi Bancolombia, Bold, Addi (crédito) y facturación electrónica DIAN.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Control y soberanía de datos:</strong> Tu base de clientes, catálogo e historial transaccional te pertenecen al 100%.</span>
                </li>
              </ul>
            </section>

            {/* FAQs */}
            <section className="mb-14 not-prose">
              <h2 className="text-2xl md:text-3xl font-bold font-title text-white mb-6">
                Preguntas Frecuentes sobre Shopify y WooCommerce
              </h2>
              <div className="space-y-4 font-mono text-sm">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <h3 className="text-base font-bold text-white font-title mb-2">{faq.question}</h3>
                    <p className="text-neutral-400 text-xs leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="not-prose text-center p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
              <h2 className="text-2xl md:text-3xl font-bold font-title text-white mb-4">
                ¿Planeando lanzar una tienda virtual en Colombia?
              </h2>
              <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto mb-8">
                En K&T Code desarrollamos tiendas virtuales de alto rendimiento con pasarelas colombianas integradas y cero comisiones de plataforma.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/precios/precio-tienda-virtual-colombia"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-mono font-bold text-sm rounded-xl hover:bg-neutral-200 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Ver Precios de Tienda Virtual
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 text-white border border-white/20 font-mono font-bold text-sm rounded-xl hover:bg-white/20 transition-colors inline-flex items-center justify-center"
                >
                  Cotizar con un Especialista
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </>
  )
}
