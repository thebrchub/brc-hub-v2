import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { SpotlightTiltCard as TiltCard } from "../ui/SpotlightTiltCard";
// Import the central data file
import { projects } from "../../data/projects";

// Sub-component for individual project rows
const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax Scroll Logic
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Image moves slightly faster than scroll for depth effect
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
      {/* 1. THE IMAGE SIDE (Wrapped in TiltCard & Linked) */}
      <div className={`h-[300px] md:h-[450px] ${index % 2 === 1 ? 'md:order-2' : ''}`}>
         <Link to={`/case-study/${project.id}`} state={{ from: "/" }}>
             <TiltCard className="h-full w-full cursor-pointer">
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
         </Link>
      </div>

      {/* 2. Project Details */}
      <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-brc-orange" />
            <span className="text-brc-orange font-bold tracking-widest uppercase text-xs">
                {project.category}
            </span>
        </div>
        
        <Link to={`/case-study/${project.id}`} state={{ from: "/" }}>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 group-hover:text-gray-200 transition-colors cursor-pointer">
                {project.title}
            </h3>
        </Link>
        
        <p className="text-gray-400 text-lg leading-relaxed mb-8">
            {project.description}
        </p>

        {/* Tags (Mapped from 'stack' in data) */}
        <div className="flex flex-wrap gap-3 mb-8">
            {project.stack.map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 text-sm text-gray-400 bg-white/5">
                    {tag}
                </span>
            ))}
        </div>

        <Link to={`/case-study/${project.id}`} state={{ from: "/" }}>
            <Button variant="outline" className="group/btn border-white/20 hover:bg-white hover:text-black">
                View Case Study <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </Button>
        </Link>
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
                {/* CHANGED HEADING HERE */}
                Featured <span className="text-gray-600">Projects.</span>
              </motion.h2>
           </div>
           
           {/* CHANGED SCROLL TEXT TO CLICKABLE LINK */}
           <div className="hidden md:block mb-4">
              <Link to="/work" className="group flex items-center gap-2 text-gray-500 hover:text-brc-orange transition-colors text-sm tracking-widest uppercase border-b border-gray-800 hover:border-brc-orange pb-2">
                  View All Projects 
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
           </div>
        </div>

        {/* Dynamic Projects List - LIMITED TO FIRST 5 */}
        <div className="relative z-10">
            {projects.slice(0, 5).map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>

        {/* 'More Work' Button (Kept at bottom too for mobile/convenience) */}
        <div className="flex justify-center mt-12">
            <Link to="/work">
                <Button size="lg" className="px-12">
                    View All Projects
                </Button>
            </Link>
        </div>

      </div>
    </section>
  );
};