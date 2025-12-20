import type React from "react"
import type { Metadata } from "next"
import { Fira_Code, VT323, Press_Start_2P } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/context/language-context"
import { CursorProvider } from "@/context/cursor-context"
import Header from "@/components/layout/header"
import CustomCursor from "@/components/ui/custom-cursor"
import WhatsAppButton from "@/components/ui/whatsapp-button"
import ClarityAnalytics from "@/components/analytics/clarity-analytics"

const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira" })
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323" })
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start-2p" })

export const metadata: Metadata = {
  metadataBase: new URL("https://kandtagency.com"), // Replace with your actual domain
  title: {
    default: "K&T Digital Agency | We Code Your Vision",
    template: "%s | K&T Digital Agency",
  },
  description: "K&T is a premium digital agency in Colombia specializing in high-performance landing pages, e-commerce, and custom software solutions. We transform ideas into digital reality.",
  keywords: [
    "Digital Agency",
    "Web Development",
    "Software Development",
    "Colombia",
    "Bogota",
    "Next.js",
    "React",
    "E-commerce",
    "Landing Page",
    "Custom Software",
    "Agencia Digital",
    "Desarrollo Web",
    "Diseño Web",
  ],
  authors: [{ name: "K&T Digital Agency", url: "https://kandtagency.com" }],
  creator: "K&T Digital Agency",
  publisher: "K&T Digital Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "K&T Digital Agency | We Code Your Vision",
    description: "Premium digital agency in Colombia. We build high-performance, beautiful websites and software.",
    url: "https://kandtagency.com",
    siteName: "K&T Digital Agency",
    images: [
      {
        url: "/images/og-image.png", // Ensure you create/upload this
        width: 1200,
        height: 630,
        alt: "K&T Digital Agency Preview",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K&T Digital Agency",
    description: "We code your vision. Premium digital agency specializing in modern web development.",
    creator: "@kandtagency",
    images: ["/images/og-image.png"],
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
  category: "technology",
  alternates: {
    canonical: "https://kandtagency.com",
    languages: {
      "es-CO": "https://kandtagency.com",
      "en-US": "https://kandtagency.com",
    },
  },
  verification: {
    google: "google-site-verification-placeholder", // Add your verification code
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "K&T Digital Agency",
  "image": "https://kandtagency.com/images/logo.png",
  "url": "https://kandtagency.com",
  "telephone": "+573116360057",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CO"
  },
  "priceRange": "$$$",
  "description": "K&T is a digital agency specializing in landing pages, e-commerce, and custom web solutions.",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://facebook.com/kandtagency",
    "https://instagram.com/kandtagency",
    "https://linkedin.com/company/kandtagency"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${firaCode.variable} ${vt323.variable} ${pressStart2P.variable} font-mono antialiased`}>
        <LanguageProvider>
          <CursorProvider>
            <CustomCursor />
            <Header />
            <main>{children}</main>
            <WhatsAppButton />
          </CursorProvider>
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <ClarityAnalytics />
      </body>
    </html>
  )
}
