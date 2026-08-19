import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Zap, HelpCircle, ArrowRight, Layers, ShoppingBag } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "¿Qué es un E-commerce Headless y Cuándo Conviene Utilizarlo? | K&T Code",
  description:
    "Descubre qué es el comercio electrónico desacoplado (Headless Commerce): arquitectura Next.js, backend Shopify/WooCommerce por API, ventajas de velocidad y conversión.",
  keywords: [
    "que es ecommerce headless",
    "headless commerce colombia",
    "ventajas tienda desacoplada",
    "woocommerce headless nextjs",
    "shopify headless react",
    "arquitectura ecommerce moderna",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/que-es-un-ecommerce-headless-ventajas"),
  },
  openGraph: {
    title: "¿Qué es un E-commerce Headless y Cuándo Conviene Utilizarlo?",
    description:
      "Aprende cómo las tiendas online desacopladas multiplican su velocidad de carga y tasa de conversión.",
    type: "article",
    url: absoluteUrl("/blog/que-es-un-ecommerce-headless-ventajas"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Qué diferencia a una tienda headless de una tienda tradicional?",
    answer:
      "En una tienda tradicional (como WooCommerce o Shopify clásico), el diseño visual y el motor de base de datos están fuertemente acoplados en el mismo servidor. En una tienda Headless, el frontend visual se construye en Next.js y se aloja en una red Edge ultrarrápida, comunicándose con el backend únicamente mediante APIs seguras.",
  },
  {
    question: "¿Es difícil para el cliente actualizar los productos en una tienda Headless?",
    answer:
      "No. El cliente sigue administrando sus productos, inventarios y pedidos desde su panel familiar de WooCommerce, Shopify o Sanity Studio. El cambio es 100% invisible para el administrador, pero ofrece una velocidad de carga hasta 5 veces más rápida para el comprador.",
  },
]

export default function QueEsEcommerceHeadlessPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "¿Qué es un E-commerce Headless y Cuándo Conviene Utilizarlo?",
            description:
              "Guía técnica sobre la arquitectura de e-commerce desacoplado y sus beneficios directos en conversión y velocidad de carga.",
            path: "/blog/que-es-un-ecommerce-headless-ventajas",
            datePublished: "2026-07-16",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "E-commerce Headless", path: "/blog/que-es-un-ecommerce-headless-ventajas" },
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
                <span className="text-emerald-400 font-bold">Ingeniería & E-commerce</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>7 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>16 de julio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                ¿Qué es un E-commerce Headless y Cuándo Conviene Utilizarlo?
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 16 de julio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                El <strong>Headless Commerce</strong> (comercio desacoplado) es el estándar arquitectónico que adoptan las marcas líderes para superar los cuellos de botella de velocidad y diseño de las plataformas monolíticas tradicionales.
              </p>
            </header>

            <h2>Las 4 Ventajas Clave del Comercio Desacoplado</h2>
            <ul>
              <li><strong>Velocidad de Carga Sub-Segundo (&lt; 0.8s):</strong> El catálogo se precarga en la red perimetral Edge, haciendo que la navegación entre productos sea instantánea.</li>
              <li><strong>Diseño UI/UX 100% a Medida:</strong> Cero limitaciones de plantillas prediseñadas; cualquier animación o interacción en Figma se puede construir en React.</li>
              <li><strong>Seguridad de Nivel Bancario:</strong> El panel de administración y las bases de datos no están expuestos públicamente al tráfico de internet.</li>
              <li><strong>Omnicanalidad:</strong> El mismo backend de productos puede alimentar tu página web, una aplicación móvil en Flutter/React Native y sistemas POS en tiendas físicas.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Especialistas en WooCommerce & Shopify Headless</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Moderniza tu tienda virtual actual
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Transformamos tu catálogo existente en una tienda desacoplada con Next.js y pasarelas de pago colombianas para triplicar la velocidad de compra.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Cotizar Tienda Headless <ArrowRight className="w-4 h-4" />
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
