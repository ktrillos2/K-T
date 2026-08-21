"use client"

import Image from "next/image"
import Link from "next/link"
import { m as motion } from "framer-motion"
import { Heart, Mail, Phone, MapPin, ArrowUpRight, Instagram, Facebook } from "lucide-react"

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

import { useLanguage } from "@/context/language-context"
import { staggerContainer, fadeUpVariant } from "@/lib/animations"

export default function Footer() {
  const { dictionary, language } = useLanguage()
  const isEn = language === "en"

  const navLinks = [
    { label: dictionary.nav.home, href: isEn ? "/en" : "/" },
    { label: dictionary.nav.about, href: isEn ? "/en/about" : "/nosotros" },
    { label: dictionary.nav.services, href: isEn ? "/en/services" : "/servicios" },
    { label: dictionary.nav.prices, href: isEn ? "/en/pricing" : "/precios" },
    { label: dictionary.nav.work, href: isEn ? "/en/portfolio" : "/portafolio" },
    { label: dictionary.nav.blog, href: "/blog" },
  ]

  const industryLinks = [
    { label: isEn ? "Industries Hub" : "Hub de Industrias", href: "/industrias" },
    { label: isEn ? "Real Estate" : "Inmobiliarias", href: "/industrias/desarrollo-web-inmobiliarias" },
    { label: isEn ? "Healthcare & Clinics" : "Salud & Clínicas", href: "/industrias/desarrollo-web-salud" },
    { label: isEn ? "Engineering & Construction" : "Ingeniería & Construcción", href: "/industrias/desarrollo-web-ingenieria" },
    { label: isEn ? "B2B E-commerce" : "E-commerce B2B", href: "/industrias/ecommerce-b2b" },
    { label: isEn ? "Tourism & Hospitality" : "Turismo & Hotelería", href: "/industrias/desarrollo-web-turismo" },
  ]

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@ktweb_",
      href: "https://www.instagram.com/ktweb_/",
      icon: Instagram,
      color: "text-pink-400 group-hover:text-pink-300",
      borderHover: "hover:border-pink-500/40",
    },
    {
      name: "Facebook",
      handle: "K&T Solutions Web",
      href: "https://www.facebook.com/KTSolutionsWeb",
      icon: Facebook,
      color: "text-blue-400 group-hover:text-blue-300",
      borderHover: "hover:border-blue-500/40",
    },
    {
      name: "TikTok",
      handle: "@kytweb",
      href: "https://www.tiktok.com/@kytweb",
      icon: TikTok,
      color: "text-neutral-200 group-hover:text-white",
      borderHover: "hover:border-white/40",
    },
  ]

  return (
    <footer
      role="contentinfo"
      aria-label="Pie de página corporativo de K&T Code"
      className="relative bg-black text-white border-t border-white/10 pt-16 pb-24 md:pb-16 px-4 sm:px-6 overflow-hidden cv-auto"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Column 1: Brand & Contact Info */}
          <motion.div variants={fadeUpVariant} className="space-y-4">
            <Link href={isEn ? "/en" : "/"} aria-label="K&T Code Inicio" className="inline-block relative w-36 h-12">
              <Image
                src="/images/logo.webp"
                alt="Logo de K&T Code"
                fill
                sizes="150px"
                className="object-contain object-left"
              />
            </Link>

            <p className="font-mono text-xs text-neutral-400 leading-relaxed max-w-xs">
              {isEn
                ? "Colombian web development and software engineering company specialized in Next.js, React 19, and cloud architectures."
                : "Empresa colombiana de desarrollo web y software a medida especializada en Next.js, React 19 y arquitecturas cloud."}
            </p>

            <div className="space-y-2 pt-2 font-mono text-xs text-neutral-400">
              <a
                href="mailto:contacto@kytcode.lat"
                className="flex items-center gap-2 hover:text-white transition-colors"
                aria-label="Enviar correo a contacto@kytcode.lat"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>contacto@kytcode.lat</span>
              </a>
              <a
                href="tel:+573116360057"
                className="flex items-center gap-2 hover:text-white transition-colors"
                aria-label="Llamar a +57 311 636 0057"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>+57 311 636 0057</span>
              </a>
              <div className="flex items-center gap-2 text-neutral-500">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>San José de Cúcuta, Colombia</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div variants={fadeUpVariant} className="space-y-4">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              {isEn ? "// Navigation" : "// Navegación"}
            </p>
            <ul className="space-y-2.5 font-mono text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Industries & Solutions */}
          <motion.div variants={fadeUpVariant} className="space-y-4">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              {isEn ? "// Solutions by Industry" : "// Soluciones por Industria"}
            </p>
            <ul className="space-y-2.5 font-mono text-xs">
              {industryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Redes Sociales */}
          <motion.div variants={fadeUpVariant} className="space-y-4">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              {isEn ? "// Social Media" : "// Redes Sociales"}
            </p>
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              {isEn
                ? "Follow us for project showcases, tech insights, and updates."
                : "Síguenos y descubre nuestros últimos proyectos, lanzamientos y novedades."}
            </p>

            <div className="space-y-2.5 pt-1 font-mono text-xs">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar ${social.name} de K&T Code`}
                    className={`flex items-center justify-between p-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-all group ${social.borderHover}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 transition-colors ${social.color}`} />
                      <span className="text-white font-medium">{social.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-neutral-400 group-hover:text-white transition-colors">
                      <span className="text-[11px]">{social.handle}</span>
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Sub-Footer Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400">
          <div className="text-center md:text-left">
            <span>
              © {new Date().getFullYear()} K&T Code. {dictionary.footer.rights}.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/politica-de-privacidad"
              aria-label="Leer política de privacidad"
              className="hover:text-white transition-colors"
            >
              {dictionary.footer.privacy}
            </Link>
          </div>

          <div className="text-center md:text-right">
            <a
              href="https://www.kytcode.lat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sitio web oficial de K&T Code"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors group"
            >
              <span>Desarrollado por K&T</span>
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2, ease: "easeInOut" }}
                className="inline-flex"
              >
                <Heart className="w-3.5 h-3.5 text-white fill-white group-hover:scale-110 transition-transform" />
              </motion.div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
