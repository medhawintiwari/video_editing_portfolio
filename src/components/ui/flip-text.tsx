"use client";

import React, { useState, useCallback } from "react";

const FLIP_COLORS = ["#FFFFFF", "#EF4444", "#3B82F6", "#FACC15"];

interface FlipTextProps {
  children: string;
  className?: string;
  letterDelay?: number;
}

export const FlipText = ({
  children,
  className = "",
  letterDelay = 25,
}: FlipTextProps) => {
  const text = typeof children === "string" ? children : String(children);
  const [colorIndex, setColorIndex] = useState(0);

  const handleMouseEnter = useCallback(() => {
    setColorIndex((prev) => (prev + 1) % FLIP_COLORS.length);
  }, []);

  return (
    <span
      className={`group/flip relative inline-block overflow-hidden ${className}`}
      style={{
        lineHeight: 1.2,
        paddingBottom: "0.15em",
        paddingTop: "0.05em",
      }}
      onMouseEnter={handleMouseEnter}
    >
      <span className="flex">
        {text.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover/flip:-translate-y-full"
            style={{
              transitionDelay: `${i * letterDelay}ms`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
      <span className="absolute inset-0 flex">
        {text.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-full transition-transform duration-300 ease-in-out group-hover/flip:translate-y-0"
            style={{
              transitionDelay: `${i * letterDelay}ms`,
              color: FLIP_COLORS[colorIndex],
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
    </span>
  );
};
