import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, CheckCircle2, ArrowUpRight, ArrowLeft, Send, Loader2, Check } from "lucide-react";
import { Button } from "./Button";
import { buildInquiryPayload, sendInquiryEmail } from "../../utils/sendEmail";

// --- 1. Internal Components (Input Field) ---
const ModalInput = ({ label, type = "text", ...props }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative mb-4 group w-full">
      <label 
        className={`absolute left-4 transition-all duration-300 pointer-events-none z-10
          ${isFocused || props.value ? "-top-2.5 text-[10px] text-brc-orange bg-[#0A0A0A] px-1" : "top-3.5 text-gray-500 text-sm"}
        `}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== "")}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brc-orange/50 transition-colors resize-none h-32"
        />
      ) : (
        <input
          type={type}
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== "")}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brc-orange/50 transition-colors"
        />
      )}
    </div>
  );
};

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: any; 
}

export const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<"details" | "inquiry">("details"); 
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  
  // Updated State to include phone and company
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "" });

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      if (window.innerWidth > 768) {
          const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
          document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = 'hidden';
      setView("details");
      setFormStatus("idle");
      setSubmitError("");
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => {
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '0px';
    }
  }, [isOpen]);

  useEffect(() => {
    if (view === "inquiry" && service) {
      setFormData(prev => ({
        ...prev,
        message: `Hi, I'm interested in the ${service.title} service. I would like to discuss...`
      }));
    }
  }, [view, service]);

  // --- PHONE VALIDATION HANDLER ---
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setFormData({ ...formData, phone: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setSubmitError("");

    try {
      const payload = buildInquiryPayload({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        phone: formData.phone,
        companyOrWebsite: formData.company,
        services: [service.title]
      });

      await sendInquiryEmail(payload);
      setFormStatus("success");
    } catch (error) {
      setFormStatus("error");
      setSubmitError(error instanceof Error ? error.message : "Failed to send request. Please try again.");
    }
  };

  if (!mounted || !service) return null;

  const portalRoot = document.getElementById("portal-root") || document.body;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
          />

          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 pointer-events-none">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="
                w-[90vw] md:w-full md:max-w-4xl 
                max-h-[85vh] md:max-h-[90vh] 
                bg-[#0A0A0A] border border-white/10 
                rounded-2xl md:rounded-3xl shadow-2xl 
                overflow-hidden flex flex-col pointer-events-auto relative 
              "
            >
               
               <AnimatePresence mode="wait">
                 
                 {/* === VIEW 1: DETAILS === */}
                 {view === "details" ? (
                   <motion.div 
                      key="details"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col h-full"
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
                        
                        <button 
                            onClick={onClose}
                            className="absolute top-3 right-3 md:top-4 md:right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-white/10 text-white transition-colors border border-white/5"
                        >
                            <X size={18} className="md:w-5 md:h-5" />
                        </button>
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,var(--color-brc-orange),transparent_70%)] pointer-events-none" />
                      </div>

                      {/* Content */}
                      <div className="p-4 md:p-10 overflow-y-auto custom-scrollbar flex-grow">
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
                            <Button onClick={() => setView("inquiry")} className="w-full md:w-auto py-2.5 text-sm md:text-base">
                                Discuss this Service <ArrowUpRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
                            </Button>
                        </div>
                      </div>
                   </motion.div>
                 ) : (
                   
                   /* === VIEW 2: INQUIRY FORM === */
                   <motion.div
                      key="inquiry"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex flex-col h-full bg-[#0A0A0A]"
                   >
                      <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                          <div className="flex items-center gap-4">
                              <button 
                                onClick={() => setView("details")}
                                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                              >
                                  <ArrowLeft size={20} />
                              </button>
                              <div>
                                  <h3 className="text-xl font-bold text-white">Let's Discuss</h3>
                                  <p className="text-xs text-brc-orange font-bold uppercase tracking-wider">{service.title}</p>
                              </div>
                          </div>
                          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white">
                              <X size={20} />
                          </button>
                      </div>

                      <div className="flex-grow p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col justify-center">
                          {formStatus === "success" ? (
                              <div className="text-center py-10">
                                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                                      <Check size={40} />
                                  </div>
                                  <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                                  <p className="text-gray-400 mb-8">We'll get back to you about your <b>{service.title}</b> needs shortly.</p>
                                  <Button onClick={onClose} variant="outline">Close Modal</Button>
                              </div>
                          ) : (
                              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full">
                                  {/* ROW 1: Name & Email */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <ModalInput 
                                        label="Your Name" 
                                        value={formData.name}
                                        onChange={(e:any) => setFormData({...formData, name: e.target.value})}
                                        required 
                                      />
                                      <ModalInput 
                                        label="Your Email" 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e:any) => setFormData({...formData, email: e.target.value})}
                                        required 
                                      />
                                  </div>

                                  {/* ROW 2: Phone & Company (Balanced) */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <ModalInput 
                                        label="Phone Number (10 Digits)" 
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handlePhoneChange} // Validated Input
                                      />
                                      <ModalInput 
                                        label="Company / Website (Optional)" 
                                        type="text"
                                        value={formData.company}
                                        onChange={(e:any) => setFormData({...formData, company: e.target.value})}
                                      />
                                  </div>

                                  <ModalInput 
                                    label="Tell us about your requirements..." 
                                    type="textarea" 
                                    value={formData.message}
                                    onChange={(e:any) => setFormData({...formData, message: e.target.value})}
                                    required
                                  />

                                  {formStatus === "error" && (
                                    <p className="mt-2 text-sm text-red-400">{submitError}</p>
                                  )}
                                  
                                  <div className="flex justify-end mt-6">
                                      <Button disabled={formStatus === "submitting"} className="w-full md:w-auto">
                                          {formStatus === "submitting" ? (
                                              <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Sending...</>
                                          ) : (
                                              <><Send className="mr-2 h-4 w-4"/> Send Request</>
                                          )}
                                      </Button>
                                  </div>
                              </form>
                          )}
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    portalRoot
  );
};
