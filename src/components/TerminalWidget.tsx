import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, Cpu, Activity, CornerDownLeft } from 'lucide-react';

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

const INITIAL_WELCOME = (
  <div className="space-y-1 text-xs">
    <p className="text-emerald-400 font-bold">Dhruva OS CLI [Version 2.4.0-release]</p>
    <p className="text-muted/80">(c) 2026 Dhruva Kumar. All rights reserved.</p>
    <p className="text-foreground/90 mt-2">
      Type <span className="text-accent font-semibold">help</span> to view available commands or <span className="text-accent font-semibold">bio</span> to learn more.
    </p>
  </div>
);

export default function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init',
      command: '',
      output: INITIAL_WELCOME,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'terminal' | 'telemetry'>('terminal');

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal to bottom when new command added
  useEffect(() => {
    if (isOpen && activeTab === 'terminal') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen, activeTab]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && activeTab === 'terminal') {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, activeTab]);

  const executeCommand = useCallback((cmdRaw: string) => {
    const trimmed = cmdRaw.trim();
    const cmd = trimmed.toLowerCase();
    const [action, ...args] = cmd.split(' ');
    const time = new Date().toLocaleTimeString();

    if (!trimmed) return;

    // Append to command history list for arrow key navigation
    setCommandList((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    let outputContent: React.ReactNode = null;

    switch (action) {
      case 'help':
      case '?':
        outputContent = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs pt-1">
            <div><span className="text-accent font-mono font-semibold">whoami / bio</span> - Developer summary</div>
            <div><span className="text-accent font-mono font-semibold">skills</span> - Stack & technologies</div>
            <div><span className="text-accent font-mono font-semibold">projects</span> - Featured applications</div>
            <div><span className="text-accent font-mono font-semibold">contact</span> - Email, GitHub & socials</div>
            <div><span className="text-accent font-mono font-semibold">resume</span> - Download PDF resume</div>
            <div><span className="text-accent font-mono font-semibold">telemetry</span> - View runtime telemetry</div>
            <div><span className="text-accent font-mono font-semibold">theme &lt;name&gt;</span> - Switch accent color</div>
            <div><span className="text-accent font-mono font-semibold">clear</span> - Clear terminal screen</div>
            <div><span className="text-accent font-mono font-semibold">sudo</span> - Run with superuser power</div>
            <div><span className="text-accent font-mono font-semibold">matrix</span> - Enter the matrix</div>
          </div>
        );
        break;

      case 'whoami':
      case 'bio':
        outputContent = (
          <div className="text-xs space-y-1.5 pt-1">
            <p className="text-emerald-400 font-semibold">Dhruva Kumar — Creative Developer & Full-Stack Technologist</p>
            <p className="text-muted/90 leading-relaxed font-light">
              Passionate about bridging high-performance backend engineering with fluid, award-winning frontend interfaces.
              Specialized in React, Next.js, Node.js, Three.js, GSAP, and cloud-native databases.
            </p>
            <p className="text-accent/90">Location: India · Status: Available for hire & freelance</p>
          </div>
        );
        break;

      case 'skills':
        outputContent = (
          <div className="text-xs space-y-2 pt-1">
            <p className="text-muted/80">CORE TECHNICAL PROFICIENCIES:</p>
            <div className="space-y-1 font-mono">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-foreground/90">Frontend: React 19, TypeScript, Next.js, Tailwind, GSAP, Three.js</span>
                <span className="text-emerald-400">98%</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-foreground/90">Backend: Node.js, Express, REST APIs, WebSockets, Supabase</span>
                <span className="text-emerald-400">92%</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-foreground/90">Database: PostgreSQL, MongoDB, Pinecone Vector DB, Redis</span>
                <span className="text-emerald-400">88%</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-foreground/90">DevOps & Tools: Git, Vite, Docker, Vercel, CI/CD, Linux</span>
                <span className="text-emerald-400">90%</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        outputContent = (
          <div className="text-xs space-y-2 pt-1">
            <p className="text-muted/80">FEATURED REPOSITORIES & DEPLOYMENTS:</p>
            <div className="space-y-1.5">
              <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                <span className="text-accent font-semibold">1. Nexora</span> — Real-time end-to-end messaging platform
                <p className="text-muted text-[11px]">Live: <a href="https://chat-app-mu-snowy-58.vercel.app/" target="_blank" rel="noreferrer" className="text-emerald-400 underline">chat-app-mu-snowy-58.vercel.app</a></p>
              </div>
              <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                <span className="text-accent font-semibold">2. Aether</span> — AI Vector Knowledge Management system
                <p className="text-muted text-[11px]">Stack: Next.js · OpenAI · Pinecone · Tailwind</p>
              </div>
              <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                <span className="text-accent font-semibold">3. Vertex</span> — High-frequency financial telemetry visualizer
                <p className="text-muted text-[11px]">Stack: React · D3.js · WebSocket · Canvas</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'contact':
        outputContent = (
          <div className="text-xs space-y-1 pt-1 font-mono">
            <p>Email: <a href="mailto:dhruva9837@gmail.com" className="text-accent underline">dhruva9837@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/Dhruva9837" target="_blank" rel="noreferrer" className="text-emerald-400 underline">github.com/Dhruva9837</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/dhruva9837" target="_blank" rel="noreferrer" className="text-blue-400 underline">linkedin.com/in/dhruva9837</a></p>
          </div>
        );
        break;

      case 'resume':
        outputContent = (
          <div className="text-xs space-y-1 pt-1">
            <p className="text-emerald-400">Opening resume...</p>
            <p className="text-muted">If download doesn't start automatically: <a href="/resume.pdf" target="_blank" download className="text-accent underline">Click here to download PDF</a></p>
          </div>
        );
        window.open('/resume.pdf', '_blank');
        break;

      case 'telemetry':
        setActiveTab('telemetry');
        outputContent = <p className="text-xs text-emerald-400">Switching to System Telemetry tab...</p>;
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo':
        outputContent = (
          <div className="text-xs text-rose-400 font-mono">
            [ACCESS_DENIED] Nice try, guest! Superuser credentials are strictly reserved for Dhruva. 😉
          </div>
        );
        break;

      case 'matrix':
        outputContent = (
          <div className="text-xs text-emerald-500 font-mono">
            Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇
          </div>
        );
        break;

      case 'theme': {
        const themeChoice = args[0];
        const themeMap: Record<string, { accent: string; hover: string }> = {
          emerald: { accent: '#10B981', hover: '#059669' },
          cyan: { accent: '#06B6D4', hover: '#0891B2' },
          amber: { accent: '#F59E0B', hover: '#D97706' },
          rose: { accent: '#F43F5E', hover: '#E11D48' },
          violet: { accent: '#8B5CF6', hover: '#7C3AED' },
          default: { accent: '#6366F1', hover: '#8B5CF6' },
          reset: { accent: '#6366F1', hover: '#8B5CF6' },
        };

        if (themeChoice && themeMap[themeChoice]) {
          document.documentElement.style.setProperty('--accent', themeMap[themeChoice].accent);
          document.documentElement.style.setProperty('--accent-hover', themeMap[themeChoice].hover);
          outputContent = (
            <div className="text-xs text-emerald-400 font-mono">
              [THEME_APPLIED] Switched accent palette to <span className="font-bold">{themeChoice}</span>!
            </div>
          );
        } else {
          outputContent = (
            <div className="text-xs text-muted/90 font-mono">
              Usage: <span className="text-accent">theme &lt;name&gt;</span> (Available: emerald, cyan, amber, rose, violet, reset)
            </div>
          );
        }
        break;
      }

      default:
        outputContent = (
          <div className="text-xs text-rose-400/90 font-mono">
            Command not recognized: <span className="text-white">'{trimmed}'</span>. Type <span className="text-accent underline">help</span> for supported commands.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: trimmed,
        output: outputContent,
        timestamp: time,
      },
    ]);

    setInputVal('');
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < commandList.length) {
        setHistoryIndex(nextIdx);
        setInputVal(commandList[commandList.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandList[commandList.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <>
      {/* Floating Toggle Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-[9990]">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          data-cursor="hover"
          aria-label={isOpen ? 'Close Developer CLI' : 'Open Developer CLI'}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0E0E14]/90 hover:bg-[#14141E] border border-white/10 hover:border-accent/50 text-foreground shadow-2xl backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>

          <TerminalIcon size={15} className="text-accent group-hover:rotate-6 transition-transform" />
          <span className="font-mono text-xs tracking-wider font-medium">CLI Terminal</span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-muted/60 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
            ~
          </span>
        </button>
      </div>

      {/* Terminal Drawer / Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`fixed z-[9995] bg-[#0A0A0F]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden text-foreground font-mono transition-all duration-300 ${
              isExpanded
                ? 'inset-4 md:inset-12'
                : 'bottom-20 right-4 sm:right-6 w-[94vw] sm:w-[540px] md:w-[620px] h-[480px]'
            }`}
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10 select-none">
              <div className="flex items-center gap-3">
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors"
                    aria-label="Close terminal"
                  />
                  <button
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors"
                    aria-label="Toggle expand"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors"
                    aria-label="Minimize terminal"
                  />
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 ml-3 bg-black/40 p-0.5 rounded-lg border border-white/5">
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-colors ${
                      activeTab === 'terminal'
                        ? 'bg-accent/20 text-accent font-medium border border-accent/30'
                        : 'text-muted hover:text-white'
                    }`}
                  >
                    <TerminalIcon size={12} />
                    <span>dhruva-sh</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('telemetry')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-colors ${
                      activeTab === 'telemetry'
                        ? 'bg-accent/20 text-accent font-medium border border-accent/30'
                        : 'text-muted hover:text-white'
                    }`}
                  >
                    <Activity size={12} />
                    <span>telemetry</span>
                  </button>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-2 text-muted">
                <button
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="p-1 hover:text-white transition-colors"
                  aria-label={isExpanded ? 'Restore size' : 'Maximize window'}
                >
                  {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            {activeTab === 'terminal' ? (
              <div
                onClick={() => inputRef.current?.focus()}
                className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar text-xs cursor-text"
              >
                {/* Command History */}
                {history.map((item) => (
                  <div key={item.id} className="space-y-1">
                    {item.command && (
                      <div className="flex items-center gap-2 text-muted/70">
                        <span className="text-emerald-400 font-bold">dhruva@portfolio:~$</span>
                        <span className="text-foreground">{item.command}</span>
                        <span className="ml-auto text-[10px] text-muted/40">{item.timestamp}</span>
                      </div>
                    )}
                    <div className="pl-0">{item.output}</div>
                  </div>
                ))}

                {/* Active Prompt */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-emerald-400 font-bold shrink-0">dhruva@portfolio:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="type 'help' or command..."
                    className="flex-1 bg-transparent border-none outline-none text-foreground text-xs caret-accent"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    aria-label="Terminal command input"
                  />
                  <button
                    onClick={() => executeCommand(inputVal)}
                    aria-label="Submit command"
                    className="text-muted hover:text-accent p-1"
                  >
                    <CornerDownLeft size={13} />
                  </button>
                </div>

                <div ref={bottomRef} />
              </div>
            ) : (
              /* System Telemetry & Technical Flex Tab */
              <div className="flex-1 p-5 overflow-y-auto space-y-5 custom-scrollbar text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="font-semibold text-xs uppercase tracking-wider">Telemetry Engine Online</span>
                  </div>
                  <span className="text-[11px] text-muted font-mono">Cluster: local-client</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-muted block mb-1 uppercase tracking-wider">Framework</span>
                    <p className="font-medium text-foreground">React 19.2 (Concurrent)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-muted block mb-1 uppercase tracking-wider">Bundler</span>
                    <p className="font-medium text-foreground">Vite 7.3.1 (HMR)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-muted block mb-1 uppercase tracking-wider">3D Graphics</span>
                    <p className="font-medium text-foreground">Three.js WebGL (60 FPS)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-muted block mb-1 uppercase tracking-wider">Motion Engine</span>
                    <p className="font-medium text-foreground">GSAP 3.14 + Lenis</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-muted block mb-1 uppercase tracking-wider">Styling</span>
                    <p className="font-medium text-foreground">Tailwind CSS 3.4</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-muted block mb-1 uppercase tracking-wider">Architecture</span>
                    <p className="font-medium text-emerald-400">Zero Warnings · Type Safe</p>
                  </div>
                </div>

                {/* Quick Interactive Actions */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] text-muted uppercase tracking-wider block">Quick CLI Actions</span>
                  <div className="flex flex-wrap gap-2">
                    {['help', 'whoami', 'skills', 'projects', 'contact', 'resume', 'matrix'].map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setActiveTab('terminal');
                          executeCommand(c);
                        }}
                        className="px-2.5 py-1 rounded bg-white/5 hover:bg-accent/20 hover:text-accent border border-white/10 text-[11px] transition-colors"
                      >
                        run `{c}`
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Status Footer */}
            <div className="px-4 py-2 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[10px] text-muted select-none">
              <span className="flex items-center gap-1.5">
                <Cpu size={12} className="text-accent" />
                <span>Node v20.x · Architecture: x86_64</span>
              </span>
              <span className="text-muted/60">Press [ESC] to minimize</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
