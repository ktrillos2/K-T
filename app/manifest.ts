import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'K&T Agencia Digital',
        short_name: 'K&T Agency',
        description: 'Agencia digital en Colombia. Desarrollo de páginas web, e-commerce y gestión de redes sociales. Creamos tu presencia digital.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon.webp',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon.webp',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-icon.webp',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    }
}
