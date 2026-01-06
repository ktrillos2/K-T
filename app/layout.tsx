import type React from "react"
import type { Metadata } from "next"
import { Fira_Code, VT323, Press_Start_2P } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { LanguageProvider } from "@/context/language-context"
import { CursorProvider } from "@/context/cursor-context"
import Header from "@/components/layout/header"
import CustomCursor from "@/components/ui/custom-cursor"
import WhatsAppButton from "@/components/ui/whatsapp-button"
import CountrySelector from "@/components/layout/country-selector"
import ContentWrapper from "@/components/layout/content-wrapper"


import GoogleAnalytics from "@/components/analytics/google-analytics"

const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira" })
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323" })
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start-2p" })

const ariW9500 = localFont({
  src: "../public/fonts/ari-w9500-bold.ttf",
  variable: "--font-ari",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kytcode.lat"),
  title: {
    default: "K&T - Desarrollo Web y Gestión de Redes en Colombia",
    template: "%s | K&T Agencia Digital",
  },
  description: "Desarrollo web, e-commerce, landing pages y gestión de redes sociales. Soluciones profesionales para tu negocio en Colombia. Transformamos ideas en código.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "K&T CRM",
  },
  // 3. KEYWORDS: Definitive Strategy (Headless + Modernization + Authority)
  keywords: [
    "Headless WooCommerce",
    "Next.js para WooCommerce",
    "Modernización E-commerce",
    "WooCommerce de Alto Rendimiento",
    "Desarrollo Software a Medida",
    "Agencia React",
    "Expertos en Woo",
    "Optimización Web WPO",
    "K&T",
  ],
  authors: [{ name: "K&T Agencia Digital", url: "https://www.kytcode.lat" }],
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
    url: "https://www.kytcode.lat",
    siteName: "K&T Agencia Digital",
    images: [
      {
        url: "https://www.kytcode.lat/images/og-image.png",
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
    images: ["https://www.kytcode.lat/images/og-image.png"],
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
    canonical: "https://www.kytcode.lat",
    languages: {
      "es-CO": "https://www.kytcode.lat",
      "en-US": "https://www.kytcode.lat",
    },
  },
  verification: {
    google: "dqsrEf4u6-TWpy3i2r3S-BJbGb7LV6J7cWob35JSKD4",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.kytcode.lat/#organization",
  "name": "K&T Agencia Digital",
  "alternateName": "K&T Agency",
  "image": "https://www.kytcode.lat/images/logo.png",
  "logo": "https://www.kytcode.lat/images/logo.png",
  "url": "https://www.kytcode.lat",
  "telephone": "+573116360057",
  "email": "contactoktweb@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CO",
    "addressRegion": "Cundinamarca",
    "addressLocality": "Bogotá"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Colombia"
    },
    {
      "@type": "City",
      "name": "Bogotá"
    }
  ],
  "priceRange": "$$",
  "description": "Agencia digital en Colombia especializada en desarrollo de páginas web, e-commerce y gestión de redes sociales. Ofrecemos servicios de diseño web, landing pages, tiendas online y marketing digital.",
  "slogan": "Transformamos tu visión en realidad digital",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios Digitales",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Desarrollo Web",
          "description": "Desarrollo de páginas web profesionales, e-commerce y aplicaciones web personalizadas"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Gestión de Redes Sociales",
          "description": "Community management, creación de contenido y estrategias de marketing digital"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Landing Pages",
          "description": "Diseño y desarrollo de landing pages optimizadas para conversión"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "E-commerce",
          "description": "Tiendas online completas con pasarelas de pago y gestión de inventario"
        }
      }
    ]
  },
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
      <link rel="dns-prefetch" href="https://api.exchangerate-api.com" />
      <link rel="preconnect" href="https://api.exchangerate-api.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://ipapi.co" />
      <link rel="preconnect" href="https://ipapi.co" crossOrigin="" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
      <body className={`${firaCode.variable} ${vt323.variable} ${pressStart2P.variable} ${ariW9500.variable} font-mono antialiased`}>
        <LanguageProvider>
          <CursorProvider>
            <CountrySelector />
            <CustomCursor />
            <ContentWrapper>
              <Header />
              <main>{children}</main>
              <WhatsAppButton />
            </ContentWrapper>
          </CursorProvider>
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <SpeedInsights />

        <GoogleAnalytics />
      </body>
    </html>
  )
}
