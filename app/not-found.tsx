import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="grid min-h-[80vh] place-items-center bg-background px-6 py-24 text-center">
      <div>
        <p className="font-mono text-sm text-primary">ERROR 404</p>
        <h1 className="mt-4 font-title text-5xl font-bold text-white md:text-7xl">Esta ruta no existe</h1>
        <p className="mx-auto mt-5 max-w-xl text-white/60">El contenido pudo cambiar de dirección o ya no está disponible.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono font-bold text-black">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>
      </div>
    </main>
  )
}
