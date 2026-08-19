import type { Metadata } from "next"

import Footer from "@/components/layout/footer"
import PricingGuidePage from "@/components/sections/pricing-guide-page"
import { pricingGuides } from "@/lib/pricing-guides"
import { absoluteUrl } from "@/lib/site-config"

const guide = pricingGuides["precio-software-a-medida"]

export const metadata: Metadata = {
  title: guide.metaTitle,
  description: guide.metaDescription,
  keywords: [
    "cuanto cuesta desarrollar un software a medida en colombia",
    "precio desarrollo saas colombia",
    "costo crear aplicacion web a medida",
    "cotizacion software empresarial bogota",
    "tarifas programacion fullstack colombia",
    "K&T Code precio software a medida",
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

export default function PrecioSoftwareMedidaPage() {
  return (
    <>
      <PricingGuidePage guide={guide} />
      <Footer />
    </>
  )
}
