import React from "react"
import type { Metadata } from "next"
import { Fira_Code, VT323, Press_Start_2P } from "next/font/google"
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
  description: "En K&T desarrollamos páginas web a medida, tiendas virtuales, software corporativo y ecosistemas digitales escalables de alto rendimiento para Colombia y Latinoamérica.",
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
  keywords: [
    "agencia de desarrollo web",
    "desarrollo web en colombia",
    "desarrollo web profesional",
    "diseño de paginas web bogota",
    "desarrollo web medellin",
    "creacion de tiendas virtuales",
    "desarrollo e-commerce headless",
    "software a medida para empresas",
    "agencia react en colombia",
    "next.js colombia",
    "ecosistemas digitales",
    "diseño web colombia",
    "K&T Code",
  ],
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
  },
  twitter: {
    card: "summary_large_image",
    title: "K&T Code | Agencia de Desarrollo Web y E-commerce",
    description: "Desarrollamos páginas web corporativas y aplicaciones escalables optimizadas para SEO Técnico. Tu infraestructura web de alto rendimiento.",
    creator: "@kytcode",
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
  "@type": "Organization",
  "@id": "https://www.kytcode.lat/#organization",
  "name": "K&T Code",
  "alternateName": ["kytcode", "KYT Code"],
  "url": "https://www.kytcode.lat/",
  "logo": "https://www.kytcode.lat/icon.png",
  "image": "https://www.kytcode.lat/icon.png",
  "email": "contactoktweb@gmail.com",
  "telephone": "+573116360057",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "San José de Cúcuta",
    "addressLocality": "Cúcuta",
    "addressRegion": "Norte de Santander",
    "postalCode": "540001",
    "addressCountry": "CO"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Colombia"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Latin America"
    }
  ],
  "description": "K&T Code es una empresa colombiana de desarrollo web y software a medida especializada en páginas corporativas, e-commerce y plataformas escalables.",
  "slogan": "Empresa de Desarrollo Web y Software en Colombia",
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
        "itemOffered": {
          "@type": "Service",
          "name": "Desarrollo de Páginas Web",
          "description": "Diseño y desarrollo de páginas web a medida, optimizadas para velocidad y SEO técnico."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Desarrollo de Tiendas Virtuales",
          "description": "E-commerce headless de alto rendimiento y pasarelas de pago integradas."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Software a Medida",
          "description": "Desarrollo de aplicaciones web personalizadas, dashboards y arquitecturas serverless."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mantenimiento y SEO Técnico",
          "description": "Optimización continua de Core Web Vitals y posicionamiento web orgánico."
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
      <body className={`${firaCode.variable} ${vt323.variable} ${pressStart2P.variable} ${ariW9500.variable} font-mono antialiased`}>
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
