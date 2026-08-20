import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, ShieldCheck, HelpCircle, ArrowRight, Wrench, RefreshCw } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "¿Cuánto Cuesta el Mantenimiento de una Página Web en Colombia en 2026?",
  description:
    "Precios reales de planes de mantenimiento web en Colombia: qué incluye el soporte técnico mensual, copias de seguridad, actualizaciones y prevención de caídas.",
  keywords: [
    "cuanto cuesta el mantenimiento de una pagina web en colombia",
    "precios mantenimiento web colombia",
    "costo soporte pagina web bogota",
    "planes mantenimiento web empresas",
    "actualizacion y soporte tecnico web",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/cuanto-cuesta-mantenimiento-pagina-web-colombia"),
  },
  openGraph: {
    title: "¿Cuánto Cuesta el Mantenimiento de una Página Web en Colombia?",
    description:
      "Tabla de tarifas y planes de soporte técnico preventivo para páginas web y tiendas virtuales en Colombia.",
    type: "article",
    url: absoluteUrl("/blog/cuanto-cuesta-mantenimiento-pagina-web-colombia"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Es obligatorio pagar mantenimiento mensual por una página web?",
    answer:
      "No es obligatorio por ley, pero es indispensable para la continuidad del negocio. Sin mantenimiento preventivo, los sitios web acumulan vulnerabilidades de seguridad, sufren caídas no detectadas, degradan su velocidad de carga y pierden posicionamiento orgánico en Google.",
  },
  {
    question: "¿Cuánto cuesta un plan de soporte web en Colombia?",
    answer:
      "Un plan de mantenimiento básico (backups, monitoreo y soporte de caídas) oscila entre $150.000 y $350.000 COP mensuales. Planes corporativos con bolsa de horas de desarrollo y optimización continua oscilan entre $500.000 y $1.800.000 COP mensuales.",
  },
]

export default function CuantoCuestaMantenimientoWebPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "¿Cuánto Cuesta el Mantenimiento de una Página Web en Colombia?",
            description:
              "Guía de precios y servicios incluidos en los planes de mantenimiento y soporte técnico web en Colombia.",
            path: "/blog/cuanto-cuesta-mantenimiento-pagina-web-colombia",
            datePublished: "2026-07-12",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Mantenimiento Web Precios", path: "/blog/cuanto-cuesta-mantenimiento-pagina-web-colombia" },
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
                <span>7 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>12 de julio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                ¿Cuánto Cuesta el Mantenimiento de una Página Web en Colombia?
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 12 de julio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Una página web o tienda virtual requiere supervisión continua para garantizar que los formularios no fallen, los certificados SSL se renueven y la base de datos se mantenga segura. Analizamos las tarifas y qué debe incluir un plan profesional de mantenimiento.
              </p>
            </header>

            <h2>Tabla de Planes de Mantenimiento Web en Colombia</h2>
            <div className="not-prose overflow-x-auto my-8 border border-white/15 rounded-2xl">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <thead className="bg-neutral-900 border-b border-white/10 text-white">
                  <tr>
                    <th className="p-4">Nivel de Soporte</th>
                    <th className="p-4 text-emerald-400">Costo Mensual (COP)</th>
                    <th className="p-4 text-neutral-300">Servicios Clave Incluidos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-neutral-300">
                  <tr>
                    <td className="p-4 font-bold text-white">Plan Preventivo Básico</td>
                    <td className="p-4 text-emerald-400">$180.000 - $350.000</td>
                    <td className="p-4">Backups semanales, monitoreo 24/7 de caídas, renovación SSL y parches de seguridad</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Plan Comercial / E-commerce</td>
                    <td className="p-4 text-emerald-400">$450.000 - $850.000</td>
                    <td className="p-4">Soporte de pasarelas, backups diarios, bolsa de 4h de cambios y auditoría mensual de velocidad</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Plan Dedicado Empresarial</td>
                    <td className="p-4 text-emerald-400">$1.200.000 - $2.500.000+</td>
                    <td className="p-4">Ingeniero asignado, tiempo de respuesta &lt; 2 horas, bolsa de 12h de desarrollo y monitoreo proactivo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Qué Debe Incluir un Mantenimiento de Alto Nivel</h2>
            <ul>
              <li><strong>Monitoreo de Uptime 99.9%:</strong> Alertas instantáneas si la web deja de responder para resolver el incidente antes que los usuarios lo noten.</li>
              <li><strong>Copias de Seguridad Automatizadas en la Nube:</strong> Resguardos periódicos de bases de datos y archivos multimedia fuera del servidor principal.</li>
              <li><strong>Optimización Continua de Core Web Vitals:</strong> Limpieza de caché, compresión de nuevos activos y control de scripts de terceros.</li>
              <li><strong>Verificación de Formularios y Pasarelas de Pago:</strong> Pruebas periódicas para asegurar que ningún lead o venta se pierda.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <RefreshCw className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Soporte y Mantenimiento Web en K&T Code</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Protege la inversión de tu página web
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Ofrecemos planes de mantenimiento preventivo y soporte técnico continuo para garantizar máxima disponibilidad, seguridad y rendimiento.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Contratar Plan de Mantenimiento <ArrowRight className="w-4 h-4" />
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
