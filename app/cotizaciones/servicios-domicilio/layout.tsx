import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cotización Desarrollo Web Corporativo | Servicios a Domicilio',
  description: 'Propuesta comercial exclusiva para el desarrollo de plataforma web corporativa enfocada en captación de clientes y personal para servicios a domicilio.',
  openGraph: {
    title: 'Cotización Desarrollo Web | K&T Agencia Digital',
    description: 'Propuesta comercial exclusiva para el desarrollo de plataforma web corporativa con geolocalización automática Colombia/Argentina.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'K&T Desarrollo Web',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cotización Desarrollo Web | K&T',
    description: 'Propuesta comercial exclusiva para el desarrollo de plataforma web corporativa de servicios a domicilio.',
  },
}

export default function CotizacionServiciosDomicilioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
