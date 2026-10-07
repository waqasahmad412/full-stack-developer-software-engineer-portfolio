import { useState } from 'react';
import {
  Code,
  Layout,
  Smartphone,
  Sparkles,
  Terminal,
  Database,
  Cpu,
  Boxes,
  Globe,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  Search,
  Activity,
  Award,
  ShieldCheck,
} from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectMediaVisualProps {
  project: Project;
  className?: string;
  isModal?: boolean;
}

export function ProjectMediaVisual({ project, className = '', isModal = false }: ProjectMediaVisualProps) {
  const [imageError, setImageError] = useState(false);

  // If a real generated or provided photo exists and hasn't errored
  if (project.image && !imageError) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-slate-950 ${className}`}>
        <img
          src={project.image}
          alt={project.name}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
      </div>
    );
  }

  // Domain-specific styled high-fidelity UI visual fallbacks:
  const renderVisualMockup = () => {
    switch (project.id) {
      case 'taskflow-pro':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-900 border border-indigo-500/20">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/5 pb-2">
              <span className="font-mono text-cyan-400 flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5" /> Sprint #04 Kanban
              </span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">Active</span>
            </div>
            <div className="grid grid-cols-3 gap-2 my-auto">
              <div className="p-2 rounded bg-white/5 border border-white/5 text-[10px]">
                <div className="text-slate-400 font-mono">BACKLOG (3)</div>
                <div className="mt-1.5 h-1.5 w-12 bg-slate-700 rounded-full" />
              </div>
              <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/20 text-[10px]">
                <div className="text-cyan-300 font-mono">IN PROGRESS (2)</div>
                <div className="mt-1.5 h-1.5 w-16 bg-cyan-400 rounded-full" />
              </div>
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/20 text-[10px]">
                <div className="text-emerald-300 font-mono">COMPLETED (8)</div>
                <div className="mt-1.5 h-1.5 w-14 bg-emerald-400 rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Next.js · React 19</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 100% Type-Safe
              </span>
            </div>
          </div>
        );

      case 'aurelia-salon':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-amber-950/20 via-slate-950 to-purple-950/30 border border-amber-500/20">
            <div className="flex items-center justify-between text-[11px] text-amber-300/80 border-b border-white/5 pb-2">
              <span className="font-display tracking-widest uppercase text-xs">AURELIA LUXURY</span>
              <span className="text-[10px] font-mono text-slate-400">Haute Beauté</span>
            </div>
            <div className="text-center my-auto space-y-1">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">Editorial Studio</span>
              <h4 className="text-base font-display font-semibold text-white">Boutique Wellness & Spa</h4>
              <div className="flex items-center justify-center gap-2 text-[10px] text-amber-400/90 pt-1">
                <span>Hair Couture</span> · <span>Aromatherapy</span> · <span>Bridal Suite</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span>Vite · Tailwind CSS</span>
              <span className="text-amber-400">Reservation Flow Active</span>
            </div>
          </div>
        );

      case 'smart-zameen':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-emerald-950/30 via-slate-950 to-slate-900 border border-emerald-500/20">
            <div className="flex items-center justify-between text-[11px] text-emerald-400 border-b border-white/5 pb-2">
              <span className="font-mono flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" /> Smart Zameen Android
              </span>
              <span className="text-[10px] font-mono text-slate-400">Kotlin Native</span>
            </div>
            <div className="my-auto p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xs">
                Plot
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-white">Commercial Sector 9-B</div>
                <div className="text-[10px] text-slate-400">1 Kanal · Prime Avenue Locality</div>
              </div>
              <div className="text-xs font-mono font-bold text-emerald-400">PKR</div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span>Android Gradle · MVVM</span>
              <span className="text-emerald-400">Geo-Filtered Map</span>
            </div>
          </div>
        );

      case 'invitation-maker':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-fuchsia-950/20 via-slate-950 to-indigo-950/30 border border-fuchsia-500/20">
            <div className="flex items-center justify-between text-[11px] text-fuchsia-300 border-b border-white/5 pb-2">
              <span className="font-mono flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" /> Digital Invite Canvas
              </span>
              <span className="text-[10px] font-mono text-slate-400">Android Studio</span>
            </div>
            <div className="my-auto text-center border border-dashed border-fuchsia-500/30 rounded-xl p-3 bg-fuchsia-950/10">
              <span className="text-[9px] uppercase tracking-widest text-fuchsia-400 font-mono">Ceremonial Invitation</span>
              <div className="text-sm font-display font-bold text-white mt-0.5">Annual Gala & Reception</div>
              <div className="text-[10px] text-slate-400 mt-0.5">RSVP Coordinate Overlay Enabled</div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span>Kotlin Canvas · Export PNG</span>
              <span className="text-fuchsia-400">Share Intent Integration</span>
            </div>
          </div>
        );

      case 'habitzen-mobile':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-teal-950/30 via-slate-950 to-cyan-950/30 border border-teal-500/20">
            <div className="flex items-center justify-between text-[11px] text-teal-300 border-b border-white/5 pb-2">
              <span className="font-mono flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> HabitZen Streak Engine
              </span>
              <span className="text-[10px] font-mono text-teal-400">24-Day Streak</span>
            </div>
            <div className="my-auto flex items-center justify-around">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      idx < 6
                        ? 'bg-teal-500 text-slate-950 shadow-[0_0_8px_rgba(20,184,166,0.6)]'
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    ✓
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">{day}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span>Flutter · Hive Encrypted DB</span>
              <span className="text-teal-400">Offline-First Sync</span>
            </div>
          </div>
        );

      case 'gym-management':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-orange-950/30 via-slate-950 to-indigo-950/30 border border-orange-500/20">
            <div className="flex items-center justify-between text-[11px] text-orange-400 border-b border-white/5 pb-2">
              <span className="font-mono flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> Titan Gym Club Suite
              </span>
              <span className="text-[10px] font-mono text-slate-400">Flutter Mobile</span>
            </div>
            <div className="my-auto grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 rounded bg-white/5 border border-white/5">
                <div className="text-slate-400">Active Members</div>
                <div className="text-base font-bold font-mono text-white">480+</div>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/5">
                <div className="text-slate-400">Workout Splits</div>
                <div className="text-base font-bold font-mono text-orange-400">Push/Pull/Legs</div>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span>Firebase Firestore · Auth</span>
              <span className="text-orange-400">QR Check-In Ready</span>
            </div>
          </div>
        );

      case 'pydoc-analyzer':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-blue-950/30 via-slate-950 to-cyan-950/30 border border-blue-500/20">
            <div className="flex items-center justify-between text-[11px] text-cyan-400 border-b border-white/5 pb-2">
              <span className="font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" /> PyDoc Semantic Vector
              </span>
              <span className="text-[10px] font-mono text-slate-400">Gemini LLM</span>
            </div>
            <div className="my-auto space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-500/20 text-[11px] text-slate-200">
                <span className="text-cyan-400 font-mono">Query:</span> "Explain memory management in Flutter"
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-[11px] text-slate-300">
                <span className="text-emerald-400 font-mono">Vector Match (98.4%):</span> Dart garbage collection allocates ephemeral objects...
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span>Python · FastAPI · ChromaDB</span>
              <span className="text-cyan-400">Grounded Citations</span>
            </div>
          </div>
        );

      case 'autolead-scraper':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-amber-950/20 via-slate-950 to-emerald-950/20 border border-amber-500/20 font-mono">
            <div className="flex items-center justify-between text-[11px] text-amber-400 border-b border-white/5 pb-2">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> AutoLead Crawler CLI
              </span>
              <span className="text-[10px] text-emerald-400">LIVE CRAWL</span>
            </div>
            <div className="my-auto text-[11px] text-slate-300 space-y-1 bg-black/40 p-2.5 rounded-lg border border-white/5">
              <p className="text-slate-500">&gt; playwright launch --headless</p>
              <p className="text-cyan-300">&gt; extracted: 1,420 companies [OK]</p>
              <p className="text-emerald-300">&gt; exported: ./leads_q3_clean.xlsx</p>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span>Python · Pandas · BeautifulSoup</span>
              <span className="text-amber-400">Anti-Bot Throttling</span>
            </div>
          </div>
        );

      case 'jarvis-assistant':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-cyan-950/30 via-slate-950 to-indigo-950/40 border border-cyan-500/30">
            <div className="flex items-center justify-between text-[11px] text-cyan-400 border-b border-white/5 pb-2">
              <span className="font-mono flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" /> J.A.R.V.I.S. Core HUD
              </span>
              <span className="text-[10px] font-mono text-emerald-400">SYSTEM NOMINAL</span>
            </div>
            <div className="my-auto flex items-center justify-center">
              <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-cyan-400/60 flex items-center justify-center animate-spin duration-1000">
                <div className="w-12 h-12 rounded-full border border-cyan-300 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <span>Python · CustomTkinter</span>
              <span className="text-cyan-400">Voice Synthesis Ready</span>
            </div>
          </div>
        );

      case 'devsnippet-desktop':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-purple-950/30 via-slate-950 to-slate-900 border border-purple-500/20 font-mono">
            <div className="flex items-center justify-between text-[11px] text-purple-300 border-b border-white/5 pb-2">
              <span className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-cyan-400" /> DevSnippet Desktop
              </span>
              <span className="text-[10px] text-slate-400">Ctrl+Shift+S</span>
            </div>
            <div className="my-auto bg-black/50 p-2.5 rounded-lg border border-white/5 text-[11px] space-y-1">
              <span className="text-purple-400">async function</span>{' '}
              <span className="text-cyan-300">fetchPayload</span>() &#123;
              <p className="pl-3 text-emerald-300">return await db.sqlite.find();</p>
              <span>&#125;</span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span>Electron · TypeScript · SQLite</span>
              <span className="text-purple-400">Instant Clipboard Copy</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/40 text-center">
            <div className="p-3 rounded-xl bg-white/5 mb-2 group-hover:scale-110 transition-transform">
              <Boxes className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-sm font-bold font-display text-white">{project.name}</span>
            <span className="text-xs font-mono text-slate-400 mt-0.5">{project.subCategory}</span>
          </div>
        );
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {renderVisualMockup()}
    </div>
  );
}
