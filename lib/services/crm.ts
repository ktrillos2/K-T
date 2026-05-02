import { supabase } from '../db'

export interface Lead {
    id: string
    name: string
    phone: string
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
        
        // Aquí iría la lógica real usando 'xlsx' o un fetch a Google Sheets CSV,
        // por ahora simulamos la inserción de 2 leads de TikTok:
        const mockLeads = [
            {
                name: 'Cliente TikTok 1',
                phone: '+573000000001',
                source: 'TikTok',
                status: 'Nuevo'
            },
            {
                name: 'Cliente TikTok 2',
                phone: '+573000000002',
                source: 'TikTok',
                status: 'Contactado'
            }
        ]

        // Simulamos inserción en Supabase (debes tener la tabla 'leads' creada)
        // await supabase.from('leads').upsert(mockLeads, { onConflict: 'phone' })

        return { success: true, count: mockLeads.length }
    } catch (error) {
        console.error("Error sincronizando leads:", error)
        return { success: false, error: 'Error procesando el archivo' }
    }
}

export async function getLeads(): Promise<Lead[]> {
    // Para probar la UI mientras configuras la BD
    return [
        {
            id: '1',
            name: 'Juan Pérez',
            phone: '+57 321 000 0000',
            source: 'TikTok',
            status: 'Nuevo',
            created_at: new Date().toISOString()
        },
        {
            id: '2',
            name: 'María Gómez',
            phone: '+57 310 000 0000',
            source: 'Organico',
            status: 'Contactado',
            created_at: new Date().toISOString()
        }
    ]
}
