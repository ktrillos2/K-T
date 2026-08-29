import { MetadataRoute } from 'next'
import { getAllProjects } from '@/sanity/lib/queries'
import fs from 'fs'
import path from 'path'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.kytcode.lat'
    const currentDate = new Date()

    // Generar dinámicamente rutas para proyectos (CMS + catálogo interno)
    let cmsProjects: { slug: string }[] = []
    try {
        cmsProjects = await getAllProjects()
    } catch {
        cmsProjects = []
    }
    const { projects: hardcodedProjects } = await import('@/lib/projects')
    const allProjectSlugs = Array.from(
        new Set([
            ...cmsProjects.map((p) => p.slug),
            ...hardcodedProjects.map((p) => p.slug),
        ])
    ).filter(Boolean)

    const projectUrls = allProjectSlugs.map((slug) => ({
        url: `${baseUrl}/projects/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // Generar dinámicamente rutas únicamente para artículos publicados del blog (excluyendo futuros y borradores)
    const { getAllPublishedBlogPosts } = await import('@/lib/blog-mdx')
    const publishedBlogPosts = getAllPublishedBlogPosts()
    const blogUrls = publishedBlogPosts.map((p) => ({
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified: new Date(p.updatedAt || p.modifiedAt || p.publishedAt || currentDate),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const serviceSlugs = [
        'desarrollo-web-a-medida',
        'diseno-web-corporativo',
        'desarrollo-nextjs',
        'software-a-medida',
        'tiendas-virtuales',
        'woocommerce-headless',
        'seo-tecnico',
        'mantenimiento-web',
    ]

    const serviceUrls = serviceSlugs.map((slug) => ({
        url: `${baseUrl}/servicios/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    const pricingGuideSlugs = [
        'precio-pagina-web-colombia',
        'precio-tienda-virtual-colombia',
        'precio-software-a-medida',
    ]

    const pricingUrls = pricingGuideSlugs.map((slug) => ({
        url: `${baseUrl}/precios/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }))

    const industrySlugs = [
        'desarrollo-web-inmobiliarias',
        'desarrollo-web-salud',
        'desarrollo-web-ingenieria',
        'ecommerce-b2b',
        'desarrollo-web-turismo',
        'desarrollo-web-automotriz',
        'desarrollo-web-estetica',
        'desarrollo-web-editorial',
    ]

    const citySlugs = [
        'desarrollo-web-bogota',
        'desarrollo-web-medellin',
        'desarrollo-web-cucuta',
        'desarrollo-web-cali',
        'desarrollo-web-barranquilla',
    ]

    const cityUrls = citySlugs.map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    const industryUrls = industrySlugs.map((slug) => ({
        url: `${baseUrl}/industrias/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }))

    const englishRoutes = [
        { url: `${baseUrl}/en`, priority: 0.95 },
        { url: `${baseUrl}/en/about`, priority: 0.85 },
        { url: `${baseUrl}/en/services`, priority: 0.85 },
        { url: `${baseUrl}/en/pricing`, priority: 0.85 },
        { url: `${baseUrl}/en/portfolio`, priority: 0.85 },
        { url: `${baseUrl}/en/contact`, priority: 0.85 },
    ].map((r) => ({
        url: r.url,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: r.priority,
    }))

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        ...englishRoutes,
        {
            url: `${baseUrl}/nosotros`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/servicios`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...serviceUrls,
        ...cityUrls,
        {
            url: `${baseUrl}/precios`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...pricingUrls,
        {
            url: `${baseUrl}/industrias`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...industryUrls,
        {
            url: `${baseUrl}/portafolio`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/preguntas-frecuentes`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/redes`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/politica-de-privacidad`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/autores/keyner-trillos`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...projectUrls,
        ...blogUrls,
    ]
}



