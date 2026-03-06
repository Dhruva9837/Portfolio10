import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-16 md:gap-24 items-start">
          {/* Label and Big Heading */}
          <div className="md:col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-4 block">About Me</span>
              <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tighter">
                Crafting digital <br />
                <span className="text-muted">simplicity through</span> <br />
                design & code.
              </h2>
            </motion.div>
          </div>

          {/* Detailed Description and Tech Stack */}
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
                  <h3 className="font-display text-sm font-medium tracking-tight mb-4 uppercase">My Approach</h3>
                  <p className="text-sm text-muted/80 leading-relaxed font-light">
                    I believe the best interfaces are the ones that disappear. 
                    I focus on performance, accessibility, and smooth 
                    micro-interactions to ensure every movement feels intentional.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-sm font-medium tracking-tight mb-4 uppercase">Technologies</h3>
                  <ul className="grid grid-cols-2 gap-y-2 font-mono text-[11px] text-accent/80 tracking-wider">
                    <li>React / Next.js</li>
                    <li>TypeScript</li>
                    <li>Framer Motion</li>
                    <li>Node.js</li>
                    <li>Three.js / WebGL</li>
                    <li>PostgreSQL</li>
                  </ul>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-foreground/5">
                <button
                  data-cursor="hover"
                  className="font-mono text-[11px] tracking-widest uppercase text-foreground hover:text-accent transition-colors flex items-center gap-4 group"
                >
                  Download CV 
                  <span className="w-8 h-[1px] bg-accent group-hover:w-12 transition-all duration-500" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

