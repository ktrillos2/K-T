import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Canales Oficiales y Redes Sociales',
    description: 'Conecta con K&T Code en redes sociales, WhatsApp, portafolio y conoce nuestros últimos desarrollos web y de software.',
    keywords: [
        'K&T redes sociales',
        'contacto agencia web colombia',
        'enlaces kytcode',
        'whatsapp agencia digital',
        'K&T Code redes',
    ],
    alternates: {
        canonical: 'https://www.kytcode.lat/redes',
        languages: {
            'es-CO': 'https://www.kytcode.lat/redes',
            'es': 'https://www.kytcode.lat/redes',
            'x-default': 'https://www.kytcode.lat/redes',
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: 'Nuestras Redes y Enlaces | K&T Code',
        description: 'Conecta con Agencia K&T en redes sociales, WhatsApp y conoce nuestros proyectos.',
        url: 'https://www.kytcode.lat/redes',
        siteName: 'K&T Code',
        locale: 'es_CO',
        type: 'website',
    },
}

export default function RedesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
