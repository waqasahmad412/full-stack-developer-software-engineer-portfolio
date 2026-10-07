import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Radio,
  UserCheck,
} from 'lucide-react';
import { usePresenterSpeech, PresenterPhase } from '../hooks/usePresenterSpeech';
import presenterAvatar from '../assets/images/developer_presenter_1791043166310.jpg';

interface HumanPresenterProps {
  activeSection?: string;
}

export function HumanPresenter({ activeSection = 'hero' }: HumanPresenterProps) {
  const {
    isSpeaking,
    isMuted,
    hasCompletedIntro,
    currentSubtitle,
    guideMode,
    mouthOpenLevel,
    mouthShape,
    currentPhase,
    speechProgress,
    startIntro,
    stopSpeech,
    toggleMute,
    toggleGuideMode,
    handleSectionGuide,
  } = usePresenterSpeech();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isControlExpanded, setIsControlExpanded] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [nodOffset, setNodOffset] = useState(0);
  const [weightShift, setWeightShift] = useState(0);

  // Monitor mouse movements for natural micro-gaze tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const normalizedY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMousePos({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Monitor scroll for natural parallax reaction
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Natural spontaneous eye blinking cycle (randomized between 3.2s - 5.5s)
  useEffect(() => {
    let blinkTimeout: number;

    const scheduleNextBlink = () => {
      const nextDelay = 3200 + Math.random() * 2300;
      blinkTimeout = window.setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 150);
      }, nextDelay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Subtle conversational head nods during speech (every 1.8s - 2.8s)
  useEffect(() => {
    if (!isSpeaking) {
      setNodOffset(0);
      return;
    }

    const interval = window.setInterval(() => {
      setNodOffset(2.5);
      setTimeout(() => setNodOffset(0), 400);
    }, 2200);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  // Subtle natural body weight shifts (every 6 seconds)
  useEffect(() => {
    const interval = window.setInterval(() => {
      setWeightShift((prev) => (prev === 0 ? 1 : prev === 1 ? -1 : 0));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Section guide trigger when guide mode is enabled
  useEffect(() => {
    if (guideMode && activeSection) {
      handleSectionGuide(activeSection);
    }
  }, [activeSection, guideMode, handleSectionGuide]);

  // Calculations for head rotation and body movement based on phase
  const phaseGaze = useMemo(() => {
    switch (currentPhase) {
      case 'greeting':
        return { headYaw: 0, headPitch: 1.5, glanceX: 0, glanceY: 0 };
      case 'explaining':
        return { headYaw: 2, headPitch: 0.5, glanceX: 1, glanceY: 0 };
      case 'skills':
        // Glance towards the skills area on the left of screen
        return { headYaw: -6, headPitch: 1, glanceX: -3, glanceY: 1 };
      case 'projects':
        // Glance towards projects
        return { headYaw: -4, headPitch: 2, glanceX: -2, glanceY: 1 };
      case 'services':
        // Glance towards services
        return { headYaw: -5, headPitch: 1, glanceX: -2.5, glanceY: 1 };
      case 'welcoming':
        return { headYaw: 0, headPitch: 1.2, glanceX: 0, glanceY: 0 };
      case 'idle':
      default:
        return { headYaw: 0, headPitch: 0, glanceX: 0, glanceY: 0 };
    }
  }, [currentPhase]);

  const headRotateY = prefersReducedMotion
    ? 0
    : mousePos.x * 4 + phaseGaze.headYaw + (weightShift * 0.8);
  const headRotateX = prefersReducedMotion
    ? 0
    : -mousePos.y * 3 + phaseGaze.headPitch + nodOffset;
  const parallaxOffset = prefersReducedMotion ? 0 : Math.min(scrollY * 0.08, 90);

  // Dynamic hand & arm kinematics based on current presentation phase
  // Right Arm (Primary Gestural Arm)
  const rightArmPose = useMemo(() => {
    if (prefersReducedMotion) {
      return { rotate: 0, x: 0, y: 0, opacity: 0 };
    }
    switch (currentPhase) {
      case 'greeting':
        // Hand raised to chest in warm greeting ("Hello, I'm Waqas")
        return {
          rotate: -28,
          x: -18,
          y: -42,
          opacity: 1,
          scale: 1.05,
          gestureType: 'chest-greet',
        };
      case 'explaining':
        // Open palm conversational mid-torso pulse
        return {
          rotate: -16,
          x: -24,
          y: -30,
          opacity: 1,
          scale: 1.02,
          gestureType: 'open-explain',
        };
      case 'skills':
        // Extended pointing / presenting gesture toward left side of screen (Skills)
        return {
          rotate: -46,
          x: -54,
          y: -48,
          opacity: 1,
          scale: 1.08,
          gestureType: 'present-left',
        };
      case 'projects':
        // Sweeping presentation gesture toward projects
        return {
          rotate: -38,
          x: -44,
          y: -40,
          opacity: 1,
          scale: 1.06,
          gestureType: 'present-left',
        };
      case 'services':
        // Open upward presentation gesture
        return {
          rotate: -30,
          x: -36,
          y: -38,
          opacity: 1,
          scale: 1.04,
          gestureType: 'open-explain',
        };
      case 'welcoming':
        // Welcoming gesture towards viewer / slight heart touch
        return {
          rotate: -22,
          x: -20,
          y: -34,
          opacity: 1,
          scale: 1.03,
          gestureType: 'welcome',
        };
      case 'idle':
      default:
        // Natural resting position at waist
        return {
          rotate: 0,
          x: 0,
          y: 0,
          opacity: 0.85,
          scale: 1,
          gestureType: 'rest',
        };
    }
  }, [currentPhase, prefersReducedMotion]);

  // Left Arm (Secondary Accent Arm)
  const leftArmPose = useMemo(() => {
    if (prefersReducedMotion) {
      return { rotate: 0, x: 0, y: 0, opacity: 0 };
    }
    switch (currentPhase) {
      case 'greeting':
        return { rotate: 6, x: 8, y: -10, opacity: 0.9, gestureType: 'rest' };
      case 'explaining':
        // Left hand conversational accent
        return { rotate: 18, x: 16, y: -26, opacity: 1, gestureType: 'open-explain' };
      case 'skills':
        return { rotate: 8, x: 6, y: -12, opacity: 0.9, gestureType: 'rest' };
      case 'projects':
        // Both hands gesturing
        return { rotate: 22, x: 20, y: -30, opacity: 1, gestureType: 'open-explain' };
      case 'services':
        // Both hands open in presentation
        return { rotate: 26, x: 24, y: -32, opacity: 1, gestureType: 'open-explain' };
      case 'welcoming':
        // Welcoming open arms
        return { rotate: 20, x: 18, y: -28, opacity: 1, gestureType: 'welcome' };
      case 'idle':
      default:
        return { rotate: 0, x: 0, y: 0, opacity: 0.85, gestureType: 'rest' };
    }
  }, [currentPhase, prefersReducedMotion]);

  return (
    <>
      {/* ============================================================ */}
      {/* 1. BACKGROUND PRESENTER LAYER (Layered BEHIND dashboard UI)  */}
      {/* Pointer-events: NONE to guarantee ZERO click or scroll block */}
      {/* ============================================================ */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Holographic Pedestal & Ambient Volumetric Aura */}
        <div
          className="absolute right-0 sm:right-6 lg:right-16 top-20 sm:top-24 w-[340px] sm:w-[420px] lg:w-[500px] h-[580px] sm:h-[680px] lg:h-[780px] transition-transform duration-700 ease-out opacity-45 sm:opacity-80 lg:opacity-95"
          style={{
            transform: `translateY(${parallaxOffset * 0.3}px)`,
          }}
        >
          {/* Ambient Studio Lighting Cones */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-cyan-500/20 via-indigo-600/15 to-purple-600/20 blur-[110px] rounded-full" />
          <div
            className={`absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-24 rounded-[100%] bg-gradient-to-r from-cyan-500/25 via-blue-600/30 to-indigo-500/25 blur-xl transition-opacity duration-500 ${
              isSpeaking ? 'opacity-100 scale-110' : 'opacity-60 scale-100'
            }`}
          />

          {/* Futuristic Hologram Pedestal Ring */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-72 h-16 border border-cyan-400/30 rounded-[100%] [transform:rotateX(70deg)] shadow-[0_0_25px_rgba(6,182,212,0.35)]">
            <div
              className={`w-full h-full rounded-[100%] border border-cyan-300/40 animate-ping opacity-30 ${
                isSpeaking ? 'block' : 'hidden'
              }`}
            />
          </div>

          {/* ========================================================== */}
          {/* ARTICULATED HUMAN PRESENTER SKELETON & BODY RIG            */}
          {/* ========================================================== */}
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    // Natural subtle breathing (chest expands, gentle vertical lift)
                    y: isSpeaking ? [-2, 3, -2] : [0, -4, 0],
                    // Micro body weight shift
                    rotateZ: weightShift * 0.4,
                    // Conversational forward lean
                    scale: isSpeaking ? [1.008, 1.018, 1.008] : [1, 1.008, 1],
                  }
            }
            transition={{
              duration: isSpeaking ? 2.6 : 3.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-full h-full flex flex-col items-center justify-end"
            style={{
              perspective: 1000,
            }}
          >
            {/* Upper Torso & Head with Micro-Tilt Tracking */}
            <div
              className="relative w-[320px] sm:w-[380px] lg:w-[460px] h-[520px] sm:h-[620px] lg:h-[700px] transition-transform duration-300 ease-out"
              style={{
                transform: `rotateY(${headRotateY}deg) rotateX(${headRotateX}deg)`,
              }}
            >
              {/* Main Base Photographic Avatar with Depth Mask */}
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 0%, black 82%, transparent 98%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 0%, black 82%, transparent 98%)',
                }}
              >
                <img
                  src={presenterAvatar}
                  alt="Waqas - AI Presenter"
                  className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[1.02]"
                />

                {/* ================================================== */}
                {/* 1. ARTICULATED FACE: NATURAL EYE BLINK & SACCADES  */}
                {/* ================================================== */}
                {/* Left Eye */}
                <div
                  className="absolute top-[28.5%] left-[41%] w-[6%] h-[3.5%] overflow-hidden pointer-events-none"
                  style={{
                    transform: `translate(${phaseGaze.glanceX * 0.8}px, ${phaseGaze.glanceY * 0.8}px)`,
                  }}
                >
                  {/* Upper Eyelid Blink Cover */}
                  <div
                    className={`w-full h-full bg-slate-900/95 rounded-full transition-transform duration-100 ${
                      isBlinking ? 'scale-y-100 opacity-95' : 'scale-y-0 opacity-0'
                    }`}
                  />
                </div>

                {/* Right Eye */}
                <div
                  className="absolute top-[28.5%] left-[53%] w-[6%] h-[3.5%] overflow-hidden pointer-events-none"
                  style={{
                    transform: `translate(${phaseGaze.glanceX * 0.8}px, ${phaseGaze.glanceY * 0.8}px)`,
                  }}
                >
                  {/* Upper Eyelid Blink Cover */}
                  <div
                    className={`w-full h-full bg-slate-900/95 rounded-full transition-transform duration-100 ${
                      isBlinking ? 'scale-y-100 opacity-95' : 'scale-y-0 opacity-0'
                    }`}
                  />
                </div>

                {/* Natural Eye Crease Shadow on Blink */}
                <div
                  className={`absolute top-[28%] left-[38%] w-[24%] h-[4.5%] bg-slate-950/80 rounded-full blur-[1px] transition-opacity duration-100 ${
                    isBlinking ? 'opacity-90 scale-y-100' : 'opacity-0 scale-y-0'
                  }`}
                />

                {/* ================================================== */}
                {/* 2. ARTICULATED MOUTH: PHONEME & VISEME LIP-SYNC    */}
                {/* ================================================== */}
                {isSpeaking && mouthOpenLevel > 0.05 ? (
                  <div
                    className="absolute top-[41.2%] left-[46.2%] w-[7.8%] h-[3.2%] rounded-full pointer-events-none transition-all duration-75 flex items-center justify-center overflow-hidden"
                    style={{
                      transform: `scaleY(${0.4 + mouthOpenLevel * 1.6}) scaleX(${
                        mouthShape === 'wide' ? 1.25 : mouthShape === 'round' ? 0.85 : 1.05
                      })`,
                      backgroundColor: '#1c0a0c', // realistic oral cavity depth
                      boxShadow: '0 0 5px rgba(0,0,0,0.9) inset, 0 1px 3px rgba(0,0,0,0.7)',
                    }}
                  >
                    {/* Subtle Upper Teeth Flash */}
                    {mouthOpenLevel > 0.3 && (
                      <div className="absolute top-0 w-3/4 h-[30%] bg-slate-100/90 rounded-b-sm shadow-sm" />
                    )}
                    {/* Subtle Tongue Shading */}
                    {mouthOpenLevel > 0.5 && (
                      <div className="absolute bottom-0 w-2/3 h-[35%] bg-rose-900/80 rounded-t-full" />
                    )}
                    {/* Lip Contour Highlights */}
                    <div className="absolute inset-0 border-t border-rose-400/40 border-b border-rose-950/60 rounded-full" />
                  </div>
                ) : (
                  // Natural subtle resting smile line
                  <div className="absolute top-[42%] left-[46.5%] w-[7.2%] h-[1.2%] bg-rose-950/50 rounded-full opacity-60 pointer-events-none" />
                )}

                {/* ================================================== */}
                {/* 3. ARTICULATED HANDS & ARMS GESTURES               */}
                {/* Real layered arms moving naturally with speech     */}
                {/* ================================================== */}

                {/* RIGHT ARM (Primary Gestural Arm - Points, Explains, Welcomes) */}
                <motion.div
                  animate={{
                    rotate: rightArmPose.rotate,
                    x: rightArmPose.x,
                    y: rightArmPose.y,
                    scale: rightArmPose.scale,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 75,
                    damping: 18,
                    mass: 0.9,
                  }}
                  className="absolute bottom-[16%] right-[14%] w-[90px] sm:w-[110px] h-[140px] sm:h-[170px] pointer-events-none origin-bottom-right"
                  style={{
                    filter: 'drop-shadow(-4px 6px 12px rgba(0,0,0,0.6))',
                  }}
                >
                  <svg
                    viewBox="0 0 100 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    {/* Upper Arm / Forearm Sleeve (Deep Crimson / Dark Tech tone matching clothing) */}
                    <path
                      d="M65 140 C65 100 75 70 55 50 C45 40 35 48 30 65 C25 85 35 125 45 145 Z"
                      fill="url(#sleeveGradientRight)"
                    />
                    {/* Sleeve Ribbed Cuff */}
                    <path
                      d="M32 62 C38 52 50 46 56 50 C58 52 56 58 50 62 C42 66 34 66 32 62 Z"
                      fill="#881337"
                      stroke="#4c0519"
                      strokeWidth="1.5"
                    />

                    {/* Articulated Hand & Fingers */}
                    {rightArmPose.gestureType === 'present-left' ? (
                      // Pointing / Presenting open palm toward portfolio (left)
                      <g className="transition-transform duration-300">
                        {/* Palm */}
                        <path
                          d="M34 52 C30 42 22 36 16 32 C12 30 10 34 14 38 C18 42 24 46 26 56 Z"
                          fill="#d49774"
                        />
                        {/* Extended Index & Middle Fingers (Presentation gesture) */}
                        <path
                          d="M22 38 C14 30 4 22 2 20 C0 18 4 15 10 18 C18 24 24 32 26 38 Z"
                          fill="#c08461"
                        />
                        <path
                          d="M24 40 C18 34 10 28 8 26 C6 24 10 22 14 24 C20 28 26 36 28 42 Z"
                          fill="#d49774"
                        />
                        {/* Curled Ring & Pinky */}
                        <path
                          d="M28 46 C24 42 20 40 18 42 C16 44 20 48 24 50 Z"
                          fill="#ad7353"
                        />
                        {/* Thumb */}
                        <path
                          d="M34 48 C30 42 26 38 28 34 C30 32 34 36 36 42 Z"
                          fill="#d49774"
                        />
                      </g>
                    ) : rightArmPose.gestureType === 'chest-greet' ? (
                      // Hand near heart / upper chest in polite greeting
                      <g className="transition-transform duration-300">
                        {/* Palm & Fingers resting over chest */}
                        <path
                          d="M48 46 C40 38 32 36 28 38 C24 40 28 46 36 50 C42 54 48 54 50 48 Z"
                          fill="#d49774"
                        />
                        <path
                          d="M34 38 C26 32 20 30 18 32 C16 34 22 38 28 42 Z"
                          fill="#c08461"
                        />
                        <path
                          d="M38 42 C32 36 26 34 24 36 C22 38 28 42 34 46 Z"
                          fill="#d49774"
                        />
                        {/* Thumb resting comfortably */}
                        <path
                          d="M46 38 C44 32 40 28 38 30 C36 32 40 38 44 42 Z"
                          fill="#c08461"
                        />
                      </g>
                    ) : rightArmPose.gestureType === 'welcome' ? (
                      // Open welcoming palm
                      <g className="transition-transform duration-300">
                        <path
                          d="M42 48 C34 38 24 34 18 32 C14 30 14 36 20 42 C26 48 34 54 40 54 Z"
                          fill="#d49774"
                        />
                        {/* Open fingers */}
                        <path
                          d="M24 36 C16 26 10 22 8 24 C6 26 12 32 18 38 Z"
                          fill="#c08461"
                        />
                        <path
                          d="M28 38 C22 28 16 24 14 26 C12 28 18 34 24 40 Z"
                          fill="#d49774"
                        />
                        <path
                          d="M32 42 C26 34 22 30 20 32 C18 34 24 40 28 44 Z"
                          fill="#c08461"
                        />
                        {/* Natural thumb */}
                        <path
                          d="M38 44 C34 38 30 36 30 38 C30 40 34 46 38 48 Z"
                          fill="#d49774"
                        />
                      </g>
                    ) : (
                      // Conversational open hand / resting
                      <g className="transition-transform duration-300">
                        <path
                          d="M40 50 C32 42 26 40 22 42 C18 44 24 50 30 54 C36 58 42 56 42 50 Z"
                          fill="#d49774"
                        />
                        <path
                          d="M28 44 C22 36 16 34 14 36 C12 38 18 44 24 48 Z"
                          fill="#c08461"
                        />
                        <path
                          d="M32 48 C28 42 22 40 20 42 C18 44 24 48 28 52 Z"
                          fill="#d49774"
                        />
                      </g>
                    )}

                    <defs>
                      <linearGradient
                        id="sleeveGradientRight"
                        x1="30"
                        y1="50"
                        x2="70"
                        y2="140"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#9f1239" />
                        <stop offset="0.6" stopColor="#881337" />
                        <stop offset="1" stopColor="#4c0519" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                {/* LEFT ARM (Secondary Arm - Accents, Open Gestures) */}
                <motion.div
                  animate={{
                    rotate: leftArmPose.rotate,
                    x: leftArmPose.x,
                    y: leftArmPose.y,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 70,
                    damping: 20,
                    mass: 0.9,
                  }}
                  className="absolute bottom-[16%] left-[14%] w-[85px] sm:w-[105px] h-[135px] sm:h-[165px] pointer-events-none origin-bottom-left"
                  style={{
                    filter: 'drop-shadow(4px 6px 12px rgba(0,0,0,0.6))',
                  }}
                >
                  <svg
                    viewBox="0 0 100 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    {/* Left Forearm Sleeve */}
                    <path
                      d="M35 140 C35 100 25 70 45 50 C55 40 65 48 70 65 C75 85 65 125 55 145 Z"
                      fill="url(#sleeveGradientLeft)"
                    />
                    <path
                      d="M68 62 C62 52 50 46 44 50 C42 52 44 58 50 62 C58 66 66 66 68 62 Z"
                      fill="#881337"
                      stroke="#4c0519"
                      strokeWidth="1.5"
                    />

                    {/* Left Hand */}
                    {isSpeaking && currentPhase !== 'idle' ? (
                      <g className="transition-transform duration-300">
                        {/* Open conversational palm */}
                        <path
                          d="M58 48 C66 38 76 34 82 32 C86 30 86 36 80 42 C74 48 66 54 60 54 Z"
                          fill="#d49774"
                        />
                        <path
                          d="M76 36 C84 26 90 22 92 24 C94 26 88 32 82 38 Z"
                          fill="#c08461"
                        />
                        <path
                          d="M72 38 C78 28 84 24 86 26 C88 28 82 34 76 40 Z"
                          fill="#d49774"
                        />
                      </g>
                    ) : (
                      // Natural resting hand
                      <g className="transition-transform duration-300">
                        <path
                          d="M60 50 C68 42 74 40 78 42 C82 44 76 50 70 54 C64 58 58 56 58 50 Z"
                          fill="#d49774"
                        />
                        <path
                          d="M72 44 C78 36 84 34 86 36 C88 38 82 44 76 48 Z"
                          fill="#c08461"
                        />
                      </g>
                    )}

                    <defs>
                      <linearGradient
                        id="sleeveGradientLeft"
                        x1="70"
                        y1="50"
                        x2="30"
                        y2="140"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#9f1239" />
                        <stop offset="0.6" stopColor="#881337" />
                        <stop offset="1" stopColor="#4c0519" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                {/* Volumetric Rim Lighting Glow (Cyan & Indigo) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-cyan-500/10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-indigo-500/20 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cyan-400/15 to-transparent pointer-events-none" />
              </div>

              {/* Holographic Voice Transmission Rings (Active while speaking) */}
              {isSpeaking && (
                <div className="absolute -top-4 -right-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse">
                  <Radio className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span className="text-[10px] font-mono text-cyan-300 font-semibold tracking-wider">
                    LIVE PRESENTER
                  </span>
                </div>
              )}

              {/* Floating Holographic Identity Badge */}
              <div className="absolute top-8 left-4 px-3 py-1 rounded-full bg-slate-950/75 border border-white/10 backdrop-blur-md flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono text-slate-300">
                  AI Presenter <strong className="text-cyan-400">Waqas</strong>
                </span>
                {guideMode && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    GUIDE
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. FLOATING PRESENTER CONTROLS & SUBTITLE DISPLAY (Interactive)*/}
      {/* Situated safely at bottom-20 right-6, above back-to-top btn  */}
      {/* ============================================================ */}
      <div className="fixed bottom-20 right-6 z-40 flex flex-col items-end pointer-events-auto max-w-sm sm:max-w-md">
        {/* Dynamic Live Subtitles Toast (appears while speaking) */}
        <AnimatePresence>
          {isSpeaking && currentSubtitle && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="mb-3 px-4 py-3 rounded-2xl glass-panel border border-cyan-400/30 bg-slate-950/95 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl max-w-xs sm:max-w-sm text-left"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Waqas Speaking</span>
                </div>
                {/* 60s Progress Bar Indicator */}
                <span className="text-[9px] font-mono text-slate-400">
                  {Math.round(speechProgress * 100)}%
                </span>
              </div>
              {/* Progress track */}
              <div className="w-full h-1 bg-white/10 rounded-full mb-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full transition-all duration-200"
                  style={{ width: `${Math.max(speechProgress * 100, 2)}%` }}
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-100 leading-snug font-sans">
                "{currentSubtitle}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Presenter Controller Dock */}
        <div className="glass-panel rounded-2xl p-2.5 sm:p-3 border border-white/15 bg-slate-950/95 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col gap-2">
          {/* Header Row: Status and Toggle Collapse */}
          <div className="flex items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-cyan-400/40">
                <img
                  src={presenterAvatar}
                  alt="Waqas Avatar"
                  className="w-full h-full object-cover object-top"
                />
                {isSpeaking && (
                  <span className="absolute inset-0 bg-cyan-500/30 animate-pulse" />
                )}
              </div>
              <div>
                <span className="text-xs font-display font-bold text-white block leading-tight">
                  Waqas Presenter
                </span>
                <span className="text-[10px] font-mono text-cyan-400 block leading-none">
                  {isSpeaking
                    ? 'Speaking (60s)...'
                    : guideMode
                    ? 'Guide Mode ON'
                    : 'Ready to Present'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsControlExpanded(!isControlExpanded)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isControlExpanded ? 'Minimize Controls' : 'Expand Controls'}
              aria-label="Toggle presenter dock"
            >
              {isControlExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Action Buttons Panel */}
          {isControlExpanded && (
            <div className="flex items-center gap-2 pt-1 border-t border-white/5">
              {/* Primary Action Button: [ ▶ Talk ] / [ 🔊 Speaking... ] / [ ↻ Replay ] */}
              {!isSpeaking ? (
                <button
                  onClick={startIntro}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all cursor-pointer group active:scale-95 whitespace-nowrap"
                  title="Play 1-minute video-like presentation"
                >
                  {hasCompletedIntro ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>↻ Replay</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>▶ Talk</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={stopSpeech}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 hover:bg-rose-500/30 hover:border-rose-400 text-cyan-300 hover:text-rose-200 text-xs font-semibold transition-all cursor-pointer active:scale-95 whitespace-nowrap"
                  title="Click to stop speaking"
                >
                  {/* Animated soundwave bars */}
                  <div className="flex items-center gap-0.5 h-3.5 px-0.5">
                    <span className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-3.5 bg-cyan-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
                  </div>
                  <span>🔊 Speaking...</span>
                </button>
              )}

              {/* Guide Me Button: [ ✨ Guide Me ] */}
              <button
                onClick={toggleGuideMode}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                  guideMode
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
                title="When enabled, Waqas explains sections as you scroll or click"
              >
                <Sparkles
                  className={`w-3.5 h-3.5 ${
                    guideMode ? 'text-cyan-400 animate-spin' : 'text-slate-400'
                  }`}
                />
                <span>✨ Guide Me</span>
              </button>

              {/* Mute Button: [ 🔇 Mute ] */}
              <button
                onClick={toggleMute}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isMuted
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 hover:text-white'
                }`}
                title={isMuted ? 'Unmute Presenter' : 'Mute Presenter'}
                aria-label={isMuted ? 'Unmute Voice' : 'Mute Voice'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
