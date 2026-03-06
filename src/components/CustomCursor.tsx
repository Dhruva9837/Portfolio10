import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Set initial position off-screen
    gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 0 });

    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    const xSetter = gsap.quickSetter(dot, "x", "px");
    const ySetter = gsap.quickSetter(dot, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Small scale in when first moving
      gsap.to(dot, { scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    };

    // Smooth follow loop using ticker
    const ticker = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio()); 
      
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      
      xSetter(pos.x);
      ySetter(pos.y);
    };

    gsap.ticker.add(ticker);


    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [data-cursor="hover"]')) {
        gsap.to(dot, { 
          scale: 4, 
          backgroundColor: "rgba(99, 102, 241, 0.15)", // Very soft indigo
          border: "1px solid rgba(99, 102, 241, 0.3)",
          duration: 0.4, 
          ease: "power3.out" 
        });
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [data-cursor="hover"]')) {
        gsap.to(dot, { 
          scale: 1, 
          backgroundColor: "#6366F1", // Primary indigo
          border: "none",
          duration: 0.4, 
          ease: "power3.out" 
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-2.5 h-2.5 bg-accent rounded-full pointer-events-none z-[99999] mix-blend-difference"
    />
  );
}


