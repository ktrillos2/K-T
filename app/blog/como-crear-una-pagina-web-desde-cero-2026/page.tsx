import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Globe, HelpCircle, ArrowRight, Layers, Sparkles } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

import BlogClusterNav from "@/components/blog/blog-cluster-nav"

export const metadata: Metadata = {
  title: "Checklist y Hoja de Ruta: Cómo Crear una Web Desde Cero Paso a Paso (2026)",
  description:
    "Checklist cronológico y hoja de ruta para principiantes: etapas de planificación, compra de dominio, diseño UI/UX y despliegue para lanzar tu web sin omitir pasos.",
  keywords: [
    "checklist crear pagina web",
    "hoja de ruta desarrollo web",
    "como crear una pagina web desde cero paso a paso",
    "etapas crear sitio web",
    "pasos crear pagina web colombia",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/como-crear-una-pagina-web-desde-cero-2026"),
  },
  openGraph: {
    title: "Checklist y Hoja de Ruta: Cómo Crear una Web Desde Cero Paso a Paso (2026)",
    description:
      "Guía práctica con el checklist cronológico paso a paso para lanzar un sitio web sin errores.",
    type: "article",
    url: absoluteUrl("/blog/como-crear-una-pagina-web-desde-cero-2026"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Cuánto tiempo toma crear una página web profesional desde cero?",
    answer:
      "Un sitio web corporativo profesional a medida toma entre 2 y 4 semanas de desarrollo, incluyendo la fase de diseño UI/UX en Figma, programación en Next.js, optimización de velocidad y configuración de SEO técnico.",
  },
  {
    question: "¿Qué se necesita para empezar a crear una web?",
    answer:
      "Se requiere definir el objetivo del sitio (captación de leads, venta online o presentación de marca), contratar un dominio personalizado (.com / .co), configurar el hosting y estructurar la arquitectura de información.",
  },
]

export default function ComoCrearPaginaDesdeCeroPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Checklist y Hoja de Ruta: Cómo Crear una Web Desde Cero Paso a Paso (2026)",
            description:
              "Checklist cronológico y hoja de ruta para principiantes: etapas de planificación, diseño UI/UX y despliegue sin errores.",
            path: "/blog/como-crear-una-pagina-web-desde-cero-2026",
            datePublished: "2026-08-18",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Crear Web Desde Cero", path: "/blog/como-crear-una-pagina-web-desde-cero-2026" },
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
                <span>12 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>18 de agosto de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Checklist y Hoja de Ruta: Cómo Crear una Web Desde Cero Paso a Paso
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 18 de agosto de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Lanzar una página web sin una hoja de ruta clara suele terminar en retrasos, costos imprevistos y sitios lentos. Este checklist reúne las etapas imprescindibles de planificación, diseño, desarrollo y SEO para completar tu proyecto con éxito. Si buscas profundizar en la arquitectura técnica, revisa también nuestra <Link href="/blog/como-crear-pagina-web-2026" className="text-white font-bold underline">Guía Completa de Arquitectura Web 2026</Link>.
              </p>
            </header>

            <h2>Los 6 Pasos del Checklist para Crear una Web</h2>

            <h3>Paso 1: Definición del Objetivo y Arquitectura de Contenidos</h3>
            <p>
              Antes de programar, establece el propósito del sitio: ¿captar prospectos comerciales vía WhatsApp, vender productos con carrito o validar autoridad corporativa? Diseña un mapa del sitio con la jerarquía de páginas principales.
            </p>

            <h3>Paso 2: Registro del Dominio y Configuración de DNS</h3>
            <p>
              Elige un nombre de dominio corto y representativo. En Colombia, las extensiones <code>.com</code> y <code>.co</code> son las más recomendadas para posicionamiento local e internacional.
            </p>

            <h3>Paso 3: Diseño UI/UX Exclusivo en Figma</h3>
            <p>
              Crea wireframes interactivos enfocados en la experiencia de usuario móvil (Mobile First), asegurando contrastes adecuados y botones de llamada a la acción (CTA) visibles.
            </p>

            <h3>Paso 4: Desarrollo Frontend con Next.js y React 19</h3>
            <p>
              Construir sobre Next.js garantiza tiempos de carga inferiores a 0.8s, renderizado del lado del servidor (SSR) y máxima puntuación en Core Web Vitals.
            </p>

            <h3>Paso 5: Optimización SEO Técnico y Datos Estructurados</h3>
            <p>
              Configura metadatos dinámicos, encabezados <code>H1-H3</code> semánticos, Schema JSON-LD y archivo sitemap.xml para indexación instantánea.
            </p>

            <h3>Paso 6: Despliegue en Edge CDN y Pruebas de Calidad</h3>
            <p>
              Publica el sitio en una red de distribución global (Edge Network) con certificado SSL gratuito y monitoreo continuo de disponibilidad.
            </p>

            {/* Topic Cluster Navigation */}
            <BlogClusterNav currentSlug="como-crear-una-pagina-web-desde-cero-2026" />

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Globe className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Desarrollo Web en K&T Code</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                ¿Prefieres que ingenieros expertos construyan tu web?
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Diseñamos y programamos tu sitio web corporativo en Next.js desde cero, listo para posicionar en Google y captar clientes desde $450.000 COP.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/precios/precio-pagina-web-colombia"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
                >
                  Ver Tarifas y Planes K&T Code <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/servicios/desarrollo-web-a-medida"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 text-white font-mono font-bold text-xs hover:bg-white/10 transition-all"
                >
                  Conocer Servicio de Desarrollo Web
                </Link>
              </div>
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
