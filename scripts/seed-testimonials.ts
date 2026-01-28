import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bc3zxc91'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN || 'skqmWYQuIi1kBhOz20EoZ4jX97cqfpqFVUK8SbbZJ60uckXs6RpRPPXiDm4Z02o0QQHTiudM043cKtSkzhp5xybxuzJGilctHBifFtClwGPTSLvfy5Lo7hPbP2Ydq4gdpHFRWFWHxpvM7Gjqe0mznyRimesA90sDEEA0oMe6ACgQF8S6MT51'

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2024-01-01',
})

const testimonials = [
    {
        name: 'Carlos Mendoza',
        role: 'Gerente General, Telas Real',
        content: 'La migración a una arquitectura Headless fue un cambio radical. Nuestra plataforma B2B ahora carga al instante y la gestión de pedidos es mucho más eficiente. El equipo de K&T entendió perfectamente nuestras necesidades industriales.',
        rating: 5,
        project: 'Telas Real',
    },
    {
        name: 'Sofia Ramirez',
        role: 'Propietaria, San Roque Spa',
        content: 'Queríamos un sitio que transmitiera la calidez de nuestro servicio y lo lograron. El diseño es hermoso y las animaciones le dan un toque muy profesional. Hemos recibido muchos comentarios positivos de nuestros clientes.',
        rating: 5,
        project: 'San Roque',
    },
    {
        name: 'Andrés Castillo',
        role: 'Director, Eklipse Home Textil',
        content: 'La solución del catálogo digital conectado a WhatsApp agilizó nuestras ventas increíblemente. Ahora nuestros asesores cierran tratos mucho más rápido. Excelente trabajo de desarrollo.',
        rating: 5,
        project: 'Eklipse Home Textil',
    },
    {
        name: 'Jessica Torres',
        role: 'Coordinadora, Chévere Bogotá Travel',
        content: 'Necesitábamos un sitio rápido para turistas internacionales y la optimización que hicieron fue brutal. El sitio vuela incluso en conexiones móviles lentas. Muy recomendados para SEO y performance.',
        rating: 5,
        project: 'Chévere Bogotá Travel',
    },
    {
        name: 'Ricardo Mendez',
        role: 'Gerente de Operaciones, Estrella de David',
        content: 'La remodelación de nuestro sitio web nos ha ayudado a posicionarnos mejor en el mercado de transporte turístico. El nuevo diseño es moderno y transmite la seriedad de nuestra flota.',
        rating: 5,
        project: 'Estrella de David',
    },
]

async function seed() {
    console.log('Starting seed...')

    for (const t of testimonials) {
        try {
            await client.create({
                _type: 'testimonial',
                name: t.name,
                role: t.role,
                content: t.content,
                rating: t.rating,
                project: t.project,
            })
            console.log(`Created testimonial for ${t.project}`)
        } catch (err) {
            console.error(`Failed to create testimonial for ${t.project}:`, err)
        }
    }

    console.log('Seed completed!')
}

seed()
