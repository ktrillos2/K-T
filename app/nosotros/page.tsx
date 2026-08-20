import { Metadata } from "next"
import Image from "next/image"
import Footer from "@/components/layout/footer"
import Link from "next/link"
import {
  ChevronRight,
  Code2,
  ShieldCheck,
  Zap,
  Globe,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Layers,
  Award,
  UserCheck,
  Building2,
  Workflow,
  Sparkles,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Facebook,
} from "lucide-react"

// Custom TikTok Icon
const TikTok = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

export const metadata: Metadata = {
  title: "Sobre Nosotros - Empresa de Desarrollo Web y Software en Colombia | K&T Code",
  description:
    "Conoce a K&T Code: empresa colombiana de desarrollo web y software fundada en 2025 en San José de Cúcuta. Equipo de ingeniería, liderazgo, metodología y tecnologías Next.js.",
  keywords: [
    "sobre K&T Code",
    "empresa desarrollo web colombia",
    "quienes somos K&T Code",
    "equipo ingenieria K&T Code",
    "Keyner Trillos desarrollador",
    "desarrollo software a medida colombia",
    "agencia web cucuta colombia",
    "K&T Code nosotros",
  ],
  alternates: {
    canonical: "https://www.kytcode.lat/nosotros",
    languages: {
      "es-CO": "https://www.kytcode.lat/nosotros",
      es: "https://www.kytcode.lat/nosotros",
      en: "https://www.kytcode.lat/en/about",
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
    description:
      "Conoce a K&T Code: empresa colombiana de desarrollo web y software fundada en 2025. Equipo, liderazgo, metodología de ingeniería y tecnologías modernas.",
    url: "https://www.kytcode.lat/nosotros",
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
  },
}

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.kytcode.lat/nosotros#aboutpage",
      "url": "https://www.kytcode.lat/nosotros",
      "name": "Sobre K&T Code | Empresa de Desarrollo Web y Software en Colombia",
      "description":
        "K&T Code es una empresa colombiana especializada en desarrollo web, tiendas virtuales y software a medida para empresas en Colombia y Latinoamérica.",
      "mainEntity": {
        "@id": "https://www.kytcode.lat/#organization"
      },
      "isPartOf": {
        "@id": "https://www.kytcode.lat/#website"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.kytcode.lat/#organization",
      "name": "K&T Code",
      "legalName": "K&T Code",
      "alternateName": ["kytcode", "KYT Code"],
      "url": "https://www.kytcode.lat/",
      "logo": "https://www.kytcode.lat/icon.png",
      "image": "https://www.kytcode.lat/opengraph-image.png",
      "foundingDate": "2025",
      "email": "contactoktweb@gmail.com",
      "telephone": "+573116360057",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "San José de Cúcuta",
        "addressLocality": "Cúcuta",
        "addressRegion": "Norte de Santander",
        "postalCode": "540001",
        "addressCountry": "CO"
      },
      "areaServed": [
        { "@type": "Country", "name": "Colombia" },
        { "@type": "AdministrativeArea", "name": "Latin America" },
        { "@type": "Country", "name": "United States" }
      ],
      "sameAs": [
        "https://www.instagram.com/ktweb_/",
        "https://www.facebook.com/KTSolutionsWeb",
        "https://www.tiktok.com/@kytweb"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.kytcode.lat/#person-keyner-trillos",
      "name": "Keyner Trillos",
      "jobTitle": "Co-Fundador & Lead Software Engineer",
      "worksFor": {
        "@id": "https://www.kytcode.lat/#organization"
      },
      "url": "https://www.kytcode.lat/nosotros",
      "sameAs": [
        "https://www.instagram.com/ktweb_/",
        "https://www.facebook.com/KTSolutionsWeb",
        "https://www.tiktok.com/@kytweb"
      ]
    }
  ]
}

