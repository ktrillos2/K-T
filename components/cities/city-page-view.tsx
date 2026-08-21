import Link from "next/link"
import { ArrowRight, CheckCircle2, MapPin, Zap, Shield, Sparkles, HelpCircle, Code2, Globe } from "lucide-react"
import Footer from "@/components/layout/footer"
import type { CityData } from "@/lib/city-data"

interface CityPageViewProps {
  city: CityData
}

export default function CityPageView({ city }: CityPageViewProps) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": `K&T Code — Desarrollo Web en ${city.cityName}`,
    "image": "https://www.kytcode.lat/opengraph-image.png",
    "url": `https://www.kytcode.lat/${city.slug}`,
    "telephone": "+573116360057",
    "email": "contactoktweb@gmail.com",
    "priceRange": "$450.000 COP - $15.000.000+ COP",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "San José de Cúcuta",
      "addressLocality": city.cityName,
      "addressRegion": city.region,
      "addressCountry": "CO"
    },
    "areaServed": {
      "@type": "City",
      "name": city.cityName
    },
    "description": city.metaDescription
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://www.kytcode.lat"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `Desarrollo Web ${city.cityName}`,
        "item": `https://www.kytcode.lat/${city.slug}`
      }
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": city.localFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Background Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Ruta de navegación" className="mb-8 font-mono text-xs text-neutral-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>/</li>
              <li className="text-emerald-400 font-bold" aria-current="page">
                {city.cityName}
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <header className="mb-16 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs mb-6">
              <MapPin className="w-3.5 h-3.5" />
              <span>{city.cityName}, {city.region} — Colombia</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-title leading-tight mb-6 text-white">
              {city.heroH1}
            </h1>
            <p className="font-mono text-sm sm:text-base text-neutral-300 max-w-3xl leading-relaxed mb-8">
              {city.introText}
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href={`https://wa.me/573116360057?text=Hola%20K%26T%20Code%2C%20me%20gustar%C3%ADa%20cotizar%20un%20desarrollo%20web%20para%20mi%20empresa%20en%20${encodeURIComponent(city.cityName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-sm hover:bg-neutral-200 transition-all shadow-lg"
              >
                Cotizar Proyecto en {city.cityName} <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/precios"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 font-mono text-sm text-white hover:bg-white/10 transition-all"
              >
                Ver Planes y Precios
              </Link>
            </div>
          </header>

          {/* Ventajas y Aspectos Clave de Mercado */}
          <section aria-labelledby="section-market-highlights" className="mb-20">
            <h2 id="section-market-highlights" className="text-2xl md:text-3xl font-bold font-title mb-8 text-white">
              Por Qué las Empresas en {city.cityName} Eligen K&T Code
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {city.marketHighlights.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-mono font-bold text-sm">
                    0{i + 1}
                  </div>
                  <h3 className="font-title font-bold text-lg text-white mb-2">{item.title}</h3>
                  <p className="font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Planes & Tarifas en Colombia */}
          <section aria-labelledby="section-pricing" className="mb-20 p-8 sm:p-10 rounded-3xl border border-white/10 bg-neutral-950/80">
            <div className="text-center md:text-left mb-8">
              <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-bold">
                Tarifas Claras y Transparentes
              </span>
              <h2 id="section-pricing" className="text-2xl md:text-4xl font-bold font-title mt-2 text-white">
                Precios de Páginas Web en {city.cityName} (2026)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                <h3 className="font-title font-bold text-lg text-white mb-1">Landing Page</h3>
                <p className="text-emerald-400 font-mono font-bold text-xl mb-3">Desde $450.000 COP</p>
                <p className="font-mono text-xs text-neutral-400 mb-4">
                  Entrega en 7-12 días. Ideal para captar clientes desde Google Ads o Meta.
                </p>
                <ul className="space-y-2 font-mono text-xs text-neutral-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Diseño UI/UX exclusivo</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp integrado</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Carga rápida &lt; 0.8s</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 relative">
                <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-emerald-500 text-black font-mono text-[10px] font-bold">
                  RECOMENDADO
                </span>
                <h3 className="font-title font-bold text-lg text-white mb-1">Sitio Web Corporativo</h3>
                <p className="text-emerald-400 font-mono font-bold text-xl mb-3">Desde $2.500.000 COP</p>
                <p className="font-mono text-xs text-neutral-400 mb-4">
                  Entrega en 15-25 días. Portal completo con CMS autogestionable y SEO semántico.
                </p>
                <ul className="space-y-2 font-mono text-xs text-neutral-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Hasta 8 secciones/páginas</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Panel autoadministrable</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> SEO técnico para {city.cityName}</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                <h3 className="font-title font-bold text-lg text-white mb-1">Tienda Virtual Headless</h3>
                <p className="text-emerald-400 font-mono font-bold text-xl mb-3">Desde $1.300.000 COP</p>
                <p className="font-mono text-xs text-neutral-400 mb-4">
                  Entrega en 25-40 días. E-commerce completo con Wompi, Bold, PayU y PSE.
                </p>
                <ul className="space-y-2 font-mono text-xs text-neutral-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Carrito y Checkout seguro</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Pagos PSE y tarjetas</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Catálogo autogestionable</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Preguntas Frecuentes de la Ciudad */}
          <section aria-labelledby="section-local-faqs" className="mb-20">
            <h2 id="section-local-faqs" className="text-2xl md:text-3xl font-bold font-title mb-8 text-white">
              Preguntas Frecuentes sobre Desarrollo Web en {city.cityName}
            </h2>
            <div className="space-y-4">
              {city.localFaqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h3 className="font-title font-bold text-base sm:text-lg text-white mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Final */}
          <section className="p-8 sm:p-12 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-title text-white mb-4">
              ¿Listo para Desarrollar la Página Web de tu Empresa en {city.cityName}?
            </h2>
            <p className="font-mono text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mb-8">
              Agenda una asesoría técnica sin costo y recibe una cotización detallada con plazos de entrega y requerimientos en menos de 24 horas.
            </p>
            <a
              href={`https://wa.me/573116360057?text=Hola%20K%26T%20Code%2C%20quisiera%20solicitar%20asesor%C3%ADa%20para%20un%20proyecto%20web%20en%20${encodeURIComponent(city.cityName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-mono font-bold text-sm hover:bg-neutral-200 transition-all shadow-xl"
            >
              Contactar por WhatsApp (+57 311 636 0057) <ArrowRight className="w-4 h-4" />
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
