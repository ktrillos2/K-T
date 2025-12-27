'use client';

import { useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchLeadsAction } from '@/app/actions/crm';
import { Lead } from '@/types/crm';

export function LeadList() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        let dateObj = new Date(dateString);
        if (!isNaN(Number(dateString)) && Number(dateString) > 1000000000 && Number(dateString) < 2000000000) {
            dateObj = new Date(Number(dateString) * 1000);
        }
        return format(dateObj, 'dd MMM yyyy, HH:mm', { locale: es });
    };

    const renderInterestBadge = (empresa: string) => {
        const interest = (empresa || '').toLowerCase();
        if (interest.includes('tienda')) return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Tienda Virtual</Badge>;
        if (interest.includes('landing')) return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Landing Page</Badge>;
        if (interest.includes('asesor') || interest.includes('seguro')) return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Asesoría</Badge>;
        return <span className="text-muted-foreground text-sm">{empresa || '-'}</span>;
    };

    const loadLeads = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await fetchLeadsAction();
            if (result.success && result.data) {
                setLeads(result.data);
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

    // Expose loadLeads via imperative handle if needed, or just let parent trigger refresh via key change
    // For now, allow manual refresh via button as well

    if (error) {
        return (
            <div className="text-center py-8 text-red-500">
                <p>{error}</p>
                <Button variant="outline" onClick={loadLeads} className="mt-4">
                    Reintentar
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Leads Recientes</h3>
                <Button variant="ghost" size="sm" onClick={loadLeads} disabled={loading}>
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Interés / Tipo de Sitio</TableHead>
                            <TableHead>Campaña</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                </TableRow>
                            ))
                        ) : leads.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24">
                                    No hay leads registrados.
                                </TableCell>
                            </TableRow>
                        ) : (
                            leads.map((lead) => (
                                <TableRow key={lead.id}>
                                    <TableCell className="whitespace-nowrap">
                                        {lead.fecha ? (() => {
                                            // Handle TikTok Unix Timestamp (seconds) or standard date string
                                            let dateObj = new Date(lead.fecha);
                                            // If it's a number-like string and dateObj is invalid or way back in 1970 (due to seconds vs ms)
                                            // Check if it's a seconds timestamp (10 digits)
                                            if (!isNaN(Number(lead.fecha)) && Number(lead.fecha) > 1000000000 && Number(lead.fecha) < 2000000000) {
                                                dateObj = new Date(Number(lead.fecha) * 1000);
                                            }

                                            return format(dateObj, 'dd MMM yyyy, HH:mm', { locale: es });
                                        })() : '-'}
                                    </TableCell>
                                    <TableCell className="font-medium">{lead.nombre}</TableCell>
                                    <TableCell>
                                        {(() => {
                                            const interest = (lead.empresa || '').toLowerCase();
                                            if (interest.includes('tienda')) return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Tienda Virtual</Badge>;
                                            if (interest.includes('landing')) return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Landing Page</Badge>;
                                            if (interest.includes('asesor') || interest.includes('seguro')) return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Asesoría</Badge>;
                                            return <span className="text-muted-foreground text-sm">{lead.empresa || '-'}</span>;
                                        })()}
                                    </TableCell>
                                    <TableCell>{lead.servicio}</TableCell>
                                    <TableCell>{lead.telefono || '-'}</TableCell>
                                    <TableCell>
                                        <Badge variant={lead.estado === 'Nuevo' ? 'default' : 'secondary'}>
                                            {lead.estado || 'Nuevo'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
