"use client"

import { CalendarDays, MapPin, Clock, ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-6"
    >
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_70%)]" />

      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE - TEXT */}
        <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">

          {/* Overline / Lema */}
          <p className="text-xs tracking-[0.35em] uppercase text-primary font-semibold mb-6 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
            CADA DECISIÓN DEFINE TU FUTURO
          </p>

          {/* Title */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight text-foreground drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            Las decisiones más importantes <br /> de tu vida
          </h1>

          {/* Description */}
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Un encuentro diseñado para ayudarte a tomar decisiones que definirán tu propósito, fortalecerán tu fe y transformarán tu futuro.
          </p>

          {/* Event Info */}
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-primary" />
              <span>Sábado, 28 de febrero</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              <span>6:00 PM</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              <span>Iglesia Monte Sion</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#agenda"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Ver agenda
              <ArrowDown className="size-4" />
            </a>

            <a
              href="https://maps.app.goo.gl/dpToTNDtef24EMhF6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border px-8 py-3 text-sm font-medium transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Cómo llegar
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - AVATAR */}
        <div className="flex justify-center">
          <div className="relative max-w-md rounded-2xl border border-border bg-card backdrop-blur-sm shadow-2xl shadow-primary/20 p-6">
            <img
              src="/avatar.svg"
              alt="Invitados especiales Erick Guzman Cruz y Noemi Trujillo Rogel"
              className="rounded-xl object-cover w-full h-[360px] md:h-[420px] transition-transform duration-500 hover:scale-[1.03] cursor-pointer"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

      </div>
    </section>
  )
}