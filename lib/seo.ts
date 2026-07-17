import { absoluteUrl, siteConfig } from "@/lib/site-config"

export type FaqItem = {
  question: string
  answer: string
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.organizationName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl(siteConfig.ogImage),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: siteConfig.areaServed.map((name) => ({
      "@type": name === "Colombia" ? "Country" : "AdministrativeArea",
      name,
    })),
    sameAs: [...siteConfig.socials],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      availableLanguage: ["Spanish", "English"],
      areaServed: siteConfig.areaServed,
    },
  }
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "es-CO",
  }
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function buildServiceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string
  description: string
  path: string
  serviceType: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    areaServed: siteConfig.areaServed.map((name) => ({
      "@type": name === "Colombia" ? "Country" : "AdministrativeArea",
      name,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(path),
      servicePhone: {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "sales",
      },
    },
  }
}

export function buildArticleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#article`,
    headline,
    description,
    mainEntityOfPage: absoluteUrl(path),
    url: absoluteUrl(path),
    image: absoluteUrl(image || siteConfig.ogImage),
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: "es-CO",
    author: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.organizationName,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
  }
}
