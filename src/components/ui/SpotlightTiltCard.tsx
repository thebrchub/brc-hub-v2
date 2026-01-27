import React, { useRef } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useMotionTemplate, 
  type HTMLMotionProps
} from "framer-motion";

interface SpotlightTiltCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  spotlightColor?: string;
}

export const SpotlightTiltCard = ({ 
  children, 
  className = "", 
  intensity = 20, 
  spotlightColor = "rgba(255, 87, 34, 0.2)", 
  ...props 
}: SpotlightTiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // FIX: Initialize to 0.5 (Center) instead of 0 (Top-Left)
  const x = useMotionValue(0.5); 
  const y = useMotionValue(0.5);
  
  const mouseX = useMotionValue(0); 
  const mouseY = useMotionValue(0); 

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(springY, [0, 1], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(springX, [0, 1], [`-${intensity}deg`, `${intensity}deg`]);

  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    x.set(clientX / width);
    y.set(clientY / height);
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const handleMouseLeave = () => {
    // Reset to center (flat) on leave
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transform-gpu transition-all duration-200 ${className}`}
      {...props}
    >
      <div className="relative z-10 h-full overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
        
        <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: spotlightBackground }}
        />

        <div className="relative z-20 h-full">
            {children}
        </div>
      </div>
    </motion.div>
  );
};