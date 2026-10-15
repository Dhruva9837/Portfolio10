import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable if pointer is fine (mouse) and not a touch-only screen
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      return;
    }

    const dot = dotRef.current;
    if (!dot) return;

    // Enable custom cursor class on body
    document.body.classList.add('has-custom-cursor');

    // Initial positioning off-screen
    gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const xSetter = gsap.quickSetter(dot, 'x', 'px');
    const ySetter = gsap.quickSetter(dot, 'y', 'px');

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isVisible) {
        pos.x = e.clientX;
        pos.y = e.clientY;
        xSetter(pos.x);
        ySetter(pos.y);
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
        isVisible = true;
      }
    };

    const ticker = () => {
      if (!isVisible) return;
      const dt = 1.0 - Math.pow(1.0 - 0.25, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSetter(pos.x);
      ySetter(pos.y);
    };

    gsap.ticker.add(ticker);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('button, a, [data-cursor="hover"], input, textarea')) {
        gsap.to(dot, {
          scale: 3.5,
          backgroundColor: 'rgba(99, 102, 241, 0.25)',
          border: '1.5px solid rgba(99, 102, 241, 0.7)',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('button, a, [data-cursor="hover"], input, textarea')) {
        gsap.to(dot, {
          scale: 1,
          backgroundColor: '#6366F1',
          border: 'none',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    const onWindowLeave = () => {
      gsap.to(dot, { opacity: 0, scale: 0, duration: 0.2 });
      isVisible = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', onWindowLeave);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      gsap.ticker.remove(ticker);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', onWindowLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[999999] mix-blend-difference"
      style={{ willChange: 'transform' }}
    />
  );
}
