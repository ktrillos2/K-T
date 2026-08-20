import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, ShoppingCart, HelpCircle, ArrowRight, Package, CreditCard } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Cómo Crear una Tienda Online Desde Cero: Guía Completa de E-commerce",
  description:
    "Aprende paso a paso cómo montar una tienda virtual exitosa en Colombia: plataforma, catálogo, pasarelas de pago (Wompi, Bold, PayU), envíos y conversión.",
  keywords: [
    "como crear una tienda online desde cero",
    "guia ecommerce colombia",
    "pasos para montar tienda virtual",
    "pasarelas de pago tienda online colombia",
    "como vender por internet colombia 2026",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/como-crear-una-tienda-online-desde-cero"),
  },
  openGraph: {
    title: "Cómo Crear una Tienda Online Desde Cero: Guía Completa de E-commerce",
    description:
      "Guía práctica y comercial para construir tu tienda virtual y comenzar a vender en internet.",
    type: "article",
    url: absoluteUrl("/blog/como-crear-una-tienda-online-desde-cero"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Qué documentos necesito para vender online con pasarelas de pago en Colombia?",
    answer:
      "Para integrar pasarelas como Wompi o Mercado Pago como persona natural o jurídica necesitas: RUT actualizado con actividad comercial correspondiente, certificación bancaria a nombre del titular y documento de identidad.",
  },
  {
    question: "¿Cómo se gestionan los envíos en Colombia?",
    answer:
      "Puedes integrar calculadores automáticos de fletes o plataformas de logística agregada como Coordinadora, Servientrega, Envia o 99minutos para generar guías de despacho automáticamente.",
  },
]

export default function ComoCrearTiendaOnlinePage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Cómo Crear una Tienda Online Desde Cero: Guía Completa de E-commerce",
            description:
              "Guía integral paso a paso para diseñar, configurar y lanzar una tienda virtual rentable en Colombia.",
            path: "/blog/como-crear-una-tienda-online-desde-cero",
            datePublished: "2026-07-09",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Crear Tienda Online", path: "/blog/como-crear-una-tienda-online-desde-cero" },
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
                <span>11 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>9 de julio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Cómo Crear una Tienda Online Desde Cero: Guía Completa de E-commerce
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 9 de julio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Vender por internet requiere una combinación de experiencia visual impecable, pasarelas de pago seguras y logística ágil. En esta guía te explicamos el proceso completo desde la selección técnica hasta la primera venta.
              </p>
            </header>

            <h2>Los 5 Pasos Fundamentales para Lanzar tu Tienda</h2>
            <ol>
              <li><strong>Estructuración del Catálogo de Productos:</strong> Define categorías lógicas, fotografías de alta resolución en formato WebP y descripciones claras.</li>
              <li><strong>Integración de Pasarelas de Pago Seguras:</strong> Conecta Wompi (Bancolombia/Nequi), Bold o PayU para aceptar PSE y tarjetas de crédito/débito.</li>
              <li><strong>Configuración de Zonas y Costos de Envío:</strong> Establece tarifas para envíos locales y nacionales con transportadoras oficiales.</li>
              <li><strong>Optimización de Velocidad y Checkout en 1 Clic:</strong> Minimiza los pasos requeridos para que el cliente complete su compra sin fricción.</li>
              <li><strong>Lanzamiento con Campañas de Meta Ads:</strong> Atrae tráfico calificado a tus productos mediante publicidad segmentada en Instagram y Facebook.</li>
            </ol>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Package className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Lanza tu Tienda con K&T Code</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Tu tienda virtual lista para facturar en internet
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Construimos tiendas online completas con catálogo autogestionable, pasarelas colombianas y diseño personalizado desde $1.300.000 COP.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Cotizar Proyecto E-commerce <ArrowRight className="w-4 h-4" />
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
