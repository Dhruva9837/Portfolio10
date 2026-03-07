import { motion } from 'framer-motion';

const SKILLS = [
  {
    category: 'Engineering',
    items: ['React / Next.js', 'Typescript', 'Node.js', 'PostgreSQL', 'GraphQL']
  },
  {
    category: 'Creative',
    items: ['Three.js', 'Framer Motion', 'Git', 'Github', 'GSAP']
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-4 block">Expertise</span>
          <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tighter">My Toolkit.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-20">
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-lg font-medium tracking-tight mb-10 text-muted uppercase">
                {group.category}
              </h3>
              <ul className="space-y-6">
                {group.items.map((skill, index) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group flex items-center justify-between border-b border-foreground/5 pb-4"
                  >
                    <span className="text-xl font-light text-foreground group-hover:text-accent transition-colors duration-300">
                      {skill}
                    </span>
                    <span className="font-mono text-[9px] text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      /{String(index + 1).padStart(2, '0')}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

