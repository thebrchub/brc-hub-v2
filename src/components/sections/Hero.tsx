
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { TextDecrypt } from "../ui/TextDecrypt";
import { InteractiveGrid } from "../ui/InteractiveGrid";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-brc-black px-0 pt-16 sm:pt-20"
    >
      {/* Interactive background */}
      <InteractiveGrid />

      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_90%)]" />

      {/* Hero content */}
      <div className="container relative z-20 mx-auto px-4 text-center sm:px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-5 flex justify-center sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brc-orange" />
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 sm:text-[11px]">
              We are BRC Hub
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="mb-5 font-display text-[2rem] font-bold leading-[1.16] tracking-[0.015em] text-white sm:mb-8 sm:text-5xl sm:leading-[1.1] md:text-7xl lg:text-8xl">
          <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-4">
            <TextDecrypt text="Code That Performs." />
          </div>

          <div className="mt-1 flex flex-wrap justify-center gap-x-2 text-white sm:mt-2 sm:gap-x-4">
            <span>Technology That</span>
            <span className="text-brc-orange">
              <TextDecrypt text="Delivers." />
            </span>
          </div>
        </div>

        {/* Shorter description — same meaning, less visual clutter */}
        {/* Subheadline */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
  className="mx-auto mb-7 max-w-2xl px-4 font-sans font-light text-gray-400 sm:mb-12"
>
  {/* Mobile description */}
  <p className="mx-auto max-w-[390px] text-[15px] leading-relaxed sm:hidden">
  We build custom software and AI-powered digital products that turn ideas into scalable solutions.
</p>

  {/* Desktop and tablet description */}
  <p className="hidden text-lg leading-relaxed sm:block md:text-xl">
    We design and build custom software, web applications and        
    AI-powered solutions that transform ideas into scalable digital products.
  </p>
</motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <ScrollLink
            to="contact"
            smooth={true}
            duration={800}
            offset={-50}
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full shadow-2xl shadow-orange-500/10 hover:shadow-orange-500/30 sm:w-auto"
            >
              Start a Project
            </Button>
          </ScrollLink>

          <ScrollLink
            to="work"
            smooth={true}
            duration={800}
            offset={-50}
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full border-white/10 text-gray-300 hover:bg-white/5 hover:text-white sm:w-auto"
            >
              View Our Work
            </Button>
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
};
