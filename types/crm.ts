export interface Lead {
  id: string;
  nombre: string;
  empresa: string;
  servicio: string;
  estado: string;
  fecha: string;
  telefono?: string;
}

export type CreateLeadDTO = Omit<Lead, 'id' | 'estado' | 'fecha'>;
