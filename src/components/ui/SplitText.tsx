"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface SplitTextProps {
  children: string;
  type?: "lines" | "words" | "chars";
  delay?: number;
  stagger?: number;
  trigger?: "onMount" | "scroll";
  as?: React.ElementType;
  className?: string;
  onComplete?: () => void;
}

export function SplitText({
  children,
  type = "words",
  delay = 0,
  stagger = 0.05,
  trigger = "onMount",
  as: Component = "span",
  className,
  onComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Function to split text based on type
  const getSplitContent = () => {
    if (typeof children !== "string") return children;

    if (type === "lines") {
      // Very basic line splitting by breaking at newlines if provided
      // Complex CSS line splitting requires robust library like SplitText from GSAP Club
      const lines = children.split("\n");
      return lines.map((line, i) => (
        <span key={`line-${i}`} className="split-line inline-block overflow-hidden">
          <span 
            ref={(el) => { elementsRef.current[i] = el; }}
            className="split-line-inner inline-block translate-y-full"
          >
            {line}
          </span>
          {i !== lines.length - 1 && <br />}
        </span>
      ));
    }

    if (type === "words") {
      const words = children.split(" ");
      return words.map((word, i) => (
        <span key={`word-${i}`} className="split-word inline-block overflow-hidden mr-[0.25em]">
          <span 
            ref={(el) => { elementsRef.current[i] = el; }}
            className="split-word-inner inline-block translate-y-full"
          >
            {word}
          </span>
        </span>
      ));
    }

    if (type === "chars") {
      const chars = children.split("");
      return chars.map((char, i) => (
        <span key={`char-${i}`} className="split-char inline-block overflow-hidden">
          <span 
            ref={(el) => { elementsRef.current[i] = el; }}
            className="split-char-inner inline-block translate-y-full"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ));
    }

    return children;
  };

  useGSAP(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      gsap.set(elementsRef.current, { y: 0, opacity: 1 });
      if (onComplete) onComplete();
      return;
    }

    const elements = elementsRef.current.filter(Boolean);
    if (!elements.length) return;

    const animConfig = {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      stagger: stagger,
      delay: trigger === "scroll" ? 0 : delay,
      onComplete,
    };

    if (trigger === "scroll") {
      gsap.to(elements, {
        ...animConfig,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    } else {
      gsap.to(elements, animConfig);
    }
  }, { scope: containerRef, dependencies: [children, type, delay, stagger, trigger] });

  return (
    <Component ref={containerRef} className={cn("inline-block", className)}>
      {getSplitContent()}
    </Component>
  );
}
