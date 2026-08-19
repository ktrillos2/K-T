'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { getBalances, type Transaction } from '@/lib/services/finanzas'
import { TransactionModal } from '@/components/finanzas/transaction-modal'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { Plus, Banknote, Building2, Smartphone } from 'lucide-react'

// Dummy historical data for visual representation
const dummyChartData = [
    { date: '1', balance: 5000000 },
    { date: '2', balance: 4800000 },
    { date: '3', balance: 5200000 },
    { date: '4', balance: 5100000 },
    { date: '5', balance: 4900000 },
    { date: '6', balance: 5600000 },
    { date: '7', balance: 2629000 },
]

export default function FinanzasPage() {
    const [balances, setBalances] = useState({ Nequi: 0, Bancolombia: 0, Efectivo: 0 })
    const [loading, setLoading] = useState(true)

    const fetchBalances = async () => {
        setLoading(true)
        const data = await getBalances()
        setBalances({ Nequi: data.Nequi, Bancolombia: data.Bancolombia, Efectivo: data.Efectivo })
        setLoading(false)
    }

    useEffect(() => {
        fetchBalances()
    }, [])

    const totalBalance = balances.Nequi + balances.Bancolombia + balances.Efectivo

    const formatMoney = (val: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 2
        }).format(val)
    }

    return (
        <div className="relative min-h-[85vh] text-white space-y-6 max-w-lg mx-auto md:max-w-4xl pb-24">
            <div>
                <h1 className="text-3xl font-bold mb-6">Panel</h1>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Efectivo Card */}
                <Card className="bg-[#1C1C1E] border-none shadow-lg rounded-2xl overflow-hidden hover:bg-[#2C2C2E] transition-all cursor-default">
                    <CardContent className="p-5">
                        <div className="bg-[#32ADC6] w-8 h-8 rounded mb-3 flex items-center justify-center shadow-sm">
                            <Banknote className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-neutral-500 text-xs font-bold tracking-wider mb-1">EFECTIVO</p>
                        <p className="text-xl md:text-2xl font-bold">
                            {loading ? '...' : formatMoney(balances.Efectivo)}
                        </p>
                    </CardContent>
                </Card>

                {/* Bancolombia Card */}
                <Card className="bg-[#1C1C1E] border-none shadow-lg rounded-2xl overflow-hidden hover:bg-[#2C2C2E] transition-all cursor-default">
                    <CardContent className="p-5">
                        <div className="bg-[#F8D22C] w-8 h-8 rounded mb-3 flex items-center justify-center shadow-sm text-black">
                            {/* Simple minimal icon for bank */}
                            <Building2 className="w-5 h-5" />
                        </div>
                        <p className="text-neutral-500 text-xs font-bold tracking-wider mb-1">BANCOLOMBIA</p>
                        <p className="text-xl md:text-2xl font-bold">
                            {loading ? '...' : formatMoney(balances.Bancolombia)}
                        </p>
                    </CardContent>
                </Card>

                {/* Nequi Card */}
                <Card className="bg-[#1C1C1E] border-none shadow-lg rounded-2xl overflow-hidden hover:bg-[#2C2C2E] transition-all cursor-default">
                    <CardContent className="p-5">
                        <div className="bg-[#78236B] w-8 h-8 rounded mb-3 flex items-center justify-center shadow-sm">
                            <Smartphone className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-neutral-500 text-xs font-bold tracking-wider mb-1">NEQUI</p>
                        <p className="text-xl md:text-2xl font-bold">
                            {loading ? '...' : formatMoney(balances.Nequi)}
                        </p>
                    </CardContent>
                </Card>

                {/* Agregar Cuenta Dummy */}
                <Card className="bg-[#1C1C1E] border-none shadow-lg rounded-2xl overflow-hidden hover:bg-[#2C2C2E] transition-all cursor-pointer flex flex-col items-center justify-center text-center p-4">
                    <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                        <Plus className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-neutral-300 text-sm">Agregar cuenta</p>
                </Card>
            </div>

            {/* Banner Promotional */}
            <Card className="bg-[#1C1C1E] border-none shadow-lg rounded-2xl flex flex-col items-center p-4 text-center mt-6">
                <div className="flex gap-4 items-center">
                    <div className="bg-blue-600 text-white rounded-2xl p-3 w-14 h-14 flex items-center justify-center">
                        {/* Speedometer Icon */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-6M6 12a6 6 0 1112 0" />
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                    </div>
                    <div className="text-left flex-1">
                        <h4 className="font-bold text-white text-sm">Finanzas Integradas</h4>
                        <p className="text-neutral-400 text-xs">Gestión inteligente que escala con tu agencia digital.</p>
                    </div>
                </div>
            </Card>

            {/* Trend Chart */}
            <Card className="bg-[#1C1C1E] border-none shadow-lg rounded-2xl overflow-hidden mt-6">
                <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-white">Tendencia del saldo</h3>
                        <span className="text-neutral-500 font-bold tracking-widest leading-none pb-2">...</span>
                    </div>
                    <p className="text-neutral-500 text-xs font-bold tracking-wider mb-1">TOTAL ACTUAL</p>
                    <p className="text-3xl md:text-4xl font-bold mb-6">
                        {loading ? '...' : formatMoney(totalBalance)}
                    </p>

                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dummyChartData}>
                                <defs>
                                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date" hide />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '8px' }}
                                    formatter={(value: number) => [formatMoney(value), 'Saldo']}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="balance" 
                                    stroke="#2563eb" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorBalance)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Modal de Transacción flotante */}
            <TransactionModal onTransactionAdded={fetchBalances} />
        </div>
    )
}
