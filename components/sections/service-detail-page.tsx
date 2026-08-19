import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Gauge,
  Layers3,
  Search,
  ShieldCheck,
  Zap,
  Cpu,
  Smartphone,
  Flame,
  Check,
  X,
  MessageCircle,
} from "lucide-react"

import JsonLd from "@/components/seo/json-ld"
import type { ServicePageData } from "@/lib/service-pages"
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo"

const benefitIcons = [Layers3, Gauge, Search, ShieldCheck]

const techStackList = [
  { name: "Next.js", desc: "App Router, SSR, SSG y Server Components", tag: "Frontend & Core" },
  { name: "React 19", desc: "Componentes reactivos ultra eficientes", tag: "UI Library" },
  { name: "TypeScript", desc: "Tipado estricto y código libre de errores", tag: "Type Safety" },
  { name: "Tailwind CSS", desc: "Estilos atómicos de alto rendimiento", tag: "Styling" },
  { name: "Supabase / PostgreSQL", desc: "Bases de datos seguras y escalables", tag: "Database" },
  { name: "Vercel / Cloudflare CDN", desc: "Despliegue global en el Edge con SSL", tag: "Infrastructure" },
  { name: "WooCommerce & Shopify APIs", desc: "Integración de catálogos y pasarelas", tag: "E-commerce APIs" },
  { name: "Wompi / PayU / Bold", desc: "Pasarelas de pago colombianas e internacionales", tag: "Payments" },
]

