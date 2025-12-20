import { getAccount } from "@/lib/account"
import AccountForm from "./AccountForm"

export default async function AccountPage() {
  const profile = await getAccount()

  if (!profile) {
    return <p className="p-6">No autenticado</p>
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Mi cuenta</h1>
      <AccountForm profile={profile} />
    </main>
  )
}