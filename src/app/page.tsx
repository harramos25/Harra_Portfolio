import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Marquee from "@/components/ui/Marquee";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-blue-500/30">
      < Navbar />

      {/* Scrollable Content (Sits ON TOP of Contact) */}
      <div className="relative z-10 bg-[#0a0a0a] mb-[100vh] shadow-2xl">
        <Hero />
        <Marquee />
        <div id="about">
          <About />
        </div>
        <TechStack />
        <Projects />
      </div>

      {/* Fixed Contact Section (Revealed on Scroll) */}
      <div className="fixed bottom-0 left-0 w-full h-screen z-0">
        <Contact />
      </div>
    </main>
  );
}
