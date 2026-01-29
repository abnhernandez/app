"use client";

import { useEffect, useMemo } from "react";

const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.sirma.mobile.bible.android&pcampaignid=web_share";
const IOS_URL = "https://apps.apple.com/us/app/bible/id282935706";
const DESKTOP_URL = "https://www.bible.com/app";
const ORG_URL =
  "https://www.bible.com/organizations/3f8db369-4fe0-4b8a-a2ce-3c84de8757db";
const START_DATE = new Date("2026-01-28T00:00:00");
const TOTAL_CHAPTERS = 28;
const CHAPTERS_PER_DAY = 2;
const CHAPTER_URL = (chapter: number) =>
  `https://www.bible.com/es/bible/149/ACT.${chapter}.RVR1960`;

const getDaysSinceStart = (today: Date) => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const startUtc = Date.UTC(
    START_DATE.getFullYear(),
    START_DATE.getMonth(),
    START_DATE.getDate()
  );
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const diff = Math.floor((todayUtc - startUtc) / msPerDay);

  return Math.max(0, diff);
};

const getDailyChapters = (today: Date) => {
  const dayIndex = getDaysSinceStart(today);
  const startChapter = dayIndex * CHAPTERS_PER_DAY + 1;

  if (startChapter > TOTAL_CHAPTERS) {
    return [TOTAL_CHAPTERS];
  }

  const chapters = [startChapter];
  const nextChapter = startChapter + 1;

  if (nextChapter <= TOTAL_CHAPTERS) {
    chapters.push(nextChapter);
  }

  return chapters;
};

export default function Home() {
  const today = useMemo(() => new Date(), []);
  const chapters = useMemo(() => getDailyChapters(today), [today]);
  const primaryChapter = chapters[0] ?? 1;
  const redirectUrl = useMemo(() => CHAPTER_URL(primaryChapter), [primaryChapter]);
  const deviceStoreUrl = useMemo(() => {
    if (typeof navigator === "undefined") {
      return DESKTOP_URL;
    }

    const ua = navigator.userAgent.toLowerCase();

    if (ua.includes("android")) {
      return ANDROID_URL;
    }

    if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
      return IOS_URL;
    }

    return DESKTOP_URL;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (typeof document !== "undefined") {
      document.cookie
        .split(";")
        .map((cookie) => cookie.split("=")[0]?.trim())
        .filter(Boolean)
        .forEach((name) => {
          document.cookie = `${name}=; Max-Age=0; path=/;`;
        });
    }

    try {
      window.localStorage.clear();
      window.sessionStorage.clear();
    } catch {
      // ignore storage access errors
    }

    window.location.replace(redirectUrl);
  }, [redirectUrl]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <section className="w-full max-w-2xl rounded-2xl border border-zinc-200/60 bg-white/90 p-8 text-center shadow-sm backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Redirección
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900">
          Te estamos llevando a la lectura de hoy
        </h1>
        <p className="mt-4 text-base text-zinc-600">
          Si no se abre automáticamente, usa los enlaces para abrir Hechos en
          RVR1960 o instalar la app.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {chapters.map((chapter) => (
            <a
              key={chapter}
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
              href={CHAPTER_URL(chapter)}
            >
              Hechos {chapter}
            </a>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            href={deviceStoreUrl}
          >
            Abrir en la app
          </a>
          <a
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            href={ANDROID_URL}
          >
            Android
          </a>
          <a
            className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            href={IOS_URL}
          >
            iOS
          </a>
        </div>
        <a
          className="mt-4 inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          href={DESKTOP_URL}
        >
          PC
        </a>
        <p className="mt-6 text-sm text-zinc-600">
          Además, agrega nuestra organización en YouVersion:
        </p>
        <a
          className="mt-3 inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          href={ORG_URL}
        >
          Agregar organización
        </a>
      </section>
    </main>
  );
}