"use client"

import { registerAction } from "@/lib/auth-actions"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
  name: z.string().min(2,"El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6,"La contraseña debe tener al menos 6 caracteres")
})

type FormValues = z.infer<typeof schema>

export default function RegistroForm() {
  const [loading,setLoading]=useState(false)
  const [message,setMessage]=useState<string|null>(null)
  const [error,setError]=useState<string|null>(null)

  const { register, handleSubmit, reset, formState:{errors} } = useForm<FormValues>({
    resolver: zodResolver(schema)
  })

const onSubmit = async (data: FormValues) => {
  setLoading(true)
  const result = await registerAction(data)

  if (result?.error) setError(result.error)
  else setMessage("Usuario registrado correctamente")

  setLoading(false)
}

  const commonInput = "w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4 p-6 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-xl">
        <h2 className="text-center text-xl font-bold">Registro</h2>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <input {...register("name")} placeholder="Nombre" className={commonInput}/>
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        <input {...register("email")} placeholder="Correo" type="email" className={commonInput}/>
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        <input {...register("password")} placeholder="Contraseña" type="password" className={commonInput}/>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-black text-white hover:opacity-90 disabled:opacity-50">{loading?"Registrando...":"Registrarse"}</button>
      </form>
    </div>
  )
}