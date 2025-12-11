// components/Footer.tsx
import { Youtube, Instagram, Facebook, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <>
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
            href="https://wa.me/529512091644?text=Hola.%20Necesito%20de%20Dios."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp +52 951 209 1644"
            className="p-1 rounded-sm hover:bg-white/5 dark:hover:bg-white/6 hover:text-zinc-400"
          >
            <MessageSquare size={24} />
          </a>
        </div>
      </div>
    </>
  );
}