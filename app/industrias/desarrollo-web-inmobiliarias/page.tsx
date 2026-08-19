import type { Metadata } from "next"

import Footer from "@/components/layout/footer"
import IndustryDetailPage from "@/components/sections/industry-detail-page"
import { industryPages } from "@/lib/industry-pages"
import { absoluteUrl } from "@/lib/site-config"

const industry = industryPages["desarrollo-web-inmobiliarias"]

export const metadata: Metadata = {
  title: industry.metaTitle,
  description: industry.metaDescription,
  keywords: [
    "desarrollo web inmobiliarias colombia",
    "paginas web para inmobiliarias bogota medellin",
    "software inmobiliario portales web",
    "crear portal inmobiliario next.js",
    "K&T Code inmobiliarias",
  ],
  alternates: {
    canonical: absoluteUrl(`/industrias/${industry.slug}`),
    languages: {
      "es-CO": absoluteUrl(`/industrias/${industry.slug}`),
      "es": absoluteUrl(`/industrias/${industry.slug}`),
      "x-default": absoluteUrl(`/industrias/${industry.slug}`),
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
    title: industry.metaTitle,
    description: industry.metaDescription,
    url: absoluteUrl(`/industrias/${industry.slug}`),
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
  },
}

export default function InmobiliariasPage() {
  return (
    <>
      <IndustryDetailPage industry={industry} />
      <Footer />
    </>
  )
}
