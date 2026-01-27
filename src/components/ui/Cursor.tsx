import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Cursor = () => {
  // 1. RAW POSITION (No Spring = No Lag)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 2. Smooth Scale Only (For the hover effect)
  const scale = useMotionValue(1); 
  const scaleSpring = useSpring(scale, { damping: 20, stiffness: 400, mass: 0.1 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Direct update - minimal overhead
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer");

      scale.set(isInteractive ? 1.2 : 1);
    };

    const handleMouseDown = () => scale.set(0.9);
    const handleMouseUp = (e: MouseEvent) => checkHover(e); 

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", checkHover, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", checkHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, scale]);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-[100000] hidden md:block">
        <motion.div
          className="absolute top-0 left-0 will-change-transform"
          style={{
            x: cursorX, // Direct binding (No Spring)
            y: cursorY, // Direct binding (No Spring)
            scale: scaleSpring, 
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
          >
            <path
              d="M3 3L10.07 21.23L12.8 12.8L21.23 10.07L3 3Z"
              className="fill-brc-orange stroke-black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </>
  );
};