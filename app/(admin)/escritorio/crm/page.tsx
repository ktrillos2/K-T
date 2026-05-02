'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { RefreshCcw, Download, Search } from 'lucide-react'
import { getLeads, syncLeadsFromExcel, type Lead } from '@/lib/services/crm'
import { toast } from 'sonner' // Requires sonner for toasts or any equivalent in your project

export default function CRMPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [syncing, setSyncing] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

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

    const filteredLeads = leads.filter(l => 
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        l.phone.includes(searchTerm) ||
        l.source.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    CRM de Clientes
                </h1>
                <p className="text-neutral-400 mt-2">Gestiona y sincroniza tus clientes de TikTok desde Google Sheets / Excel.</p>
            </div>

            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-md">
                <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex w-full md:w-1/2 relative relative items-center">
                        <Search className="absolute left-3 text-neutral-500 w-4 h-4" />
                        <Input 
                            placeholder="Buscar por nombre, teléfono o fuente..." 
                            className="bg-neutral-950 border-neutral-800 pl-10 text-white" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button 
                            variant="outline" 
                            className="w-full md:w-auto border-neutral-700 bg-neutral-950 hover:bg-neutral-800 text-white"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Exportar
                        </Button>
                        <Button 
                            onClick={handleSync} 
                            disabled={syncing}
                            className="w-full md:w-auto bg-white text-black hover:bg-neutral-200"
                        >
                            <RefreshCcw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                            Sincronizar Excel
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-neutral-800 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-neutral-950">
                                <TableRow className="border-neutral-800 hover:bg-transparent">
                                    <TableHead className="text-neutral-300">Cliente</TableHead>
                                    <TableHead className="text-neutral-300">Teléfono</TableHead>
                                    <TableHead className="text-neutral-300">Origen</TableHead>
                                    <TableHead className="text-neutral-300">Estado</TableHead>
                                    <TableHead className="text-right text-neutral-300">Fecha</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow className="border-neutral-800">
                                        <TableCell colSpan={5} className="text-center py-8 text-neutral-500">
                                            Cargando leads...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredLeads.length === 0 ? (
                                    <TableRow className="border-neutral-800">
                                        <TableCell colSpan={5} className="text-center py-8 text-neutral-500">
                                            No se encontraron clientes.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredLeads.map((lead) => (
                                        <TableRow key={lead.id} className="border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                                            <TableCell className="font-medium text-white">{lead.name}</TableCell>
                                            <TableCell className="text-neutral-300">{lead.phone}</TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                    lead.source === 'TikTok' 
                                                        ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' 
                                                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                }`}>
                                                    {lead.source}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                    lead.status === 'Nuevo' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                    lead.status === 'Contactado' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                                    'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20'
                                                }`}>
                                                    {lead.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right text-neutral-400">
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
        </div>
    )
}