const breadcrumbJsonLd = {
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

      <main className="min-h-screen bg-black pt-32 pb-24 px-4 sm:px-6 text-white selection:bg-white selection:text-black">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-neutral-400">
            <ol className="flex items-center justify-center gap-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              </li>
              <li className="text-white font-bold" aria-current="page">
                Sobre Nosotros
              </li>
            </ol>
          </nav>

          {/* Hero / Header */}
          <header className="mb-16 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 font-mono text-xs text-neutral-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Identidad Corporativa & Equipo de Ingeniería
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-title tracking-tight text-white mb-4 leading-tight max-w-5xl">
              K&T Code: Empresa de Desarrollo Web y Software a Medida en Colombia
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-mono text-emerald-400 font-medium mb-6 max-w-3xl">
              Ingeniería de software basada en rigor, velocidad y resultados.
            </p>
            <p className="font-mono text-base sm:text-lg text-neutral-400 max-w-3xl leading-relaxed mx-auto">
              <strong className="text-white">K&T Code</strong> es una empresa colombiana de desarrollo web y software a medida fundada en 2025 en San José de Cúcuta. Construimos plataformas digitales de alto rendimiento con <strong className="text-white">Next.js, React 19, TypeScript, Supabase y CMS Headless</strong> para empresas en Colombia, Latinoamérica y Estados Unidos.
            </p>
          </header>

          {/* Liderazgo y Equipo Directivo */}
          <section className="mb-20">
            <div className="mb-8">
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block mb-2">
                // Liderazgo Técnico
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-title text-white">
                Quién Dirige el Desarrollo en K&T Code
              </h2>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.04] via-neutral-950 to-black">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Foto / Perfil */}
                <div className="md:col-span-4 text-center md:text-left">
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-white/20 mx-auto md:mx-0 mb-4 shadow-xl bg-neutral-900">
                    <Image
                      src="/perfil.png"
                      alt="Keyner Trillos - Co-Fundador & Lead Software Engineer"
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-title">Keyner Trillos</h3>
                  <p className="text-emerald-400 font-mono text-xs mt-1">Co-Fundador & Lead Software Engineer</p>
                  <p className="text-neutral-400 font-mono text-xs mt-0.5">San José de Cúcuta, Colombia</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                    <a
                      href="https://www.instagram.com/ktweb_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      <span>Instagram</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://www.facebook.com/KTSolutionsWeb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Facebook className="w-3.5 h-3.5 text-blue-400" />
                      <span>Facebook</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@kytweb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors inline-flex items-center gap-1.5"
                    >
                      <TikTok className="w-3.5 h-3.5 text-neutral-300" />
                      <span>TikTok</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Bio & Track Record */}
                <div className="md:col-span-8 space-y-4 font-mono text-sm leading-relaxed text-neutral-300">
                  <p>
                    Keyner Trillos lidera la dirección técnica, arquitectura de software y estrategias de adquisición en <strong className="text-white">K&T Code</strong>. Especializado en el ecosistema React, Next.js y TypeScript, cuenta con amplia experiencia en la estructuración de plataformas digitales orientadas a alto rendimiento (Core Web Vitals), escalabilidad y SEO técnico avanzado.
                  </p>
                  <p>
                    Además de la ingeniería web, cuenta con sólida trayectoria en la <strong className="text-white">gestión estratégica de Meta Ads (Facebook e Instagram Ads)</strong>, diseñando campañas publicitarias y embudos de conversión adaptados a las necesidades y metas comerciales de cada empresa para maximizar el retorno de inversión (ROAS).
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Especialidad</span>
                      <strong className="text-neutral-200">Next.js & Gestión Estratégica de Meta Ads</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase tracking-wider text-[10px]">Supervisión</span>
                      <strong className="text-neutral-200">100% de los proyectos en producción</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Estructura del Equipo de Ingeniería */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-title mb-8 flex items-center gap-3">
              <Cpu className="w-6 h-6 text-white" />
              Estructura del Equipo y Disciplinas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-sm">
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <Code2 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white font-title mb-2">Ingeniería Frontend</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Desarrollo de interfaces modulares y accesibles con Next.js, React 19, Server Components y estilos en Tailwind CSS.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white font-title mb-2">Backend & Bases de Datos</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Modelado relacional en PostgreSQL / Supabase, Server Actions seguras, autenticación y conexión con pasarelas de pago (Wompi, PayU, Bold).
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-4">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white font-title mb-2">Diseño de Producto & UI/UX</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Diseño exclusivo en Figma, creación de Design Systems corporativos y validación ergonómica en dispositivos móviles y de escritorio.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Metodología de Ingeniería en 6 Etapas */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-title mb-8 flex items-center gap-3">
              <Workflow className="w-6 h-6 text-white" />
              Metodología de Desarrollo en 6 Etapas
            </h2>
            <div className="space-y-4 font-mono text-sm">
              {[
                {
                  step: "01",
                  title: "Discovery & Viabilidad Técnica",
                  desc: "Analizamos el modelo de negocio, objetivos comerciales, público objetivo y definimos el alcance técnico exacto y los KPIs del proyecto.",
                },
                {
                  step: "02",
                  title: "Diseño UI/UX & Prototipado en Figma",
                  desc: "Diseñamos la interfaz gráfica a la medida de tu identidad corporativa, optimizando flujos de navegación para retención y conversión comercial.",
                },
                {
                  step: "03",
                  title: "Arquitectura de Software & Modelado",
                  desc: "Estructuramos el proyecto en Next.js con App Router, Server Components y configuramos bases de datos relacionales en Supabase / PostgreSQL.",
                },
                {
                  step: "04",
                  title: "Desarrollo con Tipado Estricto",
                  desc: "Programamos en TypeScript sin plantillas recicladas ni plugins lentos, integrando APIs, pasarelas de pago colombianas y WhatsApp Business.",
                },
                {
                  step: "05",
                  title: "QA, Seguridad & Auditoría Core Web Vitals",
                  desc: "Auditamos exhaustivamente tiempos de carga (LCP < 0.8s, CLS 0), estructuración semántica HTML5, datos enriquecidos Schema JSON-LD y seguridad SSL.",
                },
                {
                  step: "06",
                  title: "Lanzamiento en Edge CDN & Acompañamiento",
                  desc: "Desplegamos en la red perimetral de Vercel/Cloudflare, entregamos el repositorio privado en GitHub a nombre del cliente y garantizamos soporte post-lanzamiento.",
                },
              ].map((phase, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-start gap-4 bg-white/[0.015] border border-white/5 p-6 rounded-xl hover:border-white/20 transition-colors"
                >
                  <span className="text-emerald-400 font-bold text-lg shrink-0 mt-0.5">{phase.step}</span>
                  <div>
                    <h3 className="text-white font-bold text-base font-title">{phase.title}</h3>
                    <p className="text-neutral-400 text-xs mt-1.5 leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Proyectos y Clientes Verificables */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-title mb-8 flex items-center gap-3">
              <Award className="w-6 h-6 text-white" />
              Proyectos y Casos de Estudio Verificables
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
              {[
                {
                  title: "Psicowork",
                  sector: "Salud Mental & Bienestar",
                  slug: "psicowork",
                  desc: "Plataforma de psicología clínica y organizacional con flujo directo de citas.",
                },
                {
                  title: "Brambila's Inmobiliaria",
                  sector: "Proptech / Inmobiliaria",
                  slug: "brambila-inmobiliaria",
                  desc: "Portal inmobiliario con fichas dinámicas compartibles y filtros en tiempo real.",
                },
                {
                  title: "Noskygroup",
                  sector: "Ingeniería & LiDAR",
                  slug: "nosky-group",
                  desc: "Web corporativa de topografía digital y escaneo LiDAR para licitaciones.",
                },
                {
                  title: "Telas Real",
                  sector: "E-commerce B2B Textil",
                  slug: "telas-real",
                  desc: "Migración de WordPress lento a catálogo mayorista Headless en Next.js.",
                },
                {
                  title: "Qvareli",
                  sector: "Consultoría & Tecnología",
                  slug: "qvareli",
                  desc: "Plataforma corporativa de alta credibilidad y captación B2B.",
                },
                {
                  title: "Eklipse Home Textil",
                  sector: "Decoración & Cortinas",
                  slug: "eklipse-home-textil",
                  desc: "Catálogo digital interactivo con cotización de medidas personalizadas.",
                },
              ].map((proj, idx) => (
                <Link
                  key={idx}
                  href={`/projects/${proj.slug}`}
                  className="bg-white/[0.02] border border-white/10 hover:border-white/30 p-5 rounded-xl transition-all group block"
                >
                  <span className="text-emerald-400 text-[10px] uppercase tracking-wider block mb-1">
                    {proj.sector}
                  </span>
                  <strong className="text-white font-bold text-sm group-hover:text-primary transition-colors flex items-center justify-between">
                    {proj.title}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </strong>
                  <p className="text-neutral-400 text-xs mt-2 leading-relaxed">{proj.desc}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/portafolio"
                className="text-xs font-mono text-neutral-400 hover:text-white underline inline-flex items-center gap-1.5"
              >
                Ver todos los casos de estudio en el portafolio completo
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </section>

          {/* Section 5: Stack Tecnológico */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-title mb-8 flex items-center gap-3">
              <Zap className="w-6 h-6 text-white" />
              Stack Tecnológico Central
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 font-mono text-xs">
              {[
                { name: "Next.js App Router", category: "Framework SSR / SSG" },
                { name: "React 19", category: "Librería UI" },
                { name: "TypeScript 5", category: "Tipado Estricto" },
                { name: "Tailwind CSS", category: "Diseño & UI" },
                { name: "Vercel Edge Network", category: "Infraestructura Global CDN" },
                { name: "Supabase / PostgreSQL", category: "Base de Datos Relacional" },
                { name: "Sanity CMS", category: "CMS Headless" },
                { name: "Schema.org JSON-LD", category: "SEO Estructurado" },
              ].map((tech, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/10 p-4 rounded-xl">
                  <p className="text-white font-bold">{tech.name}</p>
                  <p className="text-neutral-500 mt-1">{tech.category}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Estándares de Calidad Factual */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-title mb-8 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-white" />
              Estándares de Ingeniería y Calidad Factual
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
              {[
                "Evaluación de Rendimiento y Core Web Vitals: Antes de cada lanzamiento auditamos LCP (< 0.8s), CLS (0), INP (< 100ms), compresión WebP/AVIF, minimización de scripts y entrega en Vercel Edge CDN.",
                "Arquitectura Next.js & React 19: Programamos con Server Components y TypeScript estricto, eliminando bases de datos expuestas y vulnerabilidades de plugins de terceros.",
                "SEO Técnico y Optimización para Motores de IA (GEO): Implementamos marcado Schema.org JSON-LD (Organization, Service, FAQPage), sitemaps dinámicos y jerarquía semántica HTML5 estricta.",
                "Propiedad 100% del Código y Repositorio: Entregamos el código fuente completo en un repositorio privado de GitHub a nombre de la empresa cliente con total independencia.",
                "Integraciones Transaccionales en Colombia: Conectamos pasarelas de pago (Wompi, Bold, PayU), pasarelas PSE/Nequi, WhatsApp Business API y facturación electrónica DIAN.",
                "Garantía de Código y Soporte Operativo: Proveemos monitoreo de disponibilidad 24/7, copias de seguridad automáticas y resolución de incidencias con SLA garantizado.",
              ].map((principle, idx) => (
                <div key={idx} className="flex items-start gap-3 p-5 bg-white/[0.015] border border-white/10 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-neutral-300 text-xs leading-5">{principle}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Ficha Institucional Factual */}
          <section className="mb-20">
            <div className="bg-white/[0.03] border-2 border-white/20 rounded-2xl p-8 font-mono">
              <h2 className="text-xl md:text-2xl font-bold font-title text-white mb-6">
                K&T Code en Resumen (Ficha Institucional)
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Nombre Oficial y Comercial</dt>
                  <dd className="text-white font-bold mt-1">K&T Code</dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Tipo de Entidad</dt>
                  <dd className="text-white font-bold mt-1">Empresa colombiana de desarrollo web y software</dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Año de Fundación</dt>
                  <dd className="text-neutral-300 mt-1">2025</dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Ubicación Sede Central</dt>
                  <dd className="text-neutral-300 mt-1">San José de Cúcuta, Norte de Santander, Colombia</dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Dirección Técnica</dt>
                  <dd className="text-neutral-300 mt-1">Keyner Trillos (Lead Software Engineer)</dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Mercados Atendidos</dt>
                  <dd className="text-neutral-300 mt-1">Colombia, Latinoamérica y Estados Unidos</dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Sitio Web Oficial</dt>
                  <dd className="text-white mt-1">
                    <a href="https://www.kytcode.lat" className="underline hover:text-neutral-300">
                      https://www.kytcode.lat
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Correo de Contacto Oficial</dt>
                  <dd className="text-white mt-1">
                    <a href="mailto:contactoktweb@gmail.com" className="underline hover:text-neutral-300">
                      contactoktweb@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Teléfono / WhatsApp</dt>
                  <dd className="text-white mt-1">
                    <a
                      href="https://wa.me/573116360057"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-neutral-300"
                    >
                      +57 311 636 0057
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-white/50 text-xs uppercase tracking-wider">Stack Tecnológico</dt>
                  <dd className="text-neutral-300 mt-1">Next.js, React 19, TypeScript, Supabase, PostgreSQL</dd>
                </div>
              </dl>
            </div>
          </section>

          {/* Commercial CTA */}
          <section className="text-center bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 rounded-3xl p-10 md:p-14">
            <h2 className="text-2xl md:text-4xl font-bold font-title mb-4">
              ¿Listo para Desarrollar tu Proyecto Digital con Ingeniería Real?
            </h2>
            <p className="text-neutral-400 font-mono text-sm md:text-base max-w-2xl mx-auto mb-8">
              Cuéntanos sobre tu empresa y recibe una propuesta técnica personalizada para tu página web, tienda virtual o software.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/precios"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-mono font-bold rounded-xl hover:bg-neutral-200 transition-colors"
              >
                Ver Planes y Precios
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/573116360057?text=Hola%20K%26T%20Code,%20revis%C3%A9%20la%20p%C3%A1gina%20de%20nosotros%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 font-mono font-bold rounded-xl hover:bg-white/20 transition-colors"
              >
                Hablar con un Ingeniero
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
