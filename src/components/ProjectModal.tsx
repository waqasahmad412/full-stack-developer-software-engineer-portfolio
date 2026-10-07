import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Sparkles, AlertCircle } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { ProjectMediaVisual } from './ProjectMediaVisual';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-slate-900 dark:bg-slate-900 light:bg-white text-slate-100 dark:text-slate-100 light:text-slate-900 rounded-2xl border border-white/10 dark:border-white/10 light:border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-950/50 dark:bg-slate-950/50 light:bg-slate-50">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-cyan-400 font-semibold">{project.category}</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400 font-mono">{project.subCategory}</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-white/10 dark:border-white/10 light:border-slate-200 flex items-center justify-center text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Project Image Banner / Fallback Graphic */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-white/10">
              <ProjectMediaVisual project={project} isModal />
              {/* Status Tag Overlay */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs font-mono text-cyan-300">
                {project.status}
              </div>
            </div>

            {/* Title & Overview */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white dark:text-white light:text-slate-900">
                {project.name}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 mt-2 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-800 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features List */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Core Capabilities & Architecture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-start gap-2.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Highlights if available */}
            {project.architectureHighlights && project.architectureHighlights.length > 0 && (
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20">
                <h4 className="text-xs font-semibold text-indigo-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Engineering Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {project.architectureHighlights.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-cyan-400">›</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action buttons / links */}
            <div className="pt-4 border-t border-white/10 dark:border-white/10 light:border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500 dark:text-slate-500 light:text-slate-400">
                Status: <span className="text-cyan-400 font-mono">{project.status}</span>
              </div>
              <div className="flex items-center gap-3">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer shadow-md transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Live deployment available upon release</span>
                  </div>
                )}

                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-white/10 hover:bg-white/5 text-slate-200 cursor-pointer transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Repository</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
