import { Button } from "../ui/Button";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brc-black pt-20">
      
      {/* 1. BACKGROUND EFFECTS (Refined for Deep Black) */}
      <div className="absolute inset-0 z-0">
        
        {/* The Spotlight (Top Center) - Subtle hint of light from above */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brc-orange/20 blur-[120px] rounded-full opacity-40 pointer-events-none" />

        {/* The Cyber Grid - Very faint */}
        <div 
            className="absolute inset-0 opacity-[0.07]" 
            style={{
                backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
            }}
        />
        
        {/* Vignette - Forces the edges to be pure black */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#0A0A0A_90%)] z-10 pointer-events-none" />
      </div>

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

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
        >
          Solutions That Work, <br />
          <span className="text-white">
            Code That <span className="text-brc-orange">Performs.</span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-sans font-light"
        >
          Fueling businesses with smart tech. We turn ideas into high-performance 
          digital realities. From start-ups to enterprise — we build the future.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="w-full sm:w-auto shadow-2xl shadow-orange-500/10 hover:shadow-orange-500/30">
            Start a Project
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/10 hover:bg-white/5 text-gray-300 hover:text-white">
            View Our Work
          </Button>
        </motion.div>

      </div>
    </section>
  );
};