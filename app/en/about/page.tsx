import { Metadata } from "next"
import Image from "next/image"
import Footer from "@/components/layout/footer"
import Link from "next/link"
import {
  ChevronRight,
  Code2,
  ShieldCheck,
  Zap,
  Globe,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Layers,
  Award,
  UserCheck,
  Building2,
  Workflow,
  Sparkles,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
} from "lucide-react"
import { absoluteUrl } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "About Us - Web Development & Software Engineering Agency | K&T Code",
  description:
    "Learn about K&T Code: software engineering company founded in 2025 in San José de Cúcuta, Colombia. Leadership, methodology, and high-performance Next.js architectures.",
  keywords: [
    "about K&T Code",
    "web development company",
    "software engineering team colombia",
    "Keyner Trillos software engineer",
    "custom software development agency",
    "hire software developers latam",
    "K&T Code about",
  ],
  alternates: {
    canonical: absoluteUrl("/en/about"),
    languages: {
      "en-US": absoluteUrl("/en/about"),
      en: absoluteUrl("/en/about"),
      es: absoluteUrl("/nosotros"),
      "x-default": absoluteUrl("/nosotros"),
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
    title: "About K&T Code | Web Development & Software Engineering Agency",
    description:
      "Specialized in corporate websites, headless e-commerce, and custom software powered by Next.js, React 19, and TypeScript.",
    url: absoluteUrl("/en/about"),
    siteName: "K&T Code",
    locale: "en_US",
    type: "website",
  },
}

export default function EnglishAboutPage() {
  return (
    <>
      <main className="min-h-screen bg-black pt-32 pb-24 px-4 sm:px-6 text-white selection:bg-white selection:text-black">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-neutral-400">
            <ol className="flex items-center justify-center gap-2">
              <li>
                <Link href="/en" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              </li>
              <li className="text-white font-bold" aria-current="page">
                About Us
              </li>
            </ol>
          </nav>

          {/* Hero / Header */}
          <header className="mb-20 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 font-mono text-xs text-neutral-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Corporate Identity & Engineering Team
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-title tracking-tight text-white mb-4 leading-tight max-w-5xl">
              K&T Code: Custom Web & Software Development Agency in Colombia
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-mono text-emerald-400 font-medium mb-6 max-w-3xl">
              Software engineering built on rigor, speed, and measurable results.
            </p>
            <p className="font-mono text-base sm:text-lg text-neutral-400 max-w-3xl leading-relaxed mx-auto">
              <strong>K&T Code</strong> is a web development and custom software company founded in 2025 in San José de Cúcuta, Colombia. We build modern digital infrastructure using <strong>Next.js, React 19, TypeScript, Supabase, and Headless CMS</strong> for enterprises across Colombia, Latin America, and the United States.
            </p>
          </header>

          {/* Facts Box */}
          <section className="mb-20 p-8 rounded-3xl border border-white/15 bg-white/[0.02]">
            <h2 className="text-2xl font-bold font-title text-white mb-6">
              Company Facts & Verifiable Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
              <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                <span className="text-neutral-500 block mb-1">Official Name</span>
                <strong className="text-white text-sm">K&T Code</strong>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                <span className="text-neutral-500 block mb-1">Founding Year</span>
                <strong className="text-white text-sm">2025</strong>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                <span className="text-neutral-500 block mb-1">Headquarters</span>
                <strong className="text-white text-sm">San José de Cúcuta, Colombia</strong>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black/40">
                <span className="text-neutral-500 block mb-1">Core Tech Stack</span>
                <strong className="text-white text-sm">Next.js • React 19 • TS</strong>
              </div>
            </div>
          </section>

          {/* Leadership & Direction */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold font-title text-white mb-8">
              Leadership & Engineering Direction
            </h2>
            <div className="p-8 md:p-10 rounded-3xl border border-white/15 bg-white/[0.02]">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/20 shrink-0 bg-neutral-800">
                  <Image
                    src="/perfil.png"
                    alt="Keyner Trillos - Co-Founder & Lead Software Engineer"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold font-title text-white">
                      Keyner Trillos
                    </h3>
                    <p className="text-emerald-400 font-mono text-sm">
                      Co-Founder & Lead Software Engineer
                    </p>
                  </div>
                  <p className="text-neutral-300 font-mono text-sm leading-relaxed max-w-3xl">
                    Specialized in modern web architectures, performance optimization (Core Web Vitals), and scalable distributed systems. Directs frontend and backend architecture at K&T Code while overseeing high-ROI Meta Ads campaign management (Facebook & Instagram Ads), tailoring digital marketing strategies and conversion funnels to each client's specific business goals.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      href="/autores/keyner-trillos"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-white underline underline-offset-4 hover:text-emerald-400 transition-colors"
                    >
                      View Full Engineer Profile & Bio <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Methodology */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold font-title text-white mb-8">
              Our 6-Stage Engineering Methodology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
              {[
                { step: "01", title: "Discovery & Requirements", desc: "We analyze business goals, competitive landscape, and user flows before writing a single line of code." },
                { step: "02", title: "Figma UI/UX Prototyping", desc: "We design high-fidelity interactive wireframes focusing on conversion rate optimization and brand identity." },
                { step: "03", title: "Headless Architecture", desc: "We set up Next.js App Router, Server Components, and database schema in Supabase/PostgreSQL." },
                { step: "04", title: "Strict Typing & Engineering", desc: "100% TypeScript coverage with zero sloppy patterns or bloated unmaintained plugins." },
                { step: "05", title: "Core Web Vitals & QA Audit", desc: "We guarantee LCP < 0.8s, Lighthouse scores above 95/100, and complete Schema.org JSON-LD structured data." },
                { step: "06", title: "Edge CDN Deployment", desc: "Zero-downtime deployment on Vercel Global Edge Network with continuous monitoring." },
              ].map((m) => (
                <div key={m.step} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <span className="text-emerald-400 font-bold block mb-2">{m.step}</span>
                  <h3 className="text-base font-bold text-white font-title mb-2">{m.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center p-8 md:p-12 rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.04] to-transparent">
            <h2 className="text-3xl font-bold font-title text-white mb-4">
              Ready to engineer your next digital platform?
            </h2>
            <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto mb-8">
              Speak directly with our engineering team to discuss your project requirements and architecture.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/en/pricing"
                className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-mono font-bold text-sm rounded-xl hover:bg-neutral-200 transition-colors inline-flex items-center justify-center gap-2"
              >
                View Plans & Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/en/contact"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 text-white border border-white/20 font-mono font-bold text-sm rounded-xl hover:bg-white/20 transition-colors inline-flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
