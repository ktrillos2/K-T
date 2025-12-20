import type React from "react"
import type { Metadata } from "next"
import { Fira_Code, VT323, Press_Start_2P } from "next/font/google"
import localFont from "next/font/local"
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

const ariW9500 = localFont({
  src: "../public/fonts/ari-w9500-bold.ttf",
  variable: "--font-ari",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://kytcode.lat"),
  title: {
    default: "K&T - Desarrollo Web y Gestión de Redes en Colombia",
    template: "%s | K&T Agencia Digital",
  },
  description: "Agencia digital en Colombia. Desarrollo web, e-commerce, landing pages y gestión de redes sociales. Soluciones profesionales para tu negocio.",
  keywords: [
    "agencia digital",
    "agencia digital Colombia",
    "agencia digital Bogotá",
    "desarrollo web",
    "desarrollo web Colombia",
    "páginas web",
    "diseño web",
    "diseño de páginas web",
    "gestión de redes sociales",
    "manejo de redes sociales",
    "community manager",
    "marketing digital",
    "publicidad digital",
    "landing page",
    "landing page Colombia",
    "e-commerce",
    "tienda online",
    "comercio electrónico",
    "desarrollo de software",
    "soluciones web",
    "Next.js",
    "React",
  ],
  authors: [{ name: "K&T Agencia Digital", url: "https://kytcode.lat" }],
  creator: "K&T Agencia Digital",
  publisher: "K&T Agencia Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "K&T - Desarrollo Web y Gestión de Redes en Colombia",
    description: "Agencia digital en Colombia. Desarrollo web, e-commerce, landing pages y gestión de redes sociales.",
    url: "https://kytcode.lat",
    siteName: "K&T Agencia Digital",
    images: [
      {
        url: "https://kytcode.lat/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "K&T Agencia Digital - Desarrollo Web y Redes Sociales",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K&T - Desarrollo Web y Gestión de Redes en Colombia",
    description: "Agencia digital en Colombia. Desarrollo web, e-commerce, landing pages y gestión de redes sociales.",
    creator: "@kytweb",
    images: ["https://kytcode.lat/images/og-image.png"],
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
    canonical: "https://kytcode.lat",
    languages: {
      "es-CO": "https://kytcode.lat",
      "en-US": "https://kytcode.lat",
    },
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "K&T Agencia Digital",
  "image": "https://kytcode.lat/images/logo.png",
  "url": "https://kytcode.lat",
  "telephone": "+573116360057",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CO"
  },
  "priceRange": "$$",
  "description": "Agencia digital en Colombia especializada en desarrollo de páginas web, e-commerce y gestión de redes sociales. Ofrecemos servicios de diseño web, landing pages, tiendas online y marketing digital.",
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
    "https://www.facebook.com/KTSolutionsWeb",
    "https://www.instagram.com/ktweb_/",
    "https://www.tiktok.com/@kytweb"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${firaCode.variable} ${vt323.variable} ${pressStart2P.variable} ${ariW9500.variable} font-mono antialiased`}>
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
