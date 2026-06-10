'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { RefreshCcw, Download, Search, MessageCircle, ExternalLink, PlusCircle } from 'lucide-react'
import { getLeads, syncLeadsFromExcel, updateLeadStatus, type Lead } from '@/lib/services/crm'
import { toast } from 'sonner'
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { createClient } from '@/utils/supabase/client'

export default function CRMPage() {
    const supabase = createClient()
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [syncing, setSyncing] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedLead, setSelectedLead] = useState<Partial<Lead> | null>(null)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        const data = await getLeads()
        setLeads(data)
        setLoading(false)
    }

    const handleSync = async () => {
        setSyncing(true)
        const res = await syncLeadsFromExcel()
        if (res.success) {
            toast.success(`Sincronización completada: ${res.count} actualizados`)
            await loadData()
        } else {
            toast.error(res.error)
        }
        setSyncing(false)
    }

    const handleSave = async () => {
        if (!selectedLead?.name || !selectedLead?.phone) {
            toast.error('Nombre y Teléfono son obligatorios')
            return
        }

        setIsSaving(true)
        try {
            const { error } = await supabase
                .from('leads')
                .upsert([{
                    ...selectedLead,
                    updated_at: new Date().toISOString()
                }])
            
            if (error) throw error
            
            toast.success('Lead guardado')
            await loadData()
            setIsDialogOpen(false)
            setSelectedLead(null)
        } catch (error) {
            toast.error('Error al guardar lead')
        } finally {
            setIsSaving(false)
        }
    }

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await updateLeadStatus(id, newStatus)
            setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l))
            toast.success('Estado actualizado')
        } catch (error) {
            toast.error('Error al actualizar estado')
        }
    }

    const handleContact = async (lead: Lead) => {
        // Change status to Contactado automatically
        if (lead.status === 'Nuevo') {
            await handleStatusChange(lead.id, 'Contactado')
        }
        
        // Open WhatsApp
        const cleanPhone = lead.phone.replace(/\D/g, '')
        const message = encodeURIComponent(`Hola ${lead.name}, te contacto desde K&T Agencia Digital...`)
        window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank')
    }

    const openNew = () => {
        setSelectedLead({
            name: '',
            phone: '',
            country: 'Colombia',
            source: 'Manual',
            status: 'Nuevo'
        })
        setIsDialogOpen(true)
    }

    const filteredLeads = leads.filter(l => 
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (l.phone && l.phone.includes(searchTerm)) ||
        l.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (l.country && l.country.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        CRM de Clientes
                    </h1>
                    <p className="text-neutral-400 mt-2">Gestiona y contacta a tus clientes potenciales.</p>
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant="outline"
                        onClick={handleSync} 
                        disabled={syncing}
                        className="border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800"
                    >
                        <RefreshCcw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                        Sincronizar
                    </Button>
                    <Button 
                        onClick={openNew}
                        className="bg-white text-black hover:bg-neutral-200"
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Nuevo Lead
                    </Button>
                </div>
            </div>

            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-md">
                <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex w-full md:w-1/2 relative items-center">
                        <Search className="absolute left-3 text-neutral-500 w-4 h-4" />
                        <Input 
                            placeholder="Buscar por nombre, país, teléfono o fuente..." 
                            className="bg-neutral-950 border-neutral-800 pl-10 text-white" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-neutral-800 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-neutral-950">
                                <TableRow className="border-neutral-800 hover:bg-transparent">
                                    <TableHead className="text-neutral-300 py-4 pl-6">Cliente</TableHead>
                                    <TableHead className="text-neutral-300">País</TableHead>
                                    <TableHead className="text-neutral-300">Teléfono</TableHead>
                                    <TableHead className="text-neutral-300">Origen</TableHead>
                                    <TableHead className="text-neutral-300">Estado</TableHead>
                                    <TableHead className="text-neutral-300">Acción</TableHead>
                                    <TableHead className="text-right text-neutral-300 pr-6">Fecha</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow className="border-neutral-800">
                                        <TableCell colSpan={7} className="text-center py-12 text-neutral-500">
                                            <RefreshCcw className="w-8 h-8 animate-spin mx-auto mb-2 opacity-20" />
                                            Cargando leads...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredLeads.length === 0 ? (
                                    <TableRow className="border-neutral-800">
                                        <TableCell colSpan={7} className="text-center py-12 text-neutral-500">
                                            No se encontraron clientes.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredLeads.map((lead) => (
                                        <TableRow key={lead.id} className="border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                                            <TableCell className="font-medium text-white py-4 pl-6">
                                                {lead.name}
                                            </TableCell>
                                            <TableCell className="text-neutral-400 text-xs">
                                                {lead.country || '-'}
                                            </TableCell>
                                            <TableCell className="text-neutral-300 font-mono text-xs">
                                                {lead.phone}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest ${
                                                    lead.source === 'TikTok' 
                                                        ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' 
                                                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                }`}>
                                                    {lead.source}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    value={lead.status} 
                                                    onValueChange={(val) => handleStatusChange(lead.id, val)}
                                                >
                                                    <SelectTrigger className={`h-8 w-[130px] text-xs bg-neutral-950 border-neutral-800 ${
                                                        lead.status === 'Nuevo' ? 'text-green-400' :
                                                        lead.status === 'Contactado' ? 'text-yellow-400' :
                                                        'text-blue-400'
                                                    }`}>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                                        <SelectItem value="Nuevo">Nuevo</SelectItem>
                                                        <SelectItem value="Contactado">Contactado</SelectItem>
                                                        <SelectItem value="Cliente">Cliente</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    onClick={() => handleContact(lead)}
                                                    className="h-8 bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500 hover:text-black"
                                                >
                                                    <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                                                    Contactar
                                                </Button>
                                            </TableCell>
                                            <TableCell className="text-right text-neutral-500 text-xs pr-6">
                                                {new Date(lead.created_at).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-neutral-900 border-neutral-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Añadir Nuevo Lead</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Nombre Completo</Label>
                            <Input 
                                className="bg-neutral-950 border-neutral-800"
                                value={selectedLead?.name || ''} 
                                onChange={e => setSelectedLead({ ...selectedLead, name: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Teléfono</Label>
                                <Input 
                                    className="bg-neutral-950 border-neutral-800"
                                    value={selectedLead?.phone || ''} 
                                    onChange={e => setSelectedLead({ ...selectedLead, phone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>País</Label>
                                <Input 
                                    className="bg-neutral-950 border-neutral-800"
                                    value={selectedLead?.country || ''} 
                                    onChange={e => setSelectedLead({ ...selectedLead, country: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Origen</Label>
                                <Select 
                                    value={selectedLead?.source} 
                                    onValueChange={v => setSelectedLead({ ...selectedLead, source: v })}
                                >
                                    <SelectTrigger className="bg-neutral-950 border-neutral-800">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                        <SelectItem value="TikTok">TikTok</SelectItem>
                                        <SelectItem value="Organico">Orgánico</SelectItem>
                                        <SelectItem value="Web">Web</SelectItem>
                                        <SelectItem value="Manual">Manual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Estado Inicial</Label>
                                <Select 
                                    value={selectedLead?.status} 
                                    onValueChange={v => setSelectedLead({ ...selectedLead, status: v })}
                                >
                                    <SelectTrigger className="bg-neutral-950 border-neutral-800">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                        <SelectItem value="Nuevo">Nuevo</SelectItem>
                                        <SelectItem value="Contactado">Contactado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSave} disabled={isSaving} className="bg-white text-black hover:bg-neutral-200">
                            {isSaving ? 'Guardando...' : 'Guardar Lead'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
