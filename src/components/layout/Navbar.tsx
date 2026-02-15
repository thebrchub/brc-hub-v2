import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Services', to: 'services' },
    { name: 'Work', to: 'work' },
    { name: 'Contact', to: 'contact' },
  ];

  // 1. Scroll Control Logic
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        if (!open) setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, open]);

  // 2. LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleNavClick = (targetId: string) => {
    setOpen(false);
    if (!isHomePage) {
        navigate("/", { state: { scrollTo: targetId } });
    }
  };

  const handleLogoClick = () => {
    if (isHomePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        navigate("/", { state: { scrollTo: "hero" } });
    }
  };

  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 w-full z-50 overflow-visible
          py-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">

          {/* LOGO */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer relative z-50"
            onClick={handleLogoClick}
          >
            <div>
                <img src="/logo.svg" alt="BRC Hub" className="h-10 w-auto object-contain sm:h-12" />
            </div>
            
            <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }} 
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white block"
            >
                BRC <span className="text-brc-orange">Hub</span>
            </motion.span>
          </div>

          {/* DESKTOP NAV */}
          <nav 
            className={`
              hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              items-center gap-1 p-1.5 rounded-full z-40 transition-all duration-300
              bg-white/5 backdrop-blur-xl border border-white/10 
              shadow-lg shadow-black/20 ring-1 ring-white/5
            `}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((item, index) => {
                const linkClasses = "relative px-5 py-2 text-sm text-gray-400 font-medium hover:text-white cursor-pointer transition-colors duration-200 z-10 block";
                
                return isHomePage ? (
                    <ScrollLink
                        key={item.name}
                        to={item.to}
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={800}
                        onMouseEnter={() => setHoveredIndex(index)}
                        className={linkClasses}
                        activeClass="!text-white font-semibold"
                    >
                        {item.name}
                        {hoveredIndex === index && (
                            <motion.span
                            layoutId="hover-pill"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 rounded-full -z-10 bg-white/10"
                            />
                        )}
                    </ScrollLink>
                ) : (
                    <div
                        key={item.name}
                        onClick={() => handleNavClick(item.to)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        className={linkClasses}
                    >
                        {item.name}
                        {hoveredIndex === index && (
                            <motion.span
                            layoutId="hover-pill"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 rounded-full -z-10 bg-white/10"
                            />
                        )}
                    </div>
                );
            })}
          </nav>

          {/* CTA & MOBILE MENU BUTTON */}
          <div className="flex items-center gap-4 flex-shrink-0 z-50">
            <div className="hidden md:block">
                {isHomePage ? (
                    <ScrollLink to="contact" smooth={true} duration={800} offset={-50}>
                        <button className="group relative px-6 py-2.5 rounded-full text-sm font-bold overflow-hidden transition-transform active:scale-95 shadow-lg bg-brc-orange text-white hover:shadow-orange-500/20">
                            <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
                            Start Project <ChevronRight size={14} />
                            </span>
                        </button>
                    </ScrollLink>
                ) : (
                    <button 
                        onClick={() => handleNavClick("contact")}
                        className="group relative px-6 py-2.5 rounded-full text-sm font-bold overflow-hidden transition-transform active:scale-95 shadow-lg bg-brc-orange text-white hover:shadow-orange-500/20"
                    >
                        <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
                        Start Project <ChevronRight size={14} />
                        </span>
                    </button>
                )}
            </div>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-full transition text-white bg-white/10 border border-white/10 hover:bg-white/20"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* UPDATED: Added touch-none to prevent background interaction */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] touch-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              // UPDATED: Changed h-full to h-[100dvh] to fix the mobile lifting issue
              className="fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-[#0A0A0A] border-l border-white/10 z-[70] shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-white/5 bg-white/[0.02]">
                <span className="text-sm font-bold tracking-widest uppercase text-gray-500">Menu</span>
                <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-white/10 text-white transition"><X size={24} /></button>
              </div>

              {/* Mobile Links */}
              {/* UPDATED: Added overscroll-contain to stop scroll chaining */}
              <nav className="flex flex-col px-6 py-8 gap-2 flex-grow overflow-y-auto overscroll-contain">
                {navLinks.map((item, i) => (
                    isHomePage ? (
                        <ScrollLink 
                            key={item.name} 
                            to={item.to} 
                            smooth={true} 
                            offset={-50} 
                            duration={800} 
                            onClick={() => setOpen(false)}
                        >
                            <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex items-center justify-between p-4 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer border border-transparent hover:border-white/5 transition-all"
                            >
                            <span className="text-lg font-medium">{item.name}</span>
                            <ChevronRight size={16} className="text-gray-600 group-hover:text-brc-orange transition-colors" />
                            </motion.div>
                        </ScrollLink>
                    ) : (
                        <div 
                            key={item.name} 
                            onClick={() => handleNavClick(item.to)}
                        >
                            <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex items-center justify-between p-4 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer border border-transparent hover:border-white/5 transition-all"
                            >
                            <span className="text-lg font-medium">{item.name}</span>
                            <ChevronRight size={16} className="text-gray-600 group-hover:text-brc-orange transition-colors" />
                            </motion.div>
                        </div>
                    )
                ))}
              </nav>

              {/* Mobile Footer / CTA */}
              <div className="p-6 border-t border-white/10 bg-white/[0.02]">
                  {isHomePage ? (
                     <ScrollLink to="contact" smooth={true} duration={800} offset={-50} onClick={() => setOpen(false)}>
                        <button className="w-full group relative px-6 py-4 rounded-xl text-base font-bold overflow-hidden transition-transform active:scale-95 shadow-lg bg-brc-orange text-white">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Start Project <ChevronRight size={18} />
                            </span>
                        </button>
                     </ScrollLink>
                  ) : (
                     <button 
                        onClick={() => handleNavClick("contact")}
                        className="w-full group relative px-6 py-4 rounded-xl text-base font-bold overflow-hidden transition-transform active:scale-95 shadow-lg bg-brc-orange text-white"
                     >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Start Project <ChevronRight size={18} />
                        </span>
                     </button>
                  )}
              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};