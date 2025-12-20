"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage() {
  const [password,setPassword]=useState(""); const [loading,setLoading]=useState(false); const [error,setError]=useState<string|null>(null)
  const router=useRouter()

  const handleReset=async(e:React.FormEvent)=>{ e.preventDefault(); setLoading(true); setError(null)
    if(password.length<6){setError("La contraseña debe tener al menos 6 caracteres"); setLoading(false); return}
    const { error }=await supabase.auth.updateUser({password})
    if(error)setError(error.message); else router.push("/login")
    setLoading(false)
  }

  return <main className="flex min-h-screen items-center justify-center px-4">
    <form onSubmit={handleReset} className="w-full max-w-sm space-y-4 rounded-xl border p-6 shadow">
      <h1 className="text-xl font-semibold text-center">Nueva contraseña</h1>
      <input type="password" placeholder="Nueva contraseña" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full rounded border px-3 py-2"/>
      <button type="submit" disabled={loading} className="w-full rounded bg-black py-2 text-white disabled:opacity-50">{loading?"Guardando...":"Actualizar contraseña"}</button>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
    </form>
  </main>
}