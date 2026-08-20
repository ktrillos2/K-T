import { Metadata } from "next"
import { blogPosts } from "@/lib/blog-posts"
import { BlogClient } from "./blog-client"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Blog Técnico & Comparativas de Desarrollo Web",
  description:
    "Comparativas técnicas objetivas (Next.js vs WordPress, Shopify vs WooCommerce, React vs Next.js), guías de precios reales en Colombia y arquitectura web de alto rendimiento.",
  keywords: [
    "blog desarrollo web colombia",
    "comparativas desarrollo web",
    "nextjs vs wordpress",
    "shopify vs woocommerce colombia",
    "precios paginas web colombia",
    "arquitectura next.js",
    "seo tecnico colombia",
  ],
  alternates: {
    canonical: absoluteUrl("/blog"),
    languages: {
      "es-CO": absoluteUrl("/blog"),
      es: absoluteUrl("/blog"),
      "x-default": absoluteUrl("/blog"),
    },
  },
  openGraph: {
    title: "Blog Técnico & Comparativas de Desarrollo Web | K&T Code",
    description:
      "Artículos técnicos, comparativas de plataformas y guías de costos reales para proyectos web en Colombia y Latinoamérica.",
    type: "website",
    url: absoluteUrl("/blog"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

export default function BlogIndex() {
  const formattedPosts = blogPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.publishedAt,
    readTime: p.readTime,
  }))

  return <BlogClient posts={formattedPosts} />
}
