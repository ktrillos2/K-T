export const siteConfig = {
  name: "K&T Code",
  organizationName: "K&T Agencia Digital",
  url: "https://www.kytcode.lat",
  locale: "es_CO",
  language: "es",
  description:
    "Agencia de desarrollo web en Colombia especializada en páginas web corporativas, tiendas virtuales y software a medida para empresas de Latinoamérica.",
  email: "contacto@kytcode.lat",
  phone: "+573116360057",
  phoneDisplay: "+57 311 636 0057",
  whatsapp: "https://wa.me/573116360057",
  logo: "/images/logo.webp",
  ogImage: "/opengraph-image.png",
  socials: [
    "https://www.facebook.com/KTSolutionsWeb",
    "https://www.instagram.com/ktweb_/",
    "https://www.tiktok.com/@kytweb",
  ],
  areaServed: ["Colombia", "Latinoamérica"],
} as const

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}
