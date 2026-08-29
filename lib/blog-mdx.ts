import { z } from "zod"
import { mdxPostsData, type MdxPost, type SourceItem, type CtaConfig } from "@/lib/blog-mdx-data"
import { blogPosts, type BlogPostItem } from "@/lib/blog-posts"

export type { MdxPost, SourceItem, CtaConfig }

export const SourceItemSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
})

export const CtaSchema = z.object({
  badge: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  label: z.string().min(1),
  href: z.string().min(1),
}).optional()

export const MdxFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  excerpt: z.string().min(1),
  publishedAt: z.string().min(1),
  updatedAt: z.string().optional(),
  author: z.string().default("Keyner Trillos"),
  authorRole: z.string().default("Co-Fundador & Lead Software Engineer"),
  locale: z.string().default("es-CO"),
  draft: z.boolean().default(false),
  category: z.string().default("Ingeniería & IA"),
  primaryKeyword: z.string().optional(),
  secondaryKeywords: z.array(z.string()).default([]),
  searchIntent: z.string().optional(),
  geoTarget: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  canonical: z.string().url().optional(),
  ogImageAlt: z.string().optional(),
  imagePrompt: z.string().optional(),
  sources: z.array(SourceItemSchema).default([]),
  cta: CtaSchema,
})

export type MdxFrontmatter = z.infer<typeof MdxFrontmatterSchema>

/**
 * Unified blog post interface for both MDX and catalog posts
 */
export interface UnifiedBlogPost {
  slug: string
  title: string
  excerpt: string
  description?: string
  category: string
  publishedAt: string
  updatedAt?: string
  modifiedAt?: string
  readTime: string
  draft?: boolean
  isMdx?: boolean
  tags?: string[]
  primaryKeyword?: string
  secondaryKeywords?: string[]
  sources?: SourceItem[]
  cta?: CtaConfig
}

/**
 * Validates slug uniqueness across all 36 catalog items and 12 MDX items
 */
function validateSlugUniqueness() {
  const seenSlugs = new Set<string>()
  for (const catalog of blogPosts) {
    if (seenSlugs.has(catalog.slug)) {
      throw new Error(`Duplicate slug found in catalog: ${catalog.slug}`)
    }
    seenSlugs.add(catalog.slug)
  }
  for (const mdx of mdxPostsData) {
    if (seenSlugs.has(mdx.slug)) {
      throw new Error(`Duplicate slug detected in MDX posts: ${mdx.slug}`)
    }
    seenSlugs.add(mdx.slug)
  }
}

// Run uniqueness check
validateSlugUniqueness()

/**
 * Single source of truth for scheduled publication:
 * A post is published ONLY if draft is not true AND publishedAt <= now
 */
export function isPostPublished(
  post: { draft?: boolean; publishedAt: string },
  now: number = Date.now()
): boolean {
  if (post.draft === true) return false
  const publishTimestamp = new Date(post.publishedAt).getTime()
  if (Number.isNaN(publishTimestamp)) return false
  return publishTimestamp <= now
}

/**
 * Formats date to Colombian Spanish (America/Bogota)
 * Example: "31 de agosto de 2026"
 */
