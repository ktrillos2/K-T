import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CalendarDays, Clock, ExternalLink, Sparkles } from "lucide-react"

import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import RelatedPosts from "@/components/blog/related-posts"
import { MdxContent } from "@/components/blog/mdx-content"
import {
  formatColombianDate,
  getAllPublishedBlogPosts,
  getContextualCta,
  getMdxPostBySlug,
  isPostPublished,
} from "@/lib/blog-mdx"
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo"
import { absoluteUrl, siteConfig } from "@/lib/site-config"

// Revalidate every 60 seconds (ISR fallback behind Vercel Cron)
export const revalidate = 60

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const published = getAllPublishedBlogPosts()
  return published.filter((p) => p.isMdx).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getMdxPostBySlug(slug)

  // Unreleased future articles or drafts respond with 404
  if (!post || !isPostPublished(post)) {
    notFound()
  }

  const canonicalUrl = post.canonical || absoluteUrl(`/blog/${post.slug}`)
  const description = post.description || post.excerpt
  const publishedIso = new Date(post.publishedAt).toISOString()
  const modifiedIso = new Date(post.updatedAt || post.publishedAt).toISOString()

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "es-CO": canonicalUrl,
        es: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "K&T Code",
      locale: post.locale || "es_CO",
      publishedTime: publishedIso,
      modifiedTime: modifiedIso,
      authors: [post.author],
      images: [
        {
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
          alt: post.ogImageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getMdxPostBySlug(slug)

  // Strict check: unreleased future posts and drafts return 404
  if (!post || !isPostPublished(post)) {
    notFound()
  }

  const formattedDate = formatColombianDate(post.publishedAt)
  const canonicalUrl = post.canonical || absoluteUrl(`/blog/${post.slug}`)
  const cta = getContextualCta(post)

  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: post.title,
            description: post.description || post.excerpt,
            path: `/blog/${post.slug}`,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            authorName: post.author,
            authorSlug: "keyner-trillos",
            authorRole: post.authorRole,
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <main className="min-h-screen bg-black pt-32 pb-24 px-4 sm:px-6 text-white relative overflow-hidden">
        {/* Background Grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:54px_54px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-emerald-500/[0.04] blur-[140px]" />

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white font-mono text-sm mb-10 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Blog
          </Link>

          <article className="prose prose-invert prose-lg max-w-none prose-headings:font-title prose-a:text-white hover:prose-a:text-neutral-300">
            {/* Header */}
            <header className="mb-12 not-prose">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-neutral-400 mb-4 uppercase tracking-wider">
                <span className="text-emerald-400 font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  {post.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>{formattedDate}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-title text-white leading-tight mb-6 tracking-tight">
                {post.title}
              </h1>

              {/* Author Byline */}
              <div className="flex items-center gap-3 py-4 border-t border-b border-white/10 my-6 font-mono text-xs text-neutral-400">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0 bg-neutral-800">
                  <Image
                    src="/perfil.png"
                    alt={post.author}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span>Escrito por </span>
                  <Link href="/autores/keyner-trillos" className="text-white font-bold hover:underline">
                    {post.author}
                  </Link>
                  <span className="text-neutral-400"> • {post.authorRole}</span>
                  <span className="block text-[11px] text-neutral-500 mt-0.5">
                    Publicado el {formattedDate}
                  </span>
                </div>
              </div>
            </header>

            {/* Render MDX content with RSC */}
            <MdxContent content={post.content} />

            {/* Contextual CTA Box */}
            <div className="not-prose my-14 p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-neutral-900 via-zinc-950 to-black shadow-2xl">
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <Sparkles className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">
                  {cta.badge || "Ingeniería de Software en K&T Code"}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-title text-white mb-3">
                {cta.title}
              </h3>
              <p className="font-mono text-sm text-neutral-300 mb-6 leading-relaxed">
                {cta.description}
              </p>
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white !text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg !no-underline"
              >
                <span className="text-black font-bold">{cta.label}</span>
                <ArrowRight className="w-4 h-4 text-black shrink-0" />
              </Link>
            </div>

            {/* Visible Sources Section */}
            {post.sources && post.sources.length > 0 && (
              <section
                className="not-prose my-12 pt-8 border-t border-white/10"
                aria-labelledby="fuentes-consultadas-title"
              >
                <h2
                  id="fuentes-consultadas-title"
                  className="font-title text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5 text-emerald-400" />
                  Fuentes consultadas
                </h2>
                <ul className="space-y-3 font-mono text-xs md:text-sm">
                  {post.sources.map((source, sIdx) => (
                    <li key={sIdx}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
                      >
                        <span>{source.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Related Posts with Ranking */}
            <RelatedPosts
              currentSlug={post.slug}
              category={post.category}
              tags={post.tags}
              secondaryKeywords={post.secondaryKeywords}
              limit={3}
            />
          </article>
        </div>
      </main>

      <Footer />
    </>
  )
}
