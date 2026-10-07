import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ExternalLink,
  Github,
  Eye,
  Layers,
  Sparkles,
  Smartphone,
  Globe,
  Terminal,
  BarChart3,
  LayoutGrid,
  Filter,
  CheckCircle2,
  FolderGit2,
  Boxes,
} from 'lucide-react';
import { ProjectMediaVisual } from './ProjectMediaVisual';
import { PROJECTS_DATA, Project } from '../data/portfolioData';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

const CATEGORIES = [
  'All Projects',
  'Laravel & Backend',
  'Web Development',
  'Mobile Apps',
  'AI & Automation',
  'Desktop Applications',
] as const;

export function Projects({ onSelectProject }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'dashboard'>('grid');

  // Filter projects
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All Projects' ||
        project.category === selectedCategory ||
        (selectedCategory === 'Laravel & Backend' &&
          (project.category === 'Laravel & Backend' ||
            project.technologies.some((t) => t.toLowerCase().includes('laravel') || t.toLowerCase().includes('php'))));

      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Dashboard Metrics calculated strictly from real project data
  const metrics = useMemo(() => {
    const total = PROJECTS_DATA.length;
    const categoryCounts: Record<string, number> = {};
    const statusCounts: Record<string, number> = {};

    PROJECTS_DATA.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
      statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
    });

    return { total, categoryCounts, statusCounts };
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Laravel & Backend':
        return <Boxes className="w-3.5 h-3.5 text-rose-400" />;
      case 'Web Development':
        return <Globe className="w-3.5 h-3.5 text-blue-400" />;
      case 'Mobile Apps':
        return <Smartphone className="w-3.5 h-3.5 text-cyan-400" />;
      case 'AI & Automation':
        return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
      case 'Desktop Applications':
        return <Terminal className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>03. Featured Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white dark:text-white light:text-slate-950">
              Crafted Software & Applications
            </h2>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              An interactive catalog of real full-stack web platforms, Flutter mobile apps, AI automation engines, and system utilities.
            </p>
          </div>

          {/* View toggle (Grid vs Dashboard) and Search bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center p-1 rounded-xl glass-panel border border-white/10 dark:border-white/10 light:border-slate-300">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white dark:hover:text-white light:text-slate-600'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Showcase Grid</span>
              </button>
              <button
                onClick={() => setViewMode('dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  viewMode === 'dashboard'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white dark:hover:text-white light:text-slate-600'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Analytics Dashboard</span>
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects by name, tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl glass-panel text-xs text-white dark:text-white light:text-slate-900 border border-white/10 dark:border-white/10 light:border-slate-300 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl glass-panel border border-white/10 dark:border-white/10 light:border-slate-200">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Total Projects</span>
            <div className="text-2xl font-bold font-mono text-cyan-400 mt-1 tabular-nums">
              {metrics.total}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Verified Multi-Stack Projects</p>
          </div>
          <div className="p-4 rounded-xl glass-panel border border-white/10 dark:border-white/10 light:border-slate-200">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Laravel & Backend</span>
            <div className="text-2xl font-bold font-mono text-rose-400 mt-1 tabular-nums">
              {metrics.categoryCounts['Laravel & Backend'] || 0}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Laravel, PHP & APIs</p>
          </div>
          <div className="p-4 rounded-xl glass-panel border border-white/10 dark:border-white/10 light:border-slate-200">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Mobile Apps</span>
            <div className="text-2xl font-bold font-mono text-indigo-400 mt-1 tabular-nums">
              {metrics.categoryCounts['Mobile Apps'] || 0}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Flutter & Android Kotlin</p>
          </div>
          <div className="p-4 rounded-xl glass-panel border border-white/10 dark:border-white/10 light:border-slate-200">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Web & AI</span>
            <div className="text-2xl font-bold font-mono text-blue-400 mt-1 tabular-nums">
              {(metrics.categoryCounts['Web Development'] || 0) + (metrics.categoryCounts['AI & Automation'] || 0)}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">React, Next.js & Gemini</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map((cat, idx) => {
            const isActive = selectedCategory === cat;
            const isEven = idx % 2 === 0;
            const initialX = isEven ? -35 : 35;

            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, x: initialX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx * 0.06,
                }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold shadow-md shadow-indigo-500/20'
                    : 'glass-panel text-slate-400 hover:text-white dark:hover:text-white light:text-slate-600 light:hover:text-slate-950 hover:bg-white/5 border border-white/10 dark:border-white/10 light:border-slate-200'
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic View: Grid vs Dashboard */}
        {viewMode === 'dashboard' ? (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 mb-8 space-y-8">
            <div className="border-b border-white/10 pb-5">
              <h3 className="text-lg font-display font-bold text-white dark:text-white light:text-slate-900">
                Project Distribution & Taxonomy
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Real-time breakdown of architectural domains and release statuses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Breakdown */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  By Architecture Domain
                </h4>
                {Object.entries(metrics.categoryCounts).map(([cat, count]) => {
                  const pct = Math.round((count / metrics.total) * 100);
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium">
                          {cat}
                        </span>
                        <span className="font-mono text-cyan-400 tabular-nums">
                          {count} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Breakdown */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  By Lifecycle Status
                </h4>
                {Object.entries(metrics.statusCounts).map(([status, count]) => {
                  const pct = Math.round((count / metrics.total) * 100);
                  return (
                    <div key={status} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium">
                          {status}
                        </span>
                        <span className="font-mono text-indigo-400 tabular-nums">
                          {count} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl text-center border border-white/10">
            <Filter className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-300 text-sm font-medium">No projects match "{searchQuery}"</p>
            <p className="text-slate-500 text-xs mt-1">Try resetting the category filter or searching another term.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Projects');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-hidden">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const isEven = idx % 2 === 0;
                const initialX = isEven ? -70 : 70;

                return (
                  <motion.div
                    key={`${project.id}-${selectedCategory}`}
                    layout
                    initial={{ opacity: 0, x: initialX, scale: 0.96 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                      delay: (idx % 3) * 0.08,
                    }}
                    className="glass-panel rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 light:border-slate-200 glass-panel-hover flex flex-col justify-between group relative"
                  >
                    {/* Directional Cybernetic Accent Strip */}
                    <div
                      className={`absolute top-0 bottom-0 w-[2px] opacity-40 group-hover:opacity-100 transition-opacity z-10 pointer-events-none ${
                        isEven
                          ? 'left-0 bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent'
                          : 'right-0 bg-gradient-to-b from-indigo-400 via-purple-500 to-transparent'
                      }`}
                    />

                    {/* Project Media Slot */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                      <ProjectMediaVisual project={project} />

                      {/* Status Badge */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300">
                        {project.status}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Quiet Unboxed Metadata (Zero-pill discipline) */}
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono mb-2">
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.subCategory}</span>
                        </div>

                        <h3 className="text-lg font-display font-bold text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                          {project.name}
                        </h3>

                        <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/5 dark:border-white/5 light:border-slate-200">
                        {/* Technologies (clean unobtrusive tags) */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] px-2 py-0.5 rounded bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/5 text-slate-300 dark:text-slate-300 light:text-slate-700 font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="text-[11px] px-1.5 py-0.5 text-slate-500 font-mono">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Card Action Controls: Left and Right sliding buttons */}
                        <div className="flex items-center justify-between gap-2 pt-1">
                          <motion.button
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            onClick={() => onSelectProject(project)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer group/btn"
                          >
                            <Eye className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                            <span>View Details</span>
                          </motion.button>

                          <motion.div
                            initial={{ opacity: 0, x: 16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="flex items-center gap-2"
                          >
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                                title="Live Demo"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                                title="Source Code"
                              >
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
