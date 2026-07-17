import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"

import JsonLd from "@/components/seo/json-ld"
import { blogEnhancements } from "@/lib/blog-enhancements"
import { getBlogPost } from "@/lib/blog-posts"
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"

export default function BlogArticleEnhancements({ slug }: { slug: string }) {
  const post = getBlogPost(slug)
  const enhancement = blogEnhancements[slug]
  if (!post || !enhancement) return null

  return (
    <>
      <JsonLd
        data={[
          buildArticleJsonLd({
            headline: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            datePublished: post.publishedAt,
            dateModified: post.modifiedAt,
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          buildFaqJsonLd(enhancement.faqs),
        ]}
      />

      <section className="not-prose mt-16 border-t border-white/10 pt-10" aria-labelledby="article-faq-title">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Contenido revisado el 17 de julio de 2026</p>
        <h2 id="article-faq-title" className="mt-4 font-title text-3xl font-bold text-white">Preguntas relacionadas</h2>
        <div className="mt-6 space-y-3">
          {enhancement.faqs.map((faq) => (
            <details key={faq.question} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <summary className="cursor-pointer font-semibold text-white">{faq.question}</summary>
              <p className="mt-3 font-mono text-sm leading-7 text-white/65">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="not-prose mt-12 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-2">
        <div>
          <h2 className="font-title text-2xl font-bold text-white">Servicio relacionado</h2>
          <p className="mt-3 text-sm leading-6 text-white/60">Conoce el alcance, el proceso y las preguntas frecuentes del servicio.</p>
          <Link href={enhancement.servicePath} className="mt-5 inline-flex items-center gap-2 font-mono text-sm font-bold text-primary">
            {enhancement.serviceLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div>
          <h2 className="font-title text-2xl font-bold text-white">Fuentes y recursos</h2>
          <ul className="mt-4 space-y-3">
            {enhancement.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs text-white/65 hover:text-white">
                  {source.label} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
