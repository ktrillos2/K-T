import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'testimonial',
    title: 'Testimonio', // Translated
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre', // Translated
            type: 'string',
        }),
        defineField({
            name: 'role',
            title: 'Rol / Cargo', // Translated
            type: 'string',
            description: 'Si se deja vacío, se mostrará "Dueño del sitio web" por defecto.', // Description updated
        }),
        defineField({
            name: 'content',
            title: 'Contenido', // Translated
            type: 'text',
        }),
        defineField({
            name: 'rating',
            title: 'Calificación', // Translated
            type: 'number',
            validation: (Rule) => Rule.min(1).max(5),
        }),
        defineField({
            name: 'project',
            title: 'Proyecto', // Translated
            type: 'string',
            description: 'Nombre del proyecto al que pertenece este testimonio', // Translated
        }),
        defineField({
            name: 'projectUrl',
            title: 'Link del Proyecto',
            type: 'url',
            description: 'Enlace al sitio web del proyecto (Opcional)',
        }),
        defineField({
            name: 'image',
            title: 'Imagen del Cliente', // Translated
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'status',
            title: 'Estado',
            type: 'string',
            options: {
                list: [
                    { title: 'Pendiente', value: 'pending' },
                    { title: 'Aprobado', value: 'approved' },
                    { title: 'Rechazado', value: 'rejected' },
                ],
                layout: 'radio',
            },
            initialValue: 'pending',
        }),
    ],
})
