import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

interface TextDecryptProps {
  text: string;
  className?: string;
}

export const TextDecrypt = ({ text, className = "" }: TextDecryptProps) => {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPos((p) => {
        if (p >= text.length) {
          clearInterval(interval);
          return text.length;
        }
        return p + 1; 
      });
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={`${className} inline-flex`}>
      {text.split("").map((char, index) => {
        
        // 1. STATE: LOCKED
        if (index < pos) {
          return (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              // FIXED: Removed 'text-white'. 
              // Now it inherits the color from the parent (White or Orange).
              className="inline-block" 
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        }

        // 2. STATE: SCRAMBLING
        // We keep the scramble Orange because it looks cool (Cyberpunk burn-in)
        return (
          <span 
            key={index} 
            className="text-brc-orange opacity-50 inline-block"
          >
            {chars[Math.floor(Math.random() * chars.length)]}
          </span>
        );
      })}
    </span>
  );
};