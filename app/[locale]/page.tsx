"use client";

import { motion } from "framer-motion";
import { LucideImage, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import NotifyForm from "@/app/[locale]/components/NotifyForm";

export default function Home({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const t = useTranslations();
  const notified = searchParams?.notified === "1";

  return (
    <motion.div 
      className="flex min-h-screen items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <main className="flex w-full max-w-3xl flex-col items-center py-32 px-16 gap-16 sm:items-start">

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <LucideImage className="dark:invert" size={64} />
        </motion.div>

        <motion.section
          className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-semibold text-black dark:text-white">
            {t("title")}
          </h1>

          <h2 className="text-xl text-zinc-700 dark:text-zinc-300">
            {t("subtitle")}
          </h2>

          <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
            {t("description")}
          </p>
        </motion.section>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <a
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-background hover:bg-zinc-800 transition"
            href="https://maps.app.goo.gl/Acry2gfKzD434GJH7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Zap size={16} />
            {t("visit")}
          </a>

          {notified ? (
            <div className="flex h-12 items-center justify-center rounded-full border px-6 bg-green-50 text-green-800 dark:bg-green-900/20">
              {t("thanks")}
            </div>
          ) : (
            <NotifyForm />
          )}
        </motion.div>
      </main>
    </motion.div>
  );
}