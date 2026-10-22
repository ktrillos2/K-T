export const SITE = {
  name: "K&T Code",
  legalName: "K&T Code",
  /** Otras formas en que la gente busca la marca (Google y los motores de IA las asocian a la misma entidad). */
  alternateNames: ["KyT Code", "Kyt Code", "KYT Code", "kytcode", "K and T Code", "K&T"],
  url: "https://www.kytcode.lat",
  domain: "kytcode.lat",
  description:
    "Estudio colombiano de desarrollo web y software a la medida. Landing pages, tiendas virtuales y plataformas con diseño único para Colombia, Latinoamérica y Estados Unidos.",
  email: "contacto@kytcode.lat",
  phone: "+57 311 636 0057",
  phoneRaw: "573116360057",
  city: "San José de Cúcuta",
  region: "Norte de Santander",
  country: "Colombia",
  founded: 2025,
  founder: { name: "Keyner Trillos", role: "Cofundador y líder de desarrollo", roleEn: "Co-founder and development lead", photo: "/team/keyner-trillos.jpg" },
  socials: [
    { label: "Instagram", handle: "@kytcode", href: "https://www.instagram.com/kytcode/" },
    { label: "TikTok", handle: "@kytcode", href: "https://www.tiktok.com/@kytcode" },
    { label: "Facebook", handle: "K&T Solutions Web", href: "https://www.facebook.com/KTSolutionsWeb" },
  ],
} as const;

/**
 * Verificación de Google Search Console del sitio anterior (meta google-site-verification).
 * Se mantiene por defecto para no perder la propiedad; NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION la reemplaza.
 */
export const GOOGLE_VERIFICATION = "dqsrEf4u6-TWpy3i2r3S-BJbGb7LV6J7cWob35JSKD4";

/**
 * Fecha de la última revisión del contenido de las páginas fijas (servicios, ciudades, precios…).
 * Va en el <lastmod> del sitemap: cámbiala solo cuando edites ese contenido. Si cambiara en cada
 * despliegue, Google dejaría de confiar en las fechas del sitemap.
 */
export const CONTENT_UPDATED = "2026-10-16";

/** Enlace de WhatsApp con mensaje prellenado. */
export const wa = (text = "Hola K&T Code, quiero cotizar un proyecto.") =>
  `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(text)}`;

export const INDUSTRIES = [
  "Salud y clínicas",
  "Inmobiliaria",
  "Ingeniería y construcción",
  "Comercio B2B",
  "Turismo y hoteles",
  "Automotriz",
  "Estética y bienestar",
  "Editorial",
  "Moda",
  "Educación",
] as const;

export const STATS = [
  { value: 23, suffix: "+", label: "proyectos entregados" },
  { value: 15, suffix: "+", label: "empresas clientes" },
  { value: 4, suffix: "+", label: "países atendidos" },
  { value: 100, suffix: "%", label: "del código es del cliente" },
] as const;
