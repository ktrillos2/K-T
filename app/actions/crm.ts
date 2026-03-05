'use server';

import { Lead, CreateLeadDTO } from '@/types/crm';

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

export async function fetchLeadsAction(
    page: number = 1,
    limit: number = 50,
    searchTerm: string = '',
    filterStatus: string = 'all'
): Promise<{ success: boolean; data?: Lead[]; totalCount?: number; totalPages?: number; pendingCount?: number; error?: string }> {
    if (!GOOGLE_SCRIPT_URL) {
        return { success: false, error: 'Configuration Error: GOOGLE_SCRIPT_URL is missing' };
    }

    try {
        const GOOGLE_SCRIPT_WITH_KEY = `${GOOGLE_SCRIPT_URL}?key=${process.env.CR_SECRET_KEY}`;

        try {
            const response = await fetch(GOOGLE_SCRIPT_WITH_KEY, {
                method: 'GET',
                cache: 'no-store',
            });

            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('text/html')) {
                    return { success: false, error: 'Error de autenticación.' };
                }
                return { success: false, error: `Error HTTP: ${response.status}` };
            }

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('Server Action fetchLeads parse error.');
                return { success: false, error: 'Respuesta inválida del servidor.' };
            }

            if (data.status === 'success') {
                let leads: Lead[] = data.data || [];
                // Reverse to show newest first
                leads.reverse();

                // Calculate pending count for notification
                const pendingCount = leads.filter(l => l.estado === 'Nuevo' || l.estado === 'Volver a Contactar').length;

                // Apply filtering
                if (searchTerm || filterStatus !== 'all') {
                    leads = leads.filter(lead => {
                        const matchesSearch = !searchTerm ||
                            lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            lead.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (lead.servicio || '').toLowerCase().includes(searchTerm.toLowerCase());
                        const matchesStatus = filterStatus === 'all' || lead.estado === filterStatus;
                        return matchesSearch && matchesStatus;
                    });
                }

                const totalCount = leads.length;
                const totalPages = Math.ceil(totalCount / limit);

                // Apply pagination
                const startIndex = (page - 1) * limit;
                const paginatedLeads = leads.slice(startIndex, startIndex + limit);

                return {
                    success: true,
                    data: paginatedLeads,
                    totalCount,
                    totalPages,
                    pendingCount
                };
            } else {
                return { success: false, error: data.message || 'Error desconocido del script' };
            }
        } catch (error) {
            console.error('Server Action fetchLeads Error:', error);
            return { success: false, error: 'Error de conexión con el servidor.' };
        }
    } catch (error) {
        return { success: false, error: 'Unexpected error' };
    }
}

export async function createLeadAction(leadData: CreateLeadDTO): Promise<{ success: boolean; error?: string }> {
    if (!GOOGLE_SCRIPT_URL) {
        return { success: false, error: 'Configuration Error: Script URL missing' };
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(leadData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('Server Action createLead parse error:', text.substring(0, 150));
            return { success: false, error: 'Respuesta inválida al crear lead.' };
        }

        if (data.status === 'success') {
            return { success: true };
        } else {
            return { success: false, error: data.message || 'Error al crear lead' };
        }

    } catch (error) {
        console.error('Server Action createLead Error:', error);
        return { success: false, error: 'Error de conexión al crear lead' };
    }
}

export async function updateLeadStatusAction(id: string, newStatus: string): Promise<{ success: boolean; error?: string }> {
    if (!GOOGLE_SCRIPT_URL) return { success: false, error: 'Config Error' };

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'update_status',
                key: process.env.CR_SECRET_KEY, // Secure Backend-to-Script
                id: id,
                status: newStatus
            }),
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        });

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            return { success: false, error: 'Invalid JSON from GAS' };
        }

        if (data.status === 'success') {
            return { success: true };
        } else {
            return { success: false, error: data.message || 'Error updating status' };
        }

    } catch (error) {
        console.error('Update Status Error:', error);
        return { success: false, error: 'Connection Error' };
    }
}

export async function updateLeadNotesAction(id: string, notes: string): Promise<{ success: boolean; error?: string }> {
    if (!GOOGLE_SCRIPT_URL) return { success: false, error: 'Config Error' };

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'update_notes',
                key: process.env.CR_SECRET_KEY,
                id: id,
                notes: notes
            }),
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        });

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            return { success: false, error: 'Invalid JSON from GAS' };
        }

        if (data.status === 'success') {
            return { success: true };
        } else {
            return { success: false, error: data.message || 'Error updating notes' };
        }

    } catch (error) {
        console.error('Update Notes Error:', error);
        return { success: false, error: 'Connection Error' };
    }
}
