import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  variant?: "dark" | "alt" | "transparent";
  className?: string;
  fullBleed?: boolean;
  children: React.ReactNode;
}

export function Section({
  id,
  variant = "transparent",
  className,
  fullBleed = false,
  children,
}: SectionProps) {
  const bgClass = {
    dark: "bg-bg-primary",
    alt: "bg-bg-container-1",
    transparent: "bg-transparent",
  };

  const paddingClass = "py-24 md:py-32";

  return (
    <section id={id} className={cn("relative z-10", bgClass[variant], paddingClass, className)}>
      {fullBleed ? (
        children
      ) : (
        <div className="container mx-auto px-6 lg:px-12">
          {children}
        </div>
      )}
    </section>
  );
}
