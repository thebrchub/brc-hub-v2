import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Cursor = () => {
  // 1. RAW POSITION
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false); // New State for Middle Click

  // 2. SMOOTH SCALE
  const scale = useMotionValue(1); 
  const scaleSpring = useSpring(scale, { damping: 20, stiffness: 400, mass: 0.1 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
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
        !!target.closest("button") || 
        !!target.closest("a") ||      
        target.classList.contains("cursor-pointer");

      setIsHovering(isInteractive);
      scale.set(isInteractive ? 1.1 : 1);
    };

    const handleMouseDown = (e: MouseEvent) => {
        // Check for Middle Click (Button 1)
        if (e.button === 1) {
            setIsScrolling(true);
            scale.set(1.2);
            // We DO NOT preventDefault here anymore, allowing the native scroll to happen.
            return; 
        }
        // Normal Left Click
        scale.set(0.9);
    };

    const handleMouseUp = () => {
        setIsScrolling(false);
        scale.set(1);
    };

    // Add 'mousedown' to window
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
    <div className="pointer-events-none fixed inset-0 z-[100000] hidden md:block">
      <motion.div
        className="absolute top-0 left-0 will-change-transform"
        style={{
          x: cursorX, 
          y: cursorY, 
          scale: scaleSpring, 
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
        >
          {isScrolling ? (
             // --- SCROLL ICON (Middle Click) ---
             <g transform="translate(2, 2)">
                <circle cx="10" cy="10" r="10" className="fill-brc-orange/20 stroke-brc-orange" strokeWidth="1.5" />
                <path d="M10 6L10 14M10 6L7 9M10 6L13 9M10 14L7 11M10 14L13 11" className="stroke-brc-orange" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
             </g>
          ) : isHovering ? (
            // --- HAND ICON (Hover) ---
            <path
              d="M14 11.5V3C14 1.9 13.1 1 12 1C10.9 1 10 1.9 10 3V11.5H9.5C8.9 11.5 8.4 11.7 8 12.1L5.6 14.5L12.5 21.4C12.9 21.8 13.5 22 14.1 22H20.4C21.3 22 22.1 21.4 22.3 20.5L23.9 11.5C24.1 10.5 23.3 9.5 22.3 9.5H14V11.5Z"
              transform="translate(-5, -1) scale(0.9)"
              className="fill-brc-orange stroke-black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            // --- ARROW ICON (Default) ---
            <path
              d="M3 3L10.07 21.23L12.8 12.8L21.23 10.07L3 3Z"
              className="fill-brc-orange stroke-black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </motion.div>
    </div>
  );
};