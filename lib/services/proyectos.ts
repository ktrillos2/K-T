'use server'

import { supabase } from '../db'
import { getUserProfile } from './auth'

export interface PendingProject {
    id: string
    title: string
    client: string
    description?: string
    priority: 'Alta' | 'Media' | 'Baja'
    status: 'Pendiente' | 'En Progreso' | 'Revisión'
    dueDate: string
    assigned_to?: string
    total_profit?: number
    paid_amount?: number
}

export async function getPendingProjects(): Promise<PendingProject[]> {
    const profile = await getUserProfile()
    if (!profile) return []

    let query = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

    // Filter if user is a worker
    if (profile.role !== 'admin') {
        query = query.eq('assigned_to', profile.email)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching projects:', error)
        return []
    }

    return (data || []).map(p => ({
        id: p.id,
        title: p.title,
        client: p.client,
        description: p.description,
        priority: p.priority as any,
        status: p.status as any,
        dueDate: p.due_date,
        assigned_to: p.assigned_to,
        total_profit: p.total_profit,
        paid_amount: p.paid_amount
    }))
}

export async function addProject(data: Omit<PendingProject, 'id'>) {
    const { error } = await supabase
        .from('projects')
        .insert([{
            title: data.title,
            client: data.client,
            description: data.description,
            priority: data.priority,
            status: data.status,
            due_date: data.dueDate,
            assigned_to: data.assigned_to,
            total_profit: data.total_profit,
            paid_amount: data.paid_amount
        }])

    if (error) throw error
    return { success: true }
}

export async function updateProject(id: string, data: Partial<PendingProject>) {
    const updateData: any = { ...data }
    if (data.dueDate) {
        updateData.due_date = data.dueDate
        delete updateData.dueDate
    }

    const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)

    if (error) throw error
    return { success: true }
}

export async function deleteProject(id: string) {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

    if (error) throw error
    return { success: true }
}

export async function updateProjectStatus(id: string, status: string) {
    const { error } = await supabase
        .from('projects')
        .update({ status })
        .eq('id', id)

    if (error) throw error
    return { success: true }
}
