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
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        // Sizes
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        
        // Variants
        variant === "primary" && "bg-[var(--color-brc-orange)] text-white hover:brightness-110 shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:shadow-[0_0_30px_rgba(255,87,34,0.5)]",
        variant === "outline" && "border border-[var(--color-brc-gray)] text-white hover:border-[var(--color-brc-orange)] hover:text-[var(--color-brc-orange)] bg-transparent",
        variant === "ghost" && "text-gray-400 hover:text-white bg-transparent",
        className
      )}
      {...props}
    />
  );
};