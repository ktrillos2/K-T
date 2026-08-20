import type { Metadata } from "next"
import Footer from "@/components/layout/footer"
import ContactSection from "@/components/sections/contact-section"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Contact Us & Project Quotation",
  description:
    "Request a technical quote or schedule a consultation for your next corporate website, e-commerce, or custom software project with K&T Code.",
  keywords: [
    "contact web development agency",
    "request web quote",
    "hire next.js developers",
    "custom software development quote",
    "K&T Code contact",
  ],
  alternates: {
    canonical: absoluteUrl("/en/contact"),
    languages: {
      "en-US": absoluteUrl("/en/contact"),
      en: absoluteUrl("/en/contact"),
      es: absoluteUrl("/#contact"),
      "x-default": absoluteUrl("/#contact"),
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
    title: "Contact Us & Project Quotation | K&T Code",
    description:
      "Request a technical quote or schedule a consultation with our software engineering team.",
    url: absoluteUrl("/en/contact"),
    siteName: "K&T Code",
    locale: "en_US",
    type: "website",
  },
}

export default function EnglishContactPage() {
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
                Contact
              </li>
            </ol>
          </nav>
        </div>

        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
