import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, ShoppingBag, HelpCircle, ArrowRight, DollarSign } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Shopify vs. Wix: ¿Cuál es Mejor para Vender Online en 2026?",
  description:
    "Comparativa de plataformas de e-commerce: catálogo, pasarelas de pago, procesamiento de pedidos, comisiones y escalabilidad de ventas entre Shopify y Wix.",
  keywords: [
    "shopify vs wix",
    "cual es mejor para vender online shopify o wix",
    "wix ecommerce opiniones",
    "shopify colombia precios",
    "comparativa tiendas online 2026",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/shopify-vs-wix-comparativa-ecommerce"),
  },
  openGraph: {
    title: "Shopify vs. Wix: ¿Cuál es Mejor para Vender Online en 2026?",
    description:
      "Descubre cuál plataforma se adapta mejor al tamaño y volumen de ventas de tu negocio.",
    type: "article",
    url: absoluteUrl("/blog/shopify-vs-wix-comparativa-ecommerce"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Es Wix suficiente para una tienda online mediana?",
    answer:
      "Wix funciona bien para catálogos pequeños (menos de 50 productos simples). Para empresas con variantes complejas, inventario dinámico y alto volumen de ventas, Shopify o una solución a medida ofrecen un rendimiento significativamente más robusto.",
  },
  {
    question: "¿Qué pasarelas de pago colombianas aceptan Shopify y Wix?",
    answer:
      "Shopify cuenta con integraciones nativas directas con Wompi, PayU y Mercado Pago. Wix soporta Mercado Pago y PayU, pero su integración con opciones locales como transferencias Nequi directas es más limitada.",
  },
]

export default function ShopifyVsWixPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Shopify vs. Wix: ¿Cuál es Mejor para Vender Online en 2026?",
            description:
              "Análisis comparativo de herramientas de comercio electrónico entre Shopify y Wix.",
            path: "/blog/shopify-vs-wix-comparativa-ecommerce",
            datePublished: "2026-07-14",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Shopify vs Wix", path: "/blog/shopify-vs-wix-comparativa-ecommerce" },
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
                <span>14 de julio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Shopify vs. Wix: ¿Cuál es Mejor para Vender Online en 2026?
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 14 de julio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Al crear una tienda virtual, la elección entre <strong>Shopify</strong> (un motor de e-commerce puro) y <strong>Wix</strong> (un constructor visual general) marca el límite de crecimiento de tus ventas.
              </p>
            </header>

            <h2>Comparativa de Funcionalidades de E-commerce</h2>
            <ul>
              <li><strong>Motor de Pago y Checkout:</strong> El checkout de Shopify es reconocido como uno de los de mayor conversión del mundo. Wix ofrece un checkout funcional pero con menos opciones de personalización.</li>
              <li><strong>Gestión de Inventario:</strong> Shopify soporta catálogos de miles de productos con sincronización en tiempo real con inventarios físicos.</li>
              <li><strong>Escalabilidad:</strong> Para negocios con proyección de crecimiento exponencial, Shopify es muy superior a Wix.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">E-commerce a Medida</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Vende más rápido con tecnología Headless
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Diseñamos tiendas online que cargan en menos de un segundo, conectadas a pasarelas colombianas y optimizadas para ventas por WhatsApp y redes sociales.
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
