import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-[0_0_35px_rgba(99,102,241,0.5)]">
              <span className="text-white font-display font-extrabold text-2xl tracking-wider">
                W
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-display font-bold text-xl text-white tracking-tight">
              <span>Waqas</span>
              <span className="text-cyan-400">.</span>
            </div>
            <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden mt-1">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
