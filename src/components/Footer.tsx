import { motion } from 'motion/react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onScrollToTop: () => void;
  onNavigate: (id: string) => void;
}

export function Footer({ onScrollToTop, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const NAV_ITEMS = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="border-t border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-950 dark:bg-slate-950 light:bg-slate-50 pt-16 pb-12 text-slate-400 dark:text-slate-400 light:text-slate-600 text-xs transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5 dark:border-white/5 light:border-slate-200 overflow-x-hidden">
          {/* Brand Col: Enters from LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="md:col-span-5 space-y-4"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-md">
                <span className="text-white font-display font-extrabold text-sm tracking-wider">W</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white dark:text-white light:text-slate-900">
                Waqas<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-sm leading-relaxed">
              Full-Stack Developer, Flutter mobile app engineer, and AI/ML enthusiast focused on building modern, performant, and elegant digital solutions.
            </p>
            <div className="text-[11px] font-mono text-cyan-400">
              {PERSONAL_INFO.education.institution}
            </div>
          </motion.div>

          {/* Quick Nav Col: Enters from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="md:col-span-4 space-y-3"
          >
            <h4 className="text-xs font-mono uppercase tracking-wider text-white dark:text-white light:text-slate-900 font-semibold">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {NAV_ITEMS.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.35, delay: 0.15 + idx * 0.04 }}
                    onClick={() => onNavigate(item.id)}
                    className="text-left text-slate-400 hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Connect & Direct Action: Alternating Links */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="md:col-span-3 space-y-4"
          >
            <h4 className="text-xs font-mono uppercase tracking-wider text-white dark:text-white light:text-slate-900 font-semibold">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5">
              <motion.a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repositories</span>
              </motion.a>

              <motion.a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Network</span>
              </motion.a>

              <motion.a
                href={`mailto:${PERSONAL_INFO.socials.email}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{PERSONAL_INFO.socials.email}</span>
              </motion.a>
            </div>

            <motion.button
              onClick={onScrollToTop}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: 0.35 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-cyan-400 bg-white/5 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 text-xs cursor-pointer transition-all shadow-sm"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Bar: Alternating Left & Right */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 overflow-x-hidden">
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            © {currentYear} Waqas. All rights reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-1"
          >
            <span>Designed & Built with passion by Waqas.</span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
