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
    default: "K&T | Agencias de Desarrollo Web Profesional y E-commerce",
    template: "%s | K&T Agencia Digital",
  },
  description: "En K&T desarrollamos ecosistemas digitales escalables, e-commerce headless y páginas web de máximo rendimiento para potenciar tu marca, impulsados por Vercel.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "K&T CRM",
  },
  // 3. KEYWORDS: Definitive Strategy (Headless + Modernization + Authority + Genesis of creating sites)
  keywords: [
    "agencia de desarrollo web",
    "desarrollo web profesional",
    "desarrollo e-commerce headless",
    "agencia react en colombia",
    "ecosistemas digitales",
    "diseño web colombia",
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
    title: "K&T | Agencia de Desarrollo Web y E-commerce",
    description: "Desarrollamos ecosistemas digitales escalables y de máximo rendimiento. Arquitecturas modernas y e-commerce headless para potenciar tu negocio online.",
    url: "https://www.kytcode.lat",


    siteName: "K&T Agencia Digital",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K&T | Agencia de Desarrollo Web y E-commerce",
    description: "Desarrollamos páginas web corporativas y aplicaciones escalables optimizadas para SEO Técnico. Tu infraestructura web de alto rendimiento.",

    creator: "@kytweb",
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

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "K&T Agencia Digital",
    "alternateName": "K&T Agency",
    "url": "https://www.kytcode.lat/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.kytcode.lat/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  {
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
  "description": "Agencia de desarrollo web élite en Colombia especializada en páginas web de alto rendimiento, e-commerce headless (Next.js) y arquitecturas digitales escalables.",
  "slogan": "Desarrollo Web Elite | Creamos Experiencias Digitales",
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
]

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <SpeedInsights />

        <GoogleAnalytics />
        <React.Suspense fallback={null}>
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
