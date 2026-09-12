import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Proyectos (Portafolio)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Proyecto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Cliente / Empresa',
      type: 'string',
      description: 'Nombre de la empresa o cliente (ej: "GMX Gaming", "Cxellence Group").',
    }),
    defineField({
      name: 'country',
      title: 'País de Desarrollo / Cliente',
      type: 'string',
      description: 'País donde se realizó el proyecto o donde opera el cliente (ej: "Colombia", "México", "Perú", "Estados Unidos", "España").',
      initialValue: 'Colombia',
    }),
    defineField({
      name: 'city',
      title: 'Ciudad',
      type: 'string',
      description: 'Ciudad del cliente o proyecto (ej: "Bogotá", "Medellín", "Lima", "Ciudad de México").',
    }),
    defineField({
      name: 'industry',
      title: 'Industria / Sector',
      type: 'string',
      description: 'Sector del proyecto (ej: "Esports & Torneos Gaming", "B2B Textil & Mayorista", "Salud Mental").',
    }),
    defineField({
      name: 'projectType',
      title: 'Tipo de Proyecto',
      type: 'string',
      description: 'Tipo de desarrollo (ej: "Plataforma Web a Medida", "E-commerce B2B", "Portal Web Institucional").',
    }),
    defineField({
      name: 'duration',
      title: 'Duración del Desarrollo',
      type: 'string',
      description: 'Tiempo que tomó la ejecución (ej: "4 semanas", "6 semanas", "2 meses").',
      initialValue: '4 semanas',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción Corta',
      type: 'string',
      description: 'Aparece en las tarjetas e inicio (ej: "Plataforma a medida para torneos de videojuegos...").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción Larga',
      type: 'text',
      description: 'Breve párrafo explicativo sobre de qué trata el proyecto en general.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'objective',
      title: 'Objetivo Principal del Caso',
      type: 'text',
      rows: 3,
      description: 'Objetivo o problema clave que el cliente buscaba solucionar con K&T Code.',
    }),
    defineField({
      name: 'orderId',
      title: 'ID de Orden',
      type: 'number',
      description: 'Sirve para forzar un orden específico en el portafolio. Menor número aparece primero.',
      initialValue: 99
    }),
    defineField({
      name: 'isFeatured',
      title: '¿Proyecto Destacado?',
      type: 'boolean',
      description: 'Activa este interruptor para que el proyecto aparezca en el carrusel de Proyectos Destacados de la página principal.',
      initialValue: false,
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'string',
    }),
    defineField({
      name: 'month',
      title: 'Mes',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      description: 'Ej: "Gaming / Esports", "E-commerce", "Corporate", "Landing Page"',
    }),
    defineField({
      name: 'tech',
      title: 'Tecnologías Utilizadas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ej: ["Next.js", "Tailwind CSS", "TypeScript"]',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen Principal (Desktop)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    }),
    defineField({
      name: 'mobileImage',
      title: 'Imagen Principal (Mobile)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    }),
    defineField({
      name: 'liveUrl',
      title: 'URL en vivo',
      type: 'url',
    }),
    defineField({
      name: 'challenge',
      title: 'El Desafío (Content)',
      type: 'text',
    }),
    defineField({
      name: 'solution',
      title: 'La Solución (Content)',
      type: 'text',
    }),
    defineField({
      name: 'seoFocus',
      title: 'Enfoque SEO (Content)',
      type: 'text',
    }),
    defineField({
      name: 'results',
      title: 'Resultados y Métricas (Content)',
      type: 'text',
      rows: 3,
      description: 'Impacto y logros obtenidos (ej: reducción de latencia, aumento de conversiones).',
    }),
    defineField({
      name: 'testimonialQuote',
      title: 'Testimonio del Cliente - Cita',
      type: 'text',
      rows: 3,
      description: 'Cita del cliente para este proyecto (opcional).',
    }),
    defineField({
      name: 'testimonialAuthor',
      title: 'Testimonio del Cliente - Autor',
      type: 'string',
      description: 'Nombre de la persona o directivo que brinda el testimonio.',
    }),
    defineField({
      name: 'testimonialRole',
      title: 'Testimonio del Cliente - Cargo',
      type: 'string',
      description: 'Cargo o rol (ej: "Dirección Operativa — GMX Gaming").',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      country: 'country',
      media: 'heroImage',
    },
    prepare({ title, category, country, media }) {
      return {
        title: title || 'Sin título',
        subtitle: [category, country].filter(Boolean).join(' • '),
        media,
      }
    }
  },
})

