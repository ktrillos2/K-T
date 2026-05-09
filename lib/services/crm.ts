'use server'

import { supabase } from '../db' // uses service role, bypasses RLS for panel

export interface Lead {
    id: string
    name: string
    phone: string
    country: string
    source: string // 'TikTok', 'Organico', etc.
    status: string // 'Nuevo', 'Contactado', 'Convertido'
    created_at: string
}

/**
 * Función provisional para simular la descarga desde un Excel (Drive) 
 * y actualización en BD.
 */
export async function syncLeadsFromExcel(fileUrl?: string) {
    try {
        console.log(`Simulando sincronización de leads desde: ${fileUrl || 'URL por defecto'}`)
        
        const mockLeads = [
            {
                name: 'Juan Valdez',
                phone: '+573101234567',
                country: 'Colombia',
                source: 'TikTok',
                status: 'Nuevo'
            },
            {
                name: 'Carla Mendez',
                phone: '+573209876543',
                country: 'México',
                source: 'Web',
                status: 'Nuevo'
            }
        ]

        const { error } = await supabase
            .from('leads')
            .upsert(mockLeads, { onConflict: 'phone' })

        if (error) throw error

        return { success: true, count: mockLeads.length }
    } catch (error) {
        console.error("Error sincronizando leads:", error)
        return { success: false, error: 'Error procesando el archivo' }
    }
}

export async function getLeads(): Promise<Lead[]> {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
    
    if (error) {
        console.error('Error fetching leads:', error)
        return []
    }
    return data || []
}

export async function updateLeadStatus(id: string, status: string) {
    const { error } = await supabase
        .from('leads')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
    
    if (error) throw error
    return { success: true }
}
