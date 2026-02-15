import { motion } from 'framer-motion';
import { Quote, Star, BadgeCheck } from 'lucide-react';
import { SpotlightTiltCard } from "../ui/SpotlightTiltCard"; 
import { testimonials } from '../../data/testimonials';

// Helper for Stars with a subtle glow
const Stars = () => (
  <div className="flex gap-1 mb-4 md:mb-6"> {/* Reduced margin on mobile */}
    {[...Array(5)].map((_, i) => (
      <div key={i}>
        <Star size={16} className="fill-brc-orange text-brc-orange drop-shadow-[0_0_8px_rgba(255,87,34,0.5)] md:w-[18px] md:h-[18px]" />
      </div>
    ))}
  </div>
);

// The Individual Card Component
const TestimonialCard = ({ item }: { item: typeof testimonials[0] }) => (
  // --- RESPONSIVE FIXES HERE ---
  // Mobile: w-[300px] (Fits screen), Desktop: w-[400px]
  <div className="w-[300px] md:w-[400px] h-[380px] md:h-[400px] shrink-0"> 
      <SpotlightTiltCard
        intensity={10}
        spotlightColor="rgba(255, 87, 34, 0.2)"
        className="h-full"
      >
        <div className="relative p-6 md:p-8 h-full flex flex-col bg-white/[0.02] backdrop-blur-sm group select-none">
          
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-brc-orange/50 transition-all duration-500" />
          <Quote className="absolute top-6 right-6 md:top-8 md:right-8 text-white/[0.03] group-hover:text-brc-orange/10 transition-colors duration-500 rotate-12 scale-125 md:scale-150 transform origin-top-right" size={60} />

          <Stars />
          
          {/* Responsive Text Size: text-sm/base on mobile, text-lg on desktop */}
          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6 md:mb-8 relative z-10 font-light">
            "{item.content}"
          </p>

          <div className="flex items-center gap-4 md:gap-5 mt-auto relative z-10">
            <div className="relative">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-brc-orange transition-colors duration-300">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 md:w-4 md:h-4 bg-brc-black rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-sm md:text-base group-hover:text-brc-orange transition-colors duration-300">
                {item.name}
              </h4>
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wide font-bold mt-0.5 md:mt-1">
                {item.role}, <span className="text-white">{item.company}</span>
              </p>
            </div>
          </div>

        </div>
      </SpotlightTiltCard>
  </div>
);

export const Testimonials = () => {
  // Create a longer list by duplicating the original data 4 times to ensure smooth looping
  const marqueeList = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-20 md:py-32 bg-brc-black relative overflow-hidden">
      
      {/* 1. TECHNICAL BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-brc-black via-transparent to-brc-black pointer-events-none" />

      {/* 2. AMBIENT GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-brc-orange/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-fluid relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brc-orange text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md"
          >
            <BadgeCheck size={14} />
            Client Success Stories
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
              <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
                Real results from <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
                  real businesses.
                </span>
              </h2>
          </motion.div>
        </div>

        {/* --- INFINITE MARQUEE --- */}
        <div className="relative w-full overflow-hidden">
            {/* Gradient Masks (Fade edges) */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-40 bg-gradient-to-r from-brc-black to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-40 bg-gradient-to-l from-brc-black to-transparent z-20 pointer-events-none" />

            <motion.div 
                className="flex gap-6 md:gap-8 w-max pl-6 md:pl-8"
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{ 
                    repeat: Infinity, 
                    ease: "linear", 
                    duration: 60 // Keeps the same smooth speed
                }}
            >
                {marqueeList.map((item, index) => (
                    <TestimonialCard key={index} item={item} />
                ))}
            </motion.div>
        </div>

      </div>
    </section>
  );
};