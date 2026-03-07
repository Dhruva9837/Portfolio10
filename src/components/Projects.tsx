import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'Modern Portfolio',
    category: 'Interactive Web',
    description: 'A high-end developer portfolio with smooth animations and interactive components.',
    tags: ['React', 'GSAP', 'Framer Motion'],
    link: '#',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    category: 'Full-Stack',
    description: 'MERN stack application for modern retail experiences.',
    tags: ['MongoDB', 'Express', 'React', 'Node'],
    link: '#',
  },
  {
    id: 3,
    title: 'Visual Logic',
    category: 'Creative Design',
    description: 'Experimenting with interactive UI and motion design patterns.',
    tags: ['Tailwind', 'Motion', 'Vite'],
    link: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-4 block">Selected Projects</span>
          <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tighter">Featured Work.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <a href={project.link} data-cursor="hover" className="block cursor-none">
                <div className="aspect-[16/10] bg-muted/5 border border-foreground/5 rounded-2xl mb-8 overflow-hidden relative">
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center font-display text-muted/5 text-4xl group-hover:scale-105 transition-transform duration-700 ease-out">
                    {project.title}
                  </div>
                  
                  <div className="absolute inset-0 border border-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-muted mb-2 block">{project.category}</span>
                    <h3 className="font-display text-2xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted/70 mt-3 max-w-sm font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-accent">
                    <ExternalLink size={20} />
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="font-mono text-[9px] tracking-wider text-muted/50 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="inline-flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-muted hover:text-foreground transition-colors group"
          >
            <Github size={14} />
            View all on GitHub
            <span className="w-4 h-[1px] bg-muted group-hover:bg-foreground group-hover:w-8 transition-all duration-500" />
          </a>
        </div>
      </div>
    </section>
  );
}

