import { supabase } from "@/lib/supabase"
import BirthdayCard from "@/components/BirthdayCard"

export default async function Home() {

  const { data } = await supabase
    .from("birthdays")
    .select("*")
    .order("birth_date")

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        🎂 Próximos cumpleaños
      </h1>

      {data?.map(b => (
        <BirthdayCard key={b.id} birthday={b} />
      ))}
    </div>
  )
}