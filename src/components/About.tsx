import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-16 md:gap-24 items-start">
          <div className="md:col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-4 block">About Me</span>
              <h2 id="about-heading" className="font-display font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tighter">
                Crafting digital <br />
                <span className="text-muted">simplicity through</span> <br />
                design & code.
              </h2>
            </motion.div>
          </div>

          <div className="md:col-span-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg md:text-xl font-light text-muted leading-relaxed mb-10">
                I'm a full-stack creative developer. 
                My philosophy is rooted in functional minimalism — creating 
                experiences that feel effortless yet deliver meaningful impact.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-display text-sm font-medium tracking-tight mb-4 uppercase text-foreground">My Approach</h3>
                  <p className="text-sm text-muted/90 leading-relaxed font-light">
                    I believe the best interfaces are the ones that disappear. 
                    I focus on performance, accessibility, and smooth 
                    micro-interactions to ensure every movement feels intentional.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-sm font-medium tracking-tight mb-4 uppercase text-foreground">Technologies</h3>
                  <ul className="grid grid-cols-2 gap-y-2 font-mono text-[11px] text-accent tracking-wider" aria-label="Key technologies list">
                    <li>React / Next</li>
                    <li>TypeScript</li>
                    <li>Framer Motion</li>
                    <li>Node.js / Express</li>
                    <li>Tailwind CSS</li>
                    <li>GSAP</li>
                  </ul>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-foreground/5">
                <a
                  href="/Dhruv_Kumar_Resume.pdf"
                  download="Dhruv_Kumar_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  aria-label="Download Dhruv Kumar CV (PDF, 1 page)"
                  className="font-mono text-[11px] tracking-widest uppercase text-foreground hover:text-accent transition-colors inline-flex items-center gap-4 group focus-visible:ring-2 focus-visible:ring-accent rounded-sm p-1"
                >
                  Download CV 
                  <span className="w-8 h-[1px] bg-accent group-hover:w-12 transition-all duration-500" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
