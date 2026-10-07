import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Search,
  Code2,
  Terminal,
  FileCode2,
  Smartphone,
  Server,
  Database,
  Atom,
  Layers,
  Code,
  Palette,
  Network,
  Boxes,
  Workflow,
  Flame,
  HardDrive,
  Brain,
  Sparkles,
  Cpu,
  Laptop,
  GitBranch,
  Github,
  Send,
  Tablet,
  Filter,
  Package,
  PackageOpen,
  RotateCcw,
  Play,
  ArrowLeft,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { SKILLS_DATA, SKILL_CATEGORIES } from '../data/portfolioData';

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Skills');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUnpacked, setIsUnpacked] = useState(true);
  const [unpackKey, setUnpackKey] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  // Whenever user scrolls into view, trigger clean unpacking
  useEffect(() => {
    if (isInView) {
      setIsUnpacked(true);
    }
  }, [isInView]);

  // Icon mapping
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5' };
    switch (iconName) {
      case 'Terminal':
        return <Terminal {...props} className="w-5 h-5 text-emerald-400" />;
      case 'Code2':
        return <Code2 {...props} className="w-5 h-5 text-amber-400" />;
      case 'FileCode2':
        return <FileCode2 {...props} className="w-5 h-5 text-blue-400" />;
      case 'Smartphone':
        return <Smartphone {...props} className="w-5 h-5 text-cyan-400" />;
      case 'Server':
        return <Server {...props} className="w-5 h-5 text-purple-400" />;
      case 'Database':
        return <Database {...props} className="w-5 h-5 text-indigo-400" />;
      case 'Atom':
        return <Atom {...props} className="w-5 h-5 text-cyan-400" />;
      case 'Layers':
        return <Layers {...props} className="w-5 h-5 text-slate-200" />;
      case 'Code':
        return <Code {...props} className="w-5 h-5 text-orange-400" />;
      case 'Palette':
        return <Palette {...props} className="w-5 h-5 text-sky-400" />;
      case 'Network':
        return <Network {...props} className="w-5 h-5 text-emerald-400" />;
      case 'Boxes':
        return <Boxes {...props} className="w-5 h-5 text-rose-400" />;
      case 'Workflow':
        return <Workflow {...props} className="w-5 h-5 text-teal-400" />;
      case 'Flame':
        return <Flame {...props} className="w-5 h-5 text-amber-500" />;
      case 'HardDrive':
        return <HardDrive {...props} className="w-5 h-5 text-blue-400" />;
      case 'Brain':
        return <Brain {...props} className="w-5 h-5 text-fuchsia-400" />;
      case 'Sparkles':
        return <Sparkles {...props} className="w-5 h-5 text-cyan-300" />;
      case 'Cpu':
        return <Cpu {...props} className="w-5 h-5 text-indigo-300" />;
      case 'Laptop':
        return <Laptop {...props} className="w-5 h-5 text-blue-400" />;
      case 'GitBranch':
        return <GitBranch {...props} className="w-5 h-5 text-orange-400" />;
      case 'Github':
        return <Github {...props} className="w-5 h-5 text-slate-300" />;
      case 'Send':
        return <Send {...props} className="w-5 h-5 text-orange-500" />;
      case 'Tablet':
        return <Tablet {...props} className="w-5 h-5 text-emerald-400" />;
      default:
        return <Code2 {...props} className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchesCategory =
        selectedCategory === 'All Skills' ||
        skill.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesQuery =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Trigger manual slow replay of Left & Right unpack
  const handleReplayUnpack = () => {
    setIsUnpacked(false);
    setTimeout(() => {
      setUnpackKey((prev) => prev + 1);
      setIsUnpacked(true);
    }, 280);
  };

  return (
    <section ref={sectionRef} id="skills" className="py-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>02. Technical Arsenal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white dark:text-white light:text-slate-950">
              Skills & Engineering Stack
            </h2>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Modern programming languages, component frameworks, mobile SDKs, and automation tooling applied across practical projects.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search skill (e.g., Flutter, Gemini)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel text-xs text-white dark:text-white light:text-slate-900 border border-white/10 dark:border-white/10 light:border-slate-300 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MASTER SKILL VAULT (Central box where all skills pack & emerge from)      */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-12 p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 backdrop-blur-xl shadow-2xl shadow-cyan-950/30 overflow-hidden"
        >
          {/* Animated glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-cyan-500/10 animate-pulse pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20 group">
                  {isUnpacked ? (
                    <PackageOpen className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 animate-bounce" />
                  ) : (
                    <Package className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-400" />
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 animate-ping" />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                    CENTRAL TECH VAULT
                  </span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-[11px] font-mono text-cyan-300 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3 text-cyan-400" />
                    <span>LEFT & RIGHT ALTERNATING</span>
                    <ArrowRight className="w-3 h-3 text-indigo-400" />
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white mt-1">
                  Master Skills Container ({filteredSkills.length} Modules)
                </h3>
                <p className="text-xs text-slate-400 max-w-lg mt-0.5">
                  Interactive dual-stream architecture: modules emerge sequentially from alternating left and right streams.
                </p>
              </div>
            </div>

            {/* Interactive Unpack / Repack Controls */}
            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={handleReplayUnpack}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-cyan-950/40 border border-cyan-400/30 cursor-pointer transition-all active:scale-95"
                title="Watch cards emerge one by one slowly: one from Left, one from Right"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Unpack: Left & Right (One by One)</span>
              </button>

              <button
                type="button"
                onClick={() => setIsUnpacked(!isUnpacked)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white text-xs font-medium cursor-pointer transition-colors"
                title={isUnpacked ? 'Pack all boxes into this one box' : 'Unpack all boxes'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isUnpacked ? 'Pack in Box' : 'Open Box'}</span>
              </button>
            </div>
          </div>

          {/* Dual Flow Status Bar */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Odd Modules: Enter from Left</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1.5 text-indigo-400">
                <span>Even Modules: Enter from Right</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <span className="text-slate-500">
              Active Category: <strong className="text-slate-300">{selectedCategory}</strong>
            </span>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setIsUnpacked(false);
                  setTimeout(() => {
                    setUnpackKey((prev) => prev + 1);
                    setIsUnpacked(true);
                  }, 180);
                }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold shadow-md shadow-indigo-500/20'
                    : 'glass-panel text-slate-400 hover:text-white dark:hover:text-white light:text-slate-600 light:hover:text-slate-950 hover:bg-white/5 border border-white/10 dark:border-white/10 light:border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* SKILLS GRID: ONE FROM LEFT, ONE FROM RIGHT, ONE-BY-ONE SLOWLY            */}
        {/* ========================================================================= */}
        {filteredSkills.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl text-center border border-white/10">
            <Filter className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-300 text-sm font-medium">No skills match "{searchQuery}"</p>
            <p className="text-slate-500 text-xs mt-1">Try resetting the category filter or searching another term.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Skills');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-hidden min-h-[300px]">
              <AnimatePresence mode="wait">
                {isUnpacked && (
                  <>
                    {filteredSkills.map((skill, idx) => {
                      // Alternating logic:
                      // idx = 0 -> Left (-150px)
                      // idx = 1 -> Right (+150px)
                      // idx = 2 -> Left (-150px)
                      // idx = 3 -> Right (+150px)
                      const isLeft = idx % 2 === 0;
                      const initialX = isLeft ? -180 : 180;
                      const exitX = isLeft ? -150 : 150;

                      return (
                        <motion.div
                          key={`${skill.name}-${selectedCategory}-${unpackKey}`}
                          layout
                          // Alternating entrance: one from LEFT, one from RIGHT!
                          initial={{
                            opacity: 0,
                            x: initialX,
                            y: 15,
                            scale: 0.85,
                            filter: 'blur(8px)',
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                            scale: 1,
                            filter: 'blur(0px)',
                          }}
                          exit={{
                            opacity: 0,
                            x: exitX,
                            scale: 0.85,
                            filter: 'blur(6px)',
                            transition: {
                              duration: 0.35,
                              delay: (filteredSkills.length - idx) * 0.02,
                            },
                          }}
                          // SLOW and ONE-BY-ONE:
                          // duration = 0.9s (slow and smooth / aahista aahista)
                          // delay = idx * 0.12s (sequential one-by-one stagger)
                          transition={{
                            duration: 0.9,
                            ease: [0.22, 1, 0.36, 1], // Smooth organic deceleration
                            delay: idx * 0.12,
                          }}
                          className={`glass-panel rounded-xl p-4 sm:p-5 border border-white/10 dark:border-white/10 light:border-slate-200 glass-panel-hover flex flex-col justify-between group relative overflow-hidden shadow-lg transition-all ${
                            isLeft
                              ? 'hover:shadow-cyan-500/20 border-l-2 border-l-cyan-400'
                              : 'hover:shadow-indigo-500/20 border-r-2 border-r-indigo-400'
                          }`}
                        >
                          {/* Module origin tag & side indicator */}
                          <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider mb-2">
                            <span
                              className={`flex items-center gap-1 font-semibold ${
                                isLeft ? 'text-cyan-400' : 'text-indigo-400'
                              }`}
                            >
                              {isLeft ? (
                                <>
                                  <ArrowLeft className="w-2.5 h-2.5" />
                                  <span>From Left</span>
                                </>
                              ) : (
                                <>
                                  <span>From Right</span>
                                  <ArrowRight className="w-2.5 h-2.5" />
                                </>
                              )}
                            </span>
                            <span className="text-slate-500">
                              MOD #{String(idx + 1).padStart(2, '0')}
                            </span>
                          </div>

                          <div>
                            <div className="flex items-center justify-between gap-3 mb-3">
                              <div
                                className={`p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 group-hover:scale-110 transition-all shadow-inner ${
                                  isLeft
                                    ? 'group-hover:bg-cyan-500/10'
                                    : 'group-hover:bg-indigo-500/10'
                                }`}
                              >
                                {renderIcon(skill.iconName)}
                              </div>
                              <span
                                className={`text-[11px] font-mono font-medium ${
                                  isLeft ? 'text-cyan-400' : 'text-indigo-400'
                                }`}
                              >
                                {skill.level}
                              </span>
                            </div>

                            <h3 className="font-semibold text-white dark:text-white light:text-slate-900 text-sm group-hover:text-cyan-400 transition-colors">
                              {skill.name}
                            </h3>

                            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                              {skill.focus}
                            </p>
                          </div>

                          <div className="pt-3 mt-3 border-t border-white/5 dark:border-white/5 light:border-slate-200 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-500 light:text-slate-400">
                            <span>{skill.category}</span>
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isLeft
                                  ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]'
                                  : 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.9)]'
                              }`}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </>
                )}
              </AnimatePresence>

              {/* Closed Box State Placeholder */}
              {!isUnpacked && (
                <div className="col-span-full py-16 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex flex-col items-center gap-3 p-8 rounded-2xl glass-panel border border-cyan-500/30"
                  >
                    <Package className="w-12 h-12 text-cyan-400 animate-pulse" />
                    <h4 className="text-white font-bold text-base">
                      All {filteredSkills.length} Skills Packed Inside The Central Box
                    </h4>
                    <p className="text-xs text-slate-400 max-w-md">
                      Click below to watch them fly out one by one slowly: one from the Left, one from the Right!
                    </p>
                    <button
                      onClick={() => setIsUnpacked(true)}
                      className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-cyan-950/40"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Unpack One-By-One (Left & Right)</span>
                    </button>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
