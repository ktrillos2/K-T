import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || ''
    
    // Extract subdomain from hostname (e.g. "tours.kytcode.lat" → "tours")
    const subdomain = hostname.split('.')[0]
    const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1')
    
    // Default domains that are not quotations
    const isMainDomain = subdomain === 'www' || subdomain === 'kytcode' || isLocalhost
    
    let matchedSlug = null

    // If it's a potential quotation subdomain, check Sanity dynamically
    if (!isMainDomain && subdomain) {
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bc3zxc91'
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
        
        const query = `*[_type == "cotizacion" && subdomain == "${subdomain}" && isActive == true][0].slug.current`
        const url = `https://${projectId}.apicdn.sanity.io/v2022-03-07/data/query/${dataset}?query=${encodeURIComponent(query)}`
        
        try {
            // Using CDN and caching the result in Edge for 60 seconds
            const res = await fetch(url, { next: { revalidate: 60 } })
            const data = await res.json()
            matchedSlug = data.result
        } catch (error) {
            console.error('Error fetching subdomain from Sanity:', error)
        }
    }
    
    if (matchedSlug) {
        // Rewrite the root path to the specific quotation
        if (request.nextUrl.pathname === '/') {
            return NextResponse.rewrite(new URL(`/cotizaciones/${matchedSlug}`, request.url))
        }
    } 

    if (isMainDomain && request.nextUrl.pathname.startsWith('/cotizaciones')) {
        // Block direct access to /cotizaciones from the main domain
        return NextResponse.redirect(new URL('https://www.kytcode.lat', request.url))
    } else if (!isMainDomain && !matchedSlug) {
        // If they access a subdomain that doesn't match any quotation, redirect to home
        if (request.nextUrl.pathname.startsWith('/cotizaciones') || request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('https://www.kytcode.lat', request.url))
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
