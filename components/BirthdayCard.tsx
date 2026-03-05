import Link from "next/link"

interface Birthday {
  id: number;
  name: string;
  birth_date: string;
}

export default function BirthdayCard({ birthday }: { birthday: Birthday }) {

  return (
    <div className="border rounded-xl p-4 mb-4">

      <h2 className="text-lg font-semibold">
        {birthday.name}
      </h2>

      <p className="text-sm text-gray-500">
        {birthday.birth_date}
      </p>

      <Link
        href={`/birthdays/${birthday.id}`}
        className="text-blue-600 text-sm"
      >
        Ver detalles
      </Link>

    </div>
  )
}