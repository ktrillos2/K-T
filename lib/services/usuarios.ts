'use server'

import { supabase } from '@/lib/db'

export async function getUsers() {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
        
        if (error) {
            console.error('Database error in getUsers:', error)
            throw new Error(error.message)
        }
        return data || []
    } catch (err: any) {
        console.error('Server error in getUsers:', err)
        throw err
    }
}

export async function updateProfile(id: string, updates: { name?: string, role?: 'admin' | 'trabajador' }) {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    
    if (error) throw error
    return data
}

export async function deleteUser(id: string) {
    const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id)
    
    if (error) throw error
    return true
}

export async function createProfile(profile: { email: string, name: string, role: 'admin' | 'trabajador' }) {
    const { data, error } = await supabase
        .from('profiles')
        .insert([profile])
        .select()
        .single()
    
    if (error) throw error
    return data
}
