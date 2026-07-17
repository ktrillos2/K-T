import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  const privatePaths = [
    "/api/",
    "/admin/",
    "/login/",
    "/cotizaciones/",
  ]

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: privatePaths,
      },
      {
        // Separado de OAI-SearchBot: bloquea el posible uso para entrenamiento,
        // sin impedir que las páginas públicas aparezcan en ChatGPT Search.
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
