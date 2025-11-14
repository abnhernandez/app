import { Image as LucideImage, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <LucideImage className="dark:invert" size={64} />

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Monte Sion Oaxaca
          </h1>
          <h2 className="max-w-xs text-xl font-medium leading-8 text-zinc-700 dark:text-zinc-300">
            Estableciendo el Reino de Dios
          </h2>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Gracias por visitar la comunidad digital de Monte Sion Oaxaca. Estamos
            trabajando en algo nuevo y emocionante. Vuelve pronto para ver las
            novedades.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-200"
            href="https://maps.app.goo.gl/Acry2gfKzD434GJH7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Asistir presencialmente"
          >
            <Zap className="" size={16} />
            Asistir presencialmente
          </a>

            <div className="flex h-12 w-full sm:w-auto items-center gap-2">
            {/* botón inicial */}
            <button
              id="notify-toggle"
              type="button"
              className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-200"
              aria-expanded="false"
            >
              Avísenme cuando esté listo
            </button>

            {/* formulario oculto inicialmente */}
            <div
              id="notify-form"
              style={{ display: "none" }}
              className="flex items-center gap-3 w-full sm:w-auto"
            >
              <input
              id="notify-email"
              type="email"
              placeholder="tu@correo.com"
              aria-label="Correo electrónico"
              className="h-12 min-w-0 flex-1 rounded-full border border-black/[.08] px-4 text-base placeholder:text-zinc-500 dark:border-white/[.08] dark:bg-transparent dark:placeholder:text-zinc-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-200"
              />

              <button
              id="notify-send"
              type="button"
              aria-label="Enviar correo"
              className="h-12 w-12 flex items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-200"
              >
              {/* avión de papel (SVG inline para evitar nuevos imports) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              </button>
            </div>

            {/* mensaje de confirmación */}
            <div
              id="notify-confirm"
              style={{ display: "none" }}
              className="text-sm text-zinc-700 dark:text-zinc-300"
              role="status"
              aria-live="polite"
            >
              Gracias — te avisaremos cuando esté listo.
            </div>

            {/* pequeño script inline para manejo mínimo sin convertir todo el archivo en client component */}
            <script
              dangerouslySetInnerHTML={{
              __html: `
                (function() {
                var toggle = document.getElementById('notify-toggle');
                var form = document.getElementById('notify-form');
                var send = document.getElementById('notify-send');
                var input = document.getElementById('notify-email');
                var confirmEl = document.getElementById('notify-confirm');

                if (!toggle || !form || !send || !input || !confirmEl) return;

                toggle.addEventListener('click', function(e) {
                  e.preventDefault();
                  toggle.style.display = 'none';
                  form.style.display = 'flex';
                  input.focus();
                });

                send.addEventListener('click', function(e) {
                  e.preventDefault();
                  // validación mínima: si está vacío, marcar como inválido
                  if (!input.value || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(input.value)) {
                  input.reportValidity();
                  return;
                  }

                  form.style.display = 'none';
                  confirmEl.style.display = 'block';
                });

                // permitir enviar con Enter
                input.addEventListener('keydown', function(e) {
                  if (e.key === 'Enter') {
                  e.preventDefault();
                  send.click();
                  }
                });
                })();
              `,
              }}
            />
            </div>
        </div>
      </main>
    </div>
  );
}