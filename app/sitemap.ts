import { MetadataRoute } from 'next'
import { getAllProjects } from '@/sanity/lib/queries'
import fs from 'fs'
import path from 'path'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.kytcode.lat'
    const currentDate = new Date()

    // Generar dinámicamente rutas para proyectos desde el CMS
    let cmsProjects: { slug: string }[] = []
    try {
        cmsProjects = await getAllProjects()
    } catch {
        cmsProjects = []
    }

    const projectUrls = cmsProjects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    let blogSlugs: string[] = []
    try {
        const blogDir = path.join(process.cwd(), 'app', 'blog')
        const entries = fs.readdirSync(blogDir, { withFileTypes: true })
        blogSlugs = entries
            .filter(entry => entry.isDirectory() && !entry.name.startsWith('['))
            .map(entry => entry.name)
    } catch (e) {
        console.error("Error reading blog directories for sitemap", e)
        blogSlugs = [
            'como-elegir-empresa-desarrollo-web-colombia',
            'como-crear-pagina-web-2026',
            'como-crear-pagina-web-profesional',
            'costo-oculto-pagina-web-lenta',
            'desarrollo-web-medida-vs-plantillas',
            'seo-desde-la-raiz-crear-pagina'
        ]
    }

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
        {
            url: `${baseUrl}/servicios/desarrollo-web-a-medida`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/portafolio`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/precios`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
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
        ...projectUrls,
        ...blogUrls,
    ]
}

