import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cotización Desarrollo Web | Sistema de Suscripción',
  description: 'Propuesta comercial exclusiva para el desarrollo de plataforma web de pagos recurrentes y gestión de membresías.',
  openGraph: {
    title: 'Cotización Desarrollo Web | K&T Agencia Digital',
    description: 'Propuesta comercial exclusiva para el desarrollo de plataforma web de pagos recurrentes y gestión de membresías.',
    images: [
      {
        url: '/images/seo-cover.jpg', // Reusing the global SEO cover or any default image
        width: 1200,
        height: 630,
        alt: 'K&T Desarrollo Web',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cotización Desarrollo Web | K&T',
    description: 'Propuesta comercial exclusiva para el desarrollo de plataforma web de pagos recurrentes.',
  },
}

export default function CotizacionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
