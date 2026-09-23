import type { Metadata } from "next"
import Link from "next/link"
import {
  ChevronRight,
  Zap,
  Smartphone,
  Search,
  ShieldCheck,
  Check,
  X,
  MessageCircle,
  ArrowRight,
  Sparkles,
  BarChart3,
  HelpCircle,
} from "lucide-react"

import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "High-Converting Landing Pages",
  description:
    "Custom landing page design and development engineered for maximum speed. Fast loading, mobile-first, WhatsApp & CRM integrations for businesses in the US, Latin America, and globally.",
  keywords: [
    "landing page development",
    "high conversion landing page",
    "fast landing page colombia",
    "custom landing page design",
    "whatsapp lead generation page",
  ],
  alternates: {
    canonical: absoluteUrl("/en/services/landing-pages"),
    languages: {
      "en-US": absoluteUrl("/en/services/landing-pages"),
      en: absoluteUrl("/en/services/landing-pages"),
      es: absoluteUrl("/servicios/landing-pages"),
      "es-CO": absoluteUrl("/servicios/landing-pages"),
      "x-default": absoluteUrl("/servicios/landing-pages"),
    },
  },
  openGraph: {
    title: "High-Converting Landing Pages | K&T Code",
    description:
      "Engineered for sub-second speeds, mobile responsiveness, and high conversion rates. Serving national and international clients.",
    url: absoluteUrl("/en/services/landing-pages"),
    siteName: "K&T Code",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "High-Converting Landing Pages | K&T Code",
    description:
      "Engineered for sub-second speeds, mobile responsiveness, and high conversion rates.",
  },
}

const faqs = [
  {
    question: "How long does it take to deliver a custom landing page?",
    answer: "Our standard delivery timeline is 7 to 12 business days from the moment initial branding assets and brief are approved.",
  },
  {
    question: "What is included in the landing page development service?",
    answer: "Every landing page includes responsive design, contact/lead capture forms, direct WhatsApp chat integration, analytics & conversion event tracking (Google Tag Manager / GA4 / Meta Pixel), Core Web Vitals optimization, and deployment on Edge CDN.",
  },
  {
    question: "Do you work with international clients outside Colombia?",
    answer: "Yes. K&T Code is based in Colombia and regularly engineers digital solutions for clients across the United States, Latin America, and Europe with remote onboarding and international payment methods.",
  },
  {
    question: "Can I connect my landing page to a CRM or email marketing tool?",
    answer: "Yes, we integrate forms with webhook endpoints, HubSpot, Mailchimp, ActiveCampaign, Google Sheets, or custom backend APIs according to your requirements.",
  },
]

