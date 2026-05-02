import { supabase } from '../db' // uses service role, bypasses RLS for panel

export interface Transaction {
    id: string
    type: 'ingreso' | 'gasto'
    amount: number
    account: 'Nequi' | 'Bancolombia' | 'Efectivo'
    description: string
    created_at: string
}

export async function getBalances() {
    // We will do a generic query to get all transactions and calculate on server
    // In a huge app this would be an RPC call doing SUM, but for a personal agency this is fine.
    try {
        const { data, error } = await supabase
            .from('financial_transactions')
            .select('*')

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

export async function addTransaction(data: Omit<Transaction, 'id' | 'created_at'>) {
    try {
        const { error } = await supabase
            .from('financial_transactions')
            .insert([{
                type: data.type,
                amount: data.amount,
                account: data.account,
                description: data.description
            }])

        if (error) throw error
        return { success: true }
    } catch (err: any) {
        return { success: false, error: err.message }
    }
}
