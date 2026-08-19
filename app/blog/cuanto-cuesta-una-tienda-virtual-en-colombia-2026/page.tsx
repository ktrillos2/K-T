import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, ShoppingCart, HelpCircle, ArrowRight, DollarSign, CreditCard } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "¿Cuánto Cuesta una Tienda Virtual en Colombia en 2026? Guía de Costos | K&T Code",
  description:
    "Precios reales para crear una tienda virtual en Colombia en 2026: costos de desarrollo, pasarelas de pago (Wompi, Bold, PayU), comisiones y gastos mensuales.",
  keywords: [
    "cuanto cuesta una tienda virtual en colombia",
    "precios ecommerce colombia 2026",
    "costo crear tienda online colombia",
    "pasarelas de pago colombia costos",
    "tienda virtual headless precios",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026"),
  },
  openGraph: {
    title: "¿Cuánto Cuesta una Tienda Virtual en Colombia en 2026? Guía de Costos",
    description:
      "Desglose completo de precios en COP y USD para montar una tienda virtual profesional en Colombia.",
    type: "article",
    url: absoluteUrl("/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Cuánto cuesta crear una tienda virtual profesional en Colombia?",
    answer:
      "En K&T Code, una tienda virtual headless desacoplada con carga en menos de 0.8s e integración completa de pasarelas colombianas (Wompi, Bold, PayU) parte desde $1.300.000 COP ($500 USD), sin comisiones por venta sobre la plataforma.",
  },
  {
    question: "¿Qué costos fijos mensuales tiene una tienda online?",
    answer:
      "Los únicos costos fijos son el dominio ($15 - $20 USD anuales) y el hosting o infraestructura cloud. En arquitecturas modernas sobre Next.js y Edge CDN, el costo de hosting puede ser de $0 a $20 USD mensuales para catálogos medianos.",
  },
]

export default function CuantoCuestaTiendaVirtualPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "¿Cuánto Cuesta una Tienda Virtual en Colombia en 2026? Guía de Costos",
            description:
              "Tabla de precios reales, comisiones de pasarelas y costos de desarrollo para crear una tienda virtual en Colombia.",
            path: "/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026",
            datePublished: "2026-07-25",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Costo Tienda Virtual", path: "/blog/cuanto-cuesta-una-tienda-virtual-en-colombia-2026" },
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
                <span className="text-emerald-400 font-bold">Precios & Guías</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>9 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>25 de julio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                ¿Cuánto Cuesta una Tienda Virtual en Colombia en 2026?
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 25 de julio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Crear una tienda virtual en Colombia implica considerar costos de desarrollo, comisiones bancarias de pasarelas locales (PSE, tarjetas, transferencias) e infraestructura. En esta guía detallamos todos los valores sin comisiones ocultas.
              </p>
            </header>

            <h2>Desglose de Costos de una Tienda Virtual</h2>
            <div className="not-prose overflow-x-auto my-8 border border-white/15 rounded-2xl">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <thead className="bg-neutral-900 border-b border-white/10 text-white">
                  <tr>
                    <th className="p-4">Concepto</th>
                    <th className="p-4 text-emerald-400">Costo Estimado en COP</th>
                    <th className="p-4 text-neutral-300">Frecuencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-neutral-300">
                  <tr>
                    <td className="p-4 font-bold text-white">Dominio .com / .co / .com.co</td>
                    <td className="p-4 text-emerald-400">$60.000 - $120.000</td>
                    <td className="p-4">Anual</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Desarrollo Tienda Headless (K&T Code)</td>
                    <td className="p-4 text-emerald-400">Desde $1.300.000</td>
                    <td className="p-4">Pago único</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Integración Pasarelas (Wompi, Bold, PayU)</td>
                    <td className="p-4 text-emerald-400">Incluida en el desarrollo</td>
                    <td className="p-4">Pago único</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Comisión por Transacción Bancaria</td>
                    <td className="p-4 text-amber-400">2.6% a 2.99% + $900 COP</td>
                    <td className="p-4">Por venta realizada</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Ventajas de una Tienda Headless frente a Plataformas Tradicionales</h2>
            <ul>
              <li><strong>0% de comisión por venta de la plataforma:</strong> A diferencia de Shopify que cobra un porcentaje extra si no usas su pasarela propia.</li>
              <li><strong>Carga instantánea en menos de 0.8s:</strong> Reduce drásticamente la tasa de carritos abandonados.</li>
              <li><strong>Integración directa con WhatsApp:</strong> Permite cerrar ventas tanto por pasarela automática como por chat asistido.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">E-commerce de Alto Rendimiento</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Lanza tu tienda virtual con tecnología Next.js
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Construimos tiendas virtuales ultra rápidas con catálogo autogestionable, pasarelas de pago colombianas y optimización SEO para vender más.
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
