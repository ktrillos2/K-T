import type { Metadata } from "next"
import Link from "next/link"
import { 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Zap, 
  Shield, 
  Sparkles, 
  HelpCircle, 
  Code2, 
  Building2, 
  Scissors, 
  ShoppingBag, 
  HeartPulse, 
  Truck, 
  ExternalLink,
  Check,
  Calendar,
  MessageSquare
} from "lucide-react"
import Footer from "@/components/layout/footer"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Desarrollo de Páginas Web en Cúcuta | Sede Principal K&T Code",
  description:
    "Empresa de desarrollo web y software a medida en San José de Cúcuta, Norte de Santander. Sitios web de alto rendimiento, tiendas virtuales B2B y soporte presencial.",
  keywords: [
    "desarrollo web cucuta",
    "paginas web cucuta",
    "diseno de paginas web en cucuta",
    "tiendas virtuales cucuta",
    "empresa de software cucuta",
    "programadores cucuta",
    "desarrollo web norte de santander",
    "K&T Code cucuta",
  ],
  alternates: {
    canonical: "https://www.kytcode.lat/desarrollo-web-cucuta",
    languages: {
      "es-CO": "https://www.kytcode.lat/desarrollo-web-cucuta",
      es: "https://www.kytcode.lat/desarrollo-web-cucuta",
      "x-default": "https://www.kytcode.lat/desarrollo-web-cucuta",
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
    title: "Desarrollo de Páginas Web en Cúcuta | Sede Principal K&T Code",
    description:
      "Desarrollamos páginas web de alta velocidad, tiendas virtuales y software a medida desde nuestra sede principal en San José de Cúcuta, Norte de Santander.",
    url: "https://www.kytcode.lat/desarrollo-web-cucuta",
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://www.kytcode.lat/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Desarrollo de Páginas Web en Cúcuta - K&T Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo de Páginas Web en Cúcuta | Sede Principal K&T Code",
    description:
      "Diseño y desarrollo web profesional en San José de Cúcuta. Tiendas online y soporte local con ingeniería de primer nivel.",
    images: ["https://www.kytcode.lat/opengraph-image.png"],
  },
}

