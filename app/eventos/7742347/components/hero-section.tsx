"use client"

import { CalendarDays, MapPin, Clock, ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#071a14] px-6"
    >
      {/* Iluminación sutil coherente con Speakers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-amber-400/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl text-center text-white">

        {/* Overline */}
        <p className="mb-10 text-xs font-semibold uppercase tracking-[0.5em] text-primary/80">
          CADA DECISIÓN DEFINE TU FUTURO
        </p>

        {/* Title */}
        <h1
          className="relative font-serif text-4xl md:text-6xl lg:text-7xl 
          font-semibold leading-[1.05] tracking-tight"
        >
          <span className="block">
            Las decisiones más importantes
          </span>

          <span className="relative mt-6 block text-primary">
            de tu vida

            {/* Apple Energy Line */}
            <span className="apple-underline" />
          </span>
        </h1>

        {/* Description */}
        <p className="mt-12 mx-auto max-w-2xl text-base md:text-lg text-white/70 leading-relaxed">
          Un encuentro diseñado para ayudarte a tomar decisiones que definirán
          tu propósito, fortalecerán tu fe y transformarán tu futuro.
        </p>

        {/* Event Info */}
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <InfoPill icon={<CalendarDays />} text="Sábado, 28 de febrero" />
          <InfoPill icon={<Clock />} text="6:00 PM" />
          <InfoPill icon={<MapPin />} text="Iglesia Monte Sion" />
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="#agenda"
            className="group inline-flex items-center justify-center gap-2 
            rounded-full bg-primary px-10 py-4 text-base font-semibold 
            text-black transition-all duration-300 hover:scale-105"
          >
            Ver agenda
            <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
          </a>

          <a
            href="https://maps.app.goo.gl/dpToTNDtef24EMhF6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center 
            rounded-full border border-white/20 px-10 py-4 
            text-base font-medium transition-all duration-300 
            hover:border-primary hover:text-primary"
          >
            Cómo llegar
          </a>
        </div>

      </div>
    </section>
  )
}

function InfoPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-full 
    border border-white/10 bg-white/5 backdrop-blur-md 
    px-6 py-3 text-sm text-white/80">
      <span className="size-4 text-primary">{icon}</span>
      <span>{text}</span>
    </div>
  )
}