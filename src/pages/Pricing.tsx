
import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Code2,
  Globe,
  Layers3,
  Rocket,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { SpotlightTiltCard } from "../components/ui/SpotlightTiltCard";

// Illustrative reference rate. Update when required; this is not live FX data.
const WEBSITE_PRICE = {
  INR: "₹10,000",
  USD: "$120",
} as const;

type Currency = "INR" | "USD";

const starterFeatures = [
  "Professional, responsive website design",
  "Branding, colours and typography tailored to your business",
  "Clear presentation of your products and services",
  "Contact and customer enquiry options",
  "Search-friendly foundations",
  "Testing and launch assistance",
];

const developmentServices = [
  {
    icon: <Globe className="h-8 w-8" />,
    category: "Web Development",
    title: "Custom Websites",
    description:
      "Create a professional online presence that reflects your brand and helps customers understand what makes your business different.",
    examples: ["Business websites", "E-commerce", "Booking systems"],
  },
  {
    icon: <Layers3 className="h-8 w-8" />,
    category: "Application Engineering",
    title: "Web Applications",
    description:
      "Give your customers and team better digital experiences with interactive applications designed around your workflows.",
    examples: ["Client portals", "Dashboards", "Business tools"],
  },
  {
    icon: <Workflow className="h-8 w-8" />,
    category: "Software Engineering",
    title: "SaaS & Software",
    description:
      "Turn business challenges into practical software products, platforms and tools built around your goals.",
    examples: ["SaaS platforms", "Automation", "Integrations"],
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    category: "Product Development",
    title: "MVP Development",
    description:
      "Bring your product idea to life with an initial version that helps you validate demand and learn from real users.",
    examples: ["Startup MVPs", "Product prototypes", "Early releases"],
  },
];

