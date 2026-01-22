import Link from "next/link"
import Form from "@/app/components/form"

export const metadata = {
  title: "Monte Sion Oaxaca",
  description: "Estableciendo el Reino de Dios — Un lugar para ti en el Reino de Dios",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black">
      <header className="mx-auto w-full max-w-4xl px-4 pt-10">
        <Link href="/" className="text-sm text-amber-600">Inicio</Link>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
          Enviar petición de oración
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Puedes enviar tu petición con datos de contacto o de forma anónima.
        </p>
      </header>

      <div className="pt-6 pb-12">
        <Form />
      </div>
    </div>
  )
}