import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Zap, Users, Heart } from "lucide-react";
import { SpotlightTiltCard } from "../ui/SpotlightTiltCard";

// Stats Data
const stats = [
  { label: "Projects Completed", value: 25, suffix: "+" },
  { label: "Happy Clients", value: 20, suffix: "+" },
  { label: "Years Experience", value: 2, suffix: "+" },
  { label: "Cups of Coffee", value: 500, suffix: "+" },
];

// Values Data
const values = [
  {
    icon: <Zap className="text-brc-orange" />,
    title: "Lightning Fast",
    desc: "We don't just write code; we optimize for speed. Every millisecond counts."
  },
  {
    icon: <CheckCircle2 className="text-brc-orange" />,
    title: "Pixel Perfect",
    desc: "If it's not aligned, it's not approved. We obsess over every detail."
  },
  {
    icon: <Users className="text-brc-orange" />,
    title: "Client-Centric",
    desc: "Your business goals are our command. We build what you actually need."
  },
  {
    icon: <Heart className="text-brc-orange" />,
    title: "Built with Love",
    desc: "Passion is our fuel. We treat every project like it's our own startup."
  }
];

// Helper Component for the Number Counter
const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
        <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-white block mb-2">
            {isInView ? (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {value}{suffix}
                </motion.span>
            ) : "0"}
        </span>
    );
};

export const About = () => {
  return (
    <section id="about" className="relative py-24 bg-brc-black overflow-hidden border-t border-white/5">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            
            {/* Left: The Manifesto */}
            <div>
                <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-brc-orange font-bold tracking-widest uppercase text-sm mb-4 block"
                >
                    Who We Are
                </motion.span>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
                >
                    Rooted in Passion, <br />
                    <span className="text-gray-600">Growing with Purpose.</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 text-lg leading-relaxed mb-8"
                >
                    We are not just a team of coders; we are a collective of dreamers and doers. 
                    BRC Hub was born from a simple idea: that technology shouldn't just function—it should 
                    inspire. We merge the precision of engineering with the soul of creative design.
                </motion.p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <Counter value={stat.value} suffix={stat.suffix} />
                            <span className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: The Values Grid (Tech + Marketing Mindset) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((item, index) => (
                    <SpotlightTiltCard
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        intensity={15} 
                        // FIX: Explicitly set a bright, visible orange spotlight
                        spotlightColor="rgba(255, 87, 34, 0.4)" 
                        className="h-full"
                    >
                        <div className="p-6 h-full flex flex-col group relative z-20">
                            <div className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-brc-orange/50 transition-all duration-300 shadow-lg shadow-black/20">
                                {item.icon}
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-brc-orange transition-colors">
                                {item.title}
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </SpotlightTiltCard>
                ))}
            </div>

        </div>

        {/* Bottom Tagline - UPDATED FOR TECH + MARKETING */}
        <div className="text-center pt-12 border-t border-white/5">
            <p className="font-display text-2xl md:text-3xl text-gray-500">
                "We don't just build Technology. We build <span className="text-white">Growth</span>."
            </p>
        </div>

      </div>
    </section>
  );
};