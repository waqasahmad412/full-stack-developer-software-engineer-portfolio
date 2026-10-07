import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Printer,
  GraduationCap,
  Code2,
  Sparkles,
  CheckCircle2,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Edit3,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  FileCheck,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EditableProject {
  id: string;
  name: string;
  category: string;
  description: string;
  technologies: string;
}

interface ResumeData {
  name: string;
  title: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  summary: string;
  education: {
    degree: string;
    institution: string;
    status: string;
    description: string;
  };
  skills: {
    languages: string;
    frontend: string;
    mobile: string;
    backend: string;
    ai: string;
  };
  projects: EditableProject[];
}

const DEFAULT_RESUME_DATA: ResumeData = {
  name: PERSONAL_INFO.name,
  title: 'Full-Stack Developer · Flutter Mobile Developer · AI/ML Enthusiast',
  email: PERSONAL_INFO.socials.email,
  github: PERSONAL_INFO.socials.github,
  linkedin: 'https://www.linkedin.com/in/malik-waqas-a9a659403/',
  location: 'COMSATS University Islamabad, Sahiwal Campus',
  summary: PERSONAL_INFO.bio,
  education: {
    degree: PERSONAL_INFO.education.degree,
    institution: PERSONAL_INFO.education.institution,
    status: PERSONAL_INFO.education.status,
    description:
      'Academic focus on software lifecycle engineering, data structures, algorithms, relational databases, and collaborative software projects.',
  },
  skills: {
    languages: 'Python, JavaScript, TypeScript, Dart, PHP, SQL',
    frontend: 'React, Next.js, HTML5, CSS3, Tailwind CSS',
    mobile: 'Flutter, Dart, Firebase Mobile SDK, Kotlin Android',
    backend: 'Node.js, Express.js, Laravel, REST APIs, Firebase Firestore, MySQL',
    ai: 'Google Gemini API, Multimodal Prompting, Visual Workflow Automation Nodes, Python Automation Scripts, AI Assistant Concepts',
  },
  projects: PROJECTS_DATA.slice(0, 4).map((p) => ({
    id: p.id,
    name: p.name,
    category: `${p.subCategory} · ${p.status}`,
    description: p.description,
    technologies: p.technologies.join(', '),
  })),
};

