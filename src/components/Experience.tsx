import { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Sparkles, BookOpen, Code2, Rocket, Award, Compass } from 'lucide-react';
import { TIMELINE_DATA, TimelineItem } from '../data/portfolioData';

export function Experience() {
  const [selectedType, setSelectedType] = useState<string>('All');

  const filteredTimeline = TIMELINE_DATA.filter((item) => {
    if (selectedType === 'All') return true;
    return item.type === selectedType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Education':
        return <GraduationCap className="w-4 h-4 text-cyan-400" />;
      case 'Learning Milestone':
        return <Code2 className="w-4 h-4 text-indigo-400" />;
      case 'Project Journey':
        return <Rocket className="w-4 h-4 text-purple-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>04. Journey & Milestones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white dark:text-white light:text-slate-950">
              Experience & Learning Milestones
            </h2>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Academic progression at COMSATS University Islamabad, self-directed engineering disciplines, and project evolutions.
            </p>
          </div>

          {/* Type filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl glass-panel border border-white/10 dark:border-white/10 light:border-slate-300">
            {['All', 'Education', 'Learning Milestone', 'Project Journey'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedType === t
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white dark:hover:text-white light:text-slate-600'
                }`}
              >
                {t === 'Learning Milestone' ? 'Milestones' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline representation */}
        <div className="relative pl-6 sm:pl-10 border-l border-white/10 dark:border-white/10 light:border-slate-200 space-y-12">
          {filteredTimeline.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative group"
            >
              {/* Timeline marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-400 group-hover:border-cyan-400 group-hover:scale-125 transition-all shadow-[0_0_12px_rgba(99,102,241,0.5)]" />

              <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 dark:border-white/10 light:border-slate-200 glass-panel-hover">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-100">
                      {getTypeIcon(item.type)}
                    </div>
                    <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                      {item.type}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs text-slate-400 font-mono">{item.organization}</span>
                  </div>

                  <span className="text-xs font-mono text-slate-400 bg-white/5 dark:bg-white/5 light:bg-slate-100 px-2.5 py-1 rounded-md border border-white/5">
                    {item.period}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white dark:text-white light:text-slate-900">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mt-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-4 border-t border-white/5 dark:border-white/5 light:border-slate-200">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Key Focus Areas & Outcomes:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {item.highlights.map((hl, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-2.5 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-50 text-slate-300 dark:text-slate-300 light:text-slate-700"
                      >
                        <span className="text-cyan-400 mt-0.5">›</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
