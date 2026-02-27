import { Navbar } from "@/app/eventos/7742347/components/navbar"
import { HeroSection } from "@/app/eventos/7742347/components/hero-section"
import { SpeakersSection } from "@/app/eventos/7742347/components/speakers-section"
import AgendaSection from "@/app/eventos/7742347/components/agenda-section"
import { LocationSection } from "@/app/eventos/7742347/components/location-section"
import { Footer } from "@/app/eventos/7742347/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <SpeakersSection />
      <AgendaSection />
      <LocationSection />
      <Footer />
    </main>
  )
}