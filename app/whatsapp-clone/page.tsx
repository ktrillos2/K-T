'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, MoreVertical, Phone, Video, Search, Check, CheckCheck, Tag } from 'lucide-react';
import Head from 'next/head';

// Tipos básicos para el estado
type Message = {
    id: string;
    text: string;
    sender: 'me' | 'them';
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
};

// Extender el objeto global Windows para Tailwind o definir clases base
const hideScrollbarClass = "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-500 transition-colors";

// Accesos Rápidos (Quick Replies)
export type QuickReply = {
    id: string;
    command: string;
    text: string;
};

const DEFAULT_QUICK_REPLIES: QuickReply[] = [
    { id: '1', command: '/landing', text: '¡Hola! Nuestra Landing Page incluye diseño personalizado, integración con tus redes, SEO básico y dominio gratis por 1 año. El costo es de $350 USD y tardamos 7 días hábiles. ¿Quieres ver nuestra UI o revisar opciones?' },
    { id: '2', command: '/ecommerce', text: 'Una tienda online completa (E-commerce) con pasarela de pago, inventario y hasta 50 productos cuesta desde $850 USD. Incluye capacitación. ¿Deseas agendar una llamada de asesoría gratuita?' },
    { id: '3', command: '/saludo', text: '¡Hola! Gracias por comunicarte con K&T Agency. ¿En qué podemos ayudarte el día de hoy?' },
    { id: '4', command: '/precios', text: 'Puedes encontrar nuestro catálogo completo de servicios y planes de pago en nuestro sitio web: www.kytcode.lat/servicios' }
];

type Chat = {
    id: string;
    name: string;
    phoneNumber: string;
    avatar: string;
    messages: Message[];
    unreadCount: number;
    label: 'bot' | 'esperando' | 'completado';
    isArchived?: boolean;
    isPinned?: boolean;
};

// Datos de prueba (Mock)
const mockChats: Chat[] = [
    {
        id: '1',
        name: 'Cliente Potencial',
        phoneNumber: '573001234567',
        avatar: 'https://i.pravatar.cc/150?u=1',
        unreadCount: 2,
        label: 'bot',
        messages: [
            { id: 'm1', text: 'Hola, me interesa el servicio', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 60), status: 'read' },
            { id: 'm2', text: '¿Me puedes dar más información?', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 30), status: 'read' },
        ],
    },
    {
        id: '2',
        name: 'Soporte Técnico',
        phoneNumber: '573119876543',
        avatar: 'https://i.pravatar.cc/150?u=2',
        unreadCount: 0,
        label: 'esperando',
        messages: [
            { id: 'm3', text: '¿En qué te podemos ayudar?', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), status: 'read' },
            { id: 'm4', text: 'Todo resuelto, gracias', sender: 'them', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), status: 'read' },
        ],
    },
];

