import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Code2, Smartphone, BarChart3, Globe, ArrowUpRight, Search, Megaphone } from "lucide-react";
import { ServiceModal } from "../ui/ServiceModal";

// UPDATED DATA STRUCTURE with details for the Modal
const services = [
  {
    category: "Engineering",
    title: "Web & Platforms",
    description: "High-performance websites and complex SaaS platforms built for scale.",
    longDescription: "We build digital foundations that last. Whether it's a high-conversion marketing site or a complex enterprise dashboard, we use modern frameworks to ensure speed, security, and scalability.",
    icon: <Code2 className="w-8 h-8" />,
    features: [
        "Custom React / Next.js Development",
        "Enterprise CMS Solutions",
        "Progressive Web Apps (PWA)",
        "API Architecture & Integration"
    ],
    tools: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind"]
  },
  {
    category: "Engineering",
    title: "Mobile App Dev",
    description: "Native and Cross-platform apps that offer seamless user experiences.",
    longDescription: "Mobile is not an afterthought; it's a primary channel. We build silky smooth mobile applications that feel native on every device, powered by robust backends.",
    icon: <Smartphone className="w-8 h-8" />,
    features: [
        "iOS & Android Development",
        "Cross-Platform (React Native/Flutter)",
        "App Store Optimization (ASO)",
        "Real-time Features & Chat"
    ],
    tools: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"]
  },
  {
    category: "Growth",
    title: "Performance & Leads",
    description: "ROI-focused campaigns. We turn ad spend into measurable revenue.",
    longDescription: "Stop burning cash on vanity metrics. Our performance marketing strategies are mathematically designed to lower your CAC and increase your ROAS. We hunt for leads that actually convert.",
    icon: <BarChart3 className="w-8 h-8" />,
    features: [
        "Meta Ads (Facebook/Instagram)",
        "Google Search & Display Ads",
        "B2B Lead Generation Funnels",
        "Conversion Rate Optimization (CRO)"
    ],
    tools: ["Google Ads", "Meta Business", "LinkedIn Ads", "GA4", "HubSpot"]
  },
  {
    category: "Growth",
    title: "SEO & Visibility",
    description: "Dominate search results with data-driven SEO and content strategies.",
    longDescription: "Being found is half the battle. We implement technical SEO and content architectures that signal authority to Google, driving organic traffic that compounds over time.",
    icon: <Search className="w-8 h-8" />,
    features: [
        "Technical Website Audits",
        "Keyword Strategy & Mapping",
        "On-Page & Off-Page Optimization",
        "Local SEO Dominance"
    ],
    tools: ["Semrush", "Ahrefs", "Google Search Console", "Screaming Frog"]
  },
  {
    category: "Brand & Social",
    title: "Social & Branding",
    description: "Visual identities and social strategies that build community and trust.",
    longDescription: "Your brand is what people say when you're not in the room. We craft memorable visual identities and social narratives that turn passive followers into active community members.",
    icon: <Megaphone className="w-8 h-8" />,
    features: [
        "Brand Identity & Logo Design",
        "Social Media Management",
        "Content Creation (Reels/Shorts)",
        "Community Building"
    ],
    tools: ["Figma", "Adobe Suite", "Canva", "Buffer"]
  },
  {
    category: "Creative",
    title: "3D & Motion",
    description: "Cinematic 3D visuals and motion graphics to make your brand impossible to ignore.",
    longDescription: "In a noisy world, motion grabs attention. We create stunning 3D product renders and motion graphics that explain complex ideas in seconds.",
    icon: <Globe className="w-8 h-8" />,
    features: [
        "3D Product Rendering",
        "WebGL Web Experiences",
        "Motion Graphics for Ads",
        "Lottie Animations"
    ],
    tools: ["Blender", "Three.js", "After Effects", "Spline"]
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

export const Services = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section id="services" className="relative py-24 bg-brc-black border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-20 max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-brc-orange font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Our Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
          >
            We Build Digital <br />
            <span className="text-gray-500">Empires.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            A full-stack approach to growth. We merge engineering precision with marketing psychology.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedService(service)} // OPEN MODAL ON CLICK
              className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/5 overflow-hidden hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(255,87,34,0.15),transparent_60%)] pointer-events-none" />

              <div className="mb-6 relative z-10 p-3 bg-white/5 rounded-2xl w-fit border border-white/5 group-hover:border-brc-orange/30 group-hover:text-brc-orange text-gray-300 transition-colors">
                {service.icon}
              </div>

              <div className="relative z-10">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  {service.category}
                </span>
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-brc-orange transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>

              <div className="absolute top-8 right-8 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowUpRight className="text-brc-orange w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* THE MODAL COMPONENT */}
        <ServiceModal 
            isOpen={!!selectedService} 
            onClose={() => setSelectedService(null)} 
            service={selectedService} 
        />

      </div>
    </section>
  );
};