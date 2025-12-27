export interface Lead {
  id: string;
  nombre: string;
  empresa: string;
  servicio: string;
  estado: string;
  fecha: string;
  telefono?: string;
  email?: string;
}


export type LeadStatus = 'Nuevo' | 'Mensaje Enviado' | 'Esperando Reunión' | 'Esperando Cotización' | 'Volver a Contactar' | 'Nuevo Cliente' | 'Cerrado/Perdido';

export type CreateLeadDTO = Omit<Lead, 'id' | 'estado' | 'fecha'>;
