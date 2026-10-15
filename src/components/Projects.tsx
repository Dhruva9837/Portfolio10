import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  link: string;
  webpImage: string;
  fallbackImage: string;
  alt: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Nexora',
    category: 'Real-time Messaging',
    description: 'A premium real-time chat application featuring end-to-end encryption aesthetics, group management, and seamless file sharing.',
    tags: ['React', 'Supabase', 'Framer Motion', 'Tailwind'],
    link: 'https://chat-app-mu-snowy-58.vercel.app/',
    webpImage: '/projects/nexora.webp',
    fallbackImage: '/projects/nexora.png',
    alt: 'Nexora real-time messaging application interface showing chat channels and active conversations',
  },
  {
    id: 2,
    title: 'Aether',
    category: 'AI Knowledge Base',
    description: 'An intelligent knowledge management system with vector search, automated tagging, and neural graph visualizations.',
    tags: ['Next.js', 'OpenAI', 'Pinecone', 'Tailwind'],
    link: '#',
    webpImage: '/projects/aether.webp',
    fallbackImage: '/projects/aether.png',
    alt: 'Aether AI knowledge management interface showcasing vector graph insights and search capabilities',
  },
  {
    id: 3,
    title: 'Vertex',
    category: 'Data Engineering',
    description: 'Specialized financial dashboard for real-time market analysis and high-frequency data visualization.',
    tags: ['React', 'D3.js', 'WebSocket', 'TypeScript'],
    link: '#',
    webpImage: '/projects/vertex.webp',
    fallbackImage: '/projects/vertex.png',
    alt: 'Vertex financial data visualization dashboard showcasing real-time telemetry charts and metrics',
  },
];

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-4 block">Selected Projects</span>
          <h2 id="projects-heading" className="font-display font-medium text-4xl md:text-5xl tracking-tighter">Featured Work.</h2>
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
              <article>
                <a 
                  href={project.link} 
                  data-cursor="hover" 
                  aria-label={`View project: ${project.title} - ${project.category}`}
                  className="block rounded-2xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none p-1 transition-all"
                >
                  <div className="aspect-[16/10] bg-muted/5 border border-foreground/5 rounded-2xl mb-8 overflow-hidden relative">
                    <picture>
                      <source srcSet={project.webpImage} type="image/webp" />
                      <img 
                        src={project.fallbackImage} 
                        alt={project.alt}
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={500}
                        className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] contrast-[1.1] group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out"
                      />
                    </picture>
                    
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay pointer-events-none" />
                    <div className="absolute inset-0 border border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-muted mb-2 block">{project.category}</span>
                      <h3 className="font-display text-2xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted/90 mt-3 max-w-sm font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-accent" aria-hidden="true">
                      <ExternalLink size={20} />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-6" aria-label="Project technologies">
                    {project.tags.map(tag => (
                      <span key={tag} className="font-mono text-[10px] tracking-wider text-muted/75 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </article>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <a
            href="https://github.com/Dhruva9837"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            aria-label="View all projects on GitHub (opens in a new tab)"
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase text-muted hover:text-foreground transition-colors group p-2 focus-visible:ring-2 focus-visible:ring-accent rounded-md"
          >
            <Github size={16} aria-hidden="true" />
            <span>View all on GitHub</span>
            <span className="w-4 h-[1px] bg-muted group-hover:bg-foreground group-hover:w-8 transition-all duration-500" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
