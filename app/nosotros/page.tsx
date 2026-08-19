import { Metadata } from "next"
import Footer from "@/components/layout/footer"
import Link from "next/link"
import { ChevronRight, Code2, ShieldCheck, Zap, Globe, Cpu, CheckCircle2, ArrowRight, MessageCircle, Layers, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Sobre Nosotros - Empresa de Desarrollo Web y Software en Colombia",
  description: "K&T Code es una empresa colombiana especializada en desarrollo web, tiendas virtuales y software a medida para empresas en Colombia y Latinoamérica.",
  keywords: [
    "sobre K&T Code",
    "empresa desarrollo web colombia",
    "quienes somos K&T Code",
    "desarrollo software a medida colombia",
    "agencia web bogota medellin",
    "K&T Code nosotros",
  ],
  alternates: {
    canonical: "https://www.kytcode.lat/nosotros",
    languages: {
      "es-CO": "https://www.kytcode.lat/nosotros",
      "es": "https://www.kytcode.lat/nosotros",
      "x-default": "https://www.kytcode.lat/nosotros",
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
    title: "Sobre K&T Code | Empresa de Desarrollo Web y Software en Colombia",
    description: "K&T Code es una empresa colombiana especializada en desarrollo web, tiendas virtuales y software a medida para empresas en Colombia y Latinoamérica.",
    url: "https://www.kytcode.lat/nosotros",
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
  },
}

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.kytcode.lat/nosotros#aboutpage",
  "url": "https://www.kytcode.lat/nosotros",
  "name": "Sobre K&T Code | Empresa de Desarrollo Web y Software en Colombia",
  "description": "K&T Code es una empresa colombiana especializada en desarrollo web, tiendas virtuales y software a medida para empresas en Colombia y Latinoamérica.",
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://www.kytcode.lat/#organization",
    "name": "K&T Code",
    "alternateName": ["kytcode", "KYT Code"],
    "url": "https://www.kytcode.lat/",
    "logo": "https://www.kytcode.lat/icon.png",
    "email": "contactktweb@gmail.com",
    "telephone": "+573116360057",
    "areaServed": ["Colombia", "Latin America"],
    "sameAs": [
      "https://www.facebook.com/KTSolutionsWeb",
      "https://www.instagram.com/ktweb_/",
      "https://www.tiktok.com/@kytweb"
    ]
  }
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://www.kytcode.lat/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Nosotros",
      "item": "https://www.kytcode.lat/nosotros"
    }
  ]
}

