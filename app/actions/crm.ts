'use server';

import { Lead, CreateLeadDTO } from '@/types/crm';

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

export async function fetchLeadsAction(): Promise<{ success: boolean; data?: Lead[]; error?: string }> {
    if (!GOOGLE_SCRIPT_URL) {
        return { success: false, error: 'Configuration Error: GOOGLE_SCRIPT_URL is missing' };
    }

    try {
        // Adding a cache breaker or revalidate config might be needed depending on needs
        // For now, no-store to always get fresh data
        const GOOGLE_SCRIPT_WITH_KEY = `${GOOGLE_SCRIPT_URL}?key=${process.env.CR_SECRET_KEY}`;

        try {
            const response = await fetch(GOOGLE_SCRIPT_WITH_KEY, {
                method: 'GET',
                cache: 'no-store',
            });

            if (!response.ok) {
                // Check if it's a redirect to login (HTML response instead of JSON)
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('text/html')) {
                    return { success: false, error: 'Error de autenticación: El script no es público. Revisa los permisos de despliegue ("Anyone").' };
                }
                return { success: false, error: `Error HTTP: ${response.status}` };
            }

            const text = await response.text();
            // Try to parse JSON
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                // If parsing fails, it might be the HTML login page if the previous check passed somehow
                console.error('Server Action fetchLeads parse error. Response beginning:', text.substring(0, 150));
                return { success: false, error: 'Respuesta inválida del servidor (posiblemente HTML en lugar de JSON). Revisa permisos.' };
            }

            if (data.status === 'success') {
                console.log('Server Action fetchLeads success. Items:', data.data?.length);
                return { success: true, data: data.data };
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
