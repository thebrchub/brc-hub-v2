import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/Button";
import { SpotlightTiltCard as TiltCard } from "../ui/SpotlightTiltCard";

// Placeholder Data
const projects = [
  {
    title: "Orvexa Systems",
    category: "SaaS Platform",
    description: "A comprehensive HRMS and payroll solution built for enterprise scalability. Features real-time analytics and AI-driven insights.",
    tags: ["React", "Node.js", "Dashboard Design"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Vedic Astro AI",
    category: "Mobile Application",
    description: "An AI-powered astrology app delivering hyper-personalized horoscopes. Ranked #1 in Lifestyle category.",
    tags: ["React Native", "AI/ML", "Consumer App"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "LVC LegalVala",
    category: "Corporate Website",
    description: "High-performance marketing website with 3D interactions and a custom CMS for a leading legal consultancy.",
    tags: ["Web Dev", "SEO", "3D Motion"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax Scroll Logic
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-24 md:mb-32 last:mb-0"
    >
      {/* 2. THE IMAGE SIDE (Now Wrapped in TiltCard) */}
      <div className={`h-[300px] md:h-[450px] ${index % 2 === 1 ? 'md:order-2' : ''}`}>
         {/* We use TiltCard here. 
            It handles the rounded corners, border, and the 3D hover effect automatically.
         */}
         <TiltCard className="h-full w-full">
            <motion.div 
                style={{ y, scale: 1.1 }} 
                className="absolute w-full h-[140%] -top-[20%] left-0" 
            >
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            </motion.div>
         </TiltCard>
      </div>

      {/* 3. Project Details */}
      <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-brc-orange" />
            <span className="text-brc-orange font-bold tracking-widest uppercase text-xs">
                {project.category}
            </span>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 group-hover:text-gray-200 transition-colors">
            {project.title}
        </h3>
        
        <p className="text-gray-400 text-lg leading-relaxed mb-8">
            {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
            {project.tags.map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 text-sm text-gray-400 bg-white/5">
                    {tag}
                </span>
            ))}
        </div>

        <Button variant="outline" className="group/btn border-white/20 hover:bg-white hover:text-black">
            View Case Study <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export const Work = () => {
  return (
    <section id="work" className="relative py-24 bg-brc-black">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-6">
           <div className="max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Selected <span className="text-gray-600">Work.</span>
              </motion.h2>
           </div>
           <div className="hidden md:block mb-4">
              <span className="text-gray-500 text-sm tracking-widest uppercase border-b border-gray-800 pb-2">
                  Scroll to explore
              </span>
           </div>
        </div>

        {/* Projects List */}
        <div className="relative z-10">
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
            ))}
        </div>

        {/* 'More Work' Button */}
        <div className="flex justify-center mt-12">
            <Button size="lg" className="px-12">
                View All Projects
            </Button>
        </div>

      </div>
    </section>
  );
};