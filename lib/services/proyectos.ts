export interface PendingProject {
    id: string
    title: string
    client: string
    priority: 'Alta' | 'Media' | 'Baja'
    status: 'Pendiente' | 'En Progreso' | 'Revisión'
    dueDate: string
}

export async function getPendingProjects(): Promise<PendingProject[]> {
    return [
        {
            id: '1',
            title: 'Rediseño de E-Commerce',
            client: 'Telas Real',
            priority: 'Alta',
            status: 'En Progreso',
            dueDate: '2026-05-15',
        },
        {
            id: '2',
            title: 'Configuración CRM TikTok',
            client: 'San Roque',
            priority: 'Alta',
            status: 'Pendiente',
            dueDate: '2026-04-30',
        },
        {
            id: '3',
            title: 'SEO Tecnico',
            client: 'Psicowork',
            priority: 'Media',
            status: 'Revisión',
            dueDate: '2026-05-10',
        },
        {
            id: '4',
            title: 'Actualización de Menu',
            client: 'Chévere Bogotá',
            priority: 'Baja',
            status: 'Pendiente',
            dueDate: '2026-06-01',
        }
    ]
}
