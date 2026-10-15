import { motion } from 'framer-motion';
import { 
  Layout, 
  Server, 
  Database, 
  Workflow, 
  Layers,
  Code2,
  ShieldCheck,
  Globe,
  HardDrive,
  GitBranch,
  Cloud,
  Cpu
} from 'lucide-react';

interface SkillItem {
  name: string;
  level?: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

interface SkillCategory {
  category: string;
  description: string;
  categoryIcon: typeof Layout;
  color: string;
  items: SkillItem[];
}

// Crisp, lightweight SVG brand/tech icons
const ReactIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="12" rx="10" ry="4.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
  </svg>
);

const NextIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 8v8l7-8v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TypeScriptIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7 8h6M10 8v8M14 15.5c.8.6 1.8.8 2.6.4.8-.4 1.2-1.3.8-2-.4-.8-2-1.1-2.4-1.9-.4-.7-.1-1.6.6-2 .7-.4 1.6-.3 2.4.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TailwindIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M7 8.5C8 6 10 5 12.5 5c3.5 0 4.5 3 6.5 3.5 2 .5 3-.5 3-2-1 2.5-3 3.5-5.5 3.5C13 10 12 7 10 6.5 8 6 7 7 7 8.5zm-5 7C3 13 5 12 7.5 12c3.5 0 4.5 3 6.5 3.5 2 .5 3-.5 3-2-1 2.5-3 3.5-5.5 3.5C9 17 8 14 6 13.5c-2-.5-3 .5-3 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" />
    <path d="M12 11.5v6.5M8.5 10l3.5 2 3.5-2" />
  </svg>
);

const MongoIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C10.5 4 8 8 8 12.5c0 4 2 7 4 9.5 2-2.5 4-5.5 4-9.5C16 8 13.5 4 12 2z" />
    <path d="M12 2v20" />
  </svg>
);

const SupabaseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const PostgresIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="7" rx="8" ry="3.5" />
    <path d="M4 7v10c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5V7" />
    <path d="M4 12c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5" />
  </svg>
);

const GitIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="9" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <path d="M6 8.5v7M8 7.5l8 2.5" />
  </svg>
);

const VercelIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l10 17H2L12 3z" />
  </svg>
);

const SKILL_GROUPS: SkillCategory[] = [
  {
    category: 'Frontend',
    description: 'Interface & Architecture',
    categoryIcon: Layout,
    color: '#6366F1',
    items: [
      { name: 'React.js', level: 'Core', icon: ReactIcon },
      { name: 'Next.js', level: 'SSR/SSG', icon: NextIcon },
      { name: 'TypeScript', level: 'Typed', icon: TypeScriptIcon },
      { name: 'Tailwind CSS', level: 'Design', icon: TailwindIcon },
      { name: 'JavaScript (ES6+)', level: 'Language', icon: Code2 },
      { name: 'Framer Motion', level: 'Motion', icon: Layers },
    ]
  },
  {
    category: 'Backend',
    description: 'Server & Business Logic',
    categoryIcon: Server,
    color: '#8B5CF6',
    items: [
      { name: 'Node.js', level: 'Runtime', icon: NodeIcon },
      { name: 'Express.js', level: 'Framework', icon: Server },
      { name: 'RESTful APIs', level: 'Architecture', icon: Globe },
      { name: 'JWT & RBAC Auth', level: 'Security', icon: ShieldCheck },
      { name: 'GraphQL', level: 'Query', icon: Cpu },
    ]
  },
  {
    category: 'Database',
    description: 'Persistence & Modeling',
    categoryIcon: Database,
    color: '#3B82F6',
    items: [
      { name: 'MongoDB', level: 'NoSQL', icon: MongoIcon },
      { name: 'Mongoose ODM', level: 'Modeling', icon: HardDrive },
      { name: 'Supabase', level: 'Realtime', icon: SupabaseIcon },
      { name: 'PostgreSQL', level: 'Relational', icon: PostgresIcon },
    ]
  },
  {
    category: 'DevOps',
    description: 'Deployment & CI/CD',
    categoryIcon: Workflow,
    color: '#10B981',
    items: [
      { name: 'Git & GitHub', level: 'VCS', icon: GitIcon },
      { name: 'GitHub Actions', level: 'CI / CD', icon: GitBranch },
      { name: 'Vercel', level: 'Edge Deploy', icon: VercelIcon },
      { name: 'Render & Cloud', level: 'Hosting', icon: Cloud },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-4 block">Expertise</span>
          <h2 id="skills-heading" className="font-display font-medium text-4xl md:text-5xl lg:text-6xl tracking-tighter">
            My Toolkit.
          </h2>
          <p className="text-muted font-light mt-4 max-w-xl text-sm leading-relaxed">
            Technologies and tooling I use across frontend engineering, distributed server architecture, database design, and cloud workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_GROUPS.map((group, groupIdx) => {
            const CategoryIcon = group.categoryIcon;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: groupIdx * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-[#0e0e14]/70 hover:bg-[#12121c] border border-foreground/5 hover:border-accent/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-foreground/5">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: `${group.color}15`, color: group.color }}
                      >
                        <CategoryIcon size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-medium tracking-tight text-foreground">
                          {group.category}
                        </h3>
                        <span className="font-mono text-[9px] tracking-wider uppercase text-muted block">
                          {group.description}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-muted/60 tracking-widest">
                      {String(group.items.length).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Skills List with Icons */}
                  <ul className="space-y-3" aria-label={`${group.category} skills list`}>
                    {group.items.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <li
                          key={skill.name}
                          className="group/item flex items-center justify-between p-2 rounded-xl hover:bg-foreground/[0.04] transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-foreground/[0.03] border border-foreground/10 group-hover/item:border-accent/40 group-hover/item:bg-accent/10 flex items-center justify-center text-muted group-hover/item:text-accent transition-all duration-200 shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-light text-foreground/90 group-hover/item:text-accent transition-colors duration-200 truncate">
                              {skill.name}
                            </span>
                          </div>

                          {skill.level && (
                            <span className="font-mono text-[9px] text-muted/60 group-hover/item:text-muted uppercase tracking-wider shrink-0 ml-2">
                              {skill.level}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Subtle bottom accent line on hover */}
                <div 
                  className="h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full mt-6"
                  style={{ backgroundColor: group.color }}
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
