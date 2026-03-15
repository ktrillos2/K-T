import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cotizacion',
  title: 'Cotizaciones',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'header', title: 'Encabezado' },
    { name: 'scope', title: 'Alcance' },
    { name: 'investment', title: 'Inversión' },
    { name: 'terms', title: 'Condiciones' },
    { name: 'payment', title: 'Medios de Pago' },
    { name: 'warranty', title: 'Garantía' },
    { name: 'whatsapp', title: 'WhatsApp' },
  ],
  fields: [
    // ─── General ────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Nombre identificador',
      type: 'string',
      group: 'general',
      description: 'Nombre interno para identificar la cotización (ej: "Gestión Publicitaria - Cliente X")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'general',
      description: 'Se usará en la URL: /cotizaciones/{slug}',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subdomain',
      title: 'Subdominio',
      type: 'string',
      group: 'general',
      description: 'El subdominio para acceder a la cotización (ej: "publicidad" → publicidad.kytcode.lat). Dejar vacío si no se necesita subdominio.',
    }),
    defineField({
      name: 'password',
      title: 'Contraseña de acceso',
      type: 'string',
      group: 'general',
      description: 'Contraseña que el cliente debe ingresar para ver la cotización.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Nombre del cliente',
      type: 'string',
      group: 'general',
      description: 'Nombre que aparecerá en las notificaciones por email (ej: "Tours Amazonas").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: '¿Activa?',
      type: 'boolean',
      group: 'general',
      description: 'Si la cotización está activa y accesible.',
      initialValue: true,
    }),

    // ─── Header ─────────────────────────────────────────────
    defineField({
      name: 'headerTitle',
      title: 'Título principal',
      type: 'string',
      group: 'header',
      description: 'Título grande del encabezado (ej: "COTIZACIÓN DE GESTIÓN PUBLICITARIA")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerSubtitle',
      title: 'Subtítulo',
      type: 'string',
      group: 'header',
      description: 'Texto secundario debajo del título (ej: "(Y CREACIÓN DE CONTENIDO)")',
    }),
    defineField({
      name: 'date',
      title: 'Fecha de emisión',
      type: 'string',
      group: 'header',
      description: 'Texto de la fecha (ej: "15 de marzo de 2026")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'validityDays',
      title: 'Validez',
      type: 'string',
      group: 'header',
      description: 'Texto de validez (ej: "15 días calendario")',
      validation: (Rule) => Rule.required(),
    }),

    // ─── Alcance ────────────────────────────────────────────
    defineField({
      name: 'scopeTitle',
      title: 'Título de sección',
      type: 'string',
      group: 'scope',
      description: 'Título de la sección de alcance (ej: "Alcance Detallado del Proyecto: Pauta y Contenido")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scopeDescription',
      title: 'Descripción introductoria',
      type: 'text',
      group: 'scope',
      description: 'Párrafo introductorio de la sección de alcance.',
    }),
    defineField({
      name: 'scopeItems',
      title: 'Elementos del alcance',
      type: 'array',
      group: 'scope',
      of: [
        {
          type: 'object',
          name: 'scopeItem',
          title: 'Elemento',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
    }),

    // ─── Inversión ──────────────────────────────────────────
    defineField({
      name: 'investmentTitle',
      title: 'Título de sección',
      type: 'string',
      group: 'investment',
      description: 'Título de la sección de inversión (ej: "Inversión Mensual")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currency',
      title: 'Moneda',
      type: 'string',
      group: 'investment',
      description: 'Moneda para los valores (ej: "USD", "COP")',
      options: {
        list: [
          { title: 'USD (Dólares)', value: 'USD' },
          { title: 'COP (Pesos Colombianos)', value: 'COP' },
        ],
      },
      initialValue: 'USD',
    }),
    defineField({
      name: 'investmentItems',
      title: 'Conceptos de inversión',
      type: 'array',
      group: 'investment',
      of: [
        {
          type: 'object',
          name: 'investmentItem',
          title: 'Concepto',
          fields: [
            defineField({
              name: 'concept',
              title: 'Concepto',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Valor',
              type: 'string',
              description: 'Valor del concepto (ej: "$150 USD") o dejar vacío si es "Incluido"',
            }),
            defineField({
              name: 'isIncluded',
              title: '¿Incluido (sin costo adicional)?',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'concept', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'totalLabel',
      title: 'Etiqueta del total',
      type: 'string',
      group: 'investment',
      description: 'Texto de la fila total (ej: "Total Inversión Mensual")',
    }),
    defineField({
      name: 'totalValue',
      title: 'Valor total',
      type: 'string',
      group: 'investment',
      description: 'Valor total (ej: "$250 USD")',
    }),

    // ─── Condiciones ────────────────────────────────────────
    defineField({
      name: 'termsTitle',
      title: 'Título de sección',
      type: 'string',
      group: 'terms',
      description: 'Título de la sección de condiciones (ej: "Condiciones Comerciales y Facturación")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'termsCards',
      title: 'Tarjetas de condiciones',
      type: 'array',
      group: 'terms',
      of: [
        {
          type: 'object',
          name: 'termsCard',
          title: 'Tarjeta',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Contenido',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isFullWidth',
              title: '¿Ancho completo?',
              type: 'boolean',
              description: 'Si ocupa todo el ancho (2 columnas)',
              initialValue: false,
            }),
            defineField({
              name: 'isWarning',
              title: '¿Es advertencia/cláusula?',
              type: 'boolean',
              description: 'Si tiene estilo de alerta amarilla',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),

    // ─── Medios de Pago ─────────────────────────────────────
    defineField({
      name: 'paymentTitle',
      title: 'Título de sección',
      type: 'string',
      group: 'payment',
      description: 'Título de la sección de pagos (ej: "Medios de Pago Internacional y Nacional")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showInternationalPayments',
      title: '¿Mostrar pagos internacionales?',
      type: 'boolean',
      group: 'payment',
      initialValue: false,
      description: 'Si se muestran las opciones de DolarApp, Western Union, etc.',
    }),
    defineField({
      name: 'internationalPaymentMethods',
      title: 'Métodos de pago internacionales',
      type: 'array',
      group: 'payment',
      hidden: ({ document }) => !document?.showInternationalPayments,
      of: [
        {
          type: 'object',
          name: 'intlPayment',
          title: 'Método',
          fields: [
            defineField({
              name: 'name',
              title: 'Nombre',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'string',
            }),
            defineField({
              name: 'recommended',
              title: '¿Recomendado?',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'name' },
          },
        },
      ],
    }),

    // ─── Garantía ───────────────────────────────────────────
    defineField({
      name: 'warrantyTitle',
      title: 'Título de sección',
      type: 'string',
      group: 'warranty',
      description: 'Título de la sección de garantía (ej: "Política de Garantía del Servicio Publicitario")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'warrantyDescription',
      title: 'Descripción de la garantía',
      type: 'text',
      group: 'warranty',
      description: 'Párrafo introductorio de la sección de garantía.',
    }),
    defineField({
      name: 'warrantyCoverageTitle',
      title: 'Título cobertura',
      type: 'string',
      group: 'warranty',
      initialValue: 'Cobertura de Ejecución',
    }),
    defineField({
      name: 'warrantyCoverage',
      title: 'Coberturas',
      type: 'array',
      group: 'warranty',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'warrantyExclusionsTitle',
      title: 'Título exclusiones',
      type: 'string',
      group: 'warranty',
      initialValue: 'Exclusiones Estrictas',
    }),
    defineField({
      name: 'warrantyExclusions',
      title: 'Exclusiones',
      type: 'array',
      group: 'warranty',
      of: [{ type: 'string' }],
    }),

    // ─── WhatsApp ───────────────────────────────────────────
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje predeterminado WhatsApp',
      type: 'string',
      group: 'whatsapp',
      description: 'Mensaje que se predetermina al hacer clic en "Tengo dudas" (ej: "Hola, tengo dudas sobre la cotización del proyecto")',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'clientName',
      active: 'isActive',
    },
    prepare({ title, subtitle, active }) {
      return {
        title: `${active ? '🟢' : '🔴'} ${title}`,
        subtitle: `Cliente: ${subtitle || 'Sin nombre'}`,
      }
    },
  },
})
