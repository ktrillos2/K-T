import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"

import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { servicePageList } from "@/lib/service-pages"
import { buildBreadcrumbJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Servicios de Desarrollo Web y Software",
  description:
    "Conoce los servicios de desarrollo web, diseño corporativo, tiendas virtuales, software a medida, SEO técnico y mantenimiento de K&T Code.",
  alternates: {
    canonical: absoluteUrl("/servicios"),
  },
  openGraph: {
    title: "Servicios de Desarrollo Web y Software | K&T Code",
    description:
      "Soluciones web para empresas: sitios corporativos, e-commerce, software, SEO técnico y mantenimiento.",
    url: absoluteUrl("/servicios"),
    type: "website",
  },
}

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servicios de K&T Code",
  itemListElement: servicePageList.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.shortTitle,
    url: absoluteUrl(`/servicios/${service.slug}`),
  })),
}

export default function ServiciosPage() {
  return (
    <>
      <JsonLd
        data={[
          itemListJsonLd,
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Servicios", path: "/servicios" },
          ]),
        ]}
      />

      <main className="relative min-h-screen overflow-hidden bg-black pb-24 pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:54px_54px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="mb-12 font-mono text-sm text-white/55">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="transition-colors hover:text-white">Inicio</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li aria-current="page" className="text-white">Servicios</li>
            </ol>
          </nav>

          <header className="max-w-4xl">
            <p className="font-mono text-sm text-white/55">// Soluciones digitales para empresas</p>
            <h1 className="mt-5 font-title text-4xl font-bold leading-[.95] md:text-6xl lg:text-7xl">
              Desarrollo web, e-commerce y software a medida
            </h1>
            <p className="mt-7 max-w-3xl font-mono text-base leading-8 text-white/65 md:text-lg">
              Cada servicio parte de una necesidad concreta: presentar una empresa, vender en línea,
              automatizar procesos, mejorar la visibilidad orgánica o mantener una plataforma estable.
            </p>
          </header>

          <section className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Servicios disponibles">
            {servicePageList.map((service, index) => (
              <article
                key={service.slug}
                className="group flex min-h-[310px] flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.05]"
              >
                <span className="font-mono text-xs text-white/30">0{index + 1}</span>
                <h2 className="mt-8 font-title text-2xl font-bold leading-tight">{service.shortTitle}</h2>
                <p className="mt-4 flex-1 font-mono text-sm leading-7 text-white/58">{service.metaDescription}</p>
                <Link
                  href={`/servicios/${service.slug}`}
                  className="mt-7 inline-flex items-center gap-2 font-mono text-sm font-bold text-white"
                >
                  Ver servicio
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </section>

          <section className="mt-20 rounded-3xl border border-white/10 bg-white/[0.035] p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="font-mono text-sm text-white/55">// El alcance se define contigo</p>
                <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                  ¿No sabes qué tipo de solución necesitas?
                </h2>
                <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-white/60">
                  Cuéntanos el problema, el proceso actual y el resultado que esperas. Te ayudamos a definir
                  una primera etapa realista antes de hablar de tecnología.
                </p>
              </div>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-mono font-bold text-black"
              >
                Solicitar orientación
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
