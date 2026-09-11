import Link from "next/link"
import { ArrowRight, BookOpen, CheckCircle2, Compass, Layers } from "lucide-react"
import { getClusterForPost, type BlogCluster } from "@/lib/blog-clusters"

interface BlogClusterNavProps {
  currentSlug: string
  className?: string
}

export default function BlogClusterNav({ currentSlug, className = "" }: BlogClusterNavProps) {
  const cluster = getClusterForPost(currentSlug)

  if (!cluster) return null

  const isPillar = currentSlug === cluster.pillarSlug

  return (
    <aside
      aria-label={`Topic Cluster: ${cluster.name}`}
      className={`not-prose my-14 rounded-3xl border border-white/15 bg-gradient-to-b from-neutral-900/90 via-neutral-950 to-black p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/80 via-white/40 to-transparent" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            Topic Cluster: {cluster.shortName}
          </div>
          <h2 className="font-title text-xl sm:text-2xl font-bold text-white tracking-tight">
            {cluster.name}
          </h2>
        </div>
        <p className="font-mono text-xs text-neutral-400 sm:text-right max-w-xs">
          Guía temática interconectada para dominar este sector.
        </p>
      </div>

      <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
        {cluster.description}
      </p>

      {/* Pillar reference card if current post is not the pillar */}
      {!isPillar && (
        <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
                Guía Pilar Principal
              </span>
              <span className="font-title text-sm sm:text-base font-bold text-white block mt-0.5">
                {cluster.pillarTitle}
              </span>
            </div>
          </div>
          <Link
            href={`/blog/${cluster.pillarSlug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition-all shrink-0 self-start sm:self-center shadow-md"
          >
            Leer Guía Pilar <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Spoke list */}
      <div>
        <h3 className="font-mono text-xs uppercase tracking-wider text-white/50 mb-3 flex items-center gap-2 font-bold">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          Ruta de Aprendizaje del Cluster ({cluster.posts.length} Artículos)
        </h3>

        <div className="grid sm:grid-cols-2 gap-2.5 font-mono text-xs">
          {cluster.posts.map((post, idx) => {
            const isCurrent = post.slug === currentSlug
            return (
              <div key={post.slug}>
                {isCurrent ? (
                  <div className="p-3.5 rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-white flex items-start justify-between gap-2 shadow-sm">
                    <span className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{post.title}</span>
                    </span>
                    <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold uppercase shrink-0">
                      Leyendo
                    </span>
                  </div>
                ) : (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] text-neutral-300 hover:text-white hover:border-white/25 hover:bg-white/[0.06] transition-all flex items-start justify-between gap-2 group block"
                  >
                    <span className="flex items-start gap-2">
                      <span className="text-neutral-500 font-bold shrink-0 mt-0.5">
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      <span className="group-hover:text-white transition-colors">{post.title}</span>
                    </span>
                    <span className="text-[10px] text-neutral-400 group-hover:text-emerald-400 border border-white/10 rounded px-1.5 py-0.5 shrink-0 self-start transition-colors">
                      {post.shortRole}
                    </span>
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
