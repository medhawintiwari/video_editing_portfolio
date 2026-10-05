"use client";

import React, { useRef } from "react";
import { personalInfo, timeline } from "@/data/personal";
import { Section } from "@/components/layout/Section";
import { SplitText } from "@/components/ui/SplitText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Timeline entries animation
    gsap.fromTo(
      ".timeline-item",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 75%",
        }
      }
    );

    // Skill bars animation
    const skillBars = gsap.utils.toArray(".skill-bar-fill") as HTMLElement[];
    
    skillBars.forEach((bar) => {
      // Get the target width from data attribute
      const width = bar.getAttribute("data-width");
      
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar.parentElement,
            start: "top 85%",
          }
        }
      );
    });

    // Stats counter animation
    const stats = gsap.utils.toArray(".stat-value") as HTMLElement[];
    stats.forEach((stat) => {
      const valStr = stat.innerText.replace(/[^0-9]/g, '');
      const val = parseInt(valStr, 10);
      const suffix = stat.innerText.replace(/[0-9]/g, '');
      
      if (!isNaN(val)) {
        const obj = { count: 0 };
        gsap.to(obj, {
          count: val,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
          },
          onUpdate: () => {
            stat.innerText = `${Math.floor(obj.count)}${suffix}`;
          }
        });
      }
    });

  }, { scope: containerRef });

  return (
    <Section id="experience" variant="transparent" className="relative">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: About & Timeline (Spans 7) */}
          <div className="lg:col-span-7">
            <span className="category-tag">[BACKGROUND]</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-white mb-12">
              <SplitText type="words" trigger="scroll">
                Editing is an invisible art.
              </SplitText>
            </h2>

            <div className="space-y-6 text-lg text-text-secondary leading-relaxed mb-16">
              {personalInfo.about.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Timeline */}
            <div className="timeline-container relative pl-8 border-l border-border-default space-y-12">
              {timeline.map((item, i) => (
                <div key={i} className="timeline-item relative">
                  {/* Timeline dot */}
                  <div className={cn(
                    "absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-bg-container-1",
                    item.highlight ? "bg-amber-warm" : "bg-blue-electric"
                  )}></div>
                  
                  <div className="font-mono text-sm tracking-widest text-text-tertiary mb-2">
                    {item.year}
                  </div>
                  <h3 className={cn("text-xl font-bold mb-3", item.highlight ? "text-amber-warm" : "text-white")}>
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Skills & Stats (Spans 5) */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-16">
                {personalInfo.stats.map((stat, i) => (
                  <div key={i} className="bg-bg-primary p-6 rounded-2xl border border-border-default text-center">
                    <div className="font-heading text-4xl font-bold text-white mb-2 flex justify-center items-center">
                      <span className="stat-value">{stat.value}</span>
                      {stat.suffix && <span className="text-blue-electric ml-1">{stat.suffix}</span>}
                    </div>
                    <div className="text-sm text-text-tertiary font-mono uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill Bars */}
              <div className="space-y-10">
                {personalInfo.skills.map((group, i) => (
                  <div key={i} className="skill-group">
                    <h4 className="font-mono text-sm tracking-widest uppercase text-white mb-6 border-b border-border-default pb-3">
                      {group.category}
                    </h4>
                    
                    <div className="space-y-5">
                      {group.items.map((skill, j) => (
                        <div key={j} className="skill-item">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-text-primary">{skill.name}</span>
                            <span className="text-text-tertiary font-mono">{skill.proficiency}%</span>
                          </div>
                          <div className="skill-bar-track w-full">
                            <div 
                              className="skill-bar-fill" 
                              data-width={skill.proficiency}
                              style={{ width: `${skill.proficiency}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
