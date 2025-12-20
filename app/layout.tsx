import type React from "react"
import type { Metadata } from "next"
import { Fira_Code } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/context/language-context"
import { CursorProvider } from "@/context/cursor-context"
import Header from "@/components/layout/header"
import CustomCursor from "@/components/ui/custom-cursor"
import WhatsAppButton from "@/components/ui/whatsapp-button"

const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira" })

export const metadata: Metadata = {
  title: "K&T Digital Agency | We Code Your Vision",
  description:
    "K&T is a digital agency specializing in landing pages, e-commerce, and custom web solutions. Codificamos tu visión digital.",
  generator: "v0.app",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${firaCode.className} font-mono antialiased`}>
        <LanguageProvider>
          <CursorProvider>
            <CustomCursor />
            <Header />
            <main>{children}</main>
            <WhatsAppButton />
          </CursorProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
