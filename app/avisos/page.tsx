'use client'

import Link from 'next/link'
import { Home } from 'lucide-react'
import { BellOff } from 'lucide-react'

export default function AvisosPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900 px-4">
      <section className="max-w-md w-full text-center">
    
        {/* Icono Inicio */}
      <Link
        href="/"
        aria-label="Ir al inicio"
        className="fixed top-4 right-4 md:left-4 md:right-auto z-50 inline-flex items-center p-2 rounded-md bg-white/80 backdrop-blur text-gray-900 shadow dark:bg-neutral-800/80 dark:text-gray-100 hover:animate-pulse"
      >
        <Home className="h-5 w-5" />
      </Link>
        
        {/* Icono */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
          <BellOff className="h-10 w-10 text-gray-400 dark:text-neutral-500" />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Sin avisos por ahora
        </h1>

        {/* Descripción */}
        <p className="mt-2 text-gray-500 dark:text-neutral-400">
          Cuando haya notificaciones importantes, aparecerán aquí.
        </p>

      </section>
    </main>
  )
}