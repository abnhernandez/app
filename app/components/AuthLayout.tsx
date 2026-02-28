import Link from "next/link"

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center space-y-2">
          <Link href="/" className="text-xs text-amber-300">Inicio</Link>
          <h1 className="text-xl md:text-2xl font-semibold text-white">{title}</h1>
          {subtitle && <p className="text-xs md:text-sm text-white/60">{subtitle}</p>}
        </div>

        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  )
}