import Link from "next/link"
import { ArrowRight } from "lucide-react"
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
      {/* Minimalist Section Header */}
      <div className="flex items-center gap-2 mb-6 text-neutral-300 font-mono text-xs uppercase tracking-wider font-semibold">
        <span className="w-2 h-2 rounded-full bg-white/40" />
        <span>Artículos y Guías Relacionadas</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {selectedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col justify-between p-5 sm:p-6 rounded-xl border border-white/10 bg-[#131313] hover:bg-[#181818] hover:border-white/20 transition-all duration-200"
          >
            <div>
              {/* Category & Read time with proper spacing and contrast */}
              <div className="flex items-center justify-between gap-2 text-xs font-mono mb-3">
                <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {post.category}
                </span>
                <span className="text-neutral-400">{post.readTime}</span>
              </div>

              {/* Title */}
              <h4 className="font-title font-bold text-white text-base md:text-lg group-hover:text-white transition-colors line-clamp-2 mb-2 leading-snug">
                {post.title}
              </h4>

              {/* Excerpt */}
              <p className="font-sans text-xs md:text-sm text-neutral-400 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            {/* Bottom Link Action */}
            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-300 group-hover:text-white transition-colors">
              <span>Leer artículo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-neutral-400 group-hover:text-white" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
