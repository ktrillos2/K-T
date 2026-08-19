import { Metadata } from "next"
import Footer from "@/components/layout/footer"
import ServicesSection from "@/components/sections/services-section"
import PricingCTA from "@/components/sections/precios/pricing-cta"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Servicios de Desarrollo Web y Software en Colombia",
  description: "K&T Code ofrece servicios de desarrollo de páginas web a medida, tiendas virtuales, software corporativo, SEO técnico y mantenimiento para empresas en Colombia y Latinoamérica.",
  keywords: [
    "servicios desarrollo web colombia",
    "desarrollo paginas web bogota",
    "diseño web profesional colombia",
    "creacion tiendas online colombia",
    "desarrollo software a medida colombia",
    "mantenimiento paginas web",
    "integracion api whatsapp",
    "K&T Code servicios",
  ],
  alternates: {
    canonical: "https://www.kytcode.lat/servicios",
    languages: {
      "es-CO": "https://www.kytcode.lat/servicios",
      "es": "https://www.kytcode.lat/servicios",
      "x-default": "https://www.kytcode.lat/servicios",
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
    title: "Servicios de Desarrollo Web y Software en Colombia | K&T Code",
    description: "K&T Code ofrece servicios de desarrollo de páginas web a medida, tiendas virtuales, software corporativo, SEO técnico y mantenimiento en Colombia y Latinoamérica.",
    url: "https://www.kytcode.lat/servicios",
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
  },
}

export default function ServiciosPage() {
  return (
    <>
      <main className="min-h-screen pt-32 pb-16 relative overflow-hidden bg-black">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 mb-4">
          <nav className="flex text-white/60 text-sm font-mono mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-white">Servicios</span>
                </div>
              </li>
            </ol>
          </nav>

          <header className="text-center max-w-4xl mx-auto mb-12">
            <p className="text-white/60 font-mono text-sm uppercase tracking-widest mb-3">// Soluciones Digitales</p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-4">
              Servicios de Desarrollo Web y Software en Colombia
            </h1>
            <p className="text-neutral-400 font-mono text-sm md:text-base max-w-2xl mx-auto">
              Diseño, desarrollo y mantenimiento de páginas web, tiendas virtuales y aplicaciones a medida con arquitectura moderna en Next.js.
            </p>
          </header>
        </div>

        <ServicesSection />
        
        <div className="mt-20">
            <PricingCTA />
        </div>
      </main>
      <Footer />
    </>
  )
}
