import React from "react";
import Image from "next/image";

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
  onAction?: () => void;
  className?: string;
};

const badgeVariants: Record<TagVariant, string> = {
  warning:
    "bg-yellow-400 text-slate-900 dark:bg-yellow-300 dark:text-slate-900",
  primary:
    "bg-indigo-500 text-white dark:bg-indigo-400 dark:text-slate-900",
  default:
    "bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100",
};

export default function Evento({
  month,
  day,
  title,
  subject,
  teacher,
  startTime,
  endTime,
  avatarUrl,
  tags = [],
  actionLabel = "IR A LA CLASE",
  onAction,
  className = "",
}: EventoProps) {
  return (
    <section
      aria-label={title}
      className={`grid grid-cols-[110px_1fr] w-full overflow-hidden rounded-xl shadow-lg bg-background ${className}`}
    >
      {/* Fecha */}
      <aside className="flex flex-col items-center justify-center gap-1 bg-muted text-foreground p-5">
        <span className="text-lg font-bold tracking-wider">
          {month.toUpperCase()}
        </span>
        <span className="text-4xl font-extrabold leading-none">
          {day}
        </span>
      </aside>

      {/* Contenido */}
      <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 p-5 min-h-[140px] bg-background">
        
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-border bg-muted">
          {avatarUrl && (
            <Image
              src={avatarUrl}
              alt=""
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Info */}
        <div className="grid gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-foreground text-xl font-extrabold">
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
            <span aria-hidden>👤</span>
            {teacher}
          </div>

          <span className="text-muted-foreground text-sm font-semibold">
            {startTime} – {endTime}
          </span>
        </div>

        {/* Acción */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onAction}
            className="bg-yellow-400 text-slate-900 text-xs font-extrabold
                       px-4 py-3 rounded-lg shadow-md
                       hover:scale-105 transition-transform
                       dark:bg-yellow-300 dark:text-slate-900"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </section>
  );
}