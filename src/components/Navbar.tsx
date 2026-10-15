import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FileDown } from 'lucide-react';

const NAV_LINKS = ['About', 'Projects', 'Skills', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (navRef.current) gsap.set(navRef.current, { y: 0, opacity: 1 });
    } else {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/85 backdrop-blur-md border-b border-foreground/5 py-4' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          data-cursor="hover"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Dhruva Home - Scroll to top"
          className="font-display font-medium text-lg tracking-tighter focus-visible:ring-2 focus-visible:ring-accent rounded-sm p-1"
        >
          <span className="text-foreground">D H R U V A</span>
          <span className="text-accent">.</span>
        </button>

        {/* Desktop links + Resume button */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-10" role="menubar">
            {NAV_LINKS.map((link) => (
              <li key={link} role="none">
                <button
                  data-cursor="hover"
                  role="menuitem"
                  onClick={() => scrollTo(link)}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted hover:text-accent transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent rounded-sm p-1"
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          <a
            href="/Dhruv_Kumar_Resume.pdf"
            download="Dhruv_Kumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            aria-label="Download Dhruv Kumar Resume (PDF, 1 page)"
            className="group relative inline-flex items-center gap-2 px-4 py-2 border border-accent/40 hover:border-accent text-accent hover:bg-accent/10 rounded-full font-mono text-[10px] tracking-widest uppercase transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <FileDown size={14} className="group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          data-cursor="hover"
          aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden flex flex-col gap-1.5 z-50 relative p-2 focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block h-[1.5px] w-5 bg-foreground transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block h-[1.5px] w-5 bg-foreground transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-[1.5px] w-5 bg-foreground transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`md:hidden fixed inset-0 bg-background/95 backdrop-blur-lg z-40 transition-all duration-300 flex items-center justify-center ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-center text-2xl font-display font-light">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              data-cursor="hover"
              onClick={() => scrollTo(link)}
              className="text-muted hover:text-accent transition-colors p-2 focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              {link}
            </button>
          ))}

          <a
            href="/Dhruv_Kumar_Resume.pdf"
            download="Dhruv_Kumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            onClick={() => setMenuOpen(false)}
            aria-label="Download Dhruv Kumar Resume (PDF, 1 page)"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-accent text-white rounded-full font-mono text-xs tracking-wider uppercase mt-4 hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
          >
            <FileDown size={16} aria-hidden="true" />
            <span>Download Resume</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
