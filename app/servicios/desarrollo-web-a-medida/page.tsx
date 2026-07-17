import type { Metadata } from "next"

import Footer from "@/components/layout/footer"
import ServiceDetailPage from "@/components/sections/service-detail-page"
import { servicePages } from "@/lib/service-pages"
import { absoluteUrl } from "@/lib/site-config"

const service = servicePages["desarrollo-web-a-medida"]

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: absoluteUrl(`/servicios/${service.slug}`),
  },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: absoluteUrl(`/servicios/${service.slug}`),
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
