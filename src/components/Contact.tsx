import { Github, Linkedin, ArrowUpRight } from 'lucide-react';

const SOCIALS = [
  { name: 'GitHub', icon: Github, link: 'https://github.com/Dhruva9837' },
  { name: 'LinkedIn', icon: Linkedin, link: 'https://www.linkedin.com/in/dhruva-kumar-715479301' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-4 block">Contact</span>
            <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-7xl leading-tight tracking-tighter mb-10">
              Let's build <br /> something <br /> great.
            </h2>
            
            <div className="space-y-12">
              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-muted block mb-4">Email</span>
                <a href="mailto:kumardhruva187@gmail.com" data-cursor="hover" className="text-2xl font-light hover:text-accent transition-colors">
                  kumardhruva187@gmail.com
                </a>
              </div>

              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-muted block mb-4">Follow</span>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {SOCIALS.map(social => (
                    <a 
                      key={social.name} 
                      href={social.link} 
                      data-cursor="hover"
                      className="group flex items-center gap-2 text-sm font-light hover:text-accent transition-colors"
                    >
                      <social.icon size={16} />
                      {social.name}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <form className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-mono text-[9px] tracking-widest uppercase text-muted">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-foreground/10 py-3 focus:outline-none focus:border-accent transition-colors font-light"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[9px] tracking-widest uppercase text-muted">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-foreground/10 py-3 focus:outline-none focus:border-accent transition-colors font-light"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[9px] tracking-widest uppercase text-muted">Message</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-transparent border-b border-foreground/10 py-3 focus:outline-none focus:border-accent transition-colors font-light resize-none"
                  placeholder="Share some details about your project"
                />
              </div>
              <div className="pt-4">
                <button
                  data-cursor="hover"
                  type="submit"
                  className="w-full py-5 bg-accent text-white font-medium rounded-full hover:bg-accent-hover transition-all duration-500 overflow-hidden relative group"
                >
                  <span className="relative z-10">Send Message</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

