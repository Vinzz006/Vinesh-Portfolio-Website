import { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import EngineeringLabSection from './sections/EngineeringLabSection';
import SkillsSection from './sections/SkillsSection';
import ResearchSection from './sections/ResearchSection';
import ExperienceSection from './sections/ExperienceSection';
import GitHubSection from './sections/GitHubSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import CinematicCursor from './components/CinematicCursor';
import AtmosphericParticles from './components/AtmosphericParticles';
import SmoothScroll from './components/motion/SmoothScroll';
import Cinematic3DIntro from './components/intro/Cinematic3DIntro';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-bg-primary text-text-primary relative selection:bg-primary/20 selection:text-primary overflow-x-hidden">
        {/* VINZZ Cinematic 3D Intro Sequence */}
        <Cinematic3DIntro onComplete={() => setIntroDone(true)} />

        {/* Cinematic Custom Motion Cursor (Desktop) */}
        <CinematicCursor />

        {/* Lightweight Atmospheric Particles Canvas */}
        <AtmosphericParticles />

        {/* Accessibility Skip Link */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] btn-primary py-2 px-4 text-sm"
        >
          Skip to main content
        </a>

        <Navigation />

        <main id="main-content" className="relative z-10">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <EngineeringLabSection />
          <SkillsSection />
          <ResearchSection />
          <ExperienceSection />
          <GitHubSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
