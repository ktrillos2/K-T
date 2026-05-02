'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { PlusCircle, AlertCircle, Clock, CheckCircle } from 'lucide-react'
import { getPendingProjects, type PendingProject } from '@/lib/services/proyectos'

export default function ProyectosPage() {
    const [projects, setProjects] = useState<PendingProject[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        const data = await getPendingProjects()
        // Sort by priority "Alta" -> "Media" -> "Baja"
        const priorityScore = { Alta: 3, Media: 2, Baja: 1 }
        const sortedData = data.sort((a, b) => priorityScore[b.priority] - priorityScore[a.priority])
        setProjects(sortedData)
        setLoading(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        Proyectos Pendientes
                    </h1>
                    <p className="text-neutral-400 mt-2">Visión general y priorización de desarrollos en curso.</p>
                </div>
                <Button className="bg-white text-black hover:bg-neutral-200">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Nuevo Proyecto
                </Button>
            </div>

            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-white">Lista de Tareas y Proyectos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-neutral-800 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-neutral-950">
                                <TableRow className="border-neutral-800 hover:bg-transparent">
                                    <TableHead className="text-neutral-300">Proyecto</TableHead>
                                    <TableHead className="text-neutral-300">Cliente</TableHead>
                                    <TableHead className="text-neutral-300 text-center">Prioridad</TableHead>
                                    <TableHead className="text-neutral-300">Estado</TableHead>
                                    <TableHead className="text-right text-neutral-300">Fecha Límite</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow className="border-neutral-800">
                                        <TableCell colSpan={5} className="text-center py-8 text-neutral-500">
                                            Cargando proyectos...
                                        </TableCell>
                                    </TableRow>
                                ) : projects.length === 0 ? (
                                    <TableRow className="border-neutral-800">
                                        <TableCell colSpan={5} className="text-center py-8 text-neutral-500">
                                            No hay proyectos pendientes.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    projects.map((project) => (
                                        <TableRow 
                                            key={project.id} 
                                            className={`border-neutral-800 transition-colors ${
                                                project.priority === 'Alta' 
                                                    ? 'bg-red-500/5 hover:bg-red-500/10' 
                                                    : 'hover:bg-neutral-800/50'
                                            }`}
                                        >
                                            <TableCell className="font-medium text-white">
                                                <div className="flex items-center space-x-2">
                                                    {project.priority === 'Alta' && <AlertCircle className="w-4 h-4 text-red-400" />}
                                                    <span>{project.title}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-neutral-300">{project.client}</TableCell>
                                            <TableCell className="text-center">
                                                <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${
                                                    project.priority === 'Alta' ? 'bg-red-500 text-white' :
                                                    project.priority === 'Media' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-blue-500/20 text-blue-400'
                                                }`}>
                                                    {project.priority}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    {project.status === 'Pendiente' ? <Clock className="w-3 h-3 text-neutral-400" /> :
                                                     project.status === 'En Progreso' ? <RefreshCcw className="w-3 h-3 text-blue-400 animate-spin-slow" /> :
                                                     <CheckCircle className="w-3 h-3 text-green-400" />
                                                    }
                                                    <span className={`text-sm ${
                                                        project.status === 'En Progreso' ? 'text-blue-300' : 'text-neutral-400'
                                                    }`}>
                                                        {project.status}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right text-neutral-400 font-mono text-sm">
                                                {new Date(project.dueDate).toLocaleDateString()}
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
