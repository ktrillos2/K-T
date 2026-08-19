import type { Metadata } from "next"
import Footer from "@/components/layout/footer"
import ServicesSection from "@/components/sections/services-section"
import Link from "next/link"
import { ChevronRight, ArrowRight } from "lucide-react"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Web Development & Custom Software Services | K&T Code",
  description:
    "Explore our full suite of web engineering services: custom corporate websites, headless e-commerce, custom web apps, and technical SEO optimization.",
  keywords: [
    "web development services",
    "custom software development",
    "next.js agency services",
    "headless ecommerce development",
    "technical seo services",
    "K&T Code services",
  ],
  alternates: {
    canonical: absoluteUrl("/en/services"),
    languages: {
      "en-US": absoluteUrl("/en/services"),
      en: absoluteUrl("/en/services"),
      es: absoluteUrl("/servicios"),
      "x-default": absoluteUrl("/servicios"),
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
    title: "Web Development & Custom Software Services | K&T Code",
    description:
      "Engineered with Next.js, React 19, and TypeScript for high conversion and blazing fast speeds.",
    url: absoluteUrl("/en/services"),
    siteName: "K&T Code",
    locale: "en_US",
    type: "website",
  },
}

export default function EnglishServicesPage() {
  return (
    <>
      <main className="min-h-screen bg-black pt-32 pb-16 text-white selection:bg-white selection:text-black">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-neutral-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/en" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              </li>
              <li className="text-white font-bold" aria-current="page">
                Services
              </li>
            </ol>
          </nav>

          <header className="text-center max-w-4xl mx-auto mb-12">
            <p className="text-white/60 font-mono text-sm uppercase tracking-widest mb-3">// Digital Solutions</p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-4">
              Web Development & Custom Software Services
            </h1>
            <p className="text-neutral-400 font-mono text-sm md:text-base max-w-2xl mx-auto">
              High-performance corporate websites, headless e-commerce, and custom software engineered with Next.js, React 19, and TypeScript.
            </p>
          </header>
        </div>

        <ServicesSection showHeader={false} />

        {/* Global CTA */}
        <div className="max-w-4xl mx-auto px-6 mt-16 text-center">
          <div className="p-8 md:p-12 rounded-3xl border border-white/15 bg-white/[0.02]">
            <h2 className="text-3xl font-bold font-title text-white mb-4">
              Need a Custom Architecture or Enterprise Solution?
            </h2>
            <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto mb-8">
              We design custom platforms, API integrations, and headless backends tailored to your exact technical specifications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/en/pricing"
                className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-mono font-bold text-sm rounded-xl hover:bg-neutral-200 transition-colors inline-flex items-center justify-center gap-2"
              >
                View Plans & Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/en/contact"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 text-white border border-white/20 font-mono font-bold text-sm rounded-xl hover:bg-white/20 transition-colors inline-flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
