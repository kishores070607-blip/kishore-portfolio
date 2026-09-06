import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WorkSection from "@/components/WorkSection";
import PathSection from "@/components/PathSection";
import SystemsSection from "@/components/SystemsSection";
import ContactSection from "@/components/ContactSection";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="relative">
      <ScrollReveal />
      <Navigation />
      <HeroSection />
      <WorkSection />
      <PathSection />
      <SystemsSection />
      <ContactSection />
    </main>
  );
}
