import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Terminal,
  FolderGit2,
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';

export function Profiles() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const PROFILES = [
    {
      id: 'github',
      name: 'GitHub',
      handle: '@waqasahmad412',
      url: PERSONAL_INFO.socials.github,
      description: 'Public repositories, open-source experiments, and code bases.',
      icon: <Github className="w-6 h-6 text-slate-200" />,
      accent: 'border-slate-700/50 hover:border-slate-500',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'malik-waqas-a9a659403',
      url: PERSONAL_INFO.socials.linkedin,
      description: 'Professional networking, engineering updates, and career connections.',
      icon: <Linkedin className="w-6 h-6 text-cyan-400" />,
      accent: 'border-cyan-500/30 hover:border-cyan-400',
    },
    {
      id: 'email',
      name: 'Direct Email',
      handle: PERSONAL_INFO.socials.email,
      url: `mailto:${PERSONAL_INFO.socials.email}`,
      description: 'Direct inquiry channel for software projects and collaborations.',
      icon: <Mail className="w-6 h-6 text-indigo-400" />,
      accent: 'border-indigo-500/30 hover:border-indigo-400',
    },
  ];

  return (
    <section id="profiles" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            <Share2 className="w-3.5 h-3.5" />
            <span>07. Network & Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white dark:text-white light:text-slate-950">
            Professional Channels
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
            Explore code repositories, connect professionally, or initiate a conversation.
          </p>
        </div>

        {/* 3 Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 overflow-x-hidden">
          {PROFILES.map((profile, idx) => {
            const isEven = idx % 2 === 0;
            const initialX = isEven ? -70 : 70;

            return (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, x: initialX, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx * 0.1,
                }}
                className={`glass-panel rounded-2xl p-6 border ${profile.accent} glass-panel-hover flex flex-col justify-between relative overflow-hidden group`}
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 group-hover:scale-110 transition-transform shadow-inner">
                      {profile.icon}
                    </div>
                    <button
                      onClick={() => handleCopy(profile.url, profile.name)}
                      className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer transition-colors"
                      title="Copy Link"
                    >
                      {copiedLink === profile.name ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                    {profile.name}
                  </h3>
                  <span className="text-xs font-mono text-cyan-400 block mt-0.5">
                    {profile.handle}
                  </span>

                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-3 leading-relaxed">
                    {profile.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 dark:border-white/5 light:border-slate-200">
                  <motion.a
                    href={profile.url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-600 hover:text-white text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 transition-all cursor-pointer shadow-sm"
                  >
                    <span>Open {profile.name}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Code Repositories Highlight */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 dark:border-white/10 light:border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-display font-bold text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                <span>Featured Repository Architectures</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Representative open source modules and application structures.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Verified Project Repositories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS_DATA.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/5 dark:border-white/5 light:border-slate-200"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-white dark:text-white light:text-slate-900">
                    {p.name}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">{p.status}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {p.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
