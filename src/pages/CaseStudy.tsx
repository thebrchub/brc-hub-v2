import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/projects';
import { Button } from '../components/ui/Button';
import { SEO } from "../components/SEO";

// --- HELPER: INFINITE MARQUEE ROW ---
const MarqueeRow = ({ images, reverse = false }: { images: string[]; reverse?: boolean }) => {
  return (
    <div className="flex overflow-hidden relative w-full mb-6 last:mb-0 group">
       <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-brc-black to-transparent z-10" />
       <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-brc-black to-transparent z-10" />
       
       <motion.div
         className="flex gap-6 min-w-max"
         initial={{ x: reverse ? "-50%" : "0%" }}
         animate={{ x: reverse ? "0%" : "-50%" }}
         transition={{
           repeat: Infinity,
           ease: "linear",
           duration: 80, 
         }}
       >
         {[...images, ...images, ...images].map((img, i) => (
            <div key={i} className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-xl overflow-hidden border border-white/10 shrink-0 transition-all duration-500 hover:scale-[1.02]">
              <img src={img} alt="Gallery Item" className="w-full h-full object-cover" />
            </div>
         ))}
       </motion.div>
    </div>
  );
};

// --- ANIMATION VARIANTS FOR SMOOTH SLIDER ---
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export const CaseStudy = () => {
  const { id } = useParams();
  const location = useLocation();
  const project = projects.find((p) => p.id === id);
  
  // --- CAROUSEL STATE ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // We need direction to know which way to slide (+1 for next, -1 for prev)
  const [direction, setDirection] = useState(0); 

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0); 
    setDirection(0);
  }, [id]);

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center text-white">Project not found</div>;
  }

  const backPath = location.state?.from === "/work" ? "/work" : "/";
  const backText = location.state?.from === "/work" ? "Back to Projects" : "Back to Home";
  const backState = backPath === "/" ? { scrollTo: "work" } : {};

  const galleryImages = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.image];

  const isDesignShowcase = project.category === "Design" && galleryImages.length > 3;

  const halfIndex = Math.ceil(galleryImages.length / 2);
  const row1Images = galleryImages.slice(0, halfIndex);
  const row2Images = galleryImages.slice(halfIndex).reverse(); 

  // --- UPDATED HANDLERS ---
  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  // Preload next/prev images to reduce network lag
  useEffect(() => {
    if(!isDesignShowcase && galleryImages.length > 1) {
       const nextIdx = (currentImageIndex + 1) % galleryImages.length;
       const prevIdx = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
       new Image().src = galleryImages[nextIdx];
       new Image().src = galleryImages[prevIdx];
    }
  }, [currentImageIndex, galleryImages, isDesignShowcase]);

  return (
    <>
      <SEO 
        title={project.title} 
        description={project.description}
        image={project.image} 
        url={`/case-study/${project.id}`}
      />
    <div className="pt-32 pb-20 min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-6">
        
        {/* BACK BUTTON */}
        <Link 
            to={backPath}
            state={backState}
            className="inline-flex items-center text-gray-400 hover:text-brc-orange transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          {backText}
        </Link>

        {/* 1. HERO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="px-4 py-1.5 rounded-full border border-brc-orange/30 bg-brc-orange/10 text-brc-orange text-sm font-bold tracking-wider uppercase">
                {project.category}
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 leading-relaxed max-w-3xl"
            >
              {project.fullDescription}
            </motion.p>
          </div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8 backdrop-blur-sm"
          >
              <div>
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Client</h3>
                  <p className="text-white text-lg font-medium">{project.client}</p>
              </div>
              <div>
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Timeline</h3>
                  <p className="text-white text-lg font-medium">{project.timeline}</p>
              </div>
              <div>
                  <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Core Tech</h3>
                  <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((tech, i) => (
                         <span key={i} className="px-3 py-1 rounded bg-black/40 border border-white/10 text-gray-300 text-xs font-mono">
                            {tech}
                         </span>
                      ))}
                  </div>
              </div>
          </motion.div>
        </div>

        {/* --- 2. DYNAMIC GALLERY SECTION (UPDATED) --- */}
        {isDesignShowcase ? (
            <div className="mb-24 -mx-6 md:-mx-0">
               <MarqueeRow images={row1Images} reverse={false} />
               {row2Images.length > 0 && (
                   <MarqueeRow images={row2Images} reverse={true} />
               )}
            </div>
        ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video mb-24 group select-none bg-brc-black"
            >
              {/* Removed 'wait' mode for simultaneous slide animation */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.img 
                  key={currentImageIndex}
                  src={galleryImages[currentImageIndex]} 
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0 w-full h-full object-cover" // Absolute is CRITICAL for overlapping
                  alt={`${project.title} screenshot`}
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />

              {galleryImages.length > 1 && (
                <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 border border-white/10 text-white hover:bg-brc-orange hover:border-brc-orange transition-all backdrop-blur-md opacity-0 group-hover:opacity-100 z-20">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 border border-white/10 text-white hover:bg-brc-orange hover:border-brc-orange transition-all backdrop-blur-md opacity-0 group-hover:opacity-100 z-20">
                        <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {galleryImages.map((_, idx) => (
                            <div key={idx} className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-brc-orange' : 'bg-white/30'}`} />
                        ))}
                    </div>
                </>
              )}
              
              {project.liveUrl && (
                <div className="absolute bottom-6 right-6 z-30">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="shadow-xl bg-white text-black hover:bg-gray-200 border-none">
                            Visit Live Site <ExternalLink size={14} className="ml-2" />
                        </Button>
                    </a>
                </div>
              )}
            </motion.div>
        )}

        {/* 3. CHALLENGE & SOLUTION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-500 pl-4">The Challenge</h3>
            <p className="text-gray-400 text-lg leading-relaxed">{project.challenge}</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-green-500 pl-4">The Solution</h3>
            <p className="text-gray-400 text-lg leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* 4. RESULTS */}
        <div className="bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-bold text-white mb-8">Key Results</h4>
              <ul className="space-y-4">
                {project.results.map((result, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="text-brc-orange shrink-0 mt-1" size={20} />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-8">Full Tech Stack</h4>
              <div className="flex flex-wrap gap-3">
                {project.stack.map((tech, i) => (
                  <span key={i} className="px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-gray-300 text-sm font-medium hover:border-brc-orange/50 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. CTA BOTTOM */}
        <div className="mt-24 text-center">
            <h3 className="text-3xl font-display font-bold text-white mb-8">Ready to build something similar?</h3>
            <Link to="/" state={{ scrollTo: "contact" }}>
                <Button size="lg" className="rounded-full px-10 h-16 text-lg">
                    Start Your Project
                    <ArrowRight className="ml-2" />
                </Button>
            </Link>
        </div>

      </div>
    </div>
    </>
  );
};