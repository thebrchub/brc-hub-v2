import { useEffect } from "react";
import { SEO } from "../components/SEO";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Terms of Service" 
        description="Terms and conditions for using BRC Hub services."
      />
      
      {/* Animation Wrapper */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pt-32 pb-24 min-h-screen bg-brc-black text-gray-300"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-brc-orange mb-8 transition-colors group">
             <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
             Back Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-12">Last Updated: February 2026</p>

          <div className="space-y-12 text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and BRC Hub ("we," "us" or "our"), concerning your access to and use of the thebrchub.tech website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Representations</h2>
              <p>
                By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use.
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </>
  );
};