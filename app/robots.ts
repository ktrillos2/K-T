import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/', '/login/'],
            },
            {
                userAgent: 'OAI-SearchBot',
                allow: '/',
            },
            {
                userAgent: 'GPTBot',
                disallow: '/',
            }
        ],
        sitemap: 'https://www.kytcode.lat/sitemap.xml',
        host: 'https://www.kytcode.lat',
    }
}
