import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";

type TagVariant = "primary" | "warning" | "default";

type Tag = {
  label: string;
  variant?: TagVariant;
};

type EventoProps = {
  month: string;
  day: string;
  title: string;
  subject: string;
  teacher: string;
  startTime: string;
  endTime: string;
  avatarUrl?: string;
  tags?: Tag[];
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
};

const badgeVariants: Record<TagVariant, string> = {
  warning: "bg-[#213c2d] text-[#f0c953]",
  primary: "bg-[#213c2d] text-[#f0c953]",
  default: "bg-[#213c2d] text-[#f0c953]",
};

export default function Evento({
  month,
  day,
  title,
  subject,
  teacher,
  startTime,
  endTime,
  avatarUrl = "/avatar.svg",
  tags = [],
  actionLabel = "Ver detalles del evento",
  actionHref = "/eventos/7742347",
  onAction,
  className = "",
}: EventoProps) {
  return (
    <section
      aria-label={title}
      className={`grid grid-cols-1 sm:grid-cols-[110px_1fr] w-full overflow-hidden rounded-xl shadow-lg bg-background ${className}`}
    >
      {/* Fecha */}
      <aside className="flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-1 bg-muted text-foreground p-4 sm:p-5">
        <span className="text-lg font-bold tracking-wider">
          {month.toUpperCase()}
        </span>
        <span className="text-4xl font-extrabold leading-none">
          {day}
        </span>
      </aside>

      {/* Contenido */}
      <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start md:items-center gap-4 p-4 sm:p-5 min-h-[140px] bg-background">
        
        {/* Avatar */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-[#213c2d] bg-[#213c2d] ring-2 ring-[#7fa892] -mt-1 sm:-mt-2">
          <Image
            src={avatarUrl}
            alt="Avatar del evento"
            width={80}
            height={80}
            className="w-full h-full object-cover scale-100"
          />
        </div>

        {/* Info */}
        <div className="grid gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-foreground text-lg sm:text-xl font-extrabold">
              {title}
            </h2>

            {tags.map((tag, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold
                  ${badgeVariants[tag.variant ?? "default"]}`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <span className="text-muted-foreground text-sm">
            {subject}
          </span>

          <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
            <UserRound className="h-4 w-4" aria-hidden />
            {teacher}
          </div>

          <span className="text-muted-foreground text-sm font-semibold">
            {startTime} – {endTime}
          </span>
        </div>

        {/* Acción */}
        <div className="flex justify-start md:justify-end">
          <Link
            href={actionHref}
            onClick={onAction}
            className="bg-yellow-400 text-slate-900 text-xs font-extrabold
                       px-4 py-3 rounded-lg shadow-md w-full md:w-auto text-center
                       hover:scale-105 transition-transform
                       dark:bg-yellow-300 dark:text-slate-900"
          >
            {actionLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}