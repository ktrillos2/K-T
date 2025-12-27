import { Lead, CreateLeadDTO } from '@/types/crm';

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

export const CRMService = {
    async fetchLeads(): Promise<Lead[]> {
        if (!GOOGLE_SCRIPT_URL) {
            console.warn('NEXT_PUBLIC_GOOGLE_SCRIPT_URL no está definida');
            return [];
        }

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL);
            const data = await response.json();

            if (data.status === 'success') {
                return data.data;
            } else {
                throw new Error(data.message || 'Error al obtener leads');
            }
        } catch (error) {
            console.error('Error fetching leads:', error);
            throw error;
        }
    },

    async createLead(leadData: CreateLeadDTO): Promise<void> {
        if (!GOOGLE_SCRIPT_URL) {
            throw new Error('Configuración incompleta: Falta URL del script');
        }

        try {
            // Google Apps Script requires text/plain or specific handling for CORS with complex headers usually 
            // but fetch('url', { method: 'POST', body: JSON.stringify(data) }) often triggers preflight CORS issues 
            // with standard simple requests depending on GAS deployment.
            // Standard workaround for simple POST to standard GAS Web App:
            // Use no-cors mode (opaque response) OR standard cors if script handles OPTIONS.
            // The provided GAS script is basic. 
            // For reliable JSON post from browser: use `mode: 'no-cors'` if you don't need the response body, 
            // OR ensure the script serves proper CORS headers (which is hard in GAS default).
            // However, the cleanest way is often creating a hidden iframe or using a proxy.
            // Given the constraints, we will try standard POST. If CORS fails, user might need 'no-cors' 
            // but that prevents reading the response.
            // Alternatively, standard `fecth` typically works with `redirect: follow` because GAS redirects to a content serving URL.

            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(leadData),
            });

            const data = await response.json();

            if (data.status !== 'success') {
                throw new Error(data.message || 'Error al crear lead');
            }
        } catch (error) {
            console.error('Error creating lead:', error);
            throw error;
        }
    }
};
