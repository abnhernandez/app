import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { StatsSection } from "@/components/sections/stats-section"
import { QuickActionsSection } from "@/components/sections/quick-actions-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { MinistriesSection } from "@/components/sections/ministries-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { LessonsSection } from "@/components/sections/lessons-section"
import { LocationSection } from "@/components/sections/location-section"
import { CommunitySection } from "@/components/sections/community-section"
import { FaqSection } from "@/components/sections/faq-section"
import { CtaSection } from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main id="contenido" className="flex-1">
        {/* Hero + Schedule */}
        <HeroSection />

        {/* Quick Resource Cards */}
        <FeaturesSection />

        {/* Key Stats */}
        <StatsSection />

        {/* Quick Actions */}
        <QuickActionsSection />

        {/* Social Proof */}
        <TestimonialsSection />

        {/* Ministry Groups */}
        <MinistriesSection />

        {/* Getting Started */}
        <HowItWorksSection />

        {/* Featured Lessons */}
        <LessonsSection />

        {/* Location & Directions */}
        <LocationSection />

        {/* WhatsApp Community */}
        <CommunitySection />

        {/* FAQ */}
        <FaqSection />

        {/* Final CTA */}
        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  )
}