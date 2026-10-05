"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ImageStreamHeroProps {
  images: string[];
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

export function ImageStreamHero({ images, className, speed = "normal" }: ImageStreamHeroProps) {
  // Determine duration based on speed
  const getDurationClass = () => {
    switch (speed) {
      case "slow": return "duration-[60s]";
      case "fast": return "duration-[20s]";
      case "normal":
      default: return "duration-[40s]";
    }
  };

  // Ensure we have enough images to loop by duplicating the array if needed
  const displayImages = images.length < 8 ? [...images, ...images, ...images] : [...images, ...images];
  
  // Split images into two tracks
  const midpoint = Math.ceil(displayImages.length / 2);
  const track1Images = displayImages.slice(0, midpoint);
  const track2Images = displayImages.slice(midpoint);

  return (
    <div className={cn("corridor-container absolute inset-0 w-full h-full pointer-events-none z-0", className)}>
      {/* Overlay to fade out the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-bg-primary)_80%)] z-20 pointer-events-none mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-bg-primary)_0%,transparent_15%,transparent_85%,var(--color-bg-primary)_100%)] z-20 pointer-events-none"></div>

      <div className="relative w-full h-full flex flex-col justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 opacity-40">
        
        {/* Track 1 (Top) - Moves Left */}
        <div className="flex w-fit image-corridor-track image-corridor-track--left">
          {track1Images.map((src, idx) => (
            <div 
              key={`t1-${idx}`} 
              className="relative w-[30cqw] sm:w-[25cqw] md:w-[20cqw] aspect-video shrink-0 rounded-md overflow-hidden bg-bg-container-1 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-border-default"
            >
              <img 
                src={src} 
                alt="Corridor visual" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-blue-royal/10 mix-blend-overlay"></div>
            </div>
          ))}
          {/* Duplicate for seamless looping */}
          {track1Images.map((src, idx) => (
            <div 
              key={`t1-dup-${idx}`} 
              className="relative w-[30cqw] sm:w-[25cqw] md:w-[20cqw] aspect-video shrink-0 rounded-md overflow-hidden bg-bg-container-1 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-border-default"
            >
              <img 
                src={src} 
                alt="Corridor visual" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-blue-royal/10 mix-blend-overlay"></div>
            </div>
          ))}
        </div>

        {/* Track 2 (Bottom) - Moves Right */}
        <div className="flex w-fit image-corridor-track image-corridor-track--right">
          {track2Images.map((src, idx) => (
            <div 
              key={`t2-${idx}`} 
              className="relative w-[30cqw] sm:w-[25cqw] md:w-[20cqw] aspect-video shrink-0 rounded-md overflow-hidden bg-bg-container-1 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-border-default"
            >
              <img 
                src={src} 
                alt="Corridor visual" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-amber-warm/10 mix-blend-overlay"></div>
            </div>
          ))}
          {/* Duplicate for seamless looping */}
          {track2Images.map((src, idx) => (
            <div 
              key={`t2-dup-${idx}`} 
              className="relative w-[30cqw] sm:w-[25cqw] md:w-[20cqw] aspect-video shrink-0 rounded-md overflow-hidden bg-bg-container-1 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-border-default"
            >
              <img 
                src={src} 
                alt="Corridor visual" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-amber-warm/10 mix-blend-overlay"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
