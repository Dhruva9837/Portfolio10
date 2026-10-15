import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Sparkles } from 'lucide-react';
import ProjectModal, { type ProjectData } from './ProjectModal';

type CategoryFilter = 'all' | 'fullstack' | 'ai' | 'data';

interface FilterOption {
  key: CategoryFilter;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'fullstack', label: 'Full-Stack' },
  { key: 'ai', label: 'AI & Machine Learning' },
  { key: 'data', label: 'Data & Systems' },
];

const PROJECTS: ProjectData[] = [
  {
    id: 1,
    title: 'Nexora',
    category: 'Real-time Messaging',
    categoryKey: 'fullstack',
    description: 'A premium real-time chat application featuring end-to-end encryption aesthetics, group management, and seamless file sharing.',
    longDescription: 'Nexora is a high-concurrency real-time communication platform built with modern WebSocket architectures, Supabase Realtime, and responsive UI micro-interactions. It features instant presence tracking, granular chat channels, media attachment previews, and optimistic state updates for instantaneous perceived performance.',
    highlights: [
      'Sub-50ms message propagation with Supabase Realtime pub/sub channels',
      'Granular Row Level Security (RLS) policies protecting user privacy & message streams',
      'Fluid spring micro-interactions using Framer Motion with subtle audio feedback',
      'Optimistic state updates eliminating perceptible UI lag during message dispatch',
    ],
    tags: ['React', 'Supabase', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    link: 'https://chat-app-mu-snowy-58.vercel.app/',
    githubUrl: 'https://github.com/Dhruva9837',
    webpImage: '/projects/nexora.webp',
    fallbackImage: '/projects/nexora.png',
    alt: 'Nexora real-time messaging application interface showing chat channels and active conversations',
    role: 'Lead Architect & Full Stack Developer',
    timeline: '3 Weeks · Production Release',
  },
  {
    id: 2,
    title: 'Aether',
    category: 'AI Knowledge Base',
    categoryKey: 'ai',
    description: 'An intelligent knowledge management system with vector search, automated tagging, and neural graph visualizations.',
    longDescription: 'Aether acts as a second brain for engineering teams. It ingests complex technical documentation, PDFs, and repository source code, indexes them via high-dimensional OpenAI embeddings into Pinecone vector storage, and visualizes conceptual connections through an interactive neural connectivity graph.',
    highlights: [
      'High-dimensional semantic similarity vector search via Pinecone & OpenAI ada-002',
      'Interactive 2D/3D neural connectivity graph visualizing relationships between documents',
      'Context-aware conversational agent with rigorous citation grounding to prevent hallucination',
      'Edge streaming serverless runtime delivering low time-to-first-token latency',
    ],
    tags: ['Next.js', 'OpenAI', 'Pinecone', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/Dhruva9837',
    githubUrl: 'https://github.com/Dhruva9837',
    webpImage: '/projects/aether.webp',
    fallbackImage: '/projects/aether.png',
    alt: 'Aether AI knowledge management interface showcasing vector graph insights and search capabilities',
    role: 'AI Systems Engineer & Full Stack Dev',
    timeline: '2 Months · Active Project',
  },
  {
    id: 3,
    title: 'Vertex',
    category: 'Data Engineering & Analytics',
    categoryKey: 'data',
    description: 'Specialized financial dashboard for real-time market analysis and high-frequency data visualization.',
    longDescription: 'Vertex is an ultra-performant financial telemetry engine engineered to process continuous streams of market trade ticks. Built with canvas-accelerated D3.js visualizers and resilient WebSocket clients, it maintains consistent 60 FPS while rendering tens of thousands of live data updates.',
    highlights: [
      'High-throughput WebSocket streaming client with automatic reconnect & buffer queuing',
      'Canvas-accelerated D3.js charting capable of rendering 10,000+ data points smoothly',
      'Custom anomaly detection metrics with configurable dynamic threshold alerts',
      'Strict TypeScript domain typing and decoupled reactive state architecture',
    ],
    tags: ['React', 'D3.js', 'WebSocket', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/Dhruva9837',
    githubUrl: 'https://github.com/Dhruva9837',
    webpImage: '/projects/vertex.webp',
    fallbackImage: '/projects/vertex.png',
    alt: 'Vertex financial data visualization dashboard showcasing real-time telemetry charts and metrics',
    role: 'Frontend Systems & Data Engineer',
    timeline: '6 Weeks · Production Demo',
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const filterTabListId = useId();

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.categoryKey === activeFilter;
  });

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-32 px-6 bg-background relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-4 block">
              Selected Projects
            </span>
            <h2 id="projects-heading" className="font-display font-medium text-4xl md:text-5xl tracking-tighter">
              Featured Work.
            </h2>
          </div>
          <p className="text-sm text-muted font-light max-w-sm">
            Curated systems and creative products showcasing architectural depth, performance engineering, and modern aesthetics.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div 
          role="tablist"
          aria-label="Filter projects by domain"
          className="flex flex-wrap items-center gap-2 mb-16 p-1.5 rounded-2xl bg-white/[0.03] border border-white/5 w-fit"
        >
          {FILTER_OPTIONS.map((filter) => {
            const isActive = activeFilter === filter.key;
            const count = filter.key === 'all' 
              ? PROJECTS.length 
              : PROJECTS.filter(p => p.categoryKey === filter.key).length;

            return (
              <button
                key={filter.key}
                role="tab"
                id={`${filterTabListId}-${filter.key}`}
                aria-selected={isActive}
                data-cursor="hover"
                onClick={() => setActiveFilter(filter.key)}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center gap-2 ${
                  isActive ? 'text-white font-medium' : 'text-muted hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-accent/20 border border-accent/40 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
                <span className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-accent/40 text-white' : 'bg-white/5 text-muted'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-x-12 gap-y-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group"
              >
                <article className="h-full flex flex-col justify-between">
                  {/* Card Media Container */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    data-cursor="hover"
                    tabIndex={0}
                    role="button"
                    aria-label={`Open case study details for ${project.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                    className="cursor-pointer block rounded-2xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none p-1 transition-all"
                  >
                    <div className="aspect-[16/10] bg-muted/5 border border-foreground/5 rounded-2xl mb-6 overflow-hidden relative group-hover:border-accent/40 transition-colors duration-500">
                      <picture>
                        <source srcSet={project.webpImage} type="image/webp" />
                        <img 
                          src={project.fallbackImage} 
                          alt={project.alt}
                          loading="lazy"
                          decoding="async"
                          width={800}
                          height={500}
                          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] contrast-[1.1] group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </picture>
                      
                      {/* Gradient overlay & badge */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
                      
                      {/* Click indicator badge */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-mono text-accent border border-accent/30">
                          <Sparkles size={12} /> Explore Case Study
                        </span>
                        <span className="p-2 rounded-lg bg-accent text-white shadow-lg shadow-accent/30">
                          <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </div>

                    {/* Card Meta & Title */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] tracking-widest uppercase text-accent font-medium">
                          {project.category}
                        </span>
                        <span className="font-mono text-[11px] text-muted/60">
                          {project.timeline?.split('·')[0].trim()}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-sm text-muted/90 mt-2.5 font-light leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags and Direct Live Link */}
                  <div className="flex items-center justify-between pt-6 mt-2 border-t border-white/5">
                    <div className="flex flex-wrap gap-2" aria-label="Project technologies">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="font-mono text-[10px] tracking-wider text-muted/80 uppercase px-2 py-0.5 rounded bg-white/[0.03] border border-white/5">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="font-mono text-[10px] text-muted/60 px-1 py-0.5">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {project.link && project.link !== '#' && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="hover"
                          aria-label={`Open ${project.title} live link in a new tab`}
                          className="p-2 rounded-lg text-muted hover:text-accent hover:bg-white/5 transition-all"
                          title="Open Live Site"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        data-cursor="hover"
                        className="text-xs font-mono text-muted/70 hover:text-foreground transition-colors px-2 py-1"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                </article>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub link button */}
        <div className="mt-28 text-center">
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

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
