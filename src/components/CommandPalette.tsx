import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Home,
  User,
  FolderGit2,
  Code2,
  Mail,
  FileDown,
  Copy,
  Check,
  Github,
  ExternalLink,
  Terminal,
  Palette,
  X,
} from 'lucide-react';

interface PaletteItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Navigation' | 'Quick Actions' | 'Appearance / Theme';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
  keywords?: string[];
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Apply theme helper
  const applyTheme = (accent: string, hover: string) => {
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--accent-hover', hover);
  };

  // Close helper
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  // Define commands
  const items: PaletteItem[] = useMemo(
    () => [
      // Navigation
      {
        id: 'nav-home',
        title: 'Home / Hero',
        subtitle: 'Back to top overview',
        category: 'Navigation',
        icon: Home,
        action: () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          close();
        },
        keywords: ['intro', 'start', 'top', 'hero'],
      },
      {
        id: 'nav-about',
        title: 'About Me',
        subtitle: 'Philosophy, background & focus',
        category: 'Navigation',
        icon: User,
        action: () => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          close();
        },
        keywords: ['bio', 'experience', 'whoami'],
      },
      {
        id: 'nav-projects',
        title: 'Featured Projects',
        subtitle: 'Selected applications and case studies',
        category: 'Navigation',
        icon: FolderGit2,
        action: () => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          close();
        },
        keywords: ['work', 'portfolio', 'apps', 'nexora', 'aether', 'vertex'],
      },
      {
        id: 'nav-skills',
        title: 'Technical Skills',
        subtitle: 'Languages, frameworks & architectures',
        category: 'Navigation',
        icon: Code2,
        action: () => {
          document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
          close();
        },
        keywords: ['stack', 'frontend', 'backend', 'tools', 'languages', 'react'],
      },
      {
        id: 'nav-contact',
        title: 'Contact & Hire',
        subtitle: 'Send a message or collaborate',
        category: 'Navigation',
        icon: Mail,
        action: () => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          close();
        },
        keywords: ['email', 'reach', 'message', 'form', 'hire'],
      },

      // Quick Actions
      {
        id: 'action-resume',
        title: 'Download Resume (PDF)',
        subtitle: 'Official 1-page software engineer resume',
        category: 'Quick Actions',
        icon: FileDown,
        action: () => {
          window.open('/Dhruv_Kumar_Resume.pdf', '_blank');
          close();
        },
        keywords: ['cv', 'pdf', 'resume', 'hire', 'credentials'],
      },
      {
        id: 'action-copy-email',
        title: copied ? 'Email Copied!' : 'Copy Email Address',
        subtitle: 'dhruva9837@gmail.com',
        category: 'Quick Actions',
        icon: copied ? Check : Copy,
        action: () => {
          navigator.clipboard.writeText('dhruva9837@gmail.com');
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
            close();
          }, 800);
        },
        keywords: ['email', 'copy', 'contact', 'gmail'],
      },
      {
        id: 'action-github',
        title: 'Open GitHub Profile',
        subtitle: 'github.com/Dhruva9837',
        category: 'Quick Actions',
        icon: Github,
        action: () => {
          window.open('https://github.com/Dhruva9837', '_blank');
          close();
        },
        keywords: ['github', 'code', 'git', 'repos'],
      },
      {
        id: 'action-linkedin',
        title: 'Open LinkedIn Profile',
        subtitle: 'Connect professionally',
        category: 'Quick Actions',
        icon: ExternalLink,
        action: () => {
          window.open('https://linkedin.com/in/dhruva9837', '_blank');
          close();
        },
        keywords: ['linkedin', 'social', 'network', 'career'],
      },
      {
        id: 'action-terminal',
        title: 'Open Developer CLI Terminal',
        subtitle: 'Interactive retro-dark shell widget',
        category: 'Quick Actions',
        icon: Terminal,
        action: () => {
          close();
          // Dispatch a click or event to open terminal
          const terminalBtn = document.querySelector('button[aria-label="Open Developer CLI"]') as HTMLButtonElement | null;
          if (terminalBtn) terminalBtn.click();
        },
        keywords: ['terminal', 'cli', 'bash', 'shell', 'console'],
      },

      // Appearance / Theme
      {
        id: 'theme-emerald',
        title: 'Theme: Cyber Emerald',
        subtitle: 'High-contrast neon green accent',
        category: 'Appearance / Theme',
        icon: Palette,
        action: () => {
          applyTheme('#10B981', '#059669');
          close();
        },
        keywords: ['green', 'emerald', 'cyber', 'color'],
      },
      {
        id: 'theme-cyan',
        title: 'Theme: Electric Cyan',
        subtitle: 'Futuristic aqua blue accent',
        category: 'Appearance / Theme',
        icon: Palette,
        action: () => {
          applyTheme('#06B6D4', '#0891B2');
          close();
        },
        keywords: ['cyan', 'blue', 'electric', 'aqua'],
      },
      {
        id: 'theme-amber',
        title: 'Theme: Solar Amber',
        subtitle: 'Warm goldenrod amber accent',
        category: 'Appearance / Theme',
        icon: Palette,
        action: () => {
          applyTheme('#F59E0B', '#D97706');
          close();
        },
        keywords: ['amber', 'orange', 'gold', 'yellow'],
      },
      {
        id: 'theme-rose',
        title: 'Theme: Neon Rose',
        subtitle: 'Vibrant punchy crimson-rose accent',
        category: 'Appearance / Theme',
        icon: Palette,
        action: () => {
          applyTheme('#F43F5E', '#E11D48');
          close();
        },
        keywords: ['rose', 'red', 'pink', 'neon'],
      },
      {
        id: 'theme-violet',
        title: 'Theme: Deep Violet',
        subtitle: 'Rich modern purple accent',
        category: 'Appearance / Theme',
        icon: Palette,
        action: () => {
          applyTheme('#8B5CF6', '#7C3AED');
          close();
        },
        keywords: ['violet', 'purple', 'indigo'],
      },
      {
        id: 'theme-reset',
        title: 'Theme: Default Indigo',
        subtitle: 'Original minimalist aesthetic palette',
        category: 'Appearance / Theme',
        icon: Palette,
        action: () => {
          applyTheme('#6366F1', '#8B5CF6');
          close();
        },
        keywords: ['reset', 'default', 'indigo'],
      },
    ],
    [close, copied]
  );

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  }, [items, query]);

  // Reset selectedIndex when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  // Listen for Ctrl+K / Cmd+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen, close]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector('[data-selected="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Handle arrow keys and Enter inside input
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          className="fixed inset-0 z-[99999] flex items-start justify-center pt-20 sm:pt-28 px-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            aria-hidden="true"
            className="fixed inset-0 bg-[#07070A]/80 backdrop-blur-xl transition-all"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl bg-[#0E0E14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-foreground z-10 flex flex-col font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
              <Search size={18} className="text-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted/60 text-sm font-light caret-accent"
                aria-label="Search commands"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear query"
                  className="p-1 rounded text-muted hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
              <span className="hidden sm:inline-block text-[10px] font-mono text-muted/60 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="max-h-[380px] overflow-y-auto p-2 space-y-1 custom-scrollbar text-sm"
            >
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-muted">
                  <p className="text-sm">No commands found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-muted/60 mt-1 font-mono">Try searching for &lsquo;projects&rsquo;, &lsquo;resume&rsquo;, or &lsquo;theme&rsquo;</p>
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      data-selected={isSelected}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? 'bg-accent/15 border border-accent/30 text-white'
                          : 'hover:bg-white/[0.04] text-foreground/80 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg transition-colors shrink-0 ${
                            isSelected
                              ? 'bg-accent text-white shadow-md shadow-accent/30'
                              : 'bg-white/5 text-muted group-hover:text-accent'
                          }`}
                        >
                          <Icon size={16} />
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-xs sm:text-sm tracking-tight truncate">
                            {item.title}
                          </p>
                          {item.subtitle && (
                            <p className="text-[11px] text-muted/70 truncate font-light">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-muted/50 hidden sm:inline-block">
                          {item.category}
                        </span>
                        {isSelected && (
                          <ArrowRight size={13} className="text-accent animate-pulse" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer with Keyboard Hints */}
            <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-muted/70 select-none">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">↵</kbd>
                  <span>select</span>
                </span>
              </div>
              <span className="text-accent/80 font-medium">Spotlight Search</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
