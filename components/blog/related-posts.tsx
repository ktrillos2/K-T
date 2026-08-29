import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { getRelatedBlogPosts, type UnifiedBlogPost } from "@/lib/blog-mdx"

interface RelatedPostsProps {
  currentSlug: string
  category?: string
  tags?: string[]
  secondaryKeywords?: string[]
  limit?: number
}

export default function RelatedPosts({
  currentSlug,
  category,
  tags = [],
  secondaryKeywords = [],
  limit = 3,
}: RelatedPostsProps) {
  // Only retrieve published posts (weighted ranking scoring)
  const selectedPosts: UnifiedBlogPost[] = getRelatedBlogPosts(
    currentSlug,
    category,
    tags,
    secondaryKeywords,
    limit
  )

  if (selectedPosts.length === 0) return null

  return (
    <section
      aria-label="Artículos relacionados"
      className="not-prose my-16 border-t border-white/10 pt-12"
    >
      <div className="flex items-center gap-2.5 mb-6 text-emerald-400 font-mono text-xs uppercase tracking-wider font-bold">
        <Sparkles className="w-4 h-4" />
        <span>Artículos y Guías Relacionadas</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col justify-between p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-emerald-500/40 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                <span className="text-emerald-400 font-bold">{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h4 className="font-title font-bold text-white text-base group-hover:text-emerald-300 transition-colors line-clamp-2 mb-2">
                {post.title}
              </h4>
              <p className="font-mono text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono text-white group-hover:text-emerald-300 transition-colors">
              <span>Leer artículo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
