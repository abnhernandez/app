"use client";

import { useState, useCallback } from "react";
import Menu from "@/app/components/menu";
import ChatBot from "@/app/components/chatbot"

export default function Page() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Sidebar */}
      <Menu collapsed={collapsed} onToggle={toggleMenu} />

      {/* Content */}
    <section className="w-full h-[850px]">
  <h2 className="sr-only">Chat con IA</h2>
      <ChatBot />
      <p className="text-gray-400 text-center text-xs">ChatGPT puede cometer errores. Comprueba la información importante. Consulta Preferencias de cookies.</p>
    </section>
    </div>
  );
}