export default function WhatsAppWebClone() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [inputText, setInputText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'esperando' | 'bot' | 'completado' | 'archived'>('all');

    // Estado para menú de etiquetas global o por chat
    const [showTagMenu, setShowTagMenu] = useState(false); // Global header tag menu
    const [chatTagMenuId, setChatTagMenuId] = useState<string | null>(null); // Per-chat tag menu in list

    const [isSearchActive, setIsSearchActive] = useState(false);
    const [activeChatSearchQuery, setActiveChatSearchQuery] = useState('');

    // Estado para "Respuestas Rápidas" con el comando "/"
    const [showQuickReplies, setShowQuickReplies] = useState(false);
    const [quickReplyFilter, setQuickReplyFilter] = useState('');
    const [quickReplies, setQuickReplies] = useState<QuickReply[]>(DEFAULT_QUICK_REPLIES);

    // Estado para gestionar respuestas rápidas (Modal)
    const [isManageQuickRepliesOpen, setIsManageQuickRepliesOpen] = useState(false);
    const [editingQuickReply, setEditingQuickReply] = useState<QuickReply | null>(null);
    const [newQuickReplyCommand, setNewQuickReplyCommand] = useState('');
    const [newQuickReplyText, setNewQuickReplyText] = useState('');

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const activeChat = chats.find(c => c.id === activeChatId);

    // Fetch data from Turso
    const fetchChats = async () => {
        try {
            const res = await fetch('/api/whatsapp/chats');
            if (res.ok) {
                const data = await res.json();

                // Keep dates as Date objects
                const parsedChats = data.chats.map((chat: any) => ({
                    ...chat,
                    messages: chat.messages.map((msg: any) => ({
                        ...msg,
                        timestamp: new Date(msg.timestamp)
                    }))
                }));

                setChats(parsedChats);
            }
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    // Polling effect
    useEffect(() => {
        fetchChats(); // Fetch immediately on mount
        const intervalId = setInterval(fetchChats, 4000); // Poll every 4 seconds
        return () => clearInterval(intervalId);
    }, []);

    // Helper to call PATCH API for chat metadata
    const patchChatMetadata = async (chatId: string, updates: any) => {
        try {
            await fetch(`/api/whatsapp/chats/${chatId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
        } catch (e) {
            console.error('Error updating chat metadata API', e);
        }
    };


    // Lista de chats filtrada y ordenada (Fijados primero)
    const filteredChats = chats
        .filter(chat => {
            // Filtro por texto (búsqueda en nombre o mensajes)
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesName = chat.name.toLowerCase().includes(query);
                const matchesMessages = chat.messages.some(m => m.text.toLowerCase().includes(query));
                if (!matchesName && !matchesMessages) return false;
            }

            // Excluir archivados a menos que se esté en la vista 'archived'
            if (activeFilter === 'archived') return chat.isArchived;
            if (chat.isArchived) return false;

            // Filtro por etiquetas/pills
            if (activeFilter === 'unread') return chat.unreadCount > 0;
            if (activeFilter === 'bot') return chat.label === 'bot';
            if (activeFilter === 'esperando') return chat.label === 'esperando';
            if (activeFilter === 'completado') return chat.label === 'completado';

            return true;
        })
        .sort((a, b) => {
            // Fijados siempre primero
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;

            // Luego orden por último mensaje
            const aTime = a.messages[a.messages.length - 1]?.timestamp.getTime() || 0;
            const bTime = b.messages[b.messages.length - 1]?.timestamp.getTime() || 0;
            return bTime - aTime;
        });

    // Cambiar la etiqueta del chat activo o cualquier chat específico
    const changeActiveLabel = (label: 'bot' | 'esperando' | 'completado', targetChatId?: string) => {
        const idToUpdate = targetChatId || activeChatId;
        if (!idToUpdate) return;

        setChats((prev: Chat[]) => prev.map((chat: Chat) =>
            chat.id === idToUpdate ? { ...chat, label } : chat
        ));

        patchChatMetadata(idToUpdate, { label });

        setShowTagMenu(false);
        setChatTagMenuId(null);
    };

    // Alternar estado de Archivado
    // Funciones para gestionar Respuestas Rápidas
    const handleSaveQuickReply = () => {
        if (!newQuickReplyCommand.trim() || !newQuickReplyText.trim()) return;

        let formattedCommand = newQuickReplyCommand.trim().toLowerCase();
        if (!formattedCommand.startsWith('/')) {
            formattedCommand = '/' + formattedCommand;
        }

        if (editingQuickReply) {
            setQuickReplies(prev => prev.map(qr => qr.id === editingQuickReply.id ? { ...qr, command: formattedCommand, text: newQuickReplyText } : qr));
        } else {
            setQuickReplies(prev => [...prev, { id: Date.now().toString(), command: formattedCommand, text: newQuickReplyText }]);
        }

        setEditingQuickReply(null);
        setNewQuickReplyCommand('');
        setNewQuickReplyText('');
    };

    const handleDeleteQuickReply = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setQuickReplies(prev => prev.filter(qr => qr.id !== id));
        if (editingQuickReply?.id === id) {
            setEditingQuickReply(null);
            setNewQuickReplyCommand('');
            setNewQuickReplyText('');
        }
    };

    const toggleArchive = (e: React.MouseEvent, chatId: string) => {
        e.stopPropagation();
        setChats((prev: Chat[]) => prev.map((chat: Chat) =>
            chat.id === chatId ? { ...chat, isArchived: !chat.isArchived } : chat
        ));

        const chatToUpdated = chats.find(c => c.id === chatId);
        if (chatToUpdated) {
            patchChatMetadata(chatId, { is_archived: !chatToUpdated.isArchived });
        }
        setChatTagMenuId(null);
    };

    // Alternar estado de Fijado
    const togglePin = (e: React.MouseEvent, chatId: string) => {
        e.stopPropagation();
        setChats((prev: Chat[]) => prev.map((chat: Chat) =>
            chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
        ));

        const chatToUpdated = chats.find(c => c.id === chatId);
        if (chatToUpdated) {
            patchChatMetadata(chatId, { is_pinned: !chatToUpdated.isPinned });
        }
        setChatTagMenuId(null);
    };

    // Auto-scroll al fondo cuando hay un nuevo mensaje
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeChat?.messages]);

    // Simulación de "marcar como leído"
    useEffect(() => {
        if (activeChatId) {
            const activeChatData = chats.find(c => c.id === activeChatId);
            if (activeChatData && activeChatData.unreadCount > 0) {
                setChats((prev: Chat[]) => prev.map((chat: Chat) =>
                    chat.id === activeChatId ? { ...chat, unreadCount: 0 } : chat
                ));
                patchChatMetadata(activeChatId, { unread_count: 0 });
            }

            setIsSearchActive(false);
            setActiveChatSearchQuery('');
            setShowQuickReplies(false);
        }
    }, [activeChatId, chats]);

    // Manejar lógica del input para activar/filtrar los accesos rápidos "/"
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputText(val);

        if (val.startsWith('/')) {
            setShowQuickReplies(true);
            setQuickReplyFilter(val.toLowerCase());
        } else {
            setShowQuickReplies(false);
        }
    };

    // Insertar la respuesta rápida en el chat
    const handleInsertQuickReply = (text: string) => {
        setInputText(text);
        setShowQuickReplies(false);
        // Opcional: auto-focus al input luego de seleccionar o auto-enviar si se desea, 
        // aquí lo dejamos listo en el input para que el operador lo revise antes de enviar.
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputText.trim() || !activeChat || isSending) return;

        const newMessage: Message = {
            id: `m-${Date.now()}`,
            text: inputText,
            sender: 'me',
            timestamp: new Date(),
            status: 'sent',
        };

        // Actualización optimista del UI
        setChats((prev: Chat[]) => prev.map((chat: Chat) => {
            if (chat.id === activeChat.id) {
                return {
                    ...chat,
                    messages: [...chat.messages, newMessage]
                };
            }
            return chat;
        }));
        setInputText('');
        setShowQuickReplies(false);
        setIsSending(true);

        try {
            // Llamada real al endpoint
            const response = await fetch('/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: activeChat.phoneNumber,
                    text: newMessage.text,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error enviando mensaje');
            }

            // Actualizar estado a "entregado" (simulado para el éxito de la API)
            setChats((prev: Chat[]) => prev.map((chat: Chat) => {
                if (chat.id === activeChat.id) {
                    return {
                        ...chat,
                        messages: chat.messages.map((msg: Message) =>
                            msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
                        )
                    };
                }
                return chat;
            }));

        } catch (error) {
            console.error('Error:', error);
            // Opcional: Mostrar un toast de error o marcar el mensaje con error visual
            // Para este demo, simplemente no lo marcamos como entregado y podríamos revertirlo
        } finally {
            setIsSending(false);
        }
    };


    // Formato de hora simple
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            <Head>
                <title>Soporte WhatsApp | K&T Agency</title>
                <meta name="description" content="Panel de soporte y atención al cliente vía WhatsApp integrado." />
            </Head>

            <div className="fixed inset-0 z-[9999] flex bg-[#f0f2f5] dark:bg-[#111b21] overflow-hidden text-[#111b21] dark:text-[#e9edef] select-none" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>

                {/* BARRA LATERAL (LISTA DE CHATS) */}
                <div className={`w-full md:w-[30%] lg:w-[400px] border-r border-[#d1d7db] dark:border-[#222d34] flex flex-col bg-white dark:bg-[#111b21] ${activeChatId ? 'hidden md:flex' : 'flex'}`}>

                    {/* Header Sidebar */}
                    <div className="h-[60px] bg-[#f0f2f5] dark:bg-[#202c33] flex items-center justify-between px-4 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700">
                                <img src="/images/logo.png" alt="K&T Logo" className="w-[85%] h-[85%] object-contain" />
                            </div>
                            <span className="font-semibold text-[15px]">K&T</span>
                        </div>
                        <div className="flex gap-4 text-[#54656f] dark:text-[#aebac1]">
                            <MoreVertical className="cursor-pointer" />
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="p-2 bg-white dark:bg-[#111b21] border-b border-[#f0f2f5] dark:border-[#202c33]">
                        <div className="relative flex items-center bg-[#f0f2f5] dark:bg-[#202c33] rounded-lg px-3 py-1.5 mb-2">
                            <Search className="w-4 h-4 text-[#54656f] dark:text-[#aebac1] mr-3" />
                            <input
                                type="text"
                                placeholder="Busca un chat o un mensaje"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-[#54656f] dark:placeholder:text-[#8696a0]"
                            />
                        </div>
                        <div className={`flex gap-2 overflow-x-auto pb-2 overflow-y-hidden ${hideScrollbarClass}`}>
                            <button onClick={() => setActiveFilter('all')} className={`px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 active:scale-95 ${activeFilter === 'all' ? 'bg-[#d9fdd3] text-[#005c4b] dark:bg-[#005c4b] dark:text-[#e9edef]' : 'bg-[#f0f2f5] text-[#54656f] dark:bg-[#202c33] dark:text-[#8696a0] hover:bg-[#e4e6eb] dark:hover:bg-[#2a3942]'}`}>Todos</button>
                            <button onClick={() => setActiveFilter('unread')} className={`px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 active:scale-95 ${activeFilter === 'unread' ? 'bg-[#d9fdd3] text-[#005c4b] dark:bg-[#005c4b] dark:text-[#e9edef]' : 'bg-[#f0f2f5] text-[#54656f] dark:bg-[#202c33] dark:text-[#8696a0] hover:bg-[#e4e6eb] dark:hover:bg-[#2a3942]'}`}>No leídos</button>
                            <button onClick={() => setActiveFilter('archived')} className={`px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 active:scale-95 ${activeFilter === 'archived' ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100' : 'bg-[#f0f2f5] text-[#54656f] dark:bg-[#202c33] dark:text-[#8696a0] hover:bg-[#e4e6eb] dark:hover:bg-[#2a3942]'}`}>Hilos Archivados</button>
                            <button onClick={() => setActiveFilter('esperando')} className={`px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 active:scale-95 ${activeFilter === 'esperando' ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' : 'bg-[#f0f2f5] text-[#54656f] dark:bg-[#202c33] dark:text-[#8696a0] hover:bg-[#e4e6eb] dark:hover:bg-[#2a3942]'}`}>Esperando</button>
                            <button onClick={() => setActiveFilter('bot')} className={`px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 active:scale-95 ${activeFilter === 'bot' ? 'bg-[#e4eb57]/30 text-[#8e9611] dark:bg-[#e4eb57]/20 dark:text-[#d3db42]' : 'bg-[#f0f2f5] text-[#54656f] dark:bg-[#202c33] dark:text-[#8696a0] hover:bg-[#e4e6eb] dark:hover:bg-[#2a3942]'}`}>Bot IA</button>
                            <button onClick={() => setActiveFilter('completado')} className={`px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 active:scale-95 ${activeFilter === 'completado' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-[#25d366]' : 'bg-[#f0f2f5] text-[#54656f] dark:bg-[#202c33] dark:text-[#8696a0] hover:bg-[#e4e6eb] dark:hover:bg-[#2a3942]'}`}>Resuelto</button>
                        </div>
                    </div>

                    <div className={`overflow-y-auto overflow-x-hidden flex-1 h-full ${hideScrollbarClass}`}>
                        {filteredChats.map(chat => {
                            const lastMessage = chat.messages[chat.messages.length - 1];
                            return (
                                <div
                                    key={chat.id}
                                    onClick={() => setActiveChatId(chat.id)}
                                    // El swipe to archive: usamos un contenedor que se desliza visualmente con un borde arrastrable (simulado con hover profundo por simplificación de eventos en web o un contenedor)
                                    // Para React nativo o touch puro requeriría una librería como framer-motion o react-swipeable, aplicamos un comportamiento hover deslizable web-friendly + focus-within  como atajo rápido visual.
                                    className={`relative group flex items-center cursor-pointer transition-colors border-b border-[#f0f2f5] dark:border-[#222d34] ${activeChatId === chat.id ? 'bg-[#f0f2f5] dark:bg-[#2a3942]' : 'hover:bg-[#f5f6f6] dark:hover:bg-[#202c33]'} ${chatTagMenuId === chat.id ? 'z-50' : 'z-10'}`}
                                >

                                    {/* Fondo de Swipe Backing (Archive Acción rápida - Solo móvil con active state, sin hover global) */}
                                    <div className="absolute right-0 top-0 bottom-0 bg-blue-500 dark:bg-blue-600 w-24 flex items-center justify-center text-white translation-x-full transition-transform duration-300 opacity-0 group-active:opacity-100 lg:group-active:opacity-0 touch-pan-x z-0">
                                        <button onClick={(e) => toggleArchive(e, chat.id)} className="w-full h-full font-semibold text-sm active:scale-95 transition-transform">
                                            {chat.isArchived ? 'Desarchivar' : 'Archivar'}
                                        </button>
                                    </div>

                                    {/* Capa Principal del Chat (Se mueve suavemente a la izquierda al hacer tap prolongado/swipe en móvil únicamente) */}
                                    <div className="flex-1 flex px-4 py-3 relative z-10 bg-white dark:bg-[#111b21] group-active:-translate-x-24 lg:group-active:translate-x-0 transition-transform duration-300 ease-in-out w-full select-none"
                                    >

                                        <div className="relative mr-4 shrink-0">
                                            <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                                            {chat.unreadCount > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-[#25d366] text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-[#111b21]">
                                                    {chat.unreadCount}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className={`font-medium text-[16px] truncate ${chat.unreadCount > 0 ? 'font-bold' : ''}`}>
                                                    {chat.name}
                                                    {chat.isPinned && <span className="ml-2 text-gray-400 rotate-45 inline-block text-xs">📌</span>}
                                                </h3>
                                                {lastMessage && (
                                                    <span className={`text-xs ${chat.unreadCount > 0 ? 'text-[#25d366] font-semibold' : 'text-[#667781] dark:text-[#8696a0]'}`}>
                                                        {formatTime(lastMessage.timestamp)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex justify-between items-center text-sm text-[#667781] dark:text-[#8696a0]">
                                                <p className={`truncate mr-2 ${chat.unreadCount > 0 ? 'text-[#111b21] dark:text-[#e9edef] font-medium' : ''}`}>
                                                    {lastMessage?.sender === 'me' ? 'Tú: ' : ''}
                                                    {lastMessage?.text || 'Sin mensajes'}
                                                </p>
                                            </div>

                                            {/* ETIQUETAS DE CHAT Y BOTONES RáPIDOS */}
                                            <div className="mt-1 flex gap-1 justify-between items-center group/label">
                                                <div className="flex gap-1">
                                                    {chat.label === 'bot' && (
                                                        <span className="bg-[#e4eb57]/20 text-[#aab315] dark:text-[#d3db42] text-[10px] px-2 py-[2px] rounded-full font-bold uppercase tracking-wider border border-[#e4eb57]/50">
                                                            Bot IA
                                                        </span>
                                                    )}
                                                    {chat.label === 'esperando' && (
                                                        <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] px-2 py-[2px] rounded-full font-bold uppercase tracking-wider border border-orange-500/30">
                                                            Esperando Agente
                                                        </span>
                                                    )}
                                                    {chat.label === 'completado' && (
                                                        <span className="bg-green-500/10 text-[#005c4b] dark:text-[#25d366] text-[10px] px-2 py-[2px] rounded-full font-bold uppercase tracking-wider border border-green-500/30">
                                                            Resuelto
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Mini Utilities Button */}
                                                <div className="relative">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setChatTagMenuId(chatTagMenuId === chat.id ? null : chat.id);
                                                            setIsSearchActive(false); // Cierra la busqueda activa arriba
                                                        }}
                                                        className="opacity-0 group-hover/label:opacity-100 transition-all p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#2a3942] active:scale-90"
                                                    >
                                                        <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                    </button>

                                                    {/* Mini Tag/Pin Menu */}
                                                    {chatTagMenuId === chat.id && (
                                                        <div className="absolute right-0 top-6 bg-white dark:bg-[#233138] shadow-lg rounded-md overflow-hidden z-[9999] w-40 border border-gray-200 dark:border-[#2a3942] animate-in slide-in-from-top-1 fade-in duration-200" onClick={(e) => e.stopPropagation()}>
                                                            <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase border-b border-gray-100 dark:border-[#2a3942]">Etiqueta</div>
                                                            <button onClick={() => changeActiveLabel('esperando', chat.id)} className="w-full text-left px-3 py-1.5 text-xs hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-2 transition-colors">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div><span className="text-gray-800 dark:text-gray-200 font-medium">Esperando</span>
                                                            </button>
                                                            <button onClick={() => changeActiveLabel('bot', chat.id)} className="w-full text-left px-3 py-1.5 text-xs hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-2 transition-colors">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-[#d3db42]"></div><span className="text-gray-800 dark:text-gray-200 font-medium">Bot IA</span>
                                                            </button>
                                                            <button onClick={() => changeActiveLabel('completado', chat.id)} className="w-full text-left px-3 py-1.5 text-xs hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-2 transition-colors border-b border-gray-100 dark:border-[#2a3942]">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-[#25d366]"></div><span className="text-gray-800 dark:text-gray-200 font-medium">Resuelto</span>
                                                            </button>

                                                            <button onClick={(e) => togglePin(e, chat.id)} className="w-full text-left px-3 py-2 text-xs hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-2 transition-colors border-t border-gray-100 dark:border-[#2a3942] text-blue-600 dark:text-blue-400 font-semibold mt-1 pt-2">
                                                                {chat.isPinned ? 'Desfijar chat' : 'Fijar chat'}
                                                            </button>
                                                            <button onClick={(e) => toggleArchive(e, chat.id)} className="w-full text-left px-3 py-2 text-xs hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-2 transition-colors text-blue-600 dark:text-blue-400 font-semibold mb-1 pb-1">
                                                                {chat.isArchived ? 'Desarchivar chat' : 'Archivar chat'}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* PANEL PRINCIPAL (CHAT ACTIVO) */}
                {activeChat ? (
                    <div className={`flex-1 flex flex-col bg-[#e5ddd5] dark:bg-[#0b141a] relative ${!activeChatId ? 'hidden md:flex' : 'flex'}`}>

                        {/* Background Pattern (Opcional, simula textura WhatsApp) */}
                        <div className="absolute inset-0 opacity-40 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://w0.peakpx.com/wallpaper/709/359/HD-wallpaper-whatsapp-dark-pattern-texture.jpg")', backgroundSize: '400px', zIndex: 0 }}></div>

                        {/* Header Chat */}
                        <div className="h-[60px] bg-[#f0f2f5] dark:bg-[#202c33] flex items-center justify-between px-4 z-10 shrink-0">
                            <div className="flex items-center cursor-pointer">
                                {/* Botón atrás móvil */}
                                <button onClick={() => setActiveChatId(null)} className="md:hidden mr-2 text-[#54656f] dark:text-[#aebac1]">
                                    &larr;
                                </button>
                                <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                                <div>
                                    <h2 className="font-medium text-[16px] leading-5">{activeChat.name}</h2>
                                    <p className="text-xs text-[#667781] dark:text-[#8696a0]">{activeChat.phoneNumber}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 text-[#54656f] dark:text-[#aebac1] items-center relative">
                                {/* Menú de etiquetas (Tag Menu) */}
                                <div className="relative">
                                    <Tag onClick={() => { setShowTagMenu(!showTagMenu); setIsSearchActive(false); }} className={`cursor-pointer w-5 h-5 transition-transform duration-200 active:scale-75 ${showTagMenu ? 'text-green-500 scale-110' : ''}`} />
                                    {showTagMenu && (
                                        <div className="absolute right-0 top-8 bg-white dark:bg-[#233138] shadow-lg rounded-md overflow-hidden z-[9999] w-48 border border-gray-200 dark:border-[#2a3942] animate-in slide-in-from-top-1 fade-in duration-200">
                                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-[#2a3942]">
                                                Asignar Etiqueta
                                            </div>
                                            <button onClick={() => changeActiveLabel('esperando')} className="w-full text-left px-4 py-3 text-sm hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-2 transition-colors">
                                                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                                <span className="text-gray-800 dark:text-gray-200">Esperando Agente</span>
                                            </button>
                                            <button onClick={() => changeActiveLabel('bot')} className="w-full text-left px-4 py-3 text-sm hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-2 transition-colors">
                                                <div className="w-2 h-2 rounded-full bg-[#d3db42]"></div>
                                                <span className="text-gray-800 dark:text-gray-200">Bot IA</span>
                                            </button>
                                            <button onClick={() => changeActiveLabel('completado')} className="w-full text-left px-4 py-3 text-sm hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-2 transition-colors border-b border-gray-100 dark:border-[#2a3942]">
                                                <div className="w-2 h-2 rounded-full bg-[#25d366]"></div>
                                                <span className="text-gray-800 dark:text-gray-200">Resuelto</span>
                                            </button>
                                            <button onClick={(e) => toggleArchive(e, activeChat.id)} className="w-full text-left px-4 py-3 text-sm hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-2 transition-colors text-blue-600 dark:text-blue-400 font-bold">
                                                {activeChat.isArchived ? 'Desarchivar este chat' : 'Archivar este chat'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <Search className={`cursor-pointer w-5 h-5 ml-1 transition-transform duration-200 active:scale-75 ${isSearchActive ? 'text-blue-500 scale-110' : ''}`} onClick={() => { setIsSearchActive(!isSearchActive); setShowTagMenu(false); setActiveChatSearchQuery(''); }} />
                                <MoreVertical className="cursor-pointer w-5 h-5 ml-1 transition-transform active:scale-90" />
                            </div>
                        </div>

                        {/* Barra de Búsqueda Activa */}
                        {isSearchActive && (
                            <div className="bg-white dark:bg-[#111b21] p-2 border-b border-[#f0f2f5] dark:border-[#202c33] z-10 shrink-0 shadow-sm animate-in slide-in-from-top-2">
                                <div className="relative flex items-center bg-[#f0f2f5] dark:bg-[#202c33] rounded-lg px-3 py-1.5">
                                    <Search className="w-4 h-4 text-[#54656f] dark:text-[#aebac1] mr-3" />
                                    <input
                                        type="text"
                                        placeholder="Buscar en el chat..."
                                        value={activeChatSearchQuery}
                                        onChange={(e) => setActiveChatSearchQuery(e.target.value)}
                                        /* Búsqueda dentro del chat: quitar hover states o animations globales del mouse si los hay aplicando p-0 o clases seguras */
                                        className="bg-transparent border-none outline-none w-full text-sm placeholder:text-[#54656f] dark:placeholder:text-[#8696a0]"
                                        autoFocus
                                    />
                                    <button onClick={() => { setIsSearchActive(false); setActiveChatSearchQuery(''); }} className="ml-2 text-[#54656f] dark:text-[#aebac1] hover:text-black dark:hover:text-white pb-1 font-black text-lg transition-transform active:scale-90">&times;</button>
                                </div>
                            </div>
                        )}

                        {/* Messages Area */}
                        <div className={`flex-1 overflow-y-auto p-4 z-10 flex flex-col gap-2 ${hideScrollbarClass}`}>
                            {activeChat.messages.map((msg, idx) => {
                                const isMe = msg.sender === 'me';
                                const showTail = idx === 0 || activeChat.messages[idx - 1].sender !== msg.sender;

                                // Resaltador de búsqueda
                                const isHighlighted = activeChatSearchQuery && msg.text.toLowerCase().includes(activeChatSearchQuery.toLowerCase());

                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-1`}>
                                        <div className={`
                      relative max-w-[85%] md:max-w-[65%] px-3 py-1.5 rounded-lg shadow-sm text-[14.2px] leading-5 transition-all
                      ${isMe ? 'bg-[#d9fdd3] dark:bg-[#005c4b] rounded-tr-none' : 'bg-white dark:bg-[#202c33] rounded-tl-none'}
                      ${showTail ? 'mt-2' : ''}
                      ${isHighlighted ? 'ring-2 ring-yellow-400 bg-yellow-100 dark:bg-yellow-900/50' : ''}
                    `}>
                                            <span className="break-words">{msg.text}</span>

                                            <div className="flex items-center justify-end gap-1 mt-1 -mb-1 text-[11px] text-[#667781] dark:text-[#8696a0]">
                                                <span>{formatTime(msg.timestamp)}</span>
                                                {isMe && (
                                                    <span className={`${msg.status === 'read' ? 'text-[#53bdeb]' : ''}`}>
                                                        {msg.status === 'sent' ? <Check className="w-3.5 h-3.5" /> : <CheckCheck className="w-3.5 h-3.5" />}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Contenedor Inferior Relativo: QuickReplies + Input */}
                        <div className="relative z-20 shrink-0">

                            {/* Menú Flotante de Respuestas Rápidas (/) */}
                            {showQuickReplies && (
                                <div className="absolute bottom-full left-4 right-4 mb-2 bg-white dark:bg-[#233138] rounded-xl shadow-xl border border-gray-100 dark:border-[#2a3942] overflow-hidden max-h-[300px] flex flex-col z-50">
                                    <div className="px-4 py-3 bg-gray-50 dark:bg-[#182229] border-b border-gray-100 dark:border-[#2a3942] flex justify-between items-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        <span>Respuestas Rápidas</span>
                                        <button
                                            onClick={(e) => { e.preventDefault(); setIsManageQuickRepliesOpen(true); setShowQuickReplies(false); }}
                                            className="text-blue-500 hover:text-blue-600 flex items-center gap-1 active:scale-95 transition-transform font-bold"
                                        >
                                            <span className="text-[14px] leading-none mb-[2px]">⚙️</span> Gestionar
                                        </button>
                                    </div>
                                    <div className={`overflow-y-auto ${hideScrollbarClass}`}>
                                        {quickReplies.filter(qr => qr.command.startsWith(quickReplyFilter)).length > 0 ? (
                                            quickReplies.filter(qr => qr.command.startsWith(quickReplyFilter)).map((reply) => (
                                                <button
                                                    key={reply.id}
                                                    onClick={() => handleInsertQuickReply(reply.text)}
                                                    className="w-full text-left px-4 py-3 border-b border-gray-50 dark:border-[#2a3942]/50 hover:bg-[#f0f2f5] dark:hover:bg-[#202c33] transition-colors focus:bg-[#f0f2f5] dark:focus:bg-[#202c33] outline-none"
                                                >
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-bold text-[#00a884] text-sm">{reply.command}</span>
                                                        <span className="text-sm text-[#54656f] dark:text-[#aebac1] truncate">{reply.text}</span>
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="flex flex-col items-center justify-center px-4 py-4 text-sm text-[#54656f] dark:text-[#aebac1] text-center italic">
                                                <p>No hay atajos que coincidan con &quot;{quickReplyFilter}&quot;</p>
                                                <button onClick={(e) => { e.preventDefault(); setNewQuickReplyCommand(quickReplyFilter); setIsManageQuickRepliesOpen(true); setShowQuickReplies(false); }} className="mt-2 text-blue-500 font-semibold hover:underline not-italic cursor-pointer">
                                                    + Añadir como nueva respuesta
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Input Area */}
                            <div className="min-h-[62px] bg-[#f0f2f5] dark:bg-[#202c33] flex items-center px-4 py-2 gap-3">
                                <form onSubmit={handleSendMessage} className="flex-1 flex gap-2 items-center relative">
                                    <Input
                                        value={inputText}
                                        onChange={handleInputChange}
                                        placeholder="Escribe un mensaje o usa '/' para atajos"
                                        className="flex-1 rounded-lg border-none bg-white dark:bg-[#2a3942] focus-visible:ring-0 shadow-sm h-10 px-4 text-[15px]"
                                        disabled={isSending}
                                    />
                                    {inputText.trim() ? (
                                        <Button type="submit" size="icon" className="bg-[#00a884] hover:bg-[#008f6f] w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100" disabled={isSending}>
                                            <Send className="w-5 h-5 text-white ml-0.5" />
                                        </Button>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                            {/* Espacio reservado si no hay texto */}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    // PANTALLA VACÍA (IDLE)
                    <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-[#f0f2f5] dark:bg-[#222e35] text-center px-10 border-l border-[#d1d7db] dark:border-[#222e35]">
                        <img src="https://static.whatsapp.net/rsrc.php/v3/y6/r/wa669aeJeom.png" alt="WhatsApp Web" className="w-[320px] mb-8 opacity-70 dark:opacity-50 mix-blend-multiply dark:mix-blend-screen" />
                        <h1 className="text-[32px] font-light text-[#41525d] dark:text-[#e9edef] mb-4">WhatsApp Web Clon</h1>
                        <p className="text-[#667781] dark:text-[#8696a0] text-sm max-w-[500px] leading-6">
                            Envía y recibe mensajes sin mantener tu teléfono conectado.<br />
                            Usa este panel integrado con la API Oficial de Meta para K&T Agency.
                        </p>
                        <div className="mt-10 flex items-center text-[#8696a0] text-sm gap-2">
                            <svg viewBox="0 0 10 12" width="10" height="12" className=""><path fill="currentColor" d="M5.008 1.456C2.981 1.456 1.34 3.067 1.34 5.06v2.105c-.328.026-.642.179-.861.411-.371.393-.418.995-.107 1.432l.066.082L.5 10.155a.8.8 0 0 0 1.258.98l.063-.082.904-1.424h4.551l.904 1.424-.063.082a.8.8 0 0 0 1.321-.898l-.063-.082-.062-1.065.066-.082c.311-.437.264-1.039-.107-1.432-.219-.232-.533-.385-.861-.411V5.06c0-1.993-1.642-3.604-3.668-3.604h-.735Zm-.735 1.6h.735c1.109 0 2.012.91 2.012 2.004v1.889H2.996V5.06c0-1.094.903-2.004 2.013-2.004Zm-2.22 4.673h5.908c.321 0 .584.269.584.6 0 .33-.263.6-.584.6H2.053c-.321 0-.584-.27-.584-.6 0-.331.263-.6.584-.6Z"></path></svg>
                            <span>Cifrado de extremo a extremo garantizado por Meta.</span>
                        </div>
                    </div>
                )}
                {/* Modal de Gestión de Respuestas Rápidas */}
                {isManageQuickRepliesOpen && (
                    <div className="absolute inset-0 z-[99999] bg-black/50 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-[#233138] w-full max-w-md rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-200 dark:border-[#2a3942] flex justify-between items-center bg-gray-50 dark:bg-[#202c33]">
                                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">Gestionar Respuestas</h3>
                                <button onClick={() => { setIsManageQuickRepliesOpen(false); setEditingQuickReply(null); setNewQuickReplyCommand(''); setNewQuickReplyText(''); }} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            <div className={`flex-1 overflow-y-auto p-4 ${hideScrollbarClass}`}>
                                <h4 className="font-semibold text-sm mb-3 text-gray-600 dark:text-gray-400 uppercase tracking-wider">Respuestas Guardadas</h4>
                                <div className="space-y-3 mb-6">
                                    {quickReplies.map(qr => (
                                        <div key={qr.id} className="border border-gray-200 dark:border-[#2a3942] rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-[#182229] transition-colors group">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 min-w-0 pr-2">
                                                    <div className="font-bold text-[#00a884] text-sm mb-1">{qr.command}</div>
                                                    <div className="text-sm text-[#54656f] dark:text-[#aebac1] line-clamp-2">{qr.text}</div>
                                                </div>
                                                <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shrink-0">
                                                    <button onClick={() => { setEditingQuickReply(qr); setNewQuickReplyCommand(qr.command); setNewQuickReplyText(qr.text); }} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded-md dark:hover:bg-blue-900/20" title="Editar">
                                                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                    </button>
                                                    <button onClick={(e) => handleDeleteQuickReply(qr.id, e)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-md dark:hover:bg-red-900/20" title="Eliminar">
                                                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {quickReplies.length === 0 && <p className="text-center text-sm text-gray-500 py-4">No hay respuestas rápidas guardadas.</p>}
                                </div>

                                <div className="bg-gray-50 dark:bg-[#182229] p-4 rounded-xl border border-gray-200 dark:border-[#2a3942]">
                                    <h4 className="font-semibold text-sm mb-3 text-gray-800 dark:text-gray-200">
                                        {editingQuickReply ? 'Editar Respuesta' : 'Crear Nueva Respuesta'}
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Comando (ej: /hola)</label>
                                            <Input
                                                value={newQuickReplyCommand}
                                                onChange={(e) => setNewQuickReplyCommand(e.target.value)}
                                                placeholder="/comando"
                                                className="bg-white dark:bg-[#2a3942] border-gray-300 dark:border-[#202c33] text-sm h-9"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Mensaje de respuesta</label>
                                            <textarea
                                                value={newQuickReplyText}
                                                onChange={(e) => setNewQuickReplyText(e.target.value)}
                                                placeholder="Escribe el mensaje largo aquí..."
                                                className="w-full rounded-md border border-gray-300 dark:border-[#202c33] bg-white dark:bg-[#2a3942] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a884] focus:border-transparent resize-none h-24"
                                            />
                                        </div>
                                        <div className="flex gap-2 justify-end pt-2">
                                            {editingQuickReply && (
                                                <Button size="sm" variant="outline" onClick={() => { setEditingQuickReply(null); setNewQuickReplyCommand(''); setNewQuickReplyText(''); }} className="text-xs">
                                                    Cancelar
                                                </Button>
                                            )}
                                            <Button size="sm" onClick={handleSaveQuickReply} disabled={!newQuickReplyCommand.trim() || !newQuickReplyText.trim()} className="bg-[#00a884] hover:bg-[#008f6f] text-white text-xs">
                                                {editingQuickReply ? 'Guardar Cambios' : 'Añadir Respuesta'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