export function formatColombianDate(dateString: string): string {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

/**
 * Get all MDX posts (raw registry)
 */
export function getAllMdxPosts(): MdxPost[] {
  return mdxPostsData
}

/**
 * Get a specific MDX post by slug
 */
export function getMdxPostBySlug(slug: string): MdxPost | undefined {
  return mdxPostsData.find((p) => p.slug === slug)
}

/**
 * Get all published MDX posts at current or given timestamp
 */
export function getPublishedMdxPosts(now: number = Date.now()): MdxPost[] {
  return mdxPostsData.filter((post) => isPostPublished(post, now))
}

/**
 * Combines all catalog blog posts and MDX posts, filtering out unreleased posts,
 * deduplicating by slug, and sorting descending by publishedAt.
 */
export function getAllPublishedBlogPosts(now: number = Date.now()): UnifiedBlogPost[] {
  const unifiedList: UnifiedBlogPost[] = []

  // 1. Add MDX posts that are published
  for (const mdx of mdxPostsData) {
    if (isPostPublished(mdx, now)) {
      unifiedList.push({
        slug: mdx.slug,
        title: mdx.title,
        excerpt: mdx.excerpt,
        description: mdx.description,
        category: mdx.category,
        publishedAt: mdx.publishedAt,
        updatedAt: mdx.updatedAt || mdx.publishedAt,
        modifiedAt: mdx.updatedAt || mdx.publishedAt,
        readTime: mdx.readTime,
        draft: mdx.draft,
        isMdx: true,
        tags: mdx.tags,
        primaryKeyword: mdx.primaryKeyword,
        secondaryKeywords: mdx.secondaryKeywords,
        sources: mdx.sources,
        cta: mdx.cta,
      })
    }
  }

  // 2. Add existing static catalog posts (only if published)
  for (const post of blogPosts) {
    if (isPostPublished(post, now)) {
      unifiedList.push({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        publishedAt: post.publishedAt,
        updatedAt: post.modifiedAt || post.publishedAt,
        modifiedAt: post.modifiedAt || post.publishedAt,
        readTime: post.readTime,
        isMdx: false,
      })
    }
  }

  // Sort descending by date (most recent first)
  return unifiedList.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/**
 * Smart contextual CTA provider for each blog post based on topic, service links, and frontmatter.
 */
export function getContextualCta(post: {
  slug: string
  category?: string
  tags?: string[]
  cta?: CtaConfig
}): CtaConfig {
  if (post.cta) {
    return post.cta
  }

  const slug = post.slug.toLowerCase()

  // 1. Agentic commerce / E-commerce
  if (slug.includes("commerce") || slug.includes("tienda") || slug.includes("ecommerce")) {
    return {
      badge: "E-commerce Headless & WooCommerce",
      title: "¿Quieres preparar tu tienda online para clientes y agentes de IA?",
      description:
        "Desarrollamos tiendas WooCommerce Headless ultrarrápidas sobre Next.js con inventario conectado y pasarelas de pago colombianas.",
      label: "Cotizar E-commerce Headless",
      href: "/servicios/woocommerce-headless",
    }
  }

  // 2. AI Agents / Automation / WhatsApp / ERP / ROI
  if (
    slug.includes("agente") ||
    slug.includes("whatsapp") ||
    slug.includes("automatizar") ||
    slug.includes("erp") ||
    slug.includes("roi") ||
    slug.includes("chatbot")
  ) {
    return {
      badge: "Software a Medida & Automatización IA",
      title: "¿Quieres automatizar procesos en tu empresa con software e IA?",
      description:
        "Diseñamos paneles administrativos, CRMs, APIs oficiales de WhatsApp y agentes inteligentes conectados de forma segura a tus sistemas.",
      label: "Cotizar Software a Medida",
      href: "/servicios/software-a-medida",
    }
  }

  // 3. SEO / GEO / Search / AI Mode / llms.txt
  if (
    slug.includes("seo") ||
    slug.includes("google") ||
    slug.includes("chatgpt") ||
    slug.includes("visibilidad") ||
    slug.includes("llms")
  ) {
    return {
      badge: "SEO Técnico & Arquitectura Web",
      title: "¿Buscas que tu empresa posicione en Google y motores de IA?",
      description:
        "Diseñamos plataformas web en Next.js con renderizado SSR/SSG, datos estructurados Schema completos y optimización para ChatGPT Search y Google AI Overviews.",
      label: "Cotizar Desarrollo Web y SEO",
      href: "/servicios/desarrollo-web-a-medida",
    }
  }

  // Default fallback
  return {
    badge: "Ingeniería de Software en K&T Code",
    title: "¿Buscas una solución digital de alto rendimiento para tu negocio?",
    description:
      "Construimos páginas web corporativas, tiendas virtuales y software a medida en Next.js sin plantillas genéricas.",
    label: "Iniciar Proyecto con K&T Code",
    href: "/servicios/software-a-medida",
  }
}

/**
 * Find related published posts for a given post using weighted ranking score:
 * score = sameCategory * 4 + commonTags * 2 + commonSecondaryKeywords * 1
 */
export function getRelatedBlogPosts(
  currentSlug: string,
  category?: string,
  tags: string[] = [],
  secondaryKeywords: string[] = [],
  limit: number = 3,
  now: number = Date.now()
): UnifiedBlogPost[] {
  const allPublished = getAllPublishedBlogPosts(now).filter((p) => p.slug !== currentSlug)

  if (allPublished.length === 0) return []

  const currentTagsLower = tags.map((t) => t.toLowerCase())
  const currentKeywordsLower = secondaryKeywords.map((k) => k.toLowerCase())

  const scored = allPublished.map((post) => {
    let score = 0

    // 1. Same category weight = 4
    if (category && post.category === category) {
      score += 4
    }

    // 2. Common tags weight = 2 each
    if (post.tags && post.tags.length > 0) {
      const commonTags = post.tags.filter((t) => currentTagsLower.includes(t.toLowerCase()))
      score += commonTags.length * 2
    }

    // 3. Common secondary keywords weight = 1 each
    if (post.secondaryKeywords && post.secondaryKeywords.length > 0) {
      const commonKeywords = post.secondaryKeywords.filter((k) =>
        currentKeywordsLower.includes(k.toLowerCase())
      )
      score += commonKeywords.length * 1
    }

    return { post, score }
  })

  // Sort by ranking score descending, then by publication date descending
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime()
  })

  return scored.slice(0, limit).map((s) => s.post)
}
