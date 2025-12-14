"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Card from "@/app/components/card";
import Menu from "@/app/components/menu";

/* =======================
   Tipos
======================= */
type CardItem = {
  title: string;
  href: string;
};

/* =======================
   Data
======================= */
const CARDS: CardItem[] = [
  { title: "¿Quién es Dios?", href: "/lecciones/clase/789207" },
  { title: "¿Cómo buscar a Dios?", href: "/lecciones/clase/790207" },
  { title: "Unción del Espíritu Santo", href: "/lecciones/clase/791207" },
  { title: "¿Cómo honrar a Dios?", href: "/lecciones/clase/792207" },
  { title: "Id y haced discípulos", href: "/lecciones/clase/793207" },
];

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
      <main className="flex-1 p-6">
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CARDS.map(({ title, href }) => (
            <Link key={href} href={href} className="block">
              <Card title={title} />
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}