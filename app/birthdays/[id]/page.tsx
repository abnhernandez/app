import { supabase } from "@/lib/supabase"
import CakeReservation from "@/components/CakeReservation"
import GiftList from "@/components/GiftList"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: birthday } = await supabase
    .from("birthdays")
    .select("*")
    .eq("id", id)
    .single()

  if (!birthday) {
    notFound()
  }

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-bold">
        🎂 {birthday.name}
      </h1>

      <CakeReservation birthdayId={birthday.id} />

      <GiftList birthdayId={birthday.id} />

    </div>
  )
}