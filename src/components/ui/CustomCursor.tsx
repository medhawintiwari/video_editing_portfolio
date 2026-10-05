"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only enable on desktop devices that support hover
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    };
    
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || !cursorRef.current || !followerRef.current) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Use GSAP ticker for smooth animation loop
    const render = () => {
      // Lerp cursor (fast)
      cursorX += (mouseX - cursorX) * 0.5;
      cursorY += (mouseY - cursorY) * 0.5;
      
      // Lerp follower (slower, delayed)
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      gsap.set(cursorRef.current, { x: cursorX, y: cursorY });
      gsap.set(followerRef.current, { x: followerX, y: followerY });
    };

    gsap.ticker.add(render);
    window.addEventListener("mousemove", onMouseMove);

    // Interactive element hovering
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive');

      if (isClickable) {
        gsap.to(cursorRef.current, { scale: 0, duration: 0.2 });
        gsap.to(followerRef.current, { 
          scale: 1.5, 
          backgroundColor: "rgba(59, 130, 246, 0.1)", // blue-glow
          borderColor: "rgba(59, 130, 246, 0.8)", // blue-electric
          duration: 0.3 
        });
      }
    };

    const handleMouseOut = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
      gsap.to(followerRef.current, { 
        scale: 1, 
        backgroundColor: "transparent",
        borderColor: "rgba(240, 240, 245, 0.3)", // border default
        duration: 0.3 
      });
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(render);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isDesktop, pathname]); // Re-bind when path changes

  if (!isDesktop) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-blue-electric rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
      />
    </>
  );
}
