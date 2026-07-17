import type { Metadata } from "next"

import Footer from "@/components/layout/footer"
import AdditionalServices from "@/components/sections/precios/additional-services"
import ComparisonTable from "@/components/sections/precios/comparison-table"
import HowWeWork from "@/components/sections/precios/how-we-work"
import PricingCards from "@/components/sections/precios/pricing-cards"
import PricingCTA from "@/components/sections/precios/pricing-cta"
import PricingFAQ from "@/components/sections/precios/pricing-faq"
import PricingHero from "@/components/sections/precios/pricing-hero"
import JsonLd from "@/components/seo/json-ld"
import { pricingFaqs } from "@/lib/pricing-faqs"
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl, siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Precios de páginas web y software a medida",
  description:
    "Consulta precios iniciales para landing pages, sitios corporativos, tiendas virtuales y software a medida en Colombia.",
  alternates: { canonical: absoluteUrl("/precios") },
  openGraph: {
    title: "Precios de páginas web y software a medida | K&T Code",
    description:
      "Valores iniciales, alcance, tiempos y factores que modifican el costo de un proyecto web.",
    url: absoluteUrl("/precios"),
    type: "website",
  },
}

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Precios", path: "/precios" },
          ]),
          buildFaqJsonLd(pricingFaqs),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${absoluteUrl("/precios")}#webpage`,
            url: absoluteUrl("/precios"),
            name: "Precios de páginas web y software a medida",
            description: "Precios iniciales y factores de alcance para servicios de desarrollo web.",
            isPartOf: { "@id": `${siteConfig.url}/#website` },
            about: { "@id": `${siteConfig.url}/#organization` },
          },
        ]}
      />
      <main className="relative min-h-screen overflow-hidden bg-black pb-16 pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-full max-w-[1000px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[120px]" />
        <div className="relative z-10 flex flex-col gap-24 lg:gap-32">
          <PricingHero />
          <PricingCards />
          <AdditionalServices />
          <HowWeWork />
          <ComparisonTable />
          <PricingFAQ />
          <PricingCTA />
        </div>
      </main>
      <Footer />
    </>
  )
}
