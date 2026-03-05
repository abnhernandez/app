"use client"

import { useMemo } from "react"

const START_DATE = new Date("2026-03-03T00:00:00")

const TOTAL_CHAPTERS = 24

const CHAPTER_URL = (chapter: number) =>
  `https://www.bible.com/es/bible/149/LUK.${chapter}.RVR1960`

const getDaysSinceStart = (today: Date) => {
  const msPerDay = 1000 * 60 * 60 * 24

  const startUtc = Date.UTC(
    START_DATE.getFullYear(),
    START_DATE.getMonth(),
    START_DATE.getDate()
  )

  const todayUtc = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  return Math.max(0, Math.floor((todayUtc - startUtc) / msPerDay))
}

export default function Home() {

  const today = useMemo(() => new Date(), [])

  const dayIndex = getDaysSinceStart(today)

  const chapter = Math.min(dayIndex + 1, TOTAL_CHAPTERS)

  const progress = chapter

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8">

      <h1 className="text-4xl font-bold mb-2">
        Evangelio de Lucas
      </h1>

      <p className="text-lg mb-6">
        Plan de lectura diario
      </p>

      <div className="text-2xl font-semibold mb-4">
        Hoy toca leer
      </div>

      <div className="text-3xl mb-6">
        Lucas {chapter}
      </div>

      <a
        href={CHAPTER_URL(chapter)}
        target="_blank"
        className="px-6 py-3 bg-black text-white rounded-xl"
      >
        Leer capítulo
      </a>

      <div className="mt-10">
        <p>
          Día {chapter} de {TOTAL_CHAPTERS}
        </p>

        <p>
          Progreso: {progress}/{TOTAL_CHAPTERS}
        </p>
      </div>

    </main>
  )
}