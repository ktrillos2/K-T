import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Política de Privacidad",
    description: "Política de privacidad de K&T Agencia Digital. Conoce cómo recopilamos, usamos y protegemos tu información personal.",
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Política de Privacidad | K&T Agencia Digital",
        description: "Conoce cómo K&T protege tu información personal y privacidad.",
        url: "https://www.kytcode.lat/politicas-de-privacidad",
        images: [
            {
                url: "https://www.kytcode.lat/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "K&T Agencia Digital - Desarrollo Web y Redes Sociales",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Política de Privacidad | K&T Agencia Digital",
        description: "Conoce cómo K&T protege tu información personal y privacidad.",
        images: ["https://www.kytcode.lat/images/og-image.png"],
    },
    alternates: {
        canonical: "https://www.kytcode.lat/politicas-de-privacidad",
    },
}

export default function PrivacyPolicyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
