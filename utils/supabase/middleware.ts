import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const isProtectedPath = pathname.startsWith('/crm') || 
                          pathname.startsWith('/proyectos') || 
                          pathname.startsWith('/finanzas') ||
                          pathname.startsWith('/usuarios')

    if (!isProtectedPath) {
        return NextResponse.next({ request });
    }

    let supabaseResponse = NextResponse.next({
        request,
    })

    // Create the Supabase client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    if (isProtectedPath) {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }

        // Check MFA level
        const { data } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
        const currentLevel = data?.currentLevel

        const isSetupPath = pathname.startsWith('/admin/mfa-setup')

        if (currentLevel !== 'aal2') {
            if (!isSetupPath) {
                const url = request.nextUrl.clone()
                url.pathname = '/admin/mfa-setup'
                return NextResponse.redirect(url)
            }
        } else {
            if (isSetupPath) {
                const url = request.nextUrl.clone()
                url.pathname = '/crm'
                return NextResponse.redirect(url)
            }
        }
    }

    return supabaseResponse
}
