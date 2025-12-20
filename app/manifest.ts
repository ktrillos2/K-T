import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'K&T Digital Agency',
        short_name: 'K&T Agency',
        description: 'K&T is a digital agency specializing in landing pages, e-commerce, and custom web solutions. We Code Your Vision.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    }
}
