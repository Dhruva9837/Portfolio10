import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { RandomLetterSwapForward } from '@/components/ui/random-letter-swap';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set('.reveal-text', { y: 0 });
      return;
    }

    const tl = gsap.timeline({ delay: 0.3 });
    
    tl.to('.reveal-text', {
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      aria-label="Introduction & Hero" 
      className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
    >
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto w-full">
        <div className="mb-8 overflow-hidden">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-xs tracking-[0.4em] text-muted uppercase inline-block"
          >
            Available for Work · 2027
          </motion.span>
        </div>

        <h1 
          ref={headlineRef}
          className="font-display font-medium leading-[1.1] tracking-[-0.04em] mb-12"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
        >
          <div className="overflow-hidden mb-2 py-2">
            <span className="reveal-text inline-block translate-y-full px-4">
              <RandomLetterSwapForward label="D H R U V A" />
            </span>
          </div>
          <div className="overflow-hidden py-2">
            <span className="reveal-text inline-block translate-y-full text-accent underline decoration-1 underline-offset-[12px] px-4">
              <RandomLetterSwapForward label="FULL Stack." />
            </span>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="max-w-xl mx-auto text-muted font-light leading-relaxed mb-12"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
        >
          A Full-Stack Developer and Creative technologist focused on building digital experiences 
          that marry minimalist design with complex technical architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <button
            data-cursor="hover"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Scroll to view selected projects"
            className="magnetic-btn group relative px-10 py-4 bg-accent hover:bg-accent-hover text-white transition-all duration-300 rounded-full overflow-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <span className="relative z-10 font-medium tracking-tight">View Work</span>
          </button>
        </motion.div>
      </div>

      {/* GPU-efficient background element */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-accent/5 rounded-full blur-[60px] md:blur-[120px] pointer-events-none will-change-transform" 
      />
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 overflow-hidden" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted">Scroll</span>
          <div className="w-px h-12 bg-muted/30 relative">
            <motion.div 
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/4 bg-accent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
