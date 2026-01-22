export default function AdminConfigPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Configuración</h1>
          <p className="text-sm text-neutral-500">
            Ajustes generales del panel administrativo
          </p>
        </div>

        <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Seguridad</h2>
            <p className="text-sm text-neutral-500">
              Próximamente podrás configurar reglas y límites.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Notificaciones</h2>
            <p className="text-sm text-neutral-500">
              Próximamente podrás definir canales y prioridades.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
