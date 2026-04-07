import { type SchemaTypeDefinition } from 'sanity'
import testimonial from './testimonial'
import cotizacion from './cotizacion'
import project from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testimonial, cotizacion, project],
}
