'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { PlusCircle, AlertCircle, Clock, CheckCircle, RefreshCcw, DollarSign, Wallet, Edit2, Trash2, Calendar as CalendarIcon } from 'lucide-react'
import { getPendingProjects, updateProject, deleteProject, addProject, type PendingProject } from '@/lib/services/proyectos'
import { getUserProfile } from '@/lib/services/auth'
import { getUsers } from '@/lib/services/usuarios'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'

export default function ProyectosPage() {
    const [projects, setProjects] = useState<PendingProject[]>([])
    const [workers, setWorkers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState<any>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Partial<PendingProject> | null>(null)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        const [projectsData, profile, usersData] = await Promise.all([
            getPendingProjects(),
            getUserProfile(),
            getUsers()
        ])
        
        setUserProfile(profile)
        setWorkers(usersData)
        
        const priorityScore: Record<string, number> = { Alta: 3, Media: 2, Baja: 1 }
        const sortedData = projectsData.sort((a, b) => priorityScore[b.priority] - priorityScore[a.priority])
        setProjects(sortedData)
        setLoading(false)
    }

    const handleSave = async () => {
        if (!selectedProject?.title || !selectedProject?.client) {
            toast.error('Título y Cliente son obligatorios')
            return
        }

        setIsSaving(true)
        try {
            if (selectedProject.id) {
                await updateProject(selectedProject.id, selectedProject)
                toast.success('Proyecto actualizado')
            } else {
                await addProject(selectedProject as any)
                toast.success('Proyecto creado')
            }
            await loadData()
            setIsDialogOpen(false)
            setSelectedProject(null)
        } catch (error) {
            toast.error('Error al guardar proyecto')
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este proyecto?')) return
        try {
            await deleteProject(id)
            toast.success('Proyecto eliminado')
            await loadData()
        } catch (error) {
            toast.error('Error al eliminar')
        }
    }

    const openEdit = (project: PendingProject) => {
        setSelectedProject(project)
        setIsDialogOpen(true)
    }

    const openNew = () => {
        setSelectedProject({
            title: '',
            client: '',
            description: '',
            priority: 'Media',
            status: 'Pendiente',
            assigned_to: '',
            total_profit: 0,
            paid_amount: 0,
            dueDate: new Date().toISOString().split('T')[0]
        })
        setIsDialogOpen(true)
    }

    const formatMoney = (val?: number) => {
        if (val === undefined) return '$0.00'
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(val)
    }

    const isAdmin = userProfile?.role === 'admin'

    return (
        <div className="space-y-6 pb-20 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                        {isAdmin ? 'Gestión de Proyectos' : 'Mis Proyectos'}
                    </h1>
                    <p className="text-neutral-400 mt-2">
                        {isAdmin 
                            ? 'Administra todos los desarrollos y asignaciones de la agencia.' 
                            : 'Lista de proyectos asignados y seguimiento de tus ganancias.'}
                    </p>
                </div>
                {isAdmin && (
                    <Button onClick={openNew} className="bg-white text-black hover:bg-neutral-200">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Nuevo Proyecto
                    </Button>
                )}
            </div>

            {/* Metrics for Workers */}
            {!isAdmin && projects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-md">
                        <CardContent className="p-6 flex items-center space-x-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                <DollarSign className="text-blue-400 w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-neutral-400">Total a Cobrar</p>
                                <p className="text-2xl font-bold text-white">
                                    {formatMoney(projects.reduce((acc, p) => acc + (p.total_profit || 0), 0))}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-md">
                        <CardContent className="p-6 flex items-center space-x-4">
                            <div className="p-3 bg-green-500/10 rounded-xl">
                                <Wallet className="text-green-400 w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-neutral-400">Total Pagado</p>
                                <p className="text-2xl font-bold text-white">
                                    {formatMoney(projects.reduce((acc, p) => acc + (p.paid_amount || 0), 0))}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-md overflow-hidden">
                <CardHeader className="border-b border-neutral-800 bg-neutral-900/30">
                    <CardTitle className="text-white text-lg">Desglose de Trabajo</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-neutral-950/50">
                                <TableRow className="border-neutral-800 hover:bg-transparent">
                                    <TableHead className="text-neutral-300 font-bold py-4 pl-6">Proyecto</TableHead>
                                    <TableHead className="text-neutral-300 font-bold">Cliente</TableHead>
                                    <TableHead className="text-neutral-300 font-bold text-center">Prioridad</TableHead>
                                    <TableHead className="text-neutral-300 font-bold">Estado</TableHead>
                                    {!isAdmin && <TableHead className="text-neutral-300 font-bold">Ganancia</TableHead>}
                                    {!isAdmin && <TableHead className="text-neutral-300 font-bold">Pagado</TableHead>}
                                    {isAdmin && <TableHead className="text-neutral-300 font-bold">Asignado a</TableHead>}
                                    {isAdmin && <TableHead className="text-neutral-300 font-bold">Acciones</TableHead>}
                                    <TableHead className="text-right text-neutral-300 font-bold pr-6">Entrega</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow className="border-neutral-800">
                                        <TableCell colSpan={isAdmin ? 7 : 7} className="text-center py-12 text-neutral-500">
                                            <div className="flex flex-col items-center">
                                                <RefreshCcw className="w-8 h-8 animate-spin mb-2 opacity-20" />
                                                <span>Cargando proyectos...</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : projects.length === 0 ? (
                                    <TableRow className="border-neutral-800">
                                        <TableCell colSpan={isAdmin ? 7 : 7} className="text-center py-12 text-neutral-500">
                                            No hay proyectos registrados.
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
                                            <TableCell className="font-medium text-white py-4 pl-6">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center space-x-2">
                                                        {project.priority === 'Alta' && <AlertCircle className="w-3 h-3 text-red-400" />}
                                                        <span className="text-sm font-semibold">{project.title}</span>
                                                    </div>
                                                    {project.description && (
                                                        <span className="text-[10px] text-neutral-500 mt-0.5 line-clamp-1">{project.description}</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-neutral-400 text-sm">{project.client}</TableCell>
                                            <TableCell className="text-center">
                                                <span className={`inline-flex px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-wider ${
                                                    project.priority === 'Alta' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                    project.priority === 'Media' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                                    'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                }`}>
                                                    {project.priority}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        project.status === 'Pendiente' ? 'bg-neutral-600' :
                                                        project.status === 'En Progreso' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' :
                                                        'bg-green-500'
                                                    }`} />
                                                    <span className={`text-xs font-medium ${
                                                        project.status === 'En Progreso' ? 'text-blue-300' : 'text-neutral-400'
                                                    }`}>
                                                        {project.status}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            {!isAdmin && (
                                                <TableCell className="text-xs text-blue-400 font-mono">
                                                    {formatMoney(project.total_profit)}
                                                </TableCell>
                                            )}
                                            {!isAdmin && (
                                                <TableCell className="text-xs text-green-400 font-mono">
                                                    {formatMoney(project.paid_amount)}
                                                </TableCell>
                                            )}
                                            {isAdmin && (
                                                <TableCell className="text-xs text-neutral-500">
                                                    {project.assigned_to || 'Sin asignar'}
                                                </TableCell>
                                            )}
                                            {isAdmin && (
                                                <TableCell>
                                                    <div className="flex items-center space-x-1">
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-neutral-400 hover:text-white" onClick={() => openEdit(project)}>
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-neutral-400 hover:text-red-400" onClick={() => handleDelete(project.id)}>
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            )}
                                            <TableCell className="text-right text-neutral-500 font-mono text-[11px] pr-6">
                                                {project.dueDate ? new Date(project.dueDate).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }) : '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{selectedProject?.id ? 'Editar Proyecto' : 'Nuevo Proyecto'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Título</Label>
                                <Input 
                                    className="bg-neutral-950 border-neutral-800"
                                    value={selectedProject?.title || ''} 
                                    onChange={e => setSelectedProject({ ...selectedProject, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Cliente</Label>
                                <Input 
                                    className="bg-neutral-950 border-neutral-800"
                                    value={selectedProject?.client || ''} 
                                    onChange={e => setSelectedProject({ ...selectedProject, client: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Descripción</Label>
                            <Textarea 
                                className="bg-neutral-950 border-neutral-800"
                                value={selectedProject?.description || ''} 
                                onChange={e => setSelectedProject({ ...selectedProject, description: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Prioridad</Label>
                                <Select 
                                    value={selectedProject?.priority} 
                                    onValueChange={(v: any) => setSelectedProject({ ...selectedProject, priority: v })}
                                >
                                    <SelectTrigger className="bg-neutral-950 border-neutral-800">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                        <SelectItem value="Alta">Alta</SelectItem>
                                        <SelectItem value="Media">Media</SelectItem>
                                        <SelectItem value="Baja">Baja</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Estado</Label>
                                <Select 
                                    value={selectedProject?.status} 
                                    onValueChange={(v: any) => setSelectedProject({ ...selectedProject, status: v })}
                                >
                                    <SelectTrigger className="bg-neutral-950 border-neutral-800">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                                        <SelectItem value="En Progreso">En Progreso</SelectItem>
                                        <SelectItem value="Completado">Completado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Asignado a</Label>
                                <Select 
                                    value={selectedProject?.assigned_to || ''} 
                                    onValueChange={(v: any) => setSelectedProject({ ...selectedProject, assigned_to: v })}
                                >
                                    <SelectTrigger className="bg-neutral-950 border-neutral-800">
                                        <SelectValue placeholder="Seleccionar..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                        <SelectItem value="null">Sin asignar</SelectItem>
                                        {workers.map(w => (
                                            <SelectItem key={w.email} value={w.email}>{w.name || w.email}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Fecha Entrega</Label>
                                <Input 
                                    type="date"
                                    className="bg-neutral-950 border-neutral-800"
                                    value={selectedProject?.dueDate || ''} 
                                    onChange={e => setSelectedProject({ ...selectedProject, dueDate: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Ganancia Trabajador</Label>
                                <Input 
                                    type="number"
                                    className="bg-neutral-950 border-neutral-800"
                                    value={selectedProject?.total_profit || 0} 
                                    onChange={e => setSelectedProject({ ...selectedProject, total_profit: Number(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Monto Pagado</Label>
                                <Input 
                                    type="number"
                                    className="bg-neutral-950 border-neutral-800"
                                    value={selectedProject?.paid_amount || 0} 
                                    onChange={e => setSelectedProject({ ...selectedProject, paid_amount: Number(e.target.value) })}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSave} disabled={isSaving} className="bg-white text-black hover:bg-neutral-200">
                            {isSaving ? 'Guardando...' : 'Guardar Proyecto'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
