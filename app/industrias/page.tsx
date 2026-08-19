import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight, Building2, HardHat, Plane, HeartPulse, ShoppingCart, Car, Sparkles, BookOpen } from "lucide-react"

import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildBreadcrumbJsonLd } from "@/lib/seo"
import { industryPageList } from "@/lib/industry-pages"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Desarrollo Web por Industrias y Sectores en Colombia | K&T Code",
  description: "Soluciones de desarrollo web, software y e-commerce especializadas para inmobiliarias, salud, ingeniería, e-commerce B2B, turismo, automotriz, estética y medios en Colombia.",
  keywords: [
    "desarrollo web por industrias colombia",
    "paginas web inmobiliarias colombia",
    "desarrollo web empresas de ingenieria",
    "paginas web turismo y hoteles colombia",
    "desarrollo web clinicas y salud",
    "ecommerce b2b colombia",
    "desarrollo web automotriz repuestos",
    "paginas web centros de estetica",
    "K&T Code industrias",
  ],
  alternates: {
    canonical: absoluteUrl("/industrias"),
    languages: {
      "es-CO": absoluteUrl("/industrias"),
      es: absoluteUrl("/industrias"),
      "x-default": absoluteUrl("/industrias"),
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
    title: "Desarrollo Web por Industrias y Sectores en Colombia | K&T Code",
    description: "Soluciones de desarrollo web y software especializadas para sectores clave en Colombia.",
    url: absoluteUrl("/industrias"),
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
  },
}

const industryIcons: Record<string, any> = {
  "desarrollo-web-inmobiliarias": Building2,
  "desarrollo-web-salud": HeartPulse,
  "desarrollo-web-ingenieria": HardHat,
  "ecommerce-b2b": ShoppingCart,
  "desarrollo-web-turismo": Plane,
  "desarrollo-web-automotriz": Car,
  "desarrollo-web-estetica": Sparkles,
  "desarrollo-web-editorial": BookOpen,
}

export default function IndustriasHubPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Industrias", path: "/industrias" },
          ]),
        ]}
      />

      <main className="relative min-h-screen overflow-hidden bg-black pb-24 pt-32 text-white">
        {/* Background Grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:54px_54px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-white/[0.035] blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs sm:text-sm text-white/55 flex justify-center">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="text-white font-bold">
                Industrias
              </li>
            </ol>
          </nav>

          <header className="max-w-4xl mx-auto text-center mb-16">
            <p className="mb-4 font-mono text-xs sm:text-sm uppercase tracking-widest text-white/60">// Soluciones por Sector</p>
            <h1 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
              Desarrollo Web Especializado por Industrias en Colombia
            </h1>
            <p className="font-mono text-sm sm:text-base md:text-lg leading-relaxed text-white/70 max-w-3xl mx-auto">
              No todos los negocios tienen los mismos requerimientos. Diseñamos plataformas web con arquitectura a medida optimizada para resolver los retos específicos de cada sector productivo en Colombia.
            </p>
          </header>

          {/* Industry Cards Grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industryPageList.map((ind) => {
              const Icon = industryIcons[ind.slug] || Building2
              return (
                <Link
                  key={ind.slug}
                  href={`/industrias/${ind.slug}`}
                  className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.025] p-8 transition-all hover:border-white/25 hover:bg-white/[0.05]"
                >
                  <div>
                    <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-4 text-white transition-transform group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="block font-mono text-xs uppercase tracking-wider text-white/50">{ind.industryName}</span>
                    <h2 className="mt-2 font-title text-2xl font-bold text-white group-hover:text-neutral-100">
                      {ind.shortTitle}
                    </h2>
                    <p className="mt-3 font-mono text-xs leading-6 text-white/65">
                      {ind.summary}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 font-mono text-xs font-bold text-white transition-transform group-hover:translate-x-1">
                    <span>Ver solución especializada</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
