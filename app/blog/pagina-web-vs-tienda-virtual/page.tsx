import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Globe, ShoppingCart, ArrowRight } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Página Web vs. Tienda Virtual en Colombia: Diferencias y Precios | K&T Code",
  description:
    "Descubre las diferencias clave entre una página web corporativa y una tienda virtual (e-commerce): objetivos, pasarelas de pago, costos en Colombia y cuál necesita tu empresa.",
  keywords: [
    "pagina web vs tienda virtual",
    "diferencia entre sitio web y e commerce",
    "cuanto cuesta pagina web vs tienda virtual colombia",
    "que necesita una tienda online",
    "cuando crear pagina web corporativa o tienda",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/pagina-web-vs-tienda-virtual"),
  },
  openGraph: {
    title: "Página Web vs. Tienda Virtual en Colombia: Diferencias y Precios",
    description:
      "Guía comparativa entre un sitio web corporativo de captación y una tienda online transaccional en Colombia.",
    type: "article",
    url: absoluteUrl("/blog/pagina-web-vs-tienda-virtual"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Puedo empezar con una página web y luego convertirla en tienda virtual?",
    answer:
      "Sí. Si la arquitectura inicial está programada en código moderno (como Next.js), se pueden integrar módulos transaccionales, carritos y pasarelas de pago (Wompi, Bold) progresivamente sin tener que rehacer el sitio web desde cero.",
  },
  {
    question: "¿Qué pasarelas de pago se necesitan para una tienda virtual en Colombia?",
    answer:
      "En Colombia las pasarelas más recomendadas son Wompi (Bancolombia), Bold, PayU y Mercado Pago. Permiten procesar pagos con PSE, tarjetas de crédito/débito, transferencias Nequi y Daviplata con depósito directo a tu cuenta bancaria.",
  },
  {
    question: "¿Cuál es la diferencia de precio entre ambas opciones?",
    answer:
      "En K&T Code, una Página Web Corporativa completa inicia desde $2.500.000 COP (enfocada en captación de leads), mientras que una Tienda Virtual transaccional con pasarelas de pago e inventario inicia desde $1.300.000 COP (planes básicos) hasta $3.500.000+ COP para catálogos headless escalables.",
  },
]

export default function PaginaWebVsTiendaVirtualPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Página Web vs. Tienda Virtual: Diferencias, Funcionalidades y Precios en Colombia",
            description:
              "Comparativa clara entre un sitio web corporativo y una tienda virtual e-commerce: costos, objetivos comerciales y pasarelas de pago.",
            path: "/blog/pagina-web-vs-tienda-virtual",
            datePublished: "2026-03-05",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Página Web vs. Tienda Virtual", path: "/blog/pagina-web-vs-tienda-virtual" },
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
                <span className="text-emerald-400 font-bold">Estrategia Digital</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>8 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>Colombia 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Página Web vs. Tienda Virtual en Colombia: Diferencias, Funcionalidades y Precios
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
                Al digitalizar una empresa en Colombia surge una pregunta habitual: <strong>¿necesito una página web corporativa o una tienda virtual?</strong> Aunque ambas se alojan en internet, sus objetivos de negocio, infraestructura y costos de operación son sustancialmente diferentes.
              </p>
            </header>

            {/* Quick Summary Table */}
            <section className="mb-14 not-prose overflow-x-auto">
              <h2 className="text-2xl font-bold font-title text-white mb-6">
                Tabla Comparativa: Sitio Web Corporativo vs. Tienda Virtual E-commerce
              </h2>
              <div className="border border-white/15 rounded-2xl overflow-hidden bg-white/[0.02]">
                <table className="w-full text-left font-mono text-xs md:text-sm">
                  <thead className="bg-white/10 text-white border-b border-white/10">
                    <tr>
                      <th className="p-4">Criterio</th>
                      <th className="p-4">Página Web Corporativa</th>
                      <th className="p-4">Tienda Virtual (E-commerce)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-neutral-300">
                    <tr>
                      <td className="p-4 font-bold text-white">Objetivo Principal</td>
                      <td className="p-4">Captar leads, generar llamadas y cotizaciones B2B</td>
                      <td className="p-4">Procesar pagos y compras automáticas 24/7</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Pasarelas de Pago</td>
                      <td className="p-4 text-emerald-400">No requeridas (Formularios y WhatsApp)</td>
                      <td className="p-4 text-amber-400">Obligatorias (Wompi, Bold, PayU, PSE)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Gestión de Inventario</td>
                      <td className="p-4">No aplica</td>
                      <td className="p-4 text-amber-400">Control de stock, tallas, variantes y envíos</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Precio K&T Desde</td>
                      <td className="p-4 text-emerald-400">$450.000 (Landing) / $2.500.000 COP</td>
                      <td className="p-4">$1.300.000 - $3.500.000+ COP</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Tiempo de Entrega</td>
                      <td className="p-4 text-emerald-400">7 a 25 días hábiles</td>
                      <td className="p-4">25 a 40 días hábiles</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Modelo de Negocio Ideal</td>
                      <td className="p-4">Servicios profesionales, consultoría, salud, inmobiliarias</td>
                      <td className="p-4">Venta minorista (retail), moda, productos físicos, B2B</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* When to choose Corporate Web */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-title mb-6">
                1. ¿Cuándo Elegir una Página Web Corporativa?
              </h2>
              <ul className="space-y-2 text-neutral-300 font-mono text-sm list-none pl-0">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Venta de servicios y consultorías:</strong> Empresas donde el precio depende del alcance o requiere una propuesta personalizada previa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Empresas B2B e industriales:</strong> Clínicas, firmas de abogados, empresas de ingeniería o agencias que buscan agendar reuniones o cotizaciones.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Menores requerimientos operativos:</strong> No exige configurar inventarios en tiempo real, transportadoras ni comisiones transaccionales.</span>
                </li>
              </ul>
            </section>

            {/* When to choose E-commerce */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-title mb-6">
                2. ¿Cuándo Elegir una Tienda Virtual (E-commerce)?
              </h2>
              <ul className="space-y-2 text-neutral-300 font-mono text-sm list-none pl-0">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Productos físicos estandarizados:</strong> Ropa, calzado, tecnología, alimentos o productos con precio fijo y stock definido.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Automatización de cobros y despachos:</strong> Cuando quieres que el cliente pague de forma desatendida mediante PSE, tarjeta o Nequi a cualquier hora.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Expansión nacional e internacional:</strong> Vender a clientes en Bogotá, Medellín, Cali o fuera de Colombia sin intermediación manual.</span>
                </li>
              </ul>
            </section>

            {/* FAQs */}
            <section className="mb-14 not-prose">
              <h2 className="text-2xl md:text-3xl font-bold font-title text-white mb-6">
                Preguntas Frecuentes
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
                ¿Aún tienes dudas sobre cuál es la mejor opción para tu negocio?
              </h2>
              <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto mb-8">
                En K&T Code analizamos tu modelo de monetización y te asesoramos para elegir la plataforma más rentable.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/precios"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-mono font-bold text-sm rounded-xl hover:bg-neutral-200 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Comparar Precios y Planes
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 text-white border border-white/20 font-mono font-bold text-sm rounded-xl hover:bg-white/20 transition-colors inline-flex items-center justify-center"
                >
                  Cotizar con un Ingeniero
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
