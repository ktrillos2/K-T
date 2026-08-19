import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Globe, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Qué es un Dominio Web y Cómo Elegir el Mejor para tu Negocio | K&T Code",
  description:
    "Guía práctica sobre dominios web: extensiones (.com, .co, .com.co), precios en Colombia, cómo elegir un nombre de marca y evitar errores comunes.",
  keywords: [
    "que es un dominio web",
    "como elegir un dominio",
    "precio dominio .com colombia",
    "extensiones de dominio co com co",
    "donde comprar dominios web colombia",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/que-es-un-dominio-web-como-elegir"),
  },
  openGraph: {
    title: "Qué es un Dominio Web y Cómo Elegir el Mejor para tu Negocio",
    description:
      "Todo lo que necesitas saber antes de registrar el dominio de tu empresa.",
    type: "article",
    url: absoluteUrl("/blog/que-es-un-dominio-web-como-elegir"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Cuánto cuesta registrar un dominio web en Colombia?",
    answer:
      "Un dominio .com estándar cuesta entre $12 y $18 USD al año (aprox. $50.000 - $75.000 COP). Un dominio territorial .co o .com.co oscila entre $20 y $35 USD anuales.",
  },
  {
    question: "¿Es mejor elegir .com o .co?",
    answer:
      "Si tu negocio opera exclusivamente en Colombia, un dominio `.co` o `.com.co` refuerza el posicionamiento local. Si planeas vender a nivel internacional, el `.com` sigue siendo el estándar global más reconocido.",
  },
]

export default function QueEsUnDominioWebPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Qué es un Dominio Web y Cómo Elegir el Mejor para tu Negocio",
            description:
              "Aprende cómo seleccionar y registrar el dominio ideal para tu empresa.",
            path: "/blog/que-es-un-dominio-web-como-elegir",
            datePublished: "2026-08-01",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Qué es un Dominio Web", path: "/blog/que-es-un-dominio-web-como-elegir" },
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
                <span>7 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>1 de agosto de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Qué es un Dominio Web y Cómo Elegir el Mejor para tu Negocio
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 1 de agosto de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                El dominio es la dirección única e irrepetible mediante la cual tus clientes acceden a tu sitio web (por ejemplo, <code>kytcode.lat</code> o <code>tuempresa.com</code>). Elegir el nombre correcto es una de las decisiones de marca más importantes.
              </p>
            </header>

            <h2>Consejos Clave para Elegir tu Dominio</h2>
            <ul>
              <li><strong>Mantenlo corto y fácil de pronunciar:</strong> Evita números, guiones intermedios o combinaciones confusas de letras.</li>
              <li><strong>Prioriza el nombre de tu marca sobre palabras clave genéricas:</strong> Los dominios de marca generan mayor retención y valor comercial a largo plazo.</li>
              <li><strong>Registra variaciones defensivas:</strong> Si compras <code>tuempresa.com</code>, considera adquirir también <code>tuempresa.co</code> para proteger tu identidad.</li>
              <li><strong>Usa registradores acreditados por ICANN:</strong> Cloudflare Registrar, Namecheap o Google Domains ofrecen precios transparentes sin cobros abusivos de renovación.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Globe className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Asesoría de Dominio y DNS</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                ¿Necesitas ayuda para configurar tu dominio corporativo?
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                En K&T Code te asesoramos en la elección y configuramos tus registros DNS, correos corporativos y certificados SSL sin costo adicional en todos nuestros proyectos.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Hablar con un Asesor <ArrowRight className="w-4 h-4" />
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
