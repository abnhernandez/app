import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface LessonCardProps {
  title: string
  href: string
  index?: number
  className?: string
}

export function LessonCard({ title, href, index, className }: LessonCardProps) {
  return (
    <Link href={href} className={cn("group block", className)}>
      <article className="relative h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
        {/* Decorative gradient header */}
        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-muted via-muted to-accent/10">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-30">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id={`grid-${index}`}
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-accent/20"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill={`url(#grid-${index})`} />
            </svg>
          </div>

          {/* Lesson number badge */}
          {typeof index === "number" && (
            <div className="absolute left-4 top-4">
              <span className="inline-flex h-7 items-center rounded-full bg-background/80 px-2.5 text-xs font-semibold text-muted-foreground backdrop-blur-sm">
                Lección {index + 1}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-base font-semibold text-card-foreground line-clamp-2 text-pretty">
            {title}
          </h3>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-accent">Explorar</span>
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
