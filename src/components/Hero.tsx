import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  FileText,
  Mail,
  Github,
  Linkedin,
  Code2,
  Terminal,
  Sparkles,
  Layers,
  ChevronDown,
  CheckCircle,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  onExploreWork: () => void;
  onAboutMe: () => void;
  onContactMe: () => void;
}

export function Hero({ onOpenResume, onExploreWork, onAboutMe, onContactMe }: HeroProps) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter animation for Main Headline: "Building Digital Experiences That Matter."
  const PREFIX_TEXT = 'Building Digital Experiences That ';
  const HIGHLIGHT_TEXT = 'Matter.';
  const FULL_HEADLINE = PREFIX_TEXT + HIGHLIGHT_TEXT;
  const [headlineLength, setHeadlineLength] = useState(0);

  useEffect(() => {
    if (headlineLength < FULL_HEADLINE.length) {
      const timer = setTimeout(() => {
        setHeadlineLength((prev) => prev + 1);
      }, 45);
      return () => clearTimeout(timer);
    }
  }, [headlineLength, FULL_HEADLINE.length]);

  const heroTitles = [
    'Full-Stack Developer',
    'Flutter App Developer',
    'AI/ML Enthusiast',
  ];

  useEffect(() => {
    const currentTitle = heroTitles[titleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        // Pause at full word
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % heroTitles.length);
      } else {
        const nextCharCount = isDeleting
          ? displayText.length - 1
          : displayText.length + 1;
        setDisplayText(currentTitle.substring(0, nextCharCount));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background ambient lighting meshes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Subtle background tech grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Introductory label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-semibold">
                {PERSONAL_INFO.tagline}
              </span>
            </motion.div>

            {/* Main Headline with Typewriter One-by-One Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setHeadlineLength(0)}
              title="Click to replay typing animation"
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white dark:text-white light:text-slate-950 leading-[1.08] max-w-2xl text-balance cursor-pointer select-none min-h-[2.5em] sm:min-h-[2.2em]"
            >
              {headlineLength <= PREFIX_TEXT.length ? (
                <span>{PREFIX_TEXT.slice(0, headlineLength)}</span>
              ) : (
                <>
                  <span>{PREFIX_TEXT}</span>
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                    {HIGHLIGHT_TEXT.slice(0, headlineLength - PREFIX_TEXT.length)}
                  </span>
                </>
              )}
              {headlineLength < FULL_HEADLINE.length ? (
                <span className="inline-block w-1.5 sm:w-2 h-7 sm:h-11 bg-cyan-400 ml-1.5 align-middle animate-pulse" />
              ) : (
                <span className="inline-block w-1.5 sm:w-2 h-7 sm:h-11 bg-cyan-400/30 ml-1.5 align-middle animate-pulse" />
              )}
            </motion.h1>

            {/* Dynamic typing title badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 flex items-center h-8"
            >
              <span className="text-slate-400 font-mono text-sm sm:text-base mr-2">I am a</span>
              <span className="text-base sm:text-xl font-bold font-mono text-cyan-400 tracking-tight">
                {displayText}
              </span>
              <span className="w-2 h-5 bg-cyan-400 ml-1 animate-pulse" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed max-w-xl"
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            {/* Functional Buttons: Explore My Work, About Me, Download Resume, Contact Me */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3 sm:gap-4 items-center"
            >
              {/* 1. Explore My Work */}
              <button
                onClick={onExploreWork}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-sm font-semibold shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* 2. About Me */}
              <button
                onClick={onAboutMe}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 dark:border-white/10 light:border-slate-300 bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
              >
                <span>About Me</span>
              </button>

              {/* 3. Download Resume */}
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-indigo-500/30 bg-indigo-950/20 hover:bg-indigo-900/30 text-indigo-300 text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
                title="View & Download verified CV"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>

              {/* 4. Contact Me */}
              <button
                onClick={onContactMe}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 dark:border-white/10 light:border-slate-300 bg-transparent hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Contact Me</span>
              </button>
            </motion.div>

            {/* Social links row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex items-center gap-4 text-slate-400 dark:text-slate-400 light:text-slate-600 text-xs"
            >
              <span className="font-mono uppercase tracking-wider text-[11px] text-slate-500">Connect:</span>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-600">·</span>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-600">·</span>
              <a
                href={`mailto:${PERSONAL_INFO.socials.email}`}
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
                aria-label="Direct Email"
              >
                <Mail className="w-4 h-4" />
                <span>{PERSONAL_INFO.socials.email}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: High-Tech Interactive Visual Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="w-full relative"
            >
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/30 via-indigo-500/20 to-cyan-500/30 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 -z-10" />

              {/* Central Glass Card: Interactive Code & Architecture Panel */}
              <div className="relative rounded-2xl glass-panel p-5 sm:p-6 shadow-2xl overflow-hidden border border-white/10 dark:border-white/10 light:border-slate-200">
                {/* Window header buttons */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 dark:border-white/10 light:border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>waqas.engine.ts</span>
                  </div>
                  <span className="text-[10px] text-cyan-400/80 font-mono">v2.4</span>
                </div>

                {/* Simulated Code Panel */}
                <div className="pt-4 font-mono text-xs leading-relaxed space-y-1.5 overflow-x-auto text-slate-300 dark:text-slate-300 light:text-slate-800">
                  <p>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-cyan-300 font-semibold">developer</span> = &#123;
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-400">name</span>: <span className="text-emerald-300">'{PERSONAL_INFO.name}'</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-400">degree</span>: <span className="text-amber-300">'Software Engineering'</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-400">university</span>: <span className="text-slate-400">'COMSATS Sahiwal'</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-400">stack</span>: [
                    <span className="text-emerald-300">'React'</span>,{' '}
                    <span className="text-emerald-300">'TypeScript'</span>,{' '}
                    <span className="text-emerald-300">'Flutter'</span>,{' '}
                    <span className="text-emerald-300">'Python'</span>,{' '}
                    <span className="text-emerald-300">'Gemini AI'</span>],
                  </p>
                  <p className="pl-4">
                    <span className="text-indigo-400">mission</span>: <span className="text-cyan-200">'Building resilient, elegant software'</span>
                  </p>
                  <p>&#125;;</p>

                  <div className="pt-3 border-t border-white/5 dark:border-white/5 light:border-slate-200 text-[11px] text-slate-400 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Execution Status:</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Ready to Collaborate
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating highlight badges */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="mt-5 p-3 rounded-xl bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-cyan-500/30 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white dark:text-white light:text-slate-900">
                        FlowPilot AI & Flutter
                      </h4>
                      <p className="text-[11px] text-slate-400">Multi-stack engineering</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                    Featured
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-14 flex flex-col items-center justify-center"
        >
          <button
            onClick={onAboutMe}
            className="flex flex-col items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer group"
          >
            <span className="uppercase tracking-widest text-[10px] font-mono">Scroll to explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-slate-400 group-hover:text-cyan-400" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
