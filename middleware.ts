import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

/**
 * Mapeado de subdominios a slugs de cotizaciones en Sanity.
 * Para agregar un nuevo subdominio, solo hay que agregar una entrada aquí
 * y asegurarse de que el slug exista en Sanity como cotización activa.
 */
const SUBDOMAIN_MAP: Record<string, string> = {
  pacificgravelero: 'pacificgravelero',
  serviciosdomicilio: 'servicios-domicilio',
  clases: 'curso-actuacion',
  tours: 'tours-amazonas',
  publicidad: 'gestion-publicitaria-contenido',
}

export async function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || ''
    
    // Extract subdomain from hostname (e.g. "tours.kytcode.lat" → "tours")
    const subdomain = hostname.split('.')[0]
    
    // Check if the subdomain matches any known quotation subdomain
    const matchedSlug = SUBDOMAIN_MAP[subdomain]
    
    if (matchedSlug) {
        if (request.nextUrl.pathname === '/') {
            return NextResponse.rewrite(new URL(`/cotizaciones/${matchedSlug}`, request.url))
        }
    }
    
    // If someone tries to access ANY quote page directly from the main domain, redirect them home
    const isSubdomainHost = Object.keys(SUBDOMAIN_MAP).some(sub => 
        hostname.includes(`${sub}.kytcode.lat`)
    )
    const isLocalhost = hostname.includes('localhost')

    if (!isSubdomainHost && !isLocalhost) {
        if (request.nextUrl.pathname.startsWith('/cotizaciones')) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    // Default supabase session update for all other routes
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
