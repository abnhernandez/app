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

  return null;
}