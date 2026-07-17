import React from "react"
import type { Metadata, Viewport } from "next"
import { Fira_Code, Press_Start_2P, VT323 } from "next/font/google"
import localFont from "next/font/local"
import dynamic from "next/dynamic"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LazyMotion, domAnimation } from "framer-motion"

import "./globals.css"
import JsonLd from "@/components/seo/json-ld"
import CountrySelector from "@/components/layout/country-selector"
import ContentWrapper from "@/components/layout/content-wrapper"
import ClientSideUI from "@/components/layout/client-side-ui"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import GoogleTagManager from "@/components/analytics/google-tag-manager"
import MetaPixel from "@/components/analytics/meta-pixel"
import MicrosoftClarity from "@/components/analytics/microsoft-clarity"
import TiktokPixel from "@/components/analytics/tiktok-pixel"
import TikTokEventsTracker from "@/components/analytics/tiktok-events-tracker"
import { Toaster } from "@/components/ui/sonner"
import { CursorProvider } from "@/context/cursor-context"
import { LanguageProvider } from "@/context/language-context"
import { ModalProvider } from "@/context/modal-context"
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/seo"
import { absoluteUrl, siteConfig } from "@/lib/site-config"

const Header = dynamic(() => import("@/components/layout/header"))

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  display: "swap",
})

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
})

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  display: "swap",
})

const ariW9500 = localFont({
  src: "../public/fonts/ari-w9500-bold.ttf",
  variable: "--font-ari",
  display: "swap",
  preload: true,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
  colorScheme: "dark",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Agencia de Desarrollo Web en Colombia | K&T Code",
    template: "%s | K&T Code",
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
  authors: [{ name: siteConfig.organizationName, url: siteConfig.url }],
  creator: siteConfig.organizationName,
  publisher: siteConfig.organizationName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Agencia de Desarrollo Web en Colombia | K&T Code",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: "K&T Code, agencia de desarrollo web en Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia de Desarrollo Web en Colombia | K&T Code",
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
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
    types: { "application/rss+xml": absoluteUrl("/rss.xml") },
  },
  verification: {
    google: "dqsrEf4u6-TWpy3i2r3S-BJbGb7LV6J7cWob35JSKD4",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="dns-prefetch" href="https://api.exchangerate-api.com" />
        <link rel="dns-prefetch" href="https://ipapi.co" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
      </head>
      <body
        className={`${firaCode.variable} ${vt323.variable} ${pressStart2P.variable} ${ariW9500.variable} font-mono antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WZJSH8FV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <LazyMotion features={domAnimation}>
          <LanguageProvider>
            <CursorProvider>
              <ModalProvider>
                <CountrySelector />
                <ContentWrapper>
                  <Header />
                  {children}
                  <ClientSideUI />
                </ContentWrapper>
              </ModalProvider>
            </CursorProvider>
          </LanguageProvider>
        </LazyMotion>

        <JsonLd data={[buildOrganizationJsonLd(), buildWebsiteJsonLd()]} />

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
