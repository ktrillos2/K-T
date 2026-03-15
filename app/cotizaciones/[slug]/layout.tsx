import type { Metadata } from 'next'
import { getCotizacionBySlug } from '@/sanity/lib/queries'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = await getCotizacionBySlug(slug)

  if (!data) {
    return {
      title: 'Cotización no encontrada | K&T',
    }
  }

  return {
    title: `${data.headerTitle} | K&T`,
    description: `Cotización profesional para ${data.clientName}. ${data.scopeDescription?.slice(0, 120)}...`,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `${data.headerTitle} | K&T`,
      description: `Cotización profesional para ${data.clientName}`,
      url: `https://www.kytcode.lat/cotizaciones/${slug}`,
      type: 'website',
      images: [
        {
          url: 'https://www.kytcode.lat/images/og-image-cotizacion.webp',
          width: 1200,
          height: 630,
          alt: `Cotización K&T — ${data.clientName}`,
        },
      ],
    },
  }
}

export default async function CotizacionLayout({ children }: LayoutProps) {
  return <>{children}</>
}
