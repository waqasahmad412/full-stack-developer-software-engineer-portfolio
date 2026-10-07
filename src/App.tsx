import { useState, useCallback, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { Preloader } from './components/Preloader';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Experience } from './components/Experience';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Profiles } from './components/Profiles';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingBackToTop } from './components/FloatingBackToTop';
import { ResumeModal } from './components/ResumeModal';
import { HumanPresenter } from './components/HumanPresenter';
import { Project } from './data/portfolioData';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string>('');
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section via IntersectionObserver for Presenter awareness
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'skills',
      'projects',
      'experience',
      'services',
      'process',
      'profiles',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -40% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 75;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleSelectService = useCallback((serviceTitle: string) => {
    setContactSubject(`Inquiry regarding ${serviceTitle}`);
    scrollTo('contact');
  }, [scrollTo]);

  return (
    <div className="relative min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-colors duration-300">
      {/* Brand Preloader */}
      <Preloader />

      {/* Scroll Progress Bar at top */}
      <ScrollProgress />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Fixed Navigation Header */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Background Layer: Animated Human AI Presenter (Layered BEHIND dashboard content) */}
      <HumanPresenter activeSection={activeSection} />

      {/* Main Content Sections (z-10 layer) */}
      <main className="relative z-10">
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onExploreWork={() => scrollTo('projects')}
          onAboutMe={() => scrollTo('about')}
          onContactMe={() => scrollTo('contact')}
        />

        <About />

        <Skills />

        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        <Experience />

        <Services onSelectService={handleSelectService} />

        <Process />

        <Profiles />

        <Contact initialSubject={contactSubject} />
      </main>

      {/* Footer */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onNavigate={scrollTo}
      />

      {/* Floating Back to Top button */}
      <FloatingBackToTop onScrollToTop={handleScrollToTop} />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive Curriculum Vitae / Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
