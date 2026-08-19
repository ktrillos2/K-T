import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'user',
  title: 'Usuarios',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Correo Electrónico',
      type: 'string',
      description: 'El correo debe coincidir con la cuenta de Supabase/Google',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'role',
      title: 'Rol de Usuario',
      type: 'string',
      options: {
        list: [
          { title: 'Administrador', value: 'admin' },
          { title: 'Asesor', value: 'asesor' },
          { title: 'Visor', value: 'visor' },
        ],
        layout: 'radio',
      },
      initialValue: 'visor',
    }),
    defineField({
      name: 'isActive',
      title: 'Usuario Activo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: '', // Se puede agregar avatar si existen imágenes posterioremente
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Rol: ${subtitle.toUpperCase()}`,
      }
    },
  },
})
