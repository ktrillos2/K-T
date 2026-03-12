import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cotización Desarrollo Web y Marketing - Tours Amazonas | K&T',
  description: 'Propuesta comercial confidencial de desarrollo web escalonado y gestión publicitaria en Meta Ads para agencia de turismo en el Amazonas.',
  openGraph: {
    title: 'Cotización VIP: Tours Amazonas | K&T Code',
    description: 'Propuesta de desarrollo web y marketing digital para captación de clientes extranjeros.',
    url: 'https://tours.kytcode.lat',
    siteName: 'K&T Code',
    images: [
      {
        url: 'https://www.kytcode.lat/api/og?title=Cotización%20Tours%20Amazonas', // Fallback to a dynamic or generic OG image if available
        width: 1200,
        height: 630,
        alt: 'Cotización de Desarrollo Web y Marketing Digital - K&T Code',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  robots: {
    index: false, // Since it's a private quote, we shouldn't index it in Google by default, but we provide rich metadata for when the link is shared directly.
    follow: false,
  },
}

export default function ToursAmazonasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
