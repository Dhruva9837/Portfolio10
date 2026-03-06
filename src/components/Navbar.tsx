import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NAV_LINKS = ['About', 'Projects', 'Skills', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1 });

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-foreground/5 py-4' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          data-cursor="hover"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display font-medium text-lg tracking-tighter"
        >
          <span className="text-foreground">D H R U V A</span>
          <span className="text-accent">.</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                data-cursor="hover"
                onClick={() => scrollTo(link)}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted hover:text-accent transition-colors duration-300"
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          data-cursor="hover"
          className="md:hidden flex flex-col gap-1 z-50 relative"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block h-[1px] w-5 bg-foreground transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block h-[1px] w-5 bg-foreground transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-[1px] w-5 bg-foreground transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 flex items-center justify-center ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-8 text-center text-2xl font-display font-light">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              data-cursor="hover"
              onClick={() => scrollTo(link)}
              className="text-muted hover:text-accent transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