export default function CucutaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://www.kytcode.lat/#organization",
    "name": "K&T Code — Desarrollo Web en San José de Cúcuta",
    "url": "https://www.kytcode.lat/desarrollo-web-cucuta",
    "logo": "https://www.kytcode.lat/opengraph-image.png",
    "image": "https://www.kytcode.lat/opengraph-image.png",
    "telephone": "+573116360057",
    "email": "contacto@kytcode.lat",
    "priceRange": "$450.000 COP - $15.000.000+ COP",
    "currenciesAccepted": "COP, USD",
    "paymentAccepted": "Transferencia Bancolombia, Nequi, Daviplata, Wompi, PSE, Tarjeta de Crédito",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "San José de Cúcuta",
      "addressLocality": "San José de Cúcuta",
      "addressRegion": "Norte de Santander",
      "postalCode": "540001",
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 7.8939,
      "longitude": -72.5078
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "18:30"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "San José de Cúcuta"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Norte de Santander"
      },
      {
        "@type": "Country",
        "name": "Colombia"
      }
    ],
    "description": "Sede principal de K&T Code en San José de Cúcuta. Empresa de desarrollo de páginas web a medida, tiendas virtuales con pasarelas de pago y software empresarial de alto rendimiento."
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Dónde está ubicada la sede principal de K&T Code en Cúcuta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nuestra sede principal de desarrollo e ingeniería está ubicada en San José de Cúcuta, Norte de Santander. Atendemos a empresarios locales de manera presencial en la ciudad o mediante videollamada directa con el equipo técnico fundador."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuáles son los precios oficiales de páginas web para empresas en Cúcuta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nuestras tarifas oficiales en Cúcuta inician desde $450.000 COP para Landing Pages de alta conversión, $2.500.000 COP para Sitios Web Corporativos con panel autogestionable, $1.300.000 COP para Ecommerce Starter, $2.000.000 COP para Headless Ecommerce y desde $4.500.000 COP para software a la medida."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué elegir arquitectura headless en lugar de WordPress para una empresa en Cúcuta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La arquitectura headless permite pre-renderizar contenido y desacoplar el frontend, reduciendo significativamente la superficie de ataque al no depender de plugins de terceros. Tu página obtiene tiempos de respuesta ágiles tanto en móviles como en computadores, mejorando la retención de usuarios y la evaluación técnica de Core Web Vitals en Google."
        }
      },
      {
        "@type": "Question",
        "name": "¿Podemos reunirnos de forma presencial en Cúcuta para iniciar el proyecto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Para empresas y proyectos en San José de Cúcuta podemos coordinar reuniones presenciales de consultoría técnica (en sectores como Caobos, Centro, Zona Industrial o tu empresa), además de acompañamiento continuo por WhatsApp y Google Meet."
        }
      },
      {
        "@type": "Question",
        "name": "¿El desarrollo incluye capacitación para actualizar contenidos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Totalmente. Entregamos videotutoriales personalizados y un manual de administración donde te mostramos cómo actualizar textos, fotos de productos, precios y artículos sin depender de programadores."
        }
      }
    ]
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
        "name": "Desarrollo Web Cúcuta",
        "item": "https://www.kytcode.lat/desarrollo-web-cucuta"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
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
                Desarrollo Web en Cúcuta
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <header className="mb-20 text-center lg:text-left">
            <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs mb-6">
              <MapPin className="w-3.5 h-3.5" />
              <span>Sede Principal en San José de Cúcuta • Norte de Santander</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-title leading-tight tracking-tight mb-6 text-white max-w-4xl">
              Desarrollo de Páginas Web y Software a Medida en Cúcuta
            </h1>

            <p className="font-mono text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed mb-8">
              K&T Code nació y opera desde San José de Cúcuta. Diseñamos páginas web corporativas de alto impacto, tiendas virtuales con pasarelas de pago colombianas y software a medida con arquitectura de primer nivel, brindando atención cercana y soporte técnico directo a los empresarios de Norte de Santander.
            </p>

            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-12">
              <a
                href="https://wa.me/573116360057?text=Hola%20K%26T%20Code,%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20web%20para%20mi%20empresa%20en%20C%C3%BAcuta."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-black font-mono font-bold text-sm hover:bg-neutral-200 transition-all shadow-xl hover:scale-[1.02]"
              >
                Cotizar Proyecto en Cúcuta <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="#planes"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/20 bg-white/5 font-mono text-sm text-white hover:bg-white/10 transition-all"
              >
                Ver Precios Oficiales (COP)
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-title">Sede Local</div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">San José de Cúcuta</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-title">Core Web Vitals</div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">LCP Rápido & Estable</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-title">100%</div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">Código de tu Propiedad</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-title">Wompi / PSE</div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">Pasarelas Colombianas</div>
              </div>
            </div>
          </header>

          {/* Sectores Económicos de Cúcuta */}
          <section aria-labelledby="section-cucuta-sectors" className="mb-24">
            <div className="text-center md:text-left mb-12">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">// Tejido Empresarial Local</span>
              <h2 id="section-cucuta-sectors" className="text-2xl sm:text-4xl font-bold font-title text-white mt-2">
                Soluciones Web Especializadas para los Sectores Productivos de Cúcuta
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-mono">
                  <Scissors className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-title text-white mb-2">
                  Cluster Textil y Confección
                </h3>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                  Desarrollamos catálogos digitales mayoristas y tiendas virtuales optimizadas para distribuidores de telas, uniformes y prendas, con cotizador de rollos directo a WhatsApp.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-mono">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-title text-white mb-2">
                  Calzado, Cuero y Marroquinería
                </h3>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                  Showrooms digitales para fabricantes de calzado de Norte de Santander con galerías de alta definición, pedidos al por mayor y captación de clientes a nivel nacional.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-mono">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-title text-white mb-2">
                  Clínicas, Salud y Odontología
                </h3>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                  Portales médicos que transmiten confianza clínica, agendamiento de consultas en línea y atracción de pacientes locales e internacionales en turismo de salud.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-mono">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-title text-white mb-2">
                  Comercio Fronterizo y Logística
                </h3>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                  Páginas corporativas para empresas de transporte, agencias aduaneras y distribuidores comerciales que necesitan proyectar solidez y cotizaciones rápidas.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-mono">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-title text-white mb-2">
                  Inmobiliarias y Constructoras
                </h3>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                  Plataformas dinámicas de propiedades con filtros por barrios de Cúcuta, fichas técnicas instantáneas para WhatsApp y generación de prospectos calificados.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-mono">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-title text-white mb-2">
                  Software a Medida & Automatización
                </h3>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                  Sistemas web a medida, paneles administrativos, automatización de cotizaciones y conexión con bases de datos PostgreSQL y Supabase.
                </p>
              </div>
            </div>
          </section>

          {/* Por qué trabajar con la Sede Local */}
          <section aria-labelledby="section-local-advantages" className="mb-24">
            <div className="text-center md:text-left mb-10">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">// Cercanía y Confianza</span>
              <h2 id="section-local-advantages" className="text-2xl sm:text-4xl font-bold font-title text-white mt-2">
                Ventajas de Trabajar con un Equipo con Sede Real en San José de Cúcuta
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-title text-white mb-2">
                  Atención Presencial y Virtual sin Fricciones
                </h3>
                <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                  Podemos reunirnos de forma presencial en San José de Cúcuta para entender tus metas, revisar catálogos físicos y levantar requerimientos, o mantener contacto continuo y dinámico vía Google Meet y WhatsApp.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-title text-white mb-2">
                  Ingeniería Directa: Cero Intermediarios
                </h3>
                <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                  Hablas directamente con el equipo de ingenieros que programa tu sitio. No tratas con vendedores comisionistas que subcontratan el trabajo a terceros desconocidos.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-title text-white mb-2">
                  Garantía Real y 100% de Propiedad del Código
                </h3>
                <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                  No te atamos con mensualidades forzosas para mantener tu página viva. Te entregamos todo el código fuente, accesos completos y garantía total sobre la estabilidad del sistema.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-title text-white mb-2">
                  SEO Local para Dominar en Google Cúcuta
                </h3>
                <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                  Optimizamos la estructura semántica de tu página para que aparezca cuando tus clientes busquen tus productos y servicios en Cúcuta, Los Patios, Villa del Rosario y toda Colombia.
                </p>
              </div>
            </div>
          </section>

          {/* Planes y Precios Transparentes */}
          <section id="planes" aria-labelledby="section-pricing" className="mb-24 scroll-mt-28">
            <div className="text-center md:text-left mb-10">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">// Tarifas Transparentes en COP</span>
              <h2 id="section-pricing" className="text-2xl sm:text-4xl font-bold font-title text-white mt-2">
                Planes de Desarrollo Web en Cúcuta (Precios Oficiales 2026)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Landing Page */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-title text-white mb-1">Landing Page</h3>
                  <div className="font-mono text-2xl font-bold text-emerald-400 mb-3">
                    Desde $450.000 COP
                  </div>
                  <p className="font-mono text-xs text-neutral-400 mb-6">
                    Página de una sola sección enfocada en captar clientes desde Google Ads o Meta.
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-neutral-300 mb-6">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Diseño exclusivo de alto rendimiento</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Botón directo a WhatsApp</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Carga rápida y optimizada (Core Web Vitals)</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Entrega en 7 a 12 días</li>
                  </ul>
                </div>
                <a
                  href="https://wa.me/573116360057?text=Hola%20K%26T%20Code,%20me%20interesa%20el%20plan%20Landing%20Page%20desde%20$450.000%20COP%20en%20C%C3%BAcuta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black font-mono font-bold text-xs transition-all"
                >
                  Cotizar Landing Page
                </a>
              </div>

              {/* Sitio Corporativo */}
              <div className="p-6 rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/10 flex flex-col justify-between relative">
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-emerald-500 text-black font-mono font-bold text-[10px] uppercase">
                  Más Solicitado
                </div>
                <div>
                  <h3 className="text-lg font-bold font-title text-white mb-1">Sitio Web Corporativo</h3>
                  <div className="font-mono text-2xl font-bold text-emerald-400 mb-3">
                    Desde $2.500.000 COP
                  </div>
                  <p className="font-mono text-xs text-neutral-400 mb-6">
                    Portal empresarial completo con panel autoadministrable y arquitectura SEO.
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-neutral-300 mb-6">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Hasta 8 páginas o secciones</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Panel autogestionable fácil de usar</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Optimización SEO para Google Cúcuta</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Entrega en 15 a 25 días</li>
                  </ul>
                </div>
                <a
                  href="https://wa.me/573116360057?text=Hola%20K%26T%20Code,%20me%20interesa%20el%20plan%20Sitio%20Corporativo%20desde%20$2.500.000%20COP%20en%20C%C3%BAcuta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs transition-all shadow-lg"
                >
                  Cotizar Sitio Corporativo
                </a>
              </div>

              {/* Tienda Virtual Headless */}
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-title text-white mb-1">Tienda Virtual / E-commerce</h3>
                  <div className="font-mono text-2xl font-bold text-emerald-400 mb-3">
                    Desde $1.300.000 COP
                  </div>
                  <p className="font-mono text-xs text-neutral-400 mb-6">
                    E-commerce completo con Wompi, Bold, PayU y PSE para vender las 24 horas.
                  </p>
                  <ul className="space-y-2 font-mono text-xs text-neutral-300 mb-6">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Carrito de compras y checkout seguro</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Pagos con tarjetas de crédito y débito PSE</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Catálogo de productos autoadministrable</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Headless disponible desde $2.000.000 COP</li>
                  </ul>
                </div>
                <a
                  href="https://wa.me/573116360057?text=Hola%20K%26T%20Code,%20me%20interesa%20el%20plan%20Tienda%20Virtual%20desde%20$1.300.000%20COP%20en%20C%C3%BAcuta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black font-mono font-bold text-xs transition-all"
                >
                  Cotizar Tienda Virtual
                </a>
              </div>
            </div>
          </section>

          {/* Preguntas Frecuentes */}
          <section aria-labelledby="section-cucuta-faq" className="mb-24">
            <div className="text-center md:text-left mb-10">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">// Dudas Frecuentes</span>
              <h2 id="section-cucuta-faq" className="text-2xl sm:text-4xl font-bold font-title text-white mt-2">
                Preguntas Frecuentes sobre Desarrollo Web en Cúcuta
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-base sm:text-lg font-bold font-title text-white mb-2">
                  ¿Cómo es el proceso de pago para empresas en Cúcuta?
                </h3>
                <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Trabajamos con un esquema transparente por hitos: 50% al iniciar la arquitectura y diseño, y 50% al finalizar las pruebas y publicar tu sitio en producción. Recibimos transferencias Bancolombia, Nequi, Daviplata y pagos con tarjeta de crédito vía Wompi.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-base sm:text-lg font-bold font-title text-white mb-2">
                  ¿Podemos coordinar una reunión presencial en San José de Cúcuta?
                </h3>
                <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Sí. Para empresas locales podemos acordar una cita presencial en sectores como Caobos, Centro o la sede de tu empresa para revisar muestras de diseño y estructurar los objetivos de tu negocio.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-base sm:text-lg font-bold font-title text-white mb-2">
                  ¿Cuánto tiempo toma tener mi página web lista y funcionando?
                </h3>
                <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Una Landing Page toma entre 7 y 12 días hábiles; un Sitio Web Corporativo toma entre 15 y 25 días hábiles; y una Tienda Virtual completa toma entre 25 y 40 días hábiles, dependiendo del volumen de productos.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-base sm:text-lg font-bold font-title text-white mb-2">
                  ¿Incluye dominio propio y certificado de seguridad SSL?
                </h3>
                <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Sí. Te asesoramos en la elección y registro de tu dominio (.com o .co) y configuramos certificados SSL de alta seguridad gratuitos de por vida en servidores globales de Vercel y Cloudflare.
                </p>
              </div>
            </div>
          </section>

          {/* Banner de Contacto Local */}
          <section className="p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 via-black to-black text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_70%)] pointer-events-none" />
            
            <h2 className="text-2xl sm:text-4xl font-bold font-title text-white mb-4 relative z-10">
              ¿Listo para Digitalizar tu Empresa en San José de Cúcuta?
            </h2>
            <p className="font-mono text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mb-8 relative z-10">
              Recibe una asesoría técnica sin costo y una cotización personalizada en menos de 24 horas directamente con nuestro equipo de ingeniería.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <a
                href="https://wa.me/573116360057?text=Hola%20K%26T%20Code,%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa%20para%20un%20proyecto%20web%20en%20C%C3%BAcuta."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-mono font-bold text-sm hover:bg-neutral-200 transition-all shadow-xl hover:scale-[1.02]"
              >
                Escríbenos al WhatsApp (+57 311 6360057) <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:contacto@kytcode.lat?subject=Cotizacion%20Desarrollo%20Web%20Cucuta"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 bg-white/5 font-mono text-sm text-white hover:bg-white/10 transition-all"
              >
                Correo: contacto@kytcode.lat
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
