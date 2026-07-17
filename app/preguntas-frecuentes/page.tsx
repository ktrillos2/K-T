import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { generalFaqs } from "@/lib/general-faqs"
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Preguntas frecuentes sobre desarrollo web",
  description:
    "Respuestas claras sobre precios, tiempos, SEO, mantenimiento, tiendas virtuales y desarrollo de páginas web en Colombia.",
  alternates: { canonical: absoluteUrl("/preguntas-frecuentes") },
  openGraph: {
    title: "Preguntas frecuentes sobre desarrollo web | K&T Code",
    description:
      "Aclara dudas sobre costos, procesos, tecnologías, SEO y mantenimiento antes de iniciar tu proyecto web.",
    url: absoluteUrl("/preguntas-frecuentes"),
    type: "website",
  },
}

export default function FrequentlyAskedQuestionsPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
          ]),
          buildFaqJsonLd(generalFaqs),
        ]}
      />

      <main className="min-h-screen bg-background px-6 pb-24 pt-32">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Migas de pan" className="mb-8 font-mono text-sm text-white/55">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span aria-hidden="true"> / </span>
            <span>Preguntas frecuentes</span>
          </nav>

          <header className="max-w-4xl">
            <p className="font-mono text-sm text-primary">// Antes de comenzar</p>
            <h1 className="mt-4 font-title text-4xl font-bold leading-tight text-white md:text-6xl">
              Preguntas frecuentes sobre páginas web y software a medida
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              Respuestas directas para entender el proceso, los costos recurrentes, el alcance técnico y lo que debes revisar antes de contratar un proyecto digital.
            </p>
          </header>

          <section className="mt-14 space-y-4" aria-label="Preguntas y respuestas">
            {generalFaqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 open:border-white/25">
                <summary className="cursor-pointer list-none pr-8 font-title text-lg font-semibold text-white marker:hidden">
                  {faq.question}
                  <span aria-hidden="true" className="float-right font-mono text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-4xl font-mono text-sm leading-7 text-white/65">{faq.answer}</p>
              </details>
            ))}
          </section>

          <section className="mt-16 rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
            <h2 className="font-title text-3xl font-bold text-white">¿Tu proyecto necesita una respuesta más específica?</h2>
            <p className="mt-4 max-w-2xl text-white/65">
              Cuéntanos el objetivo, las funciones necesarias y el presupuesto aproximado para preparar una orientación inicial.
            </p>
            <Link href="/#contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono font-bold text-black">
              Solicitar orientación <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
