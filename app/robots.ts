import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/private/', '/CRM/', '/login/', '/admin/'],
            },
        ],
        sitemap: 'https://kytcode.lat/sitemap.xml',
        host: 'https://kytcode.lat',
    }
}
