import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { Link as ScrollLink } from 'react-scroll';
import { TextDecrypt } from "../ui/TextDecrypt";
// 1. IMPORT THE NEW GRID
import { InteractiveGrid } from "../ui/InteractiveGrid";

export const Hero = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brc-black pt-20">
      
      {/* --- NEW INTERACTIVE BACKGROUND --- */}
      <InteractiveGrid />

      {/* Vignette Overlay (To blend edges into black) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_90%)] z-10 pointer-events-none" />

      {/* 2. CONTENT */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-brc-orange animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-medium font-sans">
              We are BRC Hub
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
          <div className="flex flex-wrap justify-center gap-x-4">
             <TextDecrypt text="Code That Performs." />
          </div>
          <div className="text-white flex flex-wrap justify-center gap-x-4 mt-2">
            <span>Marketing That</span> 
            <span className="text-brc-orange">
                <TextDecrypt text="Converts." />
            </span>
          </div>
        </div>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-sans font-light"
        >
          A full-cycle digital agency merging creative engineering with data-driven growth strategies. 
          We don't just build products; we build businesses.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
           <ScrollLink to="contact" smooth={true} duration={800} offset={-50}>
              <Button size="lg" className="w-full sm:w-auto shadow-2xl shadow-orange-500/10 hover:shadow-orange-500/30">
                Start a Project
              </Button>
          </ScrollLink>
          
          <ScrollLink to="work" smooth={true} duration={800} offset={-50}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/10 hover:bg-white/5 text-gray-300 hover:text-white">
                View Our Work
              </Button>
          </ScrollLink>
        </motion.div>

      </div>
    </section>
  );
};