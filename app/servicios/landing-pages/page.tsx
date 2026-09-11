import type { Metadata } from "next"

import Footer from "@/components/layout/footer"
import ServiceDetailPage from "@/components/sections/service-detail-page"
import { servicePages } from "@/lib/service-pages"
import { absoluteUrl } from "@/lib/site-config"

const service = servicePages["landing-pages"]

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: absoluteUrl(`/servicios/${service.slug}`),
    languages: {
      "es-CO": absoluteUrl(`/servicios/${service.slug}`),
      es: absoluteUrl(`/servicios/${service.slug}`),
      en: absoluteUrl("/en/services/landing-pages"),
      "x-default": absoluteUrl(`/servicios/${service.slug}`),
    },
  },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: absoluteUrl(`/servicios/${service.slug}`),
    type: "website",
    siteName: "K&T Code",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: service.metaTitle,
    description: service.metaDescription,
  },
}

export default function LandingPagesServicePage() {
  return (
    <>
      <ServiceDetailPage service={service} />
      <Footer />
    </>
  )
}
