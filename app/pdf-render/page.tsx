// -------------------------------------------------------------
// Esta página se usa únicamente por el Bot mediante Puppeteer. 
// Será la presentación de los PDFs de K&T Agency. 
// No hay link para que usuarios entren con normalidad.
// -------------------------------------------------------------
import { notFound } from 'next/navigation';

export default function DocumentoRenderPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { cliente, valor, servicio, tipo } = searchParams;

  // Si falta información, Puppeteer va a ver error, pero es seguro.
  if (!cliente || !valor || !servicio) {
    return <div className="text-red-500 font-bold p-10">Parámetros incompletos.</div>;
  }

  // Puedes reemplazar esto por tu componente existente: <DocumentoKT cliente={cliente} valor={valor} servicio={servicio} />
  // Dejo este render base utilizando TailwindCSS y tus directrices para que sirva de reemplazo o marco directo.
  return (
    <div className="relative w-[210mm] min-h-[297mm] mx-auto bg-white font-sans text-gray-800 overflow-hidden shadow-2xl">
      {/* Recursos de K&T estáticos */}
      <img src="/esquina1.png" alt="Esquina Superior" className="absolute top-0 left-0 w-32 h-32 object-cover opacity-90 z-0" />
      <img src="/esquina2.png" alt="Esquina Inferior" className="absolute bottom-0 right-0 w-32 h-32 object-cover opacity-90 z-0" />
      
      {/* Logo Transparente */}
      <div className="absolute top-12 right-12 z-10 w-40">
        {/* Aquí usas "/logofonédo.png" O un logo central. Este es el placeholder */}
        <img src="/images/logo.png" alt="K&T Logo" className="w-full object-contain" />
      </div>

      <div className="relative z-10 px-16 py-20 mt-16 flex flex-col h-full bg-white/60 backdrop-blur-sm">
        {/* Encabezado */}
        <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none mb-2">
          {tipo === 'cuenta' ? 'CUENTA DE COBRO' : 'COTIZACIÓN DE SERVICIOS'}
        </h1>
        <p className="text-gray-500 text-sm uppercase tracking-widest font-bold mb-12">
          K&T Agencia Digital & Comercial
        </p>

        {/* Datos Principales (Facturación / Cliente) */}
        <div className="mt-8 flex flex-col gap-6 w-full max-w-lg mb-16">
          <div className="border-l-4 border-black pl-4">
            <p className="text-sm font-bold text-gray-500 uppercase">Facturar a</p>
            <p className="text-xl font-black text-gray-900 leading-tight">{cliente}</p>
          </div>
          
          {tipo !== 'cotizacion' && (
            <div className="border-l-4 border-gray-400 pl-4">
              <p className="text-sm font-bold text-gray-500 uppercase">A nombre de (Beneficiario)</p>
              <p className="text-lg font-bold text-gray-800">Keyner Steban Trillos Useche</p>
              <p className="text-sm text-gray-500 font-semibold">RUT: 1090384736-8</p>
            </div>
          )}
        </div>

        {/* Servicios (Regla de negocio: Detalles Técnicos) */}
        <div className="w-full mb-12 flex-grow">
          <h2 className="text-2xl font-black text-black border-b-2 border-black pb-2 mb-6">Detalles del Servicio</h2>
          
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-sm uppercase text-gray-600 font-bold">
                <th className="py-4 px-4 w-3/4">Concepto / Descripción Técnica</th>
                <th className="py-4 px-4 text-right">Monto (COP)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-6 px-4">
                  <p className="text-lg font-black text-gray-900 leading-tight mb-2 whitespace-pre-wrap">{servicio}</p>
                  
                  {tipo !== 'cuenta' && (
                    <div className="text-sm text-gray-600 mt-4 space-y-2 font-medium">
                      <span className="block border-l-2 pl-3 border-gray-300">
                        ⚡ <strong>Infraestructura Vercel:</strong> Hosting de alto rendimiento incluido.
                      </span>
                      <span className="block border-l-2 pl-3 border-gray-300">
                        🌐 <strong>Optimización SEO Base:</strong> Rendimiento y meta configuraciones preparadas.
                      </span>
                    </div>
                  )}
                </td>
                <td className="py-6 px-4 text-right font-black text-xl text-gray-900 border-l border-gray-200">
                  ${parseInt(valor).toLocaleString('es-CO')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totales y Garantía */}
        <div className="mt-8 flex justify-end w-full border-t-4 border-black pt-6 mb-16">
          <div className="text-right">
            <p className="uppercase text-sm font-bold text-gray-500 mb-1">Total a Cancelar</p>
            <p className="text-5xl font-black text-black">
              ${parseInt(valor).toLocaleString('es-CO')}
            </p>
          </div>
        </div>

        {/* Footer Comercial y Garantía K&T */}
        {tipo !== 'cuenta' && (
          <div className="bg-gray-50 border border-gray-200 p-8 mt-auto mx-[-4rem] rounded-tr-lg">
            <h3 className="font-black text-gray-900 text-lg flex items-center mb-2">⭐ Soporte y Garantía K&T</h3>
            <p className="text-gray-600 text-sm font-medium leading-relaxed">
              Garantizamos la funcionalidad de nuestro código en entornos de producción. Se incluye una garantía sin costo adicional de <strong>3 meses</strong> por fallas críticas de software (bugs). Así como despliegue de correcciones de UI y UX.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
