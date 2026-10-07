import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingBackToTopProps {
  onScrollToTop: () => void;
}

export function FloatingBackToTop({ onScrollToTop }: FloatingBackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={onScrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 backdrop-blur-md border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
