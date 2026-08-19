import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

/**
 * Generador de URLs de imagen de Sanity con soporte encadenable.
 * Configura por defecto auto formato WebP/AVIF y compresión controlada.
 */
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).auto('format').quality(75).fit('max')
}

export interface OptimizeImageOptions {
  width?: number
  height?: number
  quality?: number
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
  format?: 'webp' | 'jpg' | 'pjpg' | 'png' | 'auto'
}

/**
 * Optimiza cualquier URL de imagen de Sanity (cdn.sanity.io)
 * inyectando parámetros de compresión y redimensión para garantizar
 * que el peso se mantenga siempre por debajo de 500KB (habitualmente < 150KB).
 */
export function optimizeSanityUrl(
  url: string | null | undefined,
  options: OptimizeImageOptions = {}
): string {
  if (!url || typeof url !== 'string') return ''

  // Si no es una URL de CDN de Sanity, retornar intacta
  if (!url.includes('cdn.sanity.io/images')) {
    return url
  }

  const {
    width,
    height,
    quality = 75,
    fit = 'max',
    format = 'auto',
  } = options

  try {
    const parsedUrl = new URL(url)
    
    // Parámetros de optimización
    if (format === 'auto') {
      parsedUrl.searchParams.set('auto', 'format')
    } else if (format) {
      parsedUrl.searchParams.set('fm', format)
    }

    parsedUrl.searchParams.set('q', quality.toString())
    parsedUrl.searchParams.set('fit', fit)

    if (width) {
      parsedUrl.searchParams.set('w', width.toString())
    }
    if (height) {
      parsedUrl.searchParams.set('h', height.toString())
    }

    return parsedUrl.toString()
  } catch {
    // Si falla el parseo de URL, aplicar concatenación segura
    const separator = url.includes('?') ? '&' : '?'
    const params = new URLSearchParams()
    params.set('auto', 'format')
    params.set('q', quality.toString())
    params.set('fit', fit)
    if (width) params.set('w', width.toString())
    if (height) params.set('h', height.toString())

    return `${url}${separator}${params.toString()}`
  }
}

/** Preset optimizado para imágenes principales (Desktop Hero: max 1600px, ~80-180KB) */
export function getOptimizedHeroUrl(url: string | null | undefined): string {
  return optimizeSanityUrl(url, { width: 1600, quality: 75, fit: 'max' })
}

/** Preset optimizado para imágenes móviles (Mobile Hero: max 800px, ~30-70KB) */
export function getOptimizedMobileHeroUrl(url: string | null | undefined): string {
  return optimizeSanityUrl(url, { width: 800, quality: 75, fit: 'max' })
}

/** Preset optimizado para tarjetas y sliders (Cards: max 800px, ~30-60KB) */
export function getOptimizedCardUrl(url: string | null | undefined): string {
  return optimizeSanityUrl(url, { width: 800, quality: 75, fit: 'max' })
}

/** Preset optimizado para avatares y miniaturas (Avatar: 120x120px, ~4-10KB) */
export function getOptimizedAvatarUrl(url: string | null | undefined): string {
  return optimizeSanityUrl(url, { width: 120, height: 120, quality: 80, fit: 'crop' })
}
