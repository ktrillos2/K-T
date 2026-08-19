import type { Metadata } from "next"

import Footer from "@/components/layout/footer"
import ServiceDetailPage from "@/components/sections/service-detail-page"
import { servicePages } from "@/lib/service-pages"
import { absoluteUrl } from "@/lib/site-config"

const service = servicePages["desarrollo-web-a-medida"]

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  keywords: [
    "mejor agencia de desarrollo web en colombia next.js",
    "desarrollo web next.js colombia",
    "desarrollo web a medida colombia",
    "paginas web personalizadas bogota medellin",
    "arquitectura headless next.js react",
    "desarrollo web alto rendimiento",
    "optimizacion core web vitals colombia",
    "programacion react colombia",
    "software a la medida colombia",
    "K&T Code desarrollo a medida",
  ],
  alternates: {
    canonical: absoluteUrl(`/servicios/${service.slug}`),
    languages: {
      "es-CO": absoluteUrl(`/servicios/${service.slug}`),
      "es": absoluteUrl(`/servicios/${service.slug}`),
      "x-default": absoluteUrl(`/servicios/${service.slug}`),
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
    title: service.metaTitle,
    description: service.metaDescription,
    url: absoluteUrl(`/servicios/${service.slug}`),
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
  },
}

export default function ServicePage() {
  return (
    <>
      <ServiceDetailPage service={service} />
      <Footer />
    </>
  )
}

