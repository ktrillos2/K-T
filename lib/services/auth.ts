'use server'

import { createClient } from '@/utils/supabase/server'

export async function getUserProfile() {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
        return null
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (profileError || !profile) {
        // Fallback for admin if profile doesn't exist yet
        if (user.email === 'keteruse@gmail.com') {
            return {
                id: user.id,
                email: user.email,
                role: 'admin',
                name: 'Keyner'
            }
        }
        return {
            id: user.id,
            email: user.email,
            role: 'trabajador', // default
            name: user.email?.split('@')[0]
        }
    }

    return profile
}
