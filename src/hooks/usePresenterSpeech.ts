import { useState, useEffect, useRef, useCallback } from 'react';

export const INTRO_SCRIPT = `Hello, I'm Waqas, and welcome to my portfolio. I'm a Software Engineering student and developer interested in building modern web applications, mobile applications, AI-powered solutions, and full-stack digital products. Here you can explore my technical skills, including Python, JavaScript, TypeScript, Dart, PHP, SQL, React, Next.js, Node.js, Laravel, Flutter, Firebase, Supabase, and REST APIs. I also work with artificial intelligence, generative AI, automation, and modern application development. In the Projects section, you can explore projects such as FlowPilot AI, a hospital management system, a luxury salon website, Smart Zameen, Invitation Maker, FoodHub, a Gym Management System, and my J.A.R.V.I.S AI assistant. You can also explore the Services section to see the areas I work with, including web development, mobile applications, backend development, UI implementation, and AI integration. Feel free to explore the portfolio, check out my skills and projects, and use the Contact section if you would like to get in touch. Thanks for visiting my portfolio.`;

export const SECTION_SCRIPTS: Record<string, string> = {
  hero: "Hello, I'm Waqas, and welcome to my portfolio. Feel free to explore my latest software engineering projects.",
  about: "Here you can learn more about my background, education, and development journey.",
  skills: "Here you can explore my technical skills and technologies.",
  projects: "Here you can explore some of my development projects.",
  experience: "Here you can review my development journey, milestones, and hands-on experience.",
  services: "Here you can explore the services and development areas I work with.",
  process: "Here is an overview of my agile development and engineering workflow.",
  profiles: "Here you can connect with me on GitHub, LinkedIn, or reach out directly.",
  contact: "If you would like to connect, you can contact me here.",
};

export type PresenterPhase =
  | 'idle'
  | 'greeting'
  | 'explaining'
  | 'skills'
  | 'projects'
  | 'services'
  | 'welcoming';

