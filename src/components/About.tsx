import { useState } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Globe,
  Smartphone,
  Sparkles,
  Cpu,
  BookOpen,
  Edit3,
  Check,
  MapPin,
  Mail,
  User,
  ExternalLink,
} from 'lucide-react';
import { PERSONAL_INFO, HIGHLIGHT_CARDS, TIMELINE_DATA } from '../data/portfolioData';
import waqasProfileDark from '../assets/images/waqas_profile_1791043702949.jpg';
import presenterAvatarOriginal from '../assets/images/developer_presenter_1791043166310.jpg';
import waqasExactPhoto from '../assets/images/waqas_exact_photo.jpg';

export function About() {
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editableBio, setEditableBio] = useState(PERSONAL_INFO.bio);
  const [editableUni, setEditableUni] = useState(PERSONAL_INFO.education.institution);
  const [editableDegree, setEditableDegree] = useState(PERSONAL_INFO.education.degree);
  const [avatarSrc, setAvatarSrc] = useState(waqasProfileDark);
  const [saveToast, setSaveToast] = useState(false);

  const getHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      default:
        return <Globe className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleSaveInfo = () => {
    setIsEditingInfo(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 -right-64 w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with single-line unboxed kicker */}
        <div className="flex flex-col items-start mb-14">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            <User className="w-3.5 h-3.5" />
            <span>01. About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white dark:text-white light:text-slate-950">
            Passionate Engineer. Relentless Learner.
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
            Bridging conceptual design and technical execution with modern web stacks, Flutter mobile systems, and artificial intelligence.
          </p>
        </div>

        {/* Profile Card & Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Interactive Profile Card */}
          <div className="lg:col-span-4">
            <div className="glass-panel rounded-2xl p-6 sm:p-7 relative border border-white/10 dark:border-white/10 light:border-slate-200">
              {/* Profile Avatar Container */}
              <div className="relative aspect-square w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-slate-900 group">
                <img
                  src={avatarSrc}
                  alt="Waqas - Software Developer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={() => {
                    // Fallback to high-contrast stylized SVG avatar
                    setAvatarSrc(
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="%230f172a"><rect width="200" height="200" fill="%230f172a"/><circle cx="100" cy="80" r="45" fill="%2338bdf8"/><path d="M30 190 C30 135 70 135 100 135 C130 135 170 135 170 190" fill="%236366f1"/></svg>'
                    );
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-cyan-300 font-semibold uppercase tracking-wider">Active Developer</span>
                    <p className="text-white text-sm font-semibold">Waqas</p>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-lg border border-white/10">
                    <button
                      type="button"
                      onClick={() => setAvatarSrc(waqasProfileDark)}
                      title="Studio Tech Portrait"
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-all ${
                        avatarSrc === waqasProfileDark
                          ? 'bg-cyan-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Dark
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatarSrc(presenterAvatarOriginal)}
                      title="Original Presenter Avatar"
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-all ${
                        avatarSrc === presenterAvatarOriginal
                          ? 'bg-cyan-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Avatar
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatarSrc(waqasExactPhoto)}
                      title="Original Casual Photo"
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-all ${
                        avatarSrc === waqasExactPhoto
                          ? 'bg-cyan-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Real
                    </button>
                  </div>
                </div>
              </div>

              {/* Bio summary below picture */}
              <div className="mt-5 text-center sm:text-left space-y-2">
                <h3 className="text-xl font-display font-bold text-white dark:text-white light:text-slate-900">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs text-cyan-400 font-mono">
                  Full-Stack Developer · Flutter Engineer
                </p>

                <div className="pt-3 border-t border-white/10 dark:border-white/10 light:border-slate-200 space-y-2 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{editableUni}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{editableDegree}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{PERSONAL_INFO.socials.email}</span>
                  </div>
                </div>

                {/* Edit personal info toggle */}
                <div className="pt-4">
                  <button
                    onClick={() => setIsEditingInfo(!isEditingInfo)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg border border-white/10 dark:border-white/10 light:border-slate-300 hover:bg-white/5 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditingInfo ? 'Close Editor' : 'Customize Profile Info'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Narrative & Editable Form */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {isEditingInfo ? (
              <div className="glass-panel p-6 rounded-2xl border border-cyan-500/40 mb-6">
                <h3 className="text-sm font-semibold text-white dark:text-white light:text-slate-900 mb-3 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-cyan-400" />
                  Edit Personal & Education Information
                </h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">University / Institution</label>
                    <input
                      type="text"
                      value={editableUni}
                      onChange={(e) => setEditableUni(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950/70 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Degree Program</label>
                    <input
                      type="text"
                      value={editableDegree}
                      onChange={(e) => setEditableDegree(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950/70 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Introduction Bio</label>
                    <textarea
                      rows={3}
                      value={editableBio}
                      onChange={(e) => setEditableBio(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950/70 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <button
                    onClick={handleSaveInfo}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            ) : null}

            {saveToast && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Profile info updated successfully!</span>
              </div>
            )}

            {/* Narrative text */}
            <div className="space-y-4 text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm sm:text-base leading-relaxed">
              <p className="font-medium text-white dark:text-white light:text-slate-900 text-lg">
                "{editableBio}"
              </p>
              <p>
                My focus centers on architecting clean, maintainable systems across modern web and mobile platforms. Whether constructing dynamic SPAs with React and TypeScript, developing cross-platform mobile experiences with Flutter, or connecting automated logic with Google Gemini AI, I prioritize both technical rigor and user comfort.
              </p>
              <p>
                As a software engineering student at{' '}
                <strong className="text-cyan-400 font-semibold">{editableUni}</strong>, I apply systematic principles—from data modeling and object-oriented architecture to state management and endpoint design—to create real, functional digital solutions.
              </p>
            </div>

            {/* 4 Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {HIGHLIGHT_CARDS.map((card) => (
                <div
                  key={card.id}
                  className={`p-5 rounded-xl glass-panel glass-panel-hover border ${card.border}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-200">
                      {getHighlightIcon(card.icon)}
                    </div>
                    <h4 className="font-semibold text-white dark:text-white light:text-slate-900 text-sm">
                      {card.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education & Learning Journey Timeline */}
        <div className="mt-20">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Learning Path</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white dark:text-white light:text-slate-900 mb-8">
            Continuous Education & Milestones
          </h3>

          <div className="relative pl-6 sm:pl-8 border-l border-white/10 dark:border-white/10 light:border-slate-200 space-y-10">
            {TIMELINE_DATA.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 transition-transform shadow-[0_0_10px_#38bdf8]" />

                <div className="p-5 sm:p-6 rounded-2xl glass-panel glass-panel-hover border border-white/10 dark:border-white/10 light:border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      {item.period} · {item.type}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {item.organization}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white dark:text-white light:text-slate-900">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-3 space-y-1.5">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                        <span className="text-cyan-400 mt-0.5">›</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
