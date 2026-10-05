"use client";

import React, { useRef, useState } from "react";
import { personalInfo } from "@/data/personal";
import { Section } from "@/components/layout/Section";
import { LiquidButton } from "@/components/ui/liquid-metal-button";
import { SplitText } from "@/components/ui/SplitText";
import { NeuroNoise } from "@paper-design/shaders-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  useGSAP(() => {
    // Stagger in form elements
    gsap.fromTo(
      ".contact-element",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, handle form submission here
    console.log("Form submitted:", formState);
    alert("This is a demo. Form submission requires backend integration.");
  };

  return (
    <Section id="contact" variant="transparent" className="relative border-t border-border-default overflow-hidden">
      
      {/* Background Shader Effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen">
        <NeuroNoise 
          brightness={0.5} 
          contrast={0.8}
          scale={2}
          speed={0.15}
        />
        {/* Fade edges to black */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-bg-primary)_70%)]"></div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Copy & Info */}
          <div className="flex flex-col justify-center">
            <span className="category-tag mb-8">[LET&apos;S TALK]</span>
            
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8">
              <SplitText type="words" trigger="scroll">
                Ready to cut your next project?
              </SplitText>
            </h2>
            
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-12 contact-element">
              Whether you need a high-impact commercial, a cinematic short, or rapid-fire social content, I&apos;m currently accepting new projects. Let&apos;s discuss your vision.
            </p>
            
            <div className="contact-element">
              {/* Availability indicator */}
              <div className="flex items-center gap-4 mb-8 bg-bg-container-1 w-fit px-5 py-3 rounded-full border border-border-default">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-electric opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-electric"></span>
                </span>
                <span className="text-sm font-mono text-text-primary uppercase tracking-widest">Currently Available</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-xs tracking-widest text-text-tertiary uppercase mb-2">Direct Email</h4>
                  <a href={`mailto:${personalInfo.email}`} className="text-xl text-white hover:text-blue-electric transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
                {personalInfo.phone && (
                  <div>
                    <h4 className="font-mono text-xs tracking-widest text-text-tertiary uppercase mb-2">Phone</h4>
                    <a href={`tel:${personalInfo.phone}`} className="text-xl text-white hover:text-blue-electric transition-colors">
                      {personalInfo.phone}
                    </a>
                  </div>
                )}
                <div>
                  <h4 className="font-mono text-xs tracking-widest text-text-tertiary uppercase mb-2">Location</h4>
                  <p className="text-xl text-white">{personalInfo.location} <span className="text-text-muted text-base ml-2">(Remote available globally)</span></p>
                </div>
                <div>
                  <h4 className="font-mono text-xs tracking-widest text-text-tertiary uppercase mb-2">Socials</h4>
                  <div className="flex gap-4">
                    {personalInfo.social.linkedin && (
                      <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-xl text-white hover:text-blue-electric transition-colors">
                        LinkedIn
                      </a>
                    )}
                    {personalInfo.social.instagram && (
                      <a href={personalInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="text-xl text-white hover:text-blue-electric transition-colors">
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-bg-container-1 p-8 md:p-10 rounded-3xl border border-border-default shadow-2xl relative contact-element">
            {/* Ambient glow behind form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-electric/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-xs tracking-widest text-text-secondary uppercase pl-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-xs tracking-widest text-text-secondary uppercase pl-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="projectType" className="font-mono text-xs tracking-widest text-text-secondary uppercase pl-1">
                  Project Type
                </label>
                <div className="relative">
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formState.projectType}
                    onChange={handleChange}
                    className="form-input appearance-none bg-bg-container-2"
                  >
                    <option value="" disabled>Select a category...</option>
                    <option value="commercial">Commercial / Brand Film</option>
                    <option value="music-video">Music Video</option>
                    <option value="narrative">Narrative / Short Film</option>
                    <option value="social">Social Media / Reels</option>
                    <option value="documentary">Documentary</option>
                    <option value="other">Other</option>
                  </select>
                  {/* Custom select arrow */}
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-xs tracking-widest text-text-secondary uppercase pl-1">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="form-input resize-none bg-bg-container-2"
                  placeholder="Tell me about your project, timeline, and rough budget..."
                />
              </div>

              <div className="mt-4">
                <LiquidButton type="submit" size="xl" className="w-full">
                  Send Inquiry
                </LiquidButton>
              </div>
            </form>
          </div>

        </div>
      </div>
    </Section>
  );
}
