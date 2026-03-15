import { client } from './client'

/** Obtener una cotización por su slug */
export async function getCotizacionBySlug(slug: string) {
  return client.fetch(
    `*[_type == "cotizacion" && slug.current == $slug && isActive == true][0]{
      _id,
      title,
      "slug": slug.current,
      subdomain,
      password,
      clientName,
      isActive,
      headerTitle,
      headerSubtitle,
      date,
      validityDays,
      scopeTitle,
      scopeDescription,
      scopeItems[]{title, description},
      investmentTitle,
      currency,
      investmentItems[]{concept, value, isIncluded},
      totalLabel,
      totalValue,
      termsTitle,
      termsCards[]{title, content, isFullWidth, isWarning},
      paymentTitle,
      showInternationalPayments,
      internationalPaymentMethods[]{name, description, recommended},
      warrantyTitle,
      warrantyDescription,
      warrantyCoverageTitle,
      warrantyCoverage,
      warrantyExclusionsTitle,
      warrantyExclusions,
      whatsappMessage
    }`,
    { slug },
    { next: { revalidate: 60 } }
  )
}

/** Obtener una cotización por su subdominio */
export async function getCotizacionBySubdomain(subdomain: string) {
  return client.fetch(
    `*[_type == "cotizacion" && subdomain == $subdomain && isActive == true][0]{
      "slug": slug.current
    }`,
    { subdomain },
    { next: { revalidate: 60 } }
  )
}

/** Obtener todos los subdominios activos para el middleware */
export async function getAllCotizacionSubdomains() {
  return client.fetch<{ subdomain: string; slug: string }[]>(
    `*[_type == "cotizacion" && isActive == true && defined(subdomain) && subdomain != ""]{
      subdomain,
      "slug": slug.current
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}
