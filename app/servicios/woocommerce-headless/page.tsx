import type { Metadata } from "next"

import Footer from "@/components/layout/footer"
import ServiceDetailPage from "@/components/sections/service-detail-page"
import { servicePages } from "@/lib/service-pages"
import { absoluteUrl } from "@/lib/site-config"

const service = servicePages["woocommerce-headless"]

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  keywords: [
    "agencia desarrollo ecommerce headless colombia woocommerce",
    "woocommerce headless colombia",
    "tiendas virtuales headless next.js",
    "desarrollo e-commerce next.js colombia",
    "pasarelas de pago colombia wompi payu bold",
    "migrar woocommerce a next.js",
    "desarrollo tiendas online alto rendimiento",
    "K&T Code WooCommerce Headless",
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

export default function WooCommerceHeadlessPage() {
  return (
    <>
      <ServiceDetailPage service={service} />
      <Footer />
    </>
  )
}
