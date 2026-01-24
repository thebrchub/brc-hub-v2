import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Button } from "./Button";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: any; 
}

export const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (isOpen) {
      // FIX: Only add padding on DESKTOP (width > 768px).
      // On mobile, adding padding to body creates the huge gap you saw.
      if (window.innerWidth > 768) {
          const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
          document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Standard scroll lock
      document.body.style.overflow = 'hidden';
    } else {
      // RESET
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    return () => {
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '0px';
    }
  }, [isOpen]);

  if (!mounted || !service) return null;

  const portalRoot = document.getElementById("portal-root") || document.body;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 pointer-events-none">
            
            {/* The Actual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              // MOBILE SIZE FIX:
              // w-[90vw] -> Ensures it never exceeds viewport width
              // max-w-[90%] -> Safety cap
              className="
                w-[90vw] md:w-full md:max-w-4xl 
                max-h-[80vh] md:max-h-[90vh] 
                bg-[#0A0A0A] border border-white/10 
                rounded-2xl md:rounded-3xl shadow-2xl 
                overflow-hidden flex flex-col pointer-events-auto relative 
                selection:bg-brc-orange selection:text-white
              "
            >
               
               {/* Header */}
               <div className="min-h-[6rem] md:min-h-[8rem] h-auto bg-gradient-to-r from-brc-gray to-brc-black relative p-4 md:p-8 flex items-start justify-between shrink-0">
                  <div className="relative z-10 flex items-start gap-3 md:gap-4 pr-8"> 
                      <div className="hidden md:block p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 text-brc-orange shrink-0">
                          {service.icon}
                      </div>
                      <div>
                          <span className="text-brc-orange font-bold tracking-widest uppercase text-[10px] md:text-xs block mb-1">
                              {service.category}
                          </span>
                          <h3 className="font-display text-lg md:text-3xl font-bold text-white leading-tight">
                              {service.title}
                          </h3>
                      </div>
                  </div>
                  
                  {/* Close Button */}
                  <button 
                      onClick={onClose}
                      className="absolute top-3 right-3 md:top-4 md:right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-white/10 text-white transition-colors border border-white/5"
                  >
                      <X size={18} className="md:w-5 md:h-5" />
                  </button>

                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,var(--color-brc-orange),transparent_70%)] pointer-events-none" />
               </div>

               {/* Content */}
               <div className="p-4 md:p-10 overflow-y-auto custom-scrollbar">
                  <p className="text-gray-300 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                      {service.longDescription}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-10">
                      <div>
                          <h4 className="text-white font-bold mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                              <span className="w-1 h-5 md:h-6 bg-brc-orange rounded-full"/> What We Deliver
                          </h4>
                          <ul className="space-y-2 md:space-y-3">
                              {service.features.map((feature: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2 md:gap-3 text-gray-400 text-xs md:text-sm">
                                      <CheckCircle2 size={14} className="text-brc-orange mt-0.5 flex-shrink-0 md:w-4 md:h-4" />
                                      {feature}
                                  </li>
                              ))}
                          </ul>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/5 h-fit">
                           <h4 className="text-white font-bold mb-3 md:mb-4 text-xs md:text-sm uppercase tracking-wider">
                              Tools & Tech
                           </h4>
                           <div className="flex flex-wrap gap-2">
                             {service.tools.map((tool: string) => (
                                 <span key={tool} className="px-2 py-1 md:px-3 md:py-1 bg-black rounded-lg border border-white/10 text-[10px] md:text-xs text-gray-400">
                                     {tool}
                                 </span>
                             ))}
                           </div>
                      </div>
                  </div>

                  <div className="flex justify-end pt-4 md:pt-6 border-t border-white/5 mt-auto">
                      <Button onClick={onClose} className="w-full md:w-auto py-2.5 text-sm md:text-base">
                          Discuss this Service <ArrowUpRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
                      </Button>
                  </div>
               </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    portalRoot
  );
};