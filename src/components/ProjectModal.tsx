import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles, Layers, Calendar, User } from 'lucide-react';

export interface ProjectData {
  id: number;
  title: string;
  category: string;
  categoryKey: 'fullstack' | 'ai' | 'data' | 'creative';
  description: string;
  longDescription: string;
  highlights: string[];
  tags: string[];
  link: string;
  githubUrl?: string;
  webpImage: string;
  fallbackImage: string;
  alt: string;
  role?: string;
  timeline?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Lock body scroll when modal is open and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
        >
          {/* Backdrop with rich blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-[#07070A]/80 backdrop-blur-xl transition-all"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-[#0E0E14] border border-white/10 rounded-2xl shadow-2xl overflow-y-auto overflow-x-hidden text-foreground z-10 custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              data-cursor="hover"
              aria-label="Close project details"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-all border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X size={18} />
            </button>

            {/* Media Banner */}
            <div className="relative aspect-[16/9] w-full bg-muted/10 overflow-hidden border-b border-white/10">
              <picture>
                <source srcSet={project.webpImage} type="image/webp" />
                <img
                  src={project.fallbackImage}
                  alt={project.alt}
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E14] via-[#0E0E14]/40 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-accent/20 text-accent border border-accent/30 mb-2">
                  {project.category}
                </span>
                <h3
                  id="modal-project-title"
                  className="font-display font-medium text-2xl sm:text-4xl tracking-tight text-white"
                >
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Meta Info Bar (Role, Timeline) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs">
                <div>
                  <span className="flex items-center gap-1.5 text-muted mb-1 text-[11px] tracking-wider uppercase">
                    <User size={13} className="text-accent" /> Role
                  </span>
                  <p className="text-foreground/90 font-sans font-medium">{project.role || 'Full Stack Engineer'}</p>
                </div>
                <div>
                  <span className="flex items-center gap-1.5 text-muted mb-1 text-[11px] tracking-wider uppercase">
                    <Calendar size={13} className="text-accent" /> Timeline
                  </span>
                  <p className="text-foreground/90 font-sans font-medium">{project.timeline || '2024'}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="flex items-center gap-1.5 text-muted mb-1 text-[11px] tracking-wider uppercase">
                    <Layers size={13} className="text-accent" /> Domain
                  </span>
                  <p className="text-foreground/90 font-sans font-medium">{project.category}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-3">
                  Overview & Architecture
                </h4>
                <p className="text-muted/95 text-sm sm:text-base leading-relaxed font-light">
                  {project.longDescription}
                </p>
              </div>

              {/* Key Technical Innovations / Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-3 flex items-center gap-2">
                    <Sparkles size={14} /> Key Highlights & Innovations
                  </h4>
                  <ul className="space-y-2.5">
                    {project.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-sm text-foreground/80 font-light"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 text-foreground/90 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-3 w-full sm:w-auto">
                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-all shadow-lg shadow-accent/20 group"
                    >
                      <span>Visit Live Application</span>
                      <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  <a
                    href={project.githubUrl || 'https://github.com/Dhruva9837'}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-foreground/90 border border-white/10 text-sm font-medium transition-all"
                  >
                    <Github size={16} />
                    <span>Source Code</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="hidden sm:inline-block text-xs font-mono text-muted hover:text-white transition-colors"
                >
                  Press [ESC] to close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
