import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  Clock,
  Inbox,
  X,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactProps {
  initialSubject?: string;
}

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export function Contact({ initialSubject }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(initialSubject || '');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [storedMessages, setStoredMessages] = useState<StoredMessage[]>([]);

  useEffect(() => {
    if (initialSubject) {
      setSubject(initialSubject);
    }
  }, [initialSubject]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('waqas_contact_messages');
      if (stored) {
        setStoredMessages(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name.';
    if (!email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }
    if (!subject.trim()) errs.subject = 'Please specify a subject.';
    if (!message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (message.trim().length < 15) {
      errs.message = 'Message should be at least 15 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Direct email delivery to waqasahmad08766@gmail.com via FormSubmit AJAX service
      await fetch('https://formsubmit.co/ajax/waqasahmad08766@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          _subject: `New Portfolio Message from ${name.trim()}: ${subject.trim()}`,
        }),
      });
    } catch (err) {
      console.warn('FormSubmit endpoint response:', err);
    }

    const newMessage: StoredMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleString(),
    };

    const updated = [newMessage, ...storedMessages];
    setStoredMessages(updated);
    try {
      localStorage.setItem('waqas_contact_messages', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save to local storage', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setErrors({});
  };

  const handleOpenMailto = () => {
    const mailtoUrl = `mailto:${PERSONAL_INFO.socials.email}?subject=${encodeURIComponent(
      subject || 'Project Inquiry'
    )}&body=${encodeURIComponent(
      `Hello Waqas,\n\nMy Name: ${name || '[Your Name]'}\nEmail: ${email || '[Your Email]'}\n\nMessage:\n${message || '[Your message]'}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-600/10 via-indigo-600/10 to-purple-600/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Editorial */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>08. Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white dark:text-white light:text-slate-950">
                Let's Build Something Great Together.
              </h2>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
                Have a project idea or want to discuss a development opportunity? Feel free to get in touch. I am always open to exploring new software engineering challenges, mobile development, or AI automation ideas.
              </p>

              {/* Direct channels */}
              <div className="mt-8 space-y-4 text-xs overflow-x-hidden">
                <motion.a
                  href={`mailto:${PERSONAL_INFO.socials.email}`}
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="flex items-center gap-3 p-3.5 rounded-xl glass-panel border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-cyan-400 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-cyan-400 to-transparent" />
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Primary Email</span>
                    <span className="font-semibold text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                      {PERSONAL_INFO.socials.email}
                    </span>
                  </div>
                </motion.a>

                <motion.a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.12 }}
                  className="flex items-center gap-3 p-3.5 rounded-xl glass-panel border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-indigo-400 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-indigo-400 to-transparent" />
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">LinkedIn Profile</span>
                    <span className="font-semibold text-white dark:text-white light:text-slate-900 group-hover:text-indigo-400 transition-colors">
                      Connect on LinkedIn
                    </span>
                  </div>
                </motion.a>

                <motion.a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.19 }}
                  className="flex items-center gap-3 p-3.5 rounded-xl glass-panel border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-slate-400 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-cyan-400 to-transparent" />
                  <div className="p-2 rounded-lg bg-white/5 text-slate-300 group-hover:scale-110 transition-transform">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">GitHub Profile</span>
                    <span className="font-semibold text-white dark:text-white light:text-slate-900 group-hover:text-slate-200 transition-colors">
                      Explore Repositories
                    </span>
                  </div>
                </motion.a>
              </div>

              {/* Message log button (lets user see saved submitted messages) */}
              {storedMessages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="mt-6 pt-4 border-t border-white/10"
                >
                  <button
                    onClick={() => setShowInbox(!showInbox)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
                  >
                    <Inbox className="w-3.5 h-3.5" />
                    <span>View Inquiries Sent This Session ({storedMessages.length})</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 dark:border-white/10 light:border-slate-200 relative shadow-2xl">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white dark:text-white light:text-slate-900">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-md leading-relaxed">
                    Thank you for reaching out. Your message has been logged and sent to Waqas at{' '}
                    <strong className="text-cyan-400 font-mono">{PERSONAL_INFO.socials.email}</strong>.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                    <motion.button
                      initial={{ opacity: 0, x: -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => setIsSuccess(false)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer shadow-md transition-colors"
                    >
                      Send Another Message
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={handleOpenMailto}
                      className="px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:text-white text-xs font-medium cursor-pointer transition-colors"
                    >
                      Open In Email Client
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5"
                      >
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        placeholder="e.g. Alex Henderson"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border text-xs text-white dark:text-white light:text-slate-900 focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-rose-500/80 focus:border-rose-500'
                            : 'border-white/10 dark:border-white/10 light:border-slate-300 focus:border-cyan-400'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="emailAddress"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5"
                      >
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="emailAddress"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        placeholder="e.g. alex@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border text-xs text-white dark:text-white light:text-slate-900 focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-rose-500/80 focus:border-rose-500'
                            : 'border-white/10 dark:border-white/10 light:border-slate-300 focus:border-cyan-400'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5"
                    >
                      Subject <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                      }}
                      placeholder="e.g. Flutter mobile app architecture discussion"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border text-xs text-white dark:text-white light:text-slate-900 focus:outline-none transition-colors ${
                        errors.subject
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-white/10 dark:border-white/10 light:border-slate-300 focus:border-cyan-400'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5"
                    >
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                      }}
                      placeholder="Provide details about your project, timeline, and goals..."
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border text-xs text-white dark:text-white light:text-slate-900 focus:outline-none transition-colors resize-none ${
                        errors.message
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-white/10 dark:border-white/10 light:border-slate-300 focus:border-cyan-400'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Form Submission Button & Fallback */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 overflow-hidden">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      initial={{ opacity: 0, x: -35 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.45, delay: 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Dispatching Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      type="button"
                      initial={{ opacity: 0, x: 35 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.45, delay: 0.1 }}
                      onClick={handleOpenMailto}
                      className="text-xs text-slate-400 hover:text-cyan-400 transition-colors text-center cursor-pointer"
                    >
                      Or open draft in default email app
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Message Log Modal / Drawer */}
        <AnimatePresence>
          {showInbox && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-8 glass-panel p-6 rounded-2xl border border-cyan-500/30"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-semibold text-white">
                    Logged Contact Messages ({storedMessages.length})
                  </h4>
                </div>
                <button
                  onClick={() => setShowInbox(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {storedMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1"
                  >
                    <div className="flex justify-between items-center text-slate-400 font-mono text-[10px]">
                      <span>From: {msg.name} ({msg.email})</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <div className="font-semibold text-white">{msg.subject}</div>
                    <p className="text-slate-300 text-xs">{msg.message}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
