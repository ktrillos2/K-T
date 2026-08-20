import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Code2, Cpu, ArrowRight } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Next.js vs. React: Diferencias de Arquitectura y Cuándo Usar Cada Uno",
  description:
    "Explicación técnica clara entre React (librería UI) y Next.js (framework fullstack): renderizado SSR vs CSR, SEO, velocidad y arquitectura recomendada.",
  keywords: [
    "nextjs vs react",
    "diferencia entre react y next js",
    "cuando usar next js o react",
    "react spa vs nextjs ssr",
    "ventajas de nextjs sobre react",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/nextjs-vs-react"),
  },
  openGraph: {
    title: "Next.js vs. React: Diferencias de Arquitectura y Cuándo Usar Cada Uno",
    description:
      "Aprende las diferencias esenciales entre React y Next.js: Server Components, SEO, enrutamiento y rendimiento.",
    type: "article",
    url: absoluteUrl("/blog/nextjs-vs-react"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Es Next.js un reemplazo de React o lo incluye?",
    answer:
      "Next.js no reemplaza a React; está construido directamente sobre React. React actúa como la librería para diseñar componentes visuales e interactividad, mientras que Next.js proporciona el framework con servidor, enrutador, optimización de fuentes, imágenes y renderizado SSR/SSG.",
  },
  {
    question: "¿Por qué React SPA puro tiene problemas de SEO?",
    answer:
      "Una Single Page Application (SPA) en React clásico carga un archivo HTML vacío (<div></div>) y ejecuta el código en el navegador del usuario (Client-Side Rendering). Esto obliga a los rastreadores de Google y motores de IA a esperar la ejecución de JavaScript para descubrir el contenido, lo que retrasa o perjudica la indexación.",
  },
  {
    question: "¿Cuándo es suficiente usar React puro con Vite?",
    answer:
      "React con Vite es excelente para paneles de administración privados, dashboards internos o aplicaciones web con login obligatorio donde el contenido no necesita posicionarse en motores de búsqueda públicos.",
  },
]

export default function NextjsVsReactPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Next.js vs. React: Diferencias de Arquitectura, Renderizado y Cuándo Usar Cada Uno",
            description:
              "Comparativa técnica entre React puro y el framework Next.js: modelos de renderizado, SEO, tiempos de carga y arquitectura de software.",
            path: "/blog/nextjs-vs-react",
            datePublished: "2026-03-04",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Next.js vs. React", path: "/blog/nextjs-vs-react" },
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
                <span className="text-emerald-400 font-bold">Ingeniería Frontend</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>7 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>Guía Técnica</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Next.js vs. React: Diferencias de Arquitectura, Renderizado y Cuándo Usar Cada Uno
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
                Una duda habitual en la industria es: <strong>¿React y Next.js son rivales?</strong> La respuesta breve es que no: <strong>React es la librería base y Next.js es el framework de producción</strong>. En este artículo explicamos qué añade Next.js, por qué domina el desarrollo corporativo y cuándo elegir cada uno.
              </p>
            </header>

            {/* Quick Summary Table */}
            <section className="mb-14 not-prose overflow-x-auto">
              <h2 className="text-2xl font-bold font-title text-white mb-6">
                Tabla Comparativa: React vs. Next.js
              </h2>
              <div className="border border-white/15 rounded-2xl overflow-hidden bg-white/[0.02]">
                <table className="w-full text-left font-mono text-xs md:text-sm">
                  <thead className="bg-white/10 text-white border-b border-white/10">
                    <tr>
                      <th className="p-4">Característica</th>
                      <th className="p-4">React Puro (Vite / SPA)</th>
                      <th className="p-4">Next.js (App Router Framework)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-neutral-300">
                    <tr>
                      <td className="p-4 font-bold text-white">Tipo de Herramienta</td>
                      <td className="p-4">Librería de interfaces UI</td>
                      <td className="p-4 text-emerald-400">Framework Fullstack completo</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Modelo de Renderizado</td>
                      <td className="p-4">Client-Side Rendering (CSR)</td>
                      <td className="p-4 text-emerald-400">SSR, SSG, ISR y Server Components</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Indexación SEO & Motores IA</td>
                      <td className="p-4 text-amber-400">Complejo (HTML inicial vacío)</td>
                      <td className="p-4 text-emerald-400">Nativo (HTML completo pre-renderizado)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Enrutamiento (Routing)</td>
                      <td className="p-4">Requiere librerías externas (React Router)</td>
                      <td className="p-4 text-emerald-400">Integrado por carpetas (App Router)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Optimización de Imágenes</td>
                      <td className="p-4">Manual (&lt;img&gt; estándar)</td>
                      <td className="p-4 text-emerald-400">Automática (Next/Image en AVIF/WebP)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Backend & Server Actions</td>
                      <td className="p-4">Requiere servidor separado (Express/Node)</td>
                      <td className="p-4 text-emerald-400">Server Actions y Route Handlers integrados</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Ideal Para</td>
                      <td className="p-4">Paneles privados, CRMs, herramientas SaaS</td>
                      <td className="p-4">Páginas web, e-commerce, plataformas públicas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* When to use React */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-title mb-6">
                1. ¿Cuándo Utilizar React Puro (Vite / SPA)?
              </h2>
              <ul className="space-y-2 text-neutral-300 font-mono text-sm list-none pl-0">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Paneles de gestión privados y CRMs:</strong> Aplicaciones donde el usuario inicia sesión y el contenido no requiere posicionamiento en Google.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Herramientas con alta interacción en el cliente:</strong> Editores gráficos, lienzos interactivos (Canvas) o dashboards analíticos en tiempo real.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Despliegues estáticos simples:</strong> Alojamiento en buckets S3 o almacenamiento de objetos con costo mínimo.</span>
                </li>
              </ul>
            </section>

            {/* When to use Next.js */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-title mb-6">
                2. ¿Cuándo Utilizar Next.js?
              </h2>
              <ul className="space-y-2 text-neutral-300 font-mono text-sm list-none pl-0">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Páginas corporativas y captación de leads:</strong> Donde el posicionamiento SEO y los tiempos de carga rápidos son determinantes para la conversión.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>E-commerce y tiendas virtuales:</strong> Catálogos con miles de productos renderizados estáticamente (SSG) o al vuelo (SSR).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Arquitecturas seguras sin servidor dedicado:</strong> Ejecución de lógica sensible en el servidor mediante Server Actions sin exponer claves API al cliente.</span>
                </li>
              </ul>
            </section>

            {/* FAQs */}
            <section className="mb-14 not-prose">
              <h2 className="text-2xl md:text-3xl font-bold font-title text-white mb-6">
                Preguntas Frecuentes sobre React y Next.js
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
                Desarrollamos tu aplicación web con la arquitectura correcta
              </h2>
              <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto mb-8">
                En K&T Code somos especialistas en React 19 y Next.js para empresas de alto crecimiento en Colombia y el exterior.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/servicios/desarrollo-nextjs"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-mono font-bold text-sm rounded-xl hover:bg-neutral-200 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Conoce Nuestro Servicio Next.js
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 text-white border border-white/20 font-mono font-bold text-sm rounded-xl hover:bg-white/20 transition-colors inline-flex items-center justify-center"
                >
                  Cotizar Proyecto
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
