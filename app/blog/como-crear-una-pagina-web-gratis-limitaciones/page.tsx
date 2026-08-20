import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, AlertOctagon, HelpCircle, ArrowRight, ShieldAlert } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Cómo Crear una Página Web Gratis: Opciones, Limitaciones y Alternativas",
  description:
    "Análisis objetivo de las plataformas gratuitas para crear páginas web: publicidad obligatoria, subdominios, falta de SEO y cuándo invertir en una web profesional.",
  keywords: [
    "como crear una pagina web gratis",
    "limitaciones paginas web gratis",
    "creadores de sitios web gratis desventajas",
    "wix gratis opiniones",
    "hacer pagina web gratis para negocio",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/como-crear-una-pagina-web-gratis-limitaciones"),
  },
  openGraph: {
    title: "Cómo Crear una Página Web Gratis: Opciones, Limitaciones y Alternativas",
    description:
      "Descubre la verdad sobre las páginas web gratuitas y sus costos ocultos en credibilidad y ventas.",
    type: "article",
    url: absoluteUrl("/blog/como-crear-una-pagina-web-gratis-limitaciones"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Es recomendable tener una página web gratis para mi negocio?",
    answer:
      "Para proyectos escolares o experimentos personales puede funcionar, pero para un negocio formal genera desconfianza al mostrar subdominios genéricos (ej. tuempresa.wixsite.com) y anuncios publicitarios de terceros ajenos a tu marca.",
  },
  {
    question: "¿Las páginas web gratis pueden posicionar en los primeros lugares de Google?",
    answer:
      "Es extremadamente difícil. Los planes gratuitos no permiten configurar sitemaps avanzados, carecen de optimización Core Web Vitals y no cuentan con dominio propio con autoridad.",
  },
]

export default function PaginaWebGratisLimitacionesPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Cómo Crear una Página Web Gratis: Opciones, Limitaciones y Alternativas",
            description:
              "Revisión de las opciones gratuitas de creación web y por qué una web profesional genera mayor retorno de inversión.",
            path: "/blog/como-crear-una-pagina-web-gratis-limitaciones",
            datePublished: "2026-08-14",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Páginas Web Gratis", path: "/blog/como-crear-una-pagina-web-gratis-limitaciones" },
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
                <span>8 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>14 de agosto de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Cómo Crear una Página Web Gratis: Opciones, Limitaciones y Alternativas
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 14 de agosto de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-amber-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Muchas plataformas prometen <em>"crea tu página web 100% gratis en 5 minutos"</em>. Sin embargo, detrás de la gratuidad existen severas limitaciones técnicas y comerciales que terminan costando clientes y ventas.
              </p>
            </header>

            <h2>Las 4 Grandes Limitaciones de las Webs Gratuitas</h2>
            <ul>
              <li><strong>Subdominios no profesionales:</strong> No puedes usar tu propio dominio <code>tuempresa.com</code>; te obligan a usar URLs como <code>usuario.sitio.com</code>.</li>
              <li><strong>Publicidad invasiva obligatoria:</strong> La plataforma coloca banners publicitarios de su propia marca o de terceros en tu sitio.</li>
              <li><strong>Cero optimización SEO real:</strong> Sin acceso a Schema.org, edición de sitemaps o control de Core Web Vitals.</li>
              <li><strong>Sin propiedad del código:</strong> Si la plataforma cambia sus políticas o cierra, pierdes todo tu trabajo sin posibilidad de migración.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <AlertOctagon className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Alternativa Profesional y Accesible</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Invierte en una web propia que inspire confianza
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                En K&T Code desarrollamos sitios web corporativos con código 100% tuyo, sin cuotas mensuales obligatorias de creadores visuales.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Ver Planes Accesibles <ArrowRight className="w-4 h-4" />
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
