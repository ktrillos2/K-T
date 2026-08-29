import React from "react"
import type { Metadata } from "next"
import { Inter, Fira_Code, VT323, Press_Start_2P } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LazyMotion, domAnimation } from "framer-motion"
import "./globals.css"
import { LanguageProvider } from "@/context/language-context"
import { CursorProvider } from "@/context/cursor-context"
import dynamic from "next/dynamic"
import CountrySelector from "@/components/layout/country-selector"
import ContentWrapper from "@/components/layout/content-wrapper"
import { Toaster } from "@/components/ui/sonner"

const Header = dynamic(() => import("@/components/layout/header"))
import ClientSideUI from "@/components/layout/client-side-ui"
import { ModalProvider } from "@/context/modal-context"




import GoogleAnalytics from "@/components/analytics/google-analytics"
import TiktokPixel from "@/components/analytics/tiktok-pixel"
import MicrosoftClarity from "@/components/analytics/microsoft-clarity"
import GoogleTagManager from "@/components/analytics/google-tag-manager"
import TikTokEventsTracker from "@/components/analytics/tiktok-events-tracker"
import MetaPixel from "@/components/analytics/meta-pixel"
import AnalyticsTracker from "@/components/analytics-tracker"


const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira", display: "swap" })
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323", display: "swap" })
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start-2p", display: "swap" })

const ariW9500 = localFont({
  src: "../public/fonts/ari-w9500-bold.ttf",
  variable: "--font-ari",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kytcode.lat"),
  title: {
    default: "K&T Code | Agencia de Desarrollo Web y E-commerce en Colombia",
    template: "%s | K&T Code",
  },
  description: "K&T Code desarrolla páginas web corporativas a medida, tiendas virtuales headless, software empresarial y arquitecturas digitales escalables de alto rendimiento en Next.js para Colombia y Latinoamérica.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "K&T Code",
  },
  authors: [{ name: "K&T Code", url: "https://www.kytcode.lat" }],
  creator: "K&T Code",
  publisher: "K&T Code",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "K&T Code | Empresa de Desarrollo Web y Software en Colombia",
    description: "Desarrollamos ecosistemas digitales escalables, tiendas virtuales y páginas web de alto rendimiento impulsadas por Next.js y Vercel.",
    url: "https://www.kytcode.lat",
    siteName: "K&T Code",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://www.kytcode.lat/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "K&T Code | Empresa de Desarrollo Web y Software en Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "K&T Code | Agencia de Desarrollo Web y E-commerce",
    description: "Desarrollamos páginas web corporativas y aplicaciones escalables optimizadas para SEO Técnico. Tu infraestructura web de alto rendimiento.",
    creator: "@kytcode",
    images: ["https://www.kytcode.lat/opengraph-image.png"],
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
      "es": "https://www.kytcode.lat",
      "x-default": "https://www.kytcode.lat",
    },
  },
  verification: {
    google: "dqsrEf4u6-TWpy3i2r3S-BJbGb7LV6J7cWob35JSKD4",
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.kytcode.lat/#website",
  "name": "K&T Code",
  "alternateName": ["kytcode", "KYT Code"],
  "url": "https://www.kytcode.lat/",
  "publisher": {
    "@id": "https://www.kytcode.lat/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.kytcode.lat/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": "https://www.kytcode.lat/#organization",
  "name": "K&T Code",
  "alternateName": ["kytcode", "KYT Code", "K&T Code Colombia"],
  "url": "https://www.kytcode.lat/",
  "logo": "https://www.kytcode.lat/icon.png",
  "image": "https://www.kytcode.lat/opengraph-image.png",
  "email": "contacto@kytcode.lat",
  "telephone": "+573116360057",
  "priceRange": "$450.000 COP - $15.000.000+ COP",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "San José de Cúcuta",
    "addressLocality": "Cúcuta",
    "addressRegion": "Norte de Santander",
    "postalCode": "540001",
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 7.8939,
    "longitude": -72.5078
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "19:00"
    }
  ],
  "areaServed": [
    {
      "@type": "Country",
      "name": "Colombia"
    },
    {
      "@type": "City",
      "name": "Bogotá"
    },
    {
      "@type": "City",
      "name": "Medellín"
    },
    {
      "@type": "City",
      "name": "Cali"
    },
    {
      "@type": "City",
      "name": "Barranquilla"
    },
    {
      "@type": "City",
      "name": "Cúcuta"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Latin America"
    }
  ],
  "description": "K&T Code es una empresa colombiana de desarrollo web y software a medida especializada en páginas corporativas, e-commerce headless y plataformas escalables en Next.js.",
  "slogan": "Ingeniería de Desarrollo Web y Software a Medida en Colombia",
  "sameAs": [
    "https://www.instagram.com/ktweb_/",
    "https://www.facebook.com/KTSolutionsWeb",
    "https://www.tiktok.com/@kytweb"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Desarrollo y Software",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Landing Page de Conversión",
        "price": "450000",
        "priceCurrency": "COP",
        "itemOffered": {
          "@type": "Service",
          "name": "Landing Page de Conversión",
          "description": "Diseño y desarrollo de páginas de aterrizaje de alta conversión en Next.js y React 19."
        }
      },
      {
        "@type": "Offer",
        "name": "Sitio Web Corporativo",
        "price": "2500000",
        "priceCurrency": "COP",
        "itemOffered": {
          "@type": "Service",
          "name": "Sitio Web Corporativo",
          "description": "Desarrollo de portales web corporativos multi-página con CMS autogestionable y SEO semántico."
        }
      },
      {
        "@type": "Offer",
        "name": "Tienda Virtual Headless",
        "price": "1300000",
        "priceCurrency": "COP",
        "itemOffered": {
          "@type": "Service",
          "name": "Tienda Virtual Headless",
          "description": "E-commerce headless de alto rendimiento con pasarelas de pago colombianas (Wompi, Bold, PayU, PSE)."
        }
      },
      {
        "@type": "Offer",
        "name": "Software a Medida",
        "itemOffered": {
          "@type": "Service",
          "name": "Software a Medida & SaaS",
          "description": "Desarrollo de aplicaciones web personalizadas, CRMs internos, dashboards y arquitecturas serverless."
        }
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <link rel="dns-prefetch" href="https://api.exchangerate-api.com" />
      <link rel="dns-prefetch" href="https://ipapi.co" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <body className={`${inter.variable} ${firaCode.variable} ${vt323.variable} ${pressStart2P.variable} ${ariW9500.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WZJSH8FV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LazyMotion features={domAnimation}>
          <LanguageProvider>
            <CursorProvider>
              <ModalProvider>
                <CountrySelector />
                <ContentWrapper>
                  <Header />
                  <main>{children}</main>
                  <ClientSideUI />
                </ContentWrapper>
              </ModalProvider>
            </CursorProvider>
          </LanguageProvider>
        </LazyMotion>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Analytics />
        <SpeedInsights />

        <GoogleAnalytics />
        <React.Suspense fallback={null}>
          <AnalyticsTracker />
          <TiktokPixel />
          <MetaPixel />
        </React.Suspense>
        <TikTokEventsTracker />
        <MicrosoftClarity />

        <GoogleTagManager />
        <Toaster />
      </body>
    </html>
  )
}
