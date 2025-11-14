import { Image as LucideImage, Zap } from "lucide-react";
import NotifyForm from "@/app/components/NotifyForm";

export const metadata = {
  title: "Monte Sion Oaxaca",
  description: "Estableciendo el Reino de Dios",
};

export default function Home({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const notified = searchParams?.notified === "1";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        {/* Logo */}
        <LucideImage className="dark:invert" size={64} />

        {/* Textos */}
        <section className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Monte Sion Oaxaca
          </h1>

          <h2 className="max-w-xs text-xl font-medium leading-8 text-zinc-700 dark:text-zinc-300">
            Estableciendo el Reino de Dios
          </h2>

          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Gracias por visitar la comunidad digital de Monte Sion Oaxaca. 
            Estamos trabajando en algo nuevo y emocionante. 
            Vuelve pronto para ver las novedades.
          </p>
        </section>

        {/* Botones */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">

          {/* Botón mapa */}
          <a
            className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-zinc-700"
            href="https://maps.app.goo.gl/Acry2gfKzD434GJH7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Zap size={16} />
            Asistir presencialmente
          </a>

          {/* Área de notificación */}
          {notified ? (
            <div className="flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-black/10 px-5 bg-green-50 text-green-800 dark:bg-green-900/20">
              Gracias — te avisaremos cuando esté listo.
            </div>
          ) : (
            <NotifyForm />
          )}
        </div>

      </main>
    </div>
  );
}