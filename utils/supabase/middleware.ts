import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
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

    // Avoid doing expensive queries on purely public routes. Let's do it on anything aiming for admin or CRM.
    const isProtectedPath = request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/CRM')

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

        const isSetupPath = request.nextUrl.pathname.startsWith('/admin/mfa-setup') || request.nextUrl.pathname.startsWith('/CRM/mfa-setup')

        if (currentLevel !== 'aal2') {
            // User is at aal1 but looking for generic guarded paths. Redirect to MFA setup/verify.
            // We will handle enrollment or verifying within the same setup challenge page / components.
            if (!isSetupPath) {
                const url = request.nextUrl.clone()
                url.pathname = '/admin/mfa-setup' // We can put our component here
                return NextResponse.redirect(url)
            }
        } else {
            // They are aal2, if they try to go to the setup path, boot them to the CRM so they don't get stuck finding a QR code again
            if (isSetupPath) {
                const url = request.nextUrl.clone()
                url.pathname = '/CRM'
                return NextResponse.redirect(url)
            }
        }
    }

    return supabaseResponse
}
