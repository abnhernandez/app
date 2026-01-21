import { Hero } from "@/app/components/hero-estudio";
import { Objective } from "@/app/components/objective";
import { Participate } from "@/app/components/participate";
import { ReadingPlan } from "@/app/components/reading-plan";
import { ImportantNotes } from "@/app/components/important-notes";
import { Footer } from "@/app/components/footer-estudio";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Objective />
      <Participate />
      <ReadingPlan />
      <ImportantNotes />
      <Footer />
    </main>
  );
}