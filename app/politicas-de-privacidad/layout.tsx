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
        url: "https://kytcode.lat/politicas-de-privacidad",
        type: "website",
    },
}

export default function PrivacyPolicyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