export default function NosotrosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-black text-white">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        {/* Subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex text-white/60 text-sm font-mono mb-10" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-white/40" />
                  <span className="text-white">Nosotros</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-16">
            <p className="text-white/60 font-mono text-sm uppercase tracking-widest mb-4">// Entidad e Institucional</p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title tracking-tight mb-8 leading-tight">
              Sobre K&T Code: Empresa de Desarrollo Web y Software en Colombia
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-mono leading-relaxed max-w-4xl border-l-2 border-white pl-6 py-2">
              <strong className="text-white">K&T Code</strong> es una empresa colombiana especializada en desarrollo web, tiendas virtuales y software a medida para empresas en Colombia y Latinoamérica.
            </p>
          </header>

          {/* Section 1: Qué Hacemos */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-title mb-8 flex items-center gap-3">
              <Code2 className="w-6 h-6 text-white" />
              Qué Hacemos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                <h3 className="text-xl font-bold font-title mb-3 text-white">Desarrollo de Páginas Web</h3>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                  Diseñamos y construimos sitios web corporativos y landing pages con arquitectura Next.js y React. Cada desarrollo está enfocado en velocidad extrema, alta conversión y accesibilidad multiplataforma.
                </p>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                <h3 className="text-xl font-bold font-title mb-3 text-white">Tiendas Virtuales y E-commerce</h3>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                  Creamos plataformas de comercio electrónico modernas y desacopladas (Headless). Integramos pasarelas de pago colombianas e internacionales, catálogos escalables y paneles administrativos intuitivos.
                </p>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                <h3 className="text-xl font-bold font-title mb-3 text-white">Software a Medida y Plataformas</h3>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                  Desarrollamos sistemas internos, paneles de gestión, CRMs y automatizaciones adaptadas exactamente a los procesos operativos y necesidades específicas de cada empresa.
                </p>
              </div>
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                <h3 className="text-xl font-bold font-title mb-3 text-white">SEO Técnico y Rendimiento Web</h3>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                  Optimizamos Core Web Vitals, estructuración semántica HTML5, datos enriquecidos Schema JSON-LD y velocidad de carga desde la raíz para un posicionamiento orgánico dominante.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Mercados y Alcance */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-title mb-8 flex items-center gap-3">
              <Globe className="w-6 h-6 text-white" />
              Mercados y Alcance
            </h2>
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
              <p className="text-neutral-300 font-mono leading-relaxed mb-6">
                Desde nuestra base operativa en Colombia, en <strong className="text-white">K&T Code</strong> atendemos clientes en todo el territorio nacional (Bogotá, Medellín, Cali, Barranquilla, Bucaramanga y principales regiones) así como en mercados internacionales de Latinoamérica y Estados Unidos.
              </p>
              <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                Nuestra metodología remota, comunicación asíncrona ágil y estándares de ingeniería nos permiten colaborar fluidamente con empresas de diferentes industrias y zonas horarias.
              </p>
            </div>
          </section>

          {/* Section 3: Proceso de Desarrollo */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-title mb-8 flex items-center gap-3">
              <Layers className="w-6 h-6 text-white" />
              Nuestra Forma de Trabajar
            </h2>
            <div className="space-y-4 font-mono text-sm">
              {[
                { step: "01", title: "Análisis y Definición Técnica", desc: "Comprendemos el modelo de negocio, objetivos comerciales y requerimientos específicos para definir la arquitectura adecuada." },
                { step: "02", title: "Diseño UX/UI & Estructura", desc: "Diseñamos interfaces claras, modernas y orientadas a la conversión, garantizando usabilidad en dispositivos móviles y de escritorio." },
                { step: "03", title: "Desarrollo en Código Limpio", desc: "Programamos con Next.js, React, TypeScript y Tailwind CSS, sin depender de plantillas pesadas ni constructores visuales lentos." },
                { step: "04", title: "Pruebas, SEO y Optimización", desc: "Auditamos velocidad de carga, métricas Core Web Vitals, metadatos, seguridad y compatibilidad cruzada antes del lanzamiento." },
                { step: "05", title: "Despliegue y Acompañamiento", desc: "Desplegamos en infraestructura Edge de Vercel y entregamos soporte continuo para garantizar la continuidad operativa." },
              ].map((phase, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white/[0.015] border border-white/5 p-5 rounded-xl">
                  <span className="text-white/40 font-bold text-lg">{phase.step}</span>
                  <div>
                    <h3 className="text-white font-bold text-base font-title">{phase.title}</h3>
                    <p className="text-neutral-400 text-xs mt-1">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Stack Tecnológico */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-title mb-8 flex items-center gap-3">
              <Cpu className="w-6 h-6 text-white" />
              Stack Tecnológico
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 font-mono text-xs">
              {[
                { name: "Next.js App Router", category: "Framework SSR / SSG" },
                { name: "React 19", category: "Librería UI" },
                { name: "TypeScript", category: "Tipado Estricto" },
                { name: "Tailwind CSS", category: "Diseño UI" },
                { name: "Vercel Edge", category: "Infraestructura Cloud" },
                { name: "Sanity CMS", category: "CMS Headless" },
                { name: "Supabase / PostgreSQL", category: "Base de Datos" },
                { name: "Schema JSON-LD", category: "SEO Estructurado" },
              ].map((tech, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/10 p-4 rounded-xl">
                  <p className="text-white font-bold">{tech.name}</p>
                  <p className="text-neutral-500 mt-1">{tech.category}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Principios de Calidad */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-title mb-8 flex items-center gap-3">
              <Award className="w-6 h-6 text-white" />
              Principios de Calidad
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
              {[
                "100% Propiedad del Código y entregables para el cliente.",
                "Arquitecturas modernas sin plantillas genéricas ni plugins inflados.",
                "Velocidad de carga superior optimizada para retención y conversión.",
                "Estructura semántica preparada para motores de búsqueda y asistentes IA.",
                "Diseño responsive impecable para smartphones, tablets y pantallas grandes.",
                "Garantía de código y soporte post-lanzamiento continuo.",
              ].map((principle, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white/[0.015] border border-white/5 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-neutral-300">{principle}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Resumen Factual para Usuarios, Buscadores e IA */}
          <section className="mb-20">
            <div className="bg-white/[0.03] border-2 border-white/20 rounded-2xl p-8 font-mono">
              <h2 className="text-xl md:text-2xl font-bold font-title text-white mb-6">
                K&T Code en Resumen
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Nombre de la Empresa</dt>
                  <dd className="text-white font-bold mt-1">K&T Code</dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Tipo de Entidad</dt>
                  <dd className="text-white font-bold mt-1">Empresa colombiana de desarrollo web y software</dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Servicios Principales</dt>
                  <dd className="text-neutral-300 mt-1">Páginas web a medida, tiendas virtuales (e-commerce), software corporativo, SEO técnico y mantenimiento</dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Mercados Atendidos</dt>
                  <dd className="text-neutral-300 mt-1">Colombia, Latinoamérica y Estados Unidos</dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Sitio Web Oficial</dt>
                  <dd className="text-white mt-1">
                    <a href="https://www.kytcode.lat" className="underline hover:text-neutral-300">https://www.kytcode.lat</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Representación Digital</dt>
                  <dd className="text-neutral-300 mt-1">kytcode / kytcode.lat</dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Correo de Contacto Oficial</dt>
                  <dd className="text-white mt-1">
                    <a href="mailto:contactktweb@gmail.com" className="underline hover:text-neutral-300">contactktweb@gmail.com</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Teléfono / WhatsApp</dt>
                  <dd className="text-white mt-1">
                    <a href="https://wa.me/573116360057" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-300">+57 311 636 0057</a>
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {/* Commercial CTA */}
          <section className="text-center bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 rounded-3xl p-10 md:p-14">
            <h2 className="text-2xl md:text-4xl font-bold font-title mb-4">
              ¿Listo para Desarrollar tu Proyecto Digital?
            </h2>
            <p className="text-neutral-400 font-mono text-sm md:text-base max-w-2xl mx-auto mb-8">
              Cuéntanos sobre tu empresa y recibe una propuesta técnica personalizada para tu página web, tienda virtual o software.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/precios"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-mono font-bold rounded-xl hover:bg-neutral-200 transition-colors"
              >
                Cotizar mi página web
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/573116360057?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20con%20K%26T%20Code."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-mono font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Hablar por WhatsApp
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
