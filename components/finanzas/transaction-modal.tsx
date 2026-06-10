'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { addTransaction } from '@/lib/services/finanzas'
import { toast } from 'sonner'
import { Loader2, Plus } from 'lucide-react'

export function TransactionModal({ onTransactionAdded }: { onTransactionAdded: () => void }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState<'ingreso' | 'gasto'>('gasto')
    const [amount, setAmount] = useState('')
    const [account, setAccount] = useState<'Nequi' | 'Bancolombia' | 'Efectivo'>('Nequi')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const numAmount = Number(amount.replace(/[^0-9]/g, ''))
        
        if (numAmount <= 0) {
            toast.error('El monto debe ser mayor a 0.')
            setLoading(false)
            return
        }

        const res = await addTransaction({
            type,
            amount: numAmount,
            account,
            description
        })

        if (res.success) {
            toast.success('Movimiento registrado correctamente.')
            setAmount('')
            setDescription('')
            setOpen(false)
            onTransactionAdded()
        } else {
            toast.error(res.error || 'Hubo un error registrando el movimiento.')
        }

        setLoading(false)
    }

    // Format number to currency style while typing
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9]/g, '')
        if (val) {
            setAmount(Number(val).toLocaleString('es-CO'))
        } else {
            setAmount('')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="fixed bottom-8 right-8 z-50">
                    {/* Shadow & Hover Effects matching the reference image */}
                    <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-4 shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all">
                        <Plus className="w-8 h-8" />
                    </button>
                    {/* Optional text or label if wanted */}
                </div>
            </DialogTrigger>
            <DialogContent className="bg-[#1C1C1E] border-neutral-800 text-white max-w-sm rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl">Nuevo Movimiento</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Type Toggle */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-black rounded-lg">
                        <button
                            type="button"
                            onClick={() => setType('ingreso')}
                            className={`py-2 text-sm font-semibold rounded-md transition-all ${type === 'ingreso' ? 'bg-[#2C2C2E] shadow-sm text-green-400' : 'text-neutral-500 hover:text-white'}`}
                        >
                            Ingreso
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('gasto')}
                            className={`py-2 text-sm font-semibold rounded-md transition-all ${type === 'gasto' ? 'bg-[#2C2C2E] shadow-sm text-red-400' : 'text-neutral-500 hover:text-white'}`}
                        >
                            Gasto
                        </button>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-neutral-400 text-xs uppercase tracking-wider">Monto</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-neutral-500 text-lg">$</span>
                            <Input
                                value={amount}
                                onChange={handleAmountChange}
                                required
                                className="pl-8 bg-[#2C2C2E] border-transparent text-white text-lg h-12 focus-visible:ring-1 focus-visible:ring-blue-500"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-neutral-400 text-xs uppercase tracking-wider">Cuenta</Label>
                        <Select value={account} onValueChange={(val: any) => setAccount(val)}>
                            <SelectTrigger className="bg-[#2C2C2E] border-transparent text-white h-12">
                                <SelectValue placeholder="Seleccionar Cuenta" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2C2C2E] border-neutral-800 text-white">
                                <SelectItem value="Efectivo">Efectivo 💵</SelectItem>
                                <SelectItem value="Bancolombia">Bancolombia 🟡</SelectItem>
                                <SelectItem value="Nequi">Nequi 🟣</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-neutral-400 text-xs uppercase tracking-wider">Concepto (Opcional)</Label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-[#2C2C2E] border-transparent text-white h-12"
                            placeholder="Ej: Pago de Servidor"
                        />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white h-12 rounded-xl text-md font-semibold">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                        Registrar {type === 'ingreso' ? 'Ingreso' : 'Gasto'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
