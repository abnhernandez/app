import { supabase } from "@/lib/supabase"
import GiftItem from "@/components/GiftItem"

export default async function GiftList({ birthdayId }: { birthdayId: string }) {

  const { data } = await supabase
    .from("gifts")
    .select("*")
    .eq("birthday_id", birthdayId)

  return (
    <div className="mt-8">

      <h3 className="font-semibold">
        🎁 Lista de regalos
      </h3>

      {data?.map(g => (
        <GiftItem key={g.id} gift={g}/>
      ))}

    </div>
  )
}