import type { Metadata } from "next"
import Link from "next/link"
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Code2, 
  DollarSign, 
  Globe2, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  ExternalLink,
  Laptop,
  Check,
  X
} from "lucide-react"
import Footer from "@/components/layout/footer"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Nearshore Web Development Colombia for US Companies | K&T Code",
  description:
    "Hire senior Next.js, React & TypeScript web developers in Colombia. 100% US time zone overlap, bilingual engineers, and 50-70% cost savings for US businesses.",
  keywords: [
    "nearshore web development colombia",
    "web development company Colombia",
    "nearshore software developers Colombia",
    "Next.js development company Colombia",
    "Colombian web development agency",
    "hire web developers Colombia",
    "Colombian engineering team for US companies",
    "nearshore software development latam",
  ],
  alternates: {
    canonical: absoluteUrl("/en/nearshore-web-development-colombia"),
    languages: {
      en: absoluteUrl("/en/nearshore-web-development-colombia"),
      "en-US": absoluteUrl("/en/nearshore-web-development-colombia"),
      "es-CO": absoluteUrl("/servicios/desarrollo-web-a-medida"),
      es: absoluteUrl("/servicios/desarrollo-web-a-medida"),
      "x-default": absoluteUrl("/en/nearshore-web-development-colombia"),
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Nearshore Web Development Colombia for US Companies | K&T Code",
    description:
      "Elite Colombian engineering team for US companies. Next.js 15, React 19, TypeScript & Headless E-commerce built in your time zone with 50-70% cost efficiency.",
    url: absoluteUrl("/en/nearshore-web-development-colombia"),
    siteName: "K&T Code",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.kytcode.lat/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Nearshore Web Development Colombia - K&T Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nearshore Web Development Colombia for US Companies | K&T Code",
    description:
      "Hire top Colombian software developers for your US company. EST/CST time zone alignment, Next.js architecture, and direct USD billing.",
    images: ["https://www.kytcode.lat/opengraph-image.png"],
  },
}

