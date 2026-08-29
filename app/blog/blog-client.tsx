"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, CalendarDays, ArrowRight, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCursor } from "@/context/cursor-context"

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
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")

  // Dynamically extract categories present in current published posts while maintaining standard order
  const standardOrder = ["Todos", "Ingeniería & IA", "Ingeniería & SEO", "Comparativas", "Precios & Guías"]
  const existingCategories = Array.from(new Set(posts.map((p) => p.category || "Precios & Guías")))
  const categories = [
    "Todos",
    ...standardOrder.filter((c) => c !== "Todos" && existingCategories.includes(c)),
    ...existingCategories.filter((c) => !standardOrder.includes(c)),
  ]

  const filteredPosts =
    selectedCategory === "Todos"
      ? posts
      : posts.filter((p) => (p.category || "Precios & Guías") === selectedCategory)

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

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
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
                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-emerald-400 font-bold text-[11px]">
                          {post.category || "Artículo"}
                        </span>
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
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
