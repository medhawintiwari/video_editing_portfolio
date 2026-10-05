"use client";

import React, { useRef } from "react";
import { personalInfo } from "@/data/personal";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { LiquidButton } from "@/components/ui/liquid-metal-button";
import { FlipText } from "@/components/ui/flip-text";
import { FlipButton } from "@/components/ui/flip-button";
import { MeshGradient } from "@paper-design/shaders-react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Placeholder images for the corridor
const corridorImages = [
  "/images/projects/reel1.jpg",
  "/images/projects/reel2.jpg",
  "/images/projects/reel3.jpg",
  "/images/projects/reel1.jpg",
  "/images/projects/reel2.jpg",
  "/images/projects/reel3.jpg",
  "/images/projects/reel1.jpg",
  "/images/projects/reel2.jpg",
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal content elements after headline
    gsap.fromTo(
      ".hero-fade-in",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 1.5 }
    );
  }, { scope: containerRef });

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 overflow-hidden"
    >
      {/* 3D Image Corridor Background */}
      <ImageStreamHero images={corridorImages} className="opacity-40" />

      {/* Shader Overlay for depth and color */}
      <div className="absolute inset-0 z-10 opacity-30 mix-blend-screen pointer-events-none">
        <MeshGradient 
          colors={["#0B0E14", "#3B82F6", "#191F2F", "#F59E0B"]}
          speed={0.2}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20 h-full flex flex-col justify-center mt-20">
        <div className="max-w-5xl">
          <div className="mb-8 overflow-hidden hero-fade-in">
            <span className="inline-block font-mono text-blue-electric text-sm tracking-[0.2em] uppercase border border-blue-electric/30 bg-blue-electric/10 px-4 py-2 rounded-full backdrop-blur-sm">
              {personalInfo.title}
            </span>
          </div>

          <h1 
            ref={headlineRef}
            className="font-heading font-bold text-[12vw] sm:text-7xl md:text-8xl lg:text-[10rem] leading-[1.15] tracking-tighter text-white mb-10 mix-blend-difference relative z-30"
          >
                <div className="flex flex-wrap items-baseline gap-x-4 md:gap-x-6 lg:gap-x-8 opacity-0 animate-[fade-in_1s_ease-out_0.5s_forwards]">
                  <FlipText>I</FlipText>
                  <FlipText className="font-mono text-[10vw] sm:text-6xl md:text-7xl lg:text-[8.5rem] font-medium tracking-tight">Create</FlipText>
                </div>
                <div className="opacity-0 animate-[fade-in_1s_ease-out_0.7s_forwards]">
                  <FlipText>good</FlipText>
                  <span className="inline-block w-[0.3em]"></span>
                  <FlipText>stuff.</FlipText>
                </div>
          </h1>

          <div ref={contentRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 max-w-3xl">
            <p className="text-text-secondary text-lg md:text-xl lg:text-2xl leading-relaxed hero-fade-in">
              {personalInfo.heroSubtitle}
            </p>
            
            <div className="shrink-0 hero-fade-in pt-4 sm:pt-0 flex gap-4">
              <Link href="#work">
                <LiquidButton size="lg" variant="amber">
                  View My Reel
                </LiquidButton>
              </Link>
              <Link href="#contact">
                <FlipButton 
                  frontText="Let's Talk" 
                  backText="Start Project" 
                  className="h-full min-h-[52px] w-36 rounded-full font-mono uppercase tracking-wider text-sm" 
                  frontClassName="bg-blue-electric/20 text-white border border-blue-electric/50 rounded-full"
                  backClassName="bg-blue-electric text-white rounded-full"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-6 lg:left-12 flex flex-col items-center gap-4 hero-fade-in z-20">
        <span className="font-mono text-xs tracking-[0.2em] text-text-tertiary [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <div className="w-[1px] h-16 bg-border-default relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-electric animate-[slide-down_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
