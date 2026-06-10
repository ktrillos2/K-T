import { getCotizacionBySlug, getAllProjects } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import CotizacionDynamicPage from '@/components/cotizacion/cotizacion-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CotizacionPage({ params }: PageProps) {
  const { slug } = await params
  
  // Parallel fetch for performance
  const [data, projects] = await Promise.all([
    getCotizacionBySlug(slug),
    getAllProjects()
  ])

  if (!data) {
    notFound()
  }

  return <CotizacionDynamicPage data={data} projects={projects} />
}
