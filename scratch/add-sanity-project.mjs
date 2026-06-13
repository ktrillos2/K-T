import { createClient } from 'next-sanity'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function main() {
  const doc = {
    _type: 'project',
    title: 'Aerolínea Santander',
    slug: { _type: 'slug', current: 'aerolinea-santander' },
    shortDescription: 'Plataforma moderna de reservas y gestión de vuelos regionales.',
    description: 'Desarrollo de un ecosistema web integral para Aerolínea Santander, diseñado para facilitar la búsqueda, reserva y administración de vuelos. El sistema ofrece una experiencia de usuario fluida y segura, desde la selección de destinos hasta el check-in online, optimizando significativamente el canal de ventas directo de la aerolínea.',
    category: 'Transporte / Aviación',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'API de Reservas', 'Pasarela de Pagos'],
    year: '2026',
    month: 'Junio',
    challenge: 'La aerolínea requería modernizar su canal de ventas digital para reducir la fricción en la compra de tiquetes y disminuir la dependencia de agencias de terceros. El reto principal era crear un motor de reservas rápido y confiable que pudiera manejar múltiples consultas simultáneas sin perder rendimiento ni seguridad en los pagos.',
    solution: 'Implementamos una arquitectura web de alto rendimiento utilizando Next.js. Diseñamos un embudo de conversión (booking engine) intuitivo de múltiples pasos que guía al pasajero de forma clara. Se integró un panel de autogestión donde los viajeros pueden revisar sus itinerarios, realizar check-in online y obtener sus pases de abordar directamente desde su dispositivo móvil.',
    seoFocus: 'Estrategia agresiva de SEO local y estructurado, enfocada en posicionar rutas de vuelo específicas ("vuelos a [Destino]"). Se aplicó optimización técnica para cumplir con los más altos estándares de Core Web Vitals, garantizando tiempos de carga ultrarrápidos cruciales para el ranking en Google y la retención de usuarios móviles.',
  }

  try {
    const res = await client.create(doc)
    console.log('Project created successfully:', res._id)
  } catch (err) {
    console.error('Error creating project:', err)
  }
}

main()
