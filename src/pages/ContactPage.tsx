import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { buildInquiryPayload, sendInquiryEmail } from "../utils/sendEmail";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SEO } from "../components/SEO";

// --- 1. Reusable "Tech" Input Component (Same as Contact.tsx) ---
const TechInput = ({ label, type = "text", ...props }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-2 group w-full">
      <label 
        className={`absolute left-4 transition-all duration-300 pointer-events-none z-10
          ${isFocused || props.value ? "-top-2.5 text-xs text-brc-orange bg-brc-black px-1" : "top-4 text-gray-500"}
        `}
      >
        {label}
      </label>

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

      <div 
        className={`absolute bottom-0 left-0 h-[2px] bg-brc-orange transition-all duration-500 ease-out z-20 rounded-b-xl
          ${isFocused ? "w-full opacity-100" : "w-0 opacity-0"}
        `} 
      />
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

export const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  // Force scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    if (value.length > 10) return;
    setFormData({ ...formData, phone: value });
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setSubmitError("");

    if (formData.phone.length > 0 && formData.phone.length !== 10) {
        setFormStatus("error");
        setSubmitError("Please enter a valid 10-digit number or leave it blank.");
        return;
    }

    try {
      const payload = buildInquiryPayload({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        phone: formData.phone,
        companyOrWebsite: formData.company,
        services: selectedServices
      });

      await sendInquiryEmail(payload);
      setSubmittedName(formData.name);
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setSelectedServices([]);
    } catch (error) {
      setFormStatus("error");
      setSubmitError(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us | BRC Hub"
        description="Start your project with BRC Hub. Contact us for premium web development, app solutions, and digital growth strategies."
        url="/contact-us"
      />
      
      <div className="bg-brc-black min-h-screen flex flex-col justify-between">
        <Navbar />

        {/* MAIN CONTENT WRAPPER (Padding for Fixed Nav) */}
        <div className="pt-32 pb-20 flex-grow relative overflow-hidden">
            
            {/* Background Ambience (Same as Section) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brc-orange/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                
                {/* Header Section */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-brc-orange font-bold tracking-widest uppercase text-sm mb-4 block"
                    >
                    Get in Touch
                    </motion.span>
                    <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                    >
                    Let's Build Something <br />
                    <span className="text-gray-600">Legendary.</span>
                    </motion.h1>
                    <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 text-lg"
                    >
                    Ready to start? Tell us about your project and we will get back to you within 24 hours.
                    </motion.p>
                </div>

                {/* LAYOUT GRID */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
                
                    {/* LEFT COLUMN */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="w-full lg:w-1/3 flex flex-col gap-6"
                    >
                        {/* Contact Card */}
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

                        {/* DESKTOP Steps */}
                        <div className="hidden lg:flex flex-col justify-center p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm flex-grow">
                            <h3 className="text-xl font-bold text-white mb-6 font-display">What happens next?</h3>
                            <ul className="space-y-8">
                                <li className="flex gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brc-orange/10 text-brc-orange flex items-center justify-center font-bold text-sm border border-brc-orange/20">1</span>
                                    <div>
                                        <h4 className="text-white font-medium text-sm">We analyze your request</h4>
                                        <p className="text-gray-500 text-xs mt-1">Our team reviews your requirements within 24 hours.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brc-orange/10 text-brc-orange flex items-center justify-center font-bold text-sm border border-brc-orange/20">2</span>
                                    <div>
                                        <h4 className="text-white font-medium text-sm">Free Consultation</h4>
                                        <p className="text-gray-500 text-xs mt-1">We schedule a quick call to discuss strategy & budget.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="w-full lg:w-2/3 bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-2xl flex flex-col relative overflow-hidden min-h-[600px]"
                    >
                        <AnimatePresence mode="wait">
                            {formStatus === "success" ? (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20 bg-brc-black/50 backdrop-blur-md"
                                >
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                        className="w-24 h-24 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-6 border border-green-500/50"
                                    >
                                        <CheckCircle2 size={48} />
                                    </motion.div>
                                    <h3 className="text-3xl font-display font-bold text-white mb-2">Message Received!</h3>
                                    <p className="text-gray-400 max-w-md">
                                        Thanks for reaching out, {submittedName || 'Partner'}. Our team is reviewing your details and will get back to you within 24 hours.
                                    </p>
                                    <Button 
                                        onClick={() => {
                                        setFormStatus("idle");
                                        setSubmitError("");
                                        }}
                                        variant="outline" 
                                        className="mt-8 border-white/20"
                                    >
                                        Send Another Message
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.form 
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="h-full flex flex-col justify-between"
                                >
                                    <div>
                                        {/* ROW 1 */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <TechInput 
                                                label="Your Name" 
                                                required
                                                value={formData.name}
                                                onChange={(e: any) => setFormData({...formData, name: e.target.value})}
                                            />
                                            <TechInput 
                                                label="Your Email" 
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e: any) => setFormData({...formData, email: e.target.value})}
                                            />
                                        </div>

                                        {/* ROW 2 */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                            <TechInput 
                                                label="Phone Number (Optional)" 
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handlePhoneChange}
                                            />
                                            <TechInput 
                                                label="Company / Website (Optional)" 
                                                type="text"
                                                value={formData.company}
                                                onChange={(e: any) => setFormData({...formData, company: e.target.value})}
                                            />
                                        </div>

                                        <div className="mb-8">
                                            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider block mb-4">I'm interested in...</label>
                                            <div className="flex flex-wrap gap-3">
                                                {services.map((service) => (
                                                    <label key={service} className="cursor-pointer group">
                                                        <input 
                                                            type="checkbox" 
                                                            className="peer sr-only" 
                                                            checked={selectedServices.includes(service)}
                                                            onChange={() => toggleService(service)}
                                                        />
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
                                        
                                        <TechInput 
                                            label="Tell us about your project..." 
                                            type="textarea"
                                            required
                                            value={formData.message}
                                            onChange={(e: any) => setFormData({...formData, message: e.target.value})}
                                        />

                                        {formStatus === "error" && (
                                            <p className="mt-4 text-sm text-red-400 bg-red-400/10 p-2 rounded border border-red-400/20 text-center">
                                                {submitError}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <p className="text-xs text-gray-500 order-2 md:order-1 text-center md:text-left">
                                            By sending this, you agree to our <Link to="/privacy-policy" className="underline hover:text-white cursor-pointer">Privacy Policy</Link>.
                                        </p>
                                        <Button 
                                            disabled={formStatus === "submitting"}
                                            size="lg" 
                                            className="w-full md:w-auto min-w-[200px] order-1 md:order-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {formStatus === "submitting" ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message 
                                                    <Send size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* MOBILE ONLY Steps */}
                    <div className="lg:hidden p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-white mb-6 font-display">What happens next?</h3>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brc-orange/10 text-brc-orange flex items-center justify-center font-bold text-sm border border-brc-orange/20">1</span>
                                <div>
                                    <h4 className="text-white font-medium text-sm">We analyze your request</h4>
                                    <p className="text-gray-500 text-xs mt-1">Our team reviews your requirements within 24 hours.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brc-orange/10 text-brc-orange flex items-center justify-center font-bold text-sm border border-brc-orange/20">2</span>
                                <div>
                                    <h4 className="text-white font-medium text-sm">Free Consultation</h4>
                                    <p className="text-gray-500 text-xs mt-1">We schedule a quick call to discuss strategy & budget.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                
                </div>
            </div>
        </div>
      </div>
    </>
  );
};