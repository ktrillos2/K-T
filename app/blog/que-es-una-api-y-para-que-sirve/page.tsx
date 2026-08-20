import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Code2, HelpCircle, ArrowRight, Share2, Server } from "lucide-react"
import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Qué es una API y Para Qué Sirve: Explicado Fácil con Ejemplos",
  description:
    "Aprende qué es una API (Application Programming Interface), cómo conecta aplicaciones y por qué es el puente fundamental para pasarelas de pago y sistemas web modernos.",
  keywords: [
    "que es una api y para que sirve",
    "api explicacion facil",
    "ejemplos de api en paginas web",
    "como funciona una api rest",
    "integracion de apis colombia",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/que-es-una-api-y-para-que-sirve"),
  },
  openGraph: {
    title: "Qué es una API y Para Qué Sirve: Explicado Fácil con Ejemplos",
    description:
      "Descubre el concepto que permite a las aplicaciones comunicarse entre sí en internet.",
    type: "article",
    url: absoluteUrl("/blog/que-es-una-api-y-para-que-sirve"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Qué es una API en palabras simples?",
    answer:
      "Una API (Interfaz de Programación de Aplicaciones) es como el camarero en un restaurante: tú (el usuario) pides una comida (solicitud), el camarero lleva la orden a la cocina (el servidor) y te trae el plato preparado (la respuesta). Permite que dos programas distintos intercambien información de forma segura.",
  },
  {
    question: "¿Dónde se usan las APIs en una página web típica?",
    answer:
      "Se usan en el procesamiento de pagos (Wompi, PayU), cálculo de tarifas de envío en tiempo real, mapas interactivos de Google Maps, inicio de sesión con Google/Facebook y sincronización con bases de datos en la nube.",
  },
]

export default function QueEsUnaApiPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "Qué es una API y Para Qué Sirve: Explicado Fácil con Ejemplos",
            description:
              "Guía didáctica sobre qué son las APIs, cómo funcionan y por qué impulsan el software moderno.",
            path: "/blog/que-es-una-api-y-para-que-sirve",
            datePublished: "2026-06-22",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Qué es una API", path: "/blog/que-es-una-api-y-para-que-sirve" },
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
                <span className="text-emerald-400 font-bold">Ingeniería & Software</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>7 min de lectura</span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span>22 de junio de 2026</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6">
                Qué es una API y Para Qué Sirve: Explicado Fácil con Ejemplos
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
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Publicado el 22 de junio de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-emerald-400 pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Cada vez que compras un vuelo online, pagas con tarjeta de crédito en una tienda virtual o consultas el clima en tu teléfono, estás utilizando una <strong>API (Application Programming Interface)</strong>. Te explicamos su funcionamiento de forma clara y sin tecnicismos excesivos.
              </p>
            </header>

            <h2>3 Ejemplos Cotidianos de APIs</h2>
            <ul>
              <li><strong>Pasarelas de Pago Bancarias:</strong> Tu tienda web no almacena los datos de la tarjeta del cliente; se comunica a través de una API segura con Wompi o el banco para autorizar el cobro.</li>
              <li><strong>Mapas y Geolocalización:</strong> Tu sitio web muestra la ubicación de tu sede física utilizando la API de Google Maps en lugar de reprogramar un mapa desde cero.</li>
              <li><strong>Mensajería y Notificaciones:</strong> Los correos automáticos de confirmación o mensajes de WhatsApp se envían mediante APIs de servicios como Resend o Twilio.</li>
            </ul>

            <div className="not-prose my-12 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Share2 className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Integraciones Robustas</span>
              </div>
              <h3 className="text-2xl font-bold font-title text-white mb-3">
                Conectamos tu web con cualquier sistema o ERP
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                Desarrollamos e integramos APIs REST y GraphQL de alto rendimiento para automatizar procesos y conectar bases de datos en tiempo real.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg"
              >
                Solicitar Integración de APIs <ArrowRight className="w-4 h-4" />
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
