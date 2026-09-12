import { client } from './client'
import { getOptimizedHeroUrl, getOptimizedMobileHeroUrl } from './image'

export interface SanityProject {
  _id: string
  title: string
  slug: string
  client?: string
  country?: string
  city?: string
  industry?: string
  projectType?: string
  duration?: string
  objective?: string
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
  results?: string
  isFeatured?: boolean
}

export interface ProjectTestimonial {
  quote: string
  author: string
  role: string
  avatar?: string
  company?: string
  rating?: number
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
      client,
      country,
      city,
      industry,
      projectType,
      duration,
      objective,
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
      seoFocus,
      results,
      isFeatured
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
      client,
      country,
      city,
      industry,
      projectType,
      duration,
      objective,
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
      seoFocus,
      results,
      isFeatured
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

/** Obtener el testimonio real y verificado dejado en la web para este proyecto */
export async function getApprovedTestimonialForProject(
  projectTitle: string,
  slug: string
): Promise<ProjectTestimonial | null> {
  try {
    const cleanSlug = slug.replace(/-/g, ' ')
    const query = `*[_type == "testimonial" && status == "approved" && (
      lower(project) == lower($projectTitle) ||
      lower(project) == lower($slug) ||
      lower(project) == lower($cleanSlug)
    )] | order(_createdAt desc)[0]{
      "quote": content,
      "author": name,
      role,
      rating,
      "avatar": image.asset->url,
      "company": project
    }`

    const item = await client.fetch<{
      quote: string
      author: string
      role?: string
      rating?: number
      avatar?: string
      company?: string
    } | null>(
      query,
      { projectTitle, slug, cleanSlug },
      { next: { revalidate: 60 } }
    )

    if (!item || !item.quote) return null

    return {
      quote: item.quote,
      author: item.author || 'Cliente Verificado',
      role: item.role || projectTitle,
      avatar: item.avatar,
      company: item.company || projectTitle,
      rating: item.rating || 5,
    }
  } catch (error) {
    console.error('Error fetching approved testimonial for project:', error)
    return null
  }
}
