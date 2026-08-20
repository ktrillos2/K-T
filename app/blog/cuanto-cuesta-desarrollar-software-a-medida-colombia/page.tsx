import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, DollarSign, HelpCircle, ArrowRight, Code2, Server } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "¿Cuánto Cuesta Desarrollar Software a Medida en Colombia en 2026?",
  description:
    "Guía completa de precios para desarrollo de software a medida en Colombia en 2026: costos por horas, modelos de cotización, fases de ingeniería y retorno de inversión.",
  keywords: [
    "cuanto cuesta desarrollar software a medida en colombia",
    "precios desarrollo de software colombia",
    "cotizacion software a medida bogota",
    "costo de desarrollo app web colombia",
    "cuanto cobra programador senior colombia",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/cuanto-cuesta-desarrollar-software-a-medida-colombia"),
  },
  openGraph: {
    title: "¿Cuánto Cuesta Desarrollar Software a Medida en Colombia en 2026?",
    description:
      "Tabla de costos reales en COP/USD, estimación de presupuestos y fases de desarrollo de software empresarial.",
    type: "article",
    url: absoluteUrl("/blog/cuanto-cuesta-desarrollar-software-a-medida-colombia"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Cuál es el rango de precio para un software a medida en Colombia?",
    answer:
      "Un software a medida inicial (portal administrativo, panel de gestión o MVP) parte típicamente desde $4.500.000 a $12.000.000 COP ($1.200 - $3.000 USD). Plataformas empresariales complejas o SaaS con arquitectura multi-tenant oscilan entre $15.000.000 y $45.000.000 COP en adelante según alcance.",
  },
  {
    question: "¿Qué factores determinan el costo de un desarrollo?",
    answer:
      "Los factores determinantes son: la complejidad de la lógica de negocio, número de integraciones externas (APIs, pasarelas, ERPs), modelo de base de datos, nivel de seguridad/roles y la arquitectura de infraestructura en la nube.",
  },
]

export default function CuantoCuestaSoftwareMedidaPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "¿Cuánto Cuesta Desarrollar Software a Medida en Colombia en 2026?",
            description:
              "Guía de precios reales y desglose técnico para cotizar y contratar software a medida empresarial en Colombia.",
            path: "/blog/cuanto-cuesta-desarrollar-software-a-medida-colombia",
            datePublished: "2026-08-03",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Costo Software a Medida", path: "/blog/cuanto-cuesta-desarrollar-software-a-medida-colombia" },
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
                <span>11 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>3 de agosto de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                ¿Cuánto Cuesta Desarrollar Software a Medida en Colombia en 2026?
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 3 de agosto de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Desarrollar software propio permite a las empresas automatizar operaciones críticas, reducir costos recurrentes de licencias SaaS y poseer la propiedad total de sus datos y código fuente. Desglosamos los costos reales en Colombia en 2026.
              </p>
            </header>

            <h2>Tabla de Rangos de Precios según Tipo de Software</h2>
            <div className="not-prose overflow-x-auto my-8 border border-white/15 rounded-2xl">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <thead className="bg-neutral-900 border-b border-white/10 text-white">
                  <tr>
                    <th className="p-4">Tipo de Proyecto</th>
                    <th className="p-4 text-emerald-400">Rango en COP</th>
                    <th className="p-4 text-neutral-300">Rango en USD</th>
                    <th className="p-4 text-neutral-400">Tiempo Estimado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-neutral-300">
                  <tr>
                    <td className="p-4 font-bold text-white">Panel Administrativo / MVP Interno</td>
                    <td className="p-4 text-emerald-400">$4.500.000 - $9.000.000</td>
                    <td className="p-4">$1.200 - $2.300</td>
                    <td className="p-4">3 a 5 semanas</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Portal Web B2B / Sistema de Clientes</td>
                    <td className="p-4 text-emerald-400">$9.000.000 - $18.000.000</td>
                    <td className="p-4">$2.300 - $4.500</td>
                    <td className="p-4">6 a 10 semanas</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Plataforma SaaS Multi-tenant Completa</td>
                    <td className="p-4 text-emerald-400">$18.000.000 - $45.000.000+</td>
                    <td className="p-4">$4.500 - $11.000+</td>
                    <td className="p-4">12 a 20 semanas</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Fases de Ingeniería que Componen el Presupuesto</h2>
            <ul>
              <li><strong>Arquitectura y Diseño UI/UX en Figma:</strong> Flujos de usuario, diseño responsive y validación antes de programar.</li>
              <li><strong>Desarrollo Frontend en Next.js y React 19:</strong> Renderizado servidor ultra rápido y componentes modulares tipados con TypeScript.</li>
              <li><strong>Backend y Base de Datos (PostgreSQL / Supabase):</strong> Modelado relacional, autenticación segura, control de roles (RBAC) y Server Actions.</li>
              <li><strong>Control de Calidad (QA) y Despliegue en Edge CDN:</strong> Pruebas de estrés, auditorías de seguridad y despliegue continuo.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Code2 className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Desarrollo de Software en K&T Code</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                ¿Tienes un proyecto de software en mente?
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Evaluamos los requerimientos de tu empresa y te entregamos una propuesta técnica detallada con alcance, arquitectura y cotización transparente.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Cotizar Software a Medida <ArrowRight className="w-4 h-4" />
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
