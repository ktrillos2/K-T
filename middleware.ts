import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || ''
    
    // Subdomain routing for Pacific Gravelero
    if (hostname.includes('pacificgravelero.kytcode.lat')) {
        // If accessing the root of the subdomain, rewrite to the quote page silently
        if (request.nextUrl.pathname === '/') {
            return NextResponse.rewrite(new URL('/cotizaciones/pacificgravelero', request.url))
        }
    } else {
        // If someone tries to access ANY quote page directly from the main domain, redirect them home
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
