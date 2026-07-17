import type { Metadata } from "next"

import { BlogClient } from "./blog-client"
import JsonLd from "@/components/seo/json-ld"
import { blogPosts } from "@/lib/blog-posts"
import { buildBreadcrumbJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Blog de desarrollo web, SEO y rendimiento",
  description:
    "Guías prácticas sobre creación de páginas web, SEO técnico, Core Web Vitals, arquitectura y decisiones digitales para empresas.",
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: {
    title: "Blog de desarrollo web y SEO | K&T Code",
    description:
      "Recursos para planificar, construir, medir y mejorar páginas web profesionales.",
    type: "website",
    url: absoluteUrl("/blog"),
  },
}

export default function BlogIndex() {
  const posts = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: new Intl.DateTimeFormat("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(post.publishedAt)),
    readTime: post.readTime,
  }))

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${absoluteUrl("/blog")}#blog`,
            url: absoluteUrl("/blog"),
            name: "Blog de K&T Code",
            description: "Artículos sobre desarrollo web, SEO técnico, rendimiento y estrategia digital.",
            blogPost: blogPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: absoluteUrl(`/blog/${post.slug}`),
              datePublished: post.publishedAt,
              dateModified: post.modifiedAt,
            })),
          },
        ]}
      />
      <BlogClient posts={posts} />
    </>
  )
}
