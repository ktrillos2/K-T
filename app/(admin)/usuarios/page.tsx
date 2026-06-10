'use client'

import { useState, useEffect } from 'react'
import { getUsers, deleteUser, createProfile, updateProfile } from '@/lib/services/usuarios'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Shield, User, Mail, Calendar, UserPlus, Trash2, Edit2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'

export default function UsuariosPage() {
    const supabase = createClient()
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [selectedUser, setSelectedUser] = useState<any>(null)

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        setLoading(true)
        try {
            const data = await getUsers()
            setUsers(data)
        } catch (error) {
            console.error('Error in loadUsers:', error)
            toast.error('Error al cargar usuarios')
        } finally {
            setLoading(false)
        }
    }

    const openNew = () => {
        setSelectedUser({
            name: '',
            email: '',
            role: 'trabajador'
        })
        setIsDialogOpen(true)
    }

    const handleSave = async () => {
        if (!selectedUser?.email || !selectedUser?.name) {
            toast.error('Nombre y Email son obligatorios')
            return
        }

        setIsSaving(true)
        try {
            if (selectedUser.id) {
                await updateProfile(selectedUser.id, {
                    name: selectedUser.name,
                    role: selectedUser.role
                })
            } else {
                await createProfile({
                    email: selectedUser.email,
                    name: selectedUser.name,
                    role: selectedUser.role
                })
            }
            
            toast.success('Usuario guardado')
            await loadUsers()
            setIsDialogOpen(false)
            setSelectedUser(null)
        } catch (error) {
            toast.error('Error al guardar usuario')
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id: string, role: string) => {
        if (role === 'admin') {
            toast.error('No se puede eliminar a un administrador')
            return
        }

        if (!confirm('¿Estás seguro de eliminar este usuario?')) return

        try {
            await deleteUser(id)
            toast.success('Usuario eliminado')
            setUsers(users.filter(u => u.id !== id))
        } catch (error) {
            toast.error('Error al eliminar usuario')
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
                        Gestión de Usuarios
                    </h1>
                    <p className="text-neutral-400 mt-1">
                        Administra el equipo y sus niveles de acceso
                    </p>
                </div>
                <Button onClick={openNew} className="bg-white text-black hover:bg-neutral-200">
                    <UserPlus size={18} className="mr-2" />
                    Nuevo Usuario
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 text-center">
                        <Loader2 className="w-10 h-10 animate-spin mx-auto text-neutral-600 mb-4" />
                        <p className="text-neutral-400">Cargando equipo...</p>
                    </div>
                ) : users.map((user) => (
                    <Card key={user.id} className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-all overflow-hidden group">
                        <div className={`h-1.5 w-full ${user.role === 'admin' ? 'bg-white' : 'bg-neutral-600'}`} />
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-neutral-800 rounded-lg">
                                    {user.role === 'admin' ? <Shield size={20} className="text-white" /> : <User size={20} className="text-neutral-400" />}
                                </div>
                                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
                                    user.role === 'admin' 
                                    ? 'bg-white/10 text-white border border-white/20' 
                                    : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                                }`}>
                                    {user.role}
                                </span>
                            </div>
                            <CardTitle className="mt-4 text-xl group-hover:text-white transition-colors">
                                {user.name || 'Sin Nombre'}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2">
                                <Mail size={12} />
                                {user.email}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4 border-t border-neutral-800/50 space-y-4">
                            <div className="flex items-center justify-between text-sm text-neutral-500">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span>Desde {new Date(user.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-2 pt-2">
                                {user.role !== 'admin' && (
                                    <>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={() => {
                                                setSelectedUser(user)
                                                setIsDialogOpen(true)
                                            }}
                                            className="flex-1 border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white"
                                        >
                                            <Edit2 size={14} className="mr-2" />
                                            Editar
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={() => handleDelete(user.id, user.role)}
                                            className="border-neutral-800 hover:bg-red-950/30 hover:text-red-500 hover:border-red-900/50 text-neutral-500"
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </>
                                )}
                                {user.role === 'admin' && (
                                    <p className="text-[10px] text-neutral-600 uppercase tracking-tighter w-full text-center py-2">
                                        Administrador (Protegido)
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {!loading && users.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-neutral-500 bg-neutral-900/30 rounded-2xl border border-dashed border-neutral-800">
                    <User size={48} className="mb-4 opacity-20" />
                    <p className="text-lg">No hay usuarios registrados</p>
                    <p className="text-sm">Comienza agregando a tu primer colaborador</p>
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-neutral-900 border-neutral-800 text-white">
                    <DialogHeader>
                        <DialogTitle>{selectedUser?.id ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Nombre Completo</Label>
                            <Input 
                                className="bg-neutral-950 border-neutral-800"
                                value={selectedUser?.name || ''} 
                                onChange={e => setSelectedUser({ ...selectedUser, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Correo Electrónico</Label>
                            <Input 
                                className="bg-neutral-950 border-neutral-800"
                                type="email"
                                value={selectedUser?.email || ''} 
                                onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                disabled={!!selectedUser?.id}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSave} disabled={isSaving} className="bg-white text-black hover:bg-neutral-200">
                            {isSaving ? 'Guardando...' : 'Guardar Usuario'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
