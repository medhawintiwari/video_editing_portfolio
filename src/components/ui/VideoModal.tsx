"use client";

import React, { useEffect, useState } from "react";
import { X, Play, Pause, Maximize, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoProject } from "@/types";

interface VideoModalProps {
  project: VideoProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ project, isOpen, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => {
        setIsPlaying(false);
        setProgress(0);
      }, 0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Simulate video progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5; // slow progress
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center h-full animate-[fade-in-up_0.5s_ease-out_forwards]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-text-secondary hover:text-white bg-bg-container-2 rounded-full border border-border-default hover:border-blue-electric transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-electric z-20"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full flex flex-col lg:flex-row gap-8 items-center lg:items-stretch h-[80vh] lg:h-[70vh]">
          
          {/* Player Area */}
          <div className="w-full lg:w-3/4 bg-black rounded-lg overflow-hidden relative flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-border-default group">
            {/* Simulated Video Placeholder */}
            <div className="relative flex-grow flex items-center justify-center bg-bg-container-1 overflow-hidden">
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className={cn("absolute inset-0 w-full h-full object-cover transition-opacity duration-500", isPlaying ? "opacity-30" : "opacity-100")}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] opacity-60"></div>
              
              {/* Play state indicator overlay */}
              <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none", isPlaying ? "opacity-0" : "opacity-100")}>
                <button 
                  className="w-20 h-20 bg-blue-electric/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-electric/50 text-white pointer-events-auto hover:scale-110 transition-transform"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                </button>
              </div>

              {/* Watermark / Tech info */}
              <div className="absolute top-4 left-4 text-xs font-mono text-white/50 px-2 py-1 bg-black/40 rounded backdrop-blur-sm">
                REC • 4K • 23.976fps
              </div>
            </div>

            {/* Custom Controls (reveal on hover) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              
              {/* Progress bar */}
              <div 
                className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer relative overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = ((e.clientX - rect.left) / rect.width) * 100;
                  setProgress(percent);
                }}
              >
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-electric"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-blue-electric transition-colors">
                    {isPlaying ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5" fill="currentColor" />}
                  </button>
                  <button onClick={() => setIsMuted(!isMuted)} className="hover:text-blue-electric transition-colors">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <span className="font-mono text-xs text-white/70">
                    {Math.floor((progress / 100) * parseInt(project.duration.split(":")[1]) || 0)}s / {project.duration}
                  </span>
                </div>
                
                <button onClick={() => setIsFullscreen(!isFullscreen)} className="hover:text-blue-electric transition-colors">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Metadata Sidebar */}
          <div className="w-full lg:w-1/4 flex flex-col justify-between bg-bg-container-1 p-6 rounded-lg border border-border-default overflow-y-auto">
            <div>
              <div className="font-mono text-xs tracking-widest text-blue-electric mb-2 uppercase">
                {project.category}
              </div>
              <h2 id="modal-title" className="font-heading text-2xl font-bold text-white mb-1">
                {project.title}
              </h2>
              <div className="text-text-secondary text-sm mb-6">
                Client: <span className="text-white">{project.client}</span> • {project.year}
              </div>

              <p className="text-text-primary text-sm leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-mono text-xs text-text-tertiary mb-2 uppercase tracking-wider">Role</h4>
                  <div className="text-sm text-white">{project.role}</div>
                </div>
                
                <div>
                  <h4 className="font-mono text-xs text-text-tertiary mb-2 uppercase tracking-wider">Software</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.software.map(sw => (
                      <span key={sw} className="px-2 py-1 text-xs bg-bg-container-3 border border-white/5 rounded text-text-secondary">
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border-default">
               <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded text-sm font-medium transition-colors border border-white/10">
                 Share Project
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
