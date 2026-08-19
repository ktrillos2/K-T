import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, ShoppingCart, HelpCircle, ArrowRight, Layers, DollarSign } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "WordPress vs. Shopify: ¿Cuál es Mejor para Crear una Web o Tienda Online? | K&T Code",
  description:
    "Comparativa detallada entre WordPress (WooCommerce) y Shopify en 2026: costos mensuales, comisiones por transacción, facilidad de uso y cuál elegir.",
  keywords: [
    "wordpress vs shopify",
    "shopify vs woocommerce colombia",
    "cual es mejor wordpress o shopify",
    "costos shopify colombia 2026",
    "crear tienda online comparativa",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/wordpress-vs-shopify-comparativa"),
  },
  openGraph: {
    title: "WordPress vs. Shopify: ¿Cuál es Mejor para Crear una Web o Tienda Online?",
    description:
      "Analizamos costos, comisiones ocultas y flexibilidad para ayudarte a elegir la plataforma ideal.",
    type: "article",
    url: absoluteUrl("/blog/wordpress-vs-shopify-comparativa"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Es más barato WordPress que Shopify a largo plazo?",
    answer:
      "Sí. Con WordPress no pagas suscripciones mensuales fijas en dólares ($39+ USD/mes de Shopify) ni comisiones porcentuales adicionales por venta, lo que genera ahorros significativos a medida que tu volumen de ventas escala.",
  },
  {
    question: "¿Cuál es más fácil de usar para principiantes?",
    answer:
      "Shopify es más sencillo para usuarios sin experiencia técnica ya que incluye hosting y pasarelas preconfiguradas. Sin embargo, una tienda desacoplada o WooCommerce bien configurada ofrece un control de marca muy superior.",
  },
]

export default function WordPressVsShopifyPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "WordPress vs. Shopify: ¿Cuál es Mejor para Crear una Web o Tienda Online?",
            description:
              "Comparativa entre WordPress (WooCommerce) y Shopify para comercio electrónico en Colombia.",
            path: "/blog/wordpress-vs-shopify-comparativa",
            datePublished: "2026-07-22",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "WordPress vs Shopify", path: "/blog/wordpress-vs-shopify-comparativa" },
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
                <span>9 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>22 de julio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                WordPress vs. Shopify: ¿Cuál es Mejor para Crear una Web o Tienda Online?
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 22 de julio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Tanto <strong>WordPress (con WooCommerce)</strong> como <strong>Shopify</strong> son los gigantes del e-commerce actual. Sin embargo, sus modelos de costos y filosofía de control son diametralmente opuestos.
              </p>
            </header>

            <h2>Tabla Comparativa Directa</h2>
            <div className="not-prose overflow-x-auto my-8 border border-white/15 rounded-2xl">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <thead className="bg-neutral-900 border-b border-white/10 text-white">
                  <tr>
                    <th className="p-4">Característica</th>
                    <th className="p-4 text-emerald-400">WordPress / WooCommerce</th>
                    <th className="p-4 text-neutral-300">Shopify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-neutral-300">
                  <tr>
                    <td className="p-4 font-bold text-white">Costo Fijo Mensual</td>
                    <td className="p-4 text-emerald-400">$0 (solo hosting propio)</td>
                    <td className="p-4 text-rose-400">Desde $39 USD/mes</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Comisión por Venta</td>
                    <td className="p-4 text-emerald-400">0% adicional</td>
                    <td className="p-4 text-rose-400">0.5% a 2% extra</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Propiedad de Datos</td>
                    <td className="p-4 text-emerald-400">100% tuyo en tu base de datos</td>
                    <td className="p-4">Propiedad de la plataforma Shopify</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Pasarelas en Colombia</td>
                    <td className="p-4">Wompi, Bold, PayU, PSE, Addi</td>
                    <td className="p-4">Wompi, PayU, Mercado Pago</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Comercio Electrónico Sin Comisiones</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Crea tu tienda virtual sin pagar mensualidades obligatorias
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Desarrollamos tiendas virtuales optimizadas con pasarelas de pago colombianas donde eres dueño del 100% de tus ventas.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Cotizar Mi Tienda Online <ArrowRight className="w-4 h-4" />
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
