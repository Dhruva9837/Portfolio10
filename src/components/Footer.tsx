export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-foreground/5 bg-background">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-display font-medium text-lg tracking-tighter">
          <span className="text-foreground">D H R U V A</span>
          <span className="text-accent">.</span>
        </div>
        
        <div className="text-muted font-mono text-[10px] tracking-[0.2em] uppercase">
          © 2026 Dhruva — Crafted with intentionality
        </div>

        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted/60">Systems Active</span>
        </div>
      </div>
    </footer>
  );
}
