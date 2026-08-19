import type { Metadata } from "next"
import Footer from "@/components/layout/footer"
import PricingHero from "@/components/sections/precios/pricing-hero"
import PricingCards from "@/components/sections/precios/pricing-cards"
import AdditionalServices from "@/components/sections/precios/additional-services"
import HowWeWork from "@/components/sections/precios/how-we-work"
import ComparisonTable from "@/components/sections/precios/comparison-table"
import PricingFAQ from "@/components/sections/precios/pricing-faq"
import PricingCTA from "@/components/sections/precios/pricing-cta"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Web Development Pricing & Custom Software Plans | K&T Code",
  description:
    "Transparent pricing for landing pages, corporate websites, headless e-commerce, and custom software. High performance guaranteed with Next.js.",
  keywords: [
    "web development pricing",
    "how much does a website cost",
    "ecommerce development pricing",
    "next.js development cost",
    "custom software development plans",
    "K&T Code pricing",
  ],
  alternates: {
    canonical: absoluteUrl("/en/pricing"),
    languages: {
      "en-US": absoluteUrl("/en/pricing"),
      en: absoluteUrl("/en/pricing"),
      es: absoluteUrl("/precios"),
      "x-default": absoluteUrl("/precios"),
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
    title: "Web Development Pricing & Custom Software Plans | K&T Code",
    description:
      "Explore transparent pricing plans for landing pages, corporate websites, headless e-commerce, and custom software.",
    url: absoluteUrl("/en/pricing"),
    siteName: "K&T Code",
    locale: "en_US",
    type: "website",
  },
}

export default function EnglishPricingPage() {
  return (
    <>
      <main className="min-h-screen bg-black pt-32 pb-16 text-white selection:bg-white selection:text-black">
        <PricingHero />
        <PricingCards />
        <ComparisonTable />
        <AdditionalServices />
        <HowWeWork />
        <PricingFAQ />
        <PricingCTA />
      </main>

      <Footer />
    </>
  )
}
