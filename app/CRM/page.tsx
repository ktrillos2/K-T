import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LeadList } from '@/components/crm/LeadList';

export const metadata: Metadata = {
    title: 'CRM Dashboard | K&T',
    description: 'Gestión interna de leads.',
    robots: {
        index: false,
        follow: false,
    },
    // Añade esta sección para forzar el comportamiento en iOS
    appleWebApp: {
        capable: true,
        title: 'K&T CRM',
        statusBarStyle: 'black-translucent',
        // Esto refuerza que el inicio sea en la ruta actual
        startupImage: [], 
    },
};

export default function AdminPage() {
    return (
        <div className="container mx-auto py-10 px-4 md:px-8 pt-30">
            <div className="flex flex-col space-y-8">
                

                <div className="grid gap-8 grid-cols-1">
                    {/* List Section - Full Width */}
                    <div className="col-span-1">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Monitor de Leads</CardTitle>
                                <CardDescription>
                                    Visión general de los registros recientes.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <LeadList />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
