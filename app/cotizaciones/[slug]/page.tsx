import { getCotizacionBySlug } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import CotizacionDynamicPage from '@/components/cotizacion/cotizacion-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CotizacionPage({ params }: PageProps) {
  const { slug } = await params
  const data = await getCotizacionBySlug(slug)

  if (!data) {
    notFound()
  }

  return <CotizacionDynamicPage data={data} />
}
