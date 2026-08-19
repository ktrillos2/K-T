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
      name: 'shortDescription',
      title: 'Descripción Corta',
      type: 'string',
      description: 'Aparece en las tarjetas e inicio (ej: "Plataforma B2B para telas premium")',
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
        name: 'orderId',
        title: 'ID de Orden',
        type: 'number',
        description: 'Sirve para forzar un orden específico en el portafolio. Menor número aparece primero.',
        initialValue: 99
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
      description: 'Ej: "E-commerce", "Corporate", "Landing Page"',
    }),
    defineField({
      name: 'tech',
      title: 'Tecnologías Utilizadas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ej: ["Next.js", "Tailwind CSS", "Sanity"]',
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'heroImage',
    },
  },
})
