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
                // OAI-SearchBot: Rastreador oficial de OpenAI para ChatGPT Search (descubrimiento, indexación y citación directa con enlace)
                userAgent: 'OAI-SearchBot',
                allow: '/',
                disallow: ['/api/', '/admin/', '/login/'],
            },
            {
                // ChatGPT User: Navegación cuando un usuario solicita explorar un enlace en el chat
                userAgent: 'ChatGPT-User',
                allow: '/',
            },
            {
                // GPTBot: Rastreador de OpenAI para recopilación de datos y entrenamiento de modelos fundacionales
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/api/', '/admin/', '/login/'],
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
        ],
        sitemap: 'https://www.kytcode.lat/sitemap.xml',
        host: 'https://www.kytcode.lat',
    }
}
