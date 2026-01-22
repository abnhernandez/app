import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  href?: string
  className?: string
  variant?: "default" | "highlight" | "minimal"
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  className,
  variant = "default",
}: FeatureCardProps) {
  const content = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border transition-all duration-300",
        variant === "default" &&
          "border-border bg-card p-5 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5",
        variant === "highlight" &&
          "border-accent/30 bg-accent/5 p-5 hover:border-accent/50 hover:bg-accent/10",
        variant === "minimal" &&
          "border-transparent bg-transparent p-4 hover:bg-muted",
        className
      )}
    >
      {Icon && (
        <div
          className={cn(
            "mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
            variant === "highlight"
              ? "bg-accent/20 text-accent"
              : "bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      )}
      <h3 className="text-base font-semibold text-card-foreground">{title}</h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}
