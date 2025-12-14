'use client'

import Link from 'next/link'
import { Home } from 'lucide-react'
import Calendario from "@/app/components/calendario";

export default function EventosPage() {
    return (
            <div className="rounded-lg p-17 shadow-sm">
        {/* Icono Inicio */}
      <Link
        href="/"
        aria-label="Ir al inicio"
        className="fixed top-4 right-4 md:left-4 md:right-auto z-50 inline-flex items-center p-2 rounded-md bg-white/80 backdrop-blur text-gray-900 shadow dark:bg-neutral-800/80 dark:text-gray-100 hover:animate-pulse"
      >
        <Home className="h-5 w-5" />
      </Link>
                <Calendario />
            </div>
    );
}