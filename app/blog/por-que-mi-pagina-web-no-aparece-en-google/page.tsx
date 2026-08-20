import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight, ShieldAlert, Wrench } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "¿Por Qué mi Página Web no Aparece en Google? 12 Causas y Soluciones",
  description:
    "Guía técnica para solucionar problemas de indexación y visibilidad en Google: robots.txt, noindex accidental, canibalización, Core Web Vitals y Search Console.",
  keywords: [
    "por que mi pagina web no aparece en google",
    "problemas indexacion google",
    "mi web no sale en google",
    "solucionar indexacion google search console",
    "errores seo tecnico colombia",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/por-que-mi-pagina-web-no-aparece-en-google"),
  },
  openGraph: {
    title: "¿Por Qué mi Página Web no Aparece en Google? 12 Causas y Soluciones",
    description:
      "Diagnóstico paso a paso de las 12 causas más comunes por las que un sitio web no se indexa en Google y cómo corregirlas.",
    type: "article",
    url: absoluteUrl("/blog/por-que-mi-pagina-web-no-aparece-en-google"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Cuánto tarda un sitio web nuevo en aparecer en Google?",
    answer:
      "Un sitio web nuevo tarda generalmente entre 4 días y 3 semanas en indexar sus páginas principales en Google, siempre que el sitemap esté enviado en Search Console y no existan directivas de bloqueo como noindex.",
  },
  {
    question: "¿Cómo saber si mi web está indexada?",
    answer:
      "Escribe en el buscador de Google: `site:tudominio.com`. Si aparecen tus páginas, Google las ha indexado. Si no aparece ningún resultado, existe un problema técnico de indexación o rastreo.",
  },
]

export default function PorQueNoApareceEnGooglePage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "¿Por Qué mi Página Web no Aparece en Google? 12 Causas y Soluciones",
            description:
              "Guía técnica paso a paso para diagnosticar y solucionar problemas de visibilidad e indexación en Google Search Console.",
            path: "/blog/por-que-mi-pagina-web-no-aparece-en-google",
            datePublished: "2026-08-08",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "No aparece en Google", path: "/blog/por-que-mi-pagina-web-no-aparece-en-google" },
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
                <span className="text-emerald-400 font-bold">Ingeniería & SEO</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>10 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>8 de agosto de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                ¿Por Qué mi Página Web no Aparece en Google? 12 Causas y Soluciones
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 8 de agosto de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-amber-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Invertir en una página web y descubrir que no aparece en Google es una de las mayores frustraciones para dueños de negocios en Colombia. En la inmensa mayoría de los casos, la causa es un <strong>error técnico prevenible</strong>. Analizamos las 12 causas principales y cómo resolverlas.
              </p>
            </header>

            <h2>Las 12 Causas Principales de No Indexación</h2>

            <h3>1. Etiqueta `noindex` olvidada tras el desarrollo</h3>
            <p>
              Durante la fase de construcción en entornos de prueba (staging), los desarrolladores suelen colocar <code>&lt;meta name=&quot;robots&quot; content=&quot;noindex, nofollow&quot;&gt;</code>. Si al pasar a producción olvidan retirarla, Google acatará la orden y jamás indexará la web.
            </p>

            <h3>2. Bloqueo en el archivo robots.txt</h3>
            <p>
              Una directiva como <code>Disallow: /</code> en la raíz impide que Googlebot rastree las URLs del sitio web.
            </p>

            <h3>3. Dominio sin enviar a Google Search Console</h3>
            <p>
              No verificar la propiedad del dominio en Search Console y no enviar el <code>sitemap.xml</code> retrasa sustancialmente el descubrimiento del sitio por parte de los rastreadores.
            </p>

            <h3>4. Velocidad de carga deficiente y fallos de Core Web Vitals</h3>
            <p>
              Sitios construidos con plantillas genéricas sobrecargadas que tardan más de 4 segundos en responder agotan el presupuesto de rastreo de Google (crawl budget), provocando que el bot abandone el sitio antes de indexarlo.
            </p>

            <h3>5. Contenido duplicado o canibalización de palabras clave</h3>
            <p>
              Tener múltiples páginas que compiten por el mismo término o textos copiados de otros sitios web genera filtros algorítmicos que relegan las páginas a los últimos resultados.
            </p>

            <h3>6. Estructura de encabezados rota (Múltiples H1 o sin H2)</h3>
            <p>
              Una página sin jerarquía semántica clara confunde a los motores de búsqueda sobre la temática central del contenido.
            </p>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Wrench className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Auditoría SEO Técnica en K&T Code</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                ¿Tu página web no genera tráfico ni clientes?
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Realizamos una auditoría técnica completa de tu dominio, identificamos errores de indexación y reconstruimos tu plataforma con arquitectura Next.js optimizada.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Solicitar Auditoría de Indexación <ArrowRight className="w-4 h-4" />
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