const STORAGE_KEY = 'waqas_portfolio_resume_data_v1';

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (!parsed.linkedin || !parsed.linkedin.includes('malik-waqas')) {
            parsed.linkedin = 'https://www.linkedin.com/in/malik-waqas-a9a659403/';
          }
          return parsed;
        }
      } catch (e) {
        console.error('Failed to load saved resume data', e);
      }
    }
    return DEFAULT_RESUME_DATA;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ResumeData>(resumeData);
  const [notice, setNotice] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    setFormData(resumeData);
  }, [resumeData]);

  if (!isOpen) return null;

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 4500);
  };

  const handleSave = () => {
    setResumeData(formData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.error('Failed to save resume data', e);
    }
    setIsEditing(false);
    showNotice('Resume changes saved successfully!');
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all resume sections back to the original default?')) {
      setResumeData(DEFAULT_RESUME_DATA);
      setFormData(DEFAULT_RESUME_DATA);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error('Failed to reset resume storage', e);
      }
      setIsEditing(false);
      showNotice('Resume reset to original defaults.');
    }
  };

  const handleAddProject = () => {
    const newProj: EditableProject = {
      id: `proj_${Date.now()}`,
      name: 'New Featured Project',
      category: 'Full-Stack / Web · Completed',
      description: 'Describe the project goals, architecture, and impact here.',
      technologies: 'React, Node.js, TypeScript',
    };
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj],
    }));
  };

  const handleRemoveProject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const handleProjectChange = (
    id: string,
    field: keyof EditableProject,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  // DIRECT PDF DOWNLOAD GENERATOR (Saves directly to user's Downloads folder)
  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    const dataToExport = isEditing ? formData : resumeData;

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 14;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      // Color palette
      const primaryColor = [15, 23, 42]; // #0f172a
      const accentColor = [2, 132, 199]; // #0284c7 (cyan)
      const textColor = [51, 65, 85]; // #334155
      const mutedColor = [100, 116, 139]; // #64748b

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
      };

      // 1. Header (Name, Title, Contacts)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(dataToExport.name.toUpperCase(), margin, y);
      y += 7.5;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.text(dataToExport.title, margin, y);
      y += 5.5;

      // Contact Line 1: Email & Location
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
      doc.text(`${dataToExport.email}   |   ${dataToExport.location}`, margin, y);
      y += 4;

      // Contact Line 2: GitHub & LinkedIn (with clickable hyperlinks)
      const ghLabel = 'GitHub: ';
      const ghVal = dataToExport.github.replace('https://', '');
      doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
      doc.text(ghLabel, margin, y);
      const ghLabelW = doc.getTextWidth(ghLabel);

      doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.text(ghVal, margin + ghLabelW, y);
      const ghValW = doc.getTextWidth(ghVal);
      doc.link(margin + ghLabelW, y - 3, ghValW, 4, { url: dataToExport.github });

      const sep = '   |   ';
      doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
      doc.text(sep, margin + ghLabelW + ghValW, y);
      const sepW = doc.getTextWidth(sep);

      const liLabel = 'LinkedIn: ';
      const liVal = dataToExport.linkedin.replace('https://www.', '').replace('https://', '');
      const liStartX = margin + ghLabelW + ghValW + sepW;
      doc.text(liLabel, liStartX, y);
      const liLabelW = doc.getTextWidth(liLabel);

      doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.text(liVal, liStartX + liLabelW, y);
      const liValW = doc.getTextWidth(liVal);
      doc.link(liStartX + liLabelW, y - 3, liValW, 4, { url: dataToExport.linkedin });
      y += 4.5;

      // Horizontal Divider
      doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.setLineWidth(0.8);
      doc.line(margin, y, margin + contentWidth, y);
      y += 6;

      // Section Header Helper
      const renderSectionHeader = (title: string) => {
        checkPageBreak(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.text(title.toUpperCase(), margin, y);
        y += 2;
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.line(margin, y, margin + contentWidth, y);
        y += 4.5;
      };

      // 2. Summary
      renderSectionHeader('Professional Profile');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      const splitSummary = doc.splitTextToSize(dataToExport.summary, contentWidth);
      checkPageBreak(splitSummary.length * 4.2);
      doc.text(splitSummary, margin, y);
      y += splitSummary.length * 4.2 + 3;

      // 3. Education
      renderSectionHeader('Education');
      checkPageBreak(14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(dataToExport.education.degree, margin, y);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.text(dataToExport.education.status, margin + contentWidth, y, { align: 'right' });
      y += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
      doc.text(dataToExport.education.institution, margin, y);
      y += 4;

      if (dataToExport.education.description) {
        const splitEdu = doc.splitTextToSize(dataToExport.education.description, contentWidth);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(splitEdu, margin, y);
        y += splitEdu.length * 3.8 + 3;
      }

      // 4. Technical Competencies
      renderSectionHeader('Technical Competencies');
      const skillsList = [
        { label: 'Languages', val: dataToExport.skills.languages },
        { label: 'Frontend', val: dataToExport.skills.frontend },
        { label: 'Mobile', val: dataToExport.skills.mobile },
        { label: 'Backend & DB', val: dataToExport.skills.backend },
        { label: 'AI & Automation', val: dataToExport.skills.ai },
      ];

      skillsList.forEach((sk) => {
        checkPageBreak(8);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
        const labelWidth = 32;
        doc.text(`${sk.label}:`, margin, y);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        const splitSkill = doc.splitTextToSize(sk.val, contentWidth - labelWidth);
        doc.text(splitSkill, margin + labelWidth, y);
        y += Math.max(splitSkill.length * 3.8, 4.2);
      });
      y += 2;

      // 5. Featured Projects
      renderSectionHeader('Featured Software Projects');
      dataToExport.projects.forEach((proj) => {
        checkPageBreak(18);
        // Project Title & Category
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(proj.name, margin, y);

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
        doc.text(proj.category, margin + contentWidth, y, { align: 'right' });
        y += 4;

        // Project Description
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        const splitDesc = doc.splitTextToSize(proj.description, contentWidth);
        doc.text(splitDesc, margin, y);
        y += splitDesc.length * 3.8 + 1;

        // Tech stack
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.text(`Technologies: ${proj.technologies}`, margin, y);
        y += 5.5;
      });

      // DIRECT DOWNLOAD: Triggers instant file download into the user's Downloads folder!
      const fileName = `${dataToExport.name.replace(/\s+/g, '_')}_Software_Engineer_CV.pdf`;
      doc.save(fileName);

      showNotice(`🎉 ${fileName} downloaded directly to your Downloads folder!`);
    } catch (err) {
      console.error('PDF Generation Error', err);
      showNotice('An issue occurred while generating the PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Optional Printer Dialog handler
  const handlePrintDialog = () => {
    window.print();
    showNotice('Printer dialog opened!');
  };

  // Plain Text CV Download
  const handleDownloadText = () => {
    const dataToExport = isEditing ? formData : resumeData;

    const projectLines = dataToExport.projects
      .map(
        (p, i) =>
          `${i + 1}. ${p.name} (${p.category})\n   - Description: ${p.description}\n   - Technologies: ${p.technologies}`
      )
      .join('\n\n');

    const cvContent = `=====================================================
${dataToExport.name.toUpperCase()} — RESUME & CURRICULUM VITAE
=====================================================
Title: ${dataToExport.title}
Email: ${dataToExport.email}
GitHub: ${dataToExport.github}
LinkedIn: ${dataToExport.linkedin}
Location: ${dataToExport.location}

-----------------------------------------------------
PROFESSIONAL SUMMARY:
-----------------------------------------------------
${dataToExport.summary}

-----------------------------------------------------
EDUCATION:
-----------------------------------------------------
- Degree: ${dataToExport.education.degree}
- Institution: ${dataToExport.education.institution}
- Status: ${dataToExport.education.status}
- Details: ${dataToExport.education.description}

-----------------------------------------------------
TECHNICAL COMPETENCIES:
-----------------------------------------------------
- Languages: ${dataToExport.skills.languages}
- Frontend: ${dataToExport.skills.frontend}
- Mobile: ${dataToExport.skills.mobile}
- Backend & Databases: ${dataToExport.skills.backend}
- AI & Automation: ${dataToExport.skills.ai}

-----------------------------------------------------
FEATURED SOFTWARE PROJECTS:
-----------------------------------------------------
${projectLines}

=====================================================
Generated from Waqas Developer Portfolio.
`;

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dataToExport.name.replace(/\s+/g, '_')}_Software_Engineer_CV.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showNotice('Text CV downloaded directly to your Downloads folder.');
  };

  const current = isEditing ? formData : resumeData;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-slate-900 dark:bg-slate-900 light:bg-white text-slate-100 dark:text-slate-100 light:text-slate-900 rounded-2xl border border-white/10 dark:border-white/10 light:border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col z-10"
        >
          {/* Header controls bar */}
          <div className="print-hide flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-b border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-950/50 dark:bg-slate-950/50 light:bg-slate-50">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm sm:text-base">
                Curriculum Vitae
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-cyan-400 font-mono font-medium">
                {current.name}
              </span>
              {isEditing && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 animate-pulse">
                  EDITING MODE
                </span>
              )}
            </div>

            {/* Actions Toolbar */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Edit / Save toggle */}
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 cursor-pointer shadow-sm transition-all active:scale-95"
                  title="Edit resume text and sections"
                >
                  <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Edit Resume</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-md transition-all active:scale-95"
                    title="Save resume changes"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(resumeData);
                      setIsEditing(false);
                    }}
                    className="px-2.5 py-1.5 text-xs rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white cursor-pointer transition-colors"
                    title="Cancel editing"
                  >
                    Cancel
                  </button>
                </>
              )}

              {/* Reset button */}
              <button
                type="button"
                onClick={handleResetToDefault}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border border-white/10 dark:border-white/10 light:border-slate-200 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-slate-100 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
                title="Reset to default original data"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="text-[11px]">Reset</span>
              </button>

              {/* PRIMARY ACTION: DIRECT PDF DOWNLOAD (Direct to user's Downloads folder) */}
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white cursor-pointer shadow-lg shadow-cyan-950/40 transition-all active:scale-95 border border-cyan-400/40 disabled:opacity-50"
                title="Directly download .PDF file to your Downloads folder"
              >
                {isGeneratingPdf ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Print / PDF</span>
                  </>
                )}
              </button>

              {/* Print Dialog Button */}
              <button
                type="button"
                onClick={handlePrintDialog}
                className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-white/10 dark:border-white/10 light:border-slate-200 hover:bg-white/5 text-slate-300 hover:text-white cursor-pointer transition-colors"
                title="Open browser print dialog"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print</span>
              </button>

              {/* Text CV */}
              <button
                type="button"
                onClick={handleDownloadText}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white cursor-pointer transition-colors"
                title="Download plain text CV"
              >
                <FileCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Text</span>
              </button>

              {/* Close Modal */}
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg border border-white/10 dark:border-white/10 light:border-slate-200 flex items-center justify-center text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-slate-100 transition-colors cursor-pointer ml-0.5"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feedback Notice banner */}
          {notice && (
            <div className="print-hide px-6 py-2.5 bg-emerald-500/15 border-b border-emerald-500/25 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span className="font-medium">{notice}</span>
            </div>
          )}

          {/* CV Document Content Container (Printable Area) */}
          <div
            id="resume-printable-area"
            className="p-5 sm:p-8 overflow-y-auto space-y-6 text-sm leading-relaxed"
          >
            {/* Top Identity Block */}
            <div className="border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-6 print-avoid-break">
              {!isEditing ? (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
                      {current.name}
                    </h2>
                    <p className="text-cyan-400 font-medium text-sm mt-0.5">
                      {current.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        {current.email}
                      </span>
                      <a
                        href={current.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5 text-slate-300" />
                        <span>{current.github.replace('https://', '')}</span>
                      </a>
                      <a
                        href={current.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                        title="Open LinkedIn Profile"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{current.linkedin.replace('https://www.', '').replace('https://', '')}</span>
                      </a>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                        {current.location}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Editable Identity Fields */
                <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-cyan-500/20">
                  <div className="flex items-center justify-between text-xs text-cyan-400 font-mono font-semibold">
                    <span>EDIT HEADER & CONTACT INFO</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        placeholder="Your Full Name"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Full-Stack Developer · Flutter Engineer"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        Location / Institution Campus
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Islamabad, Pakistan"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        GitHub Profile URL
                      </label>
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) =>
                          setFormData({ ...formData, github: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) =>
                          setFormData({ ...formData, linkedin: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        placeholder="https://www.linkedin.com/in/malik-waqas-a9a659403/"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Summary */}
            <div className="print-avoid-break">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600 mb-2">
                Professional Profile Summary
              </h3>
              {!isEditing ? (
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-700">
                  {current.summary}
                </p>
              ) : (
                <div className="space-y-1">
                  <textarea
                    rows={4}
                    value={formData.summary}
                    onChange={(e) =>
                      setFormData({ ...formData, summary: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-slate-950/80 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-cyan-400 leading-relaxed font-sans"
                    placeholder="Write your professional bio and technical summary..."
                  />
                  <p className="text-[10px] text-slate-400 text-right">
                    {formData.summary.length} characters
                  </p>
                </div>
              )}
            </div>

            {/* Education */}
            <div className="print-avoid-break">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600 mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>Education</span>
              </h3>
              {!isEditing ? (
                <div className="p-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/5 dark:border-white/5 light:border-slate-200 print-border-box">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-semibold text-white dark:text-white light:text-slate-900">
                      {current.education.degree}
                    </h4>
                    <span className="text-xs text-cyan-400 font-mono font-medium">
                      {current.education.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1">
                    {current.education.institution}
                  </p>
                  <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-2">
                    {current.education.description}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        Degree Title
                      </label>
                      <input
                        type="text"
                        value={formData.education.degree}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            education: {
                              ...formData.education,
                              degree: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. BS Software Engineering"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        Status / Years
                      </label>
                      <input
                        type="text"
                        value={formData.education.status}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            education: {
                              ...formData.education,
                              status: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        placeholder="e.g. Enrolled · 2022 - Present"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">
                      University / Institution
                    </label>
                    <input
                      type="text"
                      value={formData.education.institution}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          education: {
                            ...formData.education,
                            institution: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                      placeholder="e.g. COMSATS University Islamabad"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">
                      Academic Focus & Achievements
                    </label>
                    <textarea
                      rows={2}
                      value={formData.education.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          education: {
                            ...formData.education,
                            description: e.target.value,
                          },
                        })
                      }
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                      placeholder="Details about coursework, engineering focus, projects..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Technical Skills Summary */}
            <div className="print-avoid-break">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600 mb-2 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>Technical Competencies</span>
              </h3>
              {!isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/5 dark:border-white/5 light:border-slate-200 print-border-box">
                    <span className="font-semibold text-cyan-400">
                      Programming Languages:
                    </span>
                    <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1">
                      {current.skills.languages}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/5 dark:border-white/5 light:border-slate-200 print-border-box">
                    <span className="font-semibold text-cyan-400">
                      Frontend Development:
                    </span>
                    <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1">
                      {current.skills.frontend}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/5 dark:border-white/5 light:border-slate-200 print-border-box">
                    <span className="font-semibold text-indigo-400">
                      Mobile Engineering:
                    </span>
                    <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1">
                      {current.skills.mobile}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/5 dark:border-white/5 light:border-slate-200 print-border-box">
                    <span className="font-semibold text-indigo-400">
                      Backend & Databases:
                    </span>
                    <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1">
                      {current.skills.backend}
                    </p>
                  </div>
                  <div className="p-3 sm:col-span-2 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/5 dark:border-white/5 light:border-slate-200 print-border-box">
                    <span className="font-semibold text-purple-400">
                      AI & Automation:
                    </span>
                    <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1">
                      {current.skills.ai}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-3">
                  <div>
                    <label className="text-[11px] font-mono text-cyan-400 block mb-1">
                      Programming Languages
                    </label>
                    <input
                      type="text"
                      value={formData.skills.languages}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          skills: { ...formData.skills, languages: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-cyan-400 block mb-1">
                      Frontend Frameworks & Technologies
                    </label>
                    <input
                      type="text"
                      value={formData.skills.frontend}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          skills: { ...formData.skills, frontend: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-indigo-400 block mb-1">
                      Mobile Engineering Technologies
                    </label>
                    <input
                      type="text"
                      value={formData.skills.mobile}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          skills: { ...formData.skills, mobile: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-indigo-400 block mb-1">
                      Backend, APIs & Databases
                    </label>
                    <input
                      type="text"
                      value={formData.skills.backend}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          skills: { ...formData.skills, backend: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-purple-400 block mb-1">
                      AI, Machine Learning & Automation
                    </label>
                    <input
                      type="text"
                      value={formData.skills.ai}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          skills: { ...formData.skills, ai: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Key Featured Projects */}
            <div className="print-avoid-break">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Featured Software Projects</span>
                </h3>
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleAddProject}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono border border-cyan-400/30 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="space-y-3">
                  {current.projects.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/5 dark:border-white/5 light:border-slate-200 print-border-box print-avoid-break"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-semibold text-white dark:text-white light:text-slate-900 text-sm">
                          {p.name}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {p.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {p.technologies
                          .split(',')
                          .map((t) => t.trim())
                          .filter(Boolean)
                          .map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2 py-0.5 rounded bg-white/5 dark:bg-white/5 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 print-tag"
                            >
                              {t}
                            </span>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Editable Projects List */
                <div className="space-y-3">
                  {formData.projects.map((p, index) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl bg-slate-950/60 border border-white/10 space-y-2.5 relative group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono text-cyan-400">
                          Project #{index + 1}
                        </span>
                        {formData.projects.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveProject(p.id)}
                            className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 cursor-pointer transition-colors"
                            title="Remove project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-0.5">
                            Project Name
                          </label>
                          <input
                            type="text"
                            value={p.name}
                            onChange={(e) =>
                              handleProjectChange(p.id, 'name', e.target.value)
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                            placeholder="Project Name"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-0.5">
                            Category / Status
                          </label>
                          <input
                            type="text"
                            value={p.category}
                            onChange={(e) =>
                              handleProjectChange(p.id, 'category', e.target.value)
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                            placeholder="e.g. AI Automation · Live"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-0.5">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={p.description}
                          onChange={(e) =>
                            handleProjectChange(p.id, 'description', e.target.value)
                          }
                          className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                          placeholder="Short summary of the project..."
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-0.5">
                          Technologies (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={p.technologies}
                          onChange={(e) =>
                            handleProjectChange(p.id, 'technologies', e.target.value)
                          }
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                          placeholder="React, TypeScript, Firebase"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions Footer in Edit Mode */}
            {isEditing && (
              <div className="print-hide pt-4 border-t border-white/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(resumeData);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 rounded-xl border border-white/15 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-emerald-950/40 transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Resume</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
