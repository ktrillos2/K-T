import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'K&T Code',
        short_name: 'K&T Code',
        description: 'Empresa colombiana de desarrollo web, e-commerce y software a medida.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon.png',
                sizes: '500x500',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: '500x500',
                type: 'image/png',
            },
            {
                src: '/icon.webp',
                sizes: '512x512',
                type: 'image/webp',
            },
        ],
    }
}
