import SiteIntro from "@/components/SiteIntro";
import Navigation from "@/components/Navigation";
import LabSection from "@/components/LabSection";
import JourneySection from "@/components/JourneySection";
import StackSection from "@/components/StackSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="relative">
      <SiteIntro />

      <Navigation />

      <div id="site-content" className="invisible opacity-0">

        {/* HOME */}
        <section
          id="home"
          className="flex min-h-screen items-center border-t border-white/10 px-6 md:px-10"
        >
          <div className="w-full max-w-7xl">
            <p className="mb-8 text-[10px] uppercase tracking-[0.2em] text-white/40 md:text-xs">
              01 / Home
            </p>

            <h2 className="max-w-6xl text-[15vw] font-medium leading-[0.78] tracking-[-0.08em] md:text-[10vw]">
              I BUILD
              <br />
              THINGS.
            </h2>
          </div>
        </section>

        {/* LAB */}
        <LabSection />

        {/* JOURNEY */}
        <JourneySection />

        {/* STACK */}
        <StackSection />
        
       {/* CONTACT */}
<ContactSection />

      </div>
    </main>
  );
}