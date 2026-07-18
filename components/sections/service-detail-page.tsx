import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Gauge,
  Layers3,
  Search,
  ShieldCheck,
} from "lucide-react"

import JsonLd from "@/components/seo/json-ld"
import type { ServicePageData } from "@/lib/service-pages"
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo"

const benefitIcons = [Layers3, Gauge, Search, ShieldCheck]

export default function ServiceDetailPage({ service }: { service: ServicePageData }) {
  const path = `/servicios/${service.slug}`

  return (
    <>
      <JsonLd
        data={[
          buildServiceJsonLd({
            name: service.shortTitle,
            description: service.metaDescription,
            path,
            serviceType: service.serviceType,
          }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Servicios", path: "/precios" },
            { name: service.shortTitle, path },
          ]),
          buildFaqJsonLd(service.faqs),
        ]}
      />

      <main className="relative min-h-screen overflow-hidden bg-black pb-20 pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:54px_54px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-white/[0.035] blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="mb-12 font-mono text-sm text-white/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="transition-colors hover:text-white">Inicio</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li><Link href="/precios" className="transition-colors hover:text-white">Servicios</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li aria-current="page" className="text-white">{service.shortTitle}</li>
            </ol>
          </nav>

          <section className="grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="mb-5 font-mono text-sm text-white/65">{service.eyebrow}</p>
              <h1 className="max-w-4xl font-title text-4xl font-bold leading-[.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                {service.title}
              </h1>
              <p className="mt-7 max-w-3xl font-mono text-base leading-8 text-white/68 md:text-lg">
                {service.summary}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-mono font-bold text-black transition-transform hover:-translate-y-0.5"
                >
                  Cotizar este servicio <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/precios"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-4 font-mono font-bold text-white transition-colors hover:bg-white/10"
                >
                  Ver precios iniciales
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {service.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index % benefitIcons.length]
                return (
                  <article key={benefit.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                    <Icon className="mb-5 h-7 w-7 text-white" aria-hidden="true" />
                    <h2 className="font-title text-xl font-bold text-white">{benefit.title}</h2>
                    <p className="mt-3 font-mono text-sm leading-6 text-white/58">{benefit.description}</p>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="mt-28 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 font-mono text-sm text-white/55">// Alcance habitual</p>
              <h2 className="font-title text-3xl font-bold md:text-5xl">Qué puede incluir</h2>
              <ul className="mt-8 space-y-4">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 font-mono leading-7 text-white/70">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-950/70 p-7 md:p-9">
              <h2 className="font-title text-2xl font-bold">Este servicio es adecuado para</h2>
              <ul className="mt-7 grid gap-4">
                {service.idealFor.map((item, index) => (
                  <li key={item} className="flex gap-4 border-b border-white/8 pb-4 font-mono text-sm leading-6 text-white/68 last:border-0 last:pb-0">
                    <span className="text-white/35">0{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-28">
            <p className="mb-3 text-center font-mono text-sm text-white/55">// Del problema al lanzamiento</p>
            <h2 className="text-center font-title text-3xl font-bold md:text-5xl">Cómo trabajamos</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-5">
              {service.process.map((step, index) => (
                <article key={step.title} className="relative border-t border-white/25 p-5">
                  <span className="font-mono text-xs text-white/35">0{index + 1}</span>
                  <h3 className="mt-5 font-title text-lg font-bold">{step.title}</h3>
                  <p className="mt-3 font-mono text-xs leading-6 text-white/55">{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-28 max-w-4xl">
            <p className="mb-3 text-center font-mono text-sm text-white/55">// Respuestas antes de cotizar</p>
            <h2 className="text-center font-title text-3xl font-bold md:text-5xl">Preguntas frecuentes</h2>
            <div className="mt-10 space-y-3">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-white/10 bg-white/[0.025]">
                  <summary className="cursor-pointer list-none px-6 py-5 font-mono font-bold text-white marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.question}
                      <span className="text-xl text-white/45 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                    </span>
                  </summary>
                  <p className="border-t border-white/8 px-6 py-5 font-mono text-sm leading-7 text-white/62">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-28 rounded-3xl border border-white/10 bg-white/[0.035] p-8 md:p-12">
            <div className="grid gap-9 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="font-mono text-sm text-white/55">// Profundiza antes de decidir</p>
                <h2 className="mt-3 font-title text-3xl font-bold">Recursos relacionados</h2>
                <div className="mt-6 flex flex-col gap-3">
                  {service.relatedArticles.map((article) => (
                    <Link key={article.href} href={article.href} className="inline-flex items-center gap-2 font-mono text-sm text-white/68 transition-colors hover:text-white">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      {article.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-mono font-bold text-black"
              >
                Hablar sobre mi proyecto
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
