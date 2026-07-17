'use server'

import { supabase } from '../db' // uses service role, bypasses RLS for panel
import { getUserProfile } from './auth'

export interface Transaction {
    id: string
    type: 'ingreso' | 'gasto'
    amount: number
    account: 'Nequi' | 'Bancolombia' | 'Efectivo'
    description: string
    user_email?: string
    created_at: string
}

export async function getBalances() {
    try {
        const { data, error } = await supabase
            .from('financial_transactions')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching transactions:', error)
            return { Nequi: 0, Bancolombia: 0, Efectivo: 0, history: [] }
        }

        let nequi = 0
        let bancolombia = 0
        let efectivo = 0

        const history = data as Transaction[]

        history.forEach(tx => {
            const val = tx.type === 'ingreso' ? Number(tx.amount) : -Number(tx.amount)
            if (tx.account === 'Nequi') nequi += val
            else if (tx.account === 'Bancolombia') bancolombia += val
            else if (tx.account === 'Efectivo') efectivo += val
        })

        return { Nequi: nequi, Bancolombia: bancolombia, Efectivo: efectivo, history }
    } catch (err) {
        console.error(err)
        return { Nequi: 0, Bancolombia: 0, Efectivo: 0, history: [] }
    }
}

export async function addTransaction(data: Omit<Transaction, 'id' | 'created_at' | 'user_email'>) {
    try {
        const profile = await getUserProfile()
        
        const { error } = await supabase
            .from('financial_transactions')
            .insert([{
                type: data.type,
                amount: data.amount,
                account: data.account,
                description: data.description,
                user_email: profile?.email || 'unknown'
            }])

        if (error) throw error
        return { success: true }
    } catch (err: any) {
        return { success: false, error: err.message }
    }
}
