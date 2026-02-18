import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects"; // Ensure Project type is exported
import { SpotlightTiltCard as TiltCard } from "../components/ui/SpotlightTiltCard";
import { SEO } from "../components/SEO";

// Categories for the filter bar
const categories = ["All", "SaaS", "Web", "App", "Design"];

export const AllProjects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- FILTER LOGIC ---
  const filteredProjects = projects.filter(project => 
    activeCategory === "All" ? true : project.category === activeCategory
  );

  // --- SPLIT LOGIC ---
  const caseStudyIds = ["itat-analyser", "powerbird", "legalvala-web", "graphic-design-portfolio", "vedic-astro"];
  const caseStudies = filteredProjects.filter(p => caseStudyIds.includes(p.id));
  const otherProjects = filteredProjects.filter(p => !caseStudyIds.includes(p.id));

  // --- SHARED CARD COMPONENT ---
  const ProjectCardContent = ({ project }: { project: typeof projects[0] }) => {
    
    // LOGIC: Only show arrow if there is somewhere to go (Case Study OR Live URL)
    const showArrow = caseStudyIds.includes(project.id) || project.liveUrl;

    return (
      <TiltCard className="h-full flex flex-col group">
        {/* Image Area */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white uppercase tracking-wider">
               {project.category}
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="p-6 flex flex-col flex-grow bg-white/[0.02] border-t border-white/5 rounded-b-2xl">
          <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-brc-orange transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-6 line-clamp-2">
            {project.description}
          </p>
          
          <div className="mt-auto flex items-center justify-between">
             {/* Tech Stack Bubbles */}
             <div className="flex -space-x-2">
                {project.stack.slice(0, 3).map((tech, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-[10px] text-gray-300 font-mono" title={tech}>
                        {tech.charAt(0)}
                    </div>
                ))}
             </div>
             
             {/* Arrow Icon - Only render if showArrow is true */}
             {showArrow && (
               <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-brc-orange group-hover:text-white group-hover:border-brc-orange transition-all">
                  <ArrowUpRight size={18} />
               </div>
             )}
          </div>
        </div>
      </TiltCard>
    );
  };

  return (
    <>
      <SEO 
        title="BRC Hub | Premium Tech & Growth Agency"
        description="Premium softwares. Data-driven growth. BRC Hub partners with visionary brands to engineer world-class digital experiences. Web | App | SaaS | Marketing. Based in Toranagallu."
      />
    <div className="min-h-screen bg-brc-black pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16">
          <div>
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-brc-orange transition-colors mb-8 group">
               <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
               Back Home
            </Link>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">
              Our <span className="text-gray-600">Work.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              A collection of digital products, brands, and experiences we've crafted.
            </p>
          </div>

          {/* FILTER TABS */}
          <div className="w-full xl:w-auto">
              <div className="flex flex-wrap items-center justify-center md:justify-start xl:justify-end gap-2 bg-white/5 p-3 md:p-1.5 rounded-2xl md:rounded-full border border-white/10 w-full md:w-max">
                {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors flex-grow md:flex-grow-0 text-center ${activeCategory === cat ? "text-white" : "text-gray-400 hover:text-white"}`}
                >
                    {activeCategory === cat && (
                    <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-brc-orange rounded-full mix-blend-difference"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                    )}
                    <span className="relative z-10">{cat}</span>
                </button>
                ))}
              </div>
          </div>
        </div>

        {/* --- SECTION 1: FEATURED CASE STUDIES --- */}
        {caseStudies.length > 0 && (
          <div className="mb-24">
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-brc-orange pl-4">Featured Case Studies</h2>
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {caseStudies.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* --- THE FIX IS HERE --- */}
                    {/* Added state={{ from: "/work" }} so the Back button works correctly */}
                    <Link 
                      to={`/case-study/${project.id}`} 
                      state={{ from: "/work" }} 
                      className="block h-full"
                    >
                        <ProjectCardContent project={project} />
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* --- SECTION 2: MORE PROJECTS --- */}
        {otherProjects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-gray-600 pl-4">More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {otherProjects.map((project) => (
                  <motion.div 
                    key={project.id} 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                      {/* Logic: Link to Live URL if exists, otherwise static card */}
                      {project.liveUrl ? (
                         <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
                            <ProjectCardContent project={project} />
                         </a>
                      ) : (
                         <div className="block h-full cursor-default">
                            <ProjectCardContent project={project} />
                         </div>
                      )}
                  </motion.div>
               ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
           <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No projects found in this category yet.</p>
           </div>
        )}

      </div>
    </div>
    </>
  );
};