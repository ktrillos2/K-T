'use client';

import { useState } from 'react';
import { Lead, LeadStatus } from '@/types/crm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { updateLeadStatusAction, updateLeadNotesAction } from '@/app/actions/crm';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { NotebookPen, Save, Loader2, MessageCircle, ChevronDown, Calendar, Phone, Zap, ShoppingCart } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface LeadCardProps {
    lead: Lead;
    onStatusUpdate: () => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function LeadCard({ lead, onStatusUpdate, isOpen, onToggle }: LeadCardProps) {
    const [updating, setUpdating] = useState(false);
    const [status, setStatus] = useState<LeadStatus>(lead.estado as LeadStatus || 'Nuevo');
    const [notesOpen, setNotesOpen] = useState(false);
    const [notes, setNotes] = useState(lead.notas || '');
    const [savingNotes, setSavingNotes] = useState(false);

    // --- Helpers ---
    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        let dateObj = new Date(dateString);
        if (!isNaN(Number(dateString)) && Number(dateString) > 1000000000) {
            dateObj = new Date(Number(dateString) * 1000);
        }
        return format(dateObj, 'dd MMM, hh:mm a', { locale: es });
    };

    const getStatusColor = (s: string) => {
        switch (s) {
            case 'Nuevo': return 'bg-blue-500 hover:bg-blue-600';
            case 'Mensaje Enviado': return 'bg-purple-500 hover:bg-purple-600';
            case 'Esperando Reunión': return 'bg-amber-500 hover:bg-amber-600';
            case 'Nuevo Cliente': return 'bg-green-600 hover:bg-green-700';
            case 'Cerrado/Perdido': return 'bg-slate-500 hover:bg-slate-600';
            default: return 'bg-gray-500';
        }
    };

    const getStatusColorHex = (s: string) => {
        switch (s) {
            case 'Nuevo': return '#3b82f6';
            case 'Mensaje Enviado': return '#a855f7';
            case 'Esperando Reunión': return '#f59e0b';
            case 'Esperando Cotización': return '#eab308';
            case 'Volver a Contactar': return '#ef4444';
            case 'Nuevo Cliente': return '#22c55e';
            case 'Cerrado/Perdido': return '#64748b';
            default: return '#6b7280';
        }
    };

    // --- Actions ---
    const handleStatusChange = async (newVal: string) => {
        setUpdating(true);
        setStatus(newVal as LeadStatus); // Optimistic update
        const res = await updateLeadStatusAction(lead.id, newVal);
        if (res.success) {
            toast.success('Estado actualizado');
            onStatusUpdate();
        } else {
            toast.error('Error al actualizar');
            setStatus(lead.estado as LeadStatus); // Revert
        }
        setUpdating(false);
    };

    const handleSaveNotes = async () => {
        setSavingNotes(true);
        const res = await updateLeadNotesAction(lead.id, notes);
        if (res.success) {
            toast.success('Nota guardada');
            setNotesOpen(false);
            // Optionally trigger a refresh or just rely on local state if we don't need full reload
        } else {
            toast.error('Error al guardar nota');
        }
        setSavingNotes(false);
    };

    const getCountryAndPriceInfo = (phone: string) => {
        const cleanPhone = phone?.replace(/\D/g, '') || '';
        let country = { name: 'Internacional', flag: '🌎', code: 'INT', tier: 'HIGH' };

        if (cleanPhone.startsWith('57')) country = { name: 'Colombia', flag: '🇨🇴', code: 'CO', tier: 'COP' };
        else if (cleanPhone.startsWith('1')) country = { name: 'USA', flag: '🇺🇸', code: 'US', tier: 'HIGH' };
        else if (cleanPhone.startsWith('52')) country = { name: 'México', flag: '🇲🇽', code: 'MX', tier: 'HIGH' };
        else if (cleanPhone.startsWith('507')) country = { name: 'Panamá', flag: '🇵🇦', code: 'PA', tier: 'HIGH' };
        else if (cleanPhone.startsWith('54')) country = { name: 'Argentina', flag: '🇦🇷', code: 'AR', tier: 'LOW' };
        else if (cleanPhone.startsWith('51')) country = { name: 'Perú', flag: '🇵🇪', code: 'PE', tier: 'LOW' };
        else if (cleanPhone.startsWith('593')) country = { name: 'Ecuador', flag: '🇪🇨', code: 'EC', tier: 'LOW' };
        else if (cleanPhone.startsWith('598')) country = { name: 'Uruguay', flag: '🇺🇾', code: 'UY', tier: 'LOW' };
        else if (cleanPhone.startsWith('595')) country = { name: 'Paraguay', flag: '🇵🇾', code: 'PY', tier: 'LOW' };
        else if (cleanPhone.startsWith('56')) country = { name: 'Chile', flag: '🇨🇱', code: 'CL', tier: 'LOW' };
        else if (cleanPhone.startsWith('34')) country = { name: 'España', flag: '🇪🇸', code: 'ES', tier: 'HIGH' };

        return country;
    };

    const countryInfo = getCountryAndPriceInfo(lead.telefono || '');

    const getPrices = (tier: string) => {
        switch (tier) {
            case 'COP': return { landing: '$450.000', ecommerce: '$1.300.000', currency: 'COP' };
            case 'LOW': return { landing: '$150', ecommerce: '$400', currency: 'USD' };
            case 'HIGH': default: return { landing: '$200', ecommerce: '$500', currency: 'USD' };
        }
    };

    const prices = getPrices(countryInfo.tier);

    const generateWhatsAppLink = (type: 'info' | 'landing' | 'ecommerce') => {
        const phone = lead.telefono?.replace(/\D/g, '') || '';
        if (!phone) return '#';

        let message = '';
        const name = lead.nombre || 'estimado/a';

        if (type === 'info') {
            message = `Hola ${name}, te saluda K&T Agencia Digital. Recibimos tu interés y nos gustaría conocer más sobre tu proyecto para brindarte una asesoría personalizada. ¿Tienes unos minutos?`;
        } else if (type === 'landing') {
            message = `Hola ${name}, un gusto saludarte. Recibimos tu interés en una Landing Page. Desarrollamos sitios de alto impacto con optimización SEO. ¿Te gustaría conocer más sobre nuestro proceso y los costos de inversión?`;
        } else if (type === 'ecommerce') {
            message = `Hola ${name}, un gusto saludarte. Vemos que te interesa una Tienda Virtual. Nuestras soluciones incluyen pasarelas de pago y panel administrativo completo. ¿Tienes disponibilidad para conversar sobre los requerimientos de tu catálogo?`;
        }

        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    };

    const detectInterest = () => {
        const text = ((lead.servicio || '') + ' ' + (lead.empresa || '')).toLowerCase();
        if (text.includes('tienda') || text.includes('commerce') || text.includes('virtual')) return '🛒 E-commerce';
        if (text.includes('landing') || text.includes('one page')) return '🚀 Landing Page';
        if (text.includes('asesor') || text.includes('consult')) return '🤝 Asesoría';
        if (text.includes('tiktok') || text.includes('ads')) return '📱 Publicidad';
        return '✨ General';
    };

    const interestLabel = detectInterest();

    const getPriceDisplay = () => {
        const isAsesoria = interestLabel.includes('Asesoría');
        const isLanding = interestLabel.includes('Landing');
        const isEcommerce = interestLabel.includes('E-commerce');

        if (!isAsesoria && !isLanding && !isEcommerce) return null;

        return (
            <div className="flex flex-col items-end text-[10px] leading-tight mt-1">
                {(isLanding || isAsesoria) && (
                    <span className="text-muted-foreground whitespace-nowrap">
                        Landing: <span className="font-semibold text-green-600">{prices.landing} {prices.currency}</span>
                    </span>
                )}
                {(isEcommerce || isAsesoria) && (
                    <span className="text-muted-foreground whitespace-nowrap">
                        Tienda: <span className="font-semibold text-green-600">{prices.ecommerce} {prices.currency}</span>
                    </span>
                )}
            </div>
        );
    };

    return (
        <Card
            className="!pb-0 group !gap-0 rounded-md border-l-[3px] overflow-hidden transition-all hover:shadow-md cursor-pointer flex flex-col h-full bg-card"
            style={{ borderLeftColor: getStatusColorHex(status) }}
            onClick={onToggle}
        >
            <div className="flex-1">
                <Collapsible open={isOpen} onOpenChange={() => { }}>
                    <CardHeader className="p-3 pb-1 space-y-0.5">
                        {/* Top: Date and Country */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-0.5">
                            <div className="flex items-center gap-1.5">
                                <span className="font-medium">{formatDate(lead.fecha)}</span>
                                {status === 'Nuevo' && (
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-1 opacity-80" title={countryInfo.name}>
                                <span>{countryInfo.flag}</span>
                                <span className="uppercase tracking-wide">{countryInfo.name}</span>
                            </div>
                        </div>

                        {/* Middle: Name and Info */}
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex flex-col min-w-0 pr-1">
                                <CardTitle className="text-base font-bold leading-tight truncate group-hover:text-primary transition-colors">
                                    {lead.nombre || 'Lead Sin Nombre'}
                                </CardTitle>
                                <CardDescription className="text-xs font-medium text-foreground/70 truncate mt-0.5">
                                    {interestLabel}
                                </CardDescription>
                            </div>

                            <div className="flex flex-col items-end shrink-0">
                                <div className="flex items-center gap-1 text-xs bg-secondary/50 px-1.5 py-0.5 rounded-sm mb-0.5">
                                    <Phone className="h-3 w-3 opacity-70" />
                                    <span>{lead.telefono || '-'}</span>
                                </div>
                                <div className="flex flex-col items-end text-xs leading-tight mt-1">
                                    {(interestLabel.includes('Landing') || interestLabel.includes('Asesoría')) && (
                                        <span className="text-muted-foreground whitespace-nowrap">
                                            Landing: <span className="font-semibold text-green-600">{prices.landing} {prices.currency}</span>
                                        </span>
                                    )}
                                    {(interestLabel.includes('E-commerce') || interestLabel.includes('Asesoría')) && (
                                        <span className="text-muted-foreground whitespace-nowrap">
                                            Tienda: <span className="font-semibold text-green-600">{prices.ecommerce} {prices.currency}</span>
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Chevron Indication */}
                        <div className="flex justify-center -mb-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronDown className={`h-4 w-4 text-muted-foreground/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </CardHeader>

                    <CollapsibleContent onClick={(e) => e.stopPropagation()} className="cursor-default">
                        <CardContent className="p-3 pt-0 pb-2">
                            <div className="pt-2 space-y-2 border-t border-dashed mt-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Acciones Rápidas</p>
                                <div className="grid grid-cols-2 gap-1.5">
                                    <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8 px-2 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors" onClick={() => handleStatusChange('Mensaje Enviado')} asChild>
                                        <a href={generateWhatsAppLink('info')} target="_blank">
                                            <MessageCircle className="h-3.5 w-3.5 mr-2 shrink-0 text-green-600" />
                                            <span className="truncate">General</span>
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8 px-2 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-colors" onClick={() => handleStatusChange('Mensaje Enviado')} asChild>
                                        <a href={generateWhatsAppLink('landing')} target="_blank">
                                            <Zap className="h-3.5 w-3.5 mr-2 shrink-0 text-amber-500" />
                                            <span className="truncate">Landing</span>
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8 px-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors" onClick={() => handleStatusChange('Mensaje Enviado')} asChild>
                                        <a href={generateWhatsAppLink('ecommerce')} target="_blank">
                                            <ShoppingCart className="h-3.5 w-3.5 mr-2 shrink-0 text-blue-500" />
                                            <span className="truncate">E-comm</span>
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8 px-2 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors" onClick={() => handleStatusChange('Esperando Reunión')}>
                                        <Calendar className="h-3.5 w-3.5 mr-2 shrink-0 text-purple-500" />
                                        <span className="truncate">Reunión</span>
                                    </Button>
                                </div>
                                <div className="mt-2">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="w-full text-xs h-8 flex items-center justify-center gap-2"
                                        onClick={() => setNotesOpen(true)}
                                    >
                                        <NotebookPen className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span>{lead.notas ? 'Ver/Editar Notas' : 'Agregar Nota'}</span>
                                        {lead.notas && <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500" />}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Notas del Lead</DialogTitle>
                        <DialogDescription>
                            {lead.nombre} - {interestLabel}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Textarea
                            placeholder="Escribe notas, observaciones o detalles importantes aquí..."
                            className="min-h-[150px]"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setNotesOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSaveNotes} disabled={savingNotes}>
                            {savingNotes ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                            Guardar Nota
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <CardFooter className="!p-0 mt-auto border-t" onClick={(e) => e.stopPropagation()}>
                <Select value={status} onValueChange={handleStatusChange} disabled={updating}>
                    <SelectTrigger className={`w-full h-9 rounded-none rounded-b-md text-sm border-0 focus:ring-0 text-white font-medium justify-center !p-4 ${getStatusColor(status)} shadow-none`}>
                        {updating ? <Loader2 className="h-3 w-3 animate-spin mr-1.5" /> : null}
                        <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Nuevo">🔵 Nuevo</SelectItem>
                        <SelectItem value="Mensaje Enviado">🟣 Mensaje Enviado</SelectItem>
                        <SelectItem value="Esperando Reunión">🟠 Esperando Reunión</SelectItem>
                        <SelectItem value="Esperando Cotización">🟡 Esperando Cotización</SelectItem>
                        <SelectItem value="Volver a Contactar">⏰ Volver a Contactar</SelectItem>
                        <SelectItem value="Nuevo Cliente">🟢 Nuevo Cliente</SelectItem>
                        <SelectItem value="Cerrado/Perdido">⚪ Cerrado/Perdido</SelectItem>
                    </SelectContent>
                </Select>
            </CardFooter>
        </Card>
    );
}
