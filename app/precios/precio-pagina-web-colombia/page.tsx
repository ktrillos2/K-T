import type { Metadata } from "next"

import Footer from "@/components/layout/footer"
import PricingGuidePage from "@/components/sections/pricing-guide-page"
import { pricingGuides } from "@/lib/pricing-guides"
import { absoluteUrl } from "@/lib/site-config"

const guide = pricingGuides["precio-pagina-web-colombia"]

export const metadata: Metadata = {
  title: guide.metaTitle,
  description: guide.metaDescription,
  keywords: [
    "empresa desarrollo de paginas web colombia precio",
    "cuanto cuesta una pagina web en colombia 2026",
    "precios paginas web bogota",
    "cuanto vale crear una pagina web en colombia",
    "cotizacion pagina web colombia",
    "tarifas desarrollo web medellin",
    "precio diseño web colombia",
    "K&T Code precios web",
  ],
  alternates: {
    canonical: absoluteUrl(`/precios/${guide.slug}`),
    languages: {
      "es-CO": absoluteUrl(`/precios/${guide.slug}`),
      "es": absoluteUrl(`/precios/${guide.slug}`),
      "x-default": absoluteUrl(`/precios/${guide.slug}`),
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
    title: guide.metaTitle,
    description: guide.metaDescription,
    url: absoluteUrl(`/precios/${guide.slug}`),
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
  },
}

export default function PrecioPaginaWebPage() {
  return (
    <>
      <PricingGuidePage guide={guide} />
      <Footer />
    </>
  )
}
