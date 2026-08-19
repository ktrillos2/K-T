import { client } from './client'
import { getOptimizedHeroUrl, getOptimizedMobileHeroUrl } from './image'

export interface SanityProject {
  _id: string
  title: string
  slug: string
  shortDescription?: string
  description?: string
  year?: string
  month?: string
  category?: string
  tech?: string[]
  hero?: string
  mobile?: string
  liveUrl?: string
  challenge?: string
  solution?: string
  seoFocus?: string
}

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
      showNationalPayments,
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

/** Obtener todos los proyectos del portafolio ordenados con imágenes optimizadas (< 500KB) */
export async function getAllProjects(): Promise<SanityProject[]> {
  const rawProjects = await client.fetch<SanityProject[]>(
    `*[_type == "project" && !(_id in path("drafts.**"))] | order(orderId asc){
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      description,
      year,
      month,
      category,
      tech,
      "hero": heroImage.asset->url,
      "mobile": mobileImage.asset->url,
      liveUrl,
      challenge,
      solution,
      seoFocus
    }`,
    {},
    { next: { revalidate: 60 } }
  )

  if (!Array.isArray(rawProjects)) return []

  return rawProjects.map((p) => ({
    ...p,
    hero: p.hero ? getOptimizedHeroUrl(p.hero) : p.hero,
    mobile: p.mobile
      ? getOptimizedMobileHeroUrl(p.mobile)
      : p.hero
      ? getOptimizedMobileHeroUrl(p.hero)
      : p.mobile,
  }))
}

/** Obtener un proyecto por su slug con imágenes optimizadas (< 500KB) */
export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  const project = await client.fetch<SanityProject | null>(
    `*[_type == "project" && !(_id in path("drafts.**")) && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      description,
      year,
      month,
      category,
      tech,
      "hero": heroImage.asset->url,
      "mobile": mobileImage.asset->url,
      liveUrl,
      challenge,
      solution,
      seoFocus
    }`,
    { slug },
    { next: { revalidate: 60 } }
  )

  if (!project) return null

  return {
    ...project,
    hero: project.hero ? getOptimizedHeroUrl(project.hero) : project.hero,
    mobile: project.mobile
      ? getOptimizedMobileHeroUrl(project.mobile)
      : project.hero
      ? getOptimizedMobileHeroUrl(project.hero)
      : project.mobile,
  }
}
