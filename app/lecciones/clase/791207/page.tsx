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
      title="Unción del Espíritu Santo | La Gran Comisión | Episodio 1 | Prédicas Cristianas | Octaviano Rivera" 
      videoUrl='https://www.youtube.com/embed/rTCGZufgONY?si=tT6VZ4bqRJ1XYOhs' />
    </main>
  )
}