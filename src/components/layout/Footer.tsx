import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brc-black pt-24 pb-12 overflow-hidden border-t border-white/5">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brc-orange/50 to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brc-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* 1. MASSIVE CTA SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
          <div className="max-w-3xl">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Have an idea? <br />
              <span className="text-gray-500">Let's build it.</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-xl">
              From high-performance code to strategic marketing campaigns. 
              We are the bridge between your vision and market dominance.
            </p>
          </div>
          
          <div className="flex-shrink-0">
             <Button size="lg" className="h-20 px-10 text-xl rounded-full shadow-2xl shadow-orange-500/10">
               Start a Project
             </Button>
          </div>
        </div>

        {/* 2. MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
                {/* LOGO ADDED HERE */}
                <img 
                    src="/logo.svg" 
                    alt="BRC Hub" 
                    className="h-10 w-auto object-contain" 
                />
                <span className="font-display text-2xl font-bold text-white">
                    BRC <span className="text-brc-orange">Hub</span>
                </span>
            </div>
            <p className="text-gray-400 leading-relaxed pr-6">
              A full-cycle digital agency merging creative engineering with data-driven marketing. We don't just build products; we build businesses.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <SocialIcon icon={<Instagram size={20} />} href="#" />
              <SocialIcon icon={<Linkedin size={20} />} href="#" />
              <SocialIcon icon={<Twitter size={20} />} href="#" />
            </div>
          </div>

          {/* Links Column 1: ENGINEERING */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="font-display text-lg font-semibold text-white mb-6">Engineering</h4>
            <ul className="space-y-4">
              <FooterLink href="/services/web">Web Development</FooterLink>
              <FooterLink href="/services/app">Mobile Apps</FooterLink>
              <FooterLink href="/services/saas">SaaS Platforms</FooterLink>
              <FooterLink href="/services/ai">AI Solutions</FooterLink>
            </ul>
          </div>

          {/* Links Column 2: MARKETING */}
          <div className="md:col-span-2">
            <h4 className="font-display text-lg font-semibold text-white mb-6">Growth</h4>
            <ul className="space-y-4">
              <FooterLink href="/services/marketing">Digital Marketing</FooterLink>
              <FooterLink href="/services/branding">Brand Identity</FooterLink>
              <FooterLink href="/services/seo">SEO & Content</FooterLink>
              <FooterLink href="/services/social">Social Media</FooterLink>
            </ul>
          </div>

          {/* Links Column 3: CONTACT */}
          <div className="md:col-span-3">
            <h4 className="font-display text-lg font-semibold text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 group cursor-pointer hover:text-brc-orange transition-colors">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span>Toranagallu, Ballari (Dist.),<br/>Karnataka, India 583123</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group cursor-pointer hover:text-brc-orange transition-colors">
                <Mail size={20} />
                <span>info@thebrchub.tech</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group cursor-pointer hover:text-brc-orange transition-colors">
                <Phone size={20} />
                <span>+91 99999 99999</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Blazing Render Creation Hub LLP. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

// --- Helper Components ---

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link 
      to={href} 
      className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300"
    >
      <span className="w-0 h-[1px] bg-brc-orange group-hover:w-3 transition-all duration-300" />
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <motion.a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -3 }}
    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brc-orange hover:text-white transition-all duration-300 border border-white/10"
  >
    {icon}
  </motion.a>
);