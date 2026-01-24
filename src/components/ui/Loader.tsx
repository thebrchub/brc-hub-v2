import { useEffect } from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  onLoadingComplete: () => void;
}

export const Loader = ({ onLoadingComplete }: LoaderProps) => {
  
  // 1. SAFETY TIMEOUT: If animation hangs, force finish after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  // 2. CLEANUP HTML LOADER (Just in case)
  useEffect(() => {
    const htmlLoader = document.getElementById("initial-loader");
    if (htmlLoader) {
      htmlLoader.style.pointerEvents = "none";
      htmlLoader.style.opacity = "0";
      setTimeout(() => htmlLoader.remove(), 500);
    }
  }, []);

  return (
    <motion.div
      // 3. THE MAGIC FIX: 'pointer-events-none'
      // This ensures that even if this div gets stuck on screen, 
      // you can click EVERYTHING underneath it.
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0A0A] pointer-events-none"
      
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-[100px] h-[100px] flex items-center justify-center">
        
        {/* React Ring */}
        <motion.div 
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-brc-orange/30 border-t-brc-orange"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            exit={{ opacity: 0, scale: 0 }}
        />

        {/* The Logo */}
        <motion.div
          layoutId="brand-logo"
          className="relative z-10 flex items-center justify-center w-[70px] h-[70px]"
        >
          <motion.div
            style={{
                backgroundImage: "url('/logo.svg')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                height: "100%"
            }}
            
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut",
            }}
            
            onAnimationComplete={() => {
               onLoadingComplete();
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};