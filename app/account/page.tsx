import { getAccount } from "@/lib/account"
import AccountForm from "./AccountForm"
import Link from "next/link"

export default async function AccountPage() {
  const profile = await getAccount()

  if (!profile) {
    return <p className="p-6">No autenticado</p>
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-xl space-y-6">
        <Link href="/" className="text-sm text-amber-600">Inicio</Link>
        <div>
          <h1 className="text-2xl font-semibold">Mi cuenta</h1>
          <p className="text-sm text-neutral-500">Actualiza tu información personal</p>
        </div>
        <AccountForm profile={profile} />
      </div>
    </main>
  )
}