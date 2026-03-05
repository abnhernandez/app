import { getSupabaseServer } from "@/lib/supabase-server"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await getSupabaseServer()

  const { data: birthday } = await supabase
    .from("birthdays")
    .select("id,name,birth_date")
    .eq("id", id)
    .single()

  if (!birthday) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-2xl p-6 shadow-sm">
        <p className="text-sm font-medium">Detalle de cumpleaños</p>
        <h1 className="mt-1 text-3xl font-bold">🎂 {birthday.name}</h1>
        <p className="mt-2 text-sm">Fecha: <span className="font-medium">{birthday.birth_date}</span></p>
      </div>
    </div>
  )
}