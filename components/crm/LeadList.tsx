'use client';

import { useEffect, useState } from 'react';
import { Loader2, RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lead } from '@/types/crm';
import { fetchLeadsAction } from '@/app/actions/crm';
import { LeadCard } from './LeadCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function LeadList() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [openLeadId, setOpenLeadId] = useState<string | null>(null);

    const [filterStatus, setFilterStatus] = useState('all');

    const loadLeads = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await fetchLeadsAction();
            if (result.success && result.data) {
                // Reverse to show newest first
                setLeads(result.data.reverse());
            } else {
                setError(result.error || 'Error al cargar leads');
            }
        } catch (err) {
            setError('Error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLeads();
    }, []);

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (lead.servicio || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || lead.estado === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (error) {
        return (
            <div className="text-center py-12 text-red-500 bg-red-50 rounded-lg">
                <p className="mb-2 font-medium">⚠️ {error}</p>
                <Button variant="outline" onClick={loadLeads} size="sm">
                    Reintentar Conexión
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-lg border shadow-sm">
                <div className="relative w-full sm:w-auto flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por nombre, empresa..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-[200px]">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filtrar por estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los estados</SelectItem>
                            <SelectItem value="Nuevo">Nuevo</SelectItem>
                            <SelectItem value="Mensaje Enviado">Mensaje Enviado</SelectItem>
                            <SelectItem value="Esperando Reunión">Esperando Reunión</SelectItem>
                            <SelectItem value="Esperando Cotización">Esperando Cotización</SelectItem>
                            <SelectItem value="Volver a Contactar">Volver a Contactar</SelectItem>
                            <SelectItem value="Nuevo Cliente">Nuevo Cliente</SelectItem>
                            <SelectItem value="Cerrado/Perdido">Cerrado/Perdido</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                        {loading ? 'Sincronizando...' : `Última act: ${new Date().toLocaleTimeString()}`}
                    </span>
                    <Button variant="outline" size="icon" onClick={loadLeads} disabled={loading} className="shrink-0">
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                </div>
            </div>

            {loading && leads.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-48 rounded-xl bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
                    ))}
                </div>
            ) : filteredLeads.length === 0 ? (
                <div className="text-center py-20 opacity-50">
                    <p className="text-lg">No se encontraron leads.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLeads.map((lead) => (
                        <LeadCard
                            key={lead.id}
                            lead={lead}
                            onStatusUpdate={loadLeads}
                            isOpen={openLeadId === lead.id}
                            onToggle={() => setOpenLeadId(openLeadId === lead.id ? null : lead.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