const faqs = [
  {
    question: "What can I get for ₹10,000?",
    answer:
      "Our starting package is designed for businesses looking for a professional website. We discuss your business, preferred design, pages and goals before confirming the scope, so you know what your website will deliver.",
  },
  {
    question: "Can you design a website for my industry?",
    answer:
      "Absolutely. We can adapt the design and content approach for different businesses, from local service providers and consultants to shops, restaurants and growing companies. Your website should fit your business, not the other way around.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "The timeline depends on the website's scope, content readiness and functionality. Once we understand your requirements, we'll discuss a practical timeline before development begins.",
  },
  {
    question: "Can you build something more advanced than a website?",
    answer:
      "Yes. We develop custom web applications, SaaS platforms, business software and startup MVPs. These projects are scoped around your requirements, and we'll recommend a practical approach for your goals.",
  },
  {
    question: "Can you help after the website launches?",
    answer:
      "We can discuss ongoing maintenance, updates and future improvements based on what your business needs. We'll help you understand the available options and choose a suitable approach.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const Pricing = () => {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

const starterPrice = WEBSITE_PRICE[currency];

  const scrollToPricing = () => {
    document.getElementById("website-starter")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <SEO
        title="Pricing | Websites, Web Apps & Software"
        description="Build your business website with BRC Hub from ₹10,000. Explore website development, custom web applications, SaaS development and startup MVP services."
        url="/pricing"
      />

      <main className="min-h-screen overflow-hidden bg-brc-black pb-16">
        {/* HERO */}
        <section className="relative px-5 pb-14 pt-36 sm:px-6 md:pb-24 md:pt-44">
          <div className="pointer-events-none absolute left-1/2 top-16 h-72 w-[min(800px,100%)] -translate-x-1/2 rounded-full bg-brc-orange/[0.07] blur-[120px]" />

          <div className="container relative mx-auto max-w-5xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-[2rem] font-bold leading-[1.16] tracking-[0.025em] text-white sm:text-5xl md:text-7xl md:leading-[1.12]"
            >
              The right solution.
              <br />
              <span className="mt-1 block text-gray-600 sm:mt-0">
                A clear starting
                <span className="sm:hidden">
                  <br />
                </span>
                <span className="hidden sm:inline"> </span>
                point.
              </span>
            </motion.h1>

            {/* Desktop description only */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-6 hidden max-w-2xl text-base leading-7 text-gray-400 md:block md:text-lg"
            >
              Start with a professional business website or work with us to
              build something more ambitious. Clear solutions, thoughtful
              design and technology built around what your business needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-9"
            >
              <Link
                to="/contact-us"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brc-orange px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition-all hover:shadow-orange-500/20 active:scale-[0.98] sm:w-auto"
              >
                Let's Build Your Website
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <button
                type="button"
                onClick={scrollToPricing}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-white/20 hover:text-white sm:w-auto"
              >
                Explore Pricing
              </button>
            </motion.div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 text-xs text-gray-500 sm:flex-row sm:gap-x-6 md:mt-10">
              <span className="inline-flex items-center gap-2">
                <Check size={14} className="text-brc-orange" />
                A plan tailored to your business
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={14} className="text-brc-orange" />
                Clear scope before we begin
              </span>
            </div>
          </div>
        </section>

        {/* STARTER WEBSITE */}
        <section
          id="website-starter"
          className="scroll-mt-24 px-5 py-12 sm:px-6 md:py-20"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brc-orange">
                  Start here
                </p>

                <h2 className="font-display text-3xl font-bold tracking-[0.015em] text-white md:text-5xl">
                  Get your business online.
                </h2>

                <p className="mt-4 leading-7 text-gray-400">
                  Your business deserves a website that looks professional,
                  communicates clearly and gives customers a reason to get in
                  touch.
                </p>
              </div>

              {/* Currency toggle */}
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs font-medium text-gray-500">
                  Currency
                </span>

                <div
                  role="group"
                  aria-label="Choose pricing currency"
                  className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1"
                >
                  {(["INR", "USD"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={currency === option}
                      onClick={() => setCurrency(option)}
                      className={`min-w-14 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
                        currency === option
                          ? "bg-brc-orange text-white shadow-md shadow-orange-950/20"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <SpotlightTiltCard
              intensity={15}
              spotlightColor="rgba(255, 87, 34, 0.12)"
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brc-orange/[0.08] blur-[100px]" />

                <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="flex flex-col p-6 sm:p-8 md:p-10 lg:p-12">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-gray-300 shadow-lg transition-colors group-hover:border-brc-orange/30 group-hover:text-brc-orange">
                      <Globe className="h-8 w-8" />
                    </div>

                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Website Development
                    </span>

                    <h3 className="font-display text-2xl font-bold tracking-[0.015em] text-white md:text-3xl">
                      A solid foundation for your business.
                    </h3>

                    <p className="mt-4 max-w-xl leading-7 text-gray-400">
                      A professional website designed around your brand, your
                      customers and the way you want your business to grow.
                    </p>

                    <div
                      className="mt-8 flex flex-wrap items-end gap-x-3 gap-y-1"
                      aria-live="polite"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={currency}
                          initial={{ opacity: 0, y: 7 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -7 }}
                          transition={{ duration: 0.18 }}
                          className="font-display text-5xl font-bold tracking-[0.045em] text-white md:text-6xl"
                        >
                          {starterPrice}
                        </motion.span>
                      </AnimatePresence>

                      <span className="pb-2 text-sm text-gray-500">
                        starting price
                      </span>
                    </div>

                    

                    <p className="mt-4 text-sm leading-6 text-gray-400">
                      Not sure what your business needs? Tell us your idea.
                      We'll help you find the right approach.
                    </p>

                    <Link
                      to="/contact-us"
                      className="group/cta mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 self-start rounded-full bg-brc-orange px-7 py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-orange-950/40 sm:w-fit"
                    >
                      Let's Build Your Website
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover/cta:translate-x-1"
                      />
                    </Link>
                  </div>

                  <div className="border-t border-white/10 bg-black/20 p-6 sm:p-8 md:p-10 lg:border-l lg:border-t-0 lg:p-12">
                    <p className="mb-6 text-sm font-semibold text-white">
                      Everything to get you started
                    </p>

                    <ul className="space-y-5">
                      {starterFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm leading-6 text-gray-300"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brc-orange/25 bg-brc-orange/10 text-brc-orange">
                            <Check size={12} />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                      <p className="text-sm font-semibold text-white">
                        Have a bigger vision?
                      </p>
                      <p className="mt-2 text-sm leading-6 text-gray-400">
                        From additional functionality to complete digital
                        products, let's explore what makes sense for your
                        business.
                      </p>
                      <Link
                        to="/contact-us"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brc-orange transition-colors hover:text-white"
                      >
                        Tell us your idea
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightTiltCard>
          </div>
        </section>

        {/* CUSTOM DEVELOPMENT — TWO COLUMNS, TWO ROWS */}
        <section className="border-t border-white/5 px-5 py-16 sm:px-6 md:py-24">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brc-orange">
                  Built around your requirements
                </p>

                <h2 className="font-display text-3xl font-bold tracking-[0.015em] text-white md:text-5xl">
                  Beyond the basics.
                </h2>

                <p className="mt-4 leading-7 text-gray-400">
                  Have a bigger idea? We work with you to turn business
                  challenges and product ideas into practical digital
                  solutions.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Code2 size={17} className="text-brc-orange" />
                Made for your goals
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mx-auto grid w-full max-w-6xl grid-cols-1 auto-rows-fr gap-6 md:grid-cols-2"
            >
              {developmentServices.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="h-full"
                >
                  <SpotlightTiltCard
                    intensity={25}
                    spotlightColor="rgba(255, 87, 34, 0.2)"
                    className="group h-full"
                  >
                    <div className="relative flex h-full flex-col p-8 md:p-10">
                      <div className="relative z-10 mb-6 w-fit rounded-2xl border border-white/5 bg-white/5 p-3 text-gray-300 shadow-lg shadow-transparent transition-colors group-hover:border-brc-orange/30 group-hover:text-brc-orange group-hover:shadow-brc-orange/10">
                        {service.icon}
                      </div>

                      <div className="relative z-10 flex-grow">
                        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                          {service.category}
                        </span>

                        <h3 className="mb-3 font-display text-xl font-bold tracking-[0.015em] text-white transition-colors group-hover:text-brc-orange md:text-2xl">
                          {service.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-gray-400">
                          {service.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {service.examples.map((example) => (
                            <span
                              key={example}
                              className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 text-xs text-gray-400"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link
                        to="/contact-us"
                        className="relative z-10 mt-8 inline-flex items-center gap-2 self-start text-sm font-semibold text-white transition-colors hover:text-brc-orange"
                      >
                        Discuss your project
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </SpotlightTiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* OUR PROCESS */}
        <section className="px-5 py-12 sm:px-6 md:py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brc-orange">
                  Simple from day one
                </p>

                <h2 className="font-display text-3xl font-bold tracking-[0.015em] text-white md:text-4xl">
                  From idea to launch.
                </h2>

                <p className="mt-4 leading-7 text-gray-400">
                  No need to arrive with every technical detail figured out.
                  We'll work through the important decisions together.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                {[
                  {
                    number: "01",
                    title: "Tell us your idea",
                    text: "Share your business, your goals and what you'd like to achieve.",
                  },
                  {
                    number: "02",
                    title: "Plan the solution",
                    text: "We'll work out the right approach, deliverables and project plan together.",
                  },
                  {
                    number: "03",
                    title: "Bring it to life",
                    text: "We develop, test and prepare your agreed solution for launch.",
                  },
                ].map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <span className="font-mono text-sm text-brc-orange">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 py-16 sm:px-6 md:py-20">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-brc-orange">
                Good to know
              </p>

              <h2 className="font-display text-3xl font-bold tracking-[0.015em] text-white md:text-4xl">
                Frequently asked questions.
              </h2>
            </div>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div key={faq.question} className="py-1">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`pricing-faq-${index}`}
                      onClick={() =>
                        setOpenFaq(isOpen ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-5 py-5 text-left font-semibold text-white transition-colors hover:text-brc-orange"
                    >
                      <span>{faq.question}</span>

                      <ChevronDown
                        size={19}
                        className={`shrink-0 text-gray-400 transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180 text-brc-orange" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`pricing-faq-${index}`}
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: {
                              duration: 0.32,
                              ease: [0.22, 1, 0.36, 1],
                            },
                            opacity: { duration: 0.2 },
                          }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-3xl pb-5 pr-6 text-sm leading-7 text-gray-400">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-5 pb-12 pt-8 sm:px-6 md:pb-20">
          <div className="container mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] px-6 py-12 text-center sm:px-8 md:py-20">
              <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-96 max-w-full -translate-x-1/2 rounded-full bg-brc-orange/[0.08] blur-[90px]" />

              <div className="relative">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brc-orange">
                  Have a project in mind?
                </p>

                <h2 className="font-display text-3xl font-bold tracking-[0.025em] text-white md:text-5xl">
                  Let's build something
                  <br />
                  <span className="text-gray-600">
                    that moves you forward.
                  </span>
                </h2>

                <p className="mx-auto mt-5 hidden max-w-xl text-sm leading-7 text-gray-400 md:block md:text-base">
                  Tell us what your business needs. We'll help you find the
                  right solution and work out the next step.
                </p>

                <Link
                  to="/contact-us"
                  className="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brc-orange px-8 py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-orange-950/40 sm:w-auto"
                >
                  Let's Talk About Your Project
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Pricing;
