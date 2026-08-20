import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Search, HelpCircle, ArrowRight, ShieldCheck, Zap } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Cómo Aparecer en Google: Guía Paso a Paso para una Página Web",
  description:
    "Aprende cómo lograr que tu sitio web sea indexado y posicione en los primeros lugares de Google: Search Console, sitemaps, SEO on-page y autoridad.",
  keywords: [
    "como aparecer en google paso a paso",
    "indexar pagina web en google",
    "como salir en google con mi negocio",
    "posicionar pagina web en google colombia",
    "google search console guia",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/como-aparecer-en-google-guia-paso-a-paso"),
  },
  openGraph: {
    title: "Cómo Aparecer en Google: Guía Paso a Paso para una Página Web",
    description:
      "Guía práctica para lograr que Google descubra, indexe y recomiende tu sitio web en los resultados de búsqueda.",
    type: "article",
    url: absoluteUrl("/blog/como-aparecer-en-google-guia-paso-a-paso"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Es gratis aparecer en Google?",
    answer:
      "Sí, aparecer en los resultados orgánicos de Google es completamente gratuito. Google no cobra por indexar páginas ni por ubicarlas en las primeras posiciones; el ranking depende exclusivamente de la calidad técnica y relevancia del contenido.",
  },
  {
    question: "¿Qué herramienta es obligatoria para indexar mi web?",
    answer:
      "Google Search Console es la herramienta oficial y gratuita de Google para enviar tu sitemap.xml, monitorear el estado de indexación y resolver errores de rastreo.",
  },
]

export default function ComoAparecerEnGooglePage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Cómo Aparecer en Google: Guía Paso a Paso para una Página Web",
            description:
              "Aprende a registrar e indexar tu página web en Google Search Console para aparecer en las búsquedas de tus clientes.",
            path: "/blog/como-aparecer-en-google-guia-paso-a-paso",
            datePublished: "2026-08-06",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Aparecer en Google", path: "/blog/como-aparecer-en-google-guia-paso-a-paso" },
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
                <span className="text-emerald-400 font-bold">Ingeniería & SEO</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>9 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>6 de agosto de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Cómo Aparecer en Google: Guía Paso a Paso para una Página Web
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 6 de agosto de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Publicar un sitio web no garantiza automáticamente que Google lo muestre a los usuarios. Descubre el proceso técnico paso a paso para indexar tu dominio y escalar posiciones en los resultados de búsqueda.
              </p>
            </header>

            <h2>Paso a Paso para Aparecer en Google</h2>

            <h3>1. Dar de alta la propiedad en Google Search Console</h3>
            <p>
              Accede a Search Console, agrega la propiedad de tu dominio (preferiblemente mediante registro DNS TXT) para verificar que eres el propietario legítimo.
            </p>

            <h3>2. Generar y Enviar el Archivo Sitemap.xml</h3>
            <p>
              El sitemap es el mapa de ruta que le dice a Google qué páginas existen y cuándo se actualizaron. En Next.js, se genera dinámicamente en <code>/sitemap.xml</code>.
            </p>

            <h3>3. Optimizar Títulos y Meta Descripciones</h3>
            <p>
              Cada página debe tener un título <code>&lt;title&gt;</code> único que incluya tu servicio principal y ciudad, además de una descripción convincente que motive el clic.
            </p>

            <h3>4. Crear un Perfil de Google Business Profile (SEO Local)</h3>
            <p>
              Si atiendes clientes en una ciudad específica de Colombia (Bogotá, Medellín, Cúcuta, Cali), tu ficha de Google Maps verificada conectada a tu web multiplicará tus llamadas y prospectos.
            </p>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Search className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Indexación Garantizada</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Haz que tus clientes te encuentren primero
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Todas las páginas web desarrolladas por K&T Code se entregan con Search Console configurado, sitemap dinámico y datos estructurados Schema.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Crear Mi Página Optimizada <ArrowRight className="w-4 h-4" />
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
