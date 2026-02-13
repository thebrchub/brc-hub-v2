import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "../components/ui/Button";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-brc-black flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decor (Subtle Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_90%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        
        {/* Animated 404 Text */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="font-display font-bold text-[120px] md:text-[180px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 select-none"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
              Lost in the <span className="text-brc-orange">Digital Void?</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              The page you are looking for doesn't exist or has been moved. 
              Let's get you back to shipping code.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <Button size="lg" className="px-8 shadow-xl shadow-orange-500/10">
                  <Home className="mr-2 w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              
              <Link to="/" state={{ scrollTo: "contact" }}>
                <Button variant="outline" size="lg" className="border-white/10 hover:bg-white hover:text-black">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Contact Support
                </Button>
              </Link>
            </div>
        </motion.div>
      </div>
    </div>
  );
};