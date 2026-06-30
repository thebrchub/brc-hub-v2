import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { 
  Code2, 
  Smartphone, 
  AppWindow, 
  Cloud, 
  Cpu, 
  Database, 
  ArrowUpRight 
} from "lucide-react";
import { ServiceModal } from "../ui/ServiceModal";
import { SpotlightTiltCard } from "../ui/SpotlightTiltCard"; 

const services = [
  {
    category: "Engineering",
    title: "Custom Software",
    description: "Build software tailored to unique business workflows.",
    longDescription: "We engineer proprietary systems for businesses that have outgrown generic software. Our custom builds ensure a precise fit for your operational logic, prioritizing security and long-term maintainability.",
    icon: <Code2 className="w-8 h-8" />,
    features: [
        "Architecture Design",
        "Legacy System Migration",
        "Workflow Automation",
        "High-Security Standards"
    ],
    tools: ["Python", "Node.js", "Go", "Java", "Docker"]
  },
  {
    category: "Engineering",
    title: "Web Applications",
    description: "Fast, secure and scalable business web applications.",
    longDescription: "Full-stack engineering for client portals, data dashboards, and internal web tools. We focus on clean architecture, fast load times, and reliable backend infrastructure.",
    icon: <AppWindow className="w-8 h-8" />,
    features: [
        "Client Portals",
        "Data Dashboards",
        "Internal Web Tools",
        "API Architecture"
    ],
    tools: ["React", "Next.js", "TypeScript", "PostgreSQL", "AWS"]
  },
  {
    category: "Engineering",
    title: "Mobile App Dev",
    description: "Native and cross-platform applications.",
    longDescription: "Reliable mobile software for iOS and Android. We build robust applications for field operations, internal business workflows, and complex consumer products.",
    icon: <Smartphone className="w-8 h-8" />,
    features: [
        "Native iOS & Android",
        "Cross-Platform Frameworks",
        "Offline Capabilities",
        "Secure Data Sync"
    ],
    tools: ["React Native", "Flutter", "Swift", "Kotlin", "SQLite"]
  },
  {
    category: "Product",
    title: "SaaS Development",
    description: "Cloud-based software products built for scale.",
    longDescription: "End-to-end architecture and development for Software-as-a-Service platforms. We handle complex requirements like multitenancy, cloud infrastructure, API integrations, and subscription billing logic.",
    icon: <Cloud className="w-8 h-8" />,
    features: [
        "Multi-tenant Architecture",
        "Cloud Infrastructure",
        "Subscription Billing Logic",
        "Third-party Integrations"
    ],
    tools: ["AWS", "Kubernetes", "Stripe", "Redis", "GraphQL"]
  },
  {
    category: "Automation",
    title: "AI & Automation",
    description: "Automate repetitive workflows and integrate AI where it creates real value.",
    longDescription: "We connect disparate software systems through custom API integrations and deploy AI to handle data processing. The goal is to eliminate manual data entry and reduce operational friction.",
    icon: <Cpu className="w-8 h-8" />,
    features: [
        "Custom API Integrations",
        "LLM Implementation",
        "Data Processing Pipeline",
        "System Interoperability"
    ],
    tools: ["OpenAI", "Python", "LangChain", "REST APIs", "Webhooks"]
  },
  {
    category: "Enterprise",
    title: "Enterprise Systems",
    description: "ERP, CRM, internal dashboards, portals and workflow management systems.",
    longDescription: "Heavy-duty architecture for large-scale operations. We help organizations centralize their data, manage resources, and streamline internal communications into a single, unified system.",
    icon: <Database className="w-8 h-8" />,
    features: [
        "Custom ERPs & CRMs",
        "Data Centralization",
        "Role-based Access Control",
        "Resource Management"
    ],
    tools: ["PostgreSQL", "Elasticsearch", "Microservices", "Docker", "GCP"]
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
            Core Competencies
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Engineering <br />
            <span className="text-gray-500">Business Software.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            We partner with companies that need custom technology to operate. 
            No marketing buzzwords, just secure, reliable software built to scale with your operations.
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
              className="h-full"
            >
              <SpotlightTiltCard
                onClick={() => setSelectedService(service)}
                intensity={25}
                spotlightColor="rgba(255, 87, 34, 0.2)"
                className="group h-full cursor-pointer"
              >
                <div className="p-8 h-full flex flex-col">
                    
                    {/* Icon Container */}
                    <div className="mb-6 relative z-10 p-3 bg-white/5 rounded-2xl w-fit border border-white/5 group-hover:border-brc-orange/30 group-hover:text-brc-orange text-gray-300 transition-colors shadow-lg shadow-transparent group-hover:shadow-brc-orange/10">
                    {service.icon}
                    </div>

                    <div className="relative z-10 flex-grow">
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

                    {/* Arrow Icon */}
                    <div className="absolute top-8 right-8 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowUpRight className="text-brc-orange w-5 h-5" />
                    </div>
                </div>
              </SpotlightTiltCard>
            </motion.div>
          ))}
        </motion.div>

        <ServiceModal 
            isOpen={!!selectedService} 
            onClose={() => setSelectedService(null)} 
            service={selectedService} 
        />

      </div>
    </section>
  );
};