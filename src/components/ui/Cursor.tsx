import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Cursor = () => {
  // 1. Track Mouse Position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // 2. Add Physics (Spring)
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") || 
        target.closest("a") ||
        target.classList.contains("cursor-pointer");

      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body { cursor: none; }
          /* Ensure modal content also hides default cursor */
          .cursor-none, a, button, input, textarea { cursor: none; }
        }
      `}</style>

      {/* FIX: Increased z-index to 100000 to sit above the Modal (which is z-9999) */}
      <div className="pointer-events-none fixed inset-0 z-[100000] hidden md:block">
        
        {/* 1. THE ORBIT */}
        <motion.div
          className="absolute rounded-full border border-brc-orange/50"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            height: isHovering ? 60 : 24,
            width: isHovering ? 60 : 24,
            opacity: isHovering ? 1 : 0.5,
            backgroundColor: isHovering ? "rgba(255, 87, 34, 0.1)" : "transparent",
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />

        {/* 2. THE CORE */}
        <motion.div
          className="absolute h-2 w-2 rounded-full bg-brc-orange"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isHovering ? 0 : 1,
          }}
        />
      </div>
    </>
  );
};