import { Metadata } from 'next'
import Link from 'next/link'
import { LayoutDashboard, Users, Heart, LogOut, Wallet } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Escritorio | K&T Agency',
    description: 'Panel Administrativo K&T',
    robots: {
        index: false,
        follow: false,
    },
}

export default function EscritorioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const currentYear = new Date().getFullYear()

    return (
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
            {/* Sidebar Desktop */}
            <aside className="w-full md:w-64 bg-neutral-900 border-b md:border-r border-neutral-800 flex flex-col justify-between sticky top-0 md:h-screen">
                <div className="p-6">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-8">
                        K&T Escritorio
                    </h2>
                    
                    <nav className="space-y-2">
                        <Link href="/escritorio/crm" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all">
                            <Users size={20} />
                            <span>CRM TikTok / Drive</span>
                        </Link>
                        <Link href="/escritorio/proyectos" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all">
                            <LayoutDashboard size={20} />
                            <span>Proyectos Pendientes</span>
                        </Link>
                        {/* Finanzas is visible to ALL inside /escritorio right now, but you could restrict it conditionally */}
                        <Link href="/escritorio/finanzas" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all">
                            <Wallet size={20} />
                            <span>Finanzas</span>
                        </Link>
                    </nav>
                </div>
                
                <div className="p-6 space-y-4">
                    <form action="/auth/signout" method="post">
                        <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-neutral-400 hover:bg-red-950/50 hover:text-red-400 transition-all">
                            <LogOut size={20} />
                            <span>Cerrar Sesión</span>
                        </button>
                    </form>
                    
                    {/* SEO & Branding Rules Applied */}
                    <div className="text-xs text-neutral-500 text-center flex flex-col items-center space-y-1">
                        <span>&copy; {currentYear} Todos los derechos reservados.</span>
                        <a href="https://www.kytcode.lat" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-1 hover:text-white transition-colors">
                            <span>Desarrollado por K&T</span>
                            <Heart size={12} className="text-white fill-white" />
                        </a>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto w-full">
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