export default function NearshoreColombiaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.kytcode.lat/#organization",
    "name": "K&T Code — Nearshore Web Development Colombia",
    "url": "https://www.kytcode.lat/en/nearshore-web-development-colombia",
    "logo": "https://www.kytcode.lat/opengraph-image.png",
    "image": "https://www.kytcode.lat/opengraph-image.png",
    "telephone": "+573116360057",
    "email": "contacto@kytcode.lat",
    "priceRange": "$$ (USD 35 - USD 65 / hr)",
    "currenciesAccepted": "USD, EUR, COP",
    "paymentAccepted": "ACH Transfer, Wire Transfer, Stripe, Credit Card",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "San José de Cúcuta",
      "addressLocality": "San José de Cúcuta",
      "addressRegion": "Norte de Santander",
      "addressCountry": "CO"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country",
        "name": "Canada"
      },
      {
        "@type": "Country",
        "name": "Colombia"
      }
    ],
    "description": "Premier Colombian nearshore software engineering company delivering high-performance Next.js web applications, headless commerce, and dedicated engineering squads for US tech companies."
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why hire a nearshore web development company in Colombia instead of domestic US agencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Colombia offers world-class engineering talent operating in the exact same time zone as the US (EST/CST) at 50% to 70% lower cost than domestic US software agencies. You get full workday collaboration, bilingual senior engineers, and clean, enterprise-grade Next.js and React code without the prohibitive $180-$250/hr overhead of American consultancies."
        }
      },
      {
        "@type": "Question",
        "name": "How does time zone alignment work between the US and Colombia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Colombia operates in UTC-5 (GMT-5). This perfectly mirrors US Eastern Standard Time (EST) during winter months, and aligns directly with Central Standard Time (CST) during daylight saving time. Our engineers attend your daily standups in real-time, pair program during your working hours, and resolve production items without overnight delays."
        }
      },
      {
        "@type": "Question",
        "name": "What tech stack does K&T Code specialize in for US clients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in modern, high-performance web stacks: Next.js 15 (App Router, Server Components), React 19, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Supabase, and Vercel Edge infrastructure. We also build headless e-commerce integrations using Shopify Storefront API and WooCommerce REST."
        }
      },
      {
        "@type": "Question",
        "name": "How do contracts, invoicing, and intellectual property work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide simple, transparent international service agreements with mutual Non-Disclosure Agreements (NDAs). 100% of all intellectual property, source code, and assets belong exclusively to your company upon payment. We accept USD payments via ACH bank transfer, international wire, or Stripe."
        }
      },
      {
        "@type": "Question",
        "name": "What is the typical ramp-up or start time for a nearshore project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We can initiate technical discovery within 24 to 48 hours. For fixed-scope projects, architecture and sprint kickoff typically happen within 5 to 7 business days. For dedicated engineers, onboarding into your Slack and GitHub repos can take place within one week."
        }
      }
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.kytcode.lat/en"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Nearshore Web Development Colombia",
        "item": "https://www.kytcode.lat/en/nearshore-web-development-colombia"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle Background Glow & Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" className="mb-8 font-mono text-xs text-neutral-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/en" className="hover:text-white transition-colors">
                  Home (EN)
                </Link>
              </li>
              <li>/</li>
              <li className="text-blue-400 font-bold" aria-current="page">
                Nearshore Web Development Colombia
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <header className="mb-20 text-center lg:text-left">
            <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-xs mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span>US Time Zone Aligned (EST / CST) • Colombia Engineering Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-title leading-tight tracking-tight mb-6 text-white max-w-4xl">
              Top Nearshore Web Development Company in Colombia for US Businesses
            </h1>

            <p className="font-mono text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed mb-8">
              Scale your development velocity with senior Colombian software engineers. Full workday overlap with New York, Miami, Austin, and San Francisco, enterprise-grade Next.js architectures, and 50% to 70% cost savings compared to domestic US agencies.
            </p>

            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-12">
              <a
                href="https://wa.me/573116360057?text=Hi%20K%26T%20Code%20team,%20I'm%20interested%20in%20nearshore%20web%20development%20for%20our%20US%20company."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-black font-mono font-bold text-sm hover:bg-neutral-200 transition-all shadow-xl hover:scale-[1.02]"
              >
                Schedule a 15-Min Intro Call <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="#comparison"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/20 bg-white/5 font-mono text-sm text-white hover:bg-white/10 transition-all"
              >
                Compare Nearshore vs. US Domestic
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-title">100%</div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">EST / CST Overlap</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-title">50-70%</div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">Cost Savings</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-title">&lt; 800ms</div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">Average Page LCP</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-400 font-title">Bilingual</div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-1">Tech Leads & PMs</div>
              </div>
            </div>
          </header>

          {/* Strategic Advantages Section */}
          <section aria-labelledby="section-nearshore-advantages" className="mb-24">
            <div className="text-center md:text-left mb-12">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">// The Colombia Advantage</span>
              <h2 id="section-nearshore-advantages" className="text-2xl sm:text-4xl font-bold font-title text-white mt-2">
                Why US Tech Leaders Choose Colombian Nearshore Engineering Over Offshore
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-blue-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-title text-white mb-3">
                  Same-Day, Real-Time Time Zone Collaboration
                </h3>
                <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                  Colombia operates in GMT-5, identical to US Eastern Standard Time (EST) and just 1 hour ahead of Central Time (CST). Unlike outsourcing to India or Eastern Europe, there are no 12-hour overnight latency cycles. Your Colombian engineering team joins daily standups, pairs on Slack, and deploys during your working hours.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-title text-white mb-3">
                  50% to 70% Budget Optimization Without Code Compromise
                </h3>
                <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                  US software agencies charge between $150 and $250+ per hour for mid-level work. By partnering with K&T Code in Colombia, US tech founders and marketing executives obtain senior-level full-stack architects at rates between $35 and $65/hr — tripling your feature delivery runway on the exact same budget.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-purple-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-title text-white mb-3">
                  Modern Stack Specialists: Next.js 15, React 19 & TypeScript
                </h3>
                <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                  We don't build generic WordPress or dated spaghetti code. Our team builds strictly with Next.js App Router, Server Components, TypeScript, Tailwind CSS, Supabase, and Vercel Edge. We engineer lightning-fast digital assets scoring 95+ on Google Lighthouse with clean architectural documentation.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-amber-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-title text-white mb-3">
                  Direct US Contracts, IP Protection & Frictionless USD Billing
                </h3>
                <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                  Protect your enterprise with standard mutual NDAs and full intellectual property assignment from sprint one. We invoice directly in USD via ACH transfer, domestic US wire, or Stripe, eliminating international exchange headaches and foreign payroll complications.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Matrix Section */}
          <section id="comparison" aria-labelledby="section-comparison" className="mb-24 scroll-mt-28">
            <div className="text-center md:text-left mb-10">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">// Direct Comparison</span>
              <h2 id="section-comparison" className="text-2xl sm:text-4xl font-bold font-title text-white mt-2">
                K&T Code Colombia vs. US Domestic Agencies vs. Traditional Offshore
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
              <table className="w-full text-left font-mono text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="p-4 sm:p-5 font-bold text-white">Criterion</th>
                    <th className="p-4 sm:p-5 font-bold text-blue-400 bg-blue-500/10">K&T Code (Colombia Nearshore)</th>
                    <th className="p-4 sm:p-5 font-bold text-neutral-300">US Domestic Agencies</th>
                    <th className="p-4 sm:p-5 font-bold text-neutral-300">Offshore (India / East Europe)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-4 sm:p-5 text-white font-bold">Time Zone Overlap</td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-blue-500/5">Full (6-8 hrs/day EST/CST)</td>
                    <td className="p-4 sm:p-5 text-neutral-300">Full (6-8 hrs/day)</td>
                    <td className="p-4 sm:p-5 text-rose-400">Minimal (0-2 hrs/day, 12h lag)</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 text-white font-bold">Average Hourly Rate</td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-blue-500/5">$35 - $65 / hr</td>
                    <td className="p-4 sm:p-5 text-rose-400">$150 - $250+ / hr</td>
                    <td className="p-4 sm:p-5 text-neutral-300">$25 - $45 / hr</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 text-white font-bold">Tech Stack Currency</td>
                    <td className="p-4 sm:p-5 text-white font-bold bg-blue-500/5">Next.js 15, React 19, TypeScript</td>
                    <td className="p-4 sm:p-5 text-neutral-300">High (varies by firm)</td>
                    <td className="p-4 sm:p-5 text-neutral-400">Mixed / Legacy codebases</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 text-white font-bold">Communication & Agility</td>
                    <td className="p-4 sm:p-5 text-white font-bold bg-blue-500/5">Bilingual, Live Slack & Daily Standups</td>
                    <td className="p-4 sm:p-5 text-neutral-300">Native English, high bureaucracy</td>
                    <td className="p-4 sm:p-5 text-rose-400">Asymmetric, ticket-only delay</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 text-white font-bold">Code Quality (Lighthouse)</td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-blue-500/5">95+ Guaranteed Scores</td>
                    <td className="p-4 sm:p-5 text-neutral-300">80 - 95</td>
                    <td className="p-4 sm:p-5 text-rose-400">Often under 60</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 text-white font-bold">Contracts & Payments</td>
                    <td className="p-4 sm:p-5 text-white font-bold bg-blue-500/5">USD Invoicing (ACH / Wire / Stripe)</td>
                    <td className="p-4 sm:p-5 text-neutral-300">USD Domestic</td>
                    <td className="p-4 sm:p-5 text-neutral-400">Currency & escrow overhead</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Capabilities Grid */}
          <section aria-labelledby="section-capabilities" className="mb-24">
            <div className="text-center md:text-left mb-12">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">// Technical Services</span>
              <h2 id="section-capabilities" className="text-2xl sm:text-4xl font-bold font-title text-white mt-2">
                Core Nearshore Web Development Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 font-mono font-bold">
                  01
                </div>
                <h3 className="text-lg font-bold font-title text-white mb-2">
                  Next.js & React Full-Stack Platforms
                </h3>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed mb-4 flex-grow">
                  Engineered with Server Components, TypeScript, and edge rendering for lightning-fast speeds and high organic conversion.
                </p>
                <ul className="space-y-1.5 font-mono text-xs text-neutral-300 pt-4 border-t border-white/5">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400 shrink-0" /> App Router Architecture</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Semantic SEO & JSON-LD</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Micro-Interactions (Framer)</li>
                </ul>
              </article>

              <article className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-mono font-bold">
                  02
                </div>
                <h3 className="text-lg font-bold font-title text-white mb-2">
                  Headless E-Commerce & Migrations
                </h3>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed mb-4 flex-grow">
                  Decouple slow Shopify or WordPress backends into custom Next.js frontends to slash page load times and boost checkout conversions.
                </p>
                <ul className="space-y-1.5 font-mono text-xs text-neutral-300 pt-4 border-t border-white/5">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Shopify Storefront API</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> WooCommerce Headless</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Instant Search & Filters</li>
                </ul>
              </article>

              <article className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 font-mono font-bold">
                  03
                </div>
                <h3 className="text-lg font-bold font-title text-white mb-2">
                  Dedicated Staff Augmentation
                </h3>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed mb-4 flex-grow">
                  Embed full-time or part-time senior Colombian developers directly into your existing engineering squad, GitHub repositories, and sprint cycles.
                </p>
                <ul className="space-y-1.5 font-mono text-xs text-neutral-300 pt-4 border-t border-white/5">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Pre-vetted Senior Engineers</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Daily Standups & Slack Sync</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Zero Long-Term Lock-in</li>
                </ul>
              </article>
            </div>
          </section>

          {/* Real Production Case Studies */}
          <section aria-labelledby="section-case-studies" className="mb-24">
            <div className="text-center md:text-left mb-10">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">// Proven Track Record</span>
              <h2 id="section-case-studies" className="text-2xl sm:text-4xl font-bold font-title text-white mt-2">
                Production Platforms Engineered by K&T Code
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Telas Real */}
              <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Headless E-Commerce B2B
                    </span>
                    <span className="text-xs font-mono text-neutral-500">Dec 2025</span>
                  </div>
                  <h3 className="text-2xl font-bold font-title text-white mb-2">Telas Real</h3>
                  <p className="font-mono text-sm text-neutral-400 mb-6">
                    Migrated a legacy monolithic store with +850 products to Next.js 15 App Router. Slashed loading times by 85% and increased wholesale quotations by 64%.
                  </p>
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-black/60 border border-white/5 font-mono mb-6 text-center">
                    <div>
                      <div className="text-xs text-neutral-500">Lighthouse</div>
                      <div className="text-emerald-400 font-bold text-base">97 / 100</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Load Time</div>
                      <div className="text-white font-bold text-base">780 ms</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Conversion</div>
                      <div className="text-blue-400 font-bold text-base">+64%</div>
                    </div>
                  </div>
                </div>
                <Link 
                  href="/projects/telas-real" 
                  className="inline-flex items-center gap-2 text-sm font-mono text-white hover:text-blue-400 transition-colors"
                >
                  Read Full Case Study <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* GMX Gaming */}
              <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      Gaming & Esports Platform
                    </span>
                    <span className="text-xs font-mono text-neutral-500">Mar 2026</span>
                  </div>
                  <h3 className="text-2xl font-bold font-title text-white mb-2">GMX Gaming Platform</h3>
                  <p className="font-mono text-sm text-neutral-400 mb-6">
                    Full custom esports tournament platform with automated brackets and registration engine, migrating away from legacy WordPress limitations.
                  </p>
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-black/60 border border-white/5 font-mono mb-6 text-center">
                    <div>
                      <div className="text-xs text-neutral-500">Lighthouse</div>
                      <div className="text-emerald-400 font-bold text-base">98 / 100</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">LCP Speed</div>
                      <div className="text-white font-bold text-base">590 ms</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Automation</div>
                      <div className="text-purple-400 font-bold text-base">+85%</div>
                    </div>
                  </div>
                </div>
                <Link 
                  href="/projects/gmx-gaming" 
                  className="inline-flex items-center gap-2 text-sm font-mono text-white hover:text-purple-400 transition-colors"
                >
                  Read Full Case Study <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Engagement Models & Pricing Overview */}
          <section aria-labelledby="section-engagement-models" className="mb-24">
            <div className="text-center md:text-left mb-10">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">// Engagement Models</span>
              <h2 id="section-engagement-models" className="text-2xl sm:text-4xl font-bold font-title text-white mt-2">
                Flexible Collaboration Designed for US Companies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-lg font-bold font-title text-white mb-2">Dedicated Developer Squad</h3>
                <p className="font-mono text-xs text-neutral-400 mb-4">
                  Full-time or part-time senior engineers embedded into your team.
                </p>
                <div className="font-mono text-2xl font-bold text-white mb-4">
                  $35 – $55 <span className="text-xs text-neutral-400 font-normal">/ hour</span>
                </div>
                <ul className="space-y-2 font-mono text-xs text-neutral-300">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Direct Slack & GitHub access</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> 160 hours / month full-time</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Bi-weekly USD invoicing</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl border-2 border-blue-500/40 bg-blue-500/[0.03] relative">
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-blue-500 text-black font-mono font-bold text-[10px] uppercase">
                  Most Popular
                </div>
                <h3 className="text-lg font-bold font-title text-white mb-2">Fixed-Scope Project Delivery</h3>
                <p className="font-mono text-xs text-neutral-400 mb-4">
                  Turnkey web platform delivery with guaranteed timeline & deliverables.
                </p>
                <div className="font-mono text-2xl font-bold text-white mb-4">
                  $1,200 – $6,500 <span className="text-xs text-neutral-400 font-normal">/ project</span>
                </div>
                <ul className="space-y-2 font-mono text-xs text-neutral-300">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Fixed deliverables & roadmap</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> 50/50 or milestone payments</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Complete source code & warranty</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-lg font-bold font-title text-white mb-2">Performance & Speed Sprint</h3>
                <p className="font-mono text-xs text-neutral-400 mb-4">
                  Rapid 2-week sprint to eliminate technical debt and hit 95+ Core Web Vitals.
                </p>
                <div className="font-mono text-2xl font-bold text-white mb-4">
                  $950 – $2,200 <span className="text-xs text-neutral-400 font-normal">/ sprint</span>
                </div>
                <ul className="space-y-2 font-mono text-xs text-neutral-300">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> LCP, CLS & INP audit & fixes</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Next.js & bundle optimization</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-blue-400" /> Before/After Lighthouse proof</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section aria-labelledby="section-faq" className="mb-24">
            <div className="text-center md:text-left mb-10">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">// FAQ</span>
              <h2 id="section-faq" className="text-2xl sm:text-4xl font-bold font-title text-white mt-2">
                Frequently Asked Questions About Nearshoring to Colombia
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-base sm:text-lg font-bold font-title text-white mb-2">
                  Why choose a Colombian nearshore web development agency over domestic US developers?
                </h3>
                <p className="font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Colombia provides top-tier software engineers operating in the exact same time zone as New York, Miami, and Chicago (EST/CST). You gain identical real-time collaboration, daily agile standups, and bilingual communication, but at 50% to 70% lower hourly costs than domestic US agencies.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-base sm:text-lg font-bold font-title text-white mb-2">
                  How are international contracts, NDAs, and code ownership handled?
                </h3>
                <p className="font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Every engagement starts with a mutual Non-Disclosure Agreement (NDA). All deliverables, Git repositories, architectures, and intellectual property (IP) belong 100% to your company upon payment without recurring royalties or vendor lock-in.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-base sm:text-lg font-bold font-title text-white mb-2">
                  What payment methods are supported for US clients?
                </h3>
                <p className="font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  We invoice in USD. Payments are accepted via US ACH transfer, international SWIFT/Wire transfer, Stripe, or major credit cards. Invoices include standard corporate tax details for seamless accounting.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-base sm:text-lg font-bold font-title text-white mb-2">
                  How fast can we kick off a project?
                </h3>
                <p className="font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  We can schedule an introductory technical call within 24 to 48 hours. Following our initial scope review, we deliver a formal proposal within 2 business days and can begin sprint zero immediately upon approval.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action Banner */}
          <section className="p-8 sm:p-12 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-950/40 via-black to-black text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none" />
            
            <h2 className="text-2xl sm:text-4xl font-bold font-title text-white mb-4 relative z-10">
              Ready to Accelerate Your Development with Colombian Engineers?
            </h2>
            <p className="font-mono text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mb-8 relative z-10">
              Let&apos;s discuss your roadmap, review your architecture, and provide a transparent quote within 24 hours. No sales friction — speak directly with our engineering team.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <a
                href="https://wa.me/573116360057?text=Hello%20K%26T%20Code,%20I'd%20like%20to%20discuss%20a%20nearshore%20development%20project%20for%20our%20company."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-mono font-bold text-sm hover:bg-neutral-200 transition-all shadow-xl hover:scale-[1.02]"
              >
                Chat on WhatsApp (+57 311 6360057) <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:contacto@kytcode.lat?subject=Nearshore%20Web%20Development%20Inquiry%20from%20US"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 bg-white/5 font-mono text-sm text-white hover:bg-white/10 transition-all"
              >
                Email Us: contacto@kytcode.lat
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
