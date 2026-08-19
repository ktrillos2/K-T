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
                // OpenAI SearchBot: Rastreador oficial para ChatGPT Search (búsquedas y citas con enlaces directos)
                userAgent: 'OAI-SearchBot',
                allow: '/',
                disallow: ['/api/', '/admin/', '/login/'],
            },
            {
                // ChatGPT User: Navegación interactiva en tiempo real solicitada por el usuario en ChatGPT
                userAgent: 'ChatGPT-User',
                allow: '/',
            },
            {
                // Perplexity AI: Motor de búsqueda generativo y citación
                userAgent: 'PerplexityBot',
                allow: '/',
                disallow: ['/api/', '/admin/', '/login/'],
            },
            {
                // Anthropic Claude: Motor de búsqueda y citación
                userAgent: 'ClaudeBot',
                allow: '/',
                disallow: ['/api/', '/admin/', '/login/'],
            },
            {
                // GPTBot: Rastreador de entrenamiento para modelos fundacionales (separado de ChatGPT Search)
                userAgent: 'GPTBot',
                disallow: '/',
            }
        ],
        sitemap: 'https://www.kytcode.lat/sitemap.xml',
        host: 'https://www.kytcode.lat',
    }
}
