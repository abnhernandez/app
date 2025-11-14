import { Image as LucideImage, Navigation, Youtube, Instagram, Facebook, MessageSquare } from "lucide-react";
import NotifyForm from "@/app/components/NotifyForm";

export const metadata = {
  title: "Monte Sion Oaxaca",
  description: "Estableciendo el Reino de Dios",
};

export default function Home({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const notified = searchParams?.notified === "1";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center sm:items-start justify-between py-16 px-6 sm:py-32 sm:px-16 gap-6 sm:gap-8">
        
        {/* Logo */}
        <LucideImage className="invert" size={48} />

        {/* Textos */}
        <section className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold leading-8 sm:leading-10 tracking-tight text-black dark:text-zinc-50">
            Monte Sion Oaxaca
          </h1>

          <h2 className="text-lg sm:text-xl font-medium leading-7 sm:leading-8 text-zinc-700 dark:text-zinc-300">
            Estableciendo el Reino de Dios
          </h2>

          <p className="text-base sm:text-lg leading-7 sm:leading-8 text-zinc-600 dark:text-zinc-400">
            Gracias por visitar la comunidad digital de Monte Sion Oaxaca. 
            Estamos trabajando en algo nuevo y emocionante. 
            Vuelve pronto para ver las novedades.
          </p>
        </section>

        {/* Botones */}
        <div className="flex w-full flex-col gap-4 text-sm font-medium sm:flex-row sm:gap-6 sm:text-base">
          {/* Botón mapa */}
          <a
            className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-zinc-700"
            href="https://maps.app.goo.gl/Acry2gfKzD434GJH7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation size={16} />
            Asistir presencialmente
          </a>

          {/* Área de notificación */}
          {notified ? (
            <div className="flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-black/10 px-5 bg-green-50 text-green-800 dark:bg-green-900/20">
              Gracias — te avisaremos cuando esté listo.
            </div>
          ) : (
            // NotifyForm debe ocupar todo el ancho en mobile; el componente interno debe respetar 100% si está configurado correctamente
            <div className="w-full sm:w-auto">
              <NotifyForm />
            </div>
          )}
        </div>
      </main>

      {/* Social icons floating (centered) */}
      <div className="fixed bottom-6 left-1/2 z-20 flex items-center gap-6 -translate-x-1/2 sm:top-[700px] sm:left-[650px] sm:bottom-auto sm:translate-x-0">
        <div className="flex gap-6 p-2 rounded-lg bg-white/5 px-3 py-2 shadow-md backdrop-blur-sm dark:bg-black/40">
          {/* Iconos con tamaño aumentado */}
          <a
            href="https://www.youtube.com/@montesionoaxaca"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube @montesionoaxaca"
            className="p-1 rounded-sm hover:bg-white/5 dark:hover:bg-white/6 hover:text-zinc-400"
          >
            <Youtube size={27} />
          </a>

          <a
            href="https://www.instagram.com/montesionoaxaca"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram montesionoaxaca"
            className="p-1 rounded-sm hover:bg-white/5 dark:hover:bg-white/6 hover:text-zinc-400"
          >
            <Instagram size={24} />
          </a>

          <a
            href="https://www.facebook.com/montesionoax"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook montesionoax"
            className="p-1 rounded-sm hover:bg-white/5 dark:hover:bg-white/6 hover:text-zinc-400"
          >
            <Facebook size={24} />
          </a>

          <a
            href="https://wa.me/529512091644?text=Hola%20quiero%20m%C3%A1s%20informaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp +52 951 209 1644"
            className="p-1 rounded-sm hover:bg-white/5 dark:hover:bg-white/6 hover:text-zinc-400"
          >
            <MessageSquare size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}