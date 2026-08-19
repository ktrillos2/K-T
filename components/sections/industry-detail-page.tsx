import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  AlertTriangle,
  Sparkles,
} from "lucide-react"

import JsonLd from "@/components/seo/json-ld"
import type { IndustryPageData } from "@/lib/industry-pages"
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo"

export default function IndustryDetailPage({ industry }: { industry: IndustryPageData }) {
  const path = `/industrias/${industry.slug}`
  const whatsappMessage = encodeURIComponent(`Hola K&T Code, estoy interesado en una solución web especializada para el sector de ${industry.industryName}.`)

  return (
    <>
      <JsonLd
        data={[
          buildServiceJsonLd({
            name: industry.shortTitle,
            description: industry.metaDescription,
            path,
            serviceType: `Web development for ${industry.industryName}`,
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Industrias", path: "/industrias" },
            { name: industry.shortTitle, path },
          ]),
          buildFaqJsonLd(industry.faqs),
        ]}
      />

      <main className="relative min-h-screen overflow-hidden bg-black pb-24 pt-32 text-white">
        {/* Background Grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:54px_54px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-white/[0.035] blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs sm:text-sm text-white/55 flex justify-center">
            <ol className="flex flex-wrap items-center justify-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link href="/industrias" className="transition-colors hover:text-white">Industrias</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="text-white font-bold">
                {industry.shortTitle}
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <header className="max-w-4xl mx-auto text-center">
            <p className="mb-4 font-mono text-xs sm:text-sm uppercase tracking-widest text-white/60">{industry.eyebrow}</p>
            <h1 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
              {industry.title}
            </h1>
            <p className="mt-4 font-mono text-sm sm:text-base md:text-lg leading-relaxed text-white/70 max-w-3xl mx-auto">
              {industry.summary}
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/573116360057?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-mono font-bold text-black transition-all hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <MessageCircle className="h-5 w-5" />
                Cotizar Proyecto para {industry.industryName}
              </a>
              <Link
                href="/precios"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-mono font-bold text-white transition-colors hover:bg-white/10"
              >
                Ver planes de desarrollo
              </Link>
            </div>
          </header>

          {/* Industry Challenges & Pain points */}
          <section className="mt-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Desafíos del Sector</p>
              <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                Problemas Comunes que Resolvemos
              </h2>
              <p className="mt-3 font-mono text-sm text-white/65">
                Obstáculos digitales que frenan las ventas en el sector de {industry.industryName}.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {industry.industryChallenges.map((challenge, idx) => (
                <div key={challenge.title} className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-7">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
                    <AlertTriangle className="h-4 w-4" /> Problema 0{idx + 1}
                  </div>
                  <h3 className="mt-4 font-title text-xl font-bold text-white">{challenge.title}</h3>
                  <p className="mt-3 font-mono text-xs leading-6 text-white/65">{challenge.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Features for the Industry */}
          <section className="mt-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Funcionalidades Especializadas</p>
              <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                Características Diseñadas para tu Negocio
              </h2>
              <p className="mt-3 font-mono text-sm text-white/65">
                Módulos e integraciones clave para acelerar la captación de clientes.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {industry.keyFeatures.map((feat) => (
                <article key={feat.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition-all hover:border-white/20 hover:bg-white/[0.04]">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400 mb-4" />
                  <h3 className="font-title text-xl font-bold text-white">{feat.title}</h3>
                  <p className="mt-3 font-mono text-xs leading-6 text-white/65">{feat.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Featured Real Projects / Case Studies */}
          {industry.featuredProjects && industry.featuredProjects.length > 0 && (
            <section className="mt-28">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-mono text-sm uppercase tracking-wider text-emerald-400 font-bold">// Evidencia de Capacidad</p>
                <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                  Proyectos y Casos de Estudio en {industry.industryName}
                </h2>
                <p className="mt-3 font-mono text-sm text-white/65">
                  Resultados medibles y plataformas desarrolladas para empresas de este sector.
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {industry.featuredProjects.map((proj) => (
                  <article key={proj.slug} className="flex flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.03] p-8 transition-all hover:border-emerald-400/40 hover:bg-white/[0.05] relative group">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          {proj.role}
                        </span>
                        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-300">
                          {proj.metrics}
                        </span>
                      </div>
                      <h3 className="font-title text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                        {proj.client}
                      </h3>
                      <p className="font-mono text-xs leading-6 text-white/70 mb-6">
                        {proj.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {proj.tech.map((t) => (
                          <span key={t} className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[11px] text-white/60">
                            {t}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/projects/${proj.slug}`}
                        aria-label={`Ver caso de estudio detallado de ${proj.client}`}
                        className="inline-flex items-center gap-2 font-mono text-xs font-bold text-white group-hover:text-emerald-300 transition-colors"
                      >
                        Ver Caso de Estudio Completo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Tech Stack */}
          <section className="mt-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Stack Tecnológico</p>
              <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                Tecnología Recomendada para {industry.industryName}
              </h2>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {industry.techStack.map((tech) => (
                <div key={tech.name} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <span className="inline-block rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-white/70">
                    {tech.tag}
                  </span>
                  <h3 className="mt-3 font-title text-lg font-bold text-white">{tech.name}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* 5-Step Process */}
          <section className="mt-28">
            <p className="mb-3 text-center font-mono text-sm uppercase tracking-wider text-white/55">// Metodología de Ejecución</p>
            <h2 className="text-center font-title text-3xl font-bold md:text-4xl">Cómo desarrollamos el proyecto</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-5">
              {industry.process.map((step, index) => (
                <article key={step.title} className="relative rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <span className="font-mono text-xs font-bold text-white/40">ETAPA 0{index + 1}</span>
                  <h3 className="mt-4 font-title text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-3 font-mono text-xs leading-6 text-white/60">{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mx-auto mt-28 max-w-4xl">
            <p className="mb-3 text-center font-mono text-sm uppercase tracking-wider text-white/55">// Preguntas Frecuentes</p>
            <h2 className="text-center font-title text-3xl font-bold md:text-4xl">Dudas específicas sobre {industry.industryName}</h2>
            <div className="mt-10 space-y-3">
              {industry.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-white/10 bg-white/[0.025] transition-colors hover:border-white/20">
                  <summary className="cursor-pointer list-none px-6 py-5 font-mono font-bold text-white marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.question}
                      <span className="text-xl text-white/45 transition-transform duration-200 group-open:rotate-45" aria-hidden="true">+</span>
                    </span>
                  </summary>
                  <p className="border-t border-white/8 px-6 py-5 font-mono text-sm leading-7 text-white/70">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-28 rounded-3xl border border-white/10 bg-white/[0.035] p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="font-mono text-sm text-white/55">// Da el Siguiente Paso</p>
                <h2 className="mt-2 font-title text-3xl font-bold">Impulsa la presencia digital de tu empresa</h2>
                <p className="mt-3 font-mono text-sm text-white/70">
                  Descubre también nuestro <Link href={`/servicios/${industry.relatedServiceSlug}`} className="underline underline-offset-4 text-white hover:text-white/80">{industry.relatedServiceTitle}</Link> o solicita una asesoría técnica.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={`https://wa.me/573116360057?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-mono font-bold text-black transition-all hover:bg-neutral-200"
                >
                  <MessageCircle className="h-4 w-4" />
                  Hablar con un Ingeniero
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
