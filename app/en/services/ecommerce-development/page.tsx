import type { Metadata } from "next"
import Link from "next/link"
import {
  ChevronRight,
  ShoppingCart,
  Zap,
  CreditCard,
  Truck,
  ShieldCheck,
  Check,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
} from "lucide-react"

import Footer from "@/components/layout/footer"
import JsonLd from "@/components/seo/json-ld"
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Headless E-commerce & Online Store Development",
  description:
    "Custom virtual stores and headless e-commerce engineered with Next.js, Stripe, PayPal, Wompi, and automated logistics. Fast, secure, and built for scaling businesses in Colombia, the US, and worldwide.",
  keywords: [
    "ecommerce development agency",
    "headless ecommerce next.js",
    "online store development",
    "custom shopify nextjs",
    "virtual store colombia",
    "wompi stripe integration",
  ],
  alternates: {
    canonical: absoluteUrl("/en/services/ecommerce-development"),
    languages: {
      "en-US": absoluteUrl("/en/services/ecommerce-development"),
      en: absoluteUrl("/en/services/ecommerce-development"),
      es: absoluteUrl("/servicios/tiendas-virtuales"),
      "es-CO": absoluteUrl("/servicios/tiendas-virtuales"),
      "x-default": absoluteUrl("/servicios/tiendas-virtuales"),
    },
  },
  openGraph: {
    title: "Headless E-commerce & Online Store Development | K&T Code",
    description:
      "High-performance virtual stores with catalog management, seamless payment gateways, inventory control, and automated shipping.",
    url: absoluteUrl("/en/services/ecommerce-development"),
    siteName: "K&T Code",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Headless E-commerce & Online Store Development | K&T Code",
    description:
      "High-performance virtual stores with catalog management, seamless payment gateways, and inventory control.",
  },
}

const faqs = [
  {
    question: "What payment gateways can be integrated?",
    answer: "We integrate leading global and regional payment gateways, including Stripe, PayPal, Wompi (Bancolombia, PSE, Nequi), Bold, PayU, and Mercado Pago, configured for your business currency and country.",
  },
  {
    question: "How does the administration dashboard work?",
    answer: "You receive an intuitive back-office dashboard to add/edit products, manage stock in real time, view customer orders, manage discounts, and update shipping rates without touching any code.",
  },
  {
    question: "What is the delivery timeline for an online store?",
    answer: "Standard e-commerce projects require 25 to 40 business days, depending on catalog size, custom integrations, and payment processor approvals.",
  },
  {
    question: "Do you provide training once the store is ready?",
    answer: "Yes. Every virtual store delivery includes a live 1-on-1 walkthrough training session and video documentation so your team can easily manage day-to-day operations, products, and fulfillment.",
  },
]

export default function EnglishEcommercePage() {
  const whatsappMsg = encodeURIComponent("Hello K&T Code, I'm interested in getting a quote for an online store / e-commerce development.")

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/en" },
            { name: "Services", path: "/en/services" },
            { name: "E-commerce Development", path: "/en/services/ecommerce-development" },
          ]),
          buildFaqJsonLd(faqs),
        ]}
      />

      <main className="relative min-h-screen overflow-hidden bg-black pb-24 pt-32 text-white selection:bg-white selection:text-black">
        {/* Ambient background light */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:54px_54px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-full max-w-5xl -translate-x-1/2 rounded-full bg-cyan-500/[0.05] blur-[140px]" />

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
              <li aria-current="page" className="text-white font-medium">E-commerce Development</li>
            </ol>
          </nav>

          {/* Hero Section */}
          <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 font-mono text-xs text-cyan-400 mb-6">
                <Sparkles className="h-3.5 w-3.5" /> Next-Generation Headless E-commerce
              </div>
              <h1 className="max-w-4xl font-title text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
                Custom E-commerce Stores Engineered for High Volume & Speed
              </h1>
              <p className="mt-6 max-w-2xl font-mono text-base leading-relaxed text-neutral-300 md:text-lg">
                Move beyond slow, bloated template stores. We engineer headless online stores with Next.js that load in milliseconds, handle high traffic surges, and convert visitors into loyal customers.
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
                  <span>25–40 Business Days</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>From $450 USD ($1.300.000 COP)</span>
                </div>
              </div>
            </div>

            {/* Core Capability Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <ShoppingCart className="h-6 w-6 text-cyan-400 mb-4" />
                <h2 className="font-title text-lg font-bold">Intuitive Catalog</h2>
                <p className="mt-2 font-mono text-xs text-neutral-400 leading-relaxed">
                  Fast multi-attribute filtering (colors, sizes, brands) with instant search and zero page reloads.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <CreditCard className="h-6 w-6 text-emerald-400 mb-4" />
                <h2 className="font-title text-lg font-bold">Secure Gateways</h2>
                <p className="mt-2 font-mono text-xs text-neutral-400 leading-relaxed">
                  Checkout integration with Stripe, PayPal, Wompi, Bold, or local bank transfers with fraud prevention.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <Truck className="h-6 w-6 text-amber-400 mb-4" />
                <h2 className="font-title text-lg font-bold">Automated Logistics</h2>
                <p className="mt-2 font-mono text-xs text-neutral-400 leading-relaxed">
                  Real-time shipping rate calculation, tracking notifications, and courier API dispatching.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <Layers className="h-6 w-6 text-purple-400 mb-4" />
                <h2 className="font-title text-lg font-bold">Admin Dashboard & Training</h2>
                <p className="mt-2 font-mono text-xs text-neutral-400 leading-relaxed">
                  Centralized control of stock, orders, customers, plus a 1-on-1 live training session for your team.
                </p>
              </div>
            </div>
          </section>

          {/* Scope of Deliverables */}
          <section className="mt-28">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-2">// Complete Delivery Scope</p>
              <h2 className="font-title text-3xl md:text-4xl font-bold">Everything Needed to Sell Online Confidently</h2>
              <p className="mt-3 font-mono text-sm text-neutral-400">
                Engineered for maximum stability, fast checkout, and straightforward inventory management.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-title text-lg font-bold text-white mb-3">Front Store & UX</h3>
                <ul className="space-y-3 font-mono text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Responsive product catalog and categorization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Interactive shopping cart with slide-out drawer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Instant coupon codes and promotional rules</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-title text-lg font-bold text-white mb-3">Payments & Shipping</h3>
                <ul className="space-y-3 font-mono text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Multi-currency support and encrypted checkout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Domestic and international shipping calculation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Automated customer order confirmation emails</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="font-title text-lg font-bold text-white mb-3">Management & Handover</h3>
                <ul className="space-y-3 font-mono text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Intuitive back-office dashboard for products & stock</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>1-on-1 live training session and video guides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Warranty period and technical support after launch</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mt-28 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <HelpCircle className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <h2 className="font-title text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="mt-2 font-mono text-xs text-neutral-400">Common questions about our e-commerce architecture.</p>
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
            <h2 className="font-title text-3xl md:text-4xl font-bold">Ready to Build Your Scalable Online Store?</h2>
            <p className="mt-4 font-mono text-sm text-neutral-300 max-w-xl mx-auto">
              Get an accurate estimate and technical roadmap. Transparent pricing starting at $450 USD ($1.300.000 COP) with full ownership.
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