export default function EnglishLandingPagesPage() {
  const whatsappMsg = encodeURIComponent("Hello K&T Code, I'm interested in getting a quote for a custom landing page.")

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/en" },
            { name: "Services", path: "/en/services" },
            { name: "Landing Pages", path: "/en/services/landing-pages" },
          ]),
          buildFaqJsonLd(faqs),
        ]}
      />

      <main className="relative min-h-screen overflow-hidden bg-black pb-24 pt-32 text-white selection:bg-white selection:text-black">
        {/* Ambient background light */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:54px_54px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-emerald-500/[0.05] blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-10 font-mono text-xs text-white/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/en" className="transition-colors hover:text-white">Home</Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5 text-white/40" /></li>
              <li>
                <Link href="/en/services" className="transition-colors hover:text-white">Services</Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5 text-white/40" /></li>
              <li aria-current="page" className="text-white font-medium">Landing Pages</li>
            </ol>
          </nav>

          {/* Hero Section */}
          <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-xs text-emerald-400 mb-6">
                <Sparkles className="h-3.5 w-3.5" /> High-Conversion Web Architecture
              </div>
              <h1 className="max-w-4xl font-title text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
                High-Converting Landing Pages Engineered for Maximum ROI
              </h1>
              <p className="mt-6 max-w-2xl font-mono text-base leading-relaxed text-neutral-300 md:text-lg">
                We develop ultra-fast, mobile-optimized landing pages with Edge CDN architecture. Designed specifically for Google Ads, Meta Ads, and direct lead generation from Colombia to clients worldwide.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`https://wa.me/573116360057?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-mono font-bold text-sm text-black transition-all hover:bg-neutral-200"
                >
                  <MessageCircle className="h-4 w-4" /> Quote via WhatsApp
                </a>
                <Link
                  href="/en/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-mono font-bold text-sm text-white transition-colors hover:bg-white/10"
                >
                  Request a Project Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-6 font-mono text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>7–12 Business Days</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>From $200 USD ($450.000 COP)</span>
                </div>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <Zap className="h-6 w-6 text-emerald-400 mb-4" />
                <h2 className="font-title text-lg font-bold">Sub-Second Speed</h2>
                <p className="mt-2 font-mono text-xs text-neutral-400 leading-relaxed">
                  Built with Static Site Generation for immediate load times, lowering ad bounce rates and improving Quality Scores.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <Smartphone className="h-6 w-6 text-cyan-400 mb-4" />
                <h2 className="font-title text-lg font-bold">Mobile-First Gestures</h2>
                <p className="mt-2 font-mono text-xs text-neutral-400 leading-relaxed">
                  Fluid touch experience with finger swipe carousels and instant CTA interaction on smartphones.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <BarChart3 className="h-6 w-6 text-amber-400 mb-4" />
                <h2 className="font-title text-lg font-bold">Campaign Measurement</h2>
                <p className="mt-2 font-mono text-xs text-neutral-400 leading-relaxed">
                  Clean tracking for WhatsApp clicks, form submissions, and conversion events without double-counting.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <ShieldCheck className="h-6 w-6 text-purple-400 mb-4" />
                <h2 className="font-title text-lg font-bold">Direct CRM Sync</h2>
                <p className="mt-2 font-mono text-xs text-neutral-400 leading-relaxed">
                  Webhook dispatching to email, WhatsApp notifications, Google Sheets, or enterprise CRM databases.
                </p>
              </div>
            </div>
          </section>

          {/* Scope & Deliverables */}
          <section className="mt-28">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-2">// Service Scope</p>
              <h2 className="font-title text-3xl md:text-4xl font-bold">What is Included in Every Landing Page</h2>
              <p className="mt-3 font-mono text-sm text-neutral-400">
                A complete turn-key solution with zero bloatware or unmaintained plugins.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-title text-lg font-bold text-white mb-3">Conversion Architecture</h3>
                <ul className="space-y-3 font-mono text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Single-goal layout focusing on your core offer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Dynamic WhatsApp floating action buttons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Validated multi-step or single-step lead forms</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-title text-lg font-bold text-white mb-3">Technical SEO & Speed</h3>
                <ul className="space-y-3 font-mono text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Core Web Vitals green scores (LCP, CLS, INP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Schema.org structured data markup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Full responsive optimization across all screen sizes</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-title text-lg font-bold text-white mb-3">Deployment & Analytics</h3>
                <ul className="space-y-3 font-mono text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Edge CDN hosting with SSL certificate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>GA4 & Meta Pixel event implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Custom domain connection and DNS setup</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="mt-28 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <HelpCircle className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <h2 className="font-title text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="mt-2 font-mono text-xs text-neutral-400">Everything you need to know before starting your project.</p>
            </div>

            <div className="space-y-4 font-mono text-sm">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="font-bold text-white mb-2">{faq.question}</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Banner */}
          <section className="mt-28 rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.05] to-transparent p-10 text-center">
            <h2 className="font-title text-3xl md:text-4xl font-bold">Ready to Launch Your High-Converting Landing Page?</h2>
            <p className="mt-4 font-mono text-sm text-neutral-300 max-w-xl mx-auto">
              Get an accurate quote in under 24 hours. Transparent pricing starting at $200 USD ($450.000 COP) with zero hidden fees.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`https://wa.me/573116360057?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-mono font-bold text-sm text-black hover:bg-neutral-200"
              >
                <MessageCircle className="h-4 w-4" /> Quote via WhatsApp
              </a>
              <Link
                href="/en/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-mono font-bold text-sm text-white hover:bg-white/10"
              >
                View Contact Form
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
