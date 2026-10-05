"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  link?: boolean;
  size?: "sm" | "md" | "lg";
  layout?: "vertical" | "horizontal";
}

export function Logo({ className = "", showText = true, link = true, size = "md", layout = "vertical" }: LogoProps) {
  
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14 md:w-16 md:h-16",
    lg: "w-24 h-24 md:w-32 md:h-32",
  };

  const textClasses = {
    sm: "text-base",
    md: "text-lg md:text-xl",
    lg: "text-3xl md:text-4xl",
  };

  const subTextClasses = {
    sm: "text-[0.4rem] tracking-[0.2em]",
    md: "text-[0.45rem] md:text-[0.55rem] tracking-[0.35em]",
    lg: "text-[0.6rem] md:text-[0.7rem] tracking-[0.4em]",
  };

  const isHorizontal = layout === "horizontal";

  const content = (
    <div className={`flex ${isHorizontal ? "flex-row" : "flex-col"} items-center justify-center group ${className}`}>
      {/* Mark */}
      <div className={`relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${sizeClasses[size]}`}>
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-blue-electric/5 rounded-full blur-xl pointer-events-none transition-all duration-500 group-hover:bg-blue-electric/10"></div>
        
        {/* Dashed Orbit */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="42" 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.08)" 
            strokeWidth="0.5" 
            strokeDasharray="2 3" 
            className="transition-all duration-700 group-hover:stroke-[rgba(59,130,246,0.3)] group-hover:rotate-45 origin-center" 
          />
          {/* Blue ring and dot at ~45 deg (bottom right) */}
          <circle 
            cx="79.7" cy="79.7" r="3.5" 
            fill="none" 
            stroke="rgba(59, 130, 246, 0.4)" 
            strokeWidth="1" 
            className="transition-all duration-500 group-hover:stroke-blue-400 group-hover:r-4" 
          />
          <circle 
            cx="79.7" cy="79.7" r="1.5" 
            fill="#3B82F6" 
            className="transition-all duration-500 group-hover:fill-blue-400" 
          />
        </svg>

        {/* The M Logo */}
        <svg width="65%" height="65%" viewBox="0 0 100 100" className="relative z-10 drop-shadow-md">
          {/* M shape */}
          <path 
            d="M 15 25 H 40 L 50 43 L 60 25 H 85 V 75 H 63 V 48 L 54 63 C 52 66 48 66 46 63 L 37 48 V 75 H 15 Z" 
            fill="white" 
            className="transition-colors duration-500" 
          />

          {/* Top Diamond */}
          <path 
            d="M 50 12 L 53.5 20 L 50 28 L 46.5 20 Z" 
            fill="#3B82F6" 
            className="transition-all duration-500 group-hover:fill-blue-400 group-hover:-translate-y-1" 
          />

          {/* Bottom Chevron */}
          <path 
            d="M 42 68 L 50 76 L 58 68" 
            fill="none" 
            stroke="#3B82F6" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="transition-all duration-500 group-hover:stroke-blue-400 group-hover:translate-y-1" 
          />
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <div className={`flex flex-col ${isHorizontal ? "ml-3 items-start" : "mt-2 items-center"}`}>
          <div className={`font-heading font-bold tracking-tight text-white lowercase ${textClasses[size]}`}>
            medha<span className="text-blue-electric">.win</span>
          </div>
          <div className={`font-mono text-text-tertiary uppercase ${isHorizontal ? "mt-0" : "mt-1"} opacity-80 ${subTextClasses[size]}`}>
            Aesthetic Minimal
          </div>
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <Link href="/" className="inline-block" aria-label="Home">
        {content}
      </Link>
    );
  }

  return content;
}
