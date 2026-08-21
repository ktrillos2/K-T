import { Metadata } from "next"
import CityPageView from "@/components/cities/city-page-view"
import { citiesData } from "@/lib/city-data"

const city = citiesData.cucuta

export const metadata: Metadata = {
  title: city.title,
  description: city.metaDescription,
  alternates: {
    canonical: `https://www.kytcode.lat/${city.slug}`,
  },
  openGraph: {
    title: city.title,
    description: city.metaDescription,
    url: `https://www.kytcode.lat/${city.slug}`,
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://www.kytcode.lat/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: city.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: city.title,
    description: city.metaDescription,
    images: ["https://www.kytcode.lat/opengraph-image.png"],
  },
}

export default function CucutaPage() {
  return <CityPageView city={city} />
}
