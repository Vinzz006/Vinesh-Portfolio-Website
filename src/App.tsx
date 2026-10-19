import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import LazySection from './components/LazySection';

// Below-the-fold sections lazy-loaded for optimal mobile performance & minimal initial bundle
const AboutSection = lazy(() => import('./sections/AboutSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const EngineeringLabSection = lazy(() => import('./sections/EngineeringLabSection'));
const SkillsSection = lazy(() => import('./sections/SkillsSection'));
const ResearchSection = lazy(() => import('./sections/ResearchSection'));
const ExperienceSection = lazy(() => import('./sections/ExperienceSection'));
const GitHubSection = lazy(() => import('./sections/GitHubSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));
const Footer = lazy(() => import('./sections/Footer'));

const BenchModuleFallback = ({ name }: { name: string }) => (
  <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono text-xs text-term-muted" aria-hidden="true">
    <div className="border border-console-border bg-console-panel p-5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-phosphor animate-pulse" />
        <span className="text-phosphor font-bold">[TELEMETRY_DISPATCH]</span>
        <span>Loading bench module: {name}...</span>
      </div>
      <span className="text-[10px] text-term-dim hidden sm:inline">ADDR: 0x00FF · BUS: ACTIVE</span>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-console-base text-term-text selection:bg-phosphor/20 selection:text-phosphor relative overflow-x-hidden font-sans">
      {/* Hardware Oscilloscope Graticule Background Layer */}
      <div className="fixed inset-0 graticule-grid opacity-25 pointer-events-none" aria-hidden="true" />

      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] px-4 py-2 border border-phosphor bg-console-panel text-phosphor font-mono text-xs font-bold"
      >
        [Skip to main workbench content]
      </a>

      {/* Sticky Hardware Console Navigation */}
      <Navigation />

      {/* Main Workbench Sections */}
      <main id="main-content" className="relative z-10">
        {/* Above-the-fold critical hero workbench */}
        <HeroSection />

        {/* Below-the-fold modules dynamically loaded on viewport approach or anchor target */}
        <LazySection sectionId="about" rootMargin="350px 0px" minHeight="800px" mobileMinHeight="2074px">
          <Suspense fallback={<BenchModuleFallback name="ABOUT_ARCH" />}>
            <AboutSection />
          </Suspense>
        </LazySection>

        <LazySection sectionId="projects" rootMargin="350px 0px" minHeight="2400px" mobileMinHeight="8685px">
          <Suspense fallback={<BenchModuleFallback name="PROJECT_DATASHEETS" />}>
            <ProjectsSection />
          </Suspense>
        </LazySection>

        <LazySection sectionId="lab" rootMargin="350px 0px" minHeight="1200px" mobileMinHeight="2742px">
          <Suspense fallback={<BenchModuleFallback name="ENGINEERING_LAB" />}>
            <EngineeringLabSection />
          </Suspense>
        </LazySection>

        <LazySection sectionId="skills" rootMargin="350px 0px" minHeight="900px" mobileMinHeight="1652px">
          <Suspense fallback={<BenchModuleFallback name="PINOUT_SKILLS" />}>
            <SkillsSection />
          </Suspense>
        </LazySection>

        <LazySection sectionId="research" rootMargin="350px 0px" minHeight="1200px" mobileMinHeight="3124px">
          <Suspense fallback={<BenchModuleFallback name="QUANTIZATION_SIMULATOR" />}>
            <ResearchSection />
          </Suspense>
        </LazySection>

        <LazySection sectionId="experience" rootMargin="350px 0px" minHeight="900px" mobileMinHeight="2457px">
          <Suspense fallback={<BenchModuleFallback name="EXPERIENCE_LOG" />}>
            <ExperienceSection />
          </Suspense>
        </LazySection>

        <LazySection sectionId="github" rootMargin="350px 0px" minHeight="800px" mobileMinHeight="1918px">
          <Suspense fallback={<BenchModuleFallback name="GITHUB_TELEMETRY" />}>
            <GitHubSection />
          </Suspense>
        </LazySection>

        <LazySection sectionId="contact" rootMargin="350px 0px" minHeight="900px" mobileMinHeight="1666px">
          <Suspense fallback={<BenchModuleFallback name="DISPATCH_CONSOLE" />}>
            <ContactSection />
          </Suspense>
        </LazySection>
      </main>

      {/* Hardware Telemetry Footer */}
      <LazySection sectionId="footer" rootMargin="200px 0px" minHeight="200px" mobileMinHeight="200px">
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </LazySection>
    </div>
  );
}
