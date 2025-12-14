"use client";

import {
  Home,
  List,
  Calendar,
  Settings,
} from "lucide-react";
import Link from "next/link";
import React from "react";

/* =======================
   Tipos
======================= */
type MenuProps = {
  collapsed: boolean;
  onToggle: () => void;
};

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  section?: "CLASES";
  href?: string | null;
  target?: string;
};

/* =======================
   Data
======================= */
const items: MenuItem[] = [
  { label: "Inicio", icon: <Home size={20} />, active: true },
  { label: "Avisos", icon: <List size={20} />, href: "/avisos" },
  { label: "Calendario", icon: <Calendar size={20} />, href: "/eventos" },
  { label: "CLASES", icon: null, section: "CLASES" },
  {
    label: "Soporte",
    icon: <Settings size={20} />,
    href: "https://tally.so/r/RGxeaQ",
    target: "_blank",
  },
];

export default function Menu({ collapsed, onToggle }: MenuProps) {
  return (
    <aside
      className={`
        h-screen bg-foregroud
        flex flex-col overflow-hidden
        transition-all duration-300
        ${collapsed ? "w-16" : "w-72"}
      `}
    >
      {/* Header */}
      <div
        className={`
          p-3 flex items-center
          ${collapsed ? "justify-center" : "justify-between"}
        `}
      >
        {!collapsed && (
          <span className="text-foregroud font-bold text-base">
            Menú
          </span>
        )}

        <button
          onClick={onToggle}
          className={`
            bg-foregroud hover:bg-gray-800 rounded-lg
            flex items-center transition-all
            ${collapsed ? "p-2" : "px-3 py-2 gap-2"}
          `}
        >
          <Home size={18} />
          {!collapsed && <span className="font-semibold">Inicio</span>}
        </button>
      </div>

      {/* Items */}
      <nav className="p-2 flex flex-col gap-2 overflow-y-auto">
        {items.map((item, idx) => {
          if (item.section) {
            return (
              !collapsed && (
                <div
                  key={idx}
                  className="mt-2 mb-1 px-3 text-xs font-bold tracking-wide text-gray-500"
                >
                  {item.section}
                </div>
              )
            );
          }

          const content = (
            <span
              className={`
                flex items-center w-full rounded-lg transition-colors
                ${collapsed ? "p-2 justify-center" : "px-3 py-2 gap-3"}
                ${
                  item.active
                    ? "bg-red-900"
                    : "hover:bg-gray-800"
                }
              `}
            >
              <span className="grid place-items-center w-6 h-6">
                {item.icon}
              </span>

              {!collapsed && (
                <span className="text-sm font-medium truncate">
                  {item.label}
                </span>
              )}
            </span>
          );

          if (!item.href) {
            return (
              <button key={idx} type="button" className="text-left">
                {content}
              </button>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href}
              target={item.target}
              rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
            >
              {content}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}