export default function ServiceDetailPage({ service }: { service: ServicePageData }) {
  const path = `/servicios/${service.slug}`
  const whatsappMessage = encodeURIComponent(`Hola K&T Code, estoy interesado en cotizar el servicio de ${service.shortTitle} para mi empresa.`)

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
            { name: "Servicios", path: "/servicios" },
            { name: service.shortTitle, path },
          ]),
          buildFaqJsonLd(service.faqs),
        ]}
      />

      <main className="relative min-h-screen overflow-hidden bg-black pb-24 pt-32 text-white">
        {/* Subtle grid background */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:54px_54px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-white/[0.035] blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Semantic Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-12 font-mono text-sm text-white/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link href="/servicios" className="transition-colors hover:text-white">Servicios</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current="page" className="text-white">
                {service.shortTitle}
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <section className="grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <p className="mb-4 font-mono text-sm uppercase tracking-wider text-white/65">{service.eyebrow}</p>
              <h1 className="max-w-4xl font-title text-4xl font-bold leading-[1.02] tracking-tight text-white md:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-7 max-w-3xl font-mono text-base leading-relaxed text-white/70 md:text-lg">
                {service.summary}
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`https://wa.me/573116360057?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-mono font-bold text-black transition-all hover:bg-neutral-200 hover:shadow-lg active:scale-95"
                >
                  <MessageCircle className="h-5 w-5" />
                  Cotizar por WhatsApp
                </a>
                <Link
                  href="/precios"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-mono font-bold text-white transition-colors hover:bg-white/10"
                >
                  Ver planes y tarifas
                </Link>
              </div>
            </div>

            {/* 4 Core Value Pillars */}
            <div className="grid gap-4 sm:grid-cols-2">
              {service.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index % benefitIcons.length]
                return (
                  <article key={benefit.title} className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition-all hover:border-white/25 hover:bg-white/[0.06]">
                    <Icon className="mb-5 h-7 w-7 text-white transition-transform group-hover:scale-110" aria-hidden="true" />
                    <h2 className="font-title text-xl font-bold text-white">{benefit.title}</h2>
                    <p className="mt-3 font-mono text-sm leading-6 text-white/60">{benefit.description}</p>
                  </article>
                )
              })}
            </div>
          </section>

          {/* What We Develop Section */}
          {service.whatWeDevelop && service.whatWeDevelop.length > 0 && (
            <section className="mt-28">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Alcance de Desarrollo</p>
                <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                  ¿Qué soluciones desarrollamos con {service.shortTitle}?
                </h2>
                <p className="mt-4 font-mono text-sm text-white/65">
                  Proyectos a medida diseñados con arquitectura de software moderna y máxima optimización.
                </p>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {service.whatWeDevelop.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition-all hover:border-white/20 hover:bg-white/[0.04]">
                    <h3 className="font-title text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-3 font-mono text-sm leading-6 text-white/65">{item.description}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* When we recommend vs When we do NOT recommend */}
          {(service.whenWeRecommend || service.whenWeDoNotRecommend) && (
            <section className="mt-28">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Criterios de Selección</p>
                <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                  ¿Cuándo recomendamos y cuándo no recomendamos esta tecnología?
                </h2>
                <p className="mt-4 font-mono text-sm text-white/65">
                  Transparencia técnica y honestidad para asegurar el retorno de inversión de tu empresa.
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {/* Cuándo Sí */}
                {service.whenWeRecommend && (
                  <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/10 p-8 backdrop-blur-sm">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-mono text-xs text-emerald-400">
                      <Check className="h-4 w-4" /> Cuándo SÍ recomendamos {service.shortTitle}
                    </div>
                    <ul className="mt-6 space-y-4 font-mono text-sm text-white/80">
                      {service.whenWeRecommend.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cuándo No */}
                {service.whenWeDoNotRecommend && (
                  <div className="rounded-3xl border border-rose-500/20 bg-rose-950/10 p-8 backdrop-blur-sm">
                    <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 font-mono text-xs text-rose-400">
                      <X className="h-4 w-4" /> Cuándo NO recomendamos esta solución
                    </div>
                    <ul className="mt-6 space-y-4 font-mono text-sm text-white/70">
                      {service.whenWeDoNotRecommend.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <X className="mt-1 h-4 w-4 shrink-0 text-rose-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Timeline and Investment Notice */}
          {(service.estimatedTimeline || service.priceRangeCOP) && (
            <section className="mt-28 grid gap-6 md:grid-cols-2">
              {service.estimatedTimeline && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                  <span className="font-mono text-xs uppercase tracking-wider text-white/50">// Plazo Estimado</span>
                  <h3 className="mt-2 font-title text-xl font-bold">Tiempos de Entrega</h3>
                  <p className="mt-3 font-mono text-sm leading-6 text-white/70">{service.estimatedTimeline}</p>
                </div>
              )}
              {service.priceRangeCOP && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                  <span className="font-mono text-xs uppercase tracking-wider text-white/50">// Inversión Orientativa</span>
                  <h3 className="mt-2 font-title text-xl font-bold">Rango de Precios en Colombia</h3>
                  <p className="mt-3 font-mono text-sm leading-6 text-white/70">{service.priceRangeCOP}</p>
                  <Link href="/precios" className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-white underline underline-offset-4 hover:text-white/80">
                    Ver desglose completo de planes y tarifas <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </section>
          )}

          {/* Performance Comparison: Next.js vs WordPress / Traditional CMS */}
          {service.showPerformanceComparison && (
            <section className="mt-28">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Comparativa Técnica</p>
                <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl lg:text-5xl">
                  Next.js frente a CMS Tradicionales y Plantillas
                </h2>
                <p className="mt-4 font-mono text-sm text-white/65 md:text-base">
                  Por qué las empresas líderes en Colombia eligen arquitectura Headless con Next.js en lugar de WordPress, Elementor o Wix.
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {/* Next.js (K&T Code) */}
                <div className="relative rounded-3xl border border-white/30 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 backdrop-blur-sm">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-xs text-white">
                    <Zap className="h-4 w-4 text-emerald-400" /> K&T Code (Next.js & Headless)
                  </div>
                  <h3 className="mt-5 font-title text-2xl font-bold">Máximo Rendimiento y Conversión</h3>

                  <ul className="mt-6 space-y-4 font-mono text-sm text-white/80">
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <span><strong>Velocidad Core Web Vitals:</strong> 95-100/100 en Google PageSpeed. LCP inferior a 0.8s.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <span><strong>Seguridad Inquebrantable:</strong> 0 plugins de terceros vulnerables; páginas compiladas estáticamente y APIs cifradas.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <span><strong>SEO Técnico Nativo:</strong> HTML5 semántico puro sin código basura, renderizado en servidor (SSR/SSG).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <span><strong>Escalabilidad Global:</strong> Soporta miles de visitas simultáneas sin caídas ni sobrecarga de servidor.</span>
                    </li>
                  </ul>
                </div>

                {/* Traditional CMS */}
                <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-white/60">
                    <Flame className="h-4 w-4 text-rose-400" /> CMS Tradicionales / Plantillas (WordPress/Wix)
                  </div>
                  <h3 className="mt-5 font-title text-2xl font-bold text-white/75">Limitaciones y Vulnerabilidades</h3>

                  <ul className="mt-6 space-y-4 font-mono text-sm text-white/55">
                    <li className="flex items-start gap-3">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                      <span><strong>Velocidad Deficiente:</strong> Puntuaciones de 30-65/100 en móviles; tiempos de carga superiores a 4 segundos.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                      <span><strong>Riesgos de Seguridad:</strong> Vulnerabilidades frecuentes por plugins desactualizados y bases de datos expuestas.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                      <span><strong>Código Inflado:</strong> Cientos de scripts innecesarios que confunden a Google y retrasan el rastreo.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                      <span><strong>Mantenimiento Costoso:</strong> Caídas constantes tras actualizar temas o plugins incompatibles.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Tech Stack Section */}
          {service.showTechStack && (
            <section className="mt-28">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Infraestructura Moderna</p>
                <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                  Stack Tecnológico de Grado Empresarial
                </h2>
                <p className="mt-4 font-mono text-sm text-white/65">
                  Herramientas y tecnologías de vanguardia seleccionadas para máxima confiabilidad y escalabilidad.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {techStackList.map((tech) => (
                  <div key={tech.name} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.05]">
                    <span className="inline-block rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-white/75">
                      {tech.tag}
                    </span>
                    <h3 className="mt-3 font-title text-lg font-bold text-white">{tech.name}</h3>
                    <p className="mt-1 font-mono text-xs leading-5 text-white/55">{tech.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Habitual Scope & Ideal For */}
          <section className="mt-28 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 font-mono text-sm uppercase tracking-wider text-white/55">// Alcance habitual</p>
              <h2 className="font-title text-3xl font-bold md:text-4xl">Qué incluye este servicio</h2>
              <ul className="mt-8 space-y-4">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 font-mono leading-7 text-white/80">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-950/70 p-7 md:p-9">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-white/50">// Perfil de Cliente</p>
              <h2 className="font-title text-2xl font-bold">Este servicio es ideal para</h2>
              <ul className="mt-7 grid gap-4">
                {service.idealFor.map((item, index) => (
                  <li key={item} className="flex gap-4 border-b border-white/8 pb-4 font-mono text-sm leading-6 text-white/70 last:border-0 last:pb-0">
                    <span className="font-bold text-white/40">0{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Process Section */}
          <section className="mt-28">
            <p className="mb-3 text-center font-mono text-sm uppercase tracking-wider text-white/55">// Metodología Ágil</p>
            <h2 className="text-center font-title text-3xl font-bold md:text-4xl">Cómo trabajamos paso a paso</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-5">
              {service.process.map((step, index) => (
                <article key={step.title} className="relative rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <span className="font-mono text-xs font-bold text-white/40">PASO 0{index + 1}</span>
                  <h3 className="mt-4 font-title text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-3 font-mono text-xs leading-6 text-white/60">{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* FAQ Accordion Section */}
          <section className="mx-auto mt-28 max-w-4xl">
            <p className="mb-3 text-center font-mono text-sm uppercase tracking-wider text-white/55">// Respuestas Claras</p>
            <h2 className="text-center font-title text-3xl font-bold md:text-4xl">Preguntas frecuentes</h2>
            <div className="mt-10 space-y-3">
              {service.faqs.map((faq) => (
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

          {/* Related Articles & Cluster Links */}
          <section className="mt-28 rounded-3xl border border-white/10 bg-white/[0.035] p-8 md:p-12">
            <div className="grid gap-9 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="font-mono text-sm text-white/55">// Guías y Recursos Informativos</p>
                <h2 className="mt-2 font-title text-2xl font-bold md:text-3xl">Profundiza sobre desarrollo web</h2>
                <div className="mt-5 flex flex-col gap-3">
                  {service.relatedArticles.map((article) => (
                    <Link key={article.href} href={article.href} className="inline-flex items-center gap-2 font-mono text-sm text-white/75 transition-colors hover:text-white">
                      <ArrowRight className="h-4 w-4 text-white/40" aria-hidden="true" />
                      {article.title}
                    </Link>
                  ))}
                </div>
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

