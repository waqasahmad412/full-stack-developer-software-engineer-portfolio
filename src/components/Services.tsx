import { motion } from 'motion/react';
import {
  Globe,
  Code2,
  Smartphone,
  Server,
  Sparkles,
  Palette,
  ArrowRight,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../data/portfolioData';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export function Services({ onSelectService }: ServicesProps) {
  const getServiceIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6' };
    switch (iconName) {
      case 'Globe': return <Globe {...props} className="w-6 h-6 text-blue-400" />;
      case 'Code2': return <Code2 {...props} className="w-6 h-6 text-cyan-400" />;
      case 'Smartphone': return <Smartphone {...props} className="w-6 h-6 text-indigo-400" />;
      case 'Server': return <Server {...props} className="w-6 h-6 text-purple-400" />;
      case 'Sparkles': return <Sparkles {...props} className="w-6 h-6 text-amber-400" />;
      case 'Palette': return <Palette {...props} className="w-6 h-6 text-emerald-400" />;
      default: return <Layers {...props} className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>05. Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white dark:text-white light:text-slate-950">
            Specialized Development Services
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
            Technical disciplines available for software projects, mobile applications, and intelligent digital workflows.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-hidden">
          {SERVICES_DATA.map((service, index) => {
            const isEven = index % 2 === 0;
            const initialX = isEven ? -70 : 70;
            const buttonX = isEven ? -16 : 16;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: initialX, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (index % 3) * 0.08,
                }}
                className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 dark:border-white/10 light:border-slate-200 glass-panel-hover flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Directional Cybernetic Accent Strip */}
                <div
                  className={`absolute top-0 bottom-0 w-[2px] opacity-40 group-hover:opacity-100 transition-opacity z-10 pointer-events-none ${
                    isEven
                      ? 'left-0 bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent'
                      : 'right-0 bg-gradient-to-b from-indigo-400 via-purple-500 to-transparent'
                  }`}
                />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 group-hover:scale-110 transition-transform shadow-inner">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-mono text-cyan-400/90 font-medium">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-2 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-5 pt-5 border-t border-white/5 dark:border-white/5 light:border-slate-200 space-y-2">
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Deliverables:
                    </h4>
                    {service.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 dark:border-white/5 light:border-slate-200">
                  <motion.button
                    initial={{ opacity: 0, x: buttonX }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectService(service.title)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-600 hover:text-white dark:hover:bg-gradient-to-r dark:hover:from-indigo-600 dark:hover:to-cyan-600 dark:hover:text-white text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 transition-all cursor-pointer group/btn shadow-sm"
                  >
                    <span>Inquire About {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
