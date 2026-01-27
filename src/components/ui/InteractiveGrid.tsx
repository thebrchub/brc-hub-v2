import { useState, useRef, useEffect } from "react";

export const InteractiveGrid = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* 1. Base Layer: Subtle static grid */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* 2. Interactive Layer: The "Flashlight" Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          // The Orange Glow
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 87, 34, 0.3), transparent 40%)`,
        }}
      />

      {/* 3. The Grid Highlight Layer (FIXED ALIGNMENT) */}
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: `linear-gradient(to right, #FF5722 1px, transparent 1px), linear-gradient(to bottom, #FF5722 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          
          // FIX: We define the center of the mask directly at mouse coordinates.
          // This ensures the grid reveal is ALWAYS exactly where the mouse is.
          maskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
        }}
      />
      
      {/* 4. Data Particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brc-orange rounded-full opacity-40 animate-pulse" />
      <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-20 animate-pulse delay-700" />
      <div className="absolute bottom-10 left-10 w-1 h-1 bg-brc-orange rounded-full opacity-40 animate-pulse delay-1000" />

    </div>
  );
};