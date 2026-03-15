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

  // Construir URL canónica: usar subdominio si existe, sino usar la ruta de slug
  const canonicalUrl = data.subdomain
    ? `https://${data.subdomain}.kytcode.lat`
    : `https://www.kytcode.lat/cotizaciones/${slug}`

  // Descripción SEO dinámica
  const seoDescription = `Propuesta comercial profesional de ${data.headerTitle?.toLowerCase()} para ${data.clientName}. ${data.scopeDescription?.slice(0, 100) || ''}`.trim()

  return {
    title: `${data.headerTitle} | K&T`,
    description: seoDescription,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Cotización: ${data.clientName} | K&T Code`,
      description: seoDescription,
      url: canonicalUrl,
      siteName: 'K&T Code',
      images: [
        {
          url: `${data.subdomain ? `https://${data.subdomain}.kytcode.lat` : 'https://www.kytcode.lat'}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: `Cotización de ${data.headerTitle} — K&T Code`,
        },
      ],
      locale: 'es_CO',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Cotización: ${data.clientName} | K&T Code`,
      description: seoDescription,
      images: [`${data.subdomain ? `https://${data.subdomain}.kytcode.lat` : 'https://www.kytcode.lat'}/images/og-image.png`],
    },
  }
}

export default async function CotizacionLayout({ children }: LayoutProps) {
  return <>{children}</>
}
