import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  HelpCircle,
  Info,
  Layers,
  MessageCircle,
  ShieldAlert,
  Clock,
} from "lucide-react"

import JsonLd from "@/components/seo/json-ld"
import type { PricingGuideData } from "@/lib/pricing-guides"
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"

export default function PricingGuidePage({ guide }: { guide: PricingGuideData }) {
  const path = `/precios/${guide.slug}`
  const whatsappMessage = encodeURIComponent(`Hola K&T Code, estuve revisando su guía de precios sobre "${guide.shortTitle}" y me gustaría recibir una cotización formal.`)

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Precios", path: "/precios" },
            { name: guide.shortTitle, path },
          ]),
          buildFaqJsonLd(guide.faqs),
        ]}
      />

      <main className="relative min-h-screen overflow-hidden bg-black pb-24 pt-32 text-white">
        {/* Subtle background grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:54px_54px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-white/[0.035] blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-12 font-mono text-sm text-white/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link href="/precios" className="transition-colors hover:text-white">Precios</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current="page" className="text-white">
                {guide.shortTitle}
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <header className="max-w-4xl">
            <p className="mb-4 font-mono text-sm uppercase tracking-wider text-white/60">{guide.eyebrow}</p>
            <h1 className="font-title text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              {guide.title}
            </h1>
            <p className="mt-7 font-mono text-base leading-relaxed text-white/70 md:text-lg">
              {guide.summary}
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-4 font-mono text-sm text-white/90">
              <DollarSign className="h-5 w-5 text-emerald-400" />
              <span><strong>Rango promedio estimado en Colombia:</strong> {guide.averagePriceRange}</span>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={`https://wa.me/573116360057?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-mono font-bold text-black transition-all hover:bg-neutral-200"
              >
                <MessageCircle className="h-5 w-5" />
                Solicitar Cotización Personalizada
              </a>
              <Link
                href="/precios"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-mono font-bold text-white transition-colors hover:bg-white/10"
              >
                Ver todos los planes
              </Link>
            </div>
          </header>

          {/* K&T Pricing Table with Concrete Numbers */}
          {guide.ktPricingTable && guide.ktPricingTable.length > 0 && (
            <section className="mt-24">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Tabla de Precios K&T Code 2026</p>
                <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                  Precios y Plazos de Desarrollo en Colombia
                </h2>
                <p className="mt-3 font-mono text-sm text-white/65">
                  Tarifas reales y transparentes sin costos ocultos ni sorpresas.
                </p>
              </div>

              <div className="mt-10 overflow-x-auto">
                <table className="w-full min-w-[850px] border-collapse rounded-2xl border border-white/15 bg-white/[0.02] font-mono text-sm">
                  <thead>
                    <tr className="border-b border-white/15 bg-white/5 text-left text-xs uppercase text-white/60">
                      <th className="p-5">Tipo de Proyecto</th>
                      <th className="p-5">Precio K&T Desde</th>
                      <th className="p-5">Plazo Aproximado</th>
                      <th className="p-5">Qué Incluye</th>
                      <th className="p-5">Qué NO Incluye</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-white/80">
                    {guide.ktPricingTable.map((row) => (
                      <tr key={row.type} className="hover:bg-white/[0.03] transition-colors">
                        <td className="p-5 font-bold text-white">
                          <span>{row.type}</span>
                          <span className="block mt-1 text-xs font-normal text-white/50">{row.bestFor}</span>
                        </td>
                        <td className="p-5 font-bold text-emerald-400 whitespace-nowrap">{row.priceStarting}</td>
                        <td className="p-5 text-white/70 whitespace-nowrap">{row.timeline}</td>
                        <td className="p-5 text-xs leading-5 text-white/70 max-w-xs">{row.includes}</td>
                        <td className="p-5 text-xs leading-5 text-rose-300/70 max-w-xs">{row.notIncludes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Provider Comparison: Freelance vs DIY vs K&T */}
          {guide.providerComparison && guide.providerComparison.length > 0 && (
            <section className="mt-28">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Análisis del Mercado</p>
                <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                  Freelance Económico vs. Plataformas DIY vs. Agencia K&T Code
                </h2>
                <p className="mt-3 font-mono text-sm text-white/65">
                  Compara costos reales, riesgos y retorno de inversión antes de contratar.
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {guide.providerComparison.map((prov, i) => (
                  <div
                    key={prov.provider}
                    className={`rounded-3xl border p-7 flex flex-col justify-between ${
                      i === 2
                        ? "border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-neutral-950/50 shadow-2xl"
                        : "border-white/10 bg-white/[0.025]"
                    }`}
                  >
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-white/50">Opción 0{i + 1}</span>
                      <h3 className="mt-2 font-title text-xl font-bold text-white">{prov.provider}</h3>
                      <div className="my-4 rounded-xl border border-white/10 bg-white/5 p-3 font-mono text-sm text-emerald-400 font-bold">
                        {prov.priceRange}
                      </div>

                      <div className="space-y-4 font-mono text-xs leading-5">
                        <div>
                          <strong className="text-emerald-400 block mb-1">Ventajas:</strong>
                          <p className="text-white/70">{prov.pros}</p>
                        </div>
                        <div>
                          <strong className="text-rose-400 block mb-1">Desventajas / Riesgos:</strong>
                          <p className="text-white/60">{prov.cons}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-white/80">
                      <strong>Veredicto:</strong> {prov.verdict}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tech Comparison: Next.js vs WordPress vs Builders */}
          {guide.techComparison && guide.techComparison.length > 0 && (
            <section className="mt-28">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Comparativa Tecnológica</p>
                <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                  Next.js frente a WordPress y Creadores Visuales
                </h2>
              </div>

              <div className="mt-10 overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse rounded-2xl border border-white/10 bg-white/[0.02] font-mono text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-left text-xs uppercase text-white/50">
                      <th className="p-5">Criterio de Evaluación</th>
                      <th className="p-5 text-emerald-400">Next.js (K&T Code)</th>
                      <th className="p-5 text-amber-400">WordPress / Elementor</th>
                      <th className="p-5 text-white/50">Wix / Shopify DIY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/75">
                    {guide.techComparison.map((row) => (
                      <tr key={row.aspect} className="hover:bg-white/[0.02]">
                        <td className="p-5 font-bold text-white">{row.aspect}</td>
                        <td className="p-5 text-emerald-300 text-xs">{row.nextjs}</td>
                        <td className="p-5 text-amber-200/80 text-xs">{row.wordpress}</td>
                        <td className="p-5 text-white/50 text-xs">{row.builders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Colombian Payment Gateways */}
          {guide.gatewaysColombia && guide.gatewaysColombia.length > 0 && (
            <section className="mt-28">
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Pasarelas de Pago Colombia</p>
                <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                  Comisiones y Métodos: Wompi, Bold, PayU y ePayco
                </h2>
                <p className="mt-3 font-mono text-sm text-white/65">
                  Conoce cuánto cobra cada pasarela bancaria por procesar ventas con PSE, tarjetas y Nequi.
                </p>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {guide.gatewaysColombia.map((gw) => (
                  <article key={gw.name} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                    <h3 className="font-title text-xl font-bold text-white">{gw.name}</h3>
                    <div className="my-3 rounded-lg bg-white/5 p-3 font-mono text-xs font-bold text-emerald-400">
                      Comisión: {gw.commission}
                    </div>
                    <p className="font-mono text-xs text-white/70"><strong>Medios aceptados:</strong> {gw.methods}</p>
                    <p className="mt-2 font-mono text-xs text-white/55"><strong>Desembolso:</strong> {gw.payout}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Price Tiers Grid */}
          <section className="mt-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Desglose de Planes</p>
              <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                Planes y Tarifas Detalladas
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {guide.priceTiers.map((tier, idx) => (
                <div
                  key={tier.name}
                  className={`flex flex-col justify-between rounded-3xl border p-7 transition-all ${
                    idx === 1
                      ? "border-white/30 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-2xl"
                      : "border-white/10 bg-white/[0.025]"
                  }`}
                >
                  <div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/50">
                      NIVEL 0{idx + 1}
                    </span>
                    <h3 className="mt-2 font-title text-2xl font-bold text-white">{tier.name}</h3>
                    <div className="my-5 rounded-xl border border-white/10 bg-white/5 p-4">
                      <span className="block font-title text-2xl font-bold text-white">{tier.priceRange}</span>
                      <span className="mt-1 flex items-center gap-1.5 font-mono text-xs text-white/60">
                        <Clock className="h-3.5 w-3.5" /> Plazo: {tier.timeline}
                      </span>
                    </div>

                    <p className="font-mono text-xs leading-5 text-white/65">
                      <strong>Recomendado para:</strong> {tier.bestFor}
                    </p>

                    <ul className="mt-6 space-y-3 font-mono text-xs text-white/80">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <a
                      href={`https://wa.me/573116360057?text=${encodeURIComponent(`Hola K&T Code, deseo cotizar el plan "${tier.name}" para mi proyecto.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center rounded-xl bg-white/10 hover:bg-white text-white hover:text-black py-3 font-mono text-xs font-bold transition-colors"
                    >
                      Cotizar este nivel
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cost Factors */}
          <section className="mt-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Variables de Presupuesto</p>
              <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                ¿Qué factores determinan el precio final?
              </h2>
              <p className="mt-3 font-mono text-sm text-white/65">
                Elementos que aumentan o reducen el tiempo de ingeniería y la inversión requerida.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {guide.costFactors.map((factor) => (
                <article key={factor.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-title text-xl font-bold text-white">{factor.title}</h3>
                    <span
                      className={`rounded-full px-3 py-1 font-mono text-xs font-bold ${
                        factor.impact === "Alto"
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      Impacto {factor.impact}
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-sm leading-6 text-white/65">{factor.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Recurring Costs Table */}
          <section className="mt-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-sm uppercase tracking-wider text-white/60">// Costos Fijos</p>
              <h2 className="mt-3 font-title text-3xl font-bold md:text-4xl">
                Costos Recurrentes Anuales y Mensuales
              </h2>
              <p className="mt-3 font-mono text-sm text-white/65">
                Gastos reales de mantenimiento y servidores que debes tener en cuenta.
              </p>
            </div>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse rounded-2xl border border-white/10 bg-white/[0.02] font-mono text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-left text-xs uppercase text-white/50">
                    <th className="p-5">Concepto</th>
                    <th className="p-5">Costo Estimado en COP</th>
                    <th className="p-5">Frecuencia</th>
                    <th className="p-5">Detalles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/75">
                  {guide.recurringCosts.map((cost) => (
                    <tr key={cost.item} className="hover:bg-white/[0.02]">
                      <td className="p-5 font-bold text-white">{cost.item}</td>
                      <td className="p-5 text-emerald-400">{cost.estimatedCost}</td>
                      <td className="p-5 text-white/60">{cost.frequency}</td>
                      <td className="p-5 text-xs text-white/55">{cost.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* How to choose a provider */}
          <section className="mt-28 rounded-3xl border border-white/10 bg-neutral-950/70 p-8 md:p-12">
            <p className="font-mono text-sm uppercase tracking-wider text-white/55">// Consejos de Contratación</p>
            <h2 className="mt-2 font-title text-3xl font-bold md:text-4xl">
              Cómo elegir la mejor agencia de desarrollo web
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {guide.howToChoose.map((tip, index) => (
                <div key={tip.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <span className="font-mono text-xs font-bold text-white/40">0{index + 1}</span>
                  <h3 className="mt-3 font-title text-lg font-bold text-white">{tip.title}</h3>
                  <p className="mt-3 font-mono text-xs leading-6 text-white/65">{tip.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mx-auto mt-28 max-w-4xl">
            <p className="mb-3 text-center font-mono text-sm uppercase tracking-wider text-white/55">// Preguntas Frecuentes</p>
            <h2 className="text-center font-title text-3xl font-bold md:text-4xl">Dudas sobre precios y pagos</h2>
            <div className="mt-10 space-y-3">
              {guide.faqs.map((faq) => (
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

          {/* Final CTA & Link to Service */}
          <section className="mt-28 rounded-3xl border border-white/10 bg-white/[0.035] p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="font-mono text-sm text-white/55">// Da el Siguiente Paso</p>
                <h2 className="mt-2 font-title text-3xl font-bold">¿Listo para cotizar tu proyecto?</h2>
                <p className="mt-3 font-mono text-sm text-white/70">
                  Conoce en detalle nuestro <Link href={`/servicios/${guide.relatedServiceSlug}`} className="underline underline-offset-4 text-white hover:text-white/80">{guide.relatedServiceTitle}</Link> o escríbenos directamente.
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
                  Hablar con un Asesor
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
