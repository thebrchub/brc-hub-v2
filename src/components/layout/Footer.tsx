import { Instagram, Linkedin, Facebook, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Link as ScrollLink } from 'react-scroll';

// Custom X (formerly Twitter) Logo Component
const XLogo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    aria-hidden="true" 
    className={`w-5 h-5 fill-current ${className}`} // fill-current ensures it takes the parent's text color
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brc-black pt-24 pb-12 overflow-hidden border-t border-white/5">
      
      {/* 1. ANIMATED BACKGROUND DECOR */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brc-orange/50 to-transparent opacity-30" />
      
      <motion.div 
        animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
        }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brc-orange/10 blur-[150px] rounded-full pointer-events-none" 
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* 2. MASSIVE CTA SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
          <div className="max-w-3xl">
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
            >
              Have an idea? <br />
              <span className="text-gray-500">Let's build it.</span>
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-400 max-w-xl"
            >
              From high-performance code to strategic marketing campaigns. 
              We are the bridge between your vision and market dominance.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
             <ScrollLink to="contact" smooth={true} duration={800} offset={-50}>
                 <Button size="lg" className="group h-20 px-12 text-xl rounded-full shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/40">
                   Start a Project 
                   <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                 </Button>
             </ScrollLink>
          </motion.div>
        </div>

        {/* 3. MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
                {/* RESTORED LOGO IMAGE */}
                <img 
                    src="/logo.svg" 
                    alt="BRC Hub" 
                    className="h-10 w-auto object-contain" 
                />
                <span className="font-display text-3xl font-bold text-white tracking-tight">
                    BRC<span className="text-brc-orange"> Hub</span>
                </span>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <SocialIcon icon={<Instagram size={20} />} href="https://instagram.com/thebrchub" />
              <SocialIcon icon={<Linkedin size={20} />} href="https://www.linkedin.com/company/the-brc-hub" />
              {/* REPLACED TWITTER BIRD WITH X LOGO */}
              <SocialIcon icon={<XLogo />} href="https://twitter.com/thebrchub" />
              <SocialIcon icon={<Facebook size={20} />} href="https://www.facebook.com/thebrchub" />
            </div>
          </div>

          {/* Links Column 1: ENGINEERING */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="font-display text-lg font-semibold text-white mb-6">Engineering</h4>
            <ul className="space-y-4">
              <FooterLink href="#">Web Development</FooterLink>
              <FooterLink href="#">Mobile Apps</FooterLink>
              <FooterLink href="#">SaaS Platforms</FooterLink>
              <FooterLink href="#">AI Solutions</FooterLink>
            </ul>
          </div>

          {/* Links Column 2: MARKETING */}
          <div className="md:col-span-2">
            <h4 className="font-display text-lg font-semibold text-white mb-6">Growth</h4>
            <ul className="space-y-4">
              <FooterLink href="#">Digital Marketing</FooterLink>
              <FooterLink href="#">Brand Identity</FooterLink>
              <FooterLink href="#">SEO & Content</FooterLink>
              <FooterLink href="#">Social Media</FooterLink>
            </ul>
          </div>

          {/* Links Column 3: CONTACT */}
          <div className="md:col-span-3">
            <h4 className="font-display text-lg font-semibold text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="mt-1 flex-shrink-0 text-brc-orange" />
                <span className="hover:text-white transition-colors cursor-pointer">
                    Toranagallu, Ballari, Karnataka,<br/>India 583123
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={20} className="text-brc-orange" />
                <span className="hover:text-white transition-colors cursor-pointer">info@thebrchub.tech</span>
              </li>
              {/* <li className="flex items-center gap-3 text-gray-400">
                <Phone size={20} className="text-brc-orange" />
                <span className="hover:text-white transition-colors cursor-pointer">+91 98765 43210</span>
              </li> */}
            </ul>
          </div>
        </div>

        {/* 4. BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Blazing Render Creation Hub LLP. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-brc-orange transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brc-orange transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

// --- Helper Components ---

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      onClick={(e) => e.preventDefault()} // <--- This stops the redirect/jump
      className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer"
    >
      <span className="w-0 h-[1px] bg-brc-orange group-hover:w-3 transition-all duration-300" />
      <span className="group-hover:translate-x-1 transition-transform duration-300">
        {children}
      </span>
    </a>
  </li>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <motion.a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5, rotate: 5, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brc-orange hover:text-white transition-colors duration-300 border border-white/10 hover:border-brc-orange shadow-lg shadow-transparent hover:shadow-orange-500/20"
  >
    {icon}
  </motion.a>
);