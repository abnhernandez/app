"use client"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

const schema = z
  .object({
    password: z.string().min(6, "Contraseña mínima 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  })
type FormValues = z.infer<typeof schema>

export default function ResetPasswordForm(){
  const router = useRouter()
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|null>(null)
  const [info,setInfo]=useState<string|null>("Validando enlace...")
  const [ready,setReady]=useState(false)
  const { register, handleSubmit, formState:{errors} } = useForm<FormValues>({resolver:zodResolver(schema)})

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        setError("Enlace inválido o expirado")
        setInfo(null)
        setReady(false)
        return
      }
      if (!data.session) {
        setError("No se encontró una sesión válida")
        setInfo(null)
        setReady(false)
        return
      }
      setInfo(null)
      setReady(true)
    }
    checkSession()
  }, [])

  const onSubmit = async(data:FormValues)=>{
    setLoading(true); setError(null)
    try{
      const { error } = await supabase.auth.updateUser({password:data.password})
      if(error) setError(error.message)
      else router.push("/login")
    }catch{ setError("Error de servidor") }
    finally{ setLoading(false) }
  }

  const commonInput="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4 p-6 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-xl">
        <h2 className="text-center text-xl font-bold">Nueva contraseña</h2>
        {info && <p className="text-sm text-zinc-600" role="status">{info}</p>}
        {error && <p className="text-red-600" role="alert">{error}</p>}
        <input {...register("password")} placeholder="Nueva contraseña" type="password" className={commonInput} disabled={!ready || loading}/>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        <input {...register("confirmPassword")} placeholder="Confirmar contraseña" type="password" className={commonInput} disabled={!ready || loading}/>
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        <button type="submit" disabled={!ready || loading} className="w-full py-3 rounded-xl bg-black text-white hover:opacity-90 disabled:opacity-50">{loading?"Guardando...":"Actualizar contraseña"}</button>
        <a href="/login" className="text-sm text-emerald-700 hover:underline text-center block">
          Volver a iniciar sesión
        </a>
      </form>
    </div>
  )
}