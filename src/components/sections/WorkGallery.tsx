"use client";

import React, { useRef, useState, useMemo } from "react";
import { projects, projectCategories } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { VideoModal } from "@/components/ui/VideoModal";
import { LiquidButton } from "@/components/ui/liquid-metal-button";
import { SplitText } from "@/components/ui/SplitText";
import { Play, Grid, ListVideo } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { VideoProject } from "@/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function WorkGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "reel">("grid");
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  useGSAP(() => {
    // Animate cards in on scroll or filter change
    if (!galleryRef.current) return;
    
    const cards = gsap.utils.toArray(".project-card");
    
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef, dependencies: [activeCategory, viewMode, filteredProjects.length] });

  return (
    <Section id="work" variant="transparent" className="border-t border-white/5">
      <div ref={containerRef} className="flex flex-col">
        {/* Header Area */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div>
            <span className="category-tag">[SELECTED WORK]</span>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-2xl">
              <SplitText type="words" trigger="scroll">
                Visual narratives. Precision edits.
              </SplitText>
            </h2>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-6 w-full lg:w-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-bg-container-1 rounded-full p-1 border border-border-default hidden md:flex">
              <button 
                onClick={() => setViewMode("grid")}
                className={cn("p-2 rounded-full transition-colors flex items-center justify-center", viewMode === "grid" ? "bg-white/10 text-white" : "text-text-secondary hover:text-white")}
                aria-label="Grid View"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode("reel")}
                className={cn("p-2 rounded-full transition-colors flex items-center justify-center", viewMode === "reel" ? "bg-white/10 text-white" : "text-text-secondary hover:text-white")}
                aria-label="Reel View"
              >
                <ListVideo className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-text-secondary max-w-sm lg:text-right">
              A curated selection of commercial, narrative, and music video projects from the last three years.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 border",
                activeCategory === category 
                  ? "bg-blue-electric text-white border-blue-electric shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                  : "bg-transparent text-text-secondary border-border-default hover:border-white/20 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid/Reel */}
        <div 
          ref={galleryRef}
          className={cn(
            "w-full",
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-16" 
              : "flex flex-col gap-12"
          )}
        >
          {filteredProjects.map((project, idx) => (
            <div 
              key={`${project.slug}-${idx}`} 
              className={cn(
                "project-card group cursor-pointer",
                viewMode === "reel" ? "flex flex-col lg:flex-row gap-8 items-center bg-bg-container-1 p-6 lg:p-8 rounded-2xl border border-border-default hover:border-blue-electric/30 transition-colors" : ""
              )}
              onClick={() => {
                if (project.videoUrl) {
                  window.open(project.videoUrl, "_blank");
                } else {
                  setSelectedProject(project);
                }
              }}
            >
              {/* Thumbnail Container */}
              <div 
                className={cn(
                  "relative overflow-hidden rounded-xl bg-bg-container-2",
                  viewMode === "grid" ? "w-full aspect-video mb-6" : "w-full lg:w-[60%] aspect-video shrink-0"
                )}
              >
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out-expo"
                  loading="lazy"
                />
                
                {/* Overlay Play Button */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                  <div className="w-16 h-16 bg-blue-electric/90 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono text-white">
                  {project.duration}
                </div>
              </div>

              {/* Content */}
              <div className={cn("flex flex-col", viewMode === "grid" ? "w-full" : "w-full lg:w-[40%]")}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-blue-electric">{project.category}</span>
                  <span className="w-1 h-1 rounded-full bg-border-default"></span>
                  <span className="text-xs font-mono text-text-tertiary">{project.year}</span>
                </div>
                
                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-blue-electric transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-text-secondary text-sm mb-4">
                  Client: <span className="text-white">{project.client}</span>
                </p>

                {viewMode === "reel" && (
                  <p className="text-text-primary leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                )}
                

              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-24 text-center border border-dashed border-border-default rounded-2xl bg-bg-container-1">
            <p className="text-text-secondary font-mono">No projects found in this category.</p>
          </div>
        )}
      </div>

      <VideoModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </Section>
  );
}