export function usePresenterSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasCompletedIntro, setHasCompletedIntro] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');
  const [guideMode, setGuideMode] = useState(false);
  const [mouthOpenLevel, setMouthOpenLevel] = useState(0); // 0 (closed) to 1 (wide)
  const [mouthShape, setMouthShape] = useState<'closed' | 'open' | 'wide' | 'round' | 'smile'>('closed');
  const [currentPhase, setCurrentPhase] = useState<PresenterPhase>('idle');
  const [speechProgress, setSpeechProgress] = useState(0); // 0 to 1
  const [supported, setSupported] = useState(true);
  const [preferredVoice, setPreferredVoice] = useState<SpeechSynthesisVoice | null>(null);

  const lipSyncIntervalRef = useRef<number | null>(null);
  const timelineIntervalRef = useRef<number | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const startTimeRef = useRef<number>(0);
  const estimatedDurationRef = useRef<number>(60000); // 60 seconds
  const lastSpokenSectionRef = useRef<string>('');

  // Check speech synthesis support and load best natural English voice
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }

    const selectVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      const englishVoices = voices.filter((v) => v.lang.startsWith('en'));
      const naturalMaleVoice =
        englishVoices.find((v) =>
          /daniel|george|aaron|guy|male|david|rishi|en-GB|en-US|natural/i.test(v.name)
        ) ||
        englishVoices.find((v) => v.lang === 'en-US') ||
        englishVoices[0] ||
        voices[0];

      if (naturalMaleVoice) {
        setPreferredVoice(naturalMaleVoice);
      }
    };

    selectVoice();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = selectVoice;
    }
  }, []);

  // Natural lip-sync cadence generator while speaking
  const startLipSync = useCallback(() => {
    if (lipSyncIntervalRef.current) clearInterval(lipSyncIntervalRef.current);

    const shapes: Array<'open' | 'wide' | 'round' | 'smile'> = ['open', 'wide', 'round', 'smile'];

    lipSyncIntervalRef.current = window.setInterval(() => {
      const r = Math.random();
      if (r < 0.18) {
        setMouthOpenLevel(0);
        setMouthShape('closed');
      } else if (r < 0.52) {
        setMouthOpenLevel(0.35 + Math.random() * 0.25);
        setMouthShape(shapes[Math.floor(Math.random() * shapes.length)]);
      } else {
        setMouthOpenLevel(0.65 + Math.random() * 0.35);
        setMouthShape(shapes[Math.floor(Math.random() * 2)]);
      }
    }, 100);
  }, []);

  const stopLipSync = useCallback(() => {
    if (lipSyncIntervalRef.current) {
      clearInterval(lipSyncIntervalRef.current);
      lipSyncIntervalRef.current = null;
    }
    setMouthOpenLevel(0);
    setMouthShape('closed');
  }, []);

  // Stop any active speech
  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    stopLipSync();
    if (timelineIntervalRef.current) {
      clearInterval(timelineIntervalRef.current);
      timelineIntervalRef.current = null;
    }
    setIsSpeaking(false);
    setCurrentSubtitle('');
    setCurrentPhase('idle');
    setSpeechProgress(0);
  }, [stopLipSync]);

  // Main speech invocation
  const speakText = useCallback(
    (text: string, onEndCallback?: () => void, isOneMinuteIntro: boolean = false) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      stopSpeech();

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.rate = 0.98; // Natural, clear, deliberate professional pace
      utterance.pitch = 1.0;
      utterance.volume = isMuted ? 0 : 1;

      // Split subtitles into digestible sentences
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
      let sentenceIndex = 0;
      setCurrentSubtitle(sentences[0]?.trim() || text);

      const sentenceDuration = isOneMinuteIntro ? 5800 : 3800;
      const subtitleTimer = setInterval(() => {
        sentenceIndex++;
        if (sentenceIndex < sentences.length) {
          setCurrentSubtitle(sentences[sentenceIndex].trim());
        } else {
          clearInterval(subtitleTimer);
        }
      }, sentenceDuration);

      // Track timeline phases corresponding to narration
      const totalEstimatedMs = isOneMinuteIntro ? 60000 : sentences.length * 3800;
      estimatedDurationRef.current = totalEstimatedMs;
      startTimeRef.current = Date.now();

      if (timelineIntervalRef.current) clearInterval(timelineIntervalRef.current);
      timelineIntervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsed / totalEstimatedMs, 1);
        setSpeechProgress(progress);

        if (isOneMinuteIntro) {
          // 0-10s: Greeting & intro
          // 10-20s: Explaining digital products & development
          // 20-30s: Gesture toward Skills area
          // 30-42s: Gesture toward Projects area
          // 42-52s: Gesture toward Services area
          // 52-60s: Welcoming conclusion
          if (elapsed < 10000) {
            setCurrentPhase('greeting');
          } else if (elapsed < 20000) {
            setCurrentPhase('explaining');
          } else if (elapsed < 30000) {
            setCurrentPhase('skills');
          } else if (elapsed < 42000) {
            setCurrentPhase('projects');
          } else if (elapsed < 52000) {
            setCurrentPhase('services');
          } else {
            setCurrentPhase('welcoming');
          }
        } else {
          setCurrentPhase('explaining');
        }
      }, 100);

      utterance.onstart = () => {
        setIsSpeaking(true);
        startLipSync();
      };

      utterance.onend = () => {
        clearInterval(subtitleTimer);
        if (timelineIntervalRef.current) {
          clearInterval(timelineIntervalRef.current);
          timelineIntervalRef.current = null;
        }
        setIsSpeaking(false);
        stopLipSync();
        setCurrentSubtitle('');
        setCurrentPhase('idle');
        setSpeechProgress(1);
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        clearInterval(subtitleTimer);
        if (timelineIntervalRef.current) {
          clearInterval(timelineIntervalRef.current);
          timelineIntervalRef.current = null;
        }
        setIsSpeaking(false);
        stopLipSync();
        setCurrentSubtitle('');
        setCurrentPhase('idle');
      };

      window.speechSynthesis.speak(utterance);
    },
    [isMuted, preferredVoice, startLipSync, stopLipSync, stopSpeech]
  );

  // Start 1-minute intro narration
  const startIntro = useCallback(() => {
    speakText(
      INTRO_SCRIPT,
      () => {
        setHasCompletedIntro(true);
      },
      true
    );
  }, [speakText]);

  // Handle section speech in Guide Mode
  const handleSectionGuide = useCallback(
    (sectionId: string) => {
      if (!guideMode) return;
      if (lastSpokenSectionRef.current === sectionId) return;
      lastSpokenSectionRef.current = sectionId;

      const sectionText = SECTION_SCRIPTS[sectionId];
      if (sectionText) {
        speakText(sectionText, undefined, false);
      }
    },
    [guideMode, speakText]
  );

  // Toggle Mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (utteranceRef.current && isSpeaking) {
        utteranceRef.current.volume = next ? 0 : 1;
      }
      return next;
    });
  }, [isSpeaking]);

  // Toggle Guide Mode
  const toggleGuideMode = useCallback(() => {
    setGuideMode((prev) => {
      const next = !prev;
      if (!next) {
        stopSpeech();
      }
      return next;
    });
  }, [stopSpeech]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (lipSyncIntervalRef.current) {
        clearInterval(lipSyncIntervalRef.current);
      }
      if (timelineIntervalRef.current) {
        clearInterval(timelineIntervalRef.current);
      }
    };
  }, []);

  return {
    isSpeaking,
    isMuted,
    hasCompletedIntro,
    currentSubtitle,
    guideMode,
    mouthOpenLevel,
    mouthShape,
    currentPhase,
    speechProgress,
    supported,
    startIntro,
    stopSpeech,
    toggleMute,
    toggleGuideMode,
    handleSectionGuide,
    speakText,
  };
}
