"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase";

export default function NotifyForm() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const t = useTranslations();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return;

    const { error } = await supabase
      .from("emails")
      .insert({ email });

    if (!error) {
      window.location.href = "?notified=1";
    } else {
      alert("Error al guardar el email.");
    }
  }

  return (
    <>
      {!open ? (
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.03 }}
          className="flex h-12 items-center justify-center rounded-full border px-6"
        >
          {t("notify")}
        </motion.button>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <input
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            className="h-12 rounded-full border px-4 dark:bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="h-12 w-12 flex items-center justify-center rounded-full bg-foreground text-background"
          >
            <Send size={16} />
          </button>
        </motion.form>
      )}
    </>
  );
}