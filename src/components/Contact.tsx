import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

const SOCIALS = [
  { name: 'GitHub', icon: Github, link: 'https://github.com/Dhruva9837', ariaLabel: 'Visit Dhruva on GitHub (opens in a new tab)' },
  { name: 'LinkedIn', icon: Linkedin, link: 'https://www.linkedin.com/in/dhruva-kumar-715479301', ariaLabel: 'Connect with Dhruva on LinkedIn (opens in a new tab)' },
];

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent mb-4 block">Contact</span>
            <h2 id="contact-heading" className="font-display font-medium text-4xl md:text-5xl lg:text-7xl leading-tight tracking-tighter mb-10">
              Let's build <br /> something <br /> great.
            </h2>
            
            <div className="space-y-12">
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-4">Email</span>
                <a 
                  href="mailto:kumardhruva187@gmail.com" 
                  data-cursor="hover" 
                  aria-label="Send an email to kumardhruva187@gmail.com"
                  className="text-2xl font-light hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-md p-1 inline-block"
                >
                  kumardhruva187@gmail.com
                </a>
              </div>

              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-muted block mb-4">Follow</span>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {SOCIALS.map(social => (
                    <a 
                      key={social.name} 
                      href={social.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      aria-label={social.ariaLabel}
                      className="group flex items-center gap-2 text-sm font-light hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-md p-1"
                    >
                      <social.icon size={16} aria-hidden="true" />
                      <span>{social.name}</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <form 
              onSubmit={handleSubmit}
              aria-label="Contact inquiry form"
              className="space-y-8"
            >
              <input type="hidden" name="access_key" value="ded562f3-7a63-4631-83de-435995e7f7f3" />
              <input type="hidden" name="from_name" value="Portfolio Contact" />
              <input type="hidden" name="subject" value="New Message from Portfolio" />

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="font-mono text-[10px] tracking-widest uppercase text-muted block">
                    Name <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    aria-required="true"
                    className="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent rounded-sm transition-colors font-light text-foreground"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="font-mono text-[10px] tracking-widest uppercase text-muted block">
                    Email <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="contact-email"
                    name="email"
                    required
                    autoComplete="email"
                    aria-required="true"
                    className="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent rounded-sm transition-colors font-light text-foreground"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="font-mono text-[10px] tracking-widest uppercase text-muted block">
                  Message <span className="text-accent" aria-hidden="true">*</span>
                </label>
                <textarea 
                  id="contact-message"
                  name="message"
                  required
                  rows={4} 
                  aria-required="true"
                  className="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent rounded-sm transition-colors font-light resize-none text-foreground"
                  placeholder="Share some details about your project"
                />
              </div>
              <div className="pt-4">
                <button
                  data-cursor="hover"
                  type="submit"
                  disabled={status === 'sending'}
                  aria-label={status === 'sending' ? 'Sending message, please wait' : 'Submit message'}
                  className="w-full py-5 bg-accent text-white font-medium rounded-full hover:bg-accent-hover transition-all duration-300 overflow-hidden relative group disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <span className="relative z-10">
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                </button>

                <div aria-live="polite" className="mt-4">
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2 text-green-400 font-mono text-[11px] tracking-widest uppercase"
                    >
                      <CheckCircle2 size={16} aria-hidden="true" />
                      <span>Message sent successfully!</span>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2 text-red-400 font-mono text-[11px] tracking-widest uppercase"
                    >
                      <AlertCircle size={16} aria-hidden="true" />
                      <span>Something went wrong. Please try again.</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
