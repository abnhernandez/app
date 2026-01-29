"use client";

import { useEffect, useMemo } from "react";

const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.sirma.mobile.bible.android&pcampaignid=web_share";
const IOS_URL = "https://apps.apple.com/us/app/bible/id282935706";
const DESKTOP_URL = "https://www.bible.com/app";
const ORG_URL =
  "https://www.bible.com/organizations/3f8db369-4fe0-4b8a-a2ce-3c84de8757db";

const getRedirectUrl = (userAgent: string) => {
  const ua = userAgent.toLowerCase();

  if (ua.includes("android")) {
    return ANDROID_URL;
  }

  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
    return IOS_URL;
  }

  return DESKTOP_URL;
};

export default function Home() {
  const redirectUrl = useMemo(() => {
    if (typeof navigator === "undefined") {
      return DESKTOP_URL;
    }

    return getRedirectUrl(navigator.userAgent);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
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
          Te estamos llevando a YouVersion
        </h1>
        <p className="mt-4 text-base text-zinc-600">
          Si no se abre automáticamente, usa el enlace correspondiente a tu
          dispositivo.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            href={ANDROID_URL}
          >
            Android
          </a>
          <a
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            href={IOS_URL}
          >
            iOS
          </a>
          <a
            className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            href={DESKTOP_URL}
          >
            PC
          </a>
        </div>
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