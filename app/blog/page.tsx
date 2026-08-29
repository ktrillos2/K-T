import { Metadata } from "next"
import { getAllPublishedBlogPosts } from "@/lib/blog-mdx"
import { BlogClient } from "./blog-client"
import { absoluteUrl } from "@/lib/site-config"

// Revalidate every 60 seconds (ISR) so scheduled articles publish automatically without manual deploy
export const revalidate = 60

export const metadata: Metadata = {
  title: "Blog Técnico & Comparativas de Desarrollo Web",
  description:
    "Comparativas técnicas objetivas (Next.js vs WordPress, Shopify vs WooCommerce, React vs Next.js), guías de precios reales en Colombia, agentes de IA y arquitectura web de alto rendimiento.",
  keywords: [
    "blog desarrollo web colombia",
    "comparativas desarrollo web",
    "agentes de ia colombia",
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
      "Artículos técnicos, comparativas de plataformas, agentes de IA y guías de costos reales para proyectos web en Colombia y Latinoamérica.",
    type: "website",
    url: absoluteUrl("/blog"),
    siteName: "K&T Code",
    locale: "es_CO",
  },
}

export default function BlogIndex() {
  const publishedPosts = getAllPublishedBlogPosts()

  const formattedPosts = publishedPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.publishedAt.split("T")[0] || p.publishedAt,
    readTime: p.readTime,
  }))

  return <BlogClient posts={formattedPosts} />
}
