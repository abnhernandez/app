import Link from 'next/link'
import { Home } from 'lucide-react'

export default function LandingOracion() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-neutral-800 dark:text-neutral-200">

    {/* Icono Inicio */}
      <Link
        href="/"
        aria-label="Ir al inicio"
        className="fixed top-4 right-4 md:left-4 md:right-auto z-50 inline-flex items-center p-2 rounded-md bg-white/80 backdrop-blur text-gray-900 shadow dark:bg-neutral-800/80 dark:text-gray-100 hover:animate-pulse"
      >
        <Home className="h-5 w-5" />
      </Link>
      
      {/* HEADER */}
      <header className="mb-16 text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Cómo orar
        </h1>
        <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400">
          La oración debe ser siempre nuestra primera respuesta, no nuestro último recurso.
        </p>
        <p className="max-w-xl mx-auto">
          Jesús no nos dejó una oración para repetir, sino una guía para aprender a orar
          de manera equilibrada y profunda.
        </p>
      </header>

      {/* PASO 1 */}
      <section id="paso-1" className="mb-20 space-y-6">
        <p className="text-sm uppercase tracking-wide text-neutral-500">
          Padre nuestro que estás en los cielos
        </p>
        <h2 className="text-2xl font-semibold">
          Paso 1 · Conéctate con Dios relacionalmente
        </h2>

        <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-6 py-4 rounded-md">
          <p className="italic">
            “Recibieron el Espíritu de adopción, por el cual clamamos: Abba, Padre.”
          </p>
          <span className="mt-2 block text-sm text-neutral-500">
            Romanos 8:15
          </span>
        </blockquote>

        <p>
          Dios desea una relación cercana contigo. Comienza tu oración reconociéndolo
          como tu Padre y agradeciendo esa relación.
        </p>
      </section>

      {/* PASO 2 */}
      <section id="paso-2" className="mb-20 space-y-6">
        <p className="text-sm uppercase tracking-wide text-neutral-500">
          Santificado sea tu nombre
        </p>
        <h2 className="text-2xl font-semibold">
          Paso 2 · Adora su nombre
        </h2>

        <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-6 py-4 rounded-md">
          <p className="italic">
            “El nombre del Señor es una fortaleza firme.”
          </p>
          <span className="mt-2 block text-sm text-neutral-500">
            Proverbios 18:10
          </span>
        </blockquote>

        <ul className="list-disc pl-6 space-y-2">
          <li>Justicia — Él me hace limpio</li>
          <li>Sanador — Él restaura mi vida</li>
          <li>Pastor — Él me guía</li>
          <li>Proveedor — Él suple mis necesidades</li>
        </ul>
      </section>

      {/* PASO 3 */}
      <section id="paso-3" className="mb-20 space-y-6">
        <p className="text-sm uppercase tracking-wide text-neutral-500">
          Venga tu reino
        </p>
        <h2 className="text-2xl font-semibold">
          Paso 3 · Ora conforme a su voluntad
        </h2>

        <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-6 py-4 rounded-md">
          <p className="italic">
            “Busquen primero el reino de Dios.”
          </p>
          <span className="mt-2 block text-sm text-neutral-500">
            Lucas 12:31
          </span>
        </blockquote>

        <ul className="list-disc pl-6 space-y-2">
          <li>Salvación de los perdidos</li>
          <li>Autoridades y líderes</li>
          <li>La voluntad de Dios en tu vida</li>
        </ul>
      </section>

      {/* CIERRE */}
      <section className="mt-24 space-y-6 text-center">
        <h2 className="text-2xl font-semibold">
          Haz de la oración tu estilo de vida
        </h2>
        <p className="max-w-xl mx-auto">
          Ora antes de actuar. Ora en todo momento. La oración cambia todo.
        </p>
        <p className="font-semibold">
          En cada situación… ora primero.
        </p>
      </section>
    </main>
  )
}