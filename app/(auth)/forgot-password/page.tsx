"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ForgotPasswordPage() {
  const [email,setEmail]=useState(""); const [loading,setLoading]=useState(false)
  const [message,setMessage]=useState<string|null>(null); const [error,setError]=useState<string|null>(null)

  const handleSubmit=async(e:React.FormEvent)=>{ e.preventDefault(); setLoading(true); setError(null); setMessage(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email,{ redirectTo:`${window.location.origin}/reset-password` })
    if(error)setError(error.message); else setMessage("Revisa tu correo")
    setLoading(false)
  }

  return <main className="flex min-h-screen items-center justify-center px-4">
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-xl border p-6 shadow">
      <h1 className="text-xl font-semibold text-center">Recuperar contraseña</h1>
      <input type="email" placeholder="Correo electrónico" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full rounded border px-3 py-2"/>
      <button type="submit" disabled={loading} className="w-full rounded bg-black py-2 text-white disabled:opacity-50">{loading?"Enviando...":"Enviar enlace"}</button>
      {message && <p className="text-sm text-green-600 text-center">{message}</p>}
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
    </form>
  </main>
}