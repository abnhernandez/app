import Image from "next/image";
import { Send, Zap } from "lucide-react";

export default function LandingHome() {
  return (
    <header className="relative w-full overflow-hidden bg-white dark:bg-black">
      <div className="relative min-h-screen flex items-center justify-center px-6 py-12 md:py-20 lg:py-28">
        {/* Decorative backgrounds */}
        <div className="pointer-events-none absolute inset-0 hidden dark:block" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/85" />
          <div className="absolute inset-x-0 bottom-0 flex justify-center" aria-hidden>
            {/* Replace '/fuego.svg' with your actual filename inside /public */}
            <Image
              src="/fuego.svg"
              alt=""
              aria-hidden="true"
              width={1200}
              height={400}
              priority
              className="w-[1200px] max-w-none opacity-95 translate-y-12 lg:translate-y-0"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 block dark:hidden" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-white to-amber-50" />
          <div className="absolute inset-0 flex items-end justify-center" aria-hidden>
            <Image
              src="/glow.svg"
              alt=""
              aria-hidden="true"
              width={900}
              height={360}
              priority
              className="w-full max-w-3xl opacity-95 translate-y-8 lg:translate-y-0"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl w-full">
          <div className="mx-auto max-w-3xl text-center sm:text-left">
            <p className="text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300 mb-2 sm:mb-4">
              Monte Sion
            </p>

            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight text-slate-900 dark:text-white drop-shadow-sm">
              <span className="block">Bienvenido a casa!</span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-slate-700 dark:text-slate-200 max-w-2xl">
              Un lugar para ti en el Reino de Dios
            </p>

            <p className="mt-2 text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300">
              1 CORINTIOS 15:22
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center sm:justify-start">
              <a
                href="#asistir"
                role="button"
                aria-label="Asistir presencialmente"
                className="inline-flex items-center gap-3 rounded-full bg-amber-600 text-white px-5 py-3 text-sm font-semibold shadow-md hover:bg-amber-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 focus-visible:ring-offset-2"
              >
                <Send className="h-5 w-5" />
                Asistir presencialmente
              </a>

              <a
                href="#contacto"
                aria-label="Quiero ser parte"
                className="inline-flex items-center gap-3 rounded-full border border-neutral-200 dark:border-neutral-600 bg-white/95 dark:bg-neutral-800 text-neutral-900 dark:text-white px-5 py-3 text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-700/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-200 focus-visible:ring-offset-2"
              >
                <Zap className="h-5 w-5" />
                Quiero ser parte
              </a>
            </div>

            <nav className="mt-8 flex justify-center sm:justify-start gap-4 text-sm" role="navigation" aria-label="Secciones principales">
              <a href="#inicio" className="text-neutral-700 dark:text-neutral-300 hover:underline focus:outline-none focus-visible:underline">
                Inicio
              </a>
              <a href="#artistas" className="text-neutral-700 dark:text-neutral-300 hover:underline focus:outline-none focus-visible:underline">
                Artistas
              </a>
              <a href="#listas" className="text-neutral-700 dark:text-neutral-300 hover:underline focus:outline-none focus-visible:underline">
                Listas
              </a>
              <a href="#canciones" className="text-neutral-700 dark:text-neutral-300 hover:underline focus:outline-none focus-visible:underline">
                Canciones
              </a>
            </nav>

            <div className="mt-10 flex justify-center sm:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800/60 px-4 py-2 shadow-sm">
                <button className="text-xs text-neutral-700 dark:text-neutral-200 px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 rounded">Inicio</button>
                <button className="text-xs text-neutral-700 dark:text-neutral-200 px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 rounded">Artistas</button>
                <button className="text-xs text-neutral-700 dark:text-neutral-200 px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 rounded">Listas</button>
                <button className="text-xs font-semibold bg-neutral-200 dark:bg-neutral-700/60 rounded-full px-3 py-1 text-neutral-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">Canciones</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-black pointer-events-none" aria-hidden />
    </header>
  );
}