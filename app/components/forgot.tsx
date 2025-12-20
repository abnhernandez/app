"use client"

import { forgotPasswordAction } from "@/lib/auth-actions"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
const schema = z.object({ email: z.string().email("Correo inválido")})
type FormValues = z.infer<typeof schema>

export default function ForgotPasswordForm(){
  const [loading,setLoading]=useState(false)
  const [message,setMessage]=useState<string|null>(null)
  const [error,setError]=useState<string|null>(null)
  const { register, handleSubmit, formState:{errors} } = useForm<FormValues>({resolver:zodResolver(schema)})

const onSubmit = async (data: FormValues) => {
  setLoading(true)
  const result = await forgotPasswordAction(data.email)
  if (result?.error) setError(result.error)
  else setMessage("Revisa tu correo")
  setLoading(false)
}

  const commonInput="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4 p-6 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-xl">
        <h2 className="text-center text-xl font-bold">Recuperar contraseña</h2>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <input {...register("email")} placeholder="Correo" type="email" className={commonInput}/>
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-black text-white hover:opacity-90 disabled:opacity-50">{loading?"Enviando...":"Enviar enlace"}</button>
      </form>
    </div>
  )
}