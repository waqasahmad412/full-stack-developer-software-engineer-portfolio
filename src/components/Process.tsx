import { motion } from 'motion/react';
import { Search, Compass, Code, RefreshCw, Workflow, CheckCircle } from 'lucide-react';
import { WORK_PROCESS_STEPS } from '../data/portfolioData';

export function Process() {
  const getStepIcon = (number: string) => {
    switch (number) {
      case '01': return <Search className="w-5 h-5 text-cyan-400" />;
      case '02': return <Compass className="w-5 h-5 text-blue-400" />;
      case '03': return <Code className="w-5 h-5 text-indigo-400" />;
      case '04': return <RefreshCw className="w-5 h-5 text-purple-400" />;
      default: return <Workflow className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="process" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-indigo-600/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            <Workflow className="w-3.5 h-3.5" />
            <span>06. Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white dark:text-white light:text-slate-950">
            Engineered Development Process
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-2 max-w-xl text-balance">
            A disciplined 4-stage engineering lifecycle transforming concepts into resilient, polished software products.
          </p>
        </div>

        {/* 4 Steps Grid with connecting visual line */}
        <div className="relative">
          {/* Desktop connecting hairline */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-[1px] bg-gradient-to-r from-cyan-500/20 via-indigo-500/30 to-purple-500/20 -translate-y-12 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {WORK_PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 dark:border-white/10 light:border-slate-200 glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 flex items-center justify-center border border-white/10 dark:border-white/10 light:border-slate-200 shadow-sm">
                      {getStepIcon(step.number)}
                    </div>
                    <span className="font-mono text-xl font-extrabold text-cyan-400/40">
                      {step.number}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    {step.step}
                  </span>

                  <h3 className="text-xl font-display font-bold text-white dark:text-white light:text-slate-900 mt-1 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 dark:border-white/5 light:border-slate-200 space-y-1.5">
                  {step.activities.map((act, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300 dark:text-slate-300 light:text-slate-600">
                      <span className="text-cyan-400 mt-0.5">›</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
