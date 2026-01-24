import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";

const services = [
  "Web Development",
  "Mobile App",
  "SaaS / MVP",
  "Digital Marketing",
  "UI/UX Design",
  "Other"
];

export const Contact = () => {
  return (
    <section id="contact" className="relative py-24 bg-brc-black">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brc-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brc-orange font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              Get in Touch
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Let's Build Something <br />
              <span className="text-gray-600">Legendary.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg"
            >
              Ready to start? Tell us about your project and we will get back to you within 24 hours.
            </motion.p>
          </div>

          {/* Form Container */}
          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brc-orange/50 transition-colors"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Your Email</label>
                <input 
                  type="email" 
                  placeholder="john@company.com" 
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brc-orange/50 transition-colors"
                />
              </div>

            </div>

            {/* Service Selection */}
            <div className="mb-8">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider block mb-4">I'm interested in...</label>
              <div className="flex flex-wrap gap-3">
                {services.map((service) => (
                  <label key={service} className="cursor-pointer">
                    <input type="checkbox" className="peer sr-only" />
                    <span className="inline-block px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white peer-checked:bg-brc-orange peer-checked:text-white peer-checked:border-brc-orange transition-all duration-300 select-none text-sm font-medium">
                      {service}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-2 mb-10">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Project Details</label>
              <textarea 
                rows={4}
                placeholder="Tell us about your idea, budget, and timeline..." 
                className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brc-orange/50 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button size="lg" className="w-full md:w-auto min-w-[200px] group">
                Send Message <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
              <p className="text-xs text-gray-600 mt-4">
                By clicking send, you agree to our privacy policy. No spam, ever.
              </p>
            </div>

          </motion.form>

        </div>
      </div>
    </section>
  );
};