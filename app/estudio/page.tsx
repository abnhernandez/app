"use client";

import { useEffect, useMemo } from "react";

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

  return null;
}