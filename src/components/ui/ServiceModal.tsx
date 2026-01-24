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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!mounted || !service) return null;

  // TELEPORT TO THE NEW 'portal-root' DIV
  // If it doesn't exist for some reason, fallback to body (safety net)
  const portalRoot = document.getElementById("portal-root") || document.body;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - High Z-Index to cover EVERYTHING */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
          />

          {/* Modal Container - Z-Index 9999 */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            
            {/* The Actual Card (Pointer events auto so you can click inside) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl max-h-[90vh] bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative"
            >
               
               {/* Header Image/Gradient */}
               <div className="h-32 bg-gradient-to-r from-brc-gray to-brc-black relative p-8 flex items-start justify-between shrink-0">
                  <div className="relative z-10 flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 text-brc-orange">
                          {service.icon}
                      </div>
                      <div>
                          <span className="text-brc-orange font-bold tracking-widest uppercase text-xs block mb-1">
                              {service.category}
                          </span>
                          <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                              {service.title}
                          </h3>
                      </div>
                  </div>
                  <button 
                      onClick={onClose}
                      className="relative z-10 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white transition-colors"
                  >
                      <X size={24} />
                  </button>

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,var(--color-brc-orange),transparent_70%)]" />
               </div>

               {/* Scrollable Content */}
               <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      {service.longDescription}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      <div>
                          <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                              <span className="w-1 h-6 bg-brc-orange rounded-full"/> What We Deliver
                          </h4>
                          <ul className="space-y-3">
                              {service.features.map((feature: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm">
                                      <CheckCircle2 size={16} className="text-brc-orange mt-0.5 flex-shrink-0" />
                                      {feature}
                                  </li>
                              ))}
                          </ul>
                      </div>
                      
                      {/* Tech Stack */}
                      <div className="bg-white/5 rounded-2xl p-6 border border-white/5 h-fit">
                           <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                              Tools & Tech
                           </h4>
                           <div className="flex flex-wrap gap-2">
                              {service.tools.map((tool: string) => (
                                  <span key={tool} className="px-3 py-1 bg-black rounded-lg border border-white/10 text-xs text-gray-400">
                                      {tool}
                                  </span>
                              ))}
                           </div>
                      </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-white/5 mt-auto">
                      <Button onClick={onClose} className="w-full md:w-auto">
                          Discuss this Service <ArrowUpRight className="ml-2 w-4 h-4" />
                      </Button>
                  </div>
               </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    portalRoot // <--- Send it to the safe zone
  );
};