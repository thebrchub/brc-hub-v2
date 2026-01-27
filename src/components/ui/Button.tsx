import React from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = "primary", 
  size = "md", 
  ...props 
}) => {
  return (
    <button
      className={cn(
        // Base Styles
        "relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer overflow-hidden group",
        
        // Sizes
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        
        // VARIANTS
        
        // 1. PRIMARY: Orange + The "Shiny Sweep" Effect
        variant === "primary" && [
          "bg-[var(--color-brc-orange)] text-white",
          "shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.6)]",
          "hover:-translate-y-1", // Slight lift
          // The Shine Gradient Layer
          "before:absolute before:inset-0 before:translate-x-[-100%] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
          "hover:before:translate-x-[100%] before:transition-transform before:duration-500 before:ease-in-out"
        ],

        // 2. OUTLINE: Border + Background Fill Effect
        variant === "outline" && [
          "border border-[var(--color-brc-gray)] text-gray-300 bg-transparent",
          "hover:text-white hover:border-white/40",
          "hover:bg-white/5", // Subtle fill on hover
        ],

        // 3. GHOST: Simple Text Hover
        variant === "ghost" && "text-gray-400 hover:text-white bg-transparent hover:bg-white/5",

        className
      )}
      {...props}
    />
  );
};