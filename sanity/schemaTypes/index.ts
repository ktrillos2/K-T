import { type SchemaTypeDefinition } from 'sanity'
import testimonial from './testimonial'
import cotizacion from './cotizacion'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testimonial, cotizacion],
}
