import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../ui/Button";

// 1. Reusable "Tech" Input Component (Laser Focus)
const TechInput = ({ label, type = "text", ...props }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-2 group">
      {/* Label that moves */}
      <label 
        className={`absolute left-4 transition-all duration-300 pointer-events-none z-10
          ${isFocused || props.value ? "-top-2.5 text-xs text-brc-orange bg-brc-black px-1" : "top-4 text-gray-500"}
        `}
      >
        {label}
      </label>

      {/* Input Field */}
      {type === "textarea" ? (
        <textarea
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== "")}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:bg-white/[0.05] transition-colors resize-none h-32"
        />
      ) : (
        <input
          type={type}
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== "")}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:bg-white/[0.05] transition-colors"
        />
      )}

      {/* The "Laser" Border Effect */}
      <div 
        className={`absolute bottom-0 left-0 h-[2px] bg-brc-orange transition-all duration-500 ease-out z-20 rounded-b-xl
          ${isFocused ? "w-full opacity-100" : "w-0 opacity-0"}
        `} 
      />
      {/* Glow Shadow */}
      <div 
        className={`absolute bottom-0 left-0 w-full h-10 bg-brc-orange/20 blur-xl transition-opacity duration-500 pointer-events-none
          ${isFocused ? "opacity-100" : "opacity-0"}
        `} 
      />
    </div>
  );
};

const services = [
  "Web Development",
  "Mobile App",
  "SaaS / MVP",
  "Digital Marketing",
  "UI/UX Design",
  "Other"
];

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  return (
    <section id="contact" className="relative py-24 bg-brc-black border-t border-white/5 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brc-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
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
              className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT SIDE: Contact Info (Clean & Simple) */}
          <div className="lg:col-span-4 space-y-8 lg:pt-10">
             <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6 font-display">Contact Info</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 text-gray-300 group cursor-pointer hover:text-white transition-colors">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-brc-orange group-hover:bg-brc-orange group-hover:text-white transition-colors">
                      <Mail size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Email Us</p>
                        <span className="font-medium">info@brchub.tech</span>
                    </div>
                  </div>

                  {/* <div className="flex items-start gap-4 text-gray-300 group cursor-pointer hover:text-white transition-colors">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-brc-orange group-hover:bg-brc-orange group-hover:text-white transition-colors">
                      <Phone size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Call Us</p>
                        <span className="font-medium">+91 98765 43210</span>
                    </div>
                  </div> */}

                  <div className="flex items-start gap-4 text-gray-300 group cursor-pointer hover:text-white transition-colors">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-brc-orange group-hover:bg-brc-orange group-hover:text-white transition-colors">
                      <MapPin size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Visit Us</p>
                        <span className="font-medium">Toranagallu, Ballari, Karnataka, India</span>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* RIGHT SIDE: The Form (Combined Tech Inputs + Pill Select) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-2xl"
          >
             <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Name (Laser Input) */}
                  <TechInput 
                    label="Your Name" 
                    value={formData.name}
                    onChange={(e: any) => setFormData({...formData, name: e.target.value})}
                  />
                  {/* Email (Laser Input) */}
                  <TechInput 
                    label="Your Email" 
                    type="email"
                    value={formData.email}
                    onChange={(e: any) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                {/* Service Pills (From Old Code - Kept because it's great UX) */}
                <div className="mb-8">
                    <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider block mb-4">I'm interested in...</label>
                    <div className="flex flex-wrap gap-3">
                        {services.map((service) => (
                            <label key={service} className="cursor-pointer group">
                                <input type="checkbox" className="peer sr-only" />
                                <span className="inline-block px-5 py-2.5 rounded-full border border-white/10 bg-black/40 text-gray-400 
                                    group-hover:bg-white/10 group-hover:text-white 
                                    peer-checked:bg-brc-orange peer-checked:text-white peer-checked:border-brc-orange peer-checked:shadow-[0_0_15px_rgba(255,87,34,0.4)]
                                    transition-all duration-300 select-none text-sm font-medium">
                                    {service}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
                
                {/* Message (Laser Input) */}
                <TechInput 
                  label="Tell us about your project..." 
                  type="textarea"
                  value={formData.message}
                  onChange={(e: any) => setFormData({...formData, message: e.target.value})}
                />

                {/* Submit Area */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-gray-500 order-2 md:order-1 text-center md:text-left">
                        By sending this, you agree to our <span className="underline hover:text-white cursor-pointer">Privacy Policy</span>.
                    </p>
                    <Button size="lg" className="w-full md:w-auto min-w-[200px] order-1 md:order-2 group">
                        Send Message 
                        <Send size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                </div>
             </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};