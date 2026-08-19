import { Metadata } from "next"
import Footer from "@/components/layout/footer"
import PricingCTA from "@/components/sections/precios/pricing-cta"
import Link from "next/link"
import { ChevronRight, Code, Zap, Smartphone, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Desarrollo Web a Medida en Colombia",
  description: "Creamos páginas web personalizadas y de alto rendimiento. Arquitectura headless con Next.js optimizada para SEO, velocidad extrema y conversiones.",
  keywords: [
    "desarrollo web a medida",
    "paginas web personalizadas",
    "arquitectura headless next.js",
    "desarrollo web alto rendimiento",
    "optimizacion core web vitals",
    "programacion react colombia",
    "software a la medida bogota",
    "K&T Code desarrollo a medida",
  ],
  alternates: {
    canonical: "https://www.kytcode.lat/servicios/desarrollo-web-a-medida",
    languages: {
      "es-CO": "https://www.kytcode.lat/servicios/desarrollo-web-a-medida",
      "es": "https://www.kytcode.lat/servicios/desarrollo-web-a-medida",
      "x-default": "https://www.kytcode.lat/servicios/desarrollo-web-a-medida",
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
    title: "Desarrollo Web a Medida en Colombia | K&T Code",
    description: "Creamos páginas web personalizadas y de alto rendimiento. Arquitectura headless con Next.js optimizada para SEO, velocidad extrema y conversiones.",
    url: "https://www.kytcode.lat/servicios/desarrollo-web-a-medida",
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
  },
}

export default function DesarrolloWebMedidaPage() {
  return (
    <>
      <main className="min-h-screen pt-32 pb-16 relative overflow-hidden bg-black">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <nav className="flex text-white/60 text-sm font-mono mb-12" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-white">Desarrollo Web a Medida</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold font-title mb-6 leading-tight">
                Desarrollo Web a Medida en Colombia
              </h1>
              <p className="text-xl text-white/70 mb-8 leading-relaxed font-mono">
                En K&T Code no usamos plantillas. Diseñamos y construimos páginas web a medida y software de alto rendimiento con Next.js y React, optimizados para posicionamiento orgánico en Google y conversión empresarial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/precios" 
                  className="bg-white text-black px-8 py-4 rounded-xl font-mono font-bold text-center hover:bg-white/90 transition-colors"
                >
                  Cotizar mi página web
                </Link>
                <Link 
                  href="/portafolio" 
                  className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-mono font-bold text-center hover:bg-white/20 transition-colors"
                >
                  Ver proyectos
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-900/50 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                 <Zap className="w-10 h-10 text-white mb-4" />
                 <h3 className="font-bold mb-2">Velocidad Extrema</h3>
                 <p className="text-sm text-white/60">Tiempos de carga inferiores a 1 segundo para mejorar la retención.</p>
              </div>
              <div className="bg-neutral-900/50 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                 <Search className="w-10 h-10 text-white mb-4" />
                 <h3 className="font-bold mb-2">SEO Integrado</h3>
                 <p className="text-sm text-white/60">Arquitectura semántica y datos estructurados nativos.</p>
              </div>
              <div className="bg-neutral-900/50 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                 <Smartphone className="w-10 h-10 text-white mb-4" />
                 <h3 className="font-bold mb-2">Responsive 100%</h3>
                 <p className="text-sm text-white/60">Adaptación perfecta a cualquier dispositivo móvil o tablet.</p>
              </div>
              <div className="bg-neutral-900/50 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
                 <Code className="w-10 h-10 text-white mb-4" />
                 <h3 className="font-bold mb-2">Código Limpio</h3>
                 <p className="text-sm text-white/60">Desarrollo mantenible y escalable sin dependencias innecesarias.</p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto prose prose-invert prose-lg mb-24 font-mono">
            <h2>¿Por qué elegir un desarrollo a medida sobre plantillas?</h2>
            <p>
              A diferencia de constructores visuales tradicionales que sobrecargan el sitio con código innecesario, 
              nuestro enfoque de <strong>desarrollo web a medida</strong> garantiza que tu sitio web tenga exactamente 
              las características que necesitas y nada de lo que no. Esto resulta en una velocidad de carga inigualable, 
              mejores métricas de Core Web Vitals y, en consecuencia, un mejor posicionamiento SEO orgánico en Google.
            </p>
            <h3>Nuestro Proceso</h3>
            <ul>
              <li><strong>Auditoría y Planificación:</strong> Entendemos tu modelo de negocio y estructuramos la arquitectura de la información.</li>
              <li><strong>Diseño UI/UX UI:</strong> Creamos interfaces visuales a medida con un estilo premium y enfocado en la conversión.</li>
              <li><strong>Desarrollo Frontend:</strong> Programamos el diseño en código puro usando React y Next.js.</li>
              <li><strong>Lanzamiento y SEO:</strong> Desplegamos tu web en redes globales (CDN) y configuramos el SEO técnico inicial.</li>
            </ul>
          </div>
        </div>

        <PricingCTA />
      </main>
      <Footer />
    </>
  )
}
