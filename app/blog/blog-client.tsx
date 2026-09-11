"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  CalendarDays,
  ArrowRight,
  Sparkles,
  Layers,
  Compass,
  Star,
  CheckCircle2,
  FolderGit2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCursor } from "@/context/cursor-context"
import { getAllClusters, getClusterForPost, BlogCluster } from "@/lib/blog-clusters"

export interface Post {
  slug: string
  title: string
  excerpt: string
  category?: string
  date: string
  readTime: string
}

export function BlogClient({ posts }: { posts: Post[] }) {
  const { setCursorVariant } = useCursor()
  const clusters = getAllClusters()
  const [activeFilter, setActiveFilter] = useState<string>("todos")

  // Helper to filter posts
  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "todos") return true

    // Check if filtering by cluster
    const cluster = getClusterForPost(post.slug)
    if (cluster && cluster.id === activeFilter) {
      return true
    }

    // Check if filtering by category
    const cat = post.category || "Precios & Guías"
    if (cat === activeFilter) {
      return true
    }

    return false
  })

  const standardOrder = ["Ingeniería & IA", "Ingeniería & SEO", "Comparativas", "Precios & Guías"]
  const existingCategories = Array.from(new Set(posts.map((p) => p.category || "Precios & Guías")))
  const displayCategories = standardOrder.filter((c) => existingCategories.includes(c))

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Tech grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white font-mono text-sm mb-8 transition-colors uppercase tracking-wider"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-title mb-6 tracking-tight">
            Blog Técnico & Comparativas
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl font-mono">
            Arquitectura de software, comparativas objetivas de tecnologías, agentes de IA, guías de costos reales en Colombia y optimización para motores de búsqueda y modelos generativos.
          </p>
        </motion.div>

        {/* ─── CLUSTERS TEMÁTICOS (HUB & SPOKE OVERVIEW) ────────────────── */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Arquitectura de Contenido</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-title">
                Explora por Topic Clusters Semánticos
              </h2>
            </div>
            <p className="text-white/50 font-mono text-xs max-w-md">
              Guías pilares exhaustivas y artículos especializados estructurados para dominar cada área tecnológica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clusters.map((cluster) => {
              const isSelected = activeFilter === cluster.id
              return (
                <div
                  key={cluster.id}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "border-emerald-400/80 bg-emerald-950/20 shadow-[0_0_25px_rgba(16,185,129,0.15)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/10 text-white font-bold">
                        {cluster.badge}
                      </span>
                      <span className="font-mono text-[11px] text-white/40">
                        {cluster.posts.length} artículos
                      </span>
                    </div>
                    <h3 className="font-title font-bold text-lg text-white mb-2 leading-snug">
                      {cluster.name}
                    </h3>
                    <p className="font-mono text-xs text-white/60 leading-relaxed mb-4">
                      {cluster.description}
                    </p>

                    {/* Pillar Guide Link */}
                    <div className="pt-3 border-t border-white/10 mb-4">
                      <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                        Guía Pilar Principal
                      </span>
                      <Link
                        href={`/blog/${cluster.pillarSlug}`}
                        className="text-xs font-mono text-white/90 hover:text-emerald-300 transition-colors line-clamp-2 leading-snug underline-offset-2 hover:underline"
                      >
                        {cluster.pillarTitle}
                      </Link>
                    </div>

                    {/* Spoke Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cluster.posts.slice(1, 5).map((spoke) => (
                        <Link
                          key={spoke.slug}
                          href={`/blog/${spoke.slug}`}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/5 transition-colors"
                        >
                          {spoke.shortRole}
                        </Link>
                      ))}
                      {cluster.posts.length > 5 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-white/40">
                          +{cluster.posts.length - 5} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Filter Action */}
                  <button
                    onClick={() => {
                      setActiveFilter(isSelected ? "todos" : cluster.id)
                      const target = document.getElementById("posts-catalog")
                      if (target) target.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={`w-full py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? "bg-emerald-400 text-black shadow-md"
                        : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
                    }`}
                  >
                    {isSelected ? "Filtro activo (Quitar)" : `Ver Cluster ${cluster.shortName}`}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        {/* ─── FILTROS Y CATEGORÍAS ────────────────── */}
        <div id="posts-catalog" className="pt-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white font-title">
              Catálogo de Artículos y Análisis
            </h2>
            <span className="font-mono text-xs text-white/50">
              Mostrando {filteredPosts.length} de {posts.length} artículos
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-8">
            <button
              onClick={() => setActiveFilter("todos")}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className={`px-4 py-2 rounded-xl font-mono text-xs md:text-sm transition-all duration-200 border ${
                activeFilter === "todos"
                  ? "bg-white text-black border-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                  : "bg-white/[0.03] text-white/60 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              Todos ({posts.length})
            </button>

            {/* Clusters as Quick Filters */}
            {clusters.map((c) => {
              const isActive = activeFilter === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveFilter(c.id)}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className={`px-4 py-2 rounded-xl font-mono text-xs md:text-sm transition-all duration-200 border ${
                    isActive
                      ? "bg-emerald-400 text-black border-emerald-400 font-bold shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                      : "bg-white/[0.03] text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {c.badge}
                </button>
              )
            })}

            {/* Categories */}
            {displayCategories.map((cat) => {
              const isActive = activeFilter === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className={`px-4 py-2 rounded-xl font-mono text-xs md:text-sm transition-all duration-200 border ${
                    isActive
                      ? "bg-white text-black border-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                      : "bg-white/[0.03] text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {cat === "Comparativas" && <span className="inline-block mr-1.5 text-emerald-400">⚡</span>}
                  {cat === "Ingeniería & IA" && <span className="inline-block mr-1.5 text-emerald-400">🤖</span>}
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* ─── GRID DE ARTÍCULOS ────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => {
              const cluster = getClusterForPost(post.slug)
              const isPillar = cluster && cluster.pillarSlug === post.slug

              return (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
                  className="h-full"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <article className="h-full flex flex-col p-8 rounded-2xl bg-[#111111] text-white border border-white/5 shadow-[inset_8px_8px_16px_#070707,inset_-8px_-8px_16px_#1b1b1b] hover:border-white/20 hover:-translate-y-1 hover:shadow-[inset_8px_8px_16px_#070707,inset_-8px_-8px_16px_#222222,4px_4px_10px_rgba(0,0,0,0.5)] transition-all duration-300 relative overflow-hidden">
                      {/* Scanline pattern */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] transition-opacity duration-300" />

                      <div className="relative z-10 flex flex-col h-full">
                        {/* Top metadata */}
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/40 mb-6 uppercase tracking-wider">
                          <div className="flex flex-wrap items-center gap-2">
                            {cluster && (
                              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                                {isPillar && <Star className="w-3 h-3 fill-emerald-400" />}
                                {isPillar ? `Pilar: ${cluster.shortName}` : cluster.shortName}
                              </span>
                            )}
                            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 font-bold text-[11px]">
                              {post.category || "Artículo"}
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <CalendarDays className="w-3.5 h-3.5" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>

                        <h2 className="text-2xl lg:text-3xl font-bold text-white font-title mb-4 group-hover:text-white/90 transition-colors leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-white/50 leading-relaxed mb-8 flex-grow font-mono text-sm">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-white font-mono text-sm font-bold mt-auto group-hover:translate-x-2 transition-transform uppercase tracking-wider">
                          Leer Artículo <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
