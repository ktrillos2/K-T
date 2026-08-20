import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Users, Building, ArrowRight } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Agencia vs. Freelance para Desarrollo Web en Colombia",
  description:
    "Comparativa realista entre contratar una agencia o un programador freelance en Colombia: costos, tiempos, garantías, calidad técnica y cuál te conviene.",
  keywords: [
    "agencia vs freelance desarrollo web",
    "contratar agencia web o freelance colombia",
    "cuanto cobra freelance vs agencia web",
    "ventajas agencia desarrollo software",
    "riesgos contratar programador freelance",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/agencia-vs-freelance-desarrollo-web"),
  },
  openGraph: {
    title: "Agencia vs. Freelance para Desarrollo Web en Colombia",
    description:
      "Analizamos costos, garantías, soporte y calidad técnica para que elijas la opción correcta para tu empresa.",
    type: "article",
    url: absoluteUrl("/blog/agencia-vs-freelance-desarrollo-web"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Cuándo es mejor contratar a un programador freelance?",
    answer:
      "Un freelance es ideal para tareas puntuales, ajustes menores en un sitio existente, o proyectos muy tempranos con presupuestos inferiores a $500.000 COP donde el impacto comercial del retraso o la falta de soporte no sea crítico.",
  },
  {
    question: "¿Por qué las empresas consolidadas prefieren una agencia?",
    answer:
      "Porque una agencia ofrece un equipo multidisciplinario (Diseñador UI/UX, Ingeniero Frontend, Backend y Especialista SEO), factura formalmente con RUT/Cámara de Comercio, firma contratos con cláusulas de confidencialidad y garantiza soporte y mantenimiento continuo sin depender de la disponibilidad de una sola persona.",
  },
  {
    question: "¿K&T Code es una agencia o un equipo freelance?",
    answer:
      "K&T Code es una empresa formalmente constituida en Colombia de desarrollo web y software a la medida, liderada por ingenieros de software calificados y con contratos y garantías legales de entrega.",
  },
]

export default function AgenciaVsFreelancePage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Agencia vs. Freelance para Desarrollo Web en Colombia: Pros, Contras y Costos Reales",
            description:
              "Comparativa objetiva entre contratar una agencia especializada o un programador independiente para crear tu página web en Colombia.",
            path: "/blog/agencia-vs-freelance-desarrollo-web",
            datePublished: "2026-03-03",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Agencia vs. Freelance", path: "/blog/agencia-vs-freelance-desarrollo-web" },
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
                <span className="text-emerald-400 font-bold">Guías de Contratación</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>8 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>Colombia 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Agencia vs. Freelance para Desarrollo Web en Colombia: Pros, Contras y Costos
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
                Al cotizar una página web o software a medida en Colombia, te enfrentarás a una decisión crucial: <strong>¿contratar a un desarrollador independiente (freelance) o a una agencia de desarrollo web?</strong> Ambos modelos tienen ventajas legítimas según la etapa de tu negocio y tu presupuesto.
              </p>
            </header>

            {/* Quick Summary Table */}
            <section className="mb-14 not-prose overflow-x-auto">
              <h2 className="text-2xl font-bold font-title text-white mb-6">
                Tabla Comparativa: Freelance vs. Agencia de Desarrollo Web
              </h2>
              <div className="border border-white/15 rounded-2xl overflow-hidden bg-white/[0.02]">
                <table className="w-full text-left font-mono text-xs md:text-sm">
                  <thead className="bg-white/10 text-white border-b border-white/10">
                    <tr>
                      <th className="p-4">Criterio</th>
                      <th className="p-4">Programador Freelance</th>
                      <th className="p-4">Agencia de Desarrollo (K&T)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-neutral-300">
                    <tr>
                      <td className="p-4 font-bold text-white">Rango de Precios</td>
                      <td className="p-4 text-emerald-400">$200.000 - $800.000 COP</td>
                      <td className="p-4">$450.000 - $3.500.000+ COP</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Equipo & Disciplinas</td>
                      <td className="p-4">1 sola persona (generalista)</td>
                      <td className="p-4 text-emerald-400">Diseñador UI/UX + Ing. Frontend + Backend + SEO</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Garantía Legal & Contrato</td>
                      <td className="p-4 text-amber-400">Informal / Acuerdos verbales frecuentes</td>
                      <td className="p-4 text-emerald-400">Contrato formal, RUT, Factura electrónica y SLA</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Continuidad de Soporte</td>
                      <td className="p-4 text-amber-400">Riesgo si cambia de empleo o proyecto</td>
                      <td className="p-4 text-emerald-400">Continuidad garantizada por equipo corporativo</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Enfoque Tecnológico</td>
                      <td className="p-4">Plantillas WordPress prediseñadas</td>
                      <td className="p-4 text-emerald-400">Código a medida en Next.js y TypeScript</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Ideal Para</td>
                      <td className="p-4">Proyectos individuales o tareas muy pequeñas</td>
                      <td className="p-4">Empresas, marcas y plataformas de alto impacto</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* When to choose Freelance */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-title mb-6">
                1. ¿Cuándo es Recomendable Contratar un Freelance?
              </h2>
              <ul className="space-y-2 text-neutral-300 font-mono text-sm list-none pl-0">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Micro-presupuestos:</strong> Cuando estás validando una idea con menos de $400.000 COP y puedes tolerar retrasos o ajustes manuales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Tareas y parches puntuales:</strong> Cambiar un banner, arreglar un botón CSS o actualizar un texto en un sitio existente.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Comunicación directa 1 a 1:</strong> Si prefieres tratar exclusivamente con la persona que escribe las líneas de código.</span>
                </li>
              </ul>
            </section>

            {/* When to choose an Agency */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-title mb-6">
                2. ¿Cuándo es Imprescindible Trabajar con una Agencia?
              </h2>
              <ul className="space-y-2 text-neutral-300 font-mono text-sm list-none pl-0">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Imagen y credibilidad corporativa:</strong> Tu web es la carta de presentación ante clientes B2B, inversionistas o licitaciones y no puede lucir como una plantilla genérica.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Rendimiento, SEO y conversión real:</strong> Diseños pensados en flujos de compra, tiempos de carga inferiores a 1 segundo y estructuración Schema.org.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Seguridad jurídica y facturación:</strong> Requieres factura electrónica para deducibilidad tributaria y contratos con penalizaciones por incumplimiento.</span>
                </li>
              </ul>
            </section>

            {/* FAQs */}
            <section className="mb-14 not-prose">
              <h2 className="text-2xl md:text-3xl font-bold font-title text-white mb-6">
                Preguntas Frecuentes sobre Agencia vs. Freelance
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
                Desarrollo web profesional con respaldo de ingeniería
              </h2>
              <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto mb-8">
                En K&T Code combinamos la agilidad y precios justos con los estándares, contratos y calidad de una agencia especializada.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/precios"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-mono font-bold text-sm rounded-xl hover:bg-neutral-200 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Conoce Nuestros Planes
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 text-white border border-white/20 font-mono font-bold text-sm rounded-xl hover:bg-white/20 transition-colors inline-flex items-center justify-center"
                >
                  Hablar con un Ingeniero
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
