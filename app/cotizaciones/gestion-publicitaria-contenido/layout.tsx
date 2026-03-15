import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cotización Gestión Publicitaria y Creación de Contenido | K&T',
  description: 'Propuesta comercial confidencial de gestión publicitaria en Meta Ads y creación de contenido.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function GestionPublicitariaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
