import Reproductor from '@/app/components/reproductor'
import Link from 'next/link'
import { Home } from 'lucide-react'

export default function Page() {
  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-neutral-900">
      <Link
        href="/"
        aria-label="Ir al inicio"
        className="fixed top-4 right-4 md:left-4 md:right-auto z-50 inline-flex items-center p-2 rounded-md bg-white/80 backdrop-blur text-gray-900 shadow dark:bg-neutral-800/80 dark:text-gray-100 hover:animate-pulse"
      >
        <Home className="h-5 w-5" />
      </Link>
      <Reproductor 
      bucket="videos" 
      title="¿Cómo honrar a Dios? | Primer Paso | Episodio 3 | Prédicas Cristianas | Pastor Octaviano Rivera" 
      videoUrl='https://www.youtube.com/embed/F7BUqRX1WT0?si=oTetlx1Cm0VJlqE5' />
    </main>
  )
}