import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, DollarSign, HelpCircle, Layers, ShieldCheck, Zap, XCircle, Clock } from "lucide-react"

import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "¿Cuánto Cuesta una Página Web en Colombia en 2026? Precios Reales y Guía",
  description:
    "Descubre cuánto cuesta una página web en Colombia en 2026. Tabla de precios reales en COP, costos de hosting, dominio, pasarelas de pago y diferencias entre freelance vs agencia.",
  keywords: [
    "cuanto cuesta una pagina web en colombia",
    "precio crear pagina web colombia",
    "cuanto cobra una agencia por una pagina web en colombia",
    "precios paginas web bogota medellin",
    "costo tienda virtual colombia",
    "cuanto vale una pagina web 2026",
    "cotizacion pagina web colombia",
    "K&T Code precios",
  ],
  alternates: {
    canonical: absoluteUrl("/blog/cuanto-cuesta-una-pagina-web-en-colombia"),
    languages: {
      "es-CO": absoluteUrl("/blog/cuanto-cuesta-una-pagina-web-en-colombia"),
      "es": absoluteUrl("/blog/cuanto-cuesta-una-pagina-web-en-colombia"),
      "x-default": absoluteUrl("/blog/cuanto-cuesta-una-pagina-web-en-colombia"),
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "¿Cuánto Cuesta una Página Web en Colombia en 2026? Precios Reales y Guía",
    description: "Tabla de precios reales en COP, costos de hosting, dominio, pasarelas colombianas y comparativas de tecnologías.",
    type: "article",
    url: absoluteUrl("/blog/cuanto-cuesta-una-pagina-web-en-colombia"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

const faqs = [
  {
    question: "¿Cuánto cuesta crear una página web en Colombia en 2026?",
    answer:
      "En promedio, una landing page profesional cuesta desde $450.000 COP, un sitio web corporativo completo para empresas cuesta desde $2.500.000 COP, y una tienda virtual con pasarelas de pago oscila desde $1.300.000 COP en adelante. Los desarrollos de software a medida se cotizan según alcance.",
  },
  {
    question: "¿Cuánto cobra una agencia vs. un programador freelance?",
    answer:
      "Un freelance suele cobrar entre $200.000 y $600.000 COP pero con riesgos de soporte limitado y uso de plantillas prediseñadas lentas. Una agencia especializada como K&T Code ofrece planes desde $450.000 COP con ingeniería en Next.js, diseño exclusivo en Figma, SEO semántico y garantía de soporte.",
  },
  {
    question: "¿Qué costos adicionales obligatorios tiene una página web?",
    answer:
      "Los únicos costos fijos obligatorios son el dominio ($60.000 a $160.000 COP/año) y el alojamiento/hosting. En K&T configuramos redes globales Vercel/Cloudflare que eliminan costos de hosting tradicional para la mayoría de sitios.",
  },
  {
    question: "¿Cuánto cobran las pasarelas de pago como Wompi o Bold en Colombia?",
    answer:
      "Wompi cobra aproximadamente 2.65% + $700 COP por transacción exitosa con PSE o tarjetas Bancolombia. Bold y PayU manejan comisiones de 2.99% a 3.29% + $900 COP + IVA.",
  },
]

export default function CuantoCuestaPaginaWebBlogPage() {
  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: "¿Cuánto Cuesta una Página Web en Colombia en 2026? Precios Reales y Guía",
            description: "Guía completa de precios de desarrollo web en Colombia con tarifas reales, comparaciones y costos fijos.",
            path: "/blog/cuanto-cuesta-una-pagina-web-en-colombia",
            datePublished: "2026-02-21",
            dateModified: "2026-08-19",
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "Cuánto cuesta una página web en Colombia", path: "/blog/cuanto-cuesta-una-pagina-web-en-colombia" },
          ]),
          buildFaqJsonLd(faqs),
        ]}
      />

      <main className="min-h-screen bg-black pb-24 pt-32 px-4 sm:px-6 text-white">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-neutral-400 transition-colors hover:text-white mb-12"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Blog
          </Link>

          <article className="prose prose-invert prose-lg max-w-none prose-headings:font-title prose-a:text-white hover:prose-a:text-neutral-300">
            {/* Header */}
            <header className="mb-14 not-prose">
              <div className="flex items-center gap-3 font-mono text-sm text-neutral-400 mb-4">
                <span>Actualizado: 2026</span>
                <span className="h-1 w-1 rounded-full bg-neutral-600" />
                <span>9 min de lectura</span>
                <span className="h-1 w-1 rounded-full bg-neutral-600" />
                <span className="text-emerald-400 font-semibold">Precios en COP</span>
              </div>
              <h1 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                ¿Cuánto Cuesta una Página Web en Colombia en 2026? Precios Reales y Guía Completa
              </h1>

              {/* Author byline */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-6 font-mono text-xs text-neutral-400">
                <div className="w-9 h-9 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  KT
                </div>
                <div>
                  <span>Escrito por </span>
                  <Link href="/autores/keyner-trillos" className="text-white font-bold hover:underline">
                    Keyner Trillos
                  </Link>
                  <span className="text-neutral-400"> • Lead Software Engineer — K&T Code</span>
                  <span className="block text-[11px] text-neutral-500 mt-0.5">Revisado y actualizado el 19 de agosto de 2026</span>
                </div>
              </div>

              <p className="mt-6 border-l-2 border-white pl-6 font-mono text-lg leading-relaxed text-neutral-300">
                Si estás buscando <strong>cuánto cuesta una página web en Colombia</strong> o <strong>cuánto cobra una agencia de desarrollo web</strong>, seguramente te has encontrado con respuestas vagas como <em>"depende del proyecto"</em> o presupuestos desde $200.000 hasta más de $15.000.000 COP. En esta guía te damos <strong>números reales, tablas transparentes y explicamos qué incluye cada peso invertido</strong>.
              </p>
            </header>

            {/* AI Direct Answer Box (Optimized for AI Overviews & Featured Snippets) */}
            <div className="my-10 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 not-prose">
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">
                // Respuesta Rápida para Cotizaciones 2026
              </span>
              <p className="mt-2 font-mono text-sm leading-relaxed text-neutral-200">
                En 2026, el precio de una página web profesional en Colombia con <strong>K&T Code</strong> se clasifica en 4 categorías:
              </p>
              <ul className="mt-4 space-y-2 font-mono text-xs text-neutral-200">
                <li>• <strong>Landing Page de Conversión:</strong> Desde $450.000 COP (Entrega: 7 a 12 días).</li>
                <li>• <strong>Sitio Web Corporativo (con CMS):</strong> Desde $2.500.000 COP (Entrega: 15 a 25 días).</li>
                <li>• <strong>Tienda Virtual (con Pasarelas):</strong> Desde $1.300.000 COP (Entrega: 25 a 40 días).</li>
                <li>• <strong>Software Web a Medida / SaaS:</strong> Cotización según alcance (Entrega: 4 a 12 semanas).</li>
              </ul>
            </div>

            {/* H2 Tabla de Precios K&T */}
            <h2 className="text-3xl font-bold text-white mt-16 mb-6">
              Tabla Comparativa de Precios de Páginas Web en Colombia (2026)
            </h2>
            <p>
              A diferencia de agencias que ocultan sus precios para inflar cotizaciones, en K&T Code creemos en la transparencia absoluta:
            </p>

            <div className="overflow-x-auto not-prose my-8">
              <table className="w-full min-w-[700px] border-collapse rounded-2xl border border-neutral-800 bg-neutral-950/70 font-mono text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900 text-left text-neutral-400 uppercase">
                    <th className="p-4">Tipo de Proyecto</th>
                    <th className="p-4 text-emerald-400">Precio K&T Desde</th>
                    <th className="p-4">Plazo Estimado</th>
                    <th className="p-4">Ideal Para</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-neutral-300">
                  <tr>
                    <td className="p-4 font-bold text-white">Landing Page</td>
                    <td className="p-4 text-emerald-400 font-bold">$450.000 COP</td>
                    <td className="p-4">7 a 12 días</td>
                    <td className="p-4 text-neutral-400">Google Ads, Meta Ads, captación directa de leads por WhatsApp.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Sitio Web Corporativo</td>
                    <td className="p-4 text-emerald-400 font-bold">$2.500.000 COP</td>
                    <td className="p-4">15 a 25 días</td>
                    <td className="p-4 text-neutral-400">Empresas, firmas de consultoría, ingeniería y marcas B2B.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Tienda Virtual E-commerce</td>
                    <td className="p-4 text-emerald-400 font-bold">$1.300.000 COP</td>
                    <td className="p-4">25 a 40 días</td>
                    <td className="p-4 text-neutral-400">Comercios que venden productos físicos con pagos PSE, tarjetas y envíos.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Software a Medida / SaaS</td>
                    <td className="p-4 text-emerald-400 font-bold">Cotización según alcance</td>
                    <td className="p-4">4 a 12 semanas</td>
                    <td className="p-4 text-neutral-400">Portales privados, paneles de control, facturación DIAN e integraciones API.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* H2 Qué incluye y qué NO incluye */}
            <h2 className="text-3xl font-bold text-white mt-16 mb-6">
              ¿Qué incluye y qué NO incluye el desarrollo de una página web?
            </h2>
            <p>
              Uno de los mayores errores al contratar un desarrollo web es asumir que servicios periféricos vienen incluidos por defecto. Esta es la lista clara:
            </p>

            <div className="grid gap-6 md:grid-cols-2 not-prose my-8">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 uppercase">
                  <CheckCircle2 className="h-4 w-4" /> Qué SÍ incluye K&T Code
                </span>
                <ul className="mt-4 space-y-3 font-mono text-xs text-neutral-300">
                  <li>✔ Diseño exclusivo en Figma adaptado a la identidad de tu empresa.</li>
                  <li>✔ Código frontend moderno en Next.js (optimización de Core Web Vitals y rendimiento Lighthouse).</li>
                  <li>✔ Estructura semántica SEO (H1-H6, metadatos y Schema.org).</li>
                  <li>✔ Integración directa con botón flotante y formularios a WhatsApp.</li>
                  <li>✔ Panel autogestionable (CMS) para modificar textos y fotos.</li>
                  <li>✔ Certificado de seguridad SSL (HTTPS) y configuración de dominio.</li>
                  <li>✔ Propiedad 100% del código fuente en repositorio privado.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-6">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-rose-400 uppercase">
                  <XCircle className="h-4 w-4" /> Qué NO incluye (o se cotiza aparte)
                </span>
                <ul className="mt-4 space-y-3 font-mono text-xs text-neutral-400">
                  <li>✖ Compra del nombre de dominio (se registra a nombre del cliente).</li>
                  <li>✖ Fotografía profesional presencial de productos en bodegas.</li>
                  <li>✖ Redacción de miles de artículos o fichas de catálogo masivas.</li>
                  <li>✖ Comisiones bancarias cobradas por pasarelas (Wompi, PayU, Bold).</li>
                  <li>✖ Presupuesto de pauta publicitaria en Google Ads o Facebook Ads.</li>
                </ul>
              </div>
            </div>

            {/* H2 Costos Reales: Hosting, Dominio y Mantenimiento */}
            <h2 className="text-3xl font-bold text-white mt-16 mb-6">
              Costos Fijos Reales: Dominio, Hosting y Mantenimiento
            </h2>
            <p>
              Toda página web en internet requiere dos elementos básicos para existir, más un servicio opcional de soporte:
            </p>

            <ol className="space-y-4">
              <li>
                <strong>1. Nombre de Dominio (.com, .co, .com.co):</strong> Es la dirección web de tu empresa (ej: <code>miempresa.com.co</code>). Cuesta entre <strong>$60.000 y $160.000 COP al año</strong> y se renueva anualmente en registradores oficiales como Mi.com.co, GoDaddy o Cloudflare Registrar.
              </li>
              <li>
                <strong>2. Alojamiento Web (Hosting / Servidores):</strong> Los hostings compartidos baratos de cPanel ($50.000 COP/año) colapsan cuando reciben más de 10 visitas simultáneas y vuelven lenta tu página. En K&T implementamos arquitecturas serverless en la red CDN global de Vercel y Cloudflare Edge, logrando <strong>$0 a $90.000 COP/mes con disponibilidad del 99.99% y carga en menos de 0.8 segundos</strong>.
              </li>
              <li>
                <strong>3. Mantenimiento y Soporte Continuo:</strong> Oscila entre <strong>$250.000 y $600.000 COP al mes</strong>. Incluye monitoreo contra caídas, respaldos automáticos de base de datos, actualización de parches de seguridad y bolsa de horas para crear nuevas secciones o cambiar promociones.
              </li>
            </ol>

            {/* H2 Pasarelas de Pago en Colombia */}
            <h2 className="text-3xl font-bold text-white mt-16 mb-6">
              Pasarelas de Pago en Colombia y sus Comisiones Reales
            </h2>
            <p>
              Si tu objetivo es vender online, debes considerar la comisión que cobra la entidad bancaria por cada venta:
            </p>

            <div className="grid gap-4 sm:grid-cols-2 not-prose my-8 font-mono text-xs">
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
                <h3 className="font-title text-base font-bold text-white">Wompi (Bancolombia)</h3>
                <p className="mt-2 text-emerald-400 font-bold">2.65% + $700 COP por transacción</p>
                <p className="mt-2 text-neutral-400">Soporta PSE, tarjetas de crédito/débito, transferencias directas Bancolombia y Nequi. Desembolsos automáticos al siguiente día hábil.</p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
                <h3 className="font-title text-base font-bold text-white">Bold</h3>
                <p className="mt-2 text-emerald-400 font-bold">2.99% + $900 COP + IVA</p>
                <p className="mt-2 text-neutral-400">Ideal para link de pagos rápidos, datáfonos y PSE con interfaz intuitiva y transferencias bancarias ágiles.</p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
                <h3 className="font-title text-base font-bold text-white">PayU Latam</h3>
                <p className="mt-2 text-emerald-400 font-bold">3.29% + $900 COP + IVA</p>
                <p className="mt-2 text-neutral-400">Permite pagos internacionales en múltiples monedas y pagos en efectivo por Efecty y SuRed.</p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
                <h3 className="font-title text-base font-bold text-white">ePayco (Davivienda)</h3>
                <p className="mt-2 text-emerald-400 font-bold">2.68% + $900 COP (PSE)</p>
                <p className="mt-2 text-neutral-400">Excelente integración con cuentas Davivienda, Daviplata y compras a cuotas.</p>
              </div>
            </div>

            {/* H2 Comparativa Freelance vs DIY vs Agencia */}
            <h2 className="text-3xl font-bold text-white mt-16 mb-6">
              Freelance vs. Creadores DIY (Wix/Shopify) vs. Agencia K&T Code
            </h2>
            <p>
              ¿Por qué algunos cobran $200.000 COP y otros $4.000.000 COP? Esta es la realidad técnica del mercado:
            </p>

            <ul className="space-y-4">
              <li>
                <strong>Freelance económico ($200.000 - $500.000 COP):</strong> Suelen instalar una plantilla descargada de WordPress con constructores como Elementor. El sitio queda lleno de código basura, tarda más de 4 segundos en cargar en celulares colombianos con 4G, y ante cualquier error el desarrollador suele desaparecer.
              </li>
              <li>
                <strong>Plataformas No-Code (Wix, Shopify, Canva):</strong> Parecen baratas al inicio ($80.000 a $250.000 COP/mes), pero los costos en dólares se acumulan año tras año. Además, <strong>el código nunca es tuyo</strong>, no puedes migrarlo y su rendimiento en Core Web Vitals suele ser deficiente para competir en SEO.
              </li>
              <li>
                <strong>Agencia de Ingeniería (K&T Code):</strong> Desarrollamos con Next.js y React, optimizando Core Web Vitals y rendimiento Lighthouse, aplicando buenas prácticas de seguridad, contratos con entregables claros y soporte técnico permanente.
              </li>
            </ul>

            {/* H2 WordPress vs Next.js */}
            <h2 className="text-3xl font-bold text-white mt-16 mb-6">
              WordPress vs. Next.js: ¿Por qué la tecnología define tu rentabilidad?
            </h2>
            <p>
              El 40% de internet sigue en WordPress, pero las empresas líderes en Colombia están migrando a Next.js por tres razones fundamentales:
            </p>

            <div className="overflow-x-auto not-prose my-8">
              <table className="w-full min-w-[600px] border-collapse rounded-2xl border border-neutral-800 bg-neutral-950 font-mono text-xs">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900 text-neutral-400 uppercase text-left">
                    <th className="p-4">Característica</th>
                    <th className="p-4 text-emerald-400">Next.js (K&T Code)</th>
                    <th className="p-4 text-amber-400">WordPress Tradicional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-neutral-300">
                  <tr>
                    <td className="p-4 font-bold text-white">Velocidad de Carga</td>
                    <td className="p-4 text-emerald-300">Ultra rápida (&lt; 0.8s)</td>
                    <td className="p-4 text-neutral-400">Lenta (3.5s - 6.0s)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Seguridad</td>
                    <td className="p-4 text-emerald-300">Sin base de datos expuesta, 0 hackeos por plugins</td>
                    <td className="p-4 text-neutral-400">Alta vulnerabilidad a inyecciones SQL y malware</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Indexación en Google</td>
                    <td className="p-4 text-emerald-300">Server Components y marcado JSON-LD nativo</td>
                    <td className="p-4 text-neutral-400">Dependiente de plugins externos pesados</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* FAQs */}
            <h2 className="text-3xl font-bold text-white mt-16 mb-6">
              Preguntas Frecuentes sobre Precios de Páginas Web en Colombia
            </h2>
            <div className="space-y-4 not-prose my-8">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-neutral-800 bg-neutral-950 p-5">
                  <summary className="cursor-pointer font-mono text-sm font-bold text-white marker:hidden flex items-center justify-between">
                    {faq.question}
                    <span className="text-neutral-500 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 font-mono text-xs leading-6 text-neutral-300 border-t border-neutral-800 pt-4">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

            {/* Final CTA */}
            <div className="not-prose my-16 rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 p-8 md:p-12 text-center">
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">// Cotización Inmediata</span>
              <h2 className="mt-3 font-title text-3xl md:text-4xl font-bold text-white">
                ¿Listo para cotizar la página web de tu empresa?
              </h2>
              <p className="mt-4 font-mono text-sm text-neutral-300 max-w-2xl mx-auto">
                Revisa nuestra <Link href="/precios/precio-pagina-web-colombia" className="underline text-white font-bold">guía interactiva de precios</Link> o escríbenos directamente a WhatsApp para recibir una propuesta a la medida en menos de 2 horas.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://wa.me/573116360057?text=${encodeURIComponent("Hola K&T Code, leí su artículo sobre cuánto cuesta una página web en Colombia y deseo cotizar mi proyecto.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white text-black font-mono text-xs font-bold px-8 py-4 hover:bg-neutral-200 transition-colors"
                >
                  Cotizar por WhatsApp
                </a>
                <Link
                  href="/precios"
                  className="rounded-full border border-neutral-700 bg-neutral-800 text-white font-mono text-xs font-bold px-8 py-4 hover:bg-neutral-700 transition-colors"
                >
                  Ver todos los planes
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
