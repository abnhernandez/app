'use client'
import Material from '@/app/components/material'

type VideoPlayerProps = {
  title?: string
  bucket: string
  prefix?: string
  videoUrl?: string
}

export default function VideoPlayer({
  title = 'Reproductor de video',
  bucket,
  prefix,
  videoUrl = 'about:blank',
}: VideoPlayerProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      {/* Título */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
        {title}
      </h1>

      {/* Línea separadora */}
      <div className="mt-4 mb-6 h-[3px] w-full rounded-full bg-blue-500" />

      {/* Navegación */}
      <div className="mb-6 flex items-center justify-between">
        <button className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 shadow hover:bg-gray-300 dark:bg-neutral-800 dark:text-gray-100 dark:hover:bg-neutral-700">
          « Anterior
        </button>

        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700">
          Siguiente »
        </button>
      </div>

      {/* Video */}
      <div className="relative w-full overflow-hidden rounded-xl bg-black shadow-lg aspect-video">
        <iframe
          src={videoUrl}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <br /><br /><br /><br />
        {/* Línea separadora */}
      <div className="mt-4 mb-6 h-[3px] w-full rounded-full bg-blue-500" />
      <Material bucket={bucket} prefix={prefix} />
    </section>
  )
}