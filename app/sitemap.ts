import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.kytcode.lat'
    const currentDate = new Date()

    // Generar dinámicamente rutas para proyectos
    const projectUrls = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const blogSlugs = [
        'como-crear-pagina-web-2026',
        'como-crear-pagina-web-profesional',
        'costo-oculto-pagina-web-lenta',
        'desarrollo-web-medida-vs-plantillas',
        'seo-desde-la-raiz-crear-pagina'
    ]

    const blogUrls = blogSlugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/servicios`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/politicas-de-privacidad`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...projectUrls,
        ...blogUrls,
    ]
}
