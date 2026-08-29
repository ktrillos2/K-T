import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Code2,
  ExternalLink,
  Instagram,
  Facebook,
  MapPin,
  Sparkles,
} from "lucide-react"

// Custom TikTok Icon
const TikTok = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { authors, getAuthor } from "@/lib/authors"
import { getAllPublishedBlogPosts } from "@/lib/blog-mdx"
import { buildBreadcrumbJsonLd } from "@/lib/seo"
import { absoluteUrl, siteConfig } from "@/lib/site-config"

interface AuthorPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(authors).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthor(slug)

  if (!author) {
    return {
      title: "Autor no encontrado",
    }
  }

  const title = `${author.name} — ${author.role}`
  const description = author.shortBio

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/autores/${author.slug}`),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/autores/${author.slug}`),
      type: "profile",
      siteName: "K&T Code",
    },
  }
}

export default async function AuthorDetailPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = getAuthor(slug)

  if (!author) {
    notFound()
  }

  const path = `/autores/${author.slug}`
  const authorPersonId = `${absoluteUrl(path)}#person`

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absoluteUrl(path)}#profilepage`,
    url: absoluteUrl(path),
    name: `${author.name} — Perfil Profesional`,
    description: author.shortBio,
    mainEntity: {
      "@type": "Person",
      "@id": authorPersonId,
      name: author.name,
      jobTitle: author.role,
      worksFor: {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
      },
      url: absoluteUrl(path),
      description: author.bio,
      sameAs: [author.instagram, author.facebook, author.tiktok],
      knowsAbout: author.skills,
    },
  }

  return (
    <>
      <JsonLd
        data={[
          profileJsonLd,
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Equipo", path: "/nosotros" },
            { name: author.name, path },
          ]),
        ]}
      />

      <main className="relative min-h-screen overflow-hidden bg-black pb-24 pt-32 text-white">
        {/* Background Grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:54px_54px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-white/[0.035] blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-10 font-mono text-sm text-white/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link href="/nosotros" className="transition-colors hover:text-white">
                  Nosotros
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current="page" className="text-white">
                {author.name}
              </li>
            </ol>
          </nav>

          {/* Author Header Card */}
          <header className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.05] via-neutral-950 to-black p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-white/20 shrink-0 shadow-2xl bg-neutral-900">
                <Image
                  src={author.avatar || "/perfil.png"}
                  alt={author.name}
                  fill
                  sizes="(max-width: 768px) 112px, 144px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Autor Verificado
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-neutral-300">
                    <Building2 className="h-3.5 w-3.5" />
                    {author.company}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-neutral-300">
                    <MapPin className="h-3.5 w-3.5" />
                    {author.location}
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold font-title text-white leading-tight">
                  {author.name}
                </h1>

                <p className="font-mono text-sm md:text-base text-emerald-400 font-semibold">
                  {author.role} en {author.company}
                </p>

                <p className="text-neutral-300 font-mono text-sm leading-relaxed max-w-3xl">
                  {author.bio}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={author.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2 font-mono text-xs font-bold text-white hover:bg-white/20 transition-colors"
                  >
                    <Instagram className="h-4 w-4 text-pink-400" />
                    Instagram
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={author.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2 font-mono text-xs font-bold text-white hover:bg-white/20 transition-colors"
                  >
                    <Facebook className="h-4 w-4 text-blue-400" />
                    Facebook
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={author.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2 font-mono text-xs font-bold text-white hover:bg-white/20 transition-colors"
                  >
                    <TikTok className="h-4 w-4 text-neutral-300" />
                    TikTok
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Technical Skills & Expertise */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold font-title text-white mb-6 flex items-center gap-3">
              <Code2 className="h-6 w-6 text-white" />
              Especialidad y Áreas de Dominio Técnico
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              {author.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-neutral-300 flex items-center gap-2"
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Articles Written by Author */}
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-bold font-title text-white flex items-center gap-3">
                <Calendar className="h-6 w-6 text-white" />
                Artículos y Guías Técnicas Publicadas
              </h2>
              <span className="font-mono text-xs text-neutral-400">
                {getAllPublishedBlogPosts().length} publicaciones
              </span>
            </div>

            <div className="space-y-4">
              {getAllPublishedBlogPosts().map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/30 hover:bg-white/[0.04]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 font-mono text-xs text-neutral-400">
                    <span className="text-emerald-400">{post.category || "Ingeniería & Estrategia Web"}</span>
                    <span>{post.publishedAt.split("T")[0]} • {post.readTime}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold font-title text-white group-hover:text-primary transition-colors flex items-center justify-between gap-4">
                    {post.title}
                    <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="mt-2 font-mono text-xs text-neutral-300 leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Back to Blog */}
          <div className="mt-16 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a la biblioteca técnica del Blog
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
