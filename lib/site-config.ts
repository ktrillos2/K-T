export const siteConfig = {
  name: "K&T Code",
  legalName: "K&T Code",
  organizationName: "K&T Code",
  url: "https://www.kytcode.lat",
  locale: "es_CO",
  language: "es",
  description:
    "Empresa colombiana de desarrollo web y software a medida especializada en páginas corporativas, tiendas virtuales y plataformas escalables para empresas en Colombia y Latinoamérica.",
  email: "contactoktweb@gmail.com",
  phone: "+573116360057",
  phoneDisplay: "+57 311 636 0057",
  whatsapp: "https://wa.me/573116360057",
  address: {
    streetAddress: "San José de Cúcuta",
    addressLocality: "Cúcuta",
    addressRegion: "Norte de Santander",
    postalCode: "540001",
    addressCountry: "CO",
  },
  verifiedProjectsCount: 15,
  logo: "/images/logo.webp",
  ogImage: "/opengraph-image.png",
  socials: [
    "https://www.instagram.com/ktweb_/",
    "https://www.facebook.com/KTSolutionsWeb",
    "https://www.tiktok.com/@kytweb",
  ],
  areaServed: ["Colombia", "Latinoamérica", "Estados Unidos"],
} as const

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}
