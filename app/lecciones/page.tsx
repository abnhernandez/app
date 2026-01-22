import Link from "next/link"
import Card from "@/app/components/card"

const LECCIONES = [
  { title: "¿Quién es Dios?", href: "/lecciones/clase/789207" },
  { title: "¿Cómo buscar a Dios?", href: "/lecciones/clase/790207" },
  { title: "Unción del Espíritu Santo", href: "/lecciones/clase/791207" },
  { title: "¿Cómo honrar a Dios?", href: "/lecciones/clase/792207" },
  { title: "Id y haced discípulos", href: "/lecciones/clase/793207" },
]

export default function LeccionesLandingPage() {
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Lecciones</h1>
            <p className="text-sm text-neutral-500">
              Serie de fundamentos para crecer en la fe
            </p>
          </div>
          <Link href="/" className="text-sm text-amber-600">Inicio</Link>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LECCIONES.map(({ title, href }) => (
            <Link key={href} href={href} className="block">
              <Card title={title} />
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